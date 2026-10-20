# CR-23 — `#/next/feed` ReactionsMount Live cutover (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T21:21Z (P5 APPLY)  
> **Package:** `pkg-000187` · EPIC-SPA-23  
> **Code home:** `FeedReactionsMount` · `FeedCivicPost` · `FeedThreadMount` · `#/next/feed`  
> **Normative:** [gap analysis next/feed cutover](../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · Arch §1  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Civic strip | `#/next/feed*` React zone mounts **reactions-mount** via `FeedReactionsMount` LiveAdapter · issueId |
| Comment plug | ThreadMount `renderCommentReactions` · `target=comment` (CT-28 soft) |
| Retired Done | `FeedReactionsStrip` / classic `ReactionChrome` ≠ Done claim (`data-cr23-retired`) |
| Data plane | Closed `ThreadsSocialClient` only · people Live fail-closed |
| Lab hold | `#/lab/feed` / `#/lab/reactions` FixtureAdapter unchanged |

## Touchpoints

- `features/feed/FeedReactionsMount.jsx` · `FeedCivicPost.jsx` · `FeedThreadMount.jsx` · `FeedReactionsStrip.jsx`
- Lab Path A: `FeedLabCt23Stand.jsx` · `FeedLabPage.jsx`
- Tests: `feed.cr23` · `feedLab.cr23` · nfvl03 · Path A `scripts/tmp-cr23-capture.mjs`

## OOS

ThreadMount bind (CT-28) · media stub (CT-29) · invent people HTTP · invent OP PASS · `#/board`

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []`
- vitest feed+reactions-mount+feed-lab+thread-mount **437/437** · feed.cr23 **4/4** · feedLab.cr23 **2/2**
- P5: F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none · Await P8
