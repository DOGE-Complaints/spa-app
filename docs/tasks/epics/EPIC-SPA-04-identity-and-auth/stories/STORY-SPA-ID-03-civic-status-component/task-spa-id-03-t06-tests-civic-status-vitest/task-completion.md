# T06 completion — Vitest civic status

- **Status:** Done
- **Executed:** 2026-06-28 (P3 pkg-000017)

## Changes

- [`civicStatusState.test.js`](../../../../../../../../src/auth/__tests__/civicStatusState.test.js) — derivation matrix + phase export guard
- [`CivicStatusCard.test.jsx`](../../../../../../../../src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx) — A–E panels + canonical labels + wallet block

## Verification (live)

```bash
cd spa-app && npm run test:run
# 60 files, 233 passed, 2 skipped (was 220 before ID-03)
```
