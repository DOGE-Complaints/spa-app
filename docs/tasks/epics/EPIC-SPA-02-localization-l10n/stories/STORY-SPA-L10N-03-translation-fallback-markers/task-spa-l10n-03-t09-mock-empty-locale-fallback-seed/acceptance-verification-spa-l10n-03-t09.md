# Acceptance — SPA-L10N-03-T09

- **Result:** PASS
- **Date:** 2026-06-16
- **Wave:** `run_mode=spa_l10n_03_audit_2026_06_16`

| AC | Status | Evidence |
|----|--------|----------|
| Mock issue with empty/missing locale in content field | PASS | `mockIssues.js` — DE-013 `title` без `en`; `original_locale: ['et','ru','en']` чтобы MT не подавлял fallback |
| Seed assertion test | PASS | `mockIssues.test.js` — DE-013 + `resolveLocalizedTextWithMeta(title,'en').usedFallback === true` |
| Full suite | PASS | 21 files / 97 passed |

| Audit gap | Status |
|-----------|--------|
| F1 fallback-маркер не наблюдаем в FAKE-OLD | Closed (DE-013; UI locale `en` → title fallback) |
