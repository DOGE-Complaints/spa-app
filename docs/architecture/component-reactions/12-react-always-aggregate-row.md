# CR-12 — `#/lab/feed` React-always + aggregate under strip (structure Present · visual BLOCKED)

> **UTC:** 2026-10-16T10:42:46Z (P3) · P5 APPLY `2026-10-16T10:46:06Z`  
> **Package:** `pkg-000148` · EPIC-SPA-23  
> **Code home:** `ReactionSummaryStrip` · `ReactionAggregateRow` · `ReactionsMount` · feed-lab card/detail hosts  
> **Normative:** OP-UX-MIRROR-m154 §3.2–3.3 · M154 Panel A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| React strip | Always visible (empty + populated) · opens picker · supersedes CR-05 hide-React |
| Aggregate row | Portal into host **below** `FeedPostActionStrip` · empty → absent · loading/error Present |
| Reactions zone | Distinct · `onZone('reactions')` → `activateAggregate` (no M155 people) |
| Dual mount | Forbidden — keep CR-09 no under-strip root `ReactionsMount` |
| Portal dismiss | CR-10 held |
| Visual lock | `data-lab-visual-done=false` until OP eye |

## Touchpoints

- `ReactionSummaryStrip.jsx` — `reactAlways` · `aggregatePlacement=external|inline`
- `ReactionAggregateRow.jsx` — under-strip row
- `ReactionsMount.jsx` — `aggregatePlacement=below` · `createPortal` · `apiRef`
- `FeedPostCard.jsx` / `FeedIssueDetailBody.jsx` — aggregate host + Reactions zone wire
- Tests: `reactionsMount.cr12` · `feedLab.cr12`
- Lab verify: `http://127.0.0.1:5173/#/lab/feed`

## OOS

Picker tiles CR-13 · accents CR-14 · invent SVG · invent OP PASS · M155 · invent HTTP · `#/next/feed`

## Evidence

- Vitest feed-lab+rm **91**/91 · cr12 suites Present
- Path A shots md5: `edb1d41a0e8d` · `15e4afe683cc` · `54b4659b7577` · `43d7138cf65f` · `2f9e53a93482`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
