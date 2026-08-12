# SPA-CAB-01-T07 — Story gate CAB-01

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — all AC  
**Depends on:** T01..T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T12:34:41Z

## Purpose
Story acceptance gate: rollup всех 5 AC backlog CAB-01; live verify cabinet shell on `/profile`.

## Risk
Закрытие story без full AC verify → false Done для Profile Cabinet Shell.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: [ID-02](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md) — protected overlay.
- CAB-02 AccountSummary must remain mounted in Account slot.

## AC / DoD
- [x] (P0) AC #1: Авторизованный пользователь видит собранный кабинет на `/profile` (не placeholder).
- [x] (P0) AC #2: Layout соответствует M99 section slots и visual hierarchy.
- [x] (P0) AC #3: Неавторизованный — SessionShell overlay (ID-02).
- [x] (P0) AC #4: `/dashboard` не изменён.
- [x] (P0) AC #5: Все строки shell локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` / `IDENTITY_FLAT_KEYS` обновлены; forbidden-terms нет.
- [x] (P0) [`acceptance-verification-spa-cab-01.md`](./acceptance-verification-spa-cab-01.md) PASS с live `Date:` post verify.
- [x] (P1) Sync `bullrun-launch-index.md` + backlog INDEX → story Done.

## Where to change
- [`acceptance-verification-spa-cab-01.md`](./acceptance-verification-spa-cab-01.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

## Out of scope
- Содержимое CAB-02…06. Mobile. Иконки.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run UserCabinetPage sessionRoutePolicy
```
