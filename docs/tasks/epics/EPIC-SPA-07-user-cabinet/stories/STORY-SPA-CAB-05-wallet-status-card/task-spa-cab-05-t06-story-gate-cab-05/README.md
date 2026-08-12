# SPA-CAB-05-T06 — Story gate CAB-05

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md) — all MVP AC  
**Depends on:** T01..T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T13:51:04Z
**Completed:** 2026-07-26T19:35:18Z

## Purpose
Story acceptance gate: rollup всех MVP AC backlog CAB-05; live verify Wallet stub on `/profile`; sync bullrun/backlog Done only after PASS.

## Risk
Закрытие story без full AC verify → false Done for wallet-in-cabinet stub.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: CAB-01 shell (wallet slot).
- Package: `pkg-000035` (see `spa-active-package.current.yaml`).

## AC / DoD
- [x] (P0) AC #1: Wallet = stub State A «Wallet not linked» (не crypto-dashboard).
- [x] (P0) AC #2: Connect/Manage → `cabinet.common.comingSoon`; wallet-API не вызывается.
- [x] (P0) AC #3: Wallet optional — кабинет не блокируется.
- [x] (P0) AC #4: L10N et/ru/en via `t()`; `CABINET_FLAT_KEYS` updated; forbidden-terms none.
- [x] (P0) [`acceptance-verification-spa-cab-05.md`](./acceptance-verification-spa-cab-05.md) PASS with live `Date:` post verify.
- [x] (P1) Sync `bullrun-launch-index.md` + backlog INDEX / cabinet INDEX → story Done.

## Where to change
- [`acceptance-verification-spa-cab-05.md`](./acceptance-verification-spa-cab-05.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`spa-app/docs/tasks/backlog-stories/cabinet/INDEX.md`](../../../../../../backlog-stories/cabinet/INDEX.md)
- [`spa-app/docs/tasks/spa-mvp-dashboard.md`](../../../../../../spa-mvp-dashboard.md)

## Out of scope
- On-chain history / balances. Live wallet contract (post-MVP). CAB-06…07 content.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run WalletStatus UserCabinetPage cabinetDictionary
```
