# SPA-NF-03-T02 — Pins via `/icons/next-feed/map/map-pin.svg` + `issueGeo` lat/lon eligibility

**Status:** Done · P3 (`2026-10-10T18:53:45Z`)  
**Story:** [`../STORY-SPA-NF-03-list-map-toggle.md`](../STORY-SPA-NF-03-list-map-toggle.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** false  
**extends ui-mockup:** [`../task-spa-nf-03-t01-list-map-toggle/ui-mockup-spec.md`](../task-spa-nf-03-t01-list-map-toggle/ui-mockup-spec.md) _(created at P3 UI-1)_  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:48:34Z`  
**Package:** `pkg-000105`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png)

## Purpose
Pins via `/icons/next-feed/map/map-pin.svg` + `issueGeo` lat/lon eligibility.

## Arch anchors
- [02 §2 honesty / confirmed slice](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 — PNG not API truth](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Pin eligibility = numeric `geo.lat`/`geo.lon` (existing helpers) — confirmed data only — 02 §2.
- Runtime pin asset = `/icons/next-feed/map/map-pin.svg` (not legacy SSR pin path) — promote Done.
- Q14 ship/privacy gate is product process — not a new endpoint — 02 §2 · DUI.
- Do not treat PNG streets/labels as API — 00 §5 · 03 §4 PNG-as-API risk.

## Implement notes
- Wire feed map pin URL + eligibility filter for `#/next/feed`.
- OOS: invent coords; illustrative map goldens as contract.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `src/map/issueGeo.js`.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-03
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Pins only when lat/lon finite; icon URL next-feed map-pin
- [x] Partial map when some issues ineligible — honest

## Code Facts (re-verify at execute)
- Runtime: `public/icons/next-feed/map/map-pin.svg` Present
- Helper: `spa-app/src/map/issueGeo.js` (lat/lon pin eligibility)

## Where to change
- Feed map presentation under `features/feed/` (+ reuse map helpers)
- No re-copy masters unless 404 gap

## Verification
```bash
ls spa-app/public/icons/next-feed/map/map-pin.svg
rg -n "map-pin|issueGeo|geo\.lat|geo\.lon" spa-app/src/features/feed spa-app/src/map | head -40
```
