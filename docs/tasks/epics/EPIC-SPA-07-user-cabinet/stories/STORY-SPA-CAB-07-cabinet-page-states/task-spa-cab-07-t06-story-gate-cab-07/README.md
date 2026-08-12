# SPA-CAB-07-T06 — Story gate CAB-07

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-07-cabinet-page-states.md`](../STORY-SPA-CAB-07-cabinet-page-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) — all MVP AC  
**Depends on:** T01..T05  
**ui_scope:** `mixed`  
**extends:** T01 / ui-mockup M23; T02 / M22 spec  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T13:48:38Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png
@mockup: ../../../../../../UX/mockups/user profile/mockup-22-user-cabinet-load-error-spec.md

## Purpose
Story acceptance gate: rollup всех MVP AC backlog CAB-07; live verify M23 composite + M22 error on `/profile`; story-root screenshots §UI; sync bullrun/backlog Done only after PASS.

## Risk
Закрытие story без full AC + UI verify → false Done for integration gate.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: CAB-01…06 Done; ID-02 shell.
- Package: `pkg-000037` (see `spa-active-package.current.yaml`).
- M22 error PNG absent — Path A spec.md sufficient; do not treat loading PNG as error SSOT.

## AC / DoD
- [ ] (P0) AC #1: New user видит M23 composite (структура + local empties).
- [ ] (P0) AC #2: Profile load fail показывает M22 с Retry и Back to Board.
- [ ] (P0) AC #3: Shell не коллапсирует; инженерный тон сообщений.
- [ ] (P0) AC #4: Error codes из списка M22 §6 поддерживаемы в UI contract.
- [ ] (P0) AC #5: M22 строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.
- [ ] (P0) [`acceptance-verification-spa-cab-07.md`](./acceptance-verification-spa-cab-07.md) PASS with live `Date:` post verify.
- [ ] (P1) Story-root screenshots index + Path A M23 (+ M22 spec) PASS.
- [ ] (P1) Sync `bullrun-launch-index.md` + backlog INDEX / cabinet INDEX / spa-mvp-dashboard → story Done.

## Where to change
- [`acceptance-verification-spa-cab-07.md`](./acceptance-verification-spa-cab-07.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`spa-app/docs/tasks/backlog-stories/cabinet/INDEX.md`](../../../../../../backlog-stories/cabinet/INDEX.md)
- [`spa-app/docs/tasks/spa-mvp-dashboard.md`](../../../../../../spa-mvp-dashboard.md)
- Story-root [`../screenshots/`](../screenshots/) (created in P3)

## Out of scope
- Global app error epic. Logout/login flows. Loading-skeleton FR-CAB-01.5.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run
# P3 UI scripts as added for CAB-07
```

Gate: [`acceptance-verification-spa-cab-07.md`](./acceptance-verification-spa-cab-07.md)
