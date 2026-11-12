# Story acceptance gate — STORY-SPA-CT-28-next-feed-thread-mount-live-cutover

- **Story:** `#/next/feed` ThreadMount Live cutover
- **Package:** `pkg-000186-20261020-epic-spa-24-ct-28-next-feed-thread-mount-live-cutover.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T20:53:02Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · no invent HTTP/OP PASS · vitest feed+thread-mount+feed-lab **350/350** · ct28 feed **3/3** · lab **3/3**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| ThreadMount Present on `#/next/feed` issue detail path | Match | `FeedThreadMount` → `tm-thread-mount` · shot 02 · ct28 |
| Live threads read/write via ThreadsSocialClient | Match | LiveAdapter bind · not `live-adapter-unwired` · ct28 |
| FeedDiscussionBlock not Done surface | Match | Absent on host · shot 03 · nf06 updated |
| Lab Fixture path held | Match | `data-lab-thread-host=fixture` · shot 04 · feedLab.ct28 |
| Attach honesty / no invent upload | Match | ThreadMount local attach · no attachRef invent |
| Vitest | Match | suite **350/350** · feed.ct28 **3/3** · feedLab.ct28 **3/3** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/thread-mount src/features/feed-lab
CT28_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct28-capture.mjs
```

## Visual checklists

[`visual-checklists-next-feed-thread-mount-live-cutover.md`](./visual-checklists-next-feed-thread-mount-live-cutover.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
