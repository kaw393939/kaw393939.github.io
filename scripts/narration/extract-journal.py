#!/usr/bin/env python3
"""Extract full spoken scripts for the articles in the built Writing index.

Run after building the portfolio:
  python3 scripts/build-narration-text.py --dist docs/.vitepress/dist --out .cache/journal

The manifest records the extraction policy and the SHA-256 of each UTF-8 script,
including its final newline. No network access or third-party packages required.
"""
import argparse
import hashlib
import json
import re
from collections import Counter
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path

POLICY = (
    'Reads the title, deck, headings, prose, quotations, lists, labeled table rows, '
    'and expanded evidence entries in page order. Descriptive source links keep their '
    'spoken labels. Navigation, bylines, sharing and player controls, decorative figures, '
    'raw URLs, and standalone employer-link buttons are omitted. Skill totals are spoken '
    'once. The written article provides URLs, exact filenames and code formatting.'
)
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
SKIP_TAGS = set('audio button figcaption figure footer header img input meter nav noscript '
                'script select style svg template video'.split())
SKIP_CLASSES = {
    'byline', 'header-anchor', 'share-feedback', 'story-share', 'article-audio',
    'article-narration', 'narration-player', 'listen-player',
}
HEADINGS = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}


@dataclass
class Node:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)

    def classes(self):
        return set(self.attrs.get('class', '').split())

    def nodes(self):
        return (child for child in self.children if isinstance(child, Node))

    def descend(self, tag):
        for child in self.nodes():
            if child.tag == tag:
                yield child
            yield from child.descend(tag)


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node('document')
        self.stack = [self.root]
        self.feed(source)
        self.close()

    def handle_starttag(self, tag, attrs):
        child = Node(tag, dict(attrs))
        self.stack[-1].children.append(child)
        if tag not in VOID:
            self.stack.append(child)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def skipped(node):
    return (node.tag in SKIP_TAGS or bool(SKIP_CLASSES & node.classes())
            or node.attrs.get('aria-hidden') == 'true'
            or 'hidden' in node.attrs or 'data-narration-ignore' in node.attrs)


def normalize(value):
    value = re.sub(r'https?://[^\s<>]+', '', value)
    value = value.replace('\u200b', '').replace('\xad', '')
    value = re.sub(r'\s*·\s*', '. ', value)
    return re.sub(r'\s+', ' ', value).strip()


def inline(node):
    if isinstance(node, str):
        return node
    if skipped(node):
        return ''
    if node.tag == 'br':
        return '. '
    value = ''.join(inline(child) for child in node.children)
    if node.tag == 'code':
        # Keep these instructional filenames recognizable when spoken by TTS.
        return {'AGENTS.md': 'agents dot M D', 'LESSON.md': 'lesson dot M D'}.get(value, value)
    return value


def spoken_sentence(value):
    if value and not re.search(r'[.!?…:;][”’"\')\]]*$', value):
        return value + '.'
    return value


def is_navigation_paragraph(node):
    links = list(node.descend('a'))
    if not links:
        return False
    outside_links = ''.join(
        inline(child) for child in node.children if isinstance(child, str) or child.tag != 'a')
    if outside_links.strip(' \n\t·|.'):
        return False
    if all(link.attrs.get('href', '').startswith('#') for link in links):
        return True
    return len(links) == 1 and bool(re.search(
        r'(?:employer posting$|^(?:read|view|open) (?:the |.{0,30}’s |.{0,30}\x27s )?'
        r'(?:official |employer )?(?:job )?posting$)', normalize(inline(links[0])), re.I))


def read_table(table, counts):
    headers = []
    result = []
    for row in table.descend('tr'):
        cells = [c for c in row.nodes() if c.tag in {'th', 'td'}]
        if not cells:
            continue
        if any(c.attrs.get('rowspan', '1') != '1' or c.attrs.get('colspan', '1') != '1'
               for c in cells):
            raise ValueError('Spanning table cells require a reviewed narration.')
        values = [normalize(inline(c)) for c in cells]
        if not headers and all(c.tag == 'th' for c in cells):
            headers = [value.rstrip('.:') for value in values]
            continue
        if not headers or len(headers) != len(values):
            raise ValueError('Unable to match table cells to column headings.')
        record = []
        for label, value in zip(headers, values):
            prefix = (label + ' ') if label.endswith('?') else (label + ': ')
            record.append(spoken_sentence(prefix + (value or 'No entry')))
        result.append(' '.join(record))
        counts['tableRows'] += 1
    counts['tables'] += 1
    return result


def blocks(node, counts):
    if skipped(node):
        return []
    if 'story-intro' in node.classes():
        # Whitelist the deck so a new control in the shared header never becomes narration.
        return [spoken_sentence(normalize(inline(p))) for p in node.descend('p')
                if 'article-deck' in p.classes()]
    if node.tag == 'table':
        return read_table(node, counts)
    if node.tag in {'ul', 'ol'}:
        lines = []
        number = int(node.attrs.get('start', 1))
        for item in (child for child in node.nodes() if child.tag == 'li'):
            number = int(item.attrs.get('value', number))
            content = ''.join(inline(c) for c in item.children
                              if isinstance(c, str) or c.tag not in {'ul', 'ol'})
            value = normalize(content)
            if 'career-skill-chart' in node.classes():
                value = re.sub(r'(?<!\d)(\d+)/(10)\b', r'\1 of \2', value)
            if value:
                prefix = f'{number}. ' if node.tag == 'ol' else ''
                lines.append(prefix + spoken_sentence(value))
                counts['listItems'] += 1
            for child in item.nodes():
                if child.tag in {'ul', 'ol'}:
                    lines.extend(blocks(child, counts))
            number += 1
        return lines
    if node.tag == 'p' and is_navigation_paragraph(node):
        return []
    if node.tag == 'details' and 'career-evidence' in node.classes():
        counts['evidenceGroups'] += 1
        counts['evidenceEntries'] += len(list(node.descend('h4')))
    if node.tag in HEADINGS | {'p', 'summary', 'pre', 'dt', 'dd', 'caption'}:
        text = normalize(inline(node))
        if not text:
            return []
        if node.tag == 'pre':
            counts['codeBlocks'] += 1
            return ['Code example. ' + spoken_sentence(text)]
        if node.tag in HEADINGS:
            counts['headings'] += 1
        return [spoken_sentence(text)]
    return [line for child in node.nodes() for line in blocks(child, counts)]


def extract(path):
    root = Page(path.read_text()).root
    main, = root.descend('main')
    title_node, = main.descend('h1')
    title = normalize(inline(title_node))
    # A misconfigured gallery link to an ordinary page should fail loudly.
    if not any('story-intro' in n.classes() for n in main.descend('div')):
        raise ValueError(f'Article header missing from {path}')
    counts = Counter()
    paragraphs = blocks(main, counts)
    if not title or len(paragraphs) < 4 or paragraphs[0] != spoken_sentence(title):
        raise ValueError(f'Missing article content in {path}')
    return title, '\n\n'.join(paragraphs) + '\n', dict(counts)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dist', type=Path, default=Path('docs/.vitepress/dist'))
    parser.add_argument('--out', type=Path, required=True)
    args = parser.parse_args()
    gallery = Page((args.dist / 'writing.html').read_text()).root
    routes = [n.attrs['href'] for n in gallery.descend('a') if 'journal-card-link' in n.classes()]
    if not routes or len(routes) != len(set(routes)):
        raise ValueError('No article cards or non-unique article cards in the Writing index.')
    rows = []
    target = args.out / 'text'
    target.mkdir(parents=True, exist_ok=True)
    for route in routes:
        if not re.fullmatch(r'/[a-z0-9-]+(?:/[a-z0-9-]+)*', route):
            raise ValueError(f'Expected a local clean article URL, got {route!r}')
        article_id = route[1:].replace('/', '__')
        title, text, counts = extract(args.dist / (route[1:] + '.html'))
        relative = 'text/' + article_id + '.txt'
        payload = text.encode('utf-8')
        (args.out / relative).write_bytes(payload)
        rows.append({'route': route, 'id': article_id, 'title': title, 'textFile': relative,
                     'words': len(text.split()), 'sha256': hashlib.sha256(payload).hexdigest(),
                     'structure': counts})
    manifest = {'version': 1, 'policy': POLICY, 'rows': rows}
    (args.out / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    print(f'Generated {len(rows)} full article scripts in {args.out}.')


if __name__ == '__main__':
    main()
