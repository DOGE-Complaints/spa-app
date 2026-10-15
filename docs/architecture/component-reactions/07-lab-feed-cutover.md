# CR-07 — `#/lab/feed` cutover → ReactionsMount (structure Present · visual BLOCKED)

> **UTC:** 2026-10-15T11:10:00Z  
> **Package:** `pkg-000143` · EPIC-SPA-23  
> **Code home:** `src/features/feed-lab/post/` (+ `reactions-mount/`)  
> **Normative:** OP-UX-MIRROR §3.4 · M154 tone  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Cutover

| Piece | Rule |
|-------|------|
| Live host | `FeedLabReactionsMount` → `ReactionsMount` + FixtureAdapter |
| Root slot | `FeedDiscussionPlane` reaction adjacency · `target=thread-root` |
| Comment slot | `FeedCommentNode` · `target=comment` · moderation eligible |
| Retired | `FeedReaction*Deprecated` · `RETIRE.md` · no dual live plane |

## Touchpoints

- `FeedLabReactionsMount.jsx` — FixtureAdapter bridge · strip `defaultOpen`
- `FeedDiscussionPlane.jsx` / `FeedCommentNode.jsx` — mount sites
- `post/reactions/index.js` — live export only `FeedLabReactionsMount`
- Tests: `feedLabCutover.cr07.test.jsx` · nflab08/09/03/10 updates
- Lab verify: `http://127.0.0.1:5173/#/lab/feed`

## OOS

`#/next/feed` production · M155 · invent HTTP · delete `#/lab/reactions` stands

## Evidence

- Vitest feed-lab + reactions-mount **68/68**
- Path A shots md5: `defd86bed1f9` · `7885f9c46902` · `b91eaa7e2d31` · `6c1a314cdbab` · `97ffa443dcfe`
- Audit: Absent at P5 · P3 gate BLOCK held
- P5: F1–F4 **WAIVED** · TASKED=0 · P6 not needed
