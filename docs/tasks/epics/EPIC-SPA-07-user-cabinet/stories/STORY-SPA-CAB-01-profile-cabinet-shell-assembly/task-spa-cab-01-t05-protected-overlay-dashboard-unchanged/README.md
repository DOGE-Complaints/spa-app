# SPA-CAB-01-T05 — Protected overlay; dashboard unchanged

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) §FR-CAB-01.4, T05  
**Depends on:** [T01](../task-spa-cab-01-t01-profile-route-user-cabinet-page/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T12:34:41Z

## Purpose
Закрыть FR-CAB-01.4 / T05: `/profile` protected — SessionShell overlay при `logged_out` (ID-02); не redirect на `/login` на layout; `/dashboard` не задет.

## Risk
Регрессия ID-02 overlay на `/profile` или случайное изменение `/dashboard` → AC #3/#4 fail.

## Code Facts (re-verify at execute)
- [`sessionRoutePolicy.js:3`](../../../../../../../src/router/sessionRoutePolicy.js) — `/profile` и `/dashboard` уже в `PROTECTED_PREFIXES`.
- ID-02 overlay path — SessionShell (не invent new redirect).
- CAB-02 already verified protected `/profile` in gate; re-verify after shell layout changes.

## AC / DoD
- [x] (P0) FR-CAB-01.4: overlay при `logged_out` на `/profile`; нет layout-level redirect to `/login`.
- [x] (P0) AC #3: неавторизованный — SessionShell overlay (ID-02).
- [x] (P0) AC #4: `/dashboard` не изменён.

## Where to change
- [`spa-app/src/router/sessionRoutePolicy.js`](../../../../../../../src/router/sessionRoutePolicy.js) — verify only unless gap
- SessionShell / layout consumers as needed for overlay parity
- Do **not** change dashboard page behavior

## Out of scope
- Login page UX. CAB-07 error states. Dashboard features.

## Verification
```bash
cd spa-app && npm test -- --run sessionRoutePolicy
# overlay / logged_out coverage for /profile
```
