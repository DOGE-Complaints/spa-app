# SPA-DEPLOY-02-T05 — Railway live smoke static serve

**Status:** Done  
**Closed:** 2026-07-09T11:00:50Z
**Story:** [`../STORY-SPA-DEPLOY-02-static-production-serve.md`](../STORY-SPA-DEPLOY-02-static-production-serve.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) §Scope D  
**Depends on:** T01, T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-09T10:37:10Z

## Purpose
Закрыть Scope **D**: выровнять `verify:railway-live-smoke.mjs` под static serve; green на production URL.

## Risk
Устаревший assert на `preview.allowedHosts` даёт false guidance или ложные fails после миграции.

## Code Facts (re-verify at execute)
- [`verify-railway-live-smoke.mjs:29-32`](../../../../../../../../scripts/verify-railway-live-smoke.mjs) — detect `Blocked request` + `preview.allowedHosts` (vite preview specific).
- [`package.json:16`](../../../../../../../../package.json) — `"verify:railway:live"`.

## AC / DoD
- [x] (P0) Scope D: `npm run verify:railway:live` green на `SPA_BASE_URL=https://spa-app-tallinn-demo.up.railway.app` (post-deploy).
- [x] (P0) Smoke не содержит misleading vite-only failure message как единственный prod path (обновить assert при необходимости).
- [x] (P1) Traceability: story AC #2, AC #3 (static serve — no Host whitelist; custom domain by-design if no custom domain assigned).

## Where to change
- [`spa-app/scripts/verify-railway-live-smoke.mjs`](../../../../../../../../scripts/verify-railway-live-smoke.mjs)

## Out of scope
- New smoke scripts. CORS preflight (DEPLOY-01).

## Verification
```bash
ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
SPA_BASE_URL=https://spa-app-tallinn-demo.up.railway.app npm run verify:railway:live
```
