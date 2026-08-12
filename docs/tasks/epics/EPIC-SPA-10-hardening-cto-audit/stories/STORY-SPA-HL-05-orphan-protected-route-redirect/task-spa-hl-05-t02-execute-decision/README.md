# SPA-HL-05-T02 — Execute delete or wire

**Status:** Done — 2026-08-10T09:42:36Z  
**Story:** [`../STORY-SPA-HL-05-orphan-protected-route-redirect.md`](../STORY-SPA-HL-05-orphan-protected-route-redirect.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md) §FR-HL-05.1 · AC#1 · FR-HL-05.3  
**Depends on:** [T01](../task-spa-hl-05-t01-decision-delete-vs-wire/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-10T09:35:22Z  
**Package:** `pkg-000063`

## Purpose

Выполнить T01 **delete**: убрать orphan export + unused `Navigate` import.

## Risk

Orphan остаётся; или wire ломает overlay AC.

## Code Facts (As-of-Done)

1. Removed `ProtectedRouteRedirect` from [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx).
2. `Navigate` import dropped (Outlet/useLocation remain).
3. `rg ProtectedRouteRedirect spa-app/src` → **ABSENT**.
4. Vitest: sessionShellState + sessionRoutePolicy **19/19** PASS.

## AC / DoD

- [x] (P0) No unused `ProtectedRouteRedirect` (FR-HL-05.1 · AC#1).
- [x] (P0) `Navigate` unused import removed.
- [x] (P0) Session overlay / route policy vitest green (FR-HL-05.3).

## Where to change

- `src/layout/AppShellLayout.jsx`

## Out of scope

HL-06; new protected prefixes; invent UX.

## Verification

```bash
rg -n "ProtectedRouteRedirect" spa-app/src  # ABSENT
npx vitest run src/auth/__tests__/sessionShellState.test.js src/router/__tests__/sessionRoutePolicy.test.js
# 19/19 PASS
```
