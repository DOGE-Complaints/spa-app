# SPA-CAB-01-T01 — Profile route → UserCabinetPage

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) §FR-CAB-01.1, T01  
**Depends on:** —  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T12:34:41Z

## Purpose
Закрыть FR-CAB-01.1 / T01: маршрут `/profile` рендерит `UserCabinetPage` (не `ProtectedPlaceholder`). Route wiring **уже есть** — verify/complete; **сохранить** mount `AccountSummary` (CAB-02 Done).

## Risk
Регрессия CAB-02: удаление Account slot при «пересоздании» страницы с нуля.

## Code Facts (re-verify at execute)
- [`App.jsx`](../../../../../../../src/App.jsx) — `<Route path="/profile" element={<ProtectedProfilePage />} />`.
- [`AppShellLayout.jsx:45-46`](../../../../../../../src/layout/AppShellLayout.jsx) — `ProtectedProfilePage` → `UserCabinetPage`.
- [`UserCabinetPage.jsx:7-32`](../../../../../../../src/pages/UserCabinetPage.jsx) — title + AccountSummary slot only (нет M99 grid).
- [`sessionRoutePolicy.js:3`](../../../../../../../src/router/sessionRoutePolicy.js) — `/profile` ∈ protected.

## AC / DoD
- [x] (P0) FR-CAB-01.1: `/profile` рендерит `UserCabinetPage` вместо placeholder.
- [x] (P0) AC #1: авторизованный пользователь видит кабинет на `/profile` (не placeholder).
- [x] (P0) Preserve: AccountSummary остаётся смонтированным в Account slot (CAB-02).

## Where to change
- [`spa-app/src/App.jsx`](../../../../../../../src/App.jsx) — verify route only
- [`spa-app/src/layout/AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx) — verify `ProtectedProfilePage`
- [`spa-app/src/pages/UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) — keep AccountSummary mount

## Out of scope
- M99 grid / section slots (T02). Shell skeleton polish (T04). L10N nav keys (T03).

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
cd spa-app && npm test -- --run sessionRoutePolicy
```
