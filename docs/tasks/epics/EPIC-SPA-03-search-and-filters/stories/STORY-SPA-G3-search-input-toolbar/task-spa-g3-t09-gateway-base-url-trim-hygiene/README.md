## Task workspace — `task-spa-g3-t09-gateway-base-url-trim-hygiene`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md) §3 F3
- **Depends on:** —
- **activation:** `run_mode=spa_g3_audit_2026_06_16`

---
**Приоритет:** P2  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_g3_audit_2026_06_16` (post-audit; **не** pkg-000007)  
**Skill declared:** javascript-pro  
---

## Task: fix — gateway base URL trim hygiene

### Цель
`assertBaseUrl` нормализует trailing whitespace в `VITE_GATEWAY_BASE_URL` (как precedent в telemetry); задокументировать hygiene в `.env.example`.

### Почему это важно (риск)
Хвостовой пробел в URL ломает gateway-запросы; `assertBaseUrl` срезает только слэши, не пробелы — поведение расходится с [`labelMissTelemetry.js`](../../../../../../../../src/i18n/labelMissTelemetry.js).

### Факты из кода (Code Facts / SSOT)
1. `assertBaseUrl` — [`GatewayIssueRepository.js:3-8`](../../../../../../../../src/repositories/GatewayIssueRepository.js): `trim()` только для empty-check; return `replace(/\/+$/, '')` без trim пробелов.
2. Precedent `.trim()` — [`labelMissTelemetry.js:15`](../../../../../../../../src/i18n/labelMissTelemetry.js).
3. Audit F3 — [audit-STORY-SPA-G3-execution-2026-06-16.md](../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md) §3 F3 (локальный `.env` trailing space).
4. [`.env.example`](../../../../../../../../.env.example) — `VITE_GATEWAY_BASE_URL` без hygiene note.

### Gap / Проблема
Config hygiene: trailing whitespace в gateway base URL не нормализуется на read path.

### AC/DoD
- [x] (P0) Audit F3: `assertBaseUrl('http://127.0.0.1:8000 ')` → `http://127.0.0.1:8000` (unit test).
- [x] (P1) [`.env.example`](../../../../../../../../.env.example) — комментарий: без хвостовых пробелов в `VITE_GATEWAY_BASE_URL`.
- [x] (P1) Существующие [`GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) — green.
- [x] (P0) Артефакт `acceptance-verification-spa-g3-t09.md` в этой task-папке.

### Где менять код
- [`src/repositories/GatewayIssueRepository.js`](../../../../../../../../src/repositories/GatewayIssueRepository.js) — `assertBaseUrl`
- [`src/repositories/__tests__/GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) — trim case
- [`.env.example`](../../../../../../../../.env.example) — hygiene comment

### Out of scope
- Коммит/правка локального `.env` (оператор вручную)
- Изменение gateway API
- Новый pkg

### Проверка
```bash
cd spa-app
npm run test:run -- src/repositories/__tests__/GatewayIssueRepository.test.js
```
