# SPA-ID-08-T01 — OAuth authorize/complete client + flow state

**Story:** [`../STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md) §API-интеграция, FR-08.8; [`verification_required.py`](../../../../../../../../../doge-identity-service/src/core/oauth/verification_required.py)  
**Depends on:** STORY-SPA-ID-01 Done (`pkg-000013`)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-02T10:51:50Z

## Purpose
Implement `oauthService` (or extend `identityService`) for `POST /oauth/authorize/complete`: follow **302** `Location` (ChatGPT redirect), parse **flat** 403 `{error, reason, verify_url}` (not nested `error.code` envelope). Add `gptBridgeFlowState.js` phase enum + `sessionStorage` persistence for `oauth_request_id` across verify resume.

## Risk
Wrong response-shape parsing breaks `verification_required` branch (AC #3). Treating OAuth 403 like identity envelope causes silent failures.

## Code Facts (re-verify at execute)
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — `/me`, `/auth/phone/*` only; no `/oauth/authorize/complete`.
- grep `oauth_request_id|gptBridge` in [`spa-app/src/`](../../../../../../../../src/) → **0** at scaffold.
- Backend flat body: [`verification_required.py:14-23`](../../../../../../../../../doge-identity-service/src/core/oauth/verification_required.py) — `{error, reason, verify_url}`.
- Backend route: [`asgi_app.py`](../../../../../../../../../doge-identity-service/src/core/api/asgi_app.py) — `POST /oauth/authorize/complete`.

## AC / DoD
- [ ] (P0) `completeOAuthAuthorize(oauthRequestId)` → `{ kind: 'redirect', location }` on 302 (AC #2, FR-08.8).
- [ ] (P0) 403 flat `verification_required` → typed `OAuthVerificationRequiredError` with `verify_url` (AC #3, FR-08.8).
- [ ] (P0) `gptBridgeFlowState.js`: phases resolving / login_required / verify_required / success / already_verified + `persistOAuthRequestId` / `readOAuthRequestId` (FR-08.8).
- [ ] (P1) Mock mode mirrors happy 302 + verification_required paths for Vitest (T06).
- [ ] (P1) Unit tests: 302 redirect, 403 flat parse, sessionStorage round-trip.

## Where to change
- New: `spa-app/src/auth/oauthService.js` (or extend `identityService.js`)
- New: `spa-app/src/auth/gptBridgeFlowState.js`
- New: `spa-app/src/auth/__tests__/oauthService.test.js`
- New: `spa-app/src/auth/__tests__/gptBridgeFlowState.test.js`

## Out of scope
- LoginPage / VerifyPage wiring (T03, T04). UI panels (T05). i18n keys (T02).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/oauthService.test.js src/auth/__tests__/gptBridgeFlowState.test.js
```
