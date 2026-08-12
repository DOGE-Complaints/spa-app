# SPA-DEPLOY-02-T03 — Deploy docs serve contract

**Status:** Done  
**Closed:** 2026-07-09T11:00:50Z
**Story:** [`../STORY-SPA-DEPLOY-02-static-production-serve.md`](../STORY-SPA-DEPLOY-02-static-production-serve.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) §Scope B  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-09T10:37:10Z

## Purpose
Закрыть Scope **B** (docs): `deploy-guide.md` + `railway-git-deploy-manual.md` отражают static serve вместо vite preview как production SSOT.

## Risk
Operator следует устаревшим инструкциям (vite preview + allowedHosts) после миграции на static serve.

## Code Facts (re-verify at execute)
- [`deploy-guide.md`](../../../../../../../docs/deploy-guide.md) §3 / troubleshooting — сейчас `vite preview` + `preview.allowedHosts` как prod workaround.
- [`railway-git-deploy-manual.md`](../../../../../../../docs/railway-git-deploy-manual.md) Start row — `vite preview --host 0.0.0.0 --port $PORT`.

## AC / DoD
- [x] (P0) [`deploy-guide.md`](../../../../../../../docs/deploy-guide.md) обновлён: prod = static serve `dist/`, `npm run preview` = local only.
- [x] (P0) [`railway-git-deploy-manual.md`](../../../../../../../docs/railway-git-deploy-manual.md) Start row синхронизирован.
- [x] (P1) Traceability: story AC #5 (deploy-guide отражает новый serve-контракт).

## Where to change
- [`spa-app/docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md)
- [`spa-app/docs/railway-git-deploy-manual.md`](../../../../../../../docs/railway-git-deploy-manual.md)

## Out of scope
- `04-env-configuration.md`. CORS identity (DEPLOY-01 AC #4).

## Verification
```bash
rg -n "vite preview|static serve|npm start" spa-app/docs/deploy-guide.md spa-app/docs/railway-git-deploy-manual.md
```
