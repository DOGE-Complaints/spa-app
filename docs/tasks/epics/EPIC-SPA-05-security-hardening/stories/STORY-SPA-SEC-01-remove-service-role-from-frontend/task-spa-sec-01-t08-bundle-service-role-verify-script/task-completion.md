# T08 completion — bundle service_role verify script

- **Status:** Done
- **Executed:** 2026-06-27 (`run_mode=spa_sec_01_audit_2026_06_27`)

## Changes

- New [`scripts/verify-bundle-no-service-role.mjs`](../../../../../../../scripts/verify-bundle-no-service-role.mjs)
- New [`serviceRoleBundleGuard.test.js`](../../../../../../../src/auth/__tests__/serviceRoleBundleGuard.test.js) (skips if no `dist/assets`)
- [`package.json`](../../../../../../../package.json): `verify:bundle:no-service-role`, `test:guard:bundle`

## Verification (live)

```bash
cd spa-app && npm run build && npm run verify:bundle:no-service-role
# ok: bundle clean
cd spa-app && npm run test:run
# 53 files, 197 passed
```

False positives: expect empty after T01 env purge. Closes audit F2.
