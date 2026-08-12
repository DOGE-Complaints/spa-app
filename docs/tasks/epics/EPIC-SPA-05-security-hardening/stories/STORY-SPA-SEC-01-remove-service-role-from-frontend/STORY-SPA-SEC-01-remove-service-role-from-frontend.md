# STORY-SPA-SEC-01 — Убрать `service_role` из фронт-env/bundle (anon-only)

## Meta (pipeline)

- **Key:** `STORY-SPA-SEC-01-remove-service-role-from-frontend`
- **Parent Epic:** [`../../EPIC-SPA-05-security-hardening.md`](../../EPIC-SPA-05-security-hardening.md)
- **Epic:** EPIC-SPA-05 Security hardening
- **Status:** Done
- **Severity:** 🔴 **CRITICAL**
- **Wave:** `pkg-000014`
- **source:** [`spa-app/docs/tasks/backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md)
- **Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md); [`identity-supabase-frontend-split-2026-06-16.md §6.1`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md); [`04-env-configuration.md`](../../../../../../../requirements/04-env-configuration.md)
- **Источник:** [`identity-supabase-frontend-split §6.1`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md)
- **Парная identity-стори:** [SEC-04 service_role isolation](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md)
- **ui_scope:** `none`

## Зачем простыми словами
В `spa-app/.env:24` лежит **реальный `VITE_SUPABASE_SERVICE_ROLE`** — это ключ роли `service_role` Supabase, который **обходит RLS** и даёт полный доступ ко всем данным проекта. Любая `VITE_*`-переменная **встраивается Vite в браузерный bundle** — то есть этот секрет уезжает к каждому пользователю в JS. Фронту он **не нужен вообще**: для логина достаточно `anon`-ключа (он публичный и защищён RLS). Цель — убрать привилегированный ключ из фронта полностью.

## Точки в коде (текущее состояние)
- 🔴 `VITE_SUPABASE_SERVICE_ROLE=eyJ…service_role…` — [`spa-app/.env:24`](../../../../../../../.env) (декодируется как `"role":"service_role"`).
- ✅ `.env` **в `.gitignore`** ([`spa-app/.gitignore:5-6`](../../../../../../../.gitignore)) → в git-историю **не** попал; риск — bundle (если собирался) + сам факт хранения в фронт-env.
- `.env.example` корректен — только `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (нет service_role), [`.env.example:67-68`](../../../../../../../.env.example).
- Клиент создаётся на **anon**-ключе: [`supabaseClient.js`](../../../../../../../src/auth/supabaseClient.js) (`createClient(URL, ANON_KEY)`); service_role в `src/` **не** используется (grep чисто).

## Scope
- Удалить `VITE_SUPABASE_SERVICE_ROLE` из `spa-app/.env` (и любых `.env.*`), оставить только `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
- Добавить guard от повторного появления: lint/CI-проверка «нет `SERVICE_ROLE` в `VITE_*`», запись в `.env.example` с явным предупреждением «service_role — НИКОГДА на фронте».
- **Ротация:** если bundle с этой переменной собирался/деплоился — ротировать `service_role` в Supabase Dashboard (и обновить identity-backend `SUPABASE_SERVICE_ROLE`, см. SEC-04). Если только локально и не билдился — ротация по решению, но рекомендуется.

## Вне scope
- Хранение/использование service_role на бэкенде — это identity ([SEC-04](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md)).
- Вопрос «держать ли в браузере anon-ключ вообще» — отдельно ([SPA-SEC-02](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-02-supabase-credential-boundary.md)).

## Acceptance Criteria
- [x] `grep SERVICE_ROLE` по `spa-app/.env*` → пусто (секреты; `.env.example` — только `#` комментарии); в браузерном bundle нет service_role.
- [x] CI/lint падает, если `VITE_*SERVICE_ROLE*` снова появится.
- [x] `.env.example` содержит предупреждение про service_role.
- [x] Принято решение по ротации (и выполнено, если был билд) — синхронизировано с identity [SEC-04](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md).

## Парадигма-якорь
[`split-doc §6.1, §10`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md); spa env-spec [`04-env-configuration.md`](../../../../../../../requirements/04-env-configuration.md).

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-sec-01-t01-purge-service-role-from-env`](./task-spa-sec-01-t01-purge-service-role-from-env/README.md) | pkg-000014 |
| 2 | [`task-spa-sec-01-t02-env-example-never-on-frontend-warning`](./task-spa-sec-01-t02-env-example-never-on-frontend-warning/README.md) | pkg-000014 |
| 3 | [`task-spa-sec-01-t03-vite-service-role-guard-test`](./task-spa-sec-01-t03-vite-service-role-guard-test/README.md) | pkg-000014 |
| 4 | [`task-spa-sec-01-t04-bundle-no-service-role-verification`](./task-spa-sec-01-t04-bundle-no-service-role-verification/README.md) | pkg-000014 |
| 5 | [`task-spa-sec-01-t05-rotation-decision-sec04-sync`](./task-spa-sec-01-t05-rotation-decision-sec04-sync/README.md) | pkg-000014 |
| 6 | [`task-spa-sec-01-t06-story-gate-sec-01`](./task-spa-sec-01-t06-story-gate-sec-01/README.md) | pkg-000014 |
| 7 | [`task-spa-sec-01-t07-local-env-service-role-guard`](./task-spa-sec-01-t07-local-env-service-role-guard/README.md) | `run_mode=spa_sec_01_audit_2026_06_27` (Done) |
| 8 | [`task-spa-sec-01-t08-bundle-service-role-verify-script`](./task-spa-sec-01-t08-bundle-service-role-verify-script/README.md) | `run_mode=spa_sec_01_audit_2026_06_27` (Done) |
