# CR-09 — `#/lab/feed` strip A+C+B (structure Present · visual BLOCKED)

> **UTC:** 2026-10-15T19:48:00Z  
> **Package:** `pkg-000145` · EPIC-SPA-23  
> **Code home:** `src/features/feed-lab/post/`  
> **Normative:** OP-UX-MIRROR composition §3.2 · M154 tone  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Strip zones | `data-lab-strip-zones="3"` · React-slot \| Comment \| Share · no `reactions` text zone |
| Zone 1 | `reactSlot` → `FeedLabReactionsMount` → `ReactionSummaryStrip` (empty/populated) |
| Root mount | Only in strip · no `feed-post-discussion-reaction-slot` under strip |
| Comment mounts | Kept on `FeedCommentNode` |
| Visual lock | `data-lab-visual-done=false` until OP eye |

## Touchpoints

- `FeedPostActionStrip.jsx` / `.css` — `reactSlot` · 3 columns
- `FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` — locked wire into strip
- `FeedDiscussionPlane.jsx` — drop root mount · `data-lab-root-reaction-slot="strip"`
- Tests: `feedLab.cr09.test.jsx` (+ nflab07/08/09/10 · cr07 · cr08 click path)
- Lab verify: `http://127.0.0.1:5173/#/lab/feed`

## OOS

CR-10 portal · production `FeedCivicPost` 4-zone · `#/next/feed` · M155 · invent HTTP · invent OP PASS

## Evidence

- Vitest `feedLab.cr09` **4/4** · feed-lab suite **43**/43
- Path A shots md5: `bddfac5ee5f7` · `eb269190722a` · `4af1da0b4f31` · `49b6b8c03409` · `f9e22605877b`
