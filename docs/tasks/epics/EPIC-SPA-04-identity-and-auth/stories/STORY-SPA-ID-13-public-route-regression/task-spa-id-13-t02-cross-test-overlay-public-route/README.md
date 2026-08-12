# SPA-ID-13-T02 — Cross-test overlay × public route

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** backlog FR-ID13.3; D-ID13-3 B; Scope T02  
**Depends on:** T01 (policy matrix stable)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T19:28:37Z

## Purpose
Один cross-test мост policy↔shell: public path через `isProtectedPath` ⇒ overlay false при `LOGGED_OUT` (и contrast protected ⇒ true), без полного регресса ID-02.

## Risk
Policy и shell могут разъехаться: public path станет protected в одном слое, но overlay останется «как boolean» в другом.

## Code Facts (re-verify at execute)
- [`sessionShellState.js`](../../../../../../../../src/auth/sessionShellState.js) (~74–110): overlay only if `isProtectedRoute`.
- [`sessionShellState.test.js`](../../../../../../../../src/auth/__tests__/sessionShellState.test.js) (~49–65): `logged_out` + `isProtectedRoute=false` → overlay false (boolean flag, не через policy path).
- [`sessionRoutePolicy.js`](../../../../../../../../src/router/sessionRoutePolicy.js): `isProtectedPath('/board') === false`.
- Consumer: [`AppShellLayout.jsx`](../../../../../../../../src/layout/AppShellLayout.jsx) wires policy → overlay.

## Gap
Cross-test «public path ⇒ overlay false» Open (ID-02 core Done).

## AC / DoD
- [ ] (P0) **FR-ID13.3:** `SESSION_SHELL_STATES.LOGGED_OUT` + public via policy (`isProtectedPath('/board')===false` → `isProtectedRoute=false`) ⇒ `shouldShowSessionShellOverlay(…) === false`.
- [ ] (P0) Contrast: protected path (`isProtectedPath('/profile')===true`) ⇒ overlay true for `LOGGED_OUT`.
- [ ] (P0) Не дублировать полный suite ID-02 shell states.

## Where to change
- EXTEND `spa-app/src/auth/__tests__/sessionShellState.test.js` и/или `spa-app/src/router/__tests__/sessionRoutePolicy.test.js` (тонкий импорт `shouldShowSessionShellOverlay`)

## Out of scope
- Менять `sessionShellState.js` / policy runtime без fail; full ID-02 re-suite; Authorization (T03).

## Verification
```bash
cd spa-app && npx vitest run src/auth/__tests__/sessionShellState.test.js src/router/__tests__/sessionRoutePolicy.test.js
```
