# STORY-SPA-REQ21-02 — CSS ownership: migrate board rules out of index.css

## Meta

- **Key:** `STORY-SPA-REQ21-02-css-ownership-board-migrate`
- **Пакет:** [`ui-modularity-theme-redesign-prep/`](./INDEX.md)
- **Status:** Done · P3 `2026-10-06T19:58:42Z` · P6 gap CLOSED `2026-10-06T20:02:11Z` · `pkg-000093`
- **Pipeline:** [`epics/…/STORY-SPA-REQ21-02-css-ownership-board-migrate.md`](../../epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-02-css-ownership-board-migrate/STORY-SPA-REQ21-02-css-ownership-board-migrate.md)
- **Package:** `pkg-000093-20261006-epic-spa-18-req21-02-css-ownership-board-migrate.yaml`
- **Тип:** CSS modularize (behavior-preserving)
- **Parent REQ:** [`21-…`](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md) §4.3 · FR-21.2 · AC-21-02
- **Architecture:** [`02-tokens-theme-css.md`](../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md) §3
- **Skill declared (future P3):** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`
- **ui_scope:** `none` · UX SKIP
- **Зависит от:** soft after [REQ21-01](STORY-SPA-REQ21-01-shell-chrome-ownership.md) (shell CSS homes clear)
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)

---

## Зачем простыми словами

Стили доски свалены в огромный `index.css`. Нужно разложить по владельцам (shell / feature / page), не меняя картинку.

---

## Scope

1. Behavior-preserving move of `.board-*` (and related shell layout rules) from `src/index.css` into shell/feature/page colocated CSS per ownership table.
2. `index.css` remains reset + imports + rare globals.
3. No visual redesign; no class rename unless required for ownership.

## Out of scope

- Theme schemes / `data-theme` (→ REQ21-03); next brand pixels; MapLibre style

---

## Verified current state

### Historical (pre-P3)

| Fact | Path |
|------|------|
| ~563 LOC index with board dump | `src/index.css` |
| Shell CSS exists | `src/components/AppShell/AppShell.css`, `Header.css` |

### As-of-Done (P3 · `2026-10-06T19:58:42Z` · P6 SSOT `2026-10-06T20:02:11Z`)

| Fact | Path |
|------|------|
| `index.css` reset-only · **0** `.board-` | `src/index.css` (~23 LOC) |
| Shell layout CSS | `src/components/AppShell/AppShell.css` · `LocaleSelector.css` (header-locale*) |
| Board feature/page CSS | `src/pages/BoardPage.css` |
| Issue page CSS | `src/pages/IssuePage.css` |
| Parity smoke | vitest 17/17 · `test:ui:board-shell` PASS (P3 gate) |

---

## Target / AC

- [x] **AC-SPA-REQ2102-01:** board layout CSS not concentrated in `index.css` (AC-21-02)
- [x] **AC-SPA-REQ2102-02:** visual parity; tests/screenshots not regress without intentional baseline update

---

## Техническое решение

По [arch 02-tokens-theme-css §3](../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md): CSS ownership — shell / feature / page colocated; `index.css` = reset + imports, не склад `.board-*`. Перенос behavior-preserving (не редизайн). Theme/`data-theme` → REQ21-03.

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-req21-02-t01-classify-index-board-rules` | Классифицировать `.board-*` в `index.css` → shell / feature / page (arch §3) |
| **T02** | `task-spa-req21-02-t02-move-shell-rules` | Перенос shell-related rules → `AppShell/*.css` (behavior-preserving) |
| **T03** | `task-spa-req21-02-t03-move-feature-page-rules` | Перенос board feed/toolbar/etc. → colocated / page CSS; `index.css` = reset+imports |
| **T04** | `task-spa-req21-02-t04-visual-parity-check` | Visual parity smoke (AC-SPA-REQ2102-02) |
| **T05** | `task-spa-req21-02-t05-story-gate` | Gate AC-SPA-REQ2102-01…02 |
| **T06** | `task-spa-req21-02-t06-audit-f1-backlog-as-of-done-ssot` | P6 audit F1 — backlog Historical / As-of-Done SSOT |
| **T07** | `task-spa-req21-02-t07-audit-f2-arch-tokens-css-as-of-done` | P6 audit F2 — arch §3/§4 CSS ownership As-of-Done |

## Точки в коде

- `src/index.css`
- `src/components/AppShell/*.css`
- optional `src/pages/*.css` / feature CSS

## Dependencies

- REQ21-01 soft
