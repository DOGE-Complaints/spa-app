# SPA-CT-12-T03 — Cancel reply clears inline slot

**Status:** Done  
**Story:** [`../STORY-SPA-CT-12-inline-reply-placement.md`](../STORY-SPA-CT-12-inline-reply-placement.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:21:59Z`  
**Package:** `pkg-000170`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H4  
**Runtime:** P3 Done · `2026-10-19T12:27:25Z` · ui_anchor

## Purpose

FR-CT-12.4: Cancel reply clears replyTarget · composer leaves inline slot · prior layout restored.

## Constraints

- No invent HTTP · OP PASS  
- Draft ownership rules held (do not orphan dual mounts)

## AC / DoD

- [x] Cancel clears target · inline slot unmounts
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/ThreadMount.jsx` · `composer/ThreadComposer.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
