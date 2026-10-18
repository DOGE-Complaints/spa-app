# CR-22 — Media–strip flush residual (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T12:25:27Z (P3) · P5 APPLY `2026-10-18T12:28:53Z`  
> **Package:** `pkg-000158` · EPIC-SPA-23  
> **Code home:** `FeedPostCard` / `FeedIssueDetailBody` media plate · flush markers  
> **Normative:** OP-UX-MIRROR-gap-v2-people-media-residual §5 · CR-16 chip hold  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Measure | layout gap media→strip = **0** · letterbox = **0** · cause = light media plate bg |
| Flush fix | host-scoped `.feed-post-media { background: transparent }` · card + detail only |
| Markers | `data-lab-media-flush` · `data-lab-cr22-flush` honest |
| Chip hold | CR-16 chip-only hover · no full-cell regression |
| Detail parity | same anatomy → transparent plate in `FeedIssueDetailBody` |

## Touchpoints

- `feed-lab/post/FeedPostCard.{jsx,css}` · `FeedIssueDetailBody.{jsx,css}`
- Tests: `feedLab.cr22`
- Lab verify: `#/lab/feed` light/dark · adjacency · chip · ~390

## OOS

Invent OP PASS · invent SVG · invent HTTP · people affordance · carousel · `#/next/feed`

## Evidence

- Vitest feed-lab + reactions-mount **143**/143 · cr22 Present
- Path A shots md5: `41ec692f4c28` · `dc0e5b205e0b` · `0161f9d04232` · `90dea0fc2b7e` · `32941c829a77`
- P5: TASKED=0 · F1 WAIVED operator (OP eye) · F2–F4 WAIVED info · activation none
