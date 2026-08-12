# Acceptance verification — SPA-SEARCH-04-T09

**Wave:** `run_mode=spa_search_04_audit_2026_06_18`  
**Audit gap:** F4 — native date input locale  
**Date:** 2026-06-18

## Evidence

| AC | Result | Proof |
|----|--------|-------|
| `document.documentElement.lang` syncs with `locale` | PASS | [`I18nProvider.jsx`](../../../../../../../src/i18n/I18nProvider.jsx) `useEffect` + `syncDocumentElementLang` |
| Date inputs inherit locale | PASS | [`DateRangeFilter.jsx`](../../../../../../../src/components/Filters/DateRangeFilter.jsx) `lang={locale}`; [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) passes `locale` |
| Unit tests | PASS | [`I18nProvider.langSync.test.jsx`](../../../../../../../src/i18n/__tests__/I18nProvider.langSync.test.jsx); [`DateRangeFilter.test.jsx`](../../../../../../../src/components/Filters/__tests__/DateRangeFilter.test.jsx) |

## Commands

```bash
cd spa-app && npx vitest run src/i18n/__tests__/I18nProvider.langSync.test.jsx src/components/Filters/__tests__/DateRangeFilter.test.jsx
```

**Suite:** 38 files / 150 passed (2026-06-18).
