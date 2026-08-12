## Task workspace — `task-spa-search-05-t04-repository-geo-projection`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: G3 §4.1 — [`STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md); gateway [`read_filters.py`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)
- **Depends on:** T01, T03 Todo
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: implement — gateway + in-memory repository geo projection + mock seed

### Цель
Прокинуть `geo_*` admin arrays в `GatewayIssueRepository.buildIssuesQuery` (repeated-params) и `InMemoryIssueRepository.applyReadFilters` (T03 helpers); добавить `geo` в subset [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) для демо и drop-without-geo tests (Story AC #2, #3).

### Почему это важно (риск)
UI без repo projection даст ложное ощущение фильтрации; gateway уже готов — клиентский gap. Mocks без geo не позволят проверить D-S8 и drop semantics в FAKE-OLD.

### Факты из кода (Code Facts / SSOT)
1. `buildIssuesQuery` — institution/date only, no geo: [`GatewayIssueRepository.js:24-54`](../../../../../../../../src/repositories/GatewayIssueRepository.js).
2. `appendArrayParams` exists for labels/status: [`GatewayIssueRepository.js:15-22`](../../../../../../../../src/repositories/GatewayIssueRepository.js).
3. `applyReadFilters` — institution/date only: [`InMemoryIssueRepository.js`](../../../../../../../../src/repositories/InMemoryIssueRepository.js).
4. `mockIssues.js` — no `geo` field (grep verified).
5. Gateway geo admin repeated OR: G3 §4.1; curl example `geo_district=Kesklinn` in G3 §8.

### Gap / Проблема
Repository layer ignores geo options despite backend support; mock seed lacks geo for demo/tests.

### AC/DoD
- [ ] (P0) Story AC #2: `getIssues({ geo_district, geo_settlement, geo_region, geo_country, geo_postal_code })` appends repeated query params to `GET /tallinn/issues`.
- [ ] (P0) Story AC #3: `applyReadFilters` uses T03 helpers; issues without geo excluded when any geo filter active.
- [ ] (P0) `mockIssues.js` — geo on subset of seeds; at least one issue **without** geo for drop tests.
- [ ] (P0) Story AC #6 (partial): unit tests for `buildIssuesQuery` geo params in [`GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js).
- [ ] (P0) Story AC #6 (partial): unit tests for `applyReadFilters` geo + drop-without-geo in InMemory test file.
- [ ] (P1) Geo bbox params not sent (Story AC #5).

### Где менять код
- [`src/repositories/GatewayIssueRepository.js`](../../../../../../../../src/repositories/GatewayIssueRepository.js)
- [`src/repositories/InMemoryIssueRepository.js`](../../../../../../../../src/repositories/InMemoryIssueRepository.js)
- [`src/router/mockIssues.js`](../../../../../../../../src/router/mockIssues.js)
- [`src/repositories/__tests__/GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js)
- Новый или расширенный: [`src/repositories/__tests__/InMemoryIssueRepository.geo.test.js`](../../../../../../../../src/repositories/__tests__/InMemoryIssueRepository.geo.test.js)

### Out of scope
- BoardPage fetch wiring (T05)
- UI components (T02)

### Проверка
```bash
cd spa-app
npx vitest run src/repositories/__tests__/GatewayIssueRepository.test.js src/repositories/__tests__/InMemoryIssueRepository.geo.test.js
```
