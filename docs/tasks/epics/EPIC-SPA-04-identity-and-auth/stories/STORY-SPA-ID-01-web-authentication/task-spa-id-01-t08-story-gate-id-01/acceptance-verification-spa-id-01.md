# Story acceptance gate — STORY-SPA-ID-01-web-authentication

- **Story:** STORY-SPA-ID-01 — Web Authentication (login / signup / magic-link / reset)
- **Package:** `pkg-000013-20260627-epic-spa-04-id01-web-authentication.yaml`
- **Result:** PASS
- **Date:** 2026-06-27T12:09:55Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Login/signup по email работают до доступа к dashboard; телефон при signup не запрашивается. | PASS | `src/pages/LoginPage.jsx` — states A/B, Supabase `signInWithPassword` / `signUp`; signup support text, no phone field |
| Magic-link и forgot-password имеют свои состояния (sent / reset-requested). | PASS | States C (`magic-link-sent`) + D (`forgot-password`); `signInWithOtp`, `resetPasswordForEmail` |
| 5 auth-ошибок различимы и не generic (особенно `invalid_credentials`). | PASS | `src/auth/mapAuthError.js`; state E with `data-auth-error-code`; vitest `mapAuthError.test.js` |
| Success ведёт на целевой роут; сессия восстановима. | PASS | State F + `resolvePostAuthRedirect`; `useAuthSession.js` + `AuthSessionProvider` in `main.jsx` |
| Экран без story-draft/GPT-контекста (автономный веб-вход). | PASS | `LoginPage` footnote; no GPT/oauth UI; route `/login` only |

## Out of scope (verified absent)

- Phone field at signup — absent in `LoginPage` signup form
- GPT/story-draft chrome — absent
- OAuth code entry (ID-08) — absent
- Identity login endpoints — not implemented (`identityService.fetchMe` only)

## §UI verification

| Check | Status | Evidence |
|-------|--------|----------|
| M121 states A/C/E selectors | PASS | `npm run test:ui:auth-login` — states `login`, `magic-link-sent`, `auth-error` |
| ui-mockup-spec (Path A @mockup M121) | PASS | `task-spa-id-01-t03-login-route-page-shell/ui-mockup-spec.md` |
| Post-implement PNG (anchor) | PASS | `task-spa-id-01-t03-login-route-page-shell/ui-post-implement/login-state-a-1536x1024.png` |

## Commands (live verification 2026-06-27)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run          # 188 passed, 2 skipped
cd spa-app && npm run test:ui:auth-login
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
