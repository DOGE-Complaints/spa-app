## Task workspace — `task-dash-g1-t02-update-gateway-repository-tests`

- Story: [`../STORY-SPA-G1-gateway-endpoint-alignment.md`](../STORY-SPA-G1-gateway-endpoint-alignment.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`](../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md) Scope §2

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** done (2026-06-12)  
**Wave:** `pkg-000001`  
**Skill declared:** javascript-pro  
---

## Task: tests — GatewayIssueRepository URL expectations for `/tallinn/issues`

### Цель
Обновить unit-тесты `GatewayIssueRepository` под канонический путь `/tallinn/issues`; зафиксировать URL в `getIssue`.

### Почему это важно (риск)
Тест на строке 29 закрепляет ошибочный `demo-tallinn` path. Story AC #2.

### Факты из кода (Code Facts / SSOT)
1. [`GatewayIssueRepository.test.js:29`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) — `expect(requestUrl).toContain('.../demo-tallinn/issues?')`.
2. [`GatewayIssueRepository.test.js:37-44`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) — `getIssue` 404 test без assertion на URL path.

### Gap / Проблема
Тесты не соответствуют gateway API и будут падать после t01 без обновления ожиданий.

### AC/DoD
- [x] (P0) Story AC #2: `getIssues` test ожидает `/tallinn/issues` в request URL.
- [x] (P0) Story AC #2: добавить/обновить assertion для `getIssue` URL (`/tallinn/issues/{id}`).
- [x] (P0) `npm run test:run` для GatewayIssueRepository — green.

### Где менять код
- [`src/repositories/__tests__/GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js)

### Out of scope
- Интеграционные тесты с live gateway
- Изменения в `issueService.test.js` (нет `demo-tallinn` там)

### Проверка
```bash
cd spa-app
npm run test:run -- src/repositories/__tests__/GatewayIssueRepository.test.js
```
