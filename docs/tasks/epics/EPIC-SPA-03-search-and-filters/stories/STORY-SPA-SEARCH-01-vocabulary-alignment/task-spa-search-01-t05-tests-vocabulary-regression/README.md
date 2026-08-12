## Task workspace — `task-spa-search-01-t05-tests-vocabulary-regression`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: backlog Scope — «Тесты: types/boardQuery/StatusBadge/labelDisplay»
- **Depends on:** SPA-SEARCH-01-T01..T04

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000008`  
**Skill declared:** javascript-pro  
---

## Task: fix/tests — vocabulary regression sweep

### Цель
Обновить unit/integration тесты под gateway vocabulary; восстановить green suite (story AC #7).

### Почему это важно (риск)
Cross-cutting enum change ломает десятки тестов с hardcoded `complaint`/`VERIFIED`/`bureaucracy`.

### Факты из кода (Code Facts / SSOT)
1. [`types.test.js`](../../../../../../../../src/domain/__tests__/types.test.js) — enum assertions.
2. [`boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js) — old URL codes.
3. [`GatewayIssueRepository.test.js:35-46`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) — `VERIFIED`, `complaint`, `bureaucracy`.
4. [`StatusBadge.test.jsx`](../../../../../../../../src/components/__tests__/StatusBadge.test.jsx) — status variants.
5. [`IssueCard.test.jsx`](../../../../../../../../src/components/IssueCard/__tests__/IssueCard.test.jsx) — `ISSUE_TYPE.COMPLAINT`.
6. [`LabelsFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/LabelsFilter.test.jsx) — `bureaucracy`.
7. [`BoardPage.shell.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.shell.test.jsx) — 4 columns (T03 may fix).

### Gap / Проблема
Story AC #7 — `npx vitest run` green.

### AC/DoD
- [ ] (P0) Story AC #7: `npm run test:run` — full suite green.
- [ ] (P0) Перечисленные test files обновлены под gateway codes.
- [ ] (P1) Нет оставшихся grep-хитов старых status/type в `src/**/__tests__` (кроме intentional legacy docs).

### Где менять код
- `src/**/__tests__/**` — см. Code Facts list

### Out of scope
- Новые E2E puppeteer gates
- Doc touchpoints (T06)

### Проверка
```bash
cd spa-app
npm run test:run
```
