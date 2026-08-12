# SPA-ID-03-T05 — Dashboard route + CivicStatus integration

**Story:** [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)  
**Decision Ref:** backlog Routes `/dashboard`; FR-03.6 reuse; [`App.jsx`](../../../../../../../../src/App.jsx) routing  
**Depends on:** T03, T04  
**ui_scope:** `mixed`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:45:56Z

## Purpose
Add protected route `/dashboard` (backlog Routes verbatim) with host page embedding `<CivicStatusCard />` fed from `useSessionShell().profile` + default flow phase `idle`. Single export for reuse in ID-04/06/08 (FR-03.6).

## Risk
Embedding card only on `/profile` violates backlog route `/dashboard`. Duplicating card wrappers breaks reuse AC.

## Code Facts (re-verify at execute)
- [`App.jsx`](../../../../../../../../src/App.jsx) — no `/dashboard` route at intake; `/profile` is placeholder in [`AppShellLayout.jsx`](../../../../../../../../src/layout/AppShellLayout.jsx).
- [`SessionShellContext.jsx`](../../../../../../../../src/auth/SessionShellContext.jsx) — `useSessionShell()` exposes `profile`.

## AC / DoD
- [ ] (P0) Route `/#/dashboard` under `AppShellLayout`, protected (session shell applies).
- [ ] (P0) `DashboardPage` (or equivalent) renders one `<CivicStatusCard />` with `/me` profile fields.
- [ ] (P0) `CivicStatusCard` exported from `src/components/CivicStatus/index.js` for reuse (FR-03.6; story AC #1).
- [ ] (P1) No second verification card component elsewhere in this story.

## Where to change
- New: `spa-app/src/pages/DashboardPage.jsx`
- Modify: `spa-app/src/App.jsx` — `/dashboard` route
- `spa-app/src/components/CivicStatus/index.js` — public export

## Out of scope
- Full user cabinet (epic-05 mockups). OTP flow (ID-04). GPT gate (ID-08).

## Verification
```bash
cd spa-app && npm run dev
# logged-in session → http://localhost:5173/#/dashboard shows CivicStatusCard
cd spa-app && npm run test:run
```
