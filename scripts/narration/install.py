"""Install edition indexes before rendering and audio in the finished Pages site."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--media', type=Path, required=True)
parser.add_argument('--manifest-dir', type=Path)
parser.add_argument('--public-dir', type=Path)
args = parser.parse_args()
catalog = json.loads((args.media / 'catalog.json').read_text())
if not catalog['items']:
    raise ValueError('The narrated edition is empty')
if args.manifest_dir:
    args.manifest_dir.mkdir(parents=True, exist_ok=True)
    for suffix in ('journal', 'lab'):
        shutil.copyfile(args.media/(suffix+'.json'), args.manifest_dir/(suffix+'.json'))
    shutil.copyfile(args.media/'journal.json', 'docs/.vitepress/narration.json')
if args.public_dir:
    dest = args.public_dir
    (dest/'audio').mkdir(parents=True, exist_ok=True)
    for row in catalog['items']:
        file = Path(row['file'])
        if file.parent != Path('audio') or file.suffix != '.mp3':
            raise ValueError(f'Invalid audio path for {row["id"]}')
        src = args.media / file
        if src.stat().st_size != row['bytes'] or hashlib.sha256(src.read_bytes()).hexdigest() != row['audioSha256']:
            raise ValueError(f'Corrupt recording: {row["id"]}')
        shutil.copyfile(src, dest/file)
    for name in ['journal.json','lab.json','catalog.json']:
        shutil.copyfile(args.media/name, dest/name)
    print(f"{len(catalog['items'])} integrity-checked audio files installed.")
