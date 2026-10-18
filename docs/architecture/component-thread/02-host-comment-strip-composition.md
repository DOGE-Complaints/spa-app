# CT-02 — Host Comment strip → ThreadMount composition (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T13:12:08Z (P3) · P5 APPLY `2026-10-18T13:15:06Z`  
> **Package:** `pkg-000160` · EPIC-SPA-24  
> **Code home:** `src/features/thread-mount/` apiRef · `feed-lab` card/detail host · `#/lab/feed`  
> **Normative:** OP-UX-MIRROR-m152-m153-m157-thread §4.1 P-strip · P-compose  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| apiRef | ThreadMount `{ expand, focusComposer }` · hold reactions apiRef pattern |
| Comment zone | FeedPostCard / FeedIssueDetailBody → expand + focusComposer |
| Flush | thread host under strip · `data-lab-thread-flush` · same card |
| Strip dumb | FeedPostActionStrip no ThreadMount import |
| Reactions held | FeedLabReactionsMount / React path unchanged |
| Detail parity | overlay body same ThreadMount host wire |
| Lab | `#/lab/feed` composition · Path A shots |

## Touchpoints

- `thread-mount/{ThreadMount,IssueThreadBlock}.jsx` (apiRef · focusSignal · composerEntryRef)
- `feed-lab/post/{FeedPostCard,FeedIssueDetailBody}.{jsx,css}`
- `feed-lab/post/thread/FeedLabThreadMount.jsx`
- Tests: `feedLab.ct02` · cutover suite markers
- Lab verify: `#/lab/feed` · OP eye

## OOS

Invent OP PASS · invent HTTP · Share behavior · M153 interior · comment-node ReactionsMount (CT-09) · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **75**/75 · ct02 Present
- Path A shots md5: `bbf279f596c1` · `16d21d0d1899` · `b17b1f6519d3` · `5a14d59936c7` · `ad797c4f13cb`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
