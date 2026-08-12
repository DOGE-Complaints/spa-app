## Task workspace — `task-spa-search-02-t01-filter-contract-matrix`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md); G3 [§4.1](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md)
- **Depends on:** SEARCH-01 Done (pkg-000008)

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: analyze — filter contract matrix (gateway → UI → request)

### Цель
Зафиксировать в коде/документе task SSOT-матрицу всех 15 gateway-параметров: какой UI-паттерн, откуда опции, как маппится в URL и `getIssues`. Ввести тип `BoardFilterState` (shape для pending/applied: status, type, labels, search + forward-compat placeholders).

### Почему это важно (риск)
Без единого контракта per-filter интеграция в панель (T04–T07) и слоты SEARCH-04/05 разойдутся по семантике pending→applied→fetch.

### Факты из кода (Code Facts / SSOT)
1. Gateway list handler — 15 params: [`handlers.py:321-358`](../../../../../../../../../doge-complaints-gateway/src/core/api/handlers.py).
2. SPA repo шлёт только status/type/labels: [`GatewayIssueRepository.js:20-35`](../../../../../../../../src/repositories/GatewayIssueRepository.js).
3. URL SSOT CSV: [`boardQuery.js:24-36,39-62`](../../../../../../../../src/router/boardQuery.js).
4. Fetch key без search: [`boardQuery.js:64-74`](../../../../../../../../src/router/boardQuery.js), [`BoardPage.jsx:43-55`](../../../../../../../../src/pages/BoardPage.jsx).
5. Labels options из issues: [`collectLabelKeysFromIssues.js`](../../../../../../../../src/i18n/collectLabelKeysFromIssues.js), [`BoardPage.jsx:82-85`](../../../../../../../../src/pages/BoardPage.jsx).

### Gap / Проблема
Нет формализованного `BoardFilterState` и матрицы filter→UI→request; inline toolbar смешивает applied state с мгновенным navigate.

### AC/DoD
- [ ] (P0) Артефакт в task (или `src/router/boardFilterState.js`): таблица SEARCH-02 scope (status/type/labels) + слоты institution/date/geo (no runtime).
- [ ] (P0) `BoardFilterState` / JSDoc `@typedef` с полями: `status: string[]`, `type: string`, `labels: string[]`, `search: string`; optional future keys documented only.
- [ ] (P0) Документирована цепочка: applied → `serializeBoardQuery` → `serializeServerBoardQuery` → `getIssues`.
- [ ] (P1) Риски из плана (labels narrow-window, chip granular status) зафиксированы в README task.

### Где менять код
- Новый: `src/router/boardFilterState.js` (или `src/components/Filters/filterContract.js`) — типы + `EMPTY_BOARD_FILTERS` + `areBoardFiltersEqual`
- Этот README — матрица §0–§1 плана materialize

### Out of scope
- Реализация hook (T02), UI (T03+)
- Расширение `buildIssuesQuery` (SEARCH-04/05)

### Проверка
```bash
cd spa-app
npm run test:run -- src/router/__tests__/boardQuery.test.js
```
