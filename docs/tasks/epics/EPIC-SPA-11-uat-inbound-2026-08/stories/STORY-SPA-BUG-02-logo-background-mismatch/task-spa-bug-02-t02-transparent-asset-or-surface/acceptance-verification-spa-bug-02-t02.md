# Acceptance verification — SPA-BUG-02-T02

- **Task:** Transparent asset or matching surface
- **Result:** PASS
- **Date:** 2026-08-07T11:53:11Z
- **Package:** `pkg-000054`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Primary path not RGB-pad on secondary | PASS | RGBA corners alpha 0 · [`evidence-…115311Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-fix-t02-2026-08-07T115311Z.md) |
| Consumers unified | PASS | Header / PublicFooter / AppShell same PNG path |
| Fallback not worse | PASS | SVG pad rect removed |
| Night token unchanged | PASS | `--doge-bg: #0B1320` untouched |
| Pin limited to asset | PASS | flood-fill from T01; no palette redesign |

## Commands

```bash
cd spa-app && python3 -c "from PIL import Image; im=Image.open('public/assets/DOGEstonia-logo-big.png').convert('RGBA'); print(im.mode, im.getpixel((0,0)), im.getpixel((im.width//2,im.height//2)))"
```
