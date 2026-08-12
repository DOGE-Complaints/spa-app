## Task workspace — `task-spa-search-04-t06-tests-institution-date-filters`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: Story AC #6
- **Depends on:** T01–T05 Done
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: tests — integration sweep for institution and date filters

### Цель
Закрыть Story AC #6: полный vitest green + targeted coverage boardQuery, repos, components, BoardPage integration.

### Почему это важно (риск)
Частичные unit tests в T01/T04 не гарантируют end-to-end URL → fetch → display parity.

### Факты из кода (Code Facts / SSOT)
1. Story AC #6 — [`STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md).
2. Repo tests precedent — [`GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js).
3. BoardPage filter tests — [`BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx), SEARCH-02 panel tests.
4. Mock seed with institution + `created_at` — [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js).
5. Prior suite baseline — `npx vitest run` green after SEARCH-03.

### Gap / Проблема
No integration tests proving institution/date URL → repository options → filtered board state.

### AC/DoD
- [ ] (P0) Story AC #6: `npx vitest run` in `spa-app` — all green.
- [ ] (P0) Coverage: boardQuery round-trip institution + dates (if not fully in T01).
- [ ] (P0) Coverage: `buildIssuesQuery` + `applyReadFilters` (if not fully in T04).
- [ ] (P0) BoardPage test: apply institution filter updates URL and fetch options.
- [ ] (P1) BoardPage test: date range filters issues in FAKE-OLD mode.
- [ ] (P1) Regression: existing search/filter tests unchanged behavior.

### Где менять код
- [`src/pages/__tests__/BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) or new `BoardPage.filters.test.jsx`
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
