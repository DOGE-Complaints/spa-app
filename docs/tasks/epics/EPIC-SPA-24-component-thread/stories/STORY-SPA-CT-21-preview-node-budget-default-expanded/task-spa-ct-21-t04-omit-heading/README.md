# SPA-CT-21-T04 — omit Discussion heading

**Status:** Done  
**Story:** [`../STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:35:27Z`  
**Package:** `pkg-000179`  
**@mockup:** [M152c §2.7](../../../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md)

## Purpose

FR-CT-21.6–21.7: Omit heading `Discussion · Issue {id}` and plain `Discussion` title on all package mounts · empty/loading/unavailable remain honest without Discussion heading.

## Constraints

- Depends CT-15 heading Present → remove · no invent OP PASS  
- Civic post title above strip on card may remain (OOS of package heading)

## AC / DoD

- [x] No `tm-thread-heading` / Discussion · Issue on mounts  
- [x] Empty/loading/unavailable honest without heading  
- [x] Visual Done not claimed without OP eye

## Where to change

`IssueThreadBlock.jsx` · related CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
