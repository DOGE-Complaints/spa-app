# T03 completion — Vite service_role guard test

- **Status:** Done
- **Executed:** 2026-06-27 (P3 pkg-000014)

## Changes

- New [`spa-app/src/auth/__tests__/serviceRoleEnvGuard.test.js`](../../../../../../../src/auth/__tests__/serviceRoleEnvGuard.test.js): scans `.env.example` (non-comment lines), `package.json`, `src/**`; fails on `VITE_*SERVICE_ROLE*`.
- Wired into default `npm run test:run` (no separate CI file in repo).

## Verification (live)

```bash
cd spa-app && npm run test:run -- src/auth/__tests__/serviceRoleEnvGuard.test.js
# 1 passed
cd spa-app && npm run test:run
# 52 files, 195 passed, 2 skipped
```
