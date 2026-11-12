# SPA-CR-09-T03 — Remove root under-strip duplicate mount

**Status:** Done  
**Story:** [`../STORY-SPA-CR-09-strip-slot-composition.md`](../STORY-SPA-CR-09-strip-slot-composition.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:43:19Z`  
**Package:** `pkg-000145`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.2

## Purpose
FR-09.3: remove root `FeedLabReactionsMount` / `feed-post-discussion-reaction-slot` under strip; **keep** comment mounts in `FeedCommentNode`.

## Code Facts (verified at scaffold)
- `FeedDiscussionPlane.jsx` mounts root `FeedLabReactionsMount` in `feed-post-discussion-reaction-slot`
- Comment mounts in `FeedCommentNode` — retain

## Implement notes
- Clean unused `reactionsOpen` props if obsolete after T02
- Discussion expand / composer flows must still work
- OOS: portal CR-10 · theme CR-08

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- One React entry on root card strip after T01–T03

## AC / DoD
- [x] No `feed-post-discussion-reaction-slot` / root under-strip mount
- [x] Comment node mounts Present
- [x] Discussion/comment flows still open on `#/lab/feed`

## Where to change
`FeedDiscussionPlane.jsx` (+ card prop cleanup if needed)

## Verification
```bash
rg -n "feed-post-discussion-reaction-slot|FeedLabReactionsMount" spa-app/src/features/feed-lab/post/discussion/FeedDiscussionPlane.jsx spa-app/src/features/feed-lab/post/discussion/FeedCommentNode.jsx
```
