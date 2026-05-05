"""Strip the background from public/jc-portrait.jpg using rembg.

First run downloads the u2net ONNX model (~170MB) into the user cache. Subsequent runs reuse it.

Output: public/jc-portrait.png (RGBA with transparent background).
"""

from pathlib import Path
from rembg import remove
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "jc professional image.jpg"  # original full-res source
DST = ROOT / "public" / "jc-portrait.png"

# Load original, run bg removal, save as PNG with alpha
with Image.open(SRC) as src:
    src = src.convert("RGBA")
    cut = remove(src)
    cut.save(DST, format="PNG", optimize=True)

print(f"wrote {DST} ({DST.stat().st_size / 1024:.1f} KB)")
