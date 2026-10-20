# CT-15 — Lab host residual (structure Present · visual BLOCKED)

> **UTC:** 2026-10-19T13:03:59Z (P3) · P5 disposition `2026-10-19T13:34:44Z` · P6 T06 `2026-10-20T09:00:37Z`  
> **Package:** `pkg-000173` · EPIC-SPA-24  
> **Code home:** `FeedLabThreadMount` · `FeedPostCard` · `IssueThreadBlock` · `ThreadMount`  
> **Normative:** OP-UX residual §3 G-M2 · G-M3 · G-M4 · G-L5 · M152-C/E · M153 branch/G  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual) · F2 screenshots indexer Present (P6)

## Surface

| Piece | Rule |
|-------|------|
| Narrow | Lab card / stands wire `narrow` (card 004) · sticky composer prop held · `data-lab-narrow` |
| branchDisclosure | When fixture needs nest disclosure · `fixtureNeedsBranchDisclosure` · `data-lab-branch-disclosure` |
| Residents | Collapsed «Reactions from residents» **only if** `reactionsAggregateConfirmed` · else omit · no invent aggregate |
| Heading | `Discussion · Issue {id}` when `issueId` / publicId provided · else `Discussion` |
| Markers | `data-lab-ct15` · issueId · aggregate confirmed flag on ThreadMount |

## Touchpoints

- `feed-lab/post/{FeedPostCard,FeedIssueDetailBody,thread/FeedLabThreadMount}.jsx`
- `thread-mount/{IssueThreadBlock,ThreadMount}.{jsx,css}` · `labFeedFixtures.js`
- Tests: `threadMount.ct15` · `feedLab.ct15` · nflab03/04 heading `startsWith('Discussion')`

## OOS

Invent aggregate/people HTTP · invent OP PASS · spine (CT-14) · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **151**/151 · ct15 Present
- Path A shots 01–05 Present · story-root `screenshots/README.md` Present (P6 T06)
