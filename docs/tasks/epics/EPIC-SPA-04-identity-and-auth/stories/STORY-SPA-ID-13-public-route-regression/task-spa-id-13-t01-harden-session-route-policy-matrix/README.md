# SPA-ID-13-T01 — Harden sessionRoutePolicy unit matrix

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** backlog FR-ID13.1–2, FR-ID13.7; D-ID13-1; Scope T01  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T19:28:37Z

## Purpose
Усилить unit-матрицу public/protected так, чтобы регресс «`/board` или `/issue/:id` попали в protected» падал в CI; явно зафиксировать `/story/submit` и nested `/issue/…`.

## Risk
Без hardening матрицы публичный browse может сломаться при правках shell/submit без падения unit.

## Code Facts (re-verify at execute)
- [`sessionRoutePolicy.js`](../../../../../../../../src/router/sessionRoutePolicy.js): `PUBLIC_PATHS = {'/', '/board', '/login'}`; `/issue/` via `startsWith`; `PROTECTED_PREFIXES` includes `/story/submit`.
- [`sessionRoutePolicy.test.js`](../../../../../../../../src/router/__tests__/sessionRoutePolicy.test.js): public `/board`, `/issue/demo-1`, `/`, `/login`; protected dashboard/profile/verify/submit/compose; contrast board/`/` not protected.
- Gap: нет явного `isProtectedPath('/issue/…') === false`; нет nested `/issue/a/b`.

## Gap
Hardening matrix Open (backlog Done vs Open → T01).

## AC / DoD
- [ ] (P0) **FR-ID13.1:** `isPublicPath` true для `/`, `/board`, `/login`, `/issue/…` (вкл. nested `/issue/a/b`); `isProtectedPath` false на этих путях.
- [ ] (P0) **FR-ID13.2:** `isProtectedPath` true для `/dashboard`, `/profile`, `/verify`, `/story/submit`, `/story/compose` (+ prefix children).
- [ ] (P0) **FR-ID13.7:** `sessionRoutePolicy.js` не менять без failing test.

## Where to change
- EXTEND `spa-app/src/router/__tests__/sessionRoutePolicy.test.js`
- Runtime `sessionRoutePolicy.js` — только fail-first (вне нормального path)

## Out of scope
- Overlay cross-test (T02); Authorization fetch (T03); UI smoke (T04); docs (T05); gateway GW-PUBLIC-01.

## Verification
```bash
cd spa-app && npx vitest run src/router/__tests__/sessionRoutePolicy.test.js
```
