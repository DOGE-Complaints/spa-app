# STORY-SPA-DEPLOY-01 — Deployability на railway.com (spa-app)

## Meta
- **Key:** `STORY-SPA-DEPLOY-01-railway-deployability`
- **Пакет:** `railway-deploy/`
- **Status:** ✅ Done ([pipeline](../epics/EPIC-SPA-06-railway-deploy/stories/STORY-SPA-DEPLOY-01-railway-deployability/STORY-SPA-DEPLOY-01-railway-deployability.md) · pkg-000027 · 2026-07-06)
- **Severity:** 🟠 MED (spa вообще ещё не выгружен на railway)
- **Источник:** [`mvp-integration-plan-2026-07-02.md` M-2](../../../../../doge-identity-service/docs/analysis/mvp-integration-plan-2026-07-02.md)

## Зачем простыми словами
spa на railway ещё не деплоился, и `.env` смотрит на **localhost** бэкендов: `VITE_GATEWAY_BASE_URL=http://127.0.0.1:8000`, `VITE_IDENTITY_SERVICE_URL=http://127.0.0.1:8100` ([`.env:20,26`](../../../../.env)). Браузер постороннего юзера до `127.0.0.1` не достучится. Vite «запекает» `VITE_*` переменные **на этапе build**, поэтому публичные URL надо задать при сборке на railway.

## Текущее состояние (verified)
- `start`-скрипт railway-совместим: `vite preview --host 0.0.0.0 --port ${PORT:-4173}` ([`package.json` scripts](../../../../package.json)).
- `build`: `vite build` → `dist/`.
- Deploy-конфиг: [`railway.toml`](../../../../railway.toml) (`npm run build` / `npm start`).
- [`/.env.example`](../../../../.env.example) — `VITE_STORY_GPT_URL`, gateway/identity URLs; локальный `.env` может оставаться на localhost.
- Post-deploy smoke: `npm run verify:railway:live` + `npm run verify:cors:preflight` ([`railway-git-deploy-manual.md`](../../../railway-git-deploy-manual.md)).
- Production backends (Tallinn demo): gateway `https://dogestonia-tallinn.up.railway.app`, identity `https://doge-identity-service-tallinn-demo.up.railway.app`.

## Scope (что должно стать истинным)
- **A. Build с публичными URL:** на railway задать при сборке `VITE_GATEWAY_BASE_URL`, `VITE_IDENTITY_SERVICE_URL` = публичные railway-URL бэкендов; `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` — как есть (Cloud). Vite запекает их в бандл на `vite build`.
- **B. Serve:** запускать `npm run start` (`vite preview --host 0.0.0.0 --port $PORT`) как start-команду railway. (Для MVP-демо приемлемо; при желании позже — статик-хостинг `dist/`.)
- **C. Новая env-переменная `VITE_STORY_GPT_URL`** — ссылка на наш Custom GPT. Веб-кнопка «создать историю» ведёт на неё (M-3: создание истории из веба = редирект в GPT). Задать в railway build-vars и в локальном `.env.example`.
- **D. Не сломать публичность (M-5):** доска/деталь issue остаются публичными; `PUBLIC_PATHS` не трогаем.
- **E. Guard остаётся зелёным:** `verify:bundle:no-service-role` — service_role не попадает в бандл ([`package.json`](../../../../package.json)).

## Acceptance Criteria
- [x] Деплой на railway поднимается; доска issues открывается по публичному URL без логина (M-5). *Smoke: `npm run verify:railway:live`; production `SPA_BASE_URL=https://<spa>.railway.app`.*
- [x] `VITE_GATEWAY_BASE_URL`/`VITE_IDENTITY_SERVICE_URL` в бандле = публичные railway-URL (не localhost). Проверяемо в собранном `dist/`.
- [x] `VITE_STORY_GPT_URL` присутствует; веб-кнопка «создать историю» ведёт на Custom GPT.
- [ ] Запросы из браузера к gateway/identity проходят (CORS). *Tooling: `npm run verify:cors:preflight`. Gateway ✅; identity 502 на Tallinn demo — operator: восстановить identity + `CORS_ALLOWED_ORIGINS` = spa origin.*
- [x] `npm run verify:bundle:no-service-role` зелёный.

## Швы
- [`.env:13,20,23,26-27`](../../../../.env), [`package.json` scripts](../../../../package.json), [`sessionRoutePolicy.js`](../../../src/router/sessionRoutePolicy.js) (public paths — не трогать).

## Зависимости
- CORS на gateway/identity — [GW-DEPLOY-01](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/railway-deploy/STORY-GW-DEPLOY-01-railway-deployability.md), [IDS-DEPLOY-01](../../../../../doge-identity-service/docs/tasks/backlog-stories/railway-deploy/STORY-IDS-DEPLOY-01-railway-deployability.md).
