# SPA-SSR-03-T04 — Preserve GeoFilter + URL keys

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** FR-SSR-03.5 / FR-SSR-03.6  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** 2026-09-02
**Done:** 2026-09-02T20:42:09Z

## Purpose
Existing SEARCH GeoFilter + URL admin geo query keys unchanged; public `issue.geo.*` only (no `admin_*` on Issue). Toggle must not clear filters. bbox still OOS.

## Risk
Inventing bbox filter HTTP; renaming `geo_district` keys.

## Code Facts (re-verify at execute)
- [`geoAdminFilterKeys.js`](../../../../../../../src/i18n/geoAdminFilterKeys.js)
- [`boardQuery.js`](../../../../../../../src/router/boardQuery.js) — bbox future-only

## AC / DoD
- [x] (P0) Filters work in list and map modes
- [x] (P0) No bbox invent; no `admin_*` on Issue wire
- [x] (P0) Switching modes preserves query

## Out of scope
New filter endpoints

## Verification
```bash
rg -n 'geo_district|geo_lat_min|admin_district' spa-app/src || true
```
