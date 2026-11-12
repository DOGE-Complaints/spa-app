# SPA-CT-08-T01 — FeedLabThreadMount host

**Status:** Done  
**Story:** [`../STORY-SPA-CT-08-lab-feed-cutover.md`](../STORY-SPA-CT-08-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:03:04Z`  
**Package:** `pkg-000166`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.4 L-cut  
**Runtime:** Await P2 → P3 · ui_anchor

## Purpose

FR-CT-08.1: `FeedLabThreadMount` wraps ThreadMount + FixtureAdapter default · `data-lab-thread-mount` markers.

## Constraints

- No invent HTTP · Live adapter default · OP PASS  
- Lab host only

## AC / DoD

- [x] FeedLabThreadMount Present with FixtureAdapter
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/post/thread/FeedLabThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
