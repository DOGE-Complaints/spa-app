## Task workspace — `task-spa-search-05-t06-tests-geo-filters`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: Story AC #6
- **Depends on:** T01–T05 Todo
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: tests — integration sweep for geo admin filters

### Цель
Закрыть Story AC #6: полный vitest green + targeted coverage boardQuery geo round-trip, repos geo + drop-without-geo, GeoFilter component, BoardPage integration.

### Почему это важно (риск)
Частичные unit tests в T01/T03/T04 не гарантируют end-to-end URL → fetch → display parity для geo.

### Факты из кода (Code Facts / SSOT)
1. Story AC #6 — [`STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md).
2. Repo tests precedent — [`GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js).
3. BoardPage filter tests — [`BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx); SEARCH-04 institution/date patterns.
4. Mock seed geo — added in T04 [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js).
5. Prior suite baseline — `npx vitest run` green after SEARCH-04 (155+ tests).

### Gap / Проблема
No integration tests proving geo URL → repository options → filtered board state + drop-without-geo in FAKE-OLD.

### AC/DoD
- [ ] (P0) Story AC #6: `npx vitest run` in `spa-app` — all green.
- [ ] (P0) Coverage: boardQuery round-trip all geo admin params (if not fully in T01).
- [ ] (P0) Coverage: `buildIssuesQuery` repeated geo_* + `applyReadFilters` drop-without-geo (if not fully in T04).
- [ ] (P0) BoardPage test: apply geo filter updates URL and fetch options.
- [ ] (P0) BoardPage test: issue without geo excluded when geo filter active (FAKE-OLD).
- [ ] (P1) Regression: existing search/filter/institution/date tests unchanged behavior.

### Где менять код
- [`src/pages/__tests__/BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) or new `BoardPage.geo-filters.test.jsx`
- [`src/router/__tests__/boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js)
- [`src/repositories/__tests__/`](../../../../../../../../src/repositories/__tests__/)
- [`src/components/Filters/__tests__/`](../../../../../../../../src/components/Filters/__tests__/)

### Out of scope
- Puppeteer `test:ui:filters` (T08 gate)
- Documentation (T07)

### Проверка
```bash
cd spa-app
npx vitest run
```
