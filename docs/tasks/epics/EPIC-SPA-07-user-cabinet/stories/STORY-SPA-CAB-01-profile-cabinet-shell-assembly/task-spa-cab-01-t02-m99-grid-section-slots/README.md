# SPA-CAB-01-T02 — M99 12-col grid + section slots

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) §FR-CAB-01.2–01.3, T02  
**Depends on:** [T01](../task-spa-cab-01-t01-profile-route-user-cabinet-page/README.md)  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T12:34:41Z

@mockup: spa-app/docs/UX/mockups/user profile/mockup-21-user-cabinet-overview-default-spec.md
@mockup: spa-app/docs/UX/mockups/user profile/mockup-21-user-cabinet-overview-default-spec.png
@mockup: spa-app/docs/UX/mockups/user profile/mockup-99-user-cabinet-final-assembly-spec.md
@mockup: spa-app/docs/UX/mockups/user profile/mockup-99-user-cabinet-final-assembly-spec.png

## Purpose
Закрыть FR-CAB-01.2–01.3 / T02: desktop 12-column grid + слоты Account / Civic / Story / Wallet / Contribution по иерархии M99 (Civic > Story > Contribution > Account > Wallet). Account slot **сохраняет** CAB-02 `AccountSummary`.

## Risk
Сломать AccountSummary mount или visual hierarchy M99 → AC #2 fail.

## Code Facts (re-verify at execute)
- [`UserCabinetPage.jsx:7-32`](../../../../../../../src/pages/UserCabinetPage.jsx) — только Account slot; нет Civic/Story/Wallet/Contribution.
- CAB-02 Done: `AccountSummary` в `cabinet-slot-account`.
- Gap: M99 12-col + 4 empty slots для CAB-03…06.

## AC / DoD
- [x] (P0) FR-CAB-01.2: AppShell reuse; Profile active; header title Profile (M99).
- [x] (P0) FR-CAB-01.3: 12-col grid; 5 section slots; hierarchy Civic > Story > Contribution > Account > Wallet.
- [x] (P0) AC #1: собранный кабинет (не placeholder) с section slots.
- [x] (P0) AC #2: layout соответствует M99 section slots и visual hierarchy.
- [x] (P0) Account slot keeps `AccountSummary` (CAB-02).
- [x] (P1) FR-CAB-01.6: не social-profile aesthetic (M21 §3).

## Where to change
- [`spa-app/src/pages/UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx)
- [`spa-app/src/pages/UserCabinetPage.css`](../../../../../../../src/pages/UserCabinetPage.css)

## Out of scope
- Содержимое Civic/Story/Wallet/Contribution (CAB-03…06). Shell skeleton (T04). Mobile.

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
# P3 Path A: ui-mockup-spec + post-implement PNG vs M21/M99
```
