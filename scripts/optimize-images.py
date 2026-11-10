"""Regenerate web derivatives without changing either original image.
Requires Python 3 and Pillow. EXIF orientation is applied; metadata is omitted.
"""
from pathlib import Path
from PIL import Image, ImageOps

images = Path(__file__).resolve().parents[1] / 'docs/public/images'
for filename, widths in [('keith-williams.jpg', (480, 960, 1440)), ('explorer-horizon.webp', (480, 960, 1254))]:
    source = ImageOps.exif_transpose(Image.open(images / filename)).convert('RGB')
    for width in widths:
        height = round(source.height * width / source.width)
        image = source.resize((width, height), Image.Resampling.LANCZOS)
        target = images / f'{Path(filename).stem}-{width}.webp'
        image.save(target, 'WEBP', quality=82, method=6)
        print(f'{target.name}: {target.stat().st_size:,} bytes, {width} × {height}')
