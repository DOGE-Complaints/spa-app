# SPA-NF-20-T02 — Cluster leaves list/sheet → open issue

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

FR-NF-20.1 · 20.2 · 20.4: `getClusterLeaves` → list/sheet of leaves (title/id) → open chosen issue; zoom-only alone ≠ Done; co-located N>1 multi-path held.

## Code Facts (verify)

- AS-IS: cluster tap zooms only · unclustered → single issue popup
- Target: leaves UI on cluster of N · citizen can open any of N · soft feed preview host

## Constraints

- Path A ARCH-DELTA §8 · NO BRIEF · Partial=**BLOCK**  
- Default list/sheet path · no invent spiderfy vendor without need · no invent OP PASS  
- Soft after NF-19 map host held

## AC / DoD

- [x] Cluster N → all N reachable via list/sheet
- [x] Co-located N>1 multi-path Present
- [x] Visual Done not claimed without OP eye

## Where changed

`BoardIssuesMap.jsx` · soft feed preview host · soft `issueGeo.js`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
```
