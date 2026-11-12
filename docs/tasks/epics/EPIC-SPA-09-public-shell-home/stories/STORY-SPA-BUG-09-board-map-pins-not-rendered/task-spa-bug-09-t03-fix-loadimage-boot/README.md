# SPA-BUG-09-T03 — Fix loadImage Promise boot

**Status:** Done · P3 `2026-10-03T15:18:08Z` · **ui_anchor**  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** backlog STORY-SPA-BUG-09 · AC-BUG-09-01  
**ui_scope:** `visual` · **ui_anchor:** `true`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:08:51Z`  
**Package:** `pkg-000090`

## Purpose

Rewrite boot to await map.loadImage → addImage → ensureLayers → syncSource; cancelled guard.

## UI pipeline (anchor)

| Step | Artifact |
|------|----------|
| UI-0 | [ui-baseline/](./ui-baseline/) basemap-only 1536×1024 |
| UI-1 | [ui-mockup-spec.md](./ui-mockup-spec.md) from brief+baseline (no invent PNG) |
| UI-2 | `BoardIssuesMap.jsx` Promise boot |
| UI-3 | [ui-after/bug09-ui3-map-pins-cluster12-1536x1024.png](./ui-after/bug09-ui3-map-pins-cluster12-1536x1024.png) · story [screenshots/full-cycle/](../screenshots/full-cycle/) |

## Code Facts (P3)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | async `boot` awaits `map.loadImage` → `response.data` → `addImage` | `BoardIssuesMap.jsx` ~L147–165 |
| 2 | Fail-soft catch → still `ensureLayers`/`syncSource` | same · `console.warn` |
| 3 | Live post-fix | MapLibre `hasSource('ssr03-issue-pins')` **true** · `hasImage('ssr03-ic-map-pin')` **true** · layers `ssr03-*` Present · `featCount=12` · cluster **12** on Map |

## AC / DoD

- [x] (P0) Pins/clusters mount with ≥1 pin-capable issue — **AC-BUG-09-01**
- [x] (P0) hasImage short-circuit still calls ensureLayers+syncSource — **AC-BUG-09-01** (vitest T05)
- [x] (P0) Fail-soft on image error (no throw kill map) — **AC-BUG-09-01**

## Where to change

- src/components/map/BoardIssuesMap.jsx

## Out of scope

H2 life-sim geo · gateway invent · MapLibre downgrade · other BUG pkgs

## Verification

```bash
rg -n 'await map\.loadImage|ensureLayers|response\?\.data' spa-app/src/components/map/BoardIssuesMap.jsx | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
