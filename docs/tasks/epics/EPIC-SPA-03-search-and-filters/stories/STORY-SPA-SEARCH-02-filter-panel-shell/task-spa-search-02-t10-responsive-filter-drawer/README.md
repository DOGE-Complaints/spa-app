## Task workspace — `task-spa-search-02-t10-responsive-filter-drawer`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: D-S7 — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Depends on:** T03 Done

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
**ui_scope:** visual  
---

## Task: implement — responsive drawer / bottom-sheet for FilterPanel

### Цель
На узких viewport панель открывается как drawer/bottom-sheet; на desktop — inline collapse. Focus trap при открытом drawer; backdrop dismiss; контролы доступны (AC#6).

### Почему это важно (риск)
D-S7 требует адаптив сразу; без drawer фильтры неудобны на мобайле.

### Факты из кода (Code Facts / SSOT)
1. Locale menu pattern backdrop: [`BoardPage.jsx:119-147`](../../../../../../../../src/pages/BoardPage.jsx) — reference for overlay.
2. Filter dropdown backdrop: [`StatusFilter.jsx:38`](../../../../../../../../src/components/Filters/StatusFilter.jsx).

### Gap / Проблема
No responsive container for filter panel.

### AC/DoD
- [ ] (P0) Story AC #6: narrow breakpoint → drawer/bottom-sheet; wide → inline expand.
- [ ] (P0) Toggle `aria-expanded`; focus moves into panel on open (basic trap).
- [ ] (P1) CSS breakpoint aligned with existing board layout (e.g. `board-shell` media queries).
- [ ] (P1) UI-3 manual checklist: narrow + wide documented in T15 or acceptance.

### Где менять код
- [`FilterPanel.jsx`](../../../../../../../../src/components/Filters/FilterPanel.jsx)
- [`Filters.css`](../../../../../../../../src/components/Filters/Filters.css)

### Out of scope
- Full modal focus-trap library

### Проверка
```bash
cd spa-app
npm run test:run
# Manual: resize viewport / devtools device mode
```
