# Acceptance — SPA-L10N-03-T10

- **Result:** PASS
- **Date:** 2026-06-16
- **Wave:** `run_mode=spa_l10n_03_audit_2026_06_16`

| AC | Status | Evidence |
|----|--------|----------|
| institution через `resolveLocalizedTextWithMeta` | PASS | `IssuePage.jsx` — `institutionMeta` + `institutionMeta.text` |
| Fallback marker при `!showMtMarker && shouldShowContentFallbackMarker` | PASS | `IssuePage.jsx` — `TranslationMarker kind="fallback"` у institution |
| Institution fallback seed path | PASS | DE-013 `institution` без `en`; `mockIssues.test.js` institution meta assertion |
| Full suite | PASS | 21 files / 97 passed |

| Audit gap | Status |
|-----------|--------|
| F2 institution без пофилдового fallback-маркера | Closed |
