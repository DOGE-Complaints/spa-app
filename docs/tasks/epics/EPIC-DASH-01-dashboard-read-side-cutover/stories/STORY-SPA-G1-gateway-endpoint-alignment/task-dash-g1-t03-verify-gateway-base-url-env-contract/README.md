## Task workspace — `task-dash-g1-t03-verify-gateway-base-url-env-contract`

- Story: [`../STORY-SPA-G1-gateway-endpoint-alignment.md`](../STORY-SPA-G1-gateway-endpoint-alignment.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`](../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md) Scope §3

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** done (2026-06-12)  
**Wave:** `pkg-000001`  
**Skill declared:** javascript-pro  
---

## Task: verify — `VITE_GATEWAY_BASE_URL` as sole host config

### Цель
Подтвердить, что host gateway задаётся только через `VITE_GATEWAY_BASE_URL`; path prefix не вынесен в отдельные env (Story Scope §3).

### Почему это важно (риск)
Дублирование конфигурации host/path усложнит деплой и расходится с `.env.example`. Story AC #1 (base URL contract).

### Факты из кода (Code Facts / SSOT)
1. [`issueService.js:31`](../../../../../../../../src/services/issueService.js) — `GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL`.
2. [`GatewayIssueRepository.js:5`](../../../../../../../../src/repositories/GatewayIssueRepository.js) — throw if baseUrl empty.
3. [`.env.example:15-20`](../../../../../../../../.env.example) — документирован только `VITE_GATEWAY_BASE_URL` для GFL-DRIVEN.
4. `grep VITE_.*GATEWAY` / `grep demo-tallinn` в `src/` — path hardcoded в repository, не в env.

### Gap / Проблема
Нужна явная верификация отсутствия новых env для path prefix после t01.

### AC/DoD
- [x] (P0) Story Scope §3: единственная env для host — `VITE_GATEWAY_BASE_URL` (подтверждено grep + README note в BULLRUN-PHASE-LOG).
- [x] (P1) Нет `VITE_GATEWAY_*_PATH` или аналогов в `src/` / `.env.example`.
- [x] (P1) Если drift найден — исправить в рамках task; иначе зафиксировать «no change required» в acceptance-verification.

### Где менять код
- Только при обнаружении drift: [`src/services/issueService.js`](../../../../../../../../src/services/issueService.js), [`.env.example`](../../../../../../../../.env.example)
- Иначе: документировать результат в `acceptance-verification-*.md` этой папки

### Out of scope
- Добавление новых env-переменных (Story «Вне scope»)

### Проверка
```bash
cd spa-app
rg "VITE_.*GATEWAY|demo-tallinn" src/ .env.example
npm run test:run
```
