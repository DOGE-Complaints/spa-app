# STORY-SPA-SEC-01 — Убрать `service_role` из фронт-env/bundle (anon-only)

## Meta
- **Key:** `STORY-SPA-SEC-01-remove-service-role-from-frontend`
- **Epic:** [`EPIC-SPA-SEC`](EPIC-SPA-SEC.md)
- **Status:** ✅ Done — [pipeline](../epics/EPIC-SPA-05-security-hardening/stories/STORY-SPA-SEC-01-remove-service-role-from-frontend/STORY-SPA-SEC-01-remove-service-role-from-frontend.md) (pkg-000014, 2026-06-27)
- **Severity:** 🔴 **CRITICAL**
- **Источник:** [`identity-supabase-frontend-split §6.1`](../../../analysis/identity-supabase-frontend-split-2026-06-16.md)
- **Парная identity-стори:** [SEC-04 service_role isolation](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md)

## Зачем простыми словами
В `spa-app/.env:24` лежит **реальный `VITE_SUPABASE_SERVICE_ROLE`** — это ключ роли `service_role` Supabase, который **обходит RLS** и даёт полный доступ ко всем данным проекта. Любая `VITE_*`-переменная **встраивается Vite в браузерный bundle** — то есть этот секрет уезжает к каждому пользователю в JS. Фронту он **не нужен вообще**: для логина достаточно `anon`-ключа (он публичный и защищён RLS). Цель — убрать привилегированный ключ из фронта полностью.

## Точки в коде (текущее состояние)
- 🔴 `VITE_SUPABASE_SERVICE_ROLE=eyJ…service_role…` — [`spa-app/.env:24`](../../../../.env) (декодируется как `"role":"service_role"`).
- ✅ `.env` **в `.gitignore`** ([`spa-app/.gitignore:5-6`](../../../../.gitignore)) → в git-историю **не** попал; риск — bundle (если собирался) + сам факт хранения в фронт-env.
- `.env.example` корректен — только `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (нет service_role), [`.env.example:67-68`](../../../../.env.example).
- Клиент создаётся на **anon**-ключе: [`supabaseClient.js`](../../../../src/auth/supabaseClient.js) (`createClient(URL, ANON_KEY)`); service_role в `src/` **не** используется (grep чисто).

## Scope
- Удалить `VITE_SUPABASE_SERVICE_ROLE` из `spa-app/.env` (и любых `.env.*`), оставить только `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
- Добавить guard от повторного появления: lint/CI-проверка «нет `SERVICE_ROLE` в `VITE_*`», запись в `.env.example` с явным предупреждением «service_role — НИКОГДА на фронте».
- **Ротация:** если bundle с этой переменной собирался/деплоился — ротировать `service_role` в Supabase Dashboard (и обновить identity-backend `SUPABASE_SERVICE_ROLE`, см. SEC-04). Если только локально и не билдился — ротация по решению, но рекомендуется.

## Вне scope
- Хранение/использование service_role на бэкенде — это identity ([SEC-04](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md)).
- Вопрос «держать ли в браузере anon-ключ вообще» — отдельно ([SPA-SEC-02](STORY-SPA-SEC-02-supabase-credential-boundary.md)).

## Acceptance Criteria
- [ ] `grep SERVICE_ROLE` по `spa-app/.env*` → пусто; в браузерном bundle нет service_role.
- [ ] CI/lint падает, если `VITE_*SERVICE_ROLE*` снова появится.
- [ ] `.env.example` содержит предупреждение про service_role.
- [ ] Принято решение по ротации (и выполнено, если был билд) — синхронизировано с identity [SEC-04](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md).

## Парадигма-якорь
[`split-doc §6.1, §10`](../../../analysis/identity-supabase-frontend-split-2026-06-16.md); spa env-spec [`04-env-configuration.md`](../../../requirements/04-env-configuration.md).
