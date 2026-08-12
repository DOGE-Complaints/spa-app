# SPA-CAB-04-T01 — Mount StoryActivityCard in cabinet story slot

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-04-story-activity-card.md`](../STORY-SPA-CAB-04-story-activity-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md) §FR-CAB-04.1, T01  
**Depends on:** [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — story slot in `UserCabinetPage`  
**ui_scope:** `mixed`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T11:17:40Z
**Completed:** 2026-07-26T11:31:11Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md.png
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png

## Purpose
Закрыть FR-CAB-04.1 / T01: создать `<StoryActivityCard />` и смонтировать в слот Story Activity (`cabinet-slot-story`, M99 below Civic) вместо `cabinet.common.comingLater`.

## Risk
Без mount story ledger не появляется на `/profile`; placeholder `comingLater` остаётся в story slot.

## Code Facts (re-verify at execute)
- [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) — `SECTION_SLOTS` id `story`; `testId: cabinet-slot-story`; non-account/non-civic slots → `cabinet.common.comingLater`.
- Account slot mounts `AccountSummary` (CAB-02); civic slot mounts `CivicStatusCard` (CAB-03) — образец mount branch.
- No `StoryActivityCard` in `src/` yet (grep empty).

## AC / DoD
- [x] (P0) FR-CAB-04.1: `StoryActivityCard` смонтирован в story slot на `/profile`.
- [x] (P0) Placeholder `comingLater` убран из story slot.
- [x] (P1) Component scaffold ready for T02 states (default/empty-capable shell).

## Where to change
- `spa-app/src/components/StoryActivity/` (new) — `StoryActivityCard.jsx` (+ index export)
- `spa-app/src/pages/UserCabinetPage.jsx` — story branch like account/civic

## Out of scope
- Runtime states A–E details (T02). Icons (T03). L10N keys (T04). Vitest suite (T05). Gateway HTTP.

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
rg -n "StoryActivityCard|cabinet-slot-story" src/pages/UserCabinetPage.jsx src/components/StoryActivity
```
