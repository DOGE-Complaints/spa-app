# SPA-BUG-09-T04 — Fix cluster zoom Promise (H1b)

**Status:** Done · P3 `2026-10-03T15:18:08Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** backlog STORY-SPA-BUG-09 · AC-BUG-09-05 / H1b  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:08:51Z`  
**Package:** `pkg-000090`

## Purpose

Await source.getClusterExpansionZoom(clusterId) then easeTo.

## Code Facts (P3)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Cluster click uses Promise `.then(zoom => easeTo…)` | `BoardIssuesMap.jsx` ~L103–115 |
| 2 | Typings | `maplibre-gl.d.ts:12772` `Promise<number>` |

## AC / DoD

- [x] (P0) Cluster expand uses Promise API — **AC-BUG-09-05 / H1b**
- [x] (P0) No callback arity dependency — **AC-BUG-09-05 / H1b**

## Where to change

- src/components/map/BoardIssuesMap.jsx

## Out of scope

H2 life-sim geo · gateway invent · MapLibre downgrade · other BUG pkgs

## Verification

```bash
rg -n 'getClusterExpansionZoom' spa-app/src/components/map/BoardIssuesMap.jsx | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
