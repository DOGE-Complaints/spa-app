# CT-09 — Reactions plug on CommentNode (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T14:42:44Z (P3)  
> **Package:** `pkg-000167` · EPIC-SPA-24  
> **Code home:** `thread-mount/tree/CommentNode` slot · lab wire `FeedLabThreadMount`  
> **Normative:** OP-UX-MIRROR §4.2 T-react · §4.4 R-plug/R-bound · M153 React  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| CommentNode slot | `renderCommentReactions({ commentId })` · React + Reply only · no Share/Reactions strip |
| Host wire | `FeedLabReactionsMount` `target=comment` + `commentId` (reuse CR · no rewrite) |
| R-bound | thread-mount never imports ReactorsPopover / people modules |
| Root strip | card `reactSlot` `target=thread-root` unchanged |
| Markers | `data-lab-ct09` · `data-rm-target=comment` · `data-tm-reactions-plug=host` |

## Touchpoints

- `thread-mount/tree/{CommentNode,CommentTree}.*` · `IssueThreadBlock` · `ThreadMount`
- `feed-lab/post/thread/FeedLabThreadMount.jsx`
- Tests: `threadMount.ct09` · `feedLab.ct09`

## OOS

Invent OP PASS · invent people HTTP · CR-20…22 icon residual · dual reaction stacks · CR package rewrite

## Evidence

- Vitest feed-lab+thread-mount **118**/118 · ct09 Present
- Path A shots 01–05 Present (story-root `screenshots/full-cycle/`)
