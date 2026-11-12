# UI-1 Target mockup — BUG-09 board map pins (from UX brief + baseline)

> Derived from [STORY-UX-MOCKUP-BRIEF.md](../STORY-UX-MOCKUP-BRIEF.md) + UI-0 baseline.  
> **No invent new art assets** — pin icon stays `/icons/semantic-schema-runtime/ic-map-pin.png`.  
> Overnight: proceed to UI-2 after this file (no AskQuestion).

## Meta

| Field | Value |
|-------|-------|
| Route | `/#/board` → Map |
| Viewport | 1536×1024 |
| Anchor task | `task-spa-bug-09-t03-fix-loadimage-boot` |
| Baseline | [ui-baseline/](./ui-baseline/) |

## Target states

| State | Visual intent | Pass cue |
|-------|---------------|----------|
| Map · pins Present | Basemap + ≥1 unclustered pin **or** cluster circle/count | Not basemap-only |
| Map · empty-pins | `data-testid="board-map-empty-pins"` when zero pin-capable | Unchanged contract |
| List mode | PH-04 feed; List toggle active | No chrome regression |

## Selectors

- `data-testid="board-issues-map"`
- `data-testid="board-map-empty-pins"`
- `data-testid="list-map-toggle"` / `board-view-map` / `board-view-list`
- MapLibre source id: `ssr03-issue-pins`
- Pin image id: `ssr03-ic-map-pin`

## Implementation lock (H1)

Boot must `await map.loadImage(url)` → `addImage(id, response.data)` → `ensureLayers()` → `syncSource()`.  
Cluster click: `await source.getClusterExpansionZoom(clusterId)`.

## Diff vs baseline

Baseline = basemap-only with Map active and empty-pins absent. Target = same chrome + visible pin/cluster layers.
