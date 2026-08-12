# SPA-ID-09-T02 — Auth login + mapAuthError l10n (ID-01)

**Story:** [`../STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) Scope ID-01, §`auth.*`  
**Depends on:** T01 (dictionary keys)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:51:38Z

## Purpose
Retrofit [LoginPage.jsx](../../../../../../../../src/pages/LoginPage.jsx) and [mapAuthError.js](../../../../../../../../src/auth/mapAuthError.js) to use `useI18n()` / `t('auth.*')` instead of inline EN literals and `AUTH_ERROR_MESSAGES`.

## Risk
Auth flows remain EN-only on default locale `et`; error messages leak hardcoded English on failed login.

## Code Facts (re-verify at execute)
- [`LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx) — grep `useI18n` → 0 at intake; inline strings «Sign In», «Create Account», etc.
- [`mapAuthError.js`](../../../../../../../../src/auth/mapAuthError.js) L3-9 — `AUTH_ERROR_MESSAGES` EN-only object.
- Story §Translations — SSOT for `auth.signIn.*`, `auth.errcode.*`, etc.

## AC / DoD
- [ ] (P0) All user-facing LoginPage strings use `t('auth.*')` keys from T01 dictionary (story AC #1, FR-09.1, FR-09.3).
- [ ] (P0) `mapAuthError` returns codes; message display uses `t('auth.errcode.<code>')` — no `AUTH_ERROR_MESSAGES` EN literals (story AC #1).
- [ ] (P1) Locale switch updates visible login copy immediately when `setLocale` called (story AC #3, FR-09.6).
- [ ] (P1) Update auth-related vitest if present.

## Where to change
- `spa-app/src/pages/LoginPage.jsx`
- `spa-app/src/auth/mapAuthError.js`
- `spa-app/src/pages/__tests__/` or `spa-app/src/auth/__tests__/` (if auth page tests exist)

## Out of scope
- Session shell (T03). Phone/civic (T04–T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth src/pages
grep -r "useI18n" spa-app/src/pages/LoginPage.jsx
```
