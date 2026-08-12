## Task workspace — `task-spa-search-04-t01-board-query-institution-date`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) — Scope §boardQuery; G3 §4.1
- **Depends on:** SEARCH-02 T14 forward-compat (Done, pkg-000009)
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: implement — board filter state + URL contract for institution and dates

### Цель
Promote `institution`, `created_after`, `created_before` из documented future keys в runtime `BoardFilterState` и `boardQuery` parse/serialize; foundation для server batch filters и URL persistence (Story AC #5).

### Почему это важно (риск)
Без единого URL SSOT institution/date будут дублироваться в ad-hoc state; SEARCH-02 T14 задокументировал no-op — сейчас нужен runtime.

### Факты из кода (Code Facts / SSOT)
1. Future keys JSDoc only: [`boardFilterState.js:11-23`](../../../../../../../../src/router/boardFilterState.js).
2. `parseBoardQuery` returns only status/type/labels/search: [`boardQuery.js:35-47`](../../../../../../../../src/router/boardQuery.js).
3. `serializeServerBoardQuery` strips search, omits institution/dates: [`boardQuery.js:75-84`](../../../../../../../../src/router/boardQuery.js).
4. `areServerFiltersEqual` compares only status/type/labels: [`boardFilterState.js:56-61`](../../../../../../../../src/router/boardFilterState.js).
5. Gateway expects scalar `institution`, `created_after`, `created_before` — G3 §4.1; [`read_filters.py:134-142`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py), [`214-217`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).

### Gap / Проблема
URL keys documented but not parsed/serialized; `BoardFilterState` runtime shape lacks institution/date fields.

### AC/DoD
- [ ] (P0) Story AC #5: `parseBoardQuery` / `serializeBoardQuery` round-trip `institution`, `created_after`, `created_before`.
- [ ] (P0) `createBoardFilterState` / `EMPTY_BOARD_FILTERS` include new fields (default empty strings).
- [ ] (P0) `serializeServerBoardQuery` includes institution + dates (excludes `search`).
- [ ] (P0) `areServerFiltersEqual` includes institution + date bounds (server batch parity with status/type/labels).
- [ ] (P0) `hasActiveBoardFilters` treats non-empty institution or either date bound as active.
- [ ] (P1) Unit tests in [`boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js) and [`boardFilterState.test.js`](../../../../../../../../src/router/__tests__/boardFilterState.test.js).

### Где менять код
- [`src/router/boardFilterState.js`](../../../../../../../../src/router/boardFilterState.js)
- [`src/router/boardQuery.js`](../../../../../../../../src/router/boardQuery.js)
- [`src/router/__tests__/boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js)
- [`src/router/__tests__/boardFilterState.test.js`](../../../../../../../../src/router/__tests__/boardFilterState.test.js)

### Out of scope
- UI components (T02, T03)
- Repository projection (T04)
- `useBoardFilterDraft` appliedKey extension (T05)

### Проверка
```bash
cd spa-app
npx vitest run src/router/__tests__/boardQuery.test.js src/router/__tests__/boardFilterState.test.js
```
