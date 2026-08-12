# Acceptance — SPA-L10N-02-T02

- **Result:** PASS
- **Date:** 2026-06-16

| AC | Status | Evidence |
|----|--------|----------|
| BoardPage no longer uses hardcoded `AVAILABLE_LABELS` as filter source | PASS | `src/pages/BoardPage.jsx` imports `collectLabelKeysFromIssues` |
| `availableLabels` built from loaded issues | PASS | `useMemo(() => collectLabelKeysFromIssues(issues), [issues])` |
| Outside-core label can propagate into filter options | PASS | aggregation source = `issues[].labels` from `issueService.getIssues` response |
