# SPA-CR-07-T01 — Root ReactionsMount wire on `#/lab/feed`

**Status:** Done  
**Story:** [`../STORY-SPA-CR-07-lab-feed-cutover.md`](../STORY-SPA-CR-07-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md)  
**ui_scope:** `feed-lab`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T11:03:17Z`  
**Package:** `pkg-000143`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.4

## Purpose
FR-07.1 / FR-07.2: on `#/lab/feed`, post-root reaction slot uses **`ReactionsMount`** (not active `FeedReactionPlane`); CR-05/06 interaction+layout visible in post context.

## Code Facts (verified at scaffold)
- Active: `spa-app/src/features/feed-lab/post/discussion/FeedDiscussionPlane.jsx` mounts `<FeedReactionPlane target="thread-root" …>`
- Plane: `spa-app/src/features/feed-lab/post/reactions/FeedReactionPlane.jsx` · `data-testid="feed-reaction-plane"`
- Host: `spa-app/src/features/feed-lab/post/FeedPostCard.jsx` · `#/lab/feed`
- Target: `spa-app/src/features/reactions-mount/ReactionsMount.jsx` · `adapters/FixtureAdapter.js` Present

## Implement notes
- Replace root `FeedReactionPlane` with `ReactionsMount` + FixtureAdapter (or same props contract)
- Bridge open state from `FeedPostCard` / action strip as needed
- Root: no selectable Moderation (existing mount target config)
- OOS: comment mounts (T02) · retire modules (T03) · `#/next/feed` · invent HTTP · M155

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No invent HTTP · no M155 · no `#/next/feed` cutover

## AC / DoD
- [ ] Root reaction slot on `#/lab/feed` renders `ReactionsMount`
- [ ] Active path is not `FeedReactionPlane` for root
- [ ] FixtureAdapter (or equivalent) — no invent PUT
- [ ] CR-05/06 chrome affordances reachable in post context

## Where to change
`spa-app/src/features/feed-lab/post/discussion/FeedDiscussionPlane.jsx` · possibly `FeedPostCard.jsx` · import from `features/reactions-mount/`

## Verification
```bash
rg -n "FeedReactionPlane|ReactionsMount" spa-app/src/features/feed-lab/post/discussion/FeedDiscussionPlane.jsx
# manual: http://127.0.0.1:5173/#/lab/feed
```
