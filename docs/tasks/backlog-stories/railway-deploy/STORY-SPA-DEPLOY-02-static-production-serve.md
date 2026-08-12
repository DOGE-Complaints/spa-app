# STORY-SPA-DEPLOY-02 — Static production serve (замена vite preview)

## Meta
- **Key:** `STORY-SPA-DEPLOY-02-static-production-serve`
- **Пакет:** `railway-deploy/`
- **Epic:** [EPIC-SPA-06](../epics/EPIC-SPA-06-railway-deploy/EPIC-SPA-06-railway-deploy.md)
- **Status:** ✅ Done ([pipeline](../epics/EPIC-SPA-06-railway-deploy/stories/STORY-SPA-DEPLOY-02-static-production-serve/STORY-SPA-DEPLOY-02-static-production-serve.md) · pkg-000028 · 2026-07-09)
- **Severity:** 🟡 P2 / tech-debt
- **Источник:** production incident 2026-07-08 — `vite preview` блокировал Railway Host; hotfix `preview.allowedHosts` в [`vite.config.js`](../../../../vite.config.js) (commit `fd8f2b4`); follow-up к [DEPLOY-01 Scope B](STORY-SPA-DEPLOY-01-railway-deployability.md) («при желании позже — статик-хостинг `dist/`»).

## Зачем простыми словами
Сейчас Railway запускает **`vite preview`** как production-сервер ([`package.json`](../../../../package.json) `"start"`). Это dev-инструмент для локальной проверки бандла: он проверяет `Host`-заголовок и требует `preview.allowedHosts`. Hotfix с `.up.railway.app` работает, но при кастомном домене снова понадобится правка конфига. Правильный prod-паттерн для статического SPA — отдавать `dist/` через лёгкий static file server.

## Текущее состояние (verified)
- `npm run build` → `dist/` ([`package.json`](../../../../package.json)).
- `npm start` → `vite preview --host 0.0.0.0 --port ${PORT:-4173}` — production на Railway.
- `preview.allowedHosts` в [`vite.config.js`](../../../../vite.config.js): `.up.railway.app`, `.railway.app`, localhost.
- Роутинг: `HashRouter` ([`main.jsx`](../../../../src/main.jsx)) — не нужен сложный history fallback; достаточно `index.html` + assets.
- Smoke: `npm run verify:railway:live` — green на `https://spa-app-tallinn-demo.up.railway.app` после hotfix (2026-07-08).

## Scope (что должно стать истинным)
- **A. Start-команда:** заменить `vite preview` на static serve `dist/` (кандидаты: [`serve`](https://www.npmjs.com/package/serve) `-s dist -l $PORT` или `sirv-cli` с SPA fallback).
- **B. Конфиг:** обновить [`railway.toml`](../../../../railway.toml), [`package.json`](../../../../package.json), [`deploy-guide.md`](../../../deploy-guide.md), [`railway-git-deploy-manual.md`](../../../railway-git-deploy-manual.md).
- **C. Vite config:** убрать prod-зависимость от `preview.allowedHosts`; оставить `preview` только для локального `npm run preview`.
- **D. Smoke:** `verify:railway:live` остаётся green; при необходимости — доп. assert «не vite preview blocked host».

## Вне scope
- CDN / Railway static asset hosting (отдельное решение).
- CORS identity (остаётся AC #4 [DEPLOY-01](STORY-SPA-DEPLOY-01-railway-deployability.md)).
- Смена `HashRouter` → `BrowserRouter`.

## Acceptance Criteria
- [ ] `npm start` на Railway отдаёт `dist/` без `vite preview`.
- [ ] `npm run verify:railway:live` green на production URL.
- [ ] Custom domain (если назначен) работает без правок `allowedHosts`.
- [ ] `npm run preview` по-прежнему доступен локально для ручной проверки бандла.
- [ ] Документация deploy-guide отражает новый serve-контракт.

## Швы
- [`package.json`](../../../../package.json) scripts, [`railway.toml`](../../../../railway.toml), [`vite.config.js`](../../../../vite.config.js), [`scripts/verify-railway-live-smoke.mjs`](../../../../scripts/verify-railway-live-smoke.mjs).

## Зависимости
- [STORY-SPA-DEPLOY-01](STORY-SPA-DEPLOY-01-railway-deployability.md) — Done (build + env bake).

## Оценка hotfix allowedHosts (контекст)
| Слой | Оценка | Комментарий |
|------|--------|-------------|
| `preview.allowedHosts` | 6/10 | Корректный Vite-конфиг для reverse proxy; не костыль при текущей архитектуре |
| `vite preview` в prod | 3/10 | Архитектурный компромисс DEPLOY-01; эта стори — элегантное закрытие |
