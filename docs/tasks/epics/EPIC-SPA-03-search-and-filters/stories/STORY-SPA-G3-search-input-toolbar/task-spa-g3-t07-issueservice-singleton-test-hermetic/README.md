## Task workspace — `task-spa-g3-t07-issueservice-singleton-test-hermetic`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md) §3 F1
- **Depends on:** SPA-G3-T01..T06 Done
- **activation:** `run_mode=spa_g3_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_g3_audit_2026_06_16` (post-audit; **не** pkg-000007)  
**Skill declared:** javascript-pro  
---

## Task: fix/tests — hermetic issueService singleton test (FAKE-OLD)

### Цель
Убрать зависимость unit-теста от ambient `.env=GFL-DRIVEN` и сетевого gateway: проверять FAKE-OLD seed через `resolveIssueRepositoryForMode('FAKE-OLD')`, не через env-зависимый singleton `issueService`.

### Почему это важно (риск)
При `VITE_LIFE_REALITY_MODE=GFL-DRIVEN` тест `issueService.getIssues()` ходит на реальный gateway (5 issues) вместо 13 mock — вся сюита красная; story-gates «npm test green» не держатся.

### Факты из кода (Code Facts / SSOT)
1. Падающий тест — [`issueService.test.js:62-68`](../../../../../../../../src/services/__tests__/issueService.test.js): `issueService.getIssues()` ожидает ≥12.
2. Singleton создаётся с `import.meta.env.VITE_LIFE_REALITY_MODE` — [`issueService.js:30,44`](../../../../../../../../src/services/issueService.js).
3. FAKE-OLD path green — [`issueService.test.js:70-75`](../../../../../../../../src/services/__tests__/issueService.test.js): `resolveIssueRepositoryForMode('FAKE-OLD')` → ≥12.
4. Audit F1 — [audit-STORY-SPA-G3-execution-2026-06-16.md](../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md) §3 F1.

### Gap / Проблема
Integration gap в unit-тесте: ambient env + сетевой gateway вместо герметичной проверки mock seed.

### AC/DoD
- [x] (P0) Audit F1: тест на default `issueService` не зависит от `.env=GFL-DRIVEN` / live gateway.
- [x] (P0) `npm run test:run -- src/services/__tests__/issueService.test.js` — green.
- [x] (P1) Полная сюита `npm run test:run` — green (восстанавливает gate для story-gates).
- [x] (P0) Артефакт `acceptance-verification-spa-g3-t07.md` в этой task-папке.

### Где менять код
- [`src/services/__tests__/issueService.test.js`](../../../../../../../../src/services/__tests__/issueService.test.js)

### Out of scope
- Изменение `issueService` singleton factory (только тест)
- `BoardPage` / SearchInput (T08)
- Новый pkg / смена `spa-active-package.current.yaml`
- Коммит локального `.env`

### Проверка
```bash
cd spa-app
npm run test:run -- src/services/__tests__/issueService.test.js
npm run test:run
```
