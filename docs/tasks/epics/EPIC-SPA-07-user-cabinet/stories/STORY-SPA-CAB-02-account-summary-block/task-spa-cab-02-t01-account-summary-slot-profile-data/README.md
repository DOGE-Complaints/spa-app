# SPA-CAB-02-T01 — AccountSummary slot + profile data

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) §FR-CAB-02.1, T01  
**Depends on:** [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — Account slot in `UserCabinetPage`  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Закрыть FR-CAB-02.1 / T01: создать `<AccountSummary />` и смонтировать в слот Account (M99 top-left); данные из `useSessionShell().profile`.

## Risk
Без mount в Account slot блок не виден на `/profile`; без CAB-01 shell slot mount невозможен.

## Code Facts (re-verify at execute)
- [`AppShellLayout.jsx:44-45`](../../../../../../../src/layout/AppShellLayout.jsx) — `/profile` → `ProtectedPlaceholder`.
- [`useSessionShellState.js:16-44`](../../../../../../../src/auth/useSessionShellState.js) — `profile` из `identityService.fetchMe()`.
- [`identityService.js:121-125`](../../../../../../../src/auth/identityService.js) — `fetchMe()` → GET `/me`.
- `AccountSummary` / `UserCabinetPage` — **не существуют** в `src/`.

## AC / DoD
- [x] (P0) FR-CAB-02.1: `<AccountSummary />` смонтирован в Account slot кабинета.
- [x] (P0) AC #1: `/profile` показывает Account Summary (не placeholder page).
- [x] (P0) AC #2: `display_name`, `role` из `useSessionShell().profile` (/me).
- [x] (P1) Traceability: story AC #5 — protected route; overlay при `logged_out` (ID-02), контент не виден неавторизованному.

## Where to change
- `spa-app/src/components/AccountSummary/AccountSummary.jsx` (new)
- `spa-app/src/components/AccountSummary/index.js` (new)
- `spa-app/src/pages/UserCabinetPage.jsx` — Account slot mount (**from CAB-01**)
- [`spa-app/src/auth/SessionShellContext.jsx`](../../../../../../../src/auth/SessionShellContext.jsx)
- [`spa-app/src/auth/identityService.js`](../../../../../../../src/auth/identityService.js)

## Out of scope
- Field grid layout (T02). UX states (T03). L10N keys (T05). Icons (T06).

## Verification
```bash
cd spa-app && npm test -- --run AccountSummary
cd spa-app && npm test -- --run sessionRoutePolicy
```
