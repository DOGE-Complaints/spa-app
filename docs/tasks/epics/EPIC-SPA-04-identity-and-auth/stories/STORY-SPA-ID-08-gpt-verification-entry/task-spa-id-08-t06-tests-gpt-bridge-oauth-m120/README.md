# SPA-ID-08-T06 — Tests GPT bridge OAuth + M120 gate

**Story:** [`../STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md) AC #1–#7; [mockup-120](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md) selectors  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-02T10:51:50Z

## Purpose
Regression coverage for GPT OAuth bridge: Vitest for oauth client, login oauth branch, verify context branch, i18n completeness; puppeteer script for M120 visual gate (resolving, verification_required path, success, already-verified) using `data-testid` from T05/brief.

## Risk
Missing `verification_required` retry test allows production regression on AC #3. Puppeteer without stable selectors causes flaky M120 gate.

## Code Facts (re-verify at execute)
- Prior ID waves: `country-format-m127-screenshot.mjs` pattern in ID-11 T06 folder.
- T01–T05 implementation paths (scaffold targets).
- Mock mode in `oauthService` enables offline handshake tests.

## AC / DoD
- [ ] (P0) Vitest: oauth 302 happy path (AC #2).
- [ ] (P0) Vitest: flat 403 `verification_required` → verify_url navigation contract (AC #3).
- [ ] (P0) Vitest: login with `oauth_request_id` calls complete (AC #1).
- [ ] (P0) Vitest: verify `context=custom_gpt` retries complete after phone success (AC #3).
- [ ] (P0) Vitest: already-verified skips OTP path (AC #4).
- [ ] (P1) Vitest: `gptBridge.*` keys used in components (AC #7).
- [ ] (P1) Puppeteer M120 script: draft banner visible + success CTA selectors (AC #5, #2).
- [ ] (P1) Full `npm run test:run` green.

## Where to change
- Extend: `spa-app/src/auth/__tests__/oauthService.test.js`
- Extend: `spa-app/src/pages/__tests__/LoginPage.test.jsx`, `VerifyPage.test.jsx`
- New: `spa-app/scripts/puppeteer/gpt-bridge-m120-screenshot.mjs` (or under task folder)
- New: `spa-app/src/components/GptBridge/__tests__/GptBridgePanels.test.jsx`

## Out of scope
- Story gate doc (T07). Identity backend integration tests.

## Verification
```bash
cd spa-app && npm run test:run
node spa-app/scripts/puppeteer/gpt-bridge-m120-screenshot.mjs
```
