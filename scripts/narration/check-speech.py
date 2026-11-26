#!/usr/bin/env python3
"""Spot-check the openings of two public narrations with a local English recognizer."""
import argparse
import hashlib
import json
import re
import subprocess
import tempfile
from pathlib import Path
from urllib.request import urlopen

PUBLIC_MEDIA = 'https://keithwilliams.org/listen/'
MODEL_HASH = '66cfde4ce0b6da9e1a4352e58f0c968f87da23070cf229c81ae0d520cddad2a2'
SECONDS = 25
RATE = 16_000
# Each group has one vote. Only inflections present in ordinary English are alternatives.
# Neither the keywords nor a script are supplied to the recognizer.
SAMPLES = {
    ('journal', '/teaching/when-ai-helps-write-the-code'): {
        'id': 'journal-teaching__when-ai-helps-write-the-code',
        'groups': ('game games', 'rock', 'paper', 'scissors scissor', 'coach',
                   'computer', 'tests test', 'students student'),
    },
    ('lab', '/guide/walkthrough'): {
        'id': 'lab-guide-walkthrough',
        'groups': ('incident', 'accounts account', 'witness', 'movement',
                   'report reports', 'stationary', 'light', 'disagreement'),
    },
}


def read_media(relative, checkout=None):
    if checkout is None:
        with urlopen(PUBLIC_MEDIA + relative, timeout=60) as response:
            return response.read()
    root = checkout.resolve()
    source = (root / relative).resolve()
    if not source.is_relative_to(root):
        raise ValueError('Expected a file from the public narration checkout.')
    return source.read_bytes()


def select(catalog):
    found = {}
    for row in catalog['items']:
        key = (row['publication'], row['route'])
        if key not in SAMPLES:
            continue
        if key in found:
            raise ValueError(f'Duplicate public recording: {key}')
        uid = SAMPLES[key]['id']
        digest = row['audioSha256']
        if (row['id'] != uid or not re.fullmatch(r'[0-9a-f]{64}', digest)
                or row.get('file') != f'audio/{uid}-{digest[:12]}.mp3'):
            raise ValueError(f'Unexpected release file for {key}')
        found[key] = row
    if set(found) != set(SAMPLES):
        raise ValueError('The public release catalog must contain both requested article recordings.')
    return found


def matches(words, groups):
    return [group.split()[0] for group in groups if words.intersection(group.split())]


def score(transcript, key):
    words = set(re.findall(r"[a-z]+", transcript.lower()))
    expected = matches(words, SAMPLES[key]['groups'])
    other_key, = (k for k in SAMPLES if k != key)
    other = matches(words, SAMPLES[other_key]['groups'])
    return {'transcript': transcript, 'matched': expected, 'matchedOtherSample': other,
            'passed': len(expected) >= 5 and len(expected) >= len(other) + 3}


def opening(mp3_path):
    # ffmpeg receives a checked local path. Only the first 25 seconds of mono PCM reach ASR.
    import numpy as np
    result = subprocess.run(
        ['ffmpeg', '-v', 'error', '-nostdin', '-i', str(mp3_path), '-t', str(SECONDS),
         '-vn', '-ac', '1', '-ar', str(RATE), '-f', 'f32le', 'pipe:1'],
        check=True, capture_output=True, timeout=90)
    samples = np.frombuffer(result.stdout, dtype='<f4')
    if len(samples) < (SECONDS - 1) * RATE:
        raise ValueError(f'Clip is too short for a {SECONDS}-second spot-check.')
    return samples


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--model', type=Path, required=True,
                        help='Extracted sherpa-onnx-nemo-ctc-en-conformer-small directory')
    parser.add_argument('--published', type=Path,
                        help='Local copy of the public media release. Defaults to keithwilliams.org/listen.')
    parser.add_argument('--report', type=Path, help='Optional JSON report path')
    args = parser.parse_args()
    model = args.model / 'model.int8.onnx'
    if hashlib.sha256(model.read_bytes()).hexdigest() != MODEL_HASH:
        parser.error('Quantized NeMo model does not match the published model hash.')
    import sherpa_onnx
    recognizer = sherpa_onnx.OfflineRecognizer.from_nemo_ctc(
        model=str(model), tokens=str(args.model / 'tokens.txt'), num_threads=2, provider='cpu')
    rows = select(json.loads(read_media('catalog.json', args.published)))
    streams = []
    with tempfile.TemporaryDirectory() as temporary:
        for key in SAMPLES:
            row = rows[key]
            binary = read_media(row['file'], args.published)
            if len(binary) != row['bytes'] or hashlib.sha256(binary).hexdigest() != row['audioSha256']:
                raise ValueError(f'Public recording failed its release integrity check: {key}')
            audio_path = Path(temporary) / (row['id'] + '.mp3')
            audio_path.write_bytes(binary)
            stream = recognizer.create_stream()
            stream.accept_waveform(RATE, opening(audio_path))
            streams.append(stream)
        recognizer.decode_streams(streams)
    items = []
    for key, stream in zip(SAMPLES, streams):
        result = score(stream.result.text.strip(), key)
        items.append({'publication': key[0], 'route': key[1], 'audioSha256': rows[key]['audioSha256'],
                      **result})
    report = {'recognizer': 'Sherpa-ONNX / English NeMo Conformer-CTC-small, int8',
              'secondsPerOpening': SECONDS, 'items': items,
              'passed': all(item['passed'] for item in items)}
    output = json.dumps(report, ensure_ascii=False, indent=2) + '\n'
    print(output, end='')
    if args.report:
        args.report.write_text(output, encoding='utf-8')
    return 0 if report['passed'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
