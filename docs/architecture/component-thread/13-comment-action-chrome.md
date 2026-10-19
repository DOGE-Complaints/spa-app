# CT-13 — Comment React/Reply action chrome (structure Present · visual BLOCKED)

> **UTC:** 2026-10-19T12:39:12Z (P3) · P5 disposition `2026-10-19T12:42:31Z`  
> **Package:** `pkg-000171` · EPIC-SPA-24  
> **Code home:** `thread-mount/tree/CommentNode`  
> **Normative:** OP-UX residual §3 G-H5 · M153 React/Reply  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Pill row | **React** \| **Reply** + vertical separator under bubble |
| React | CSS density wrap around host `renderCommentReactions` · reactions-mount owns open/picker · no rewrite CR |
| Reply | Present `reply.svg` + label pill · not underline-only link |
| Grammar | blue via Present `--rm-mark-accent-insightful` (no purple invent) |
| Markers | `data-lab-ct13` · `tm-comment-action-pills` · `tm-comment-react-pill` · `data-tm-reply-chrome=pill` |

## Touchpoints

- `thread-mount/tree/{CommentNode}.{jsx,css}` · `ThreadMount` `data-lab-ct13`
- Tests: `threadMount.ct13` · CT-09 plug held

## OOS

Rewrite CR package · invent people HTTP · invent OP PASS · spine (CT-14) · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **136**/136 · ct13 Present
- Path A shots 01–05 Present (story-root `screenshots/full-cycle/`)
