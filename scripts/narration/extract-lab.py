#!/usr/bin/env python3
"""Write reproducible English narration text from a built Ordo Knowledge Lab.

Run from the repository root after the VitePress build:
    python3 scripts/build-narration-text.py --dist dist --docs docs --out build/narration

Only the public article body is read. Markdown from the same build supplies accessible
descriptions when a Mermaid SVG is deferred to the browser. A manifest's text paths
are relative to its own directory. IDs and routes do not depend on the deployment base.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass, field
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit


VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
SKIPPED_TAGS = {'script', 'style', 'nav', 'button', 'audio', 'video', 'input', 'svg'}
SKIPPED_CLASSES = {'header-anchor', 'lab-page-share', 'lab-scroll-hint', 'copy', 'lang'}
HEADINGS = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}


@dataclass
class Node:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)

    def has(self, cls):
        return cls in self.attrs.get('class', '').split()

    def elements(self, tag=None):
        for child in self.children:
            if isinstance(child, Node):
                if tag is None or child.tag == tag:
                    yield child
                yield from child.elements(tag)

    def text(self):
        if self.tag in SKIPPED_TAGS or self.attrs.get('aria-hidden') == 'true':
            return ''
        if SKIPPED_CLASSES.intersection(self.attrs.get('class', '').split()):
            return ''
        if self.tag == 'br':
            return '\n'
        return ''.join(child if isinstance(child, str) else child.text() for child in self.children)


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node('document')
        self.stack = [self.root]
        self.feed(html)
        self.close()

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def compact(value):
    return ' '.join(value.replace('\u200b', '').split())


def speak(value):
    value = compact(value)
    value = re.sub(r'\s*[↗→]\s*$', '', value)
    value = value.replace(' → ', ', then ').replace(' ← ', ' from ').replace(' · ', '. ')
    return value


def sentence(value):
    value = speak(value).rstrip(':;')
    return value if not value or re.search(r'[.!?…][”"’\')\]]*$', value) else value + '.'


def source_diagrams(markdown):
    descriptions = []
    for match in re.finditer(r'^```mermaid[^\n]*\n(.*?)^```\s*$', markdown, re.M | re.S):
        code = match[1]
        title = re.search(r'^\s*accTitle:\s*([^\n]+)', code, re.M)
        desc = re.search(r'^\s*accDescr:\s*([^\n]+)', code, re.M)
        descriptions.append((title[1], desc[1]) if title and desc else None)
    return descriptions


def fingerprint(code):
    # Highlighting boundaries and line endings vary between local and release builds.
    normalized = compact(code)
    return hashlib.sha256(normalized.encode()).hexdigest()[:16]


# A spoken reading of each non-prose example that would otherwise be ambiguous.
# Bind a reading to its content so edits to the printed example cannot reuse an old explanation.
READINGS = {
    # architecture/contracts
    "00defdac76f5ce18": 'The JSON example identifies the schema version, event, conversation, run, attempt, and sequence. Its event type is answer delta. The payload contains one fragment of supported answer text.',
    # build/index
    "22f5eb203f5efeb9": 'Run npm ci to install the locked dependencies. Run npm test, then npm run dev to open the local development server.',
    # design/index
    "29726bfaba1b729a": 'Workers turn sources into draft proposals. Review determines what enters the published library. Authorized retrieval uses the library to send a streamed answer and citations back to the browser.',
    # engineering/clean-build
    "1551edfdd516840c": 'Install the locked dependencies with npm ci. Run the JavaScript stream tests and the Python publication example. Run the plan checker, build the documentation, and check the generated pages. The exact commands are on the page.',
    # engineering/clean-build
    "9d039c34d8efaf09": 'Install the pinned Rust toolchain with the minimal profile. Use that compiler to build the lease tests into a temporary executable, then run it. The page includes the toolchain version and complete command.',
    # engineering/clean-build
    "3d5ec70454bd97fe": 'The proposed lab command has five roles. API is the stateless public service. Store owns private transactions and durable state. Worker runs bounded tasks. Admin handles scoped migration, import, export, verification, or repair. Local enables the embedded-store authoring profile.',
    # engineering/examples
    "5c6115a149422147": 'Run the Node test runner on the stream test file shown on the page.',
    # engineering/examples
    "e25b38d87fe5d8aa": 'Run the publication Python script in the documentation examples folder.',
    # project/knowledge
    "08a6b9f36fceb84f": 'The example research library contains a manifest, a SQLite database, content-addressed objects grouped by SHA-256, workflows, and model manifests.',
    # project/roadmap
    "0ee5f0ec4f6752af": 'Stage zero reviews evidence and contracts. Stage one establishes a clean workspace and durable kernel. Stage two handles sources, claims, and identity proposals. Stage three publishes reviewed changes atomically. Stage four retrieves evidence and evaluates it. Stage five adds the streaming research interface. Stage six adds portable export and a native-worker boundary. Stage seven verifies the release and demonstrates it within defined limits.',
    # project/setup
    "adfb673d0b5ccc76": 'Create a Projects directory, clone the IS373 RAG repository there, and enter its folder. Run npm ci to install the locked dependencies. Run npm run dev to start the guide.',
    # project/setup
    "f6f467306bbb2104": 'Run npm test. Use npm run preview to serve the built site locally.',
    # project/streaming
    "828dd92825327ca1": 'The example event names mark the start of a run, evidence selection, answer fragments, individual citations, and the end of a run. A run can end complete, incomplete, refused, failed, cancelled, or interrupted. Other events report job progress, a review request, or library publication.',
    # project/system
    "27907e69e9fc442e": 'The browser offers chat, evidence, library, jobs, and review. A stateless Rust API serves the web interface and calls the private store through commands and events. The store connects the operational database with the published library and its objects. Leased workers produce results that require validation.',
    # reuse/harvest-plan
    "5fac286e829a9472": 'The proposed workspace separates seven responsibilities. Domain owns identifiers, states, and policy. Contracts owns wire schemas and validation. Store owns SQLite transactions, artifacts, migrations, and export. Workflows plans jobs and requests state changes. Knowledge plans identity, claims, review, and retrieval. API handles authorization, HTTP, streaming, and conversations. Worker executes capabilities without direct access to canonical tables.',
    # students/ai-costs
    "62322d1e966db38c": 'Divide the input token count by one million and multiply by the input price per million tokens. Divide the billed output token count by one million and multiply by the output price per million tokens. Add the two costs, plus separately billed tools, storage, and other services.',
    # students/from-app-studio
    "75adef2bda513948": 'Start with five permitted source documents. Import them with source identifiers and chunks or sourced graph relationships, then store the index. A question in your FastAPI app triggers retrieval of real passages or paths and their source identifiers. A model uses the selected evidence to generate an answer with references a reader can open.',
    # students/library-survey
    "a608f29d66ab101c": 'Documents become chunks with metadata, which are indexed for search. A reader’s question becomes a query. Retrieval finds evidence from the documents, and the model uses that evidence to produce a cited answer.',
    # students/plan
    "022a3f746070bbed": 'Import and clean permitted sources. Represent them as chunks or as a graph and store them for retrieval. A question retrieves context for the real model. The reader receives an answer and references they can check.',
    # students/reference
    "296d0c0c6b82dec7": 'Clone the IS373 RAG repository from GitHub, enter its folder, and check your Python 3 version. The three terminal commands are on the page.',
    # students/reference
    "2aa145f9757df294": 'Run the lab’s Python importer against the SQLite database in the student-reference folder. The exact command is on the page.',
    # students/reference
    "751df961340dc36c": 'Use the lab’s search command on that database. Ask, “Who organizes events?”',
    # students/reference
    "b670fa500d04e663": 'Run Python unit-test discovery on the test files in the student-reference directory.',
}


def code_paragraphs(wrapper):
    block = next(wrapper.elements('pre'), None)
    if block is None:
        return []
    code = block.text().strip()
    caption = READINGS.get(fingerprint(code))
    if caption:
        return [caption]
    language = next(c.split('-', 1)[1] for c in wrapper.attrs['class'].split() if c.startswith('language-'))
    if language in {'text', 'txt', 'plaintext'}:
        return [sentence(part) for part in re.split(r'\n\s*\n', code) if compact(part)]
    if language in {'sh', 'bash', 'shell'} and len(code) < 140 and '\n' not in code:
        return [sentence('The command on the page is ' + code)]
    language_name = {'rs': 'Rust', 'py': 'Python', 'js': 'JavaScript', 'javascript': 'JavaScript',
                     'json': 'JSON', 'sh': 'shell'}.get(language, language)
    return [f'The full {language_name} listing is available on the chapter page.']


def read_table(table):
    rows = list(table.elements('tr'))
    if not rows:
        return []
    headers = [speak(child.text()) for child in rows[0].children
               if isinstance(child, Node) and child.tag == 'th']
    parts = [sentence(node.text()) for node in table.elements('caption')]
    for row in rows[int(bool(headers)):]:
        cells = [speak(child.text()) for child in row.children
                 if isinstance(child, Node) and child.tag in ('th', 'td')]
        assert not headers or len(cells) == len(headers), 'Check the column labels for this table'
        parts.append(' '.join(sentence(f'{headers[i]}: {cell}' if headers else cell)
                              for i, cell in enumerate(cells)))
    return parts


def narration(root, notice, diagrams):
    paragraphs = []
    diagram_index = 0

    def visit(node):
        nonlocal diagram_index
        if node.tag in SKIPPED_TAGS or node.attrs.get('aria-hidden') == 'true':
            return
        if SKIPPED_CLASSES.intersection(node.attrs.get('class', '').split()):
            return
        if node.has('lab-article-entry'):
            decks = [n for n in node.elements('p') if n.has('lab-page-deck')]
            assert len(decks) == 1, 'Expected a single article introduction'
            paragraphs.append(sentence(decks[0].text()))
            if notice:
                paragraphs.append(sentence(notice.text()))
        elif node.has('lab-scroll-diagram'):
            svg = next(node.elements('svg'), None)
            title = next(svg.elements('title'), None) if svg else None
            desc = next(svg.elements('desc'), None) if svg else None
            pair = (title.text(), desc.text()) if title and desc else None
            if pair is None and diagram_index < len(diagrams):
                pair = diagrams[diagram_index]
            if not pair or not all(compact(t) for t in pair):
                raise ValueError('Diagram needs an accessible title and description')
            paragraphs.append('Diagram. ' + sentence(pair[0]) + ' ' + sentence(pair[1]))
            diagram_index += 1
        elif node.tag == 'table':
            paragraphs.extend(read_table(node))
        elif node.tag in ('ol', 'ul'):
            index = int(node.attrs.get('start', '1'))
            for item in node.children:
                if not isinstance(item, Node) or item.tag != 'li':
                    continue
                index = int(item.attrs.get('value', index))
                first = len(paragraphs)
                # Keep mixed paragraphs and sublists in order without speaking their text twice.
                direct = []
                for child in item.children:
                    if isinstance(child, Node) and child.tag in ('ol', 'ul', 'p'):
                        if direct:
                            paragraphs.append(sentence(''.join(direct)))
                            direct = []
                        visit(child)
                    else:
                        direct.append(child if isinstance(child, str) else child.text())
                if direct and compact(''.join(direct)):
                    paragraphs.append(sentence(''.join(direct)))
                if node.tag == 'ol' and len(paragraphs) > first:
                    paragraphs[first] = f'{index}. ' + paragraphs[first]
                index += 1
        elif any(c.startswith('language-') for c in node.attrs.get('class', '').split()):
            paragraphs.extend(code_paragraphs(node))
        elif node.tag in HEADINGS | {'summary', 'figcaption', 'p', 'dt', 'dd'} or node.has('status-label'):
            paragraphs.append(sentence(node.text()))
        else:
            for child in node.children:
                if isinstance(child, Node):
                    visit(child)

    visit(root)
    if diagrams and len(diagrams) != diagram_index:
        raise ValueError('Rendered and source diagrams differ. Build docs and HTML from the same revision.')
    return [part for part in paragraphs if part]


def route_for(relative):
    path = relative.with_suffix('').as_posix()
    return '/' + (path[:-5] if path.endswith('/index') else path)


def canonical(root):
    return next(n.attrs['href'] for n in root.elements('link') if n.attrs.get('rel') == 'canonical')


def generate(dist, docs, out, expected, check=False):
    publication = canonical(Document((dist / 'index.html').read_text()).root)
    items = []
    result = {}
    for html in sorted(dist.rglob('*.html')):
        root = Document(html.read_text()).root
        is_article = any(n.attrs.get('property') == 'og:type' and n.attrs.get('content') == 'article'
                         for n in root.elements('meta'))
        if not is_article:
            continue
        relative = html.relative_to(dist)
        route = route_for(relative)
        try:
            if canonical(root) != urljoin(publication, route.lstrip('/')):
                raise ValueError('HTML path and canonical URL identify different chapters')
            bodies = [n for n in root.elements() if n.has('vp-doc')]
            assert len(bodies) == 1, 'Expected one rendered chapter body'
            headings = list(bodies[0].elements('h1'))
            assert len(headings) == 1, 'Expected one chapter heading'
            title = compact(headings[0].text())
            notice = next((n for n in root.elements('aside') if n.has('reference-notice')), None)
            md = docs / relative.with_suffix('.md')
            paragraphs = narration(bodies[0], notice, source_diagrams(md.read_text()))
            assert len(paragraphs) > 3 and paragraphs[0] == sentence(title), 'Title or chapter body missing'
            text = '\n\n'.join(paragraphs) + '\n'
        except (AssertionError, ValueError, FileNotFoundError, StopIteration) as error:
            raise ValueError(f'{route}: {error}') from error
        ident = 'lab-' + route.strip('/').replace('/', '-')
        text_path = 'text/' + ident + '.txt'
        if text_path in result:
            raise ValueError(f'Nonunique chapter ID {ident}')
        result[text_path] = text
        items.append({'id': ident, 'route': route, 'title': title, 'textPath': text_path,
                      'wordCount': len(text.split()), 'sha256': hashlib.sha256(text.encode()).hexdigest()})
    if not items or (expected is not None and len(items) != expected):
        raise ValueError(f'Found {len(items)} article routes, expected {expected or "at least one"}')
    result['manifest.json'] = json.dumps({'items': items}, ensure_ascii=False, indent=2) + '\n'
    if check:
        for path, text in result.items():
            target = out / path
            if not target.is_file() or target.read_bytes() != text.encode('utf-8'):
                raise ValueError(f'{target} does not match the built chapter and manifest')
    else:
        (out / 'text').mkdir(parents=True, exist_ok=True)
        for path, text in result.items():
            (out / path).write_bytes(text.encode('utf-8'))
    print(f'{len(items)} chapters, {sum(i["wordCount"] for i in items):,} words. {out / "manifest.json"}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dist', type=Path, default=Path('dist'))
    parser.add_argument('--docs', type=Path, default=Path('docs'))
    parser.add_argument('--out', type=Path, required=True)
    parser.add_argument('--expect-count', type=int)
    parser.add_argument('--check', action='store_true', help='Verify the saved scripts against the built articles without writing')
    args = parser.parse_args()
    generate(args.dist, args.docs, args.out, args.expect_count, args.check)
