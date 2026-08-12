## Task workspace — `task-spa-g3-t04-tests-search-url-and-reset`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: Scope §4; Story AC #2–#4
- **Depends on:** T02 Done

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000007`  
**Skill declared:** react-expert  
---

## Task: tests — SearchInput URL sync, filtering, reset clears search

### Цель
Добавить тесты: ввод обновляет `?search=` в URL; Reset Filters очищает search; фильтрация списка не регрессирует (Story AC #2, #3, #4).

### Почему это важно (риск)
Инфраструктура reset/search уже есть в коде — регрессия возможна при добавлении UI; тесты фиксируют контракт.

### Факты из кода (Code Facts / SSOT)
1. `boardQuery` тесты green — [`boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js).
2. Reset передаёт `search: ''` — [`BoardPage.jsx:192,225`](../../../../../../../../src/pages/BoardPage.jsx).
3. `hasActiveFilters` учитывает search — [`BoardPage.jsx:87-91`](../../../../../../../../src/pages/BoardPage.jsx).
4. Shell tests exist — [`BoardPage.shell.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.shell.test.jsx).
5. Contract §8 checklist: SearchInput → `serializeBoardQuery`, не gateway.

### Gap / Проблема
Нет тестов на UI↔URL связку search и reset после появления SearchInput.

### AC/DoD
- [x] (P0) Story AC #2: тест — ввод в SearchInput → location/search содержит `search=`.
- [x] (P0) Story AC #3: тест — при mock issues фильтрация по search совпадает с `filteredIssues` логикой (или snapshot count).
- [x] (P0) Story AC #4: тест — Reset Filters сбрасывает `search` в URL/state.
- [x] (P1) `npm run test:run` — green, без flaky.

### Где менять код
- [`src/pages/__tests__/`](../../../../../../../../src/pages/__tests__/) — новый или расширенный BoardPage test
- Опционально: [`src/components/Filters/__tests__/`](../../../../../../../../src/components/Filters/) — unit SearchInput

### Out of scope
- E2E Playwright
- boardQuery unit tests (уже есть)
- Cross-language search (SEARCH-03)

### Проверка
```bash
cd spa-app
npm run test:run -- src/router/__tests__/boardQuery.test.js src/pages/__tests__/BoardPage*.test.jsx src/components/Filters/
```
