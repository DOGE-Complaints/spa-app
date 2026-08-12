# BULLRUN — SPA-L10N-01-T08

- **Wave:** `run_mode=spa_l10n_01_audit_2026_06_16`
- **Process:** P6 Execute
- **Date:** 2026-06-16

| Phase | Status | Evidence |
|-------|--------|----------|
| Refactor | Done | `StatusBadge.jsx` — `useI18n()` + `t('status.*')`; removed `STATUS_LABELS` |
| Dictionary | Done | `dictionaries.js` — added `status.UNKNOWN` × et/ru/en |
| Callers | Done | BoardPage, IssuePage, IssueCard — removed `locale` prop on StatusBadge |
| Tests | Done | `StatusBadge.test.jsx`, `IssueCard.test.jsx` — I18nProvider + localStorage mock |
