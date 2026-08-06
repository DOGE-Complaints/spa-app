#!/usr/bin/env python3
"""Validate generated functional icons and optionally build a contact sheet."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    import yaml
except ImportError as exc:  # pragma: no cover
    raise SystemExit("PyYAML required: pip install pyyaml") from exc

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]  # spa-app/
MANIFEST = Path(__file__).resolve().parent / "icon-manifest.yaml"
ICONS_PUBLIC = ROOT / "public" / "icons"


def load_icons():
    data = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    return data.get("icons") or []


def validate_one(path: Path, expect_size: int = 256) -> list[str]:
    errors: list[str] = []
    if not path.exists():
        return [f"missing: {path}"]
    try:
        with Image.open(path) as im:
            if im.size != (expect_size, expect_size):
                errors.append(f"size {im.size} != {expect_size}x{expect_size}")
            if im.mode != "RGBA":
                errors.append(f"mode {im.mode} != RGBA")
            else:
                px = im.load()
                w, h = im.size
                for corner in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
                    a = px[corner][3]
                    if a != 0:
                        errors.append(f"corner {corner} alpha={a} (want 0)")
                        break
                # Must have some visible ink
                extrema = im.getextrema()
                if extrema[3][1] < 10:
                    errors.append("canvas appears empty (max alpha < 10)")
            if path.stat().st_size <= 200:
                errors.append(f"file too small ({path.stat().st_size} B) — likely stub")
            if im.size == (1, 1):
                errors.append("1x1 stub")
    except OSError as exc:
        errors.append(f"unreadable: {exc}")
    return errors


def contact_sheet(
    paths: list[Path],
    out: Path,
    *,
    bg: str = "#12161e",
    cell: int = 96,
    cols: int = 8,
    label: bool = True,
) -> None:
    if not paths:
        raise SystemExit("No icons for contact sheet")
    rows = (len(paths) + cols - 1) // cols
    label_h = 18 if label else 0
    sheet = Image.new(
        "RGBA",
        (cols * cell, rows * (cell + label_h)),
        (*tuple(int(bg[i : i + 2], 16) for i in (1, 3, 5)), 255),
    )
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.load_default()
    except OSError:
        font = None

    for i, path in enumerate(paths):
        r, c = divmod(i, cols)
        x, y = c * cell, r * (cell + label_h)
        with Image.open(path) as im:
            icon = im.convert("RGBA").resize((cell - 16, cell - 16), Image.Resampling.LANCZOS)
        sheet.alpha_composite(icon, (x + 8, y + 8))
        if label and font is not None:
            draw.text((x + 4, y + cell - 2), path.stem[:18], fill=(200, 200, 200, 255), font=font)

    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.convert("RGB").save(out, "PNG", optimize=True)
    print(f"wrote contact sheet {out} ({len(paths)} icons)")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--catalog", default="all")
    parser.add_argument(
        "--contact-sheet",
        type=Path,
        default=None,
        help="Write preview PNG path (composited on dark bg)",
    )
    parser.add_argument("--bg", default="#12161e")
    args = parser.parse_args()

    icons = load_icons()
    if args.catalog != "all":
        aliases = {
            "handoff": "handoff",
            "cab": "cab",
            "identity": "identity",
            "ph": "ph",
        }
        key = aliases.get(args.catalog, args.catalog)
        icons = [i for i in icons if i.get("catalog") == key]

    failures = []
    paths: list[Path] = []
    for entry in icons:
        path = ICONS_PUBLIC / entry["out_dir"] / entry["file"]
        paths.append(path)
        errs = validate_one(path)
        if errs:
            failures.append({"file": str(path.relative_to(ROOT)), "errors": errs})
            print(f"FAIL {path.relative_to(ROOT)}: {'; '.join(errs)}")
        else:
            print(f"PASS {path.relative_to(ROOT)}")

    if args.contact_sheet:
        existing = [p for p in paths if p.exists()]
        contact_sheet(existing, args.contact_sheet, bg=args.bg)

    summary = {"checked": len(icons), "failed": len(failures)}
    print(json.dumps(summary))
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
