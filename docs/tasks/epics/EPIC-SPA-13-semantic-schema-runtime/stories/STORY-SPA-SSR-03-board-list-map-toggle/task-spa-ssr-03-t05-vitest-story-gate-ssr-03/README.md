# SPA-SSR-03-T05 — Vitest + story gate SSR-03

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** backlog AC · ADR compliance · [ARCHITECTURE-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md)  
**Depends on:** T00–T04  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-02
**Done:** 2026-09-02T20:42:09Z

## Purpose
Tests: eligibility; pins ⊆ resultset; list full; ADR + Architecture assemble present. Story gate.

## AC / DoD
- [x] (P0) Eligibility unit/integration coverage
- [x] (P0) Map stack matches ADR (MapLibre, no paid key)
- [x] (P0) Architecture §3–5 behaviors not violated (fitBounds, popup→open, cluster=zoom, host rules)
- [x] (P0) Story AC checklist ready (T06 may trail)

## Out of scope
PH-04/ES-05 deep regression (T06)

## Verification
```bash
cd spa-app && npx vitest run --passWithNoTests
rg -n 'mapbox|google.maps' spa-app/package.json || true
test -f spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md
```
