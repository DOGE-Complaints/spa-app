# SPA-CT-21-T01 — previewNodeBudget knob

**Status:** Done  
**Story:** [`../STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:35:27Z`  
**Package:** `pkg-000179`  
**@mockup:** [M152c v1.0](../../../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md) · budget DEFAULT=3

## Purpose

FR-CT-21.2: Knob `previewNodeBudget` · `DEFAULT_PREVIEW_NODE_BUDGET = 3` · resolve like `maxDepth` (config + prop · no JSX magic).

## Constraints

- Named knob · no invent HTTP/OP PASS · Partial=**BLOCK**  
- Resolve pattern mirrors `maxDepth`

## AC / DoD

- [x] `DEFAULT_PREVIEW_NODE_BUDGET = 3` Present  
- [x] resolve + ThreadMount prop wired  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/config/threadMountConfig.js` · `ThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
