# SPA-REQ21-02-T01 — Classify index board rules

**Status:** Done · P3 `2026-10-06T19:58:42Z`  
**Story:** [`../STORY-SPA-REQ21-02-css-ownership-board-migrate.md`](../STORY-SPA-REQ21-02-css-ownership-board-migrate.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-02 · arch `02-tokens-theme-css.md` §3  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T19:53:15Z`  
**Done:** `2026-10-06T19:58:42Z`  
**Package:** `pkg-000093`

## Purpose

Классифицировать `.board-*` (и related shell layout) в `src/index.css` → shell / feature / page per ownership table (arch §3).

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Inventory table Present | [`ownership-inventory.md`](./ownership-inventory.md) |
| 2 | Layers: reset / shell / locale / board page / issue page | same |

## AC / DoD

- [x] (P0) Ownership inventory table for board-related rules in `index.css` — feeds T02/T03
- [x] (P0) Classify-only artifact (moves in T02/T03)

## Where changed

- `task-spa-req21-02-t01-…/ownership-inventory.md` (NEW)

## Out of scope

Theme · redesign invent

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-02-css-ownership-board-migrate/task-spa-req21-02-t01-classify-index-board-rules/ownership-inventory.md
```
