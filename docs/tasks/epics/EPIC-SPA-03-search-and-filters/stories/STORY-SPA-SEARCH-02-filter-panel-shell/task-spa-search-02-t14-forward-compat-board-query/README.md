## Task workspace — `task-spa-search-02-t14-forward-compat-board-query`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: SEARCH-04/05 future keys — [STORY-SPA-SEARCH-04](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md), [SEARCH-05](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md)
- **Depends on:** T01 Done

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** javascript-pro  
---

## Task: document — forward-compat boardQuery placeholders (no runtime)

### Цель
JSDoc + `@typedef` extension on `BoardFilterState`: document future URL keys `institution`, `created_after`, `created_before`, `geo_*` — parse/serialize **no-op** in SEARCH-02; slot contract for SEARCH-04/05.

### Почему это важно (риск)
Without documented extension points, SEARCH-04 will fork parallel URL parsers.

### Факты из кода (Code Facts / SSOT)
1. Current parse shape: [`boardQuery.js:31-36`](../../../../../../../../src/router/boardQuery.js).
2. Gateway 15 params — G3 §4.1 table.
3. SEARCH-04 scope: institution + created_* in boardQuery — backlog SEARCH-04.

### Gap / Проблема
boardQuery only knows status/type/labels/search; future keys undocumented.

### AC/DoD
- [ ] (P0) JSDoc on `parseBoardQuery`/`serializeBoardQuery` lists future keys (ignored until SEARCH-04/05).
- [ ] (P0) `BoardFilterState` typedef includes optional commented fields OR separate `FutureBoardFilterFields` typedef.
- [ ] (P0) **No runtime behavior change** — existing tests green unchanged.
- [ ] (P1) FilterPanel `data-slot` values match documented key names.

### Где менять код
- [`src/router/boardQuery.js`](../../../../../../../../src/router/boardQuery.js) — JSDoc only
- [`src/router/boardFilterState.js`](../../../../../../../../src/router/boardFilterState.js) — from T01

### Out of scope
- Implement institution/date/geo parse

### Проверка
```bash
cd spa-app
npm run test:run -- src/router/__tests__/boardQuery.test.js
```
