## Task workspace — `task-spa-search-02-t13-tests-server-filter-key`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: G3 §4.3 — [STORY-SPA-G3](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md)
- **Depends on:** T07 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: tests — serverFilterKey regression (fetch cadence)

### Цель
Regression: `serializeServerBoardQuery` strips search; `serverFilterKey` changes only when applied status/type/labels change; `getIssues` mock not called on pending-only changes.

### Почему это важно (риск)
Batch UI must not alter G3 fetch contract — search still client-side.

### Факты из кода (Code Facts / SSOT)
1. [`serializeServerBoardQuery`](../../../../../../../../src/router/boardQuery.js#L64-L74) — search forced `''`.
2. [`BoardPage.jsx:43-46`](../../../../../../../../src/pages/BoardPage.jsx) — serverFilterKey memo deps.
3. G3-T08 decoupled search from fetch.

### Gap / Проблема
No test guarding fetch vs pending draft.

### AC/DoD
- [ ] (P0) `serializeServerBoardQuery('?search=foo')` → no search in output.
- [ ] (P0) Pending label toggle without Apply → `issueService.getIssues` call count unchanged (mock).
- [ ] (P0) Apply with new status → fetch triggered once.
- [ ] (P1) Options passed to getIssues match applied filters only.

### Где менять код
- `src/pages/__tests__/BoardPage.serverFilterKey.test.js`
- Or extend [`BoardPage.test.js`](../../../../../../../../src/pages/__tests__/BoardPage.test.js)

### Проверка
```bash
cd spa-app
npm run test:run -- src/pages/__tests__/
```
