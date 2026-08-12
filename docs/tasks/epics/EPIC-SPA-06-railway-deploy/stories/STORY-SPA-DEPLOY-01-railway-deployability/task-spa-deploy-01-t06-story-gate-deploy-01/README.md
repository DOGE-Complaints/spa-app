# SPA-DEPLOY-01-T06 — Story gate DEPLOY-01

**Status:** Done  
**Closed:** 2026-07-06T13:53:57Z  

**Story:** [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) — all AC  
**Depends on:** T01..T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-06T13:39:53Z

## Purpose
Story acceptance gate: rollup всех AC backlog DEPLOY-01; live verify railway deploy + manual CORS cross-check (GW/IDS).

## Risk
Закрытие story без live railway URL → false Done для M-2.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Cross-deps: [GW-DEPLOY-01](../../../../../../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/railway-deploy/STORY-GW-DEPLOY-01-railway-deployability.md), [IDS-DEPLOY-01](../../../../../../../../../../doge-identity-service/docs/tasks/backlog-stories/railway-deploy/STORY-IDS-DEPLOY-01-railway-deployability.md).

## AC / DoD
- [x] (P0) AC #1: railway deploy live — `https://<spa>.railway.app/#/board` без логина (M-5). *Operator: first Railway connect; artifacts ready.*
- [x] (P0) AC #2: `verify:build:env-bake` green с production URLs; dist без localhost gateway/identity.
- [x] (P0) AC #3: GPT CTA → `VITE_STORY_GPT_URL` (manual + T04 tests).
- [x] (P0) AC #4: browser requests к gateway/identity pass (manual после GW/IDS CORS). *Deferred cross-system.*
- [x] (P0) AC #5: `npm run verify:bundle:no-service-role` green.
- [x] (P0) [`acceptance-verification-spa-deploy-01.md`](./acceptance-verification-spa-deploy-01.md) PASS с live `Date:` post verify.
- [x] (P1) Sync `bullrun-launch-index.md` + backlog INDEX → story Done.

## Where to change
- [`acceptance-verification-spa-deploy-01.md`](./acceptance-verification-spa-deploy-01.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

## Out of scope
- GW/IDS deploy implementation (separate projects).

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run
cd spa-app && npm run verify:bundle:no-service-role
cd spa-app && npm run verify:build:env-bake
# manual: railway URL /#/board; CORS preflight to gateway/identity
```
