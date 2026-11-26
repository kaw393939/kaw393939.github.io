"""Hold a public release until its spoken and written editions match."""
import argparse
import json
import os
from html.parser import HTMLParser
from pathlib import Path

class Player(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []
    def handle_starttag(self, tag, pairs):
        if tag == 'audio':
            self.elements.append(dict(pairs))

parser = argparse.ArgumentParser()
for name in ('journal','lab','media','dist'):
    parser.add_argument('--'+name, required=True, type=Path)
args = parser.parse_args()
previous = json.loads((args.media/'catalog.json').read_text())
catalog = {(r['publication'],r['route']):r for r in previous['items']}
changed = []
seen = set()
for name in ('journal','lab'):
    inputs = json.loads((getattr(args,name)/'manifest.json').read_text())
    for item in inputs.get('rows', inputs.get('items', [])):
        route = item['route']
        seen.add((name,route))
        record = catalog.get((name,route))
        if not record or item['sha256'] != record['sha256']:
            changed.append(f'{name} {route}')
            continue
        filename = route.lstrip('/') + ('index.html' if route.endswith('/') else '.html')
        html = args.dist / ('knowledge-lab' if name == 'lab' else '') / filename
        inspect = Player()
        inspect.feed(html.read_text())
        expected = 'https://keithwilliams.org/listen/' + record['file']
        if not any(p.get('src') == expected and 'controls' in p and p.get('preload') == 'none' and 'autoplay' not in p for p in inspect.elements):
            raise ValueError(f'Missing accessible recording: {html}')
if not seen:
    raise ValueError('No narrated pages found')
removed = set(catalog)-seen
ready = not (changed or removed)
print(f'{len(seen)} written editions checked; {len(changed)} await recording, {len(removed)} retired.')
if changed: print('\n'.join(changed))
if 'GITHUB_OUTPUT' in os.environ:
    with open(os.environ['GITHUB_OUTPUT'],'a') as out:
        print('ready='+str(ready).lower(),file=out)
elif not ready:
    raise SystemExit(1)
