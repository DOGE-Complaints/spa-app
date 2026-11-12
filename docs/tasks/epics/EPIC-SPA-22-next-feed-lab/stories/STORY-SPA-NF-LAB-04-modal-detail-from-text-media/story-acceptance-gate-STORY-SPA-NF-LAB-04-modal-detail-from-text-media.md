# Story acceptance gate — STORY-SPA-NF-LAB-04-modal-detail-from-text-media

- **Story:** Modal detail from text + media click
- **Package:** `pkg-000130-20261013-epic-spa-22-nf-lab-04-modal-detail-from-text-media.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-13T13:06:08Z
- **Note:** Structure AC held · M158 checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Text/media opens modal; action strip excluded | PASS | vitest nflab04 · live `actionDidNotOpen=true` · shot `02` |
| Close / Escape / scrim · focus return | PASS | OverlayHost Escape · close button · shot `03` |
| Fixture-only · no HTTP | PASS | fixture object · vitest ban · no fetch |
| Ban product hosts / classic Controls CSS | PASS | vitest · `banDom=false` |
| Identity demo publicId in overlay | PASS | factsOpen.publicIdVisible |
| Discussion ≠ DISCUSSION | PASS | factsOpen.discussion=`Thread` |
| M158 checklist + screenshot + OP | **BLOCK** | checklist Present · shot `02` · OP Absent |

## Commands (live `2026-10-13T13:06:08Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab/__tests__/feedLabOverlay.nflab04.test.jsx
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:ui:board-shell
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node scripts/tmp-lab04-capture.mjs
```

## Visual checklists

[`visual-checklists-m158.md`](./visual-checklists-m158.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
