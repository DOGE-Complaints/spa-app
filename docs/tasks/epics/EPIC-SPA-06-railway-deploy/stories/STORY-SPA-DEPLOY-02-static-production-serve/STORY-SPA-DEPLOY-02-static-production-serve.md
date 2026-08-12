# STORY-SPA-DEPLOY-02 — Static production serve (замена vite preview)

## Meta (pipeline)

- **Key:** `STORY-SPA-DEPLOY-02-static-production-serve`
- **Parent Epic:** [`../../EPIC-SPA-06-railway-deploy.md`](../../EPIC-SPA-06-railway-deploy.md)
- **Epic:** EPIC-SPA-06 Railway deploy
- **Пакет:** `railway-deploy/`
- **Status:** Done
- **Closed:** 2026-07-09T11:00:50Z
- **Severity:** 🟡 P2 / tech-debt
- **Wave:** `pkg-000028`
- **source:** [`spa-app/docs/tasks/backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md)
- **decision_ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md); production incident 2026-07-08 — `vite preview` блокировал Railway Host; hotfix `preview.allowedHosts` в [`vite.config.js`](../../../../../../../vite.config.js) (commit `fd8f2b4`); follow-up к [DEPLOY-01 Scope B](STORY-SPA-DEPLOY-01-railway-deployability.md) («при желании позже — статик-хостинг `dist/`»).
- **Источник:** production incident 2026-07-08 — `vite preview` блокировал Railway Host; hotfix `preview.allowedHosts` в [`vite.config.js`](../../../../../../../vite.config.js) (commit `fd8f2b4`); follow-up к [DEPLOY-01 Scope B](STORY-SPA-DEPLOY-01-railway-deployability.md) («при желании позже — статик-хостинг `dist/`»).
- **ui_scope:** `none`

## Зачем простыми словами
Сейчас Railway запускает **`vite preview`** как production-сервер ([`package.json`](../../../../../../../package.json) `"start"`). Это dev-инструмент для локальной проверки бандла: он проверяет `Host`-заголовок и требует `preview.allowedHosts`. Hotfix с `.up.railway.app` работает, но при кастомном домене снова понадобится правка конфига. Правильный prod-паттерн для статического SPA — отдавать `dist/` через лёгкий static file server.

## Текущее состояние (verified)
- `npm run build` → `dist/` ([`package.json`](../../../../../../../package.json)).
- `npm start` → `vite preview --host 0.0.0.0 --port ${PORT:-4173}` — production на Railway.
- `preview.allowedHosts` в [`vite.config.js`](../../../../../../../vite.config.js): `.up.railway.app`, `.railway.app`, localhost.
- Роутинг: `HashRouter` ([`main.jsx`](../../../../../../../src/main.jsx)) — не нужен сложный history fallback; достаточно `index.html` + assets.
- Smoke: `npm run verify:railway:live` — green на `https://spa-app-tallinn-demo.up.railway.app` после hotfix (2026-07-08).

## Scope (что должно стать истинным)
- **A. Start-команда:** заменить `vite preview` на static serve `dist/` (кандидаты: [`serve`](https://www.npmjs.com/package/serve) `-s dist -l $PORT` или `sirv-cli` с SPA fallback).
- **B. Конфиг:** обновить [`railway.toml`](../../../../../../../railway.toml), [`package.json`](../../../../../../../package.json), [`deploy-guide.md`](../../../../../../deploy-guide.md), [`railway-git-deploy-manual.md`](../../../../../../railway-git-deploy-manual.md).
- **C. Vite config:** убрать prod-зависимость от `preview.allowedHosts`; оставить `preview` только для локального `npm run preview`.
- **D. Smoke:** `verify:railway:live` остаётся green; при необходимости — доп. assert «не vite preview blocked host».

## Вне scope
- CDN / Railway static asset hosting (отдельное решение).
- CORS identity (остаётся AC #4 [DEPLOY-01](STORY-SPA-DEPLOY-01-railway-deployability.md)).
- Смена `HashRouter` → `BrowserRouter`.

## Acceptance Criteria
- [x] `npm start` на Railway отдаёт `dist/` без `vite preview`.
- [x] `npm run verify:railway:live` green на production URL.
- [x] Custom domain (если назначен) работает без правок `allowedHosts`.
- [x] `npm run preview` по-прежнему доступен локально для ручной проверки бандла.
- [x] Документация deploy-guide отражает новый serve-контракт.

## Швы
- [`package.json`](../../../../../../../package.json) scripts, [`railway.toml`](../../../../../../../railway.toml), [`vite.config.js`](../../../../../../../vite.config.js), [`scripts/verify-railway-live-smoke.mjs`](../../../../../../../scripts/verify-railway-live-smoke.mjs).

## Зависимости
- [STORY-SPA-DEPLOY-01](STORY-SPA-DEPLOY-01-railway-deployability.md) — Done (build + env bake).

## Оценка hotfix allowedHosts (контекст)
| Слой | Оценка | Комментарий |
|------|--------|-------------|
| `preview.allowedHosts` | 6/10 | Корректный Vite-конфиг для reverse proxy; не костыль при текущей архитектуре |
| `vite preview` в prod | 3/10 | Архитектурный компромисс DEPLOY-01; эта стори — элегантное закрытие |

## Nested tasks

| Order | Task folder | Wave |
|-------|-------------|------|
| 1 | [`task-spa-deploy-02-t01-static-serve-start-script`](./task-spa-deploy-02-t01-static-serve-start-script/README.md) | pkg-000028 |
| 2 | [`task-spa-deploy-02-t02-railway-toml-start-sync`](./task-spa-deploy-02-t02-railway-toml-start-sync/README.md) | pkg-000028 |
| 3 | [`task-spa-deploy-02-t03-deploy-docs-serve-contract`](./task-spa-deploy-02-t03-deploy-docs-serve-contract/README.md) | pkg-000028 |
| 4 | [`task-spa-deploy-02-t04-vite-preview-config-cleanup`](./task-spa-deploy-02-t04-vite-preview-config-cleanup/README.md) | pkg-000028 |
| 5 | [`task-spa-deploy-02-t05-railway-live-smoke-static-serve`](./task-spa-deploy-02-t05-railway-live-smoke-static-serve/README.md) | pkg-000028 |
| 6 | [`task-spa-deploy-02-t06-story-gate-deploy-02`](./task-spa-deploy-02-t06-story-gate-deploy-02/README.md) | pkg-000028 |
| 7 | [`task-spa-deploy-02-t07-pin-serve-exact-version`](./task-spa-deploy-02-t07-pin-serve-exact-version/README.md) | `run_mode=spa_deploy_02_audit_2026_07_09` |
