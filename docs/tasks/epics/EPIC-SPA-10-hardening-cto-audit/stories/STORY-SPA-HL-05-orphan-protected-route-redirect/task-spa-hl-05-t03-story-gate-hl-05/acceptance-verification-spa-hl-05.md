# Story acceptance gate — STORY-SPA-HL-05-orphan-protected-route-redirect

- **Story:** Orphan ProtectedRouteRedirect cleanup / wire
- **Package:** `pkg-000063-20260810-epic-spa-10-hl-05-orphan-protected-route.yaml`
- **Result:** PASS
- **Date:** 2026-08-10T09:42:36Z
- **Scaffolded:** 2026-08-10T09:35:22Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Orphan export устранён **или** wired с тестом/маршрутом | PASS | Delete · `ProtectedRouteRedirect` ABSENT in `spa-app/src` · [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx) |
| Короткий note: какая модель guard канонична сейчас | PASS | Pipeline Notes Decision + backlog **Canonical guard: overlay** |
| `verify:security` / релевантные session tests зелёные | PASS | vitest sessionShellState + sessionRoutePolicy **19/19** |

## FR checklist

| FR | Status | Evidence |
|----|--------|----------|
| FR-HL-05.1 no orphan redirect API or wired | PASS | export removed · no imports |
| FR-HL-05.2 documented guard model matches code | PASS | overlay / `isProtectedPath` documented · code unchanged for overlay path |
| FR-HL-05.3 session shell / overlay not broken | PASS | 19/19 dedicated tests |

## Commands

```bash
rg -n "ProtectedRouteRedirect" spa-app/src
# ABSENT
npx vitest run src/auth/__tests__/sessionShellState.test.js src/router/__tests__/sessionRoutePolicy.test.js
# Test Files 2 passed · Tests 19 passed (2026-08-10T09:42:36Z)
```
