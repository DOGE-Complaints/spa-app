# SPA-PH-02-T04 — signOut + redirect /board

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** backlog FR-PH-02.4 · AC «Log out clears session via client signOut… no BE logout» · api-req §1.2  
**Depends on:** T03  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

## Purpose
Wire Log out → `supabase.auth.signOut()` (or thin project helper wrapping it) → redirect `/board`. No confirmation modal v1. **No** identity `/logout` HTTP call.

## Risk
Calling inventing BE logout; failing to clear session shell; wrong redirect.

## Code Facts (re-verify at execute)
- [`supabaseClient.js`](../../../../../../../src/auth/supabaseClient.js) — `createClient`; `rg signOut spa-app/src` = **0** (gap).
- Session shell must observe logged_out after signOut (ID-02 patterns).
- api-req §1.2: client-only logout.

## AC / DoD
- [ ] (P0) Log out calls client `signOut` (backlog AC #3 / FR-PH-02.4).
- [ ] (P0) After logout user lands on `/board`.
- [ ] (P0) No BE `/logout` request invented or called.

## Where to change
- `AccountControl` logout handler
- Optional thin helper near `supabaseClient.js` / identityService (no new BE)

## Out of scope
Backend logout endpoint; confirmation modal; PH-01 chrome.

## Verification
```bash
rg -n 'signOut' spa-app/src
rg -n '/logout' spa-app/src || echo 'no_be_logout_ok'
cd spa-app && npm test -- --run AccountControl signOut
```
