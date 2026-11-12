# SPA-BUG-09-T02 — Confirm H1 loadImage Promise API

**Status:** Done · P3 `2026-10-03T15:18:08Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** backlog STORY-SPA-BUG-09 · AC-BUG-09-05  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:08:51Z`  
**Package:** `pkg-000090`

## Purpose

Confirm MapLibre v4 loadImage Promise vs callback; record GetResourceResponse shape; note H1b getClusterExpansionZoom Promise.

## Code Facts (P3 verified)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Pre-fix boot used callback arity | backlog Verified facts + UI-0 basemap-only with pin-capable > 0 |
| 2 | v4 `loadImage(url): Promise<GetResourceResponse<HTMLImageElement \| ImageBitmap>>` | `node_modules/maplibre-gl/dist/maplibre-gl.d.ts:10706` · `GetResourceResponse.data` `:73–75` · example `addImage(..., image.data)` `:10598–10599` |
| 3 | v4 `getClusterExpansionZoom(clusterId): Promise<number>` | `maplibre-gl.d.ts:12772` |
| 4 | Dep | `maplibre-gl@4.7.1` (`package.json` / lock) |

## AC / DoD

- [x] (P0) Document loadImage return shape (`.data`) — **AC-BUG-09-05**
- [x] (P0) Confirm callback arity ignored under v4 — **AC-BUG-09-05**
- [x] (P0) Note H1b cluster zoom Promise — **AC-BUG-09-05**

## Where to change

- Evidence / Code Facts in README — product fix in T03/T04

## Out of scope

H2 life-sim geo · gateway invent · MapLibre downgrade · other BUG pkgs

## Verification

```bash
rg -n 'loadImage|GetResourceResponse|getClusterExpansionZoom' spa-app/node_modules/maplibre-gl/dist/maplibre-gl.d.ts | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
