## Task workspace — `task-spa-search-01-t04-board-query-mock-seed-alignment`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: backlog Scope — `boardQuery.js`, `mockIssues.js`
- **Depends on:** SPA-SEARCH-01-T01

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000008`  
**Skill declared:** javascript-pro  
---

## Task: implement — boardQuery validation + FAKE-OLD mock seed alignment

### Цель
Валидировать URL-фильтры против gateway enum; обновить `ROUTING_DEMO_ISSUES` на канон status/type/labels.

### Почему это важно (риск)
`FAKE-OLD` и `GFL-DRIVEN` должны использовать один словарь — иначе dev/prod parity ломается (story AC #5).

### Факты из кода (Code Facts / SSOT)
1. `ALLOWED_STATUS`/`ALLOWED_TYPE` — [`boardQuery.js:3-4,26-28`](../../../../../../../../src/router/boardQuery.js) из `ISSUE_STATUS`/`ISSUE_TYPE`.
2. Old codes in tests — [`boardQuery.test.js:6-11`](../../../../../../../../src/router/__tests__/boardQuery.test.js): `VERIFIED`, `complaint`, `bureaucracy`.
3. Mock seed — [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js): 13 issues со старыми status/type/labels.
4. `parseBoardQuery` silent drop unknown — [`boardQuery.js:26-28`](../../../../../../../../src/router/boardQuery.js).

### Gap / Проблема
Story AC #4, #5.

### AC/DoD
- [ ] (P0) Story AC #4: `boardQuery` пропускает gateway codes; старые (`VERIFIED`, `complaint`, …) молча отбрасываются.
- [ ] (P0) Story AC #5: все 13 mock issues используют канон status/type/labels.
- [ ] (P1) `npm run test:run -- src/router/__tests__/boardQuery.test.js src/router/__tests__/mockIssues.test.js` — green.

### Где менять код
- [`src/router/boardQuery.js`](../../../../../../../../src/router/boardQuery.js) (если нужны правки сверх auto-sync из types.js)
- [`src/router/mockIssues.js`](../../../../../../../../src/router/mockIssues.js)

### Out of scope
- Gateway repository query mapping (unchanged)
- Full test sweep (T05)

### Проверка
```bash
cd spa-app
npm run test:run -- src/router/__tests__/boardQuery.test.js src/router/__tests__/mockIssues.test.js
```
