# SPA-ID-04-T05 — /verify route + flow integration

**Story:** [`../STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) §FR-04.5/04.8; [`AppShellLayout.jsx`](../../../../../../../../src/layout/AppShellLayout.jsx); [`DashboardPage.jsx`](../../../../../../../../src/pages/DashboardPage.jsx)  
**Depends on:** T04  
**ui_scope:** `mixed`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T16:53:10Z

## Purpose
`VerifyPage` replaces `ProtectedVerifyPage` placeholder; export `PhoneVerificationFlow`; wire `CivicStatusCard` `flowPhase` during active flow; **FR-04.8** skip flow when `phone_verified=true`; `onComplete` triggers `GET /me` refresh via session shell retry.

## Risk
Placeholder left on `/verify` blocks user path from dashboard; missing phase wiring breaks ID-03 civic card states B/C/E.

## Code Facts (re-verify at execute)
- [`AppShellLayout.jsx`](../../../../../../../../src/layout/AppShellLayout.jsx) — `ProtectedVerifyPage` placeholder at intake.
- [`DashboardPage.jsx`](../../../../../../../../src/pages/DashboardPage.jsx) — `onVerify={() => navigate('/verify')}` stub.

## AC / DoD
- [x] (P0) New `VerifyPage.jsx` hosts `PhoneVerificationFlow` inline (FR-04.5; AC #2).
- [x] (P0) `AppShellLayout` uses real `VerifyPage` instead of placeholder.
- [x] (P0) During flow, `CivicStatusCard` receives live `flowPhase` from verification state (ID-03 integration).
- [x] (P0) When `phone_verified=true`, skip verification UI — show verified state / redirect per FR-04.8 (AC #5).
- [x] (P0) On success: close flow, retry `fetchMe` / session shell refresh, resume interrupted action if `onComplete` provided (FR-04.5; AC #4).
- [x] (P1) Dashboard `Verify` CTA navigates to working flow.

## Where to change
- New: `spa-app/src/pages/VerifyPage.jsx`
- Modify: `spa-app/src/layout/AppShellLayout.jsx`
- Modify: `spa-app/src/pages/DashboardPage.jsx` (optional open-flow hook)
- Export: `spa-app/src/components/PhoneVerification/index.js`

## Out of scope
- Protected action gate resume (ID-06). GPT entry (ID-08). Error UI (ID-05).

## Verification
```bash
cd spa-app && npm run dev
# manual: /#/verify — full happy path; /#/dashboard — civic card phase during flow
npm run test:ui:board-shell  # regression (pre-existing column count issue unrelated)
```
