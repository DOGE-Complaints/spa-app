## Task workspace — `task-spa-search-04-t03-date-range-filter-control`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) — «стандартный date-range»; G3 §4.1 `created_after`/`created_before`
- **Depends on:** T01 Done
- **ui_scope:** `mixed`

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: implement — DateRangeFilter for created_at bounds

### Цель
Реализовать контрол «Дата создания» (от/до) с `<input type="date">` для pending batch apply (Story AC #1).

### Почему это важно (риск)
Premium calendar вне scope; неверный ISO format сломает gateway string compare.

### Факты из кода (Code Facts / SSOT)
1. FilterPanel slot reserved: [`FilterPanel.jsx:41`](../../../../../../../../src/components/Filters/FilterPanel.jsx) `data-slot="date"`.
2. Issue field `created_at` optional ISO string: [`types.js:67`](../../../../../../../../src/domain/types.js), [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js).
3. Gateway inclusive string compare: [`read_filters.py:214-217`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).
4. URL keys from T01: `created_after`, `created_before`.
5. Batch apply pattern — [`useBoardFilterDraft.js`](../../../../../../../../src/hooks/useBoardFilterDraft.js) pending state (institution/date = server batch like status).

### Gap / Проблема
Нет `DateRangeFilter` component; date extension slot пустой.

### AC/DoD
- [ ] (P0) Story AC #1: `DateRangeFilter` with from/to inputs bound to `created_after` / `created_before`.
- [ ] (P0) Controlled props; no navigate inside component; `variant="panel"`.
- [ ] (P0) Emits ISO date strings (`YYYY-MM-DD`) compatible with URL + gateway compare.
- [ ] (P1) Clear affordance per bound (optional inline clear buttons).
- [ ] (P1) Component unit test: change from/to updates callbacks.
- [ ] (P1) Align visual states with [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md).

### Где менять код
- Новый: [`src/components/Filters/DateRangeFilter.jsx`](../../../../../../../../src/components/Filters/DateRangeFilter.jsx)
- [`src/components/Filters/Filters.css`](../../../../../../../../src/components/Filters/Filters.css)
- [`src/components/Filters/index.js`](../../../../../../../../src/components/Filters/index.js)
- Новый: [`src/components/Filters/__tests__/DateRangeFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/DateRangeFilter.test.jsx)

### Out of scope
- FilterPanel / BoardPage wiring (T05)
- Repository date filtering logic (T04)
- Premium calendar widget

### Проверка
```bash
cd spa-app
npx vitest run src/components/Filters/__tests__/DateRangeFilter.test.jsx
```
