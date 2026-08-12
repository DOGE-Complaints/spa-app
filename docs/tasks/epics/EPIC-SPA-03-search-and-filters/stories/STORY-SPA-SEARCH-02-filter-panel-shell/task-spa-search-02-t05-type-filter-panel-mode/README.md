## Task workspace — `task-spa-search-02-t05-type-filter-panel-mode`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: G3 §4.1 `type` scalar — [STORY-SPA-G3](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md)
- **Depends on:** T03 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: refactor — TypeFilter for panel pending mode

### Цель
Адаптировать [`TypeFilter.jsx`](../../../../../../../../src/components/Filters/TypeFilter.jsx): controlled single-select; «Any» → `''`; onChange только pending; scalar maps to URL `type` key omit when empty.

### Почему это важно (риск)
Type — single value vs status multi; неправильный chip/URL shape сломает gateway query.

### Факты из кода (Code Facts / SSOT)
1. Single select + Any: [`TypeFilter.jsx:32-57`](../../../../../../../../src/components/Filters/TypeFilter.jsx).
2. Enum: [`ISSUE_TYPE`](../../../../../../../../src/domain/types.js).
3. Serialize scalar: [`boardQuery.js:47-48`](../../../../../../../../src/router/boardQuery.js).
4. Repo: `params.set('type', options.type)` — [`GatewayIssueRepository.js:30-32`](../../../../../../../../src/repositories/GatewayIssueRepository.js).

### Gap / Проблема
TypeFilter closes dropdown on select (OK); parent must not navigate until Apply.

### AC/DoD
- [ ] (P0) Controlled `type: string` + `onChange(type: string)` без navigate.
- [ ] (P0) «Any» clears to `''`; не пишет `type` в URL при serialize.
- [ ] (P0) Options from `ISSUE_TYPE`; i18n `issueType.*`.
- [ ] (P1) Panel-friendly layout consistent with StatusFilter variant.

### Где менять код
- [`src/components/Filters/TypeFilter.jsx`](../../../../../../../../src/components/Filters/TypeFilter.jsx)

### Out of scope
- BoardPage (T07)

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/Filters/__tests__/TypeFilter.test.js
```
