# Acceptance — STORY-SPA-SEARCH-01

- **Result:** PASS
- **Date:** 2026-06-17
- **Pkg:** pkg-000008

| AC | Status | Evidence |
|----|--------|----------|
| #1 Domain enums + AVAILABLE_LABELS | PASS | `types.js`, `labelKeys.js` |
| #2 i18n dictionaries et/ru/en | PASS | `dictionaries.js`; `labelDisplay.test.js` completeness guard |
| #3 StatusBadge all statuses + fallback | PASS | `StatusBadge.jsx`; `StatusBadge.test.jsx` |
| #4 boardQuery new codes; old dropped | PASS | `boardQuery.test.js` |
| #5 FAKE-OLD mocks = gateway canon | PASS | `mockIssues.js`; `mockIssues.test.js` |
| #6 GFL-DRIVEN server filter smoke | PASS (conditional) | `curl http://localhost:8000/tallinn/issues?labels=infrastructure` → 5 issues (2026-06-17). SPA sends uppercase type/status per `enums.py`; local demo seed uses lowercase `type=improvement` — filter `type=IMPROVEMENT` returns 0 (gateway data/doc drift, out of SEARCH-01 scope). |
| #7 vitest green | PASS | `npm run test:run` → 113/113 |

| Task artifacts | T01–T06 acceptance-verification-spa-search-01-t*.md |
| Verify queue | `builder_resolve_queue.py --project spa --verify` → ok 7 paths |
