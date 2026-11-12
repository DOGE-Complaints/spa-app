# SPA-CT-21-T02 — default expanded populated

**Status:** Done  
**Story:** [`../STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:35:27Z`  
**Package:** `pkg-000179`  
**@mockup:** [M152c §2.1](../../../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md)

## Purpose

FR-CT-21.1: Feed-card / default lab mount: discussion starts **expanded** when populated (supersede collapsed 2-body preview).

## Constraints

- Loading/empty/unavailable remain honest · no invent OP PASS  
- Soft depends FeedLabThreadMount / card host

## AC / DoD

- [x] Populated first paint expanded  
- [x] Collapsed 2-body summary not default  
- [x] Visual Done not claimed without OP eye

## Where to change

`FeedLabThreadMount.jsx` · `ThreadMount.jsx` · feed card host

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
