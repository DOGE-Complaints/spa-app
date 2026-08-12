# SPA-PH-02-T07 — Vitest guest/auth/logout

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** backlog T07 · AC #1–#3  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

## Purpose
Vitest: guest Sign in → `/login`; auth menu Profile + Log out only; logout calls client `signOut` and redirects `/board`; assert **no** BE logout fetch.

## Risk
Flaky session mocks; testing implementation detail of supabase internals.

## Code Facts (re-verify at execute)
- Pattern: PH-01 [`Header.publicNav.test.jsx`](../../../../../../../src/components/AppShell/__tests__/Header.publicNav.test.jsx); session mocks from ID/CAB tests.

## AC / DoD
- [ ] (P0) Tests cover guest → login path (AC #1).
- [ ] (P0) Tests cover auth menu items Profile + Log out only (AC #2).
- [ ] (P0) Tests mock `signOut` + assert `/board` redirect; no `/logout` HTTP (AC #3).
- [ ] (P0) Key parity / account FLAT_KEYS covered (with T06).

## Where to change
- `spa-app/src/components/AccountControl/__tests__/` (or AppShell `__tests__`)
- Extend `publicHomeDictionary` tests if needed

## Out of scope
Puppeteer full-cycle (story UI pipeline at P3); E2E against live Supabase required only if story gate demands.

## Verification
```bash
cd spa-app && npm test -- --run AccountControl publicHome
```
