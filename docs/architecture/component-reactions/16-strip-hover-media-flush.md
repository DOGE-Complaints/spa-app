# CR-16 — Strip chip hover + media–strip flush (structure Present · visual BLOCKED)

> **UTC:** 2026-10-17T13:58:39Z (P3) · P5 APPLY `2026-10-17T14:00:48Z`  
> **Package:** `pkg-000152` · EPIC-SPA-23  
> **Code home:** `FeedPostActionStrip` · `FeedPostCard` · `FeedIssueDetailBody`  
> **Normative:** OP-UX-MIRROR-strip-polish §3  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| React hover/selected/focus | Inner chip (`feed-post-action-strip__chip` / `.rm-summary-strip__react`) · not full 56px cell |
| Chip chrome | padding ~4×10 · radius 8px · `--color-accent-soft` / accent tokens |
| Media → strip | Media outside padded body · `data-lab-media-flush` · strip `border-top` hugs media |
| Detail parity | `feed-issue-detail-body__media` same flush intent |
| 4-zone / theme | CR-11 grammar held · CR-08 tokens only |

## Touchpoints

- `feed-lab/post/FeedPostActionStrip.jsx` · `.css`
- `feed-lab/post/FeedPostCard.jsx` · `.css`
- `feed-lab/post/FeedIssueDetailBody.jsx` · `.css`
- Tests: `feedLab.cr16`
- Lab verify: `#/lab/feed`

## OOS

Invent OP PASS · invent SVG · M155 people · invent HTTP · `#/next/feed`

## Evidence

- Vitest feed-lab **59**/59 · cr16 Present
- Path A shots md5: `030c50836d89` · `8210ab0f76ec` · `6f920a323c3e` · `bb86a45c166d` · `5afb1c2cc957`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
