# SPA-CT-12-T02 — Mount split root vs inline reply

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

FR-CT-12.1 · 12.2: When replyTarget set — reply `ThreadComposer` under parent in tree · **not** post-block sibling after entire IssueThreadBlock. Root compose (no reply) may remain at bottom of mount.

## Constraints

- No invent HTTP · OP PASS  
- No dual composers fighting  
- Root bottom path held when no replyTarget

## AC / DoD

- [x] Reply composer under parent · not after whole block
- [x] Root composer still at root/bottom when no reply
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/ThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
