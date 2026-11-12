# SPA-SSR-03-T03 — List view = full resultset

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** FR-SSR-03.4 · AC-SPA-MAP-02  
**Depends on:** T01  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-02
**Done:** 2026-09-02T20:42:09Z

```text
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png
```

## Purpose
List mode always shows full current Issues resultset (including Issues without coords). Partial map must not hide list rows.

## Risk
Filtering list to pin-capable only; breaking PH-04 feed.

## AC / DoD
- [x] (P0) List length = full resultset under same filters
- [x] (P0) Issues without coords remain in list

## Out of scope
Map pin logic (T02)

## Verification
```bash
rg -n 'board-feed|getIssues' spa-app/src/pages/BoardPage.jsx || true
```
