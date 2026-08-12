# SPA-DEPLOY-01-T01 — Railway monorepo serve config

**Status:** Done  
**Closed:** 2026-07-06T13:53:57Z  

**Story:** [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) §Scope B  
**Depends on:** — (first task in wave)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-06T13:39:53Z

## Purpose
Закрыть Scope **B**: зафиксировать railway serve-контракт для monorepo (`Root Directory = spa-app`), build=`npm run build`, start=`npm start` (`vite preview --host 0.0.0.0 --port $PORT`).

## Risk
Без явного monorepo root Railway может собрать из корня репо и не найти `package.json` spa-app.

## Code Facts (re-verify at execute)
- [`package.json:8-10`](../../../../../../../../package.json) — `"build": "vite build"`, `"start": "vite preview --host 0.0.0.0 --port ${PORT:-4173}"`.
- Нет `railway.toml` / `railway.json` / `nixpacks.toml` в `spa-app/` (grep at scaffold).
- [`deploy-guide.md §3`](../../../../../../../docs/deploy-guide.md) — частично описывает Railway, без monorepo `railway.toml`.

## AC / DoD
- [x] (P0) Scope B: `railway.toml` (или эквивалент) в `spa-app/` с build/start, совместимым с [`package.json`](../../../../../../../../package.json).
- [x] (P0) [`deploy-guide.md`](../../../../../../../docs/deploy-guide.md) §3 синхронизирован: Root Directory `spa-app`, build/start команды.
- [x] (P1) Локальный smoke: `npm run build && PORT=4173 npm start` — preview слушает `0.0.0.0`.
- [x] Traceability: story AC #1 (деплой поднимается) — подготовка serve-контракта.

## Where to change
- [`spa-app/railway.toml`](../../../../../../../../railway.toml) (new)
- [`spa-app/docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md)

## Out of scope
- Env vars (T02). Dist bake verify (T03). GPT URL tests (T04). PUBLIC_PATHS (T05).

## Verification
```bash
cd spa-app && npm run build && PORT=4173 npm start
# Railway: Settings → Root Directory = spa-app; Deploy logs show vite preview on $PORT
```
