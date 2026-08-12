# SPA-DEPLOY-02-T06 — Story gate DEPLOY-02

**Status:** Done  
**Closed:** 2026-07-09T11:00:50Z
**Story:** [`../STORY-SPA-DEPLOY-02-static-production-serve.md`](../STORY-SPA-DEPLOY-02-static-production-serve.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) — all AC  
**Depends on:** T01..T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-09T10:37:10Z

## Purpose
Story acceptance gate: rollup всех 5 AC backlog DEPLOY-02; live verify static serve on Railway.

## Risk
Закрытие story без prod smoke → false Done для serve migration.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: [STORY-SPA-DEPLOY-01](../STORY-SPA-DEPLOY-01-railway-deployability/STORY-SPA-DEPLOY-01-railway-deployability.md) Done.

## AC / DoD
- [x] (P0) AC #1: `npm start` на Railway отдаёт `dist/` без `vite preview`.
- [x] (P0) AC #2: `npm run verify:railway:live` green на production URL.
- [x] (P0) AC #3: Custom domain (если назначен) работает без правок `allowedHosts`; иначе waived with static-serve evidence.
- [x] (P0) AC #4: `npm run preview` локально доступен.
- [x] (P0) AC #5: deploy-guide отражает новый serve-контракт.
- [x] (P0) [`acceptance-verification-spa-deploy-02.md`](./acceptance-verification-spa-deploy-02.md) PASS с live `Date:` post verify.
- [x] (P1) Sync `bullrun-launch-index.md` + backlog INDEX → story Done.

## Where to change
- [`acceptance-verification-spa-deploy-02.md`](./acceptance-verification-spa-deploy-02.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

## Out of scope
- CDN static hosting. CORS identity.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run
cd spa-app && npm run build && PORT=4173 npm start
SPA_BASE_URL=https://spa-app-tallinn-demo.up.railway.app npm run verify:railway:live
```
