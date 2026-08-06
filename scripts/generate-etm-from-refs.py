#!/usr/bin/env python3
"""Generate cultural ETM PNG assets from Estonian textile photo references.

Sources (SSOT):
  docs/UX/eesti/floral-band-reference.png  → E1, E4–E8
  docs/UX/eesti/skirt_ornament_reference.png → E2, E3

Output: public/icons/public-home/etm-*.png
Preserves wool/thread realism by cropping/compositing photos (no AI).
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
FLORAL_REF = ROOT / "docs" / "UX" / "eesti" / "floral-band-reference.png"
SKIRT_REF = ROOT / "docs" / "UX" / "eesti" / "skirt_ornament_reference.png"
OUT_DIR = ROOT / "public" / "icons" / "public-home"
CONTACT_DEFAULT = ROOT / "docs" / "tasks" / "backlog-stories" / "icons" / "etm-contact-sheet.png"

# --- Crop constants (tuned against the two reference photos) ---
# Floral band vertical span (includes cream borders)
FLORAL_BAND_BOX = (0, 318, 1804, 545)  # x0,y0,x1,y1 in floral ref
# One clean floral repeat for tiling (red → white → red start)
FLORAL_TILE_X0 = 400
FLORAL_TILE_W = 490
# Red flower motif for rosettes (within band-local coords after FLORAL_BAND_BOX crop)
FLOWER_BOX_IN_BAND = (520, 0, 780, 227)  # relative to band crop
DIVIDER_BOX_IN_BAND = (400, 0, 1100, 227)

# Skirt stripe unit including yellow / green beaded / burgundy
SKIRT_STRIPE_BOX = (320, 200, 720, 1400)
SKIRT_TILE_BLEND = 48

NIGHT = (11, 19, 32, 255)  # #0B1320


def load_rgb(path: Path) -> Image.Image:
    if not path.exists():
        raise SystemExit(f"Missing reference: {path}")
    return Image.open(path).convert("RGB")


def near_white_to_alpha(im: Image.Image, thr: int = 232) -> Image.Image:
    """Make near-white studio backdrop transparent; keep cream embroidery."""
    rgba = im.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r >= thr and g >= thr and b >= thr:
                px[x, y] = (r, g, b, 0)
    return rgba


def make_h_tileable(im: Image.Image, blend: int = 32) -> Image.Image:
    """Cross-fade left/right edges for seamless horizontal tiling."""
    rgba = im.convert("RGBA")
    w, h = rgba.size
    blend = min(blend, w // 4)
    if blend < 2:
        return rgba
    out = rgba.copy()
    src = rgba.load()
    dst = out.load()
    for x in range(blend):
        t = x / blend
        for y in range(h):
            left = src[x, y]
            right = src[w - blend + x, y]
            # blend right-edge pixels toward left-edge
            rx = w - blend + x
            a = t
            dst[rx, y] = tuple(
                int(right[i] * (1 - a) + left[i] * a) for i in range(4)
            )
    return out


def make_v_tileable(im: Image.Image, blend: int = 48) -> Image.Image:
    """Cross-fade top/bottom edges for seamless vertical tiling."""
    rgba = im.convert("RGBA")
    w, h = rgba.size
    blend = min(blend, h // 4)
    if blend < 2:
        return rgba
    out = rgba.copy()
    src = rgba.load()
    dst = out.load()
    for y in range(blend):
        t = y / blend
        for x in range(w):
            top = src[x, y]
            bot_y = h - blend + y
            bot = src[x, bot_y]
            a = t
            dst[x, bot_y] = tuple(
                int(bot[i] * (1 - a) + top[i] * a) for i in range(4)
            )
    return out


def circular_crop(
    im: Image.Image,
    size: int,
    *,
    soft: float = 0.06,
    opacity: float = 1.0,
) -> Image.Image:
    """Fit image into a circular RGBA canvas."""
    src = im.convert("RGBA")
    # Cover the circle
    scale = max(size / src.width, size / src.height)
    nw, nh = max(1, int(src.width * scale)), max(1, int(src.height * scale))
    scaled = src.resize((nw, nh), Image.Resampling.LANCZOS)
    cx0 = (nw - size) // 2
    cy0 = (nh - size) // 2
    tile = scaled.crop((cx0, cy0, cx0 + size, cy0 + size))

    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    inset = int(size * soft)
    draw.ellipse((inset, inset, size - 1 - inset, size - 1 - inset), fill=255)
    if soft > 0:
        mask = mask.filter(ImageFilter.GaussianBlur(radius=max(1, size * soft * 0.5)))

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(tile, (0, 0))
    # Apply circular alpha
    r, g, b, a = out.split()
    # combine existing alpha with circle mask
    a = ImageChops_multiply(a, mask)
    if opacity < 1.0:
        a = a.point(lambda v: int(v * opacity))
    return Image.merge("RGBA", (r, g, b, a))


def ImageChops_multiply(a: Image.Image, b: Image.Image) -> Image.Image:
    from PIL import ImageChops

    return ImageChops.multiply(a, b)


def annular_shell_from_band(
    band: Image.Image,
    size: int = 512,
    r_inner: float = 0.32,
    r_outer: float = 0.48,
) -> Image.Image:
    """Map floral band into a ring; transparent center for step numbers."""
    band = band.convert("RGB")
    bw, bh = band.size
    bp = band.load()
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    op = out.load()
    cx = cy = size / 2
    half = size / 2
    for y in range(size):
        for x in range(size):
            dx = x - cx + 0.5
            dy = y - cy + 0.5
            rn = math.hypot(dx, dy) / half
            if rn < r_inner or rn > r_outer:
                continue
            angle = (math.atan2(dy, dx) + math.pi) / (2 * math.pi)  # 0..1
            bx = int(angle * bw) % bw
            t = (rn - r_inner) / (r_outer - r_inner)
            by = min(bh - 1, max(0, int(t * (bh - 1))))
            r, g, b = bp[bx, by]
            # soft falloff at ring edges
            edge = min(rn - r_inner, r_outer - rn) / max(1e-6, (r_outer - r_inner) * 0.5)
            alpha = int(255 * min(1.0, edge * 2.5))
            op[x, y] = (r, g, b, alpha)
    return out


def build_floral_band() -> Image.Image:
    floral = load_rgb(FLORAL_REF)
    band = floral.crop(FLORAL_BAND_BOX)
    # Extract one repeat unit and make tileable; then expand to ~1600px wide
    x0 = FLORAL_TILE_X0
    unit = band.crop((x0, 0, x0 + FLORAL_TILE_W, band.height))
    unit = make_h_tileable(unit.convert("RGBA"), blend=28)
    # Tile to ~1600 width
    target_w = 1600
    tiles = math.ceil(target_w / unit.width)
    canvas = Image.new("RGBA", (tiles * unit.width, unit.height), (0, 0, 0, 0))
    for i in range(tiles):
        canvas.paste(unit, (i * unit.width, 0), unit)
    return canvas.crop((0, 0, target_w, unit.height))


def build_stripe_vertical() -> Image.Image:
    skirt = load_rgb(SKIRT_REF)
    unit = skirt.crop(SKIRT_STRIPE_BOX).convert("RGBA")
    unit = make_v_tileable(unit, blend=SKIRT_TILE_BLEND)
    # Normalize height to 1024 keeping aspect
    target_h = 1024
    scale = target_h / unit.height
    nw = max(1, int(unit.width * scale))
    return unit.resize((nw, target_h), Image.Resampling.LANCZOS)


def build_stripe_cap(stripe: Image.Image) -> Image.Image:
    """Thin horizontal bar of vertical stripes (CSS card/menu accent)."""
    # Take mid horizontal slice, scale to 512×32
    mid = stripe.height // 2
    slice_h = max(8, stripe.height // 40)
    strip = stripe.crop((0, mid - slice_h // 2, stripe.width, mid + slice_h // 2))
    return strip.resize((512, 32), Image.Resampling.LANCZOS)


def build_flower_source(band: Image.Image) -> Image.Image:
    x0, y0, x1, y1 = FLOWER_BOX_IN_BAND
    # Clamp to band size
    x1 = min(x1, band.width)
    y1 = min(y1, band.height)
    return band.crop((x0, y0, x1, y1))


def build_divider(band: Image.Image) -> Image.Image:
    x0, y0, x1, y1 = DIVIDER_BOX_IN_BAND
    x1 = min(x1, band.width)
    y1 = min(y1, band.height)
    div = band.crop((x0, y0, x1, y1)).convert("RGBA")
    # Scale width to ~640
    target_w = 640
    scale = target_w / div.width
    nh = max(1, int(div.height * scale))
    return div.resize((target_w, nh), Image.Resampling.LANCZOS)


def save(im: Image.Image, name: str, dry_run: bool) -> Path:
    path = OUT_DIR / name
    if dry_run:
        print(f"DRY  {path.relative_to(ROOT)} {im.size} {im.mode}")
        return path
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True)
    print(f"OK   {path.relative_to(ROOT)} {im.size} {path.stat().st_size}b")
    return path


def contact_sheet(paths: list[Path], out: Path) -> None:
    """Night-bg preview including 2×2 tile checks for band/stripe."""
    cells: list[tuple[str, Image.Image]] = []
    for p in paths:
        if not p.exists():
            continue
        im = Image.open(p).convert("RGBA")
        cells.append((p.stem, im))

    # Tile previews
    for p in paths:
        if "floral-band" in p.name and p.exists():
            im = Image.open(p).convert("RGBA")
            tw, th = im.width * 2, im.height * 2
            tiled = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
            for yy in range(2):
                for xx in range(2):
                    tiled.paste(im, (xx * im.width, yy * im.height), im)
            cells.append(("floral-band 2x2 tile", tiled))
        if "stripe-vertical" in p.name and p.exists():
            im = Image.open(p).convert("RGBA")
            tw, th = im.width * 2, im.height * 2
            tiled = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
            for yy in range(2):
                for xx in range(2):
                    tiled.paste(im, (xx * im.width, yy * im.height), im)
            cells.append(("stripe-vertical 2x2 tile", tiled))

    cols = 3
    cell = 280
    rows = math.ceil(len(cells) / cols)
    sheet = Image.new("RGBA", (cols * cell, rows * (cell + 22)), NIGHT)
    draw = ImageDraw.Draw(sheet)
    for i, (label, im) in enumerate(cells):
        r, c = divmod(i, cols)
        x, y = c * cell, r * (cell + 22)
        # fit
        scale = min((cell - 16) / im.width, (cell - 16) / im.height)
        nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
        thumb = im.resize((nw, nh), Image.Resampling.LANCZOS)
        ox = x + (cell - nw) // 2
        oy = y + (cell - nh) // 2
        sheet.alpha_composite(thumb, (ox, oy))
        draw.text((x + 6, y + cell - 2), label[:36], fill=(220, 220, 220, 255))

    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.convert("RGB").save(out, "PNG", optimize=True)
    print(f"wrote contact sheet {out.relative_to(ROOT)}")


ASSET_IDS = {
    "E1": "etm-floral-band.png",
    "E2": "etm-stripe-vertical.png",
    "E3": "etm-stripe-cap.png",
    "E4": "etm-watermark-folk.png",
    "E5": "etm-empty-rosette.png",
    "E6": "etm-floral-divider.png",
    "E7": "etm-category-rosette.png",
    "E8": "etm-step-shell.png",
}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--only",
        action="append",
        default=[],
        help="Generate only these ids (E1..E8), repeatable",
    )
    parser.add_argument(
        "--contact-sheet",
        nargs="?",
        const=str(CONTACT_DEFAULT),
        default=None,
        help=f"Write Night contact sheet (default {CONTACT_DEFAULT.name})",
    )
    args = parser.parse_args()

    want = {a.upper() for a in args.only} if args.only else set(ASSET_IDS)

    floral_full = load_rgb(FLORAL_REF)
    band_rgb = floral_full.crop(FLORAL_BAND_BOX)
    flower = build_flower_source(band_rgb)

    written: list[Path] = []

    if "E1" in want:
        written.append(save(build_floral_band(), ASSET_IDS["E1"], args.dry_run))

    stripe = None
    if want & {"E2", "E3"}:
        stripe = build_stripe_vertical()
    if "E2" in want:
        written.append(save(stripe, ASSET_IDS["E2"], args.dry_run))
    if "E3" in want:
        written.append(save(build_stripe_cap(stripe), ASSET_IDS["E3"], args.dry_run))

    if "E4" in want:
        wm = circular_crop(flower, 512, soft=0.08, opacity=0.35)
        written.append(save(wm, ASSET_IDS["E4"], args.dry_run))
    if "E5" in want:
        written.append(
            save(circular_crop(flower, 512, soft=0.05), ASSET_IDS["E5"], args.dry_run)
        )
    if "E6" in want:
        written.append(save(build_divider(band_rgb), ASSET_IDS["E6"], args.dry_run))
    if "E7" in want:
        written.append(
            save(circular_crop(flower, 256, soft=0.06), ASSET_IDS["E7"], args.dry_run)
        )
    if "E8" in want:
        # Use a wider band segment for ring texture
        shell_src = band_rgb.crop(
            (DIVIDER_BOX_IN_BAND[0], 0, min(DIVIDER_BOX_IN_BAND[2], band_rgb.width), band_rgb.height)
        )
        written.append(
            save(annular_shell_from_band(shell_src, 512), ASSET_IDS["E8"], args.dry_run)
        )

    if args.contact_sheet is not None and not args.dry_run:
        # Prefer all etm outputs on disk for the sheet
        all_paths = [OUT_DIR / name for name in ASSET_IDS.values()]
        contact_sheet(all_paths, Path(args.contact_sheet))

    print(json.dumps({"written": len(written), "ids": sorted(want)}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
