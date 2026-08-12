## Task workspace — `task-spa-search-02-t03-filter-panel-shell`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: D-S3 — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Depends on:** T02 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
**ui_scope:** visual  
---

## Task: implement — FilterPanel shell (toggle, slots, footer)

### Цель
Компонент `FilterPanel`: кнопка «Фильтры» (collapse/expand), секция `primary` (children: status/type/labels), пустые `extension` слоты (`data-slot="institution"|"date"|"geo"`) для SEARCH-04/05, footer Apply/Reset (wired в T09).

### Почему это важно (риск)
AC#1 требует Jira-like контейнер; без shell per-filter tasks негде монтировать контролы.

### Факты из кода (Code Facts / SSOT)
1. Inline filters row: [`BoardPage.jsx:176-206`](../../../../../../../../src/pages/BoardPage.jsx).
2. Existing filter CSS: [`Filters.css`](../../../../../../../../src/components/Filters/Filters.css).
3. i18n keys: `filterStatus`, `filterType`, `filterLabels`, `resetFilters` in dictionaries.

### Gap / Проблема
Фильтры в тулбаре без collapsible panel и extension slots.

### AC/DoD
- [x] (P0) Story AC #1: toggle раскрывает/сворачивает панель; `aria-expanded` на trigger.
- [x] (P0) `FilterPanel` принимает `open`, `onOpenChange`, `children`, `footer`, `extensionSlot` (optional).
- [x] (P0) Extension area с `data-slot` markers (пустые, без «Скоро» UI).
- [x] (P1) Стили согласованы с `board-filters-row` / mockup-01 direction.
- [x] (P0) UI-0 baseline screenshot path noted in task acceptance (retroactive — `ui-baseline/`).

### Где менять код
- Новый: `src/components/Filters/FilterPanel.jsx`
- `src/components/Filters/index.js` — export
- `src/components/Filters/Filters.css` — panel layout

### Out of scope
- Wiring BoardPage (T07)
- Drawer breakpoint (T10)
- Chip row (T08)

### Проверка
```bash
cd spa-app
npm run test:run
```
