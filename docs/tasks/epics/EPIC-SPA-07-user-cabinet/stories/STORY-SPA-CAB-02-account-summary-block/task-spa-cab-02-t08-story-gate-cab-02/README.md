# SPA-CAB-02-T08 — Story gate CAB-02

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) — all AC  
**Depends on:** T01..T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Story acceptance gate: rollup всех 6 AC backlog CAB-02; live verify protected route + Account Summary on `/profile`.

## Risk
Закрытие story без full AC verify → false Done для Account Summary block.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) shell for `/profile` render path.
- Depends: [ID-02](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md) — protected overlay.

## AC / DoD
- [x] (P0) AC #1: `/profile` показывает Account Summary (не placeholder page).
- [x] (P0) AC #2: `display_name`, `role` из `/me`; partial fields с `Not Available` без поломки карточки.
- [x] (P0) AC #3: Три состояния M24/M25/M26 достижимы при соответствующих данных.
- [x] (P0) AC #4: Сырой номер/OTP/токены не отображаются.
- [x] (P0) AC #5: Protected; неавторизованный не видит контент.
- [x] (P0) AC #6: Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.
- [x] (P0) [`acceptance-verification-spa-cab-02.md`](./acceptance-verification-spa-cab-02.md) PASS с live `Date:` post verify.
- [x] (P1) Sync `bullrun-launch-index.md` + backlog INDEX → story Done.

## Where to change
- [`acceptance-verification-spa-cab-02.md`](./acceptance-verification-spa-cab-02.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

## Out of scope
- Civic status (CAB-03). Profile editing. Wallet.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run AccountSummary
cd spa-app && npm test -- --run sessionRoutePolicy
```
