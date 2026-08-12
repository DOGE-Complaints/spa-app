# SPA-DEPLOY-02-T02 — Railway toml start sync

**Status:** Done  
**Closed:** 2026-07-09T11:00:50Z
**Story:** [`../STORY-SPA-DEPLOY-02-static-production-serve.md`](../STORY-SPA-DEPLOY-02-static-production-serve.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) §Scope B  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-09T10:37:10Z

## Purpose
Закрыть Scope **B** (infra): синхронизировать Railway deploy contract с новым `npm start` (static serve).

## Risk
Deploy logs / operator docs могут ссылаться на vite preview, хотя start уже static serve.

## Code Facts (re-verify at execute)
- [`railway.toml:8-9`](../../../../../../../../railway.toml) — `startCommand = "npm start"`.
- [`task-spa-deploy-01-t01`](../../STORY-SPA-DEPLOY-01-railway-deployability/task-spa-deploy-01-t01-railway-monorepo-serve-config/README.md) — prior pattern: `railway.toml` + `package.json` SSOT.

## AC / DoD
- [x] (P0) `startCommand = "npm start"` остаётся валидным после T01.
- [x] (P0) [`railway.toml`](../../../../../../../../railway.toml) комментарий SSOT отражает static serve (не vite preview).
- [x] (P1) Traceability: story AC #1.

## Where to change
- [`spa-app/railway.toml`](../../../../../../../../railway.toml)

## Out of scope
- deploy-guide (T03). package.json start script (T01).

## Verification
```bash
cd spa-app && npm run build && PORT=4173 npm start
# Railway: Deploy logs show static serve (serve), not vite preview
```
