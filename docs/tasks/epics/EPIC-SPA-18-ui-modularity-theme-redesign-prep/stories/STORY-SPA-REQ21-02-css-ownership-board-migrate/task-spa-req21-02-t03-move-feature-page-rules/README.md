# SPA-REQ21-02-T03 — Move feature/page board rules

**Status:** Done · P3 `2026-10-06T19:58:42Z`  
**Story:** [`../STORY-SPA-REQ21-02-css-ownership-board-migrate.md`](../STORY-SPA-REQ21-02-css-ownership-board-migrate.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-02 · AC-SPA-REQ2102-01  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T19:53:15Z`  
**Done:** `2026-10-06T19:58:42Z`  
**Package:** `pkg-000093`

## Purpose

Перенос board feed/toolbar/etc. → BoardPage.css; issue details → IssuePage.css; `index.css` = reset + globals only.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Board feature CSS colocated | `src/pages/BoardPage.css` + import in `BoardPage.jsx` |
| 2 | Issue page CSS colocated | `src/pages/IssuePage.css` + import in `IssuePage.jsx` |
| 3 | index.css has **0** `.board-` | `rg` empty / `wc` ~23 LOC reset |

## AC / DoD

- [x] (P0) Board layout CSS not concentrated in `index.css` — **AC-SPA-REQ2102-01**
- [x] (P0) Behavior-preserving moves; imports wired
- [x] (P0) No class rename

## Where changed

- `src/pages/BoardPage.css` (NEW) · `BoardPage.jsx` import
- `src/pages/IssuePage.css` (NEW) · `IssuePage.jsx` import
- `src/index.css` slimmed

## Out of scope

Theme/`data-theme` · redesign · MapLibre

## Verification

```bash
wc -l spa-app/src/index.css
rg -c '\\.board-' spa-app/src/index.css || echo 0
```
