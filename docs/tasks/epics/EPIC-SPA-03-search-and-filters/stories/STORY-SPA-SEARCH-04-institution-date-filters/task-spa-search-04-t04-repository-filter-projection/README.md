## Task workspace — `task-spa-search-04-t04-repository-filter-projection`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: G3 §4.1 — [`STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md); gateway [`read_filters.py`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)
- **Depends on:** T01 Done
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: implement — gateway + in-memory repository filter projection

### Цель
Прокинуть `institution`, `created_after`, `created_before` в `GatewayIssueRepository.buildIssuesQuery` и `InMemoryIssueRepository.applyReadFilters` для паритета GFL-DRIVEN / FAKE-OLD (Story AC #3, #4, #6 partial).

### Почему это важно (риск)
UI без repo projection даст ложное ощущение фильтрации; gateway уже готов — клиентский gap.

### Факты из кода (Code Facts / SSOT)
1. `buildIssuesQuery` only status/type/labels: [`GatewayIssueRepository.js:20-35`](../../../../../../../../src/repositories/GatewayIssueRepository.js).
2. Existing query test covers status/type/labels only: [`GatewayIssueRepository.test.js:26-47`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js).
3. `applyReadFilters` no institution/date: [`InMemoryIssueRepository.js:9-31`](../../../../../../../../src/repositories/InMemoryIssueRepository.js).
4. Institution match semantics — et/ru/en/scalar: [`read_filters.py:134-142`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).
5. Date inclusive bounds on `created_at`: [`read_filters.py:214-217`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).

### Gap / Проблема
Repository layer ignores institution and date options despite backend support.

### AC/DoD
- [ ] (P0) Story AC #3: `getIssues({ institution, created_after, created_before })` appends correct query params to `GET /tallinn/issues`.
- [ ] (P0) Story AC #4: `applyReadFilters` filters in-memory seed by same rules (institution i18n match + date inclusive).
- [ ] (P0) Story AC #6: unit tests for `buildIssuesQuery` new params in [`GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js).
- [ ] (P0) Story AC #6: unit tests for `applyReadFilters` institution/date in new or extended InMemory test file.
- [ ] (P1) Shared pure helper for institution match (optional) to keep gateway + in-memory DRY.

### Где менять код
- [`src/repositories/GatewayIssueRepository.js`](../../../../../../../../src/repositories/GatewayIssueRepository.js)
- [`src/repositories/InMemoryIssueRepository.js`](../../../../../../../../src/repositories/InMemoryIssueRepository.js)
- [`src/repositories/__tests__/GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js)
- Новый или расширенный: [`src/repositories/__tests__/InMemoryIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/InMemoryIssueRepository.test.js)

### Out of scope
- BoardPage fetch wiring (T05)
- UI components (T02, T03)

### Проверка
```bash
cd spa-app
npx vitest run src/repositories/__tests__/GatewayIssueRepository.test.js src/repositories/__tests__/InMemoryIssueRepository.test.js
```
