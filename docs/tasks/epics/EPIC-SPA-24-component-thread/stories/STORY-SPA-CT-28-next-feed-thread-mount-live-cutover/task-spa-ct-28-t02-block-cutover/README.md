# SPA-CT-28-T02 — ThreadMount Block cutover

**Status:** Done  
**Closed:** `2026-10-20T20:53:02Z` · P3 · FeedThreadMount → ThreadMount · FeedDiscussionBlock not Done  

**Story:** [`../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**ui_scope:** `feed` / `thread-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T20:46:49Z`  
**Package:** `pkg-000186`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CT-28.1 · 28.4: `#/next/feed*` issue mounts use thread-mount presentation · FeedDiscussionBlock ≠ Done claim after cutover (may remain on disk deprecated).

## Constraints

- Path A gap analysis · NO BRIEF · Partial=**BLOCK**  
- No invent HTTP/OP PASS · CR-23 / CT-29 OOS

## AC / DoD

- [x] ThreadMount Present on `#/next/feed` issue detail path
- [x] FeedDiscussionBlock not Done surface
- [x] Visual Done not claimed without OP eye

## Where to change

`FeedThreadMount.jsx` · FeedIssueDetail / NextFeedHost seams · BlockComponent wiring

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/thread-mount
```
