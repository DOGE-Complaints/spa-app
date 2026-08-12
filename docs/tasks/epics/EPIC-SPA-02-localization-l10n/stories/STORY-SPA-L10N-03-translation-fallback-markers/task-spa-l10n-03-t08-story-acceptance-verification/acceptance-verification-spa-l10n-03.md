# Acceptance — STORY-SPA-L10N-03

- **Result:** PASS
- **Date:** 2026-06-16
- **Pkg:** pkg-000005

| AC | Status | Evidence |
|----|--------|----------|
| `original_locale` + MT marker by membership | PASS | `translationMarkers.js`, `IssueCard.jsx`, `IssuePage.jsx`, `mockIssues.js` DE-002 |
| Absent/empty `original_locale` → no MT, no crash | PASS | `shouldShowMtMarker`, `normalizeOriginalLocales`, tests |
| Content fallback → language indicator | PASS | `resolveLocalizedTextWithMeta`, `TranslationMarker` fallback kind |
| Humanize label → untranslated marker | PASS | `formatLabelKeyWithMeta`, chip markers |
| Markers calm, layout OK | PASS | `TranslationMarker.css`, IssueCard/Details tests |
| `npx vitest run` green | PASS | 21 files / 95 passed |

| Gap | Status |
|-----|--------|
| GL-3 | Closed (L10N-03) |
| GL-4 | Closed (backend delivered; SPA consumes) |
