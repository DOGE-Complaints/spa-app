## Task workspace — `task-spa-search-02-t11-tests-pending-applied-url`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- **Depends on:** T08, T09 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: tests — pending/applied, batch apply, URL roundtrip

### Цель
Vitest: `useBoardFilterDraft` dirty detection; panel toggle does not call navigate until Apply; Apply serializes URL; chip remove navigates; F5/Back roundtrip via `parseBoardQuery`/`serializeBoardQuery`.

### Почему это важно (риск)
Story AC #5, #7; regression guard for D-S4/D-S6.

### Факты из кода (Code Facts / SSOT)
1. Precedent: [`task-spa-g3-t04-tests-search-url-and-reset`](../../STORY-SPA-G3-search-input-toolbar/task-spa-g3-t04-tests-search-url-and-reset/README.md).
2. boardQuery tests: [`src/router/__tests__/boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js).

### Gap / Проблема
No tests for batch filter apply flow.

### AC/DoD
- [ ] (P0) Story AC #5: URL updates only on Apply/chip-remove/reset — tested.
- [ ] (P0) Story AC #7: vitest green for new suites.
- [ ] (P0) `areBoardFiltersEqual` / hook `isDirty` unit tests.
- [ ] (P1) BoardPage integration: mock navigate, assert call count on toggle vs apply.

### Где менять код
- `src/hooks/__tests__/useBoardFilterDraft.test.js`
- `src/pages/__tests__/BoardPage.filterPanel.test.js` (or extend existing)

### Out of scope
- Per-filter chip text (T12)

### Проверка
```bash
cd spa-app
npm run test:run
```
