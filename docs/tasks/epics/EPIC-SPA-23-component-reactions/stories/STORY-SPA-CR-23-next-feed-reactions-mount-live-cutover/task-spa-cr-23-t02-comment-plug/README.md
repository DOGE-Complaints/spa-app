# SPA-CR-23-T02 — Comment target mount with ThreadMount

**Status:** Done  
**Closed:** `2026-10-20T21:15:55Z` · P3 · FeedThreadMount renderCommentReactions Live  

**Story:** [`../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**ui_scope:** `feed` / `reactions-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T21:05:43Z`  
**Package:** `pkg-000187`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CR-23.2: Comment-node React plugs same package `target=comment` when ThreadMount cutover Present (CT-28 soft).

## Code Facts (verify)

- `FeedThreadMount.jsx` · `renderCommentReactions` → FeedReactionsMount `target=comment` · **Present**
- CT-28 ThreadMount Live · **Present**

## Constraints

- Soft depends CT-28 · no invent ThreadMount bind (CT-28 OOS)  
- Path A gap analysis · NO BRIEF · Partial=**BLOCK** · no invent HTTP/OP PASS

## AC / DoD

- [x] Comment target mount with ThreadMount Present
- [x] Same package reactions-mount · `target=comment`
- [x] Visual Done not claimed without OP eye

## Where to change

`FeedThreadMount.jsx` · `FeedReactionsMount.jsx`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed/__tests__/feed.cr23.test.jsx
```
