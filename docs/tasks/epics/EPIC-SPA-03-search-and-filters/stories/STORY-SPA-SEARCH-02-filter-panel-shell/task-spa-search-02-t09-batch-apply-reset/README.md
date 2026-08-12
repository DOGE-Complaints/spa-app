## Task workspace — `task-spa-search-02-t09-batch-apply-reset`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: D-S4 batch — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Depends on:** T07 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: implement — Apply/Reset footer UX in FilterPanel

### Цель
Footer кнопки «Применить» / «Сбросить» в `FilterPanel`: Apply disabled when `!isDirty`; Reset clears all filters + search (AC#4); Reset disabled when `!hasActiveFilters`.

### Почему это важно (риск)
D-S4 batch без явного Apply/Reset UX непонятен пользователю.

### Факты из кода (Code Facts / SSOT)
1. [`ResetFiltersControl.jsx`](../../../../../../../../src/components/Filters/ResetFiltersControl.jsx) — disabled pattern.
2. `hasActiveFilters` logic: [`BoardPage.jsx:92-96`](../../../../../../../../src/pages/BoardPage.jsx).
3. Reset clears search: backlog AC #4.

### Gap / Проблема
ResetFiltersControl in toolbar; no Apply button; no dirty state.

### AC/DoD
- [ ] (P0) Story AC #2: Apply commits pending → URL.
- [ ] (P0) Story AC #4: Reset clears status/type/labels/search; disabled when nothing active.
- [ ] (P0) Apply disabled when pending === applied (server fields).
- [ ] (P1) i18n keys for Apply (`filterApply` or reuse pattern) in et/ru/en.
- [ ] (P1) On panel open: `syncPendingFromApplied`.

### Где менять код
- [`FilterPanel.jsx`](../../../../../../../../src/components/Filters/FilterPanel.jsx) footer slot
- [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)
- [`src/i18n/dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — Apply label if missing

### Out of scope
- Move SearchInput into panel (SEARCH-03)

### Проверка
```bash
cd spa-app
npm run test:run
```
