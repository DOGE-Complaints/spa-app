# CT-08 — Lab feed cutover → ThreadMount (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T14:06:35Z (P3) · P5 APPLY `2026-10-18T14:36:17Z`  
> **Package:** `pkg-000166` · EPIC-SPA-24  
> **Code home:** `src/features/feed-lab/post/thread/` · `#/lab/feed` cards + Path A stands  
> **Normative:** OP-UX-MIRROR-m152-m153-m157-thread §4.4 L-cut/L-fix  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| FeedLabThreadMount | FixtureAdapter default · `data-lab-thread-mount` · nest parentId/depth · writeCapability/gate props |
| L-cut | FeedPostCard / FeedIssueDetailBody host ThreadMount under strip · no dual plane |
| Plane | FeedDiscussionPlane thin-wrap only · retired tip |
| L-fix stands | A–E · TREE · GATE on `#/lab/feed` · FixtureAdapter · no invent HTTP |
| Ban | product `FeedDiscussionBlock` off lab Done path |
| Comment zone | apiRef expand + focusComposer held (CT-02) |

## Touchpoints

- `feed-lab/post/thread/{FeedLabThreadMount,FeedLabCt08Stands}.*`
- `feed-lab/fixtures/{labCt08Stands,labFeedFixtures}.*`
- `feed-lab/post/{FeedPostCard,FeedIssueDetailBody}.jsx`
- `feed-lab/post/discussion/FeedDiscussionPlane.jsx` (thin-wrap)
- `pages/FeedLabPage.jsx`
- Tests: `feedLab.ct08` · nflab09 mount count

## OOS

Invent OP PASS · invent Live HTTP · `#/next/feed` · `#/board` production cutover

## Evidence

- Vitest feed-lab+thread-mount **111**/111 · ct08 Present
- Path A shots 01–08 Present (story-root `screenshots/full-cycle/` · not in this commit)
