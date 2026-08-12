# Acceptance — SPA-L10N-02-T01

- **Result:** PASS
- **Date:** 2026-06-16

| AC | Status | Evidence |
|----|--------|----------|
| Unit-test for label aggregation exists | PASS | `src/i18n/__tests__/collectLabelKeysFromIssues.test.js` |
| Unique sorted `string[]` output | PASS | `collectLabelKeysFromIssues` returns `Array.from(set).sort(...)` |
| `includeCore: true` unions translated core | PASS | `collectLabelKeysFromIssues.js` adds `AVAILABLE_LABELS` unless `includeCore === false` |
