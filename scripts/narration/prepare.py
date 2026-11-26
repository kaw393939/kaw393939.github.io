#!/usr/bin/env python3
"""Stage changed narration texts after journal and Lab extraction. Uses the standard library."""
import argparse
import hashlib
import json
import math
import re
from pathlib import Path

RECIPE = 'kokoro-heart-en-v1'
SLUG = r'[a-z0-9]+(?:-[a-z0-9]+)*'
DIRECTORY_INDEXES = {'/students', '/build', '/decisions', '/design', '/guide', '/project',
                     '/reference', '/research', '/reuse', '/reviews'}


def route_for(value, publication):
    if not isinstance(value, str) or not value.startswith('/') or '//' in value:
        raise ValueError(f'Invalid {publication} route {value!r}')
    if publication == 'lab':
        value = value.removeprefix('/knowledge-lab/')
        if not value.startswith('/'):
            value = '/' + value
        value = value.removesuffix('.html')
        if value.endswith('/index'):
            value = value[:-len('index')]
        if value in DIRECTORY_INDEXES:
            value += '/'
    if not re.fullmatch(r'/' + SLUG + r'(?:/' + SLUG + r')*/?', value):
        raise ValueError(f'Unexpected {publication} content route {value!r}')
    if value in {'/index', '/404'} or (publication == 'journal' and value.endswith('/')):
        raise ValueError(f'Unexpected {publication} landing page {value!r}')
    return value


def confined_file(root, relative):
    """A file symlink may only resolve to a file under the same publication root."""
    path = root / relative
    if not path.resolve().is_relative_to(root.resolve()):
        raise ValueError(f'Path leaves {root}: {relative!r}')
    return path


def load_inputs(publication, directory):
    manifest = json.loads((directory / 'manifest.json').read_text(encoding='utf-8'))
    is_lab = publication == 'lab'
    rows = manifest.get('items' if is_lab else 'rows')
    if not isinstance(rows, list) or not rows:
        raise ValueError(f'Expected a nonempty {publication} text manifest')
    if not is_lab and manifest.get('version') != 1:
        raise ValueError('Unknown journal text manifest version')
    records = []
    expected = set()
    for row in rows:
        route = route_for(row['route'], publication)
        slug = route.strip('/')
        source_id = ('lab-' + slug.replace('/', '-')) if is_lab else slug.replace('/', '__')
        ident = source_id if is_lab else ('journal-' + source_id)
        selected_path = row.get('textPath' if is_lab else 'textFile')
        if row.get('id') != source_id or selected_path != f'text/{source_id}.txt':
            raise ValueError(f'Unexpected {publication} script ID or path for {route}')
        source = confined_file(directory, selected_path)
        if source in expected:
            raise ValueError(f'Duplicate {publication} script {source.name!r}')
        expected.add(source)
        content = source.read_bytes()
        words = len(content.decode('utf-8').split())
        title = row.get('title')
        if not words or not isinstance(title, str) or not title.strip():
            raise ValueError(f'Empty {publication} text or title for {route}')
        if words != row.get('wordCount' if is_lab else 'words'):
            raise ValueError(f'Word count mismatch for {route}')
        digest = hashlib.sha256(content).hexdigest()
        if digest != row.get('sha256'):
            raise ValueError(f'Source hash mismatch for {publication} {route}')
        records.append(({'publication': publication, 'route': route, 'id': ident,
                         'sha256': digest, 'title': title}, content))
    extra = set((directory / 'text').glob('*.txt')) - expected
    if extra:
        raise ValueError('Unexpected scripts outside the current manifest: ' +
                         ', '.join(sorted(path.name for path in extra)))
    return records


def previous_catalog(root):
    source = confined_file(root, 'catalog.json')
    if not source.exists():
        return {}
    manifest = json.loads(source.read_text(encoding='utf-8'))
    if manifest.get('version') != 1 or manifest.get('recipe') != RECIPE:
        return {}
    rows = manifest.get('items')
    if not isinstance(rows, list):
        raise ValueError('Invalid previous narration catalog')
    result = {}
    for row in rows:
        ident = row['id']
        if ident in result:
            raise ValueError(f'Duplicate ID in previous narration catalog: {ident}')
        result[ident] = row
    return result


def can_reuse(root, current, previous):
    if not previous:
        return False
    if any(previous.get(key) != current[key] for key in ('publication', 'route', 'id', 'sha256')):
        return False
    seconds = previous.get('seconds')
    if type(seconds) not in (int, float) or not math.isfinite(seconds) or seconds <= 0:
        return False
    audio_hash = previous.get('audioSha256')
    if not isinstance(audio_hash, str) or not re.fullmatch(r'[0-9a-f]{64}', audio_hash):
        return False
    name = f"audio/{current['id']}-{audio_hash[:12]}.mp3"
    if previous.get('file') != name:
        return False
    media = confined_file(root, name)
    if not media.is_file():
        return False
    if 'bytes' in previous:
        size = previous['bytes']
        if type(size) is not int or size != media.stat().st_size or size <= 0:
            return False
    # Verify the content-addressed audio before removing its script from the render queue.
    with media.open('rb') as handle:
        header = handle.read(4)
        if len(header) != 4 or not (
                header.startswith(b'ID3') or (header[0] == 0xFF and header[1] & 0xE0 == 0xE0)):
            return False
        digest = hashlib.sha256(header)
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest() == audio_hash


def write_queue(out, records, pending):
    queue = out / 'input'
    if queue.is_symlink():
        raise ValueError('Render input must be a regular staging directory')
    queue.mkdir(parents=True, exist_ok=True)
    # Only remove old managed text files. An unexpected file calls for a clean staging path.
    managed = re.compile(r'(?:journal|lab)-[a-z0-9_-]+\.txt')
    for path in queue.iterdir():
        if not managed.fullmatch(path.name) or not path.is_file() or path.is_symlink():
            raise ValueError(f'Unexpected file in render input: {path.name!r}')
    for path in queue.iterdir():
        if path.stem not in pending:
            path.unlink()
    for ident, content in pending.items():
        (queue / (ident + '.txt')).write_bytes(content)
    catalog = {'version': 1, 'recipe': RECIPE, 'items': [row for row, _ in records]}
    target = out / 'catalog.json'
    if target.is_symlink():
        raise ValueError('Render catalog must be a regular file')
    target.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ('journal', 'lab', 'out', 'previous'):
        parser.add_argument('--' + name, type=Path, required=True)
    args = parser.parse_args()
    roots = [path.resolve() for path in (args.journal, args.lab, args.out, args.previous)]
    if len(set(roots)) != len(roots):
        parser.error('Journal, Lab, staging and previous release need separate directories')
    records = load_inputs('journal', args.journal) + load_inputs('lab', args.lab)
    ids = [row['id'] for row, _ in records]
    routes = [(row['publication'], row['route']) for row, _ in records]
    if len(ids) != len(set(ids)) or len(routes) != len(set(routes)):
        raise ValueError('Duplicate publication route or render ID')
    previous = previous_catalog(args.previous)
    pending = {row['id']: content for row, content in records
               if not can_reuse(args.previous, row, previous.get(row['id']))}
    write_queue(args.out, records, pending)
    print(f'{len(records)} articles and chapters. Render {len(pending)}; '
          f'reuse {len(records) - len(pending)}.')


if __name__ == '__main__':
    main()
