# SPA-CAB-03-T01 — Mount CivicStatusCard in cabinet civic slot

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) §FR-CAB-03.1, FR-CAB-03.5, T01  
**Depends on:** [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — civic slot in `UserCabinetPage`  
**ui_scope:** `mixed`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T21:26:27Z
**Completed:** 2026-07-25T21:40:18Z

@mockup: ../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png

## Purpose
Закрыть FR-CAB-03.1 / FR-CAB-03.5 / T01: смонтировать **существующий** `CivicStatusCard` в слот Civic (`cabinet-slot-civic`) вместо placeholder; не создавать второй civic-компонент. Wiring по образцу `DashboardPage`.

## Risk
Без mount civic block не доминирует на `/profile` (M99); дубликат компонента нарушит FR-CAB-03.5.

## Code Facts (re-verify at execute)
- [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) — `SECTION_SLOTS` id `civic`; non-account slots → `cabinet.common.comingLater`.
- [`CivicStatus/index.js`](../../../../../../../src/components/CivicStatus/index.js) — export `CivicStatusCard`.
- [`DashboardPage.jsx`](../../../../../../../src/pages/DashboardPage.jsx) — образец mount + props.
- Account slot already mounts `AccountSummary` (CAB-02).

## AC / DoD
- [x] (P0) FR-CAB-03.1: `CivicStatusCard` смонтирован в civic slot на `/profile`.
- [x] (P0) FR-CAB-03.5 / AC #4: отдельный civic component для cabinet **не** создан (reuse only).
- [x] (P0) AC #1: Civic block визуально в M99 hierarchy (top-center / largest slot CSS preserved).
- [x] (P1) Placeholder `comingLater` убран из civic slot.

## Where to change
- `spa-app/src/pages/UserCabinetPage.jsx` — civic branch like account branch
- Reuse: `spa-app/src/components/CivicStatus/*` (no fork)

## Out of scope
- FE state/CTA details (T02). Icon-swap (T03). L10N guard (T04). Vitest suite expand (T05).

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
```
