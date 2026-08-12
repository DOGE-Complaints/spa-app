# SPA-DEPLOY-01-T03 — Verify dist env bake (no localhost)

**Status:** Done  
**Closed:** 2026-07-06T13:53:57Z  

**Story:** [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) — AC #2  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-06T13:39:53Z

## Purpose
Закрыть AC **#2**: автоматизировать проверку, что после `vite build` с публичными railway URL в `dist/assets/*.js` **нет** `127.0.0.1:8000` / `127.0.0.1:8100` (и опц. `localhost:8000`/`8100`).

## Risk
Ручная проверка dist пропускается → production bundle с localhost URLs.

## Code Facts (re-verify at execute)
- Vite inlines `import.meta.env.VITE_*` at build — [`deploy-guide.md`](../../../../../../../docs/deploy-guide.md) §«Переменные окружения».
- Существующий паттерн guard: [`scripts/verify-bundle-no-service-role.mjs`](../../../../../../../../scripts/verify-bundle-no-service-role.mjs).
- На scaffold **нет** `verify:build:env-bake` в [`package.json`](../../../../../../../../package.json).

## AC / DoD
- [x] (P0) AC #2: `scripts/verify-build-env-bake.mjs` — scan `dist/assets/*.js` for forbidden localhost gateway/identity patterns when public URLs passed at build.
- [x] (P0) `npm run verify:build:env-bake` в [`package.json`](../../../../../../../../package.json) (rebuild + verify).
- [x] (P1) Документировать пример в `deploy-guide.md` / task Verification.
- [x] (P1) `npm run verify:build:env-bake` green с тестовыми `VITE_*=https://…` URLs.

## Where to change
- [`spa-app/scripts/verify-build-env-bake.mjs`](../../../../../../../../scripts/verify-build-env-bake.mjs) (new)
- [`spa-app/package.json`](../../../../../../../../package.json)

## Out of scope
- Live railway deploy (T06 gate). CORS (AC #4 cross-system).

## Verification
```bash
cd spa-app
VITE_LIFE_REALITY_MODE=GFL-DRIVEN \
VITE_GATEWAY_BASE_URL=https://gateway.example.railway.app \
VITE_IDENTITY_SERVICE_URL=https://identity.example.railway.app \
npm run verify:build:env-bake
```
