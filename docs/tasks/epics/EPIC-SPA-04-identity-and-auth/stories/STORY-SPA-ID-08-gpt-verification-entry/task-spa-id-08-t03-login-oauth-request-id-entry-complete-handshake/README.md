# SPA-ID-08-T03 — Login oauth_request_id entry + complete handshake

**Story:** [`../STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md)  
**Decision Ref:** [mockup-120](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) states B–D; FR-08.2, FR-08.3, FR-08.8; backlog §Routes/API  
**Depends on:** T01, T02  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-02T10:51:50Z

## Purpose
Wire `/login?oauth_request_id=<id>`: show M120 B resolving state, reuse ID-01 login/signup forms with GPT-context copy (`gptBridge.login.*` / `gptBridge.signup.*`). After Supabase auth success → call T01 `completeOAuthAuthorize`; on 302 follow redirect to ChatGPT; on 403 `verification_required` navigate to `verify_url`; on already-verified happy path show interim state before redirect.

## Risk
Skipping `complete` after auth leaves user stuck on generic success screen — OAuth handshake never finishes (AC #1).

## Code Facts (re-verify at execute)
- [`LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx) — `useSearchParams` for `dev_auth_state` / `redirect` only; `completeAuthSuccess()` has no OAuth branch.
- [`App.jsx`](../../../../../../../../src/App.jsx) — `/login` route exists (public, outside shell).
- T01 `oauthService` + `gptBridgeFlowState` (scaffold target).
- ID-01 auth forms and `identityService.fetchMe` already wired.

## AC / DoD
- [ ] (P0) Read `oauth_request_id` from query; persist via T01 storage (AC #1, FR-08.8).
- [ ] (P0) After login/signup with active `oauth_request_id` → `POST /oauth/authorize/complete` (AC #1).
- [ ] (P0) 302 → `window.location.assign(location)` or equivalent browser redirect to ChatGPT (AC #2).
- [ ] (P0) 403 `verification_required` → navigate to `verify_url` from response (AC #3).
- [ ] (P0) `phone_verified=true` on complete → immediate 302 without OTP (AC #4).
- [ ] (P1) M120 B resolving UI while session/oauth handshake resolves (FR-08.2).
- [ ] (P1) GPT-context headings via `t('gptBridge.login.*')` / `t('gptBridge.signup.*')` (AC #7).

## Where to change
- `spa-app/src/pages/LoginPage.jsx`
- `spa-app/src/pages/__tests__/LoginPage.test.jsx` (oauth branch tests)
- Optional: `spa-app/src/components/GptBridge/GptBridgeResolvingPanel.jsx` (if extracted from T05)

## Out of scope
- Verify-page phone flow (T04). Persistent draft banner shell (T05). Full success panel (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/LoginPage.test.jsx
cd spa-app && npm run dev
# manual: /#/login?oauth_request_id=mock-id (mock mode)
```
