# SPA-SEC-01-T03 — Vite service_role guard test

**Story:** [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro` (guard-only; precedent [`localeHardcodeGuard.test.js`](../../../../../../../../src/i18n/__tests__/localeHardcodeGuard.test.js))

## Purpose
Vitest guard: repo scan `.env.example`, `package.json`, `src/**` — fail on `VITE_.*SERVICE_ROLE` (или `SERVICE_ROLE` в `VITE_*` context).

## Risk
Regression: переменная снова попадёт в tracked files без CI failure.

## Code Facts (re-verify at execute)
- Guard precedent: [`spa-app/src/i18n/__tests__/localeHardcodeGuard.test.js`](../../../../../../../../src/i18n/__tests__/localeHardcodeGuard.test.js).
- `npm run test:run` — existing vitest entry (wire guard into default test run).
- Optional dedicated script `test:guard:env` if no GitHub Actions env check exists.

## AC / DoD
- [ ] New vitest file scans tracked paths; fails on `VITE_*SERVICE_ROLE*` pattern (story AC #2).
- [ ] Guard runs via `npm run test:run` (or documented npm script invoked by CI).
- [ ] Guard passes on clean tree after T01–T02.

## Where to change
- New: `spa-app/src/**/__tests__/*serviceRole*Guard*.test.js` (or `spa-app/src/auth/__tests__/`)
- Optional: `spa-app/package.json` scripts

## Out of scope
- Bundle post-build scan — T04.
- `.env` local purge — T01 (gitignored, guard may skip `.env` if not tracked).

## Verification
```bash
cd spa-app && npm run test:run -- --grep service.role
# intentional fail test: add VITE_FOO_SERVICE_ROLE to .env.example → guard must fail
```
