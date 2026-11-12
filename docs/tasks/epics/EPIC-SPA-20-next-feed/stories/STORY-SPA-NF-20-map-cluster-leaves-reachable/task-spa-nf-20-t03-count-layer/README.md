# SPA-NF-20-T03 — Wire CLUSTER_COUNT + CLUSTER click

**Status:** Done  
**Story:** [`../STORY-SPA-NF-20-map-cluster-leaves-reachable.md`](../STORY-SPA-NF-20-map-cluster-leaves-reachable.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-20-map-cluster-leaves-reachable.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-20-map-cluster-leaves-reachable.md)  
**ui_scope:** `map` · soft `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T19:49:59Z`  
**Package:** `pkg-000198`
**P3 Done:** `2026-10-21T19:56:45Z`  
**Path A:** code lock · [ARCH-DELTA §8](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-20.3: Both cluster circle (`CLUSTER_LAYER`) and cluster-count (`CLUSTER_COUNT_LAYER`) participate in the same leaves affordance — no dead click on the number.

## Code Facts (verify)

- AS-IS: click handler on `CLUSTER_LAYER` only (zoom) · count layer pointer may be unset for leaves
- Target: shared leaves path for circle + count · pointer cursor on both

## Constraints

- Path A ARCH-DELTA §8 · NO BRIEF · Partial=**BLOCK**  
- Same affordance as T02 · no invent OP PASS

## AC / DoD

- [x] Count + circle layers open leaves path
- [x] Visual Done not claimed without OP eye

## Where changed

`BoardIssuesMap.jsx` (`CLUSTER_LAYER` · `CLUSTER_COUNT_LAYER`)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "CLUSTER_COUNT_LAYER|CLUSTER_LAYER" spa-app/src/components/map/BoardIssuesMap.jsx
```
