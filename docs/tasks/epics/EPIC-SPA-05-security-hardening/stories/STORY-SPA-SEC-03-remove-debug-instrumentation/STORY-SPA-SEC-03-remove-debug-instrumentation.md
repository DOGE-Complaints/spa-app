# STORY-SPA-SEC-03 — Удалить debug-инструментацию из `src/`

## Meta (pipeline)

- **Key:** `STORY-SPA-SEC-03-remove-debug-instrumentation`
- **Parent Epic:** [`../../EPIC-SPA-05-security-hardening.md`](../../EPIC-SPA-05-security-hardening.md)
- **Epic:** EPIC-SPA-05 Security hardening
- **Status:** Done
- **Severity:** 🔴 hygiene
- **Wave:** `pkg-000015`
- **source:** [`spa-app/docs/tasks/backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md)
- **Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md); [`identity-supabase-frontend-split-2026-06-16.md §6.6`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md)
- **Источник:** [`identity-supabase-frontend-split §6.6`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md)
- **Парная identity-стори:** — (spa-only)
- **ui_scope:** `none`

## Зачем простыми словами
В рабочих файлах приложения остались хардкод-вызовы дебаг-коллектора `fetch('http://127.0.0.1:7840/ingest/4e2a7ee6-…', {headers:{'X-Debug-Session-Id':'8e6df2'}})` от прошлой debug-сессии. Это не тесты — это инструментация прямо в коде приложения. В проде она шлёт телеметрию на мёртвый localhost-адрес (висящие запросы) и засоряет bundle/консоль. Цель — вычистить.

## Точки в коде (текущее состояние)
- [`src/auth/identityService.js:62`](../../../../../../../src/auth/identityService.js) — `…/ingest/…` в `identityFetch:catch`.
- [`src/pages/LoginPage.jsx:59,63,67,105`](../../../../../../../src/pages/LoginPage.jsx) — `…/ingest/…` в `completeAuthSuccess` и `handleSignup`.
- [`src/auth/supabaseClient.js`](../../../../../../../src/auth/supabaseClient.js) — `…/ingest/…` в init.
- Маркеры: `127.0.0.1:7840/ingest/4e2a7ee6-51b0-4717-9335-1e042186fc23`, `X-Debug-Session-Id: 8e6df2`.

## Scope
- Удалить все блоки `fetch('http://127.0.0.1:7840/ingest/…')` из `src/`.
- Guard: lint/CI-проверка «нет `ingest/4e2a7ee6` / `X-Debug-Session-Id` в `src/`».
- Если нужна постоянная телеметрия — завести её отдельно за флагом/конфигом (не хардкод localhost), но это **вне scope** этой чистки.

## Вне scope
- Логика самих хендлеров (login/signup/fetchMe) — не менять, только убрать debug-вызовы.

## Acceptance Criteria
- [x] `grep -r "ingest/4e2a7ee6\|X-Debug-Session-Id" src/` → пусто.
- [x] Поведение login/signup/`fetchMe` не изменилось (тесты зелёные).
- [x] CI/lint ловит повторное появление debug-ingest.

## Парадигма-якорь
[`split-doc §6.6`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md).

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-sec-03-t01-purge-debug-ingest-auth-layer`](./task-spa-sec-03-t01-purge-debug-ingest-auth-layer/README.md) | pkg-000015 |
| 2 | [`task-spa-sec-03-t02-debug-ingest-guard-test`](./task-spa-sec-03-t02-debug-ingest-guard-test/README.md) | pkg-000015 |
| 3 | [`task-spa-sec-03-t03-auth-regression-after-debug-purge`](./task-spa-sec-03-t03-auth-regression-after-debug-purge/README.md) | pkg-000015 |
| 4 | [`task-spa-sec-03-t04-story-gate-sec-03`](./task-spa-sec-03-t04-story-gate-sec-03/README.md) | pkg-000015 |
