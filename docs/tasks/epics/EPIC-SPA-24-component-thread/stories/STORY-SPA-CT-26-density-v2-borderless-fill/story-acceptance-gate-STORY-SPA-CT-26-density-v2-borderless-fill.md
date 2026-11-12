# Story acceptance gate — STORY-SPA-CT-26-density-v2-borderless-fill

- **Story:** Density v2 borderless bubbles + reaction pills
- **Package:** `pkg-000184-20261020-epic-spa-24-ct-26-density-v2-borderless-fill.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T19:43:18Z
- **Note:** P3 Execute · T01–T04 Done · Path A M153d shots 01–05 Present · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **221/221** · ct26 **7/7**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Bubble outer border Absent · fill + 8v/12h Present | Match | `border: 0` · pad 8/12 · shot 01 · ct26 |
| Action-pills outer border Absent · fill · ≥44px · 4v/8h | Match | pills `border: 0` · pad 4/8 · min-height 44 · ct26 |
| Gaps 4 / 8 Match M153d | Match | actions margin-top 4 · tree/children gap 8 |
| Spine Present · parent stripe Present | Match | spine 1px · reply-parent 3px · shot 02 |
| AttachmentRef borders unchanged | Match | shot 05 · 1px `#E7E4DC` · attach CSS |
| Artboard M153d linked · intake PASS | Match | Path A ui-mockup · M153d Present |
| Vitest/CSS regression | Match | ct26 **7/7** · suite **221/221** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
CT26_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct26-capture.mjs
```

## Visual checklists

[`visual-checklists-density-v2-borderless-fill.md`](./visual-checklists-density-v2-borderless-fill.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
