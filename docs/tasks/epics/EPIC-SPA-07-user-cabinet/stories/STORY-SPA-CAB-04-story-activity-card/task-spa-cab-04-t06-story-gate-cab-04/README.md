# SPA-CAB-04-T06 — Story gate CAB-04

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-04-story-activity-card.md`](../STORY-SPA-CAB-04-story-activity-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md) — all AC  
**Depends on:** T01..T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T11:17:40Z
**Completed:** 2026-07-26T11:31:11Z

## Purpose
Story acceptance gate: rollup всех AC backlog CAB-04; live verify Story Activity on `/profile`; sync bullrun/backlog Done only after PASS.

## Risk
Закрытие story без full AC verify → false Done для story-activity-in-cabinet.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
- Depends: CAB-01 shell; CAB-03 (state D semantics); ID-12 route exists for follow-up (not MVP HTTP).

## AC / DoD
- [x] (P0) AC #1: 5 runtime states A–E UI layout (no Submit First Story).
- [x] (P0) AC #2: Empty = Go to Board, not Submit.
- [x] (P0) AC #3: No HTTP to gateway; Resume/data → `comingSoon`.
- [x] (P0) AC #4: Verify Account → `/verify`.
- [x] (P0) AC #5: Privacy rules (no full story text in UI).
- [x] (P0) AC #6: L10N et/ru/en via `t()`; `CABINET_FLAT_KEYS` updated; forbidden-terms none.
- [x] (P0) [`acceptance-verification-spa-cab-04.md`](./acceptance-verification-spa-cab-04.md) PASS with live `Date:` post verify.
- [x] (P1) Sync `bullrun-launch-index.md` + backlog INDEX / cabinet INDEX → story Done.

## Where to change
- [`acceptance-verification-spa-cab-04.md`](./acceptance-verification-spa-cab-04.md)
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`spa-app/docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`spa-app/docs/tasks/backlog-stories/cabinet/INDEX.md`](../../../../../../backlog-stories/cabinet/INDEX.md)
- [`spa-app/docs/tasks/spa-mvp-dashboard.md`](../../../../../../spa-mvp-dashboard.md)

## Out of scope
- Submit from cabinet. Live GW wiring follow-up. CAB-05…07 content.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run StoryActivity UserCabinetPage cabinetDictionary
```
