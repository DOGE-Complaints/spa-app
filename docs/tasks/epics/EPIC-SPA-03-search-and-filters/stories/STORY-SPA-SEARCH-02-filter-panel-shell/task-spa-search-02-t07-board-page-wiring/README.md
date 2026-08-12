## Task workspace — `task-spa-search-02-t07-board-page-wiring`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) scope in backlog story
- **Depends on:** T04, T05, T06 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: implement — BoardPage wiring (panel, draft, search immediate)

### Цель
Интегрировать `FilterPanel` + `useBoardFilterDraft` + Status/Type/Labels в [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx). Убрать immediate `applyFilters` для server filters. SearchInput остаётся immediate (SEARCH-03 унифицирует позже). `serverFilterKey` без изменений.

### Почему это важно (риск)
Центральная интеграция story; ошибка здесь ломает batch + fetch cadence.

### Факты из кода (Code Facts / SSOT)
1. Immediate apply: [`BoardPage.jsx:183-196`](../../../../../../../../src/pages/BoardPage.jsx).
2. `serverFilterKey`: [`BoardPage.jsx:43-46,48-55`](../../../../../../../../src/pages/BoardPage.jsx).
3. `fetchIssues` options: status/type/labels only — [`BoardPage.jsx:51-54`](../../../../../../../../src/pages/BoardPage.jsx).
4. Search client filter: [`BoardPage.jsx:74-80`](../../../../../../../../src/pages/BoardPage.jsx).

### Gap / Проблема
Toolbar inline row; no FilterPanel; every filter toggle navigates.

### AC/DoD
- [ ] (P0) Story AC #2: status/type/labels changes update pending only until Apply.
- [ ] (P0) Story AC #5: URL updates on Apply (via hook), not on panel toggles.
- [ ] (P0) `serverFilterKey` deps unchanged — fetch only on applied server filters.
- [ ] (P0) SearchInput still immediate `applyFilters({ ...boardFilters, search })` or equivalent.
- [ ] (P0) `availableLabels` passed from `issues` after fetch to LabelsFilter in panel.
- [ ] (P1) Inline `board-filters-row` replaced by panel + chips row placeholder (T08 completes chips).

### Где менять код
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)

### Out of scope
- ActiveFilterChips UI (T08)
- Drawer CSS (T10)

### Проверка
```bash
cd spa-app
npm run test:run -- src/pages/__tests__/BoardPage.test.js
```
