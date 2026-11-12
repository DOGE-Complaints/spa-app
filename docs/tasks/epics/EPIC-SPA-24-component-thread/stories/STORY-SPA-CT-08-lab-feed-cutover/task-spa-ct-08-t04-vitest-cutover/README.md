# SPA-CT-08-T04 — Vitest cutover · Path A + gate

**Status:** Done  
**Story:** [`../STORY-SPA-CT-08-lab-feed-cutover.md`](../STORY-SPA-CT-08-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:03:04Z`  
**Package:** `pkg-000166`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.4  
**Runtime:** Await P2 → P3 · final task · depends T01–T03

## Purpose

AC: Vitest mount markers · ban product FeedDiscussionBlock · Comment zone expand/focus · Path A shots · gate BLOCK until OP eye.

## Constraints

- No invent HTTP · OP PASS  
- Partial visual = BLOCK  
- story-root `screenshots/full-cycle/` mandatory at P3

## AC / DoD

- [x] Vitest cutover Present
- [x] Path A shots + gate Result filled (BLOCK until OP eye)

## Where to change

`src/features/feed-lab/__tests__/` · capture script · gate/checklist

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
