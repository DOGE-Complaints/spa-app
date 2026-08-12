# SPA-PH-01-T07 — Vitest nav + key parity

**Status:** Done — P3 PASS 2026-08-04T07:07:39Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** backlog AC + FR-PH-01.L10N  
**Depends on:** T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z

## Purpose
Vitest: nav order, active route marker, mobile menu a11y (open/close), dictionary flat-key parity for `publicHome.nav.*`.

## Risk
Chrome ships without regression guards; key/locale parity drift.

## Code Facts (re-verify at execute)
- Vitest suite lives under `spa-app` (`npm test` / vitest); Button/AppShell tests are prior patterns.
- No PH-01 header tests yet (expected until this task).

## AC / DoD
- [ ] (P0) Tests cover nav order + active route (AC #2).
- [ ] (P0) Flat key parity guard for `publicHome.nav.*` (AC #4).
- [ ] (P1) Mobile menu a11y open/close covered.

## Where to change
- `spa-app/src/**/__tests__/` (Header / PublicHeader / publicHomeDictionary)

## Out of scope
Full story gate artifact (T08); visual screenshot capture (story gate / Path A screenshots).

## Verification
```bash
cd spa-app && npm test -- --run publicHome
# or targeted Header / PublicHeader test file once added
```
