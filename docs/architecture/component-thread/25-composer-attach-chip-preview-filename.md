# CT-25 — Composer attach chip preview + filename (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T19:34Z (P5 APPLY)  
> **Package:** `pkg-000183` · EPIC-SPA-24  
> **Code home:** `AttachmentRef` · `attachChipFilename` · `threadMountConfig` · `#/lab/feed` composer  
> **Normative:** [M153c](../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.md) · keep M153b §7 paint  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Filename | Ready (and Denied when known) show `intent.fileName` · family label never substitutes |
| Image Ready | 48×48 CSS px objectURL thumb · revoke on unmount · or clear image-type icon |
| Non-image Ready | Type cue (`MD` / `PDF` / `Word`) + filename · not ▣-only |
| Narrow | Middle ellipsis · extension kept · `title` = full name |
| Paint | Ready/Denied tokens · honesty · Remove held from CT-19 / M153b §7 |

## Touchpoints

- `composer/AttachmentRef.jsx` · `AttachmentRef.css` · `attachChipFilename.js` · `config/threadMountConfig.js`
- Tests: `threadMount.ct25` · Path A `scripts/tmp-ct25-capture.mjs`
- Artboard: `docs/UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.{md,png}`

## OOS

Node preview rewrite (CT-22) · density borderless (CT-26) · Share · invent MIME table · invent upload HTTP · invent mobile full-name modal · invent OP PASS · `#/next/feed`

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []`
- vitest feed-lab+thread-mount **214/214** · ct25 **7/7**
- P5: F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none · Await P8
