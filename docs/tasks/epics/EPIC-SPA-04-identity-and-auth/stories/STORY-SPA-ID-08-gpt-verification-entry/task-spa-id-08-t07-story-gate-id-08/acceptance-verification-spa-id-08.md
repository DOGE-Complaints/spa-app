# Story acceptance gate — STORY-SPA-ID-08-gpt-verification-entry

- **Story:** GPT Verification Entry (мост из Custom GPT)
- **Package:** `pkg-000025-20260702-epic-spa-04-id08-gpt-verification-entry.yaml`
- **Result:** PASS
- **Date:** 2026-07-02T11:11:49Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Точка входа `/login?oauth_request_id=<id>` проводит login/signup и вызывает `POST /oauth/authorize/complete` | PASS | [`LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx) `runOAuthComplete`; [`oauthService.js`](../../../../../../../../src/auth/oauthService.js); tests `oauthService.test.js` |
| Happy-path: `/complete` → 302 в ChatGPT; экран «Return to ChatGPT» | PASS | `oauthService` 302 `Location`; [`GptBridgeSuccessPanel.jsx`](../../../../../../../../src/components/GptBridge/GptBridgeSuccessPanel.jsx); puppeteer `g-success-m120` |
| `verification_required` (403 flat) → `verify_url` → phone → retry `/complete` → 302 | PASS | `OAuthVerificationRequiredError`; [`VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx) `completeGptOAuthHandshake` |
| Already-verified → сразу 302 code, без OTP («You're ready») | PASS | `GptBridgeAlreadyVerifiedPanel`; mock `phone_verified` + `mock-oauth-happy`; puppeteer `h-already-verified-m120` |
| Story-draft preserved виден на всех состояниях | PASS | [`GptDraftBanner.jsx`](../../../../../../../../src/components/GptBridge/GptDraftBanner.jsx); login/verify/resolving/success |
| Credentials/номер/OTP не проходят через GPT | PASS | FR-08.7 — only DOGEstonia web forms; privacy in UI copy |
| Все строки локализованы et/ru/en через `t()` | PASS | `gptBridge.*` in [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js); snapshot tests green |

## UI (M120 anchor T05)

| Check | Status | Evidence |
|-------|--------|----------|
| ui-mockup-spec / Path A @mockup M120 | PASS | [`ui-mockup-spec.md`](../task-spa-id-08-t05-gpt-bridge-ui-shell-m120-draft-banner-success/ui-mockup-spec.md) |
| post-implement PNG B/C/G/H | PASS | [`ui-baseline/post-implement/`](../task-spa-id-08-t05-gpt-bridge-ui-shell-m120-draft-banner-success/ui-baseline/post-implement/) |
| `data-testid` selectors | PASS | STORY-UX-MOCKUP-BRIEF §5; puppeteer gate |

## Commands (live verification 2026-07-02)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:gpt-bridge-m120
```

**Vitest:** 356 passed (2026-07-02). **Puppeteer M120:** 4/4 states saved.
