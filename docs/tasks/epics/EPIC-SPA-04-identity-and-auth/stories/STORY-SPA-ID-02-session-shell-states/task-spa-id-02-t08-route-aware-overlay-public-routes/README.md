## Task workspace — `task-spa-id-02-t08-route-aware-overlay-public-routes`

- Story: [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-02-execution-2026-06-28.md`](../../../../../../analysis/audit-STORY-SPA-ID-02-execution-2026-06-28.md) §3 F1
- **Depends on:** SPA-ID-02-T01, T05 Done
- **activation:** `run_mode=spa_id_02_audit_2026_06_28`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_id_02_audit_2026_06_28` (post-audit; **не** pkg-000016)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:21:37Z  
---

## Task: fix — route-aware session shell overlay on public routes

### Цель
Сделать политику оверлея session shell **route-aware** для состояний `session_expired`, `backend_unavailable`, `network_error` на публичных роутах (`/board`, `/issue/*`), чтобы анонимный просмотр публичного контента не блокировался при истёкшем/транзитно недоступном identity. Закрыть audit F1.

### Почему это важно (риск)
Пользователь с истёкшим токеном получает блокирующий оверлей на `/board`, хотя FR-02.2 разрешает анонимный просмотр. CTA «Continue/Return to public board» ведёт на `/board`, но `shellState` не меняется — оверлей остаётся (ложное восстановление).

### Факты из кода (Code Facts / SSOT)
1. `shouldShowSessionShellOverlay` — для `logged_out` оверлей только на protected; для остальных non-authenticated состояний финальный `return true` — [`sessionShellState.js:43-56`](../../../../../../../../src/auth/sessionShellState.js).
2. Публичные пути — [`sessionRoutePolicy.js:1-15`](../../../../../../../../src/router/sessionRoutePolicy.js): `/`, `/board`, `/login`, `/issue/*`.
3. Тесты покрывают только `logged_out` × public/protected — [`sessionShellState.test.js:47-54`](../../../../../../../../src/auth/__tests__/sessionShellState.test.js); ветки `session_expired`/`backend`/`network` × public **не** тестируются.
4. Audit F1 — [audit-STORY-SPA-ID-02-execution-2026-06-28.md](../../../../../../analysis/audit-STORY-SPA-ID-02-execution-2026-06-28.md) §3 F1.

### Gap / Проблема
Post-audit behavior: `session_expired`/`backend_unavailable`/`network_error` перекрывают оверлеем публичные роуты для пользователей с токеном; CTA на board не снимает блокировку.

### AC/DoD
- [x] (P0) `session_expired` на public path (`/board`, `/issue/*`) — **не** показывать блокирующий оверлей; анонимный просмотр board сохраняется (FR-02.2).
- [x] (P0) `backend_unavailable` / `network_error` на public — route-aware bypass (см. [`task-completion.md`](./task-completion.md)).
- [x] (P0) Vitest: матрица `session_expired`/`backend_unavailable`/`network_error` × public/protected в [`sessionShellState.test.js`](../../../../../../../../src/auth/__tests__/sessionShellState.test.js).
- [x] (P1) `npx vitest run` — green (220 passed), без регрессий.

### Где менять код
- [`src/auth/sessionShellState.js`](../../../../../../../../src/auth/sessionShellState.js) — `shouldShowSessionShellOverlay`
- [`src/router/sessionRoutePolicy.js`](../../../../../../../../src/router/sessionRoutePolicy.js) — при необходимости `isPublicPath` в сигнатуре overlay
- [`src/layout/AppShellLayout.jsx`](../../../../../../../../src/layout/AppShellLayout.jsx) — передача `isPublicPath` в overlay policy
- [`src/auth/__tests__/sessionShellState.test.js`](../../../../../../../../src/auth/__tests__/sessionShellState.test.js)

### Out of scope
- Dev-preview shell через URL (audit F2 — waived). Новый pkg / смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml). ID-03 Civic Status.

### Проверка
```bash
cd spa-app
npx vitest run src/auth/__tests__/sessionShellState.test.js
npx vitest run
```
