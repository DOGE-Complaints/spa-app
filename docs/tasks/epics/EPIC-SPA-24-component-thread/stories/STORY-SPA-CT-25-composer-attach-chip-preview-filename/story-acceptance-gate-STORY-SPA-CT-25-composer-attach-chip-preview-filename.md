# Story acceptance gate — STORY-SPA-CT-25-composer-attach-chip-preview-filename

- **Story:** Composer AttachmentRef preview + filename
- **Package:** `pkg-000183-20261020-epic-spa-24-ct-25-composer-attach-chip-preview-filename.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T19:28:55Z
- **Note:** P3 Execute · T01–T04 Done · Path A M153c shots 01–05 Present · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **214/214** · ct25 **7/7**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Image Ready chip: 48×48 thumb or clear icon | Match | `tm-attachment-thumb` 48px · shot 01 · ct25 |
| Filename visible on Ready chips (not family-only) | Match | `tm-attachment-filename` · family above · ct25 |
| Non-image Ready: type cue + filename | Match | MD/PDF cues · shots 02–03 |
| Honesty / Remove intact · §7 tokens | Match | Ready/Denied paint held · ct19+ct25 |
| Narrow: middle ellipsis · extension kept | Match | shot 05 · `middleEllipsisFileName` |
| Artboard M153c linked · intake PASS | Match | Path A ui-mockup · M153c Present |
| Vitest | Match | ct25 **7/7** · suite **214/214** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
CT25_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct25-capture.mjs
```

## Visual checklists

[`visual-checklists-composer-attach-chip-preview-filename.md`](./visual-checklists-composer-attach-chip-preview-filename.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
