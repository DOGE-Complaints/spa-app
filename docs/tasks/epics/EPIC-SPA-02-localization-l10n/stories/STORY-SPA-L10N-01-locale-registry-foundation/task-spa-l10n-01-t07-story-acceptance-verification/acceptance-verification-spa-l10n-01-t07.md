# Acceptance — SPA-L10N-01-T07 (STORY gate)

- **Result:** PASS
- **Date:** 2026-06-16
- **Story:** STORY-SPA-L10N-01-locale-registry-foundation
- **Wave:** pkg-000003

| Story AC | Status | Evidence |
|----------|--------|----------|
| #1 Unified `SUPPORTED_LOCALES` | PASS | `src/i18n/core.js` |
| #2 No hardcoded locale lists in resolve/selector logic | PASS | `rg LANGUAGE_OPTIONS src/` = 0; core uses registry loops |
| #3 Selector from registry | PASS | BoardPage + IssuePage |
| #4 `languages.*` removed | PASS | `dictionaries.js` |
| #5 N-locale readiness | PASS | `core.test.js` fourth-locale test |
| #6 vitest green | PASS | 79 passed |

| Gate | Status |
|------|--------|
| T01–T06 Done | PASS |
| bullrun index sync | PASS |
| backlog INDEX | PASS |
