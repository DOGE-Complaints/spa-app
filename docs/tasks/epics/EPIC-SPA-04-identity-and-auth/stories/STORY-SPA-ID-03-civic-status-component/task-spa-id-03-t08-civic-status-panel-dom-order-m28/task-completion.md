# T08 completion — CivicStatusPanel DOM order M28 §4

- **Status:** Done
- **Executed:** 2026-06-28 (`run_mode=spa_id_03_audit_2026_06_28`)

## Changes

- [`CivicStatusCard.jsx`](../../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx) — `CivicStatusPanel`: actions block before metadata (M28 §4)
- [`CivicStatusCard.test.jsx`](../../../../../../../../src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx) — state A DOM order assertion

## Verification (live)

```bash
cd spa-app && npm run test:run -- src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx
# 7 passed (incl. M28 §4 order test)

cd spa-app && npm run test:run
# 234 passed | 2 skipped
```

Closes audit F1 ([audit §3 F1](../../../../../../analysis/audit-STORY-SPA-ID-03-execution-2026-06-28.md)).
