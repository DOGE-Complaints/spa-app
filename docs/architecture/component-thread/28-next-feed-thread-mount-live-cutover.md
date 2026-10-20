# CT-28 — `#/next/feed` ThreadMount Live cutover (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T20:57Z (P5 APPLY)  
> **Package:** `pkg-000186` · EPIC-SPA-24  
> **Code home:** `FeedThreadMount` · `LiveAdapter` · `FeedLabCt28Stand` · `#/next/feed`  
> **Normative:** [gap analysis next/feed cutover](../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · Arch §15.1  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Production host | `#/next/feed` issue mounts `thread-mount` via `FeedThreadMount` → `tm-thread-mount` |
| Live bind | `createLiveAdapter` → Closed `ThreadsSocialClient` · not `live-adapter-unwired` when issueId Present |
| DiscussionBlock | `FeedDiscussionBlock` ≠ Done surface on `#/next/feed*` after cutover |
| Lab hold | `#/lab/feed` FixtureAdapter path unchanged · CT-28 Path A stand proves Live host only |
| Attach | no invent upload/bind · local intent / fail-closed honesty |

## Touchpoints

- `features/feed/FeedThreadMount.jsx` · `thread-mount/adapters/LiveAdapter.js`
- Lab: `FeedLabCt28Stand.jsx` · `FeedLabPage.jsx`
- Tests: `feed.ct28` · `feedLab.ct28` · `FeedMounts.nf06` · Path A `scripts/tmp-ct28-capture.mjs`

## OOS

Reactions chrome (CR-23) · civic media stub (CT-29) · `#/board` · Early Signal · invent OP PASS · invent HTTP · people Live API

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []`
- vitest feed+thread-mount+feed-lab **350/350** · feed.ct28 **3/3** · feedLab.ct28 **3/3**
- P5: F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none · Await P8
