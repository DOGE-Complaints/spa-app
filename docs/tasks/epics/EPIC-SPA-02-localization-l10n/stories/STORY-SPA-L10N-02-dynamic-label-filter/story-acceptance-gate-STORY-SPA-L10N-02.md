# Story Acceptance Gate — STORY-SPA-L10N-02

- **Result:** PASS
- **Date:** 2026-06-16
- **Wave:** `pkg-000004`

| AC | Status | Evidence |
|----|--------|----------|
| Dropdown includes labels from loaded issues | PASS | `src/pages/BoardPage.jsx`, `src/i18n/collectLabelKeysFromIssues.js` |
| Outside-core label selectable and filters correctly | PASS | `collectLabelKeysFromIssues.test.js`, `InMemoryIssueRepository.test.js` |
| `AVAILABLE_LABELS` role documented as translated core | PASS | `src/i18n/labelKeys.js`, `docs/i18n-architecture.md` |
| Empty selection behavior deterministic, no crash | PASS | `LabelsFilter.jsx`, `LabelsFilter.test.jsx` |
| Tests green + issue-set aggregation test present | PASS | targeted vitest run: 4 files, 19 tests |
