# Acceptance — SPA-SEARCH-01-T04

- **Result:** PASS
- **Date:** 2026-06-17
- **Pkg:** pkg-000008

| AC | Status | Evidence |
|----|--------|----------|
| boardQuery validates new enums | PASS | `src/router/boardQuery.js` uses `Object.values(ISSUE_*)`; `boardQuery.test.js` |
| Old codes silently dropped | PASS | `parseBoardQuery('?status=NEW,VERIFIED,INVALID')` → only NEW |
| mockIssues canonical seed | PASS | `src/router/mockIssues.js` — PUBLISHED/INCIDENT/IMPROVEMENT + governed labels |
