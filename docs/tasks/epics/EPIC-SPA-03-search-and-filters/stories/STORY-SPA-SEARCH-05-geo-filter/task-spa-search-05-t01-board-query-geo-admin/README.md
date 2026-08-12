## Task workspace — `task-spa-search-05-t01-board-query-geo-admin`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md) — Scope §boardQuery; G3 §4.1 geo admin
- **Depends on:** SEARCH-04 T01 Done (pkg-000011); SEARCH-02 T14 forward-compat (Done, pkg-000009)
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: implement — board filter state + URL contract for geo admin params

### Цель
Promote `geo_district`, `geo_settlement`, `geo_region`, `geo_country`, `geo_postal_code` из documented future keys в runtime `BoardFilterState` и `boardQuery` parse/serialize (CSV per key); foundation для server batch geo filters и URL persistence (Story AC #2 partial).

### Почему это важно (риск)
Без единого URL SSOT geo-фильтры будут дублироваться в ad-hoc state; SEARCH-02 T14 задокументировал no-op — сейчас нужен runtime. Bbox keys (`geo_lat/lon_*`) остаются out of scope.

### Факты из кода (Code Facts / SSOT)
1. Future keys JSDoc only: [`boardFilterState.js:14-23`](../../../../../../../../src/router/boardFilterState.js).
2. `parseBoardQuery` returns only status/type/labels/search/institution/dates: [`boardQuery.js:46-64`](../../../../../../../../src/router/boardQuery.js).
3. JSDoc lists geo_* as future no-op: [`boardQuery.js:7-9`](../../../../../../../../src/router/boardQuery.js).
4. `areServerFiltersEqual` omits geo fields: [`boardFilterState.js:62-74`](../../../../../../../../src/router/boardFilterState.js).
5. Gateway expects repeated `geo_*` params (multi-value OR per dimension) — G3 §4.1; [`read_filters.py:101-129`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).

### Gap / Проблема
URL keys documented but not parsed/serialized; `BoardFilterState` runtime shape lacks geo admin array fields.

### AC/DoD
- [ ] (P0) Story AC #2 (partial): `parseBoardQuery` / `serializeBoardQuery` round-trip `geo_district`, `geo_settlement`, `geo_region`, `geo_country`, `geo_postal_code` (CSV → string[]).
- [ ] (P0) `createBoardFilterState` / `EMPTY_BOARD_FILTERS` include geo fields (default empty arrays).
- [ ] (P0) `serializeServerBoardQuery` includes geo admin arrays (excludes `search`).
- [ ] (P0) `areServerFiltersEqual` includes all geo admin dimensions (server batch parity).
- [ ] (P0) `hasActiveBoardFilters` treats non-empty any geo array as active.
- [ ] (P1) Unit tests in [`boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js) and [`boardFilterState.test.js`](../../../../../../../../src/router/__tests__/boardFilterState.test.js).

### Где менять код
- [`src/router/boardFilterState.js`](../../../../../../../../src/router/boardFilterState.js)
- [`src/router/boardQuery.js`](../../../../../../../../src/router/boardQuery.js)
- [`src/router/__tests__/boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js)
- [`src/router/__tests__/boardFilterState.test.js`](../../../../../../../../src/router/__tests__/boardFilterState.test.js)

### Out of scope
- Geo bbox URL keys (`geo_lat_min/max`, `geo_lon_min/max`) — Story AC #5
- UI components (T02)
- Repository layer (T04)

### Проверка
```bash
cd spa-app
npx vitest run src/router/__tests__/boardQuery.test.js src/router/__tests__/boardFilterState.test.js
```
