# SPA-NF-20-T01 — Probe getClusterLeaves · zoom-only gap

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

FR-NF-20.5: Document probe evidence — MapLibre `getClusterLeaves` API Present · current cluster click is zoom-only (`getClusterExpansionZoom`) · gap before implement.

## Code Facts (verify)

- AS-IS: `BoardIssuesMap.jsx` `CLUSTER_LAYER` click → `source.getClusterExpansionZoom` only
- AS-IS: **Absent** `getClusterLeaves` / spiderfy call path
- Target: short analysis note (Apply evidence) citing leaves API + zoom-only gap · analysis.mdc

## Constraints

- Path A ARCH-DELTA §8 · NO BRIEF · Partial=**BLOCK**  
- Probe before T02 UI · no invent OP PASS · no invent spiderfy vendor

## AC / DoD

- [x] Probe note Present (leaves API · zoom-only gap)
- [x] Visual Done not claimed without OP eye

## Where changed

BoardIssuesMap (read) · soft analysis note under story / docs/analysis

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "getClusterExpansionZoom|getClusterLeaves" spa-app/src/components/map/BoardIssuesMap.jsx
```
