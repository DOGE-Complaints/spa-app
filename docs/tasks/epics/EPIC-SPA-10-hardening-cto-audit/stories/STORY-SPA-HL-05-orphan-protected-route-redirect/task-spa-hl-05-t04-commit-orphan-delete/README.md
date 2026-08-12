# SPA-HL-05-T04 — Commit orphan ProtectedRouteRedirect delete (F1)

**Status:** Done — P6 PASS 2026-08-10T10:01:57Z · F1 CLOSED  
**Story:** [`../STORY-SPA-HL-05-orphan-protected-route-redirect.md`](../STORY-SPA-HL-05-orphan-protected-route-redirect.md)  
**Decision Ref:** [audit-STORY-SPA-HL-05-execution-2026-08-10.md](../../../../../../analysis/audit-STORY-SPA-HL-05-execution-2026-08-10.md) §F1  
**Depends on:** SPA-HL-05-T02 Done (WT delete) · T03 gate PASS  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-10T09:55:04Z  
**Package:** `pkg-000064` · wave `spa_hl_05_audit_2026_08_10`

## Purpose

Закрыть Medium **F1**: product delete `ProtectedRouteRedirect` + unused `Navigate` на committed `HEAD`.

## Risk

Ship / checkout from `HEAD` reintroduces orphan; P4 Ready-with-blockers остаётся.

## Code Facts (closed)

1. Commit `16b4473` — `feat(SPA-HL-05): remove orphan ProtectedRouteRedirect`.
2. `git show HEAD:src/layout/AppShellLayout.jsx` — **ABSENT** `ProtectedRouteRedirect` / orphan `Navigate`.
3. `rg ProtectedRouteRedirect spa-app/src` → **ABSENT**.
4. Audit F1 Medium → **CLOSED**.

## Gap

Medium F1 — uncommitted product delete → **CLOSED**.

## AC / DoD

- [x] (P0) Operator-authorized commit of `spa-app/src/layout/AppShellLayout.jsx` (P6 Execute T04).
- [x] (P0) `git show HEAD:src/layout/AppShellLayout.jsx` — no `ProtectedRouteRedirect` · no unused `Navigate` for orphan.
- [x] (P0) `rg ProtectedRouteRedirect spa-app/src` → ABSENT on committed tree.
- [x] (P0) Gate file PASS with live Date after verify.

## Where to change

- COMMIT [`../../../../../../../src/layout/AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx)
- [`acceptance-verification-spa-hl-05-t04.md`](./acceptance-verification-spa-hl-05-t04.md)

## Out of scope

F2–F6 docs; HL-06; vitest rewrites; force-push.

## Verification

PASS 2026-08-10T10:01:57Z — HEAD ABSENT orphan · commit `16b4473`.
