# CT-12 — Inline reply placement (structure Present · visual BLOCKED)

> **UTC:** 2026-10-19T12:27:25Z (P3) · P5 disposition `2026-10-19T12:30:53Z`  
> **Package:** `pkg-000170` · EPIC-SPA-24  
> **Code home:** `thread-mount/ThreadMount` · `CommentNode` · `CommentTree` · `IssueThreadBlock`  
> **Normative:** OP-UX residual §3 G-H4 · M153-C  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Reply target set | `ThreadComposer` under parent `CommentNode` via `renderReplyComposer` · not sibling after `IssueThreadBlock` |
| Root compose | no `replyParentId` → composer stays after `IssueThreadBlock` (bottom) |
| Cancel reply | clears `replyParentId` · unmounts inline slot · root returns |
| Draft / fail / verify | single composer owner held (CT-04 · CT-07) |
| Markers | `data-lab-ct12` · `data-tm-reply-inline` · `tm-inline-reply-composer` · `tm-comment-reply-slot-*` |

## Touchpoints

- `thread-mount/{ThreadMount,IssueThreadBlock}.{jsx}` · `tree/{CommentNode,CommentTree}.{jsx,css}`
- Tests: `threadMount.ct12`

## OOS

Invent OP PASS · invent HTTP · action pills (CT-13) · continuous spine (CT-14) · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **132**/132 · ct12 Present
- Path A shots 01–05 Present (story-root `screenshots/full-cycle/`)
