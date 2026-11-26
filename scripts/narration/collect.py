"""Publish a complete set of validated recordings to the separate media checkout."""
import argparse
import hashlib
import json
import math
import re
import shutil
from pathlib import Path

args = argparse.ArgumentParser()
for option in ['prepared', 'parts', 'published']:
    args.add_argument('--' + option, type=Path, required=True)
cfg = args.parse_args()
catalog = json.loads((cfg.prepared/'catalog.json').read_text())
previous_path = cfg.published / 'catalog.json'
previous = json.loads(previous_path.read_text()) if previous_path.exists() else {}
old = {row['id']: row for row in previous.get('items', [])} if previous.get('recipe') == catalog['recipe'] else {}
parts = {}
for part in sorted(cfg.parts.rglob('manifest-*.json')):
    rows = json.loads(part.read_text())
    if set(rows) & set(parts):
        raise ValueError(f'Duplicate recordings in {part}')
    parts.update({key: (value, part.parent / (key + '.mp3')) for key, value in rows.items()})
expected = {p.stem for p in (cfg.prepared/'input').glob('*.txt')}
if expected != set(parts):
    raise ValueError(f'Rendered recordings differ from inputs: {sorted(expected ^ set(parts))}')
recordings = []
published = cfg.published.resolve()
for row in catalog['items']:
    uid, digest = row['id'], row['sha256']
    if not re.fullmatch(r'(journal|lab)-[a-zA-Z0-9_-]+', uid) or not re.fullmatch(r'[a-f0-9]{64}', digest):
        raise ValueError(f'Invalid audio identifier: {uid}')
    if uid in parts:
        record, path = parts[uid]
        if record['sha256'] != digest:
            raise ValueError(f'Spoken text does not match {uid}')
        seconds = record['seconds']
    else:
        record = old[uid]
        if record['sha256'] != digest:
            raise ValueError(f'Outdated audio for {uid}')
        seconds, path = record['seconds'], (published / record['file']).resolve()
        if not path.is_relative_to(published):
            raise ValueError(uid)
    if not math.isfinite(seconds) or seconds < 1 or not path.is_file() or path.stat().st_size < 2048:
        raise ValueError(f'Invalid audio for {uid}')
    media_digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if uid not in parts and media_digest != record['audioSha256']:
        raise ValueError(f'Cached audio failed integrity check: {uid}')
    rel = 'audio/' + uid + '-' + media_digest[:12] + '.mp3'
    recordings.append((dict(row, file=rel, seconds=seconds, bytes=path.stat().st_size, audioSha256=media_digest), path))

(published/'audio').mkdir(exist_ok=True)
manifests = {'journal': {}, 'lab': {}}
for row, source in recordings:
    target = published / row['file']
    if target.resolve() != source.resolve():
        shutil.copyfile(source, target)
    manifests[row['publication']][row['route']] = {'src': 'https://keithwilliams.org/listen/' + row['file'], 'seconds': row['seconds']}
catalog['items'] = [r for r, _ in recordings]
for name, data in [('catalog', catalog), *manifests.items()]:
    target = published / (name + '.json')
    target.write_text(json.dumps(data, indent=2, sort_keys=True, ensure_ascii=False) + '\n')
print(f"{len(recordings)} verified recordings, {len(parts)} newly rendered.")
