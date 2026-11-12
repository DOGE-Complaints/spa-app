# SPA-CT-14-T01 — Continuous spine + L-elbows

**Status:** Done  
**Story:** [`../STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:45:54Z`  
**Package:** `pkg-000172`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H7 · M153 nest  
**Runtime:** P3 Done · `2026-10-19T12:51:56Z` · ui_anchor

## Purpose

FR-CT-14.1 · 14.2: Continuous left grey vertical spine + L-elbows into bubbles at visual nest levels — not only a tiny fragment when `indent > 0`. Readable on nested stands and default feed cards with nest.

## Constraints

- No invent HTTP · OP PASS  
- Hold `VISUAL_INDENT_CAP` / `maxDepth` (CT-03)  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Continuous rail + L-elbows Present beyond indent>0 fragment
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentTree.css` · `CommentNode.css` · related JSX

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
