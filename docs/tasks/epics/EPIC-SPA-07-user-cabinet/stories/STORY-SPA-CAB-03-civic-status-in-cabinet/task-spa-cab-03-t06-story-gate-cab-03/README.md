# SPA-CAB-03-T06 — Story gate CAB-03

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) — all AC  
**Depends on:** T01..T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T21:26:27Z
**Completed:** 2026-07-25T21:40:18Z

## Purpose
Story acceptance gate: rollup всех AC backlog CAB-03; live verify civic block on `/profile` + reuse-only L10N; sync bullrun/backlog Done only after PASS.

## Risk
Закрытие story без full AC verify → false Done для civic-in-cabinet.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: CAB-01 shell; ID-03 card; ID-04 `/verify`.

## AC / DoD
- [x] (P0) AC #1: Civic block доминирует на `/profile` (M99 hierarchy).
- [x] (P0) AC #2: `phone_verified=true/false` через `CivicStatusCard`.
- [x] (P0) AC #3: CTA Verify → `/verify`; verified без лишнего prompt.
- [x] (P0) AC #4: отдельный civic component для cabinet не создан.
- [x] (P0) AC #5: strings только `civic.*`; нет дублей в `cabinet.*`.
- [x] (P0) [`acceptance-verification-spa-cab-03.md`](./acceptance-verification-spa-cab-03.md) PASS с live `Date:` post verify.
- [x] (P1) Sync `bullrun-launch-index.md` + backlog INDEX / cabinet INDEX → story Done.

## Where to change
- [`acceptance-verification-spa-cab-03.md`](./acceptance-verification-spa-cab-03.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`spa-app/docs/tasks/backlog-stories/cabinet/INDEX.md`](../../../../../../backlog-stories/cabinet/INDEX.md)
- [`spa-app/docs/tasks/spa-mvp-dashboard.md`](../../../../../../spa-mvp-dashboard.md)

## Out of scope
- OTP modals. Wallet. CAB-04…07 content.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run UserCabinetPage CivicStatusCard civicStatusState DashboardPage
```
