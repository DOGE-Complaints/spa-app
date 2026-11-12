# SPA-SSR-03-T02 — Map pins, cluster zoom, pin popup

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** FR-SSR-03.3 · ADR D5–D8 · M142 · [ARCHITECTURE-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md) §2–4  
**Depends on:** T00 · T01  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-02
**Done:** 2026-09-02T20:42:09Z

```text
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png
```

## Purpose
Primary map assemble task. Map pins = Issues with both coords only; light client cluster (tap = zoom); pin → mini-popup (title + optional `geo.label`) → Open issue; initial camera `fitBounds`; custom `ic-map-pin`. Modules per Architecture §3 (`BoardIssuesMap` + `MapLibreMap`).

## Risk
Direct navigate on pin (violates D5); spider list MVP; provider branding; reading pack.json.

## Code Facts (re-verify at execute)
- Assemble SSOT: [ARCHITECTURE-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md)
- Product locks: [ADR-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ADR-SSR-03-map-library.md)
- T00 wrapper + style URL

## AC / DoD
- [x] (P0) Pins ⊆ resultset; cluster zoom-only
- [x] (P0) Popup then open (not direct route)
- [x] (P0) fitBounds on current pin set
- [x] (P0) @mockup M142 on ui_anchor
- [x] (P0) Civic + public geo only in popup
- [x] (P0) Matches Architecture §3–4

## Where to change
- `BoardIssuesMap` · `MapLibreMap` · BoardPage map mode · stack from T00

## Out of scope
List full set (T03) · GeoFilter (T04) · bbox invent

## Verification
```bash
test -f spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md
test -f spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md
rg -n 'fitBounds|ic-map-pin|maplibre' spa-app/src || true
```
