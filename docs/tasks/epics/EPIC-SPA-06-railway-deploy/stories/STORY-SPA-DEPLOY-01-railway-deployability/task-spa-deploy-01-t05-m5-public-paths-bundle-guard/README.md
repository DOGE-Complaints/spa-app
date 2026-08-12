# SPA-DEPLOY-01-T05 — M-5 public paths + bundle guard

**Status:** Done  
**Closed:** 2026-07-06T13:53:57Z  

**Story:** [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) §Scope D, E — AC #5  
**Depends on:** T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-06T13:39:53Z

## Purpose
Закрыть Scope **D+E** + AC **#5**: подтвердить/усилить regression tests для M-5 public paths (`/board`, `/issue/*`); **не** менять `PUBLIC_PATHS` без failing test; зафиксировать `verify:bundle:no-service-role` в deploy checklist.

## Risk
Deploy-волна случайно ужесточает auth shell → доска требует логин (нарушение M-5).

## Code Facts (re-verify at execute)
- [`sessionRoutePolicy.js:1-15`](../../../../../../../../src/router/sessionRoutePolicy.js) — `PUBLIC_PATHS` = `/`, `/board`, `/login`; `/issue/*` public.
- [`sessionRoutePolicy.test.js`](../../../../../../../../src/router/__tests__/sessionRoutePolicy.test.js) — базовые asserts уже есть.
- [`verify:bundle:no-service-role`](../../../../../../../../package.json) + [`scripts/verify-bundle-no-service-role.mjs`](../../../../../../../../scripts/verify-bundle-no-service-role.mjs).

## AC / DoD
- [x] (P0) Scope D: `sessionRoutePolicy` tests покрывают `/board`, `/issue/demo-1`, `/login`, `/` = public; **нет** изменений в `PUBLIC_PATHS` unless test-driven fix.
- [x] (P0) AC #5: `npm run verify:bundle:no-service-role` green; упомянут в gate/deploy checklist (T06).
- [x] (P1) Опционально: assert `isPublicPath('/board')` в CI doc / deploy-guide troubleshooting.

## Where to change
- [`spa-app/src/router/__tests__/sessionRoutePolicy.test.js`](../../../../../../../../src/router/__tests__/sessionRoutePolicy.test.js) (усилить при gap)
- [`spa-app/docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md) (checklist pointer)

## Out of scope
- Изменение `sessionRoutePolicy.js` без failing test. SEC-01 re-implementation.

## Verification
```bash
cd spa-app && npm run test:run -- src/router/__tests__/sessionRoutePolicy.test.js
cd spa-app && npm run verify:bundle:no-service-role
```
