## Task workspace — `task-spa-search-05-t03-issue-read-filters-geo-helpers`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: G3 §4.2 — [`STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md); gateway [`read_filters.py:69-129`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)
- **Depends on:** T01 Todo
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: implement — pure geo filter helpers for FAKE-OLD parity

### Цель
Добавить в `issueReadFilters.js` pure helpers для admin geo-фильтрации с семантикой gateway: multi-value OR per dimension, `normalizeGeoToken` match, **issue без `geo` выпадает** при активном любом geo-фильтре (Story AC #3 partial).

### Почему это важно (риск)
InMemory repo без drop-without-geo даст ложный паритет с GFL-DRIVEN; диакритика без normalize сломает match.

### Факты из кода (Code Facts / SSOT)
1. `issueReadFilters.js` — institution/date only: [`issueReadFilters.js`](../../../../../../../../src/repositories/issueReadFilters.js).
2. Drop-without-geo semantics: [`read_filters.py:69-80`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).
3. Admin OR match per dimension: [`read_filters.py:101-129`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).
4. `normalize_geo_token`: [`scope.py:15-18`](../../../../../../../../../doge-complaints-gateway/src/core/geo/scope.py).
5. Precedent shared helper pattern — `institutionPayloadMatches`, `createdAtMatchesBounds` in same file.

### Gap / Проблема
Нет `anyGeoAdminFilterActive`, `geoAdminPayloadMatches` (or equivalent) для client-side parity.

### AC/DoD
- [ ] (P0) Story AC #3 (partial): helper returns false (exclude issue) when `issue.geo` missing/undefined and any geo admin filter active.
- [ ] (P0) Story AC #3 (partial): when no geo filters active, issues without geo pass through.
- [ ] (P0) Per-dimension multi-value OR with `normalizeGeoToken` comparison.
- [ ] (P0) Between dimensions — AND (all active dimensions must match).
- [ ] (P1) Unit tests: drop-without-geo, diacritics (`Põhja-Tallinn` matches `põhja tallinn`, not `pohja-tallinn`).
- [ ] (P1) Bbox filter keys explicitly not implemented (Story AC #5).

### Где менять код
- [`src/repositories/issueReadFilters.js`](../../../../../../../../src/repositories/issueReadFilters.js)
- Новый: [`src/repositories/__tests__/issueReadFilters.geo.test.js`](../../../../../../../../src/repositories/__tests__/issueReadFilters.geo.test.js)

### Out of scope
- GatewayIssueRepository wiring (T04)
- InMemoryIssueRepository `applyReadFilters` integration (T04)
- UI (T02, T05)

### Проверка
```bash
cd spa-app
npx vitest run src/repositories/__tests__/issueReadFilters.geo.test.js
```
