# SPA-SSR-03-T00 — MapLibre ADR spike

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** [ADR-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ADR-SSR-03-map-library.md) D1–D8 · [ARCHITECTURE-SSR-03-board-map-pins.md](../../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md) §3–4  
**Depends on:** SSR-01 geo typedef  
**ui_scope:** `none` (spike; UI wire in T01–T02)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-02
**Done:** 2026-09-02T20:42:09Z

## Purpose
Implement ADR + Architecture assemble: add `maplibre-gl` + **thin local React wrapper** (not react-map-gl by default); record free dark **vector** style URL; client cluster helper; prove `fitBounds` + cluster=zoom in spike notes. **No re-interview.**

## Risk
Paid Mapbox/Google token; provider wordmark; inventing bbox HTTP; coupling to gateway ClusterLens.

## Code Facts (As-of-Done · P3 2026-09-02T20:42:09Z)
- `maplibre-gl` ^4.7.1 in `spa-app/package.json` · thin local [`MapLibreMap.jsx`](../../../../../../../src/components/map/MapLibreMap.jsx)
- Style URL: `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json` (no paid key)
- Cluster: MapLibre GeoJSON `cluster: true` · expand = zoom only (spike notes below)
- Pin glyph: `/icons/semantic-schema-runtime/ic-map-pin.png`
- Host: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) — Architecture §1
- Assemble SSOT: [ARCHITECTURE-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md)

### Historical (pre-execute)
- Map deps were absent in `package.json` before T00 P3.

## AC / DoD
- [x] (P0) `maplibre-gl` dependency; thin local wrapper per Architecture §3
- [x] (P0) Free dark vector style URL documented (no paid key)
- [x] (P0) Cluster approach chosen (supercluster or MapLibre cluster layer); expand = zoom only
- [x] (P0) No Mapbox/Google SDK; no pack.json; no invent bbox endpoint

## Where to change
- `package.json` · `src/components/...` map wrapper (minimal; Architecture §3 targets) · this README spike notes

## Out of scope
Full board toggle UI (T01+) · spider/list on cluster · Leaflet default

## Verification
```bash
rg -n 'maplibre|mapbox|google.maps' spa-app/package.json spa-app/src || true
test -f spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/ADR-SSR-03-map-library.md
test -f spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md
```


## Spike notes (P3 execute 2026-09-02T20:42:09Z)

| Choice | Value |
|--------|-------|
| Library | `maplibre-gl` ^4.7.1 (thin local `MapLibreMap`; not react-map-gl) |
| Style URL | `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json` — free dark vector; no Mapbox/Google paid key |
| Cluster | MapLibre GeoJSON source `cluster: true` · expand = `getClusterExpansionZoom` (zoom only) |
| Pin glyph | `/icons/semantic-schema-runtime/ic-map-pin.png` |
| fitBounds | On source sync over pin FeatureCollection |
