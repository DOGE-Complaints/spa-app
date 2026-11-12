# Story acceptance gate — STORY-SPA-CR-16-strip-hover-media-flush

- **Story:** Strip chip hover + media–strip flush (OP-UX-MIRROR-strip-polish §3)
- **Package:** `pkg-000152-20261017-epic-spa-23-cr-16-strip-hover-media-flush.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-17T13:58:39Z
- **Note:** Structure AC held · Path A screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · no invent HTTP · no M155 · no invent SVG · no `#/next/feed` · no invent OP PASS

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Hover React = small rounded chip, not full-cell | PASS (structure) | T01 · `data-lab-react-chip` · chip CSS · shot 01 |
| Media sits immediately above strip on `#/lab/feed` | PASS (structure) | T02 · `feed-card-media-flush` · mediaNextIsStrip · shot 02 |
| Vitest/CSS attrs or chip hover class Present | PASS (structure) | `feedLab.cr16` · suite feed-lab **59**/59 |
| Verify `#/lab/feed` | PASS (structure) | Path A capture · facts |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-17T13:58:39Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 3 paths (pkg-000152)
cd spa-app && npm test -- --run src/features/feed-lab
# → 59 PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr16-capture.mjs
# md5 01=030c50836d89 · 02=8210ab0f76ec · 03=6f920a323c3e · 04=bb86a45c166d · 05=5afb1c2cc957
```

## Visual checklists

[`visual-checklists-strip-polish-cr16.md`](./visual-checklists-strip-polish-cr16.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
