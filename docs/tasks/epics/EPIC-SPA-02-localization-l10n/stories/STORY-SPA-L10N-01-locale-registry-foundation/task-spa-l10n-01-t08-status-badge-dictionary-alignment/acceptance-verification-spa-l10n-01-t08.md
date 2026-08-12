# Acceptance — SPA-L10N-01-T08

- **Result:** PASS
- **Date:** 2026-06-16

| AC | Status | Evidence |
|----|--------|----------|
| Remove STATUS_LABELS; use t('status.*') | PASS | `StatusBadge.jsx` — `useI18n()` |
| DEFAULT_LOCALE via provider (not hardcoded 'en') | PASS | no `locale = 'en'` default on component |
| Tests updated | PASS | `StatusBadge.test.jsx`, `IssueCard.test.jsx` |
| Visual strings unchanged | PASS | same dictionary values; UNKNOWN added |
| vitest green | PASS | 80/80 |

| Audit gap | Status |
|-----------|--------|
| F1 StatusBadge island | Closed |
| F3 AC#5 app completeness | Closed (status via dictionary) |
