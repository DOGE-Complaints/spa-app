# SPA-CR-23-T03 — Strip Done claim → ReactionsMount

**Status:** Done  
**Closed:** `2026-10-20T21:15:55Z` · P3 · FeedReactionsStrip retired Done claim  

**Story:** [`../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**ui_scope:** `feed` / `reactions-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T21:05:43Z`  
**Package:** `pkg-000187`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CR-23.3: `FeedReactionsStrip` / classic `ReactionChrome` ≠ Done claim on `#/next/feed*` after cutover · Done path is ReactionsMount.

## Code Facts (verify)

- `FeedReactionsStrip.jsx` · `data-vl-done-claim="false"` · `data-cr23-retired="true"` · **Present**
- Done path: `FeedReactionsMount` / `reactions-mount` · **Present**

## Constraints

- May remain on disk (FeedDiscussionBlock shelter) · must not claim Done on next/feed*  
- Path A gap analysis · NO BRIEF · Partial=**BLOCK** · no invent OP PASS

## AC / DoD

- [x] FeedReactionsStrip not Done surface on `#/next/feed*`
- [x] ReactionChrome classic ≠ Done claim after cutover
- [x] Visual Done not claimed without OP eye

## Where to change

`FeedReactionsStrip.jsx` · `FeedDiscussionBlock.jsx`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed/__tests__/FeedReactions.nfvl03.test.jsx
```
