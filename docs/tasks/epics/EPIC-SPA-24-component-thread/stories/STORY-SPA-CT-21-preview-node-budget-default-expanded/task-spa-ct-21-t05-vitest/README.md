# SPA-CT-21-T05 — vitest markers

**Status:** Done  
**Story:** [`../STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:35:27Z`  
**Package:** `pkg-000179`  
**@mockup:** [M152c A–E](../../../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md)

## Purpose

FR-CT-21.8: Vitest — expanded · budget=3 DFS truncate · show-more one-shot · no heading testid.

## Constraints

- No invent OP PASS · Partial=**BLOCK** until OP eye  
- Cover FR-21.1–21.7 markers

## AC / DoD

- [x] expanded first paint assert  
- [x] budget=3 DFS truncate assert  
- [x] one-shot Show more assert  
- [x] no heading testid assert

## Where to change

`src/features/thread-mount/__tests__/threadMount.ct21.test.jsx` · feed-lab tests if needed

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
