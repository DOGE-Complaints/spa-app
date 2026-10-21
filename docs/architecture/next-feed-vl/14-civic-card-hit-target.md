# NF-14 — `#/next/feed` civic card hit-target (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T11:56Z (P5 APPLY)  
> **Package:** `pkg-000190` · EPIC-SPA-20  
> **Code home:** `FeedCivicPost` · `FeedListArea` · `FeedLabNf14Stand` · `#/next/feed`  
> **Normative:** [ARCH-DELTA §2](../../tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · Path A code lock  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Retire | Dedicated Open issue `Link` / `feed-civic-post-open` Absent on list |
| Hit | One `Link.feed-civic-post-hit` wraps identity+title+summary+labels+media |
| Exclude | Four-zone action strip sibling outside hit · More outside hit (no nested interactive) |
| Detail | No `to` → `data-civic-hit="none"` · no dead Open link |
| A11y | `aria-label` = title \|\| summary \|\| localized Open issue · focus-visible |
| Soft | `open-issue.svg` may remain unused on disk |

## Touchpoints

- `FeedCivicPost.jsx` · `FeedCivicPost.css` · `IssueIdentityHeader` `showMore`
- `FeedListArea.jsx` `to` wire held
- Lab: `FeedLabNf14Stand.jsx` · `FeedLabPage.jsx`
- Tests: `feed.nf14` · `feedLab.nf14` · nf02 · Path A `scripts/tmp-nf14-capture.mjs`

## OOS

Map preview · Comment/Share rewrite · NF-13 icon map · invent OP PASS · invent HTTP · route shape change

## Evidence

- Path A shots 01–05 Present · CAPTURE-META `fails: []` · `visual_gate: BLOCK`
- vitest feed+feed-lab+i18n+reactions-mount+thread-mount **522/522** · feed.nf14 **2/2** · feedLab.nf14 **1/1**
- P5: F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none`
