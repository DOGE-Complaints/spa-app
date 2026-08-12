# SPA-ID-13-T05 — Doc touchpoints M-5 spa half

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** backlog FR-ID13.6; Scope T05; §Documentation touchpoints  
**Depends on:** T01–T04 (close when code AC green)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T19:28:37Z

## Purpose
Синхронизировать docs при закрытии story: INDEX Partial→Done + pkg id; mvp-plan M-5 spa-половина ✅; bullrun/dashboard; deploy-guide pointer на live smoke без требования URL для Done.

## Risk
Code Done без doc sync → dashboard/INDEX/mvp-plan drift; ложный статус «ID-13 open».

## Code Facts (re-verify at execute)
- Touchpoints (pipeline story §Documentation touchpoints):
  - backlog + [`identity-auth/INDEX.md`](../../../../../../../../backlog-stories/identity-auth/INDEX.md) + [`backlog-stories/INDEX.md`](../../../../../../../../backlog-stories/INDEX.md)
  - [`docs/analysis/mvp-integration-plan-2026-07-02.md`](../../../../../../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) M-5
  - [`bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
  - [`spa-mvp-dashboard.md`](../../../../../../spa-mvp-dashboard.md)
  - [`deploy-guide.md` §M-5](../../../../../../deploy-guide.md)
  - optional [`backlog-status-audit-2026-07-09.md`](../../../../../../analysis/backlog-status-audit-2026-07-09.md)

## Gap
Doc / INDEX / mvp-plan sync Open until story close.

## AC / DoD
- [ ] (P0) **FR-ID13.6:** backlog + INDEX → Done + `pkg-000041` (at close).
- [ ] (P0) **FR-ID13.6:** mvp-plan M-5 spa half marked ✅ (pair GW-PUBLIC-01).
- [ ] (P0) bullrun §Актуальная точка + spa-mvp-dashboard updated for Done.
- [ ] (P0) deploy-guide §M-5: confirm live smoke pointer; **not** require URL for story Done.
- [ ] (P1) optional note on backlog-status-audit.

## Where to change
- Docs listed above; pipeline + backlog Meta Status → Done at close
- **не** менять runtime code

## Out of scope
- Runtime policy/repository; gateway docs; mandatory Railway live run.

## Verification
```bash
# Manual: grep/read touchpoints for Done + pkg-000041 + M-5 spa half
rg -n 'ID-13|STORY-SPA-ID-13|pkg-000041' spa-app/docs/tasks/backlog-stories/identity-auth/ spa-app/docs/tasks/spa-mvp-dashboard.md spa-app/docs/tasks/bullrun-launch-index.md
```
