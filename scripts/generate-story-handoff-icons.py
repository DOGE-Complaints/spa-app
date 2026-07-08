#!/usr/bin/env python3
"""Generate distinct 256x256 story-handoff icons per STORY-SPA-ID-12-icon-assets catalog."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

SIZE = 256
PAD = int(SIZE * 0.15)
YELLOW = (245, 197, 66, 255)
NEUTRAL = (245, 247, 250, 255)
SUCCESS = (74, 222, 128, 255)
ERROR = (248, 113, 113, 255)
AMBER = (251, 191, 36, 255)
STROKE = 3

OUT = Path(__file__).resolve().parents[1] / "public" / "icons" / "story-handoff"


def canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def box() -> tuple[int, int, int, int]:
    return PAD, PAD, SIZE - PAD, SIZE - PAD


def save(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG", optimize=True)
    print(f"wrote {path.name} {path.stat().st_size} bytes")


def draw_spinner() -> None:
    img, d = canvas()
    cx, cy = SIZE // 2, SIZE // 2
    r = (SIZE - 2 * PAD) // 2 - 4
    for i in range(12):
        a0 = math.radians(i * 30 - 90)
        a1 = math.radians(i * 30 - 60)
        x0, y0 = cx + r * math.cos(a0), cy + r * math.sin(a0)
        x1, y1 = cx + r * math.cos(a1), cy + r * math.sin(a1)
        d.arc([cx - r, cy - r, cx + r, cy + r], i * 30 - 90, i * 30 - 50, fill=YELLOW, width=STROKE)
    save(img, "ic-spinner.png")


def draw_info() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    d.ellipse([x0, y0, x1, y1], outline=NEUTRAL, width=STROKE)
    cx = SIZE // 2
    d.rectangle([cx - 2, y0 + 28, cx + 2, cy := SIZE // 2 + 10], fill=NEUTRAL)
    d.ellipse([cx - 5, y0 + 18, cx + 5, y0 + 28], fill=NEUTRAL)
    save(img, "ic-info.png")


def draw_lock() -> None:
    img, d = canvas()
    cx = SIZE // 2
    body_top = SIZE // 2 - 8
    d.arc([cx - 28, body_top - 40, cx + 28, body_top + 8], 180, 0, fill=YELLOW, width=STROKE)
    d.rounded_rectangle([cx - 36, body_top, cx + 36, SIZE - PAD - 8], radius=8, outline=YELLOW, width=STROKE)
    d.ellipse([cx - 6, body_top + 28, cx + 6, body_top + 40], fill=YELLOW)
    save(img, "ic-lock.png")


def draw_field_title() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    d.line([x0 + 20, y1 - 20, x1 - 20, y1 - 20], fill=NEUTRAL, width=STROKE + 2)
    d.rectangle([x0 + 20, y0 + 24, x0 + 44, y1 - 36], outline=NEUTRAL, width=STROKE)
    save(img, "ic-field-title.png")


def draw_field_summary() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    for i, w in enumerate([0.7, 0.55, 0.4]):
        y = y0 + 40 + i * 28
        d.line([x0 + 24, y, x0 + 24 + int((x1 - x0 - 48) * w), y], fill=NEUTRAL, width=STROKE)
    save(img, "ic-field-summary.png")


def draw_field_description() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    d.rounded_rectangle([x0 + 16, y0 + 16, x1 - 16, y1 - 16], radius=10, outline=NEUTRAL, width=STROKE)
    for i in range(4):
        y = y0 + 48 + i * 22
        w = 0.85 if i < 3 else 0.55
        d.line([x0 + 32, y, x0 + 32 + int((x1 - x0 - 64) * w), y], fill=NEUTRAL, width=2)
    save(img, "ic-field-description.png")


def draw_field_category() -> None:
    img, d = canvas()
    cx, cy = SIZE // 2, SIZE // 2
    pts = [(cx - 50, cy + 30), (cx + 50, cy + 30), (cx + 30, cy - 50), (cx - 30, cy - 50)]
    d.polygon(pts, outline=NEUTRAL, width=STROKE)
    d.ellipse([cx - 58, cy - 58, cx - 42, cy - 42], fill=NEUTRAL)
    save(img, "ic-field-category.png")


def draw_field_labels() -> None:
    img, d = canvas()
    cx, cy = SIZE // 2, SIZE // 2
    for dx, dy in [(-18, -12), (18, 12)]:
        pts = [(cx - 40 + dx, cy + 24 + dy), (cx + 36 + dx, cy + 24 + dy), (cx + 20 + dx, cy - 36 + dy), (cx - 24 + dx, cy - 36 + dy)]
        d.polygon(pts, outline=NEUTRAL, width=STROKE)
    save(img, "ic-field-labels.png")


def draw_field_institution() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    base = y1 - 24
    roof_y = y0 + 36
    d.polygon([(x0 + 20, roof_y + 30), (SIZE // 2, y0 + 16), (x1 - 20, roof_y + 30)], outline=NEUTRAL, width=STROKE)
    d.rectangle([x0 + 28, roof_y + 30, x1 - 28, base], outline=NEUTRAL, width=STROKE)
    for col_x in [x0 + 52, SIZE // 2 - 10, SIZE // 2 + 10, x1 - 52]:
        d.rectangle([col_x, roof_y + 44, col_x + 14, base], outline=NEUTRAL, width=2)
    save(img, "ic-field-institution.png")


def draw_field_location() -> None:
    img, d = canvas()
    cx = SIZE // 2
    top = PAD + 20
    d.polygon([(cx, top), (cx + 44, top + 70), (cx, SIZE - PAD - 12), (cx - 44, top + 70)], outline=NEUTRAL, width=STROKE)
    d.ellipse([cx - 16, top + 52, cx + 16, top + 84], outline=NEUTRAL, width=STROKE)
    save(img, "ic-field-location.png")


def draw_verify_shield() -> None:
    img, d = canvas()
    cx = SIZE // 2
    top = PAD + 16
    pts = [(cx, top), (cx + 52, top + 36), (cx + 42, SIZE - PAD - 16), (cx, SIZE - PAD - 4), (cx - 42, SIZE - PAD - 16), (cx - 52, top + 36)]
    d.polygon(pts, outline=YELLOW, width=STROKE)
    d.line([cx - 18, SIZE // 2, cx - 4, SIZE // 2 + 18], fill=YELLOW, width=STROKE + 1)
    d.line([cx - 4, SIZE // 2 + 18, cx + 22, SIZE // 2 - 16], fill=YELLOW, width=STROKE + 1)
    save(img, "ic-verify-shield.png")


def draw_phone() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    d.rounded_rectangle([x0 + 44, y0 + 12, x1 - 44, y1 - 12], radius=14, outline=NEUTRAL, width=STROKE)
    d.ellipse([SIZE // 2 - 8, y1 - 36, SIZE // 2 + 8, y1 - 20], outline=NEUTRAL, width=2)
    save(img, "ic-phone.png")


def draw_auto_resubmit() -> None:
    img, d = canvas()
    cx, cy = SIZE // 2, SIZE // 2
    r = 56
    d.arc([cx - r, cy - r, cx + r, cy + r], 30, 300, fill=NEUTRAL, width=STROKE)
    d.polygon([(cx + r - 8, cy - 36), (cx + r + 14, cy - 18), (cx + r - 4, cy - 4)], fill=NEUTRAL)
    d.arc([cx - r, cy - r, cx + r, cy + r], 210, 120, fill=NEUTRAL, width=STROKE)
    d.polygon([(cx - r + 8, cy + 36), (cx - r - 14, cy + 18), (cx - r + 4, cy + 4)], fill=NEUTRAL)
    save(img, "ic-auto-resubmit.png")


def draw_success_check() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    d.ellipse([x0, y0, x1, y1], outline=SUCCESS, width=STROKE)
    cx, cy = SIZE // 2, SIZE // 2
    d.line([cx - 28, cy, cx - 6, cy + 26], fill=SUCCESS, width=STROKE + 1)
    d.line([cx - 6, cy + 26, cx + 32, cy - 24], fill=SUCCESS, width=STROKE + 1)
    save(img, "ic-success-check.png")


def draw_copy() -> None:
    img, d = canvas()
    d.rounded_rectangle([PAD + 36, PAD + 28, SIZE - PAD - 20, SIZE - PAD - 44], radius=6, outline=NEUTRAL, width=STROKE)
    d.rounded_rectangle([PAD + 20, PAD + 44, SIZE - PAD - 36, SIZE - PAD - 28], radius=6, outline=NEUTRAL, width=STROKE)
    save(img, "ic-copy.png")


def draw_doc_new() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    fold = 36
    d.polygon([(x0 + 20, y0 + 16), (x1 - fold - 20, y0 + 16), (x1 - 20, y0 + 16 + fold), (x1 - 20, y1 - 16), (x0 + 20, y1 - 16)], outline=NEUTRAL, width=STROKE)
    d.line([x1 - fold - 20, y0 + 16, x1 - fold - 20, y0 + 16 + fold], fill=NEUTRAL, width=STROKE)
    d.line([x1 - fold - 20, y0 + 16 + fold, x1 - 20, y0 + 16 + fold], fill=NEUTRAL, width=STROKE)
    d.line([SIZE // 2 - 14, SIZE // 2, SIZE // 2 + 14, SIZE // 2], fill=NEUTRAL, width=STROKE)
    d.line([SIZE // 2, SIZE // 2 - 14, SIZE // 2, SIZE // 2 + 14], fill=NEUTRAL, width=STROKE)
    save(img, "ic-doc-new.png")


def draw_clock_expired() -> None:
    img, d = canvas()
    x0, y0, x1, y1 = box()
    d.ellipse([x0, y0, x1, y1], outline=NEUTRAL, width=STROKE)
    cx, cy = SIZE // 2, SIZE // 2
    d.line([cx, cy, cx, cy - 36], fill=NEUTRAL, width=STROKE)
    d.line([cx, cy, cx + 28, cy + 10], fill=NEUTRAL, width=STROKE)
    save(img, "ic-clock-expired.png")


def draw_cloud_error() -> None:
    img, d = canvas()
    cx, cy = SIZE // 2, SIZE // 2 + 8
    d.arc([cx - 70, cy - 30, cx - 10, cy + 30], 180, 0, fill=ERROR, width=STROKE)
    d.arc([cx - 40, cy - 44, cx + 40, cy + 16], 200, 340, fill=ERROR, width=STROKE)
    d.arc([cx + 10, cy - 30, cx + 70, cy + 30], 180, 0, fill=ERROR, width=STROKE)
    d.line([cx - 18, cy + 44, cx + 18, cy + 76], fill=ERROR, width=STROKE + 1)
    d.ellipse([cx - 6, cy + 70, cx + 6, cy + 82], fill=ERROR)
    save(img, "ic-cloud-error.png")


def draw_warning_triangle() -> None:
    img, d = canvas()
    cx = SIZE // 2
    top = PAD + 12
    pts = [(cx, top), (SIZE - PAD - 16, SIZE - PAD - 16), (PAD + 16, SIZE - PAD - 16)]
    d.polygon(pts, outline=AMBER, width=STROKE)
    d.line([cx, top + 52, cx, SIZE - PAD - 56], fill=AMBER, width=STROKE + 1)
    d.ellipse([cx - 5, SIZE - PAD - 52, cx + 5, SIZE - PAD - 38], fill=AMBER)
    save(img, "ic-warning-triangle.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for stray in OUT.glob("*.png.png"):
        stray.unlink()
        print(f"removed stray {stray.name}")

    drawers = [
        draw_spinner,
        draw_info,
        draw_lock,
        draw_field_title,
        draw_field_summary,
        draw_field_description,
        draw_field_category,
        draw_field_labels,
        draw_field_institution,
        draw_field_location,
        draw_verify_shield,
        draw_phone,
        draw_auto_resubmit,
        draw_success_check,
        draw_copy,
        draw_doc_new,
        draw_clock_expired,
        draw_cloud_error,
        draw_warning_triangle,
    ]
    for fn in drawers:
        fn()

    files = sorted(OUT.glob("ic-*.png"))
    total = sum(f.stat().st_size for f in files)
    hashes = {f.name: __import__("hashlib").md5(f.read_bytes()).hexdigest() for f in files}
    unique = len(set(hashes.values()))
    print(f"icons: {len(files)}, unique md5: {unique}, total bytes: {total}")


if __name__ == "__main__":
    main()
