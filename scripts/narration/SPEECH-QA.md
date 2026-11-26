# Independent speech spot-check

This optional check listens to the first 25 seconds of the published classroom feature and the Knowledge Lab walkthrough. It uses a second model to transcribe both clips. It prints the transcript, recognized keywords, and matches against the other article. The recognizer receives audio alone. A passing result requires five of the eight expected word groups and at least three more matches for the correct article than for the other article.

Run on an Ubuntu x86-64 CPU with Python 3.11, FFmpeg, curl, and tar. The setup downloads a 76 MB GitHub release asset and Python wheels. Speech recognition runs locally without an API key or a hosted inference service. The script checks the quantized model and both recordings against their published SHA-256 digests.

```sh
python3.11 -m venv /tmp/speech-qa-env
. /tmp/speech-qa-env/bin/activate
python -m pip install --only-binary=:all: sherpa-onnx==1.12.33 numpy==1.26.4
model=sherpa-onnx-nemo-ctc-en-conformer-small
mkdir -p /tmp/speech-qa-model
curl --fail --location --retry 3 --header 'Accept: application/octet-stream' \
  https://api.github.com/repos/k2-fsa/sherpa-onnx/releases/assets/163711652 \
  --output /tmp/speech-qa-model/model.tar.bz2
tar -xjf /tmp/speech-qa-model/model.tar.bz2 -C /tmp/speech-qa-model \
  "$model/model.int8.onnx" "$model/tokens.txt"
python scripts/narration/check-speech.py --model "/tmp/speech-qa-model/$model" \
  --report /tmp/speech-qa-report.json
```

The default reads the public catalog at `https://keithwilliams.org/listen/catalog.json` and its two specified recordings. To use an existing checkout of that same publication on a fully offline runner, append `--published /path/to/public-media`. The checkout needs its release catalog and the two fingerprinted MP3s. The output identifies each exact recording by its audio digest. Inspect a low score and listen to the clip before attributing the result to the narrator or the recognizer. This sample checks words in two openings. Assess pacing, pronunciation and the rest of a recording separately.

Model details and its quantized file fingerprint are available from the [Sherpa-ONNX English NeMo documentation](https://k2-fsa.github.io/sherpa/onnx/pretrained_models/offline-ctc/nemo/english.html) and the [exported model file](https://huggingface.co/csukuangfj/sherpa-onnx-nemo-ctc-en-conformer-small/blob/808a1d9d688b060b008b4fb50817e0b1cb51e572/model.int8.onnx).
