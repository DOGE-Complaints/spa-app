# SPA-DEPLOY-02-T04 — Vite preview config cleanup

**Status:** Done  
**Closed:** 2026-07-09T11:00:50Z
**Story:** [`../STORY-SPA-DEPLOY-02-static-production-serve.md`](../STORY-SPA-DEPLOY-02-static-production-serve.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) §Scope C  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-09T10:37:10Z

## Purpose
Закрыть Scope **C**: убрать prod-зависимость от `preview.allowedHosts`; оставить `npm run preview` для локальной проверки бандла.

## Risk
Оставить `allowedHosts` как prod-зависимость — ложное ощущение, что Railway всё ещё на vite preview.

## Code Facts (re-verify at execute)
- [`vite.config.js:7-13`](../../../../../../../../vite.config.js) — `preview.allowedHosts: ['.up.railway.app', '.railway.app', 'localhost', '127.0.0.1']`.
- [`package.json:9`](../../../../../../../../package.json) — `"preview": "vite preview"`.

## AC / DoD
- [x] (P0) Scope C: `preview.allowedHosts` не требуется для Railway prod (static serve via T01).
- [x] (P0) `npm run preview` работает локально после изменений.
- [x] (P1) Traceability: story AC #4.

## Where to change
- [`spa-app/vite.config.js`](../../../../../../../../vite.config.js)

## Out of scope
- `npm start` script (T01). Smoke script (T05).

## Verification
```bash
cd spa-app && npm run build && npm run preview
# curl http://127.0.0.1:4173/ — local preview only
```
