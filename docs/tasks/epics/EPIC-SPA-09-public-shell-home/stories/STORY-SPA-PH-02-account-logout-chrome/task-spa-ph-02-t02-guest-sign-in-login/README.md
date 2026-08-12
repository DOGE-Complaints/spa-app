# SPA-PH-02-T02 — Guest Sign in → /login

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** backlog FR-PH-02.2 · AC «Guest shows Sign in → `/login`»  
**Depends on:** T01  
**ui_scope:** `visual`  
**extends ui-mockup:** [`../task-spa-ph-02-t01-account-control-guest-auth/`](../task-spa-ph-02-t01-account-control-guest-auth/README.md) (anchor)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

## Purpose
Guest control: outline profile icon + optional «Sign in» label navigates to `/login`; **no** dropdown (M130 State A).

## Risk
Wrong route; opening menu for guest; inventing signup CTA.

## Code Facts (re-verify at execute)
- Login route: [`App.jsx`](../../../../../../../src/App.jsx) `/login` → `LoginPage`.
- L10N key (T06): `publicHome.account.signIn`.

## AC / DoD
- [ ] (P0) Guest click → navigate `/login` (backlog AC #1 / FR-PH-02.2).
- [ ] (P0) Guest has no account dropdown.

## Where to change
- `AccountControl` guest branch + router `Link`/`navigate`

## Out of scope
Auth menu (T03); logout (T04); Backend logout; confirmation modal.

## Verification
```bash
rg -n \"/login\" spa-app/src/components/AccountControl spa-app/src/components/AppShell 2>/dev/null || true
cd spa-app && npm test -- --run AccountControl
```
