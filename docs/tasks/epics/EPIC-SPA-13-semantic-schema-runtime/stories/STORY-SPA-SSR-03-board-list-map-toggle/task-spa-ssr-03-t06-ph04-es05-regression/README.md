# SPA-SSR-03-T06 — PH-04 / ES-05 regression (Wave 3)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** ADMIN-SSR-06 Wave 3 · EPIC-SPA-13 AC  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02
**Done:** 2026-09-02T20:42:09Z

## Purpose
Prove map/overlay work does not break: PH-04 filtered-empty / load-error; ES-05 Issues continuum; unfiltered empty → Early Signal discovery (not map-only empty).

## Risk
Replacing discovery with map empty; collapsing filtered-empty into discovery; mixing Emerging cards into Issue overlay.

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) — ES discovery vs feed
- EPIC-SPA-12 ES-05 Done

## AC / DoD
- [x] (P0) Filtered-empty remains PH-04
- [x] (P0) Unfiltered zero Issues → discovery shell still works
- [x] (P0) Continuum (Issues ≥ 1) feed + map toggle coexist without ES breakage
- [x] (P0) No Early Signal Emerging treated as Issue `schema_card`

## Out of scope
Reopening ES-01…05 product scope · new ES endpoints

## Verification
```bash
rg -n 'board-early-signal-discovery|filteredEmpty|schema_card' spa-app/src/pages/BoardPage.jsx || true
```
