# SPA-ID-08-T04 — Verify context=custom_gpt + resume complete

**Story:** [`../STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md)  
**Decision Ref:** FR-08.1, FR-08.4, FR-08.6, FR-08.8; [mockup-120](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) states E–F  
**Depends on:** T01, T02  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-02T10:51:50Z

## Purpose
On `/verify?context=custom_gpt` (and `context` from identity `verify_url`), wrap [`VerifyPage`](../../../../../../../../src/pages/VerifyPage.jsx) with GPT bridge context: reuse ID-04 [`PhoneVerificationFlow`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) and ID-05 error panels. After `phone_verified=true`, retry T01 `completeOAuthAuthorize` with persisted `oauth_request_id` → 302 ChatGPT. Do **not** navigate to `/dashboard` on GPT path completion.

## Risk
Default `handleComplete` → `/dashboard` breaks GPT return flow (AC #3). Lost `oauth_request_id` after verify prevents second `/complete`.

## Code Facts (re-verify at execute)
- [`VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx) — no `useSearchParams` for `context`; `handleComplete` → `navigate('/dashboard')`.
- [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) — ID-04 OTP flow + ID-05 errors ready.
- T01 sessionStorage for `oauth_request_id` (scaffold target).
- FR-08.7 — never display phone/OTP in GPT-context banners.

## AC / DoD
- [ ] (P0) Detect `context=custom_gpt` (or `custom_gpt` from verify_url) and enter GPT bridge mode (FR-08.1, AC #3).
- [ ] (P0) Reuse phone verify flow without reimplementing OTP UI (FR-08.4, AC #3).
- [ ] (P0) After verify success → retry `/oauth/authorize/complete` → 302 ChatGPT (AC #3, FR-08.8).
- [ ] (P0) GPT path completion does not redirect to `/dashboard` (AC #3).
- [ ] (P1) ID-05 compact error side-panel behavior preserved (FR-08.6).
- [ ] (P1) Privacy: no password/phone/OTP in GPT shell copy (FR-08.7, AC #6).

## Where to change
- `spa-app/src/pages/VerifyPage.jsx`
- `spa-app/src/pages/__tests__/VerifyPage.test.jsx`
- Optional hook: `spa-app/src/auth/useGptBridgeContext.js`

## Out of scope
- OAuth client implementation (T01). Success / already-verified panels (T05). Login entry (T03).

## Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/VerifyPage.test.jsx
cd spa-app && npm run dev
# manual: /#/verify?context=custom_gpt (mock unverified → verify → complete retry)
```
