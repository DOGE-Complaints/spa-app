# Acceptance — SPA-L10N-02-T08

- **Result:** PASS
- **Date:** 2026-06-16

| AC | Status | Evidence |
|----|--------|----------|
| BoardPage strict data-only filter | PASS | `BoardPage.jsx` — `collectLabelKeysFromIssues(issues, { includeCore: false })` |
| Empty issues → disabled filter path reachable | PASS | `includeCore: false` + `LabelsFilter` `disabled={!hasAvailableLabels}` |
| Unit tests unchanged/green | PASS | `collectLabelKeysFromIssues.test.js`, `LabelsFilter.test.jsx` |
| Full suite | PASS | 20 files / 86 passed |

| Audit gap | Status |
|-----------|--------|
| F1 includeCore union / disabled недостижим | Closed |
