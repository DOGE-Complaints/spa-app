# CT-20 — Lab audit fixtures LAB-1…4 (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T13:18Z (P5 APPLY)  
> **Package:** `pkg-000178` · EPIC-SPA-24  
> **Code home:** `FeedLabCt20Stands` · `labCt20Stands` · `FeedLabThreadMount` props · `#/lab/feed`  
> **Normative:** OP-UX M153a/b LAB-1…4 · M152/M153/M153a coverage (not new gen)  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| LAB-1 | `loading` / `empty` / `unavailable` stands reachable on `#/lab/feed` |
| LAB-2 | `forcePostFail` · fixture soft-fail · draft kept (no invent HTTP) |
| LAB-3 | `attachmentsAvailable=false` · omit Attach + file input |
| LAB-4 | Fixture depth ≥ `maxDepth` · Reply blocked at ceiling |
| Harness | Dual-append unique ids (CT-16) · native picker · no synthetic-only Ready (CT-17) |
| FR-20.6 | LAB closed or OP-WAIVED explicit · no silent drop |

## Touchpoints

- `fixtures/labCt20Stands.js` · `post/thread/FeedLabCt20Stands.jsx` · `FeedLabThreadMount.jsx` · `pages/FeedLabPage.jsx`
- Tests: `feedLab.ct20` · Path A `scripts/tmp-ct20-capture.mjs` · `tests/puppeteer/lab-feed-thread-ct20-lab-audit.mjs`

## OOS

Invent new artboard states · invent HTTP · invent OP PASS · CT-18/19 paint · HOLD reactions · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **177**/177 · ct20 Present  
- Path A shots 01–05 Present · Partial=**BLOCK** · LAB-1…4 CLOSED · OP-WAIVED=none
