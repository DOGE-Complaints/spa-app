#!/usr/bin/env python3
"""Generate functional ic-*.png from Lucide SVGs using scripts/icons/icon-manifest.yaml.

ETM (etm-*) assets are intentionally out of scope — see STORY-SPA-PH-icon-assets.md.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except ImportError as exc:  # pragma: no cover
    raise SystemExit("PyYAML required: pip install pyyaml") from exc

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = Path(__file__).resolve().parent / "icons" / "icon-manifest.yaml"
RENDER_JS = Path(__file__).resolve().parent / "icons" / "render-lucide.mjs"
ICONS_PUBLIC = ROOT / "public" / "icons"
LUCIDE_ICONS = ROOT / "node_modules" / "lucide-static" / "icons"

CATALOG_ALIASES = {
    "all": None,
    "handoff": "handoff",
    "story-handoff": "handoff",
    "cab": "cab",
    "cabinet": "cab",
    "user-cabinet": "cab",
    "identity": "identity",
    "ph": "ph",
    "public-home": "ph",
}


def load_manifest() -> dict:
    data = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    if not data or "icons" not in data:
        raise SystemExit(f"Invalid manifest: {MANIFEST}")
    return data


def resolve_color(entry: dict, colors: dict) -> str:
    raw = entry.get("color", "neutral")
    if isinstance(raw, str) and raw.startswith("#"):
        return raw
    if raw not in colors:
        raise SystemExit(f"Unknown color key {raw!r} for {entry.get('file')}")
    return colors[raw]


def is_stub(path: Path) -> bool:
    if not path.exists():
        return True
    try:
        with Image.open(path) as im:
            if im.size == (1, 1):
                return True
        if path.stat().st_size <= 1200:
            # Nearly empty / placeholder 256² with almost no ink
            with Image.open(path) as im:
                if im.mode != "RGBA":
                    return True
                extrema = im.getextrema()
                # alpha channel max ~0 → empty
                if extrema[3][1] <= 1:
                    return True
                # tiny files that are blankish canvases from earlier stubs
                if path.stat().st_size <= 1200 and im.size == (256, 256):
                    # Heuristic: previous CAB placeholders were exactly 1096 bytes
                    return path.stat().st_size <= 1200
        return False
    except OSError:
        return True


def render_one(
    *,
    lucide_id: str,
    out_path: Path,
    color: str,
    size: int,
    padding: float,
    stroke: float,
    dry_run: bool,
) -> None:
    svg = LUCIDE_ICONS / f"{lucide_id}.svg"
    if not svg.exists():
        raise SystemExit(f"Lucide SVG not found: {svg} (id={lucide_id})")
    if dry_run:
        print(f"DRY  {out_path.relative_to(ROOT)} ← {lucide_id} {color}")
        return
    out_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "node",
        str(RENDER_JS),
        "--svg",
        str(svg),
        "--out",
        str(out_path),
        "--color",
        color,
        "--size",
        str(size),
        "--padding",
        str(padding),
        "--stroke",
        str(stroke),
    ]
    proc = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True)
    if proc.returncode != 0:
        raise SystemExit(
            f"render failed for {out_path.name}:\n{proc.stderr or proc.stdout}"
        )
    meta = proc.stdout.strip().splitlines()[-1] if proc.stdout.strip() else "{}"
    print(f"OK   {out_path.relative_to(ROOT)}  {meta}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--catalog",
        default="all",
        help="handoff|cab|identity|ph|all",
    )
    parser.add_argument(
        "--only-stubs",
        action="store_true",
        help="Skip files that already look like real art",
    )
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--file",
        action="append",
        default=[],
        help="Generate only these filenames (repeatable)",
    )
    args = parser.parse_args()

    if not LUCIDE_ICONS.is_dir():
        raise SystemExit(
            "lucide-static missing. Run: npm install -D lucide-static @resvg/resvg-js"
        )
    if not RENDER_JS.exists():
        raise SystemExit(f"Missing renderer: {RENDER_JS}")

    catalog_key = CATALOG_ALIASES.get(args.catalog)
    if args.catalog not in CATALOG_ALIASES:
        raise SystemExit(f"Unknown catalog {args.catalog!r}")

    data = load_manifest()
    defaults = data.get("defaults") or {}
    colors = data.get("colors") or {}
    size = int(defaults.get("size", 256))
    padding = float(defaults.get("padding", 0.15))
    stroke = float(defaults.get("stroke_width", 2))

    want_files = set(args.file) if args.file else None
    selected = []
    for entry in data["icons"]:
        if catalog_key is not None and entry.get("catalog") != catalog_key:
            continue
        if want_files is not None and entry.get("file") not in want_files:
            continue
        selected.append(entry)

    if not selected:
        print("No icons matched filters.", file=sys.stderr)
        return 1

    written = 0
    skipped = 0
    for entry in selected:
        out_path = ICONS_PUBLIC / entry["out_dir"] / entry["file"]
        if args.only_stubs and not is_stub(out_path):
            print(f"SKIP {out_path.relative_to(ROOT)} (not a stub)")
            skipped += 1
            continue
        color = resolve_color(entry, colors)
        render_one(
            lucide_id=entry["lucide_id"],
            out_path=out_path,
            color=color,
            size=size,
            padding=padding,
            stroke=entry.get("stroke_width", stroke),
            dry_run=args.dry_run,
        )
        written += 1

    print(json.dumps({"written": written, "skipped": skipped, "catalog": args.catalog}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
