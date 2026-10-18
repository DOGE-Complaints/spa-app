# CR-21 — People affordance residual (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T12:15:16Z (P3) · P5 APPLY `2026-10-18T12:19:14Z`  
> **Package:** `pkg-000157` · EPIC-SPA-23  
> **Code home:** `ReactionsMount` peopleAnchor · `FeedPostActionStrip` chips · `FeedPostCard` / lab zone wire  
> **Normative:** OP-UX-MIRROR-gap-v2-people-media-residual §4 · M155 Panel A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| People anchor | `activateAggregate({ anchorEl })` · `peopleAnchorRef` · `data-rm-people-anchor=trigger` |
| Measure | popover from Reactions zone / aggregate control · not React slot alone |
| Chip hover | Reactions (+ Comment/Share) inner chip · CR-16 parity · not full-cell fill |
| Triggers | React → picker · Reactions/aggregate → people (≠ picker) |
| Gap v2 | Consume CR-20 `reactions.svg` Present |
| People data | FixtureAdapter · Live fail-closed · no invent people HTTP |

## Touchpoints

- `reactions-mount/ReactionsMount.jsx` · `ReactionAggregateRow.jsx` · `ReactionSummaryStrip.jsx`
- `feed-lab/post/FeedPostActionStrip.{jsx,css}` · `FeedPostCard.jsx` · `FeedIssueDetailBody.jsx`
- `lab/ReactionsLabCanvas.jsx`
- Tests: `reactionsMount.cr21`
- Lab verify: `#/lab/feed` light/dark · ~390

## OOS

Invent OP PASS · invent SVG · invent people HTTP · CR-22 media flush · `#/next/feed`

## Evidence

- Vitest reactions-mount+feed-lab **140**/140 · cr21 Present
- Capture: `popLeft≡reactionsLeft` · peopleAnchor=trigger · Gap v2 nw=24
- Path A shots md5: `f8ece5e9790c` · `f46008479efa` · `2829221be5d5` · `cb1aa4b84a11` · `3dd696d65b22`
- P5: TASKED=0 · F1 WAIVED operator (OP eye) · F2–F4 WAIVED info · activation none
