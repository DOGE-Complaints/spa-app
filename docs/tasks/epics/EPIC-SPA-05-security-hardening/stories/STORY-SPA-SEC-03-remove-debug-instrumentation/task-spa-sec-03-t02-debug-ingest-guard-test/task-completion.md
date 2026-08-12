# T02 completion — debug ingest guard test

- **Status:** Done
- **Executed:** 2026-06-28 (P3 pkg-000015)

## Changes

- New [`spa-app/src/auth/__tests__/debugIngestGuard.test.js`](../../../../../../../../src/auth/__tests__/debugIngestGuard.test.js)
- Scans `src/**` (excluding `__tests__` dirs in walk, allowlists guard file) for:
  - `ingest/4e2a7ee6`
  - `X-Debug-Session-Id`
  - `127.0.0.1:7840/ingest`
- Wired into `npm run test:run` (vitest default glob).

## Verification (live)

```bash
cd spa-app && npm run test:run -- src/auth/__tests__/debugIngestGuard.test.js
# 1 passed
```

## Evidence

- Pattern precedent: [`serviceRoleEnvGuard.test.js`](../../../../../../../../src/auth/__tests__/serviceRoleEnvGuard.test.js).
