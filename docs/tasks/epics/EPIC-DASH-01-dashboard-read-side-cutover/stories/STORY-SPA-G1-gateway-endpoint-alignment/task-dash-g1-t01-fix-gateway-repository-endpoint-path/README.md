## Task workspace — `task-dash-g1-t01-fix-gateway-repository-endpoint-path`

- Story: [`../STORY-SPA-G1-gateway-endpoint-alignment.md`](../STORY-SPA-G1-gateway-endpoint-alignment.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`](../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md) Scope §1

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** done (2026-06-12)  
**Wave:** `pkg-000001`  
**Skill declared:** javascript-pro  
---

## Task: fix — GatewayIssueRepository endpoint path `/tallinn/issues`

### Цель
Заменить в `GatewayIssueRepository` путь `/demo-tallinn/issues` на канонический `/tallinn/issues` для `getIssues` и `getIssue`.

### Почему это важно (риск)
В режиме `GFL-DRIVEN` SPA обращается к несуществующему маршруту gateway; read-flow сломан. Story AC #1.

### Факты из кода (Code Facts / SSOT)
1. [`GatewayIssueRepository.js:51`](../../../../../../../../src/repositories/GatewayIssueRepository.js) — list URL: `/demo-tallinn/issues`.
2. [`GatewayIssueRepository.js:59`](../../../../../../../../src/repositories/GatewayIssueRepository.js) — get URL: `/demo-tallinn/issues/${safeId}`.
3. Gateway канон: [`asgi_app.py:322`](../../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py) — `@app.get("/tallinn/issues")`.
4. Gateway канон: [`asgi_app.py:364`](../../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py) — `@app.get("/tallinn/issues/{issue_id}")`.

### Gap / Проблема
SPA path `/demo-tallinn/issues` не зарегистрирован в gateway runtime.

### AC/DoD
- [x] (P0) Story AC #1: `getIssues` строит URL `{baseUrl}/tallinn/issues` (+ query).
- [x] (P0) Story AC #1: `getIssue` строит URL `{baseUrl}/tallinn/issues/{id}`.
- [x] (P1) Поведение envelope parsing и 404 → null без регрессии.

### Где менять код
- [`src/repositories/GatewayIssueRepository.js`](../../../../../../../../src/repositories/GatewayIssueRepository.js) — строки list/get URL

### Out of scope
- Изменение gateway API
- Новые env для path prefix (Story «Вне scope»)

### Проверка
```bash
cd spa-app
npm run test:run -- src/repositories/__tests__/GatewayIssueRepository.test.js
```
