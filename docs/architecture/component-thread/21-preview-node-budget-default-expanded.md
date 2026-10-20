# CT-21 — Preview node budget · default expanded · no Discussion heading (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T14:53Z (P5 APPLY)  
> **Package:** `pkg-000179` · EPIC-SPA-24  
> **Code home:** `threadMountConfig` · `CommentTree` · `IssueThreadBlock` · `FeedLabThreadMount` · `FeedLabCt21Stands` · `#/lab/feed`  
> **Normative:** [M152c v1.0](../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md)  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Knob | `DEFAULT_PREVIEW_NODE_BUDGET=3` · `resolvePreviewNodeBudget` · ThreadMount prop |
| First paint | Populated discussion **expanded** (FeedLab auto · card/detail hosts) |
| Truncate | DFS parent→children→next root · `Show more comments` one-shot |
| Heading | Omit `tm-thread-heading` / `Discussion · Issue {id}` |
| Lab | M152c A–E stands on `#/lab/feed` · Path A full-cycle 01–05 |

## Touchpoints

- `config/threadMountConfig.js` · `tree/CommentTree.jsx` · `IssueThreadBlock.jsx` · `ThreadMount.jsx`
- `FeedLabThreadMount.jsx` · `fixtures/labCt21Stands.js` · `FeedLabCt21Stands.jsx` · `pages/FeedLabPage.jsx`
- Tests: `threadMount.ct21` · `feedLab.ct21` · Path A `scripts/tmp-ct21-capture.mjs`

## OOS

Chunked pagination · Share CT-24 · attach-in-node CT-22 · density CT-23 · invent HTTP · invent OP PASS · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **187**/187 · ct21 Present  
- Path A shots 01–05 Present · Partial=**BLOCK** · F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none
