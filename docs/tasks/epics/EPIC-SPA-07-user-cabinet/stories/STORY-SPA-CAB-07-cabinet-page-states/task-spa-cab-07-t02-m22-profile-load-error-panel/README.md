# SPA-CAB-07-T02 — M22 profile load ErrorPanel + stable shell

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-07-cabinet-page-states.md`](../STORY-SPA-CAB-07-cabinet-page-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) §FR-CAB-07.3–07.5, T03–T04  
**Depends on:** T01 (anchor mockup); ID-02 shell; CAB-01 shell  
**ui_scope:** `visual`  
**extends ui-mockup:** [`../task-spa-cab-07-t01-m23-composite-new-user-empty/ui-mockup-spec.md`](../task-spa-cab-07-t01-m23-composite-new-user-empty/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T13:48:38Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-22-user-cabinet-load-error-spec.md

## Purpose
Закрыть FR-CAB-07.3 / 07.4 / 07.5: при сбое загрузки профиля показать M22 panel (`Unable to load account data` + Retry + Back to Board + optional code); shell (sidebar/header) стабилен; задел `AppErrorState`/`ErrorPanel` без global epic.

## Risk
Generic NETWORK_ERROR overlay или full-page crash вместо инженерного M22 panel → false failure UX.

## Code Facts (re-verify at execute)
- Generic overlays: [`SessionShellPanels.jsx`](../../../../../../../src/components/SessionShellState/SessionShellPanels.jsx) (`BACKEND_UNAVAILABLE` / `NETWORK_ERROR`) — **не** M22 copy.
- No `AppErrorState` / `cabinet.error.profileLoad` in `src/` yet (`rg` empty at scaffold).
- Retry must re-trigger `/me` via [`useSessionShellState.js`](../../../../../../../src/auth/useSessionShellState.js) `retry`.
- Error PNG for M22 **missing** on disk — Path A uses **spec.md only**; do not use loading-skeleton PNG as error SSOT.

## AC / DoD
- [ ] (P0) FR-CAB-07.3 / AC #2: Profile load fail shows M22 with Retry and Back to Board.
- [ ] (P0) FR-CAB-07.4 / AC #3: Shell does not collapse; engineering tone.
- [ ] (P0) AC #4: Error codes (`PROFILE_LOAD_FAILED`, `SESSION_EXPIRED`, …) showable via `cabinet.common.codeLabel`.
- [ ] (P1) FR-CAB-07.5: reusable ErrorPanel/AppErrorState scaffold (cabinet-scoped; no global epic).

## Where to change
- New `spa-app/src/components/…/ErrorPanel` (or Cabinet/AppErrorState)
- `UserCabinetPage.jsx` and/or session shell profile-error branch
- `useSessionShellState.js` / `sessionShellState.js` as needed for Retry

## Out of scope
- Global app error epic. Logout/login. L10N dictionary (T03). Icon asset replace (T04 wires paths). Vitest (T05).

## Verification
```bash
cd spa-app && npm test -- --run SessionShell UserCabinetPage
# P3: Path A M22 spec + screenshots for error state
```

Gate: [`acceptance-verification-spa-cab-07-t02.md`](./acceptance-verification-spa-cab-07-t02.md)
