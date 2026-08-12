# Task acceptance gate — SPA-CAB-02-T09 remove dead allowed profile keys export

- **Task:** `task-spa-cab-02-t09-remove-dead-allowed-profile-keys-export`
- **Wave:** `run_mode=spa_cab_02_audit_2026_07_12`
- **Result:** PASS
- **Date:** 2026-07-12T08:48:59Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| `ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS` removed from `accountSummaryState.js`. | PASS | [`accountSummaryState.js`](../../../../../../../../src/components/AccountSummary/accountSummaryState.js) ends at `mapStatusTranslationKey`; no dead export |
| `rg ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS spa-app/src` → 0 hits. | PASS | live grep 2026-07-12 — no matches |
| Full `npm test` green. | PASS | 83 files / 375 passed / 2 skipped |

## Commands (live verification 2026-07-12)

```bash
cd spa-app
rg ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS src
npm test
```
