# SPA-CT-08-T02 — Card/detail cutover

**Status:** Done  
**Story:** [`../STORY-SPA-CT-08-lab-feed-cutover.md`](../STORY-SPA-CT-08-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:03:04Z`  
**Package:** `pkg-000166`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.4 L-cut  
**Runtime:** Await P2 → P3 · depends T01

## Purpose

FR-CT-08.1–08.2 / 08.6: FeedPostCard + FeedIssueDetailBody mount FeedLabThreadMount · retire tip plane or thin-wrap · no dual competing discussion UIs · not `#/next/feed` / `#/board`.

## Constraints

- Ban product `FeedDiscussionBlock` on lab Done path  
- No invent HTTP · OP PASS  

## AC / DoD

- [x] Card/detail cutover Present · tip retired/wrapped
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/post/FeedPostCard.jsx` · `FeedIssueDetailBody.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
