# Story acceptance gate — STORY-SPA-ID-05

- **Story:** Verification Error States
- **Package:** `pkg-000019-20260629-epic-spa-04-id05-verification-error-states.yaml`
- **Result:** PASS
- **Date:** 2026-06-29

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Все коды из §10 имеют своё состояние по mapping-контракту M37 §15 | PASS | `spa-app/src/auth/verificationErrorMapping.js` `API_CODE_TO_ERROR_KIND`; `verificationErrorMapping.test.js` (11 codes); `phoneVerificationErrorLabels.js` copy per M37 §4–12 |
| Rate Limited имеет cooldown-таймер; Wrong Code — счётчик попыток | PASS | `PhoneVerificationErrorState` cooldown + attempts meta; `PhoneVerificationErrorState.test.jsx`; flow test `RATE_LIMITED` / `CODE_MISMATCH`; puppeteer `test:ui:verify-error` |
| Phone Conflict (409) — мягкий «это вы?», без авто-мёрджа | PASS | `profile_conflict` → `SIGN_IN_TO_EXISTING` + `USE_ANOTHER_NUMBER`; `PhoneVerificationFlow.test.jsx`; no merge logic in flow |
| Country Not Allowed уводит в waitlist (ID-07) | PASS | `onJoinWaitlist` handoff stub on `VerifyPage` (`verify-waitlist-handoff-stub`); `PhoneVerificationFlow.test.jsx` |
| Тексты спокойные, без KYC/обвинения; номер/OTP не раскрываются | PASS | `findForbiddenTermsInErrorLabels()` empty; error UI has no phone/OTP fields |

## §UI verification

| Item | Path / command | Status |
|------|----------------|--------|
| Anchor mockup spec | `task-spa-id-05-t02-.../ui-mockup-spec.md` (extends mockup-37) | PASS |
| Baseline README | `task-spa-id-05-t02-.../ui-baseline/README.md` | PASS |
| Post-implement PNG | `task-spa-id-05-t02-.../ui-baseline/post-implement/code-mismatch-1536x1024.png` | PASS |
| Puppeteer gate | `npm run test:ui:verify-error` | PASS |

## Commands (live verification 2026-06-29)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:verify-error
```

## Task evidence

| Task | Evidence |
|------|----------|
| T01 | `verificationErrorMapping.js`, `verificationErrorMapping.test.js` |
| T02 | `PhoneVerificationErrorState.jsx`, `.css`, ui-mockup-spec, post-implement PNG |
| T03 | Rate/wrong/expired in resolver + component tests |
| T04 | Country/conflict/provider/auth/network labels + flow tests |
| T05 | `PhoneVerificationFlow.jsx` error integration, `VerifyPage.jsx` waitlist stub |
| T06 | Extended Vitest suites (23 tests in PhoneVerification + mapping) |
| T07 | This gate document |
