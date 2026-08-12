# SPA-CAB-06-T06 — Story gate CAB-06

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-06-contribution-layer.md`](../STORY-SPA-CAB-06-contribution-layer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) — all MVP AC  
**Depends on:** T01..T05  
**ui_scope:** `mixed`  
**extends:** T01 / ui-mockup M53 (+ M23)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-27T14:45:14Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-53-contribution-layer-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-53-contribution-layer-state-sheet-spec.png
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png

## Purpose
Story acceptance gate: rollup всех MVP AC backlog CAB-06; live verify Contribution Layer stub on `/profile`; story-root screenshots §UI; sync bullrun/backlog Done only after PASS.

## Risk
Закрытие story без full AC + UI verify → false Done for contribution stub.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: CAB-01 shell (contribution slot).
- Package: `pkg-000036` (see `spa-active-package.current.yaml`).

## AC / DoD
- [ ] (P0) AC #1: Три модуля видны на `/profile` bottom section.
- [ ] (P0) AC #2: Нет HTTP к contribution endpoints; клики → `cabinet.common.comingSoon`.
- [ ] (P0) AC #3: Reputation C1 Coming Later / Coming soon.
- [ ] (P0) AC #4: A1 empty без Submit Story CTA.
- [ ] (P0) AC #5: L10N et/ru/en via `t()`; `CABINET_FLAT_KEYS` updated; forbidden-terms none.
- [ ] (P0) [`acceptance-verification-spa-cab-06.md`](./acceptance-verification-spa-cab-06.md) PASS with live `Date:` post verify.
- [ ] (P1) Story-root screenshots index + full-cycle PASS (Path A).
- [ ] (P1) Sync `bullrun-launch-index.md` + backlog INDEX / cabinet INDEX / spa-mvp-dashboard → story Done.

## Where to change
- [`acceptance-verification-spa-cab-06.md`](./acceptance-verification-spa-cab-06.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`spa-app/docs/tasks/backlog-stories/cabinet/INDEX.md`](../../../../../../backlog-stories/cabinet/INDEX.md)
- [`spa-app/docs/tasks/spa-mvp-dashboard.md`](../../../../../../spa-mvp-dashboard.md)
- Story-root [`../screenshots/`](../screenshots/) (created in P3)

## Out of scope
- Live GW-CAB-03. Submit Story from cabinet. Leaderboards / XP / tokens. CAB-07.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run ContributionLayer UserCabinetPage cabinetDictionary
# after P3 UI runners:
# cd spa-app && npm run test:ui:cabinet-contrib-cab06-full
```

Gate: [`acceptance-verification-spa-cab-06.md`](./acceptance-verification-spa-cab-06.md)
