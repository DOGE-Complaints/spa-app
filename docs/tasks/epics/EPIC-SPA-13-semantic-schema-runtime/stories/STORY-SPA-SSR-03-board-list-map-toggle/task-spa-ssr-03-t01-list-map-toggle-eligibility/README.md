# SPA-SSR-03-T01 — List|Map toggle + eligibility

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** FR-SSR-03.1 / FR-SSR-03.2 / FR-SSR-03.9 · M142 · [ARCHITECTURE-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md) §2–5  
**Depends on:** T00 · SSR-01  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-02
**Done:** 2026-09-02T20:42:09Z

```text
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png
```

## Purpose
On `/board`, List|Map control with text labels + catalog glyphs; Map enabled iff ≥1 Issue has numeric `geo.lat`+`geo.lon`; ineligible → disabled Map + helper (no empty enabled map). Follow Architecture §5 host rules (same `issues` state; do not clear filters).

## Risk
Icon-only toggle; enabling map with zero pins; breaking PH-04 toolbar; replacing ES discovery.

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) — Architecture §1
- Icons: `ic-view-list` / `ic-view-map` · L10N `schemaRuntime.map.*`
- Assemble: [ARCHITECTURE-SSR-03](../../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md)

## AC / DoD
- [x] (P0) Toggle list↔map for current resultset
- [x] (P0) Eligibility data-driven; ineligible helper copy
- [x] (P0) Text labels required beside glyphs
- [x] (P0) Host rules Architecture §5.1–5.5

## Where to change
- `BoardPage.jsx` · `ListMapToggle` (Architecture §3) · i18n

## Out of scope
Pin rendering (T02) · bbox

## Verification
```bash
rg -n 'schemaRuntime\.map|ic-view-list|geo\.lat' spa-app/src || true
```
