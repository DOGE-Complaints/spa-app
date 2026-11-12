# STORY-SPA-REQ21-02 — CSS ownership: migrate board rules out of index.css (pipeline)

- **Status:** Done · P3 `2026-10-06T19:58:42Z` · P6 gap CLOSED `2026-10-06T20:02:11Z` · `pkg-000093`
- **Epic:** [EPIC-SPA-18-ui-modularity-theme-redesign-prep](../../EPIC-SPA-18-ui-modularity-theme-redesign-prep.md) (**REUSE**)
- **Backlog:** [`spa-app/docs/tasks/backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-02-css-ownership-board-migrate.md`](../../../../backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-02-css-ownership-board-migrate.md)
- **Package:** `pkg-000093-20261006-epic-spa-18-req21-02-css-ownership-board-migrate.yaml`
- **ui_scope:** `none` · CSS modularize · **UX:** SKIP (no artboard / brief)
- **Skill declared:** `javascript-pro`
- **Gate:** [acceptance-verification-spa-req21-02.md](task-spa-req21-02-t05-story-gate/acceptance-verification-spa-req21-02.md) · **PASS** `2026-10-06T19:58:42Z`

## Зачем простыми словами

Стили доски свалены в огромный `index.css`. Нужно разложить по владельцам (shell / feature / page), не меняя картинку.

## Verified facts

### Historical (P1.3)

| Fact | Evidence |
|------|----------|
| ~563 LOC index with board dump | `src/index.css` (`wc` 563 · 49 `.board-` hits) |
| Shell CSS Present | `src/components/AppShell/AppShell.css`, `Header.css` |
| Arch ownership SSOT | `02-tokens-theme-css.md` §3 |

### As-of-Done (P3 · `2026-10-06T19:58:42Z`)

| Fact | Evidence |
|------|----------|
| index.css reset-only | ~23 LOC · **0** `.board-` |
| Shell rules in AppShell.css | board-main / sidebar / header-strip / board-footer |
| Board feature CSS | `src/pages/BoardPage.css` |
| Issue page CSS | `src/pages/IssuePage.css` |
| Parity | vitest 17/17 · board-shell smoke PASS |

## AC (verbatim backlog)

| ID | Criterion |
|----|-----------|
| AC-SPA-REQ2102-01 | board layout CSS not concentrated in `index.css` (AC-21-02) |
| AC-SPA-REQ2102-02 | visual parity; tests/screenshots not regress without intentional baseline update |

## Scope / Out

**In:** classify + move `.board-*` (related shell layout) out of `index.css` → colocated CSS; slim `index.css` to reset+imports; parity smoke; gate.  
**Out:** Theme/`data-theme` (REQ21-03) · next brand pixels · MapLibre style · ThemeToggle · `#/next` · visual redesign invent

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-req21-02-t01-classify-index-board-rules](task-spa-req21-02-t01-classify-index-board-rules/README.md) | Done |
| T02 | [task-spa-req21-02-t02-move-shell-rules](task-spa-req21-02-t02-move-shell-rules/README.md) | Done |
| T03 | [task-spa-req21-02-t03-move-feature-page-rules](task-spa-req21-02-t03-move-feature-page-rules/README.md) | Done |
| T04 | [task-spa-req21-02-t04-visual-parity-check](task-spa-req21-02-t04-visual-parity-check/README.md) | Done |
| T05 | [task-spa-req21-02-t05-story-gate](task-spa-req21-02-t05-story-gate/README.md) | Done |
| T06 | [task-spa-req21-02-t06-audit-f1-backlog-as-of-done-ssot](task-spa-req21-02-t06-audit-f1-backlog-as-of-done-ssot/README.md) | Done · P6 F1 |
| T07 | [task-spa-req21-02-t07-audit-f2-arch-tokens-css-as-of-done](task-spa-req21-02-t07-audit-f2-arch-tokens-css-as-of-done/README.md) | Done · P6 F2 |

## Code targets

- `src/index.css`
- `src/components/AppShell/*.css`
- optional `src/pages/*.css` / feature CSS · entry imports
