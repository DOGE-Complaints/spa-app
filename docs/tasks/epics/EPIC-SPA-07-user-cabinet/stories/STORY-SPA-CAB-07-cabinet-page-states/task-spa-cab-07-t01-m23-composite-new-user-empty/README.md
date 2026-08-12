# SPA-CAB-07-T01 — M23 composite new-user empty + actions

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-07-cabinet-page-states.md`](../STORY-SPA-CAB-07-cabinet-page-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) §FR-CAB-07.1, FR-CAB-07.2, T01–T02  
**Depends on:** CAB-01…06 Done — all cabinet blocks mounted  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T13:48:38Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png

## Purpose
Закрыть FR-CAB-07.1 / FR-CAB-07.2: после signup/first visit кабинет показывает M23 composite — все секции видны со своими empty states (не giant welcome); actions Verify Account / Go to Board / Coming Later согласованы со stubs CAB-03…06.

## Risk
Без composite gate новый пользователь видит неполный кабинет или giant welcome вместо локальных empties.

## Code Facts (re-verify at execute)
- [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) — mounts AccountSummary / CivicStatus / StoryActivity / WalletStatus / ContributionLayer.
- Empty/stub states already exist in CAB-02…06 cards; this task wires/verifies **composite** new-user fixture + action alignment.
- Shell: [`sessionShellState.js`](../../../../../../../src/auth/sessionShellState.js), [`useSessionShellState.js`](../../../../../../../src/auth/useSessionShellState.js).

## AC / DoD
- [ ] (P0) FR-CAB-07.1 / AC #1: New user видит M23 composite (структура + local empties).
- [ ] (P0) FR-CAB-07.2: Verify Account / Go to Board / Coming Later согласованы с CAB-03/04/05/06 stubs.
- [ ] (P1) DEV fixture/hook documented for reproducible new-user empty composite.
- [ ] (P1) No giant welcome screen replacing section empties.

## Where to change
- `spa-app/src/pages/UserCabinetPage.jsx` (fixtures / preview hooks as needed)
- Possibly card props for verified=false / empty story / wallet unlinked / contrib empty defaults
- DEV hooks documentation in pipeline story

## Out of scope
- M22 ErrorPanel (T02). L10N new keys (T03). Icons M22 (T04). Vitest suite (T05). Story gate (T06).

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
# P3: UI-0/UI-3 + Path A M23
```

Gate: [`acceptance-verification-spa-cab-07-t01.md`](./acceptance-verification-spa-cab-07-t01.md)
