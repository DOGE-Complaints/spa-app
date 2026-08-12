# Acceptance — SPA-G3-T08 (post-audit F2)

- **Result:** PASS
- **Date:** 2026-06-16
- **Wave:** `run_mode=spa_g3_audit_2026_06_16`

| AC | Status | Evidence |
|----|--------|----------|
| Search-only URL change does not alter server filter key | PASS | `serializeServerBoardQuery` in `boardQuery.js` + tests |
| BoardPage fetch deps on `serverFilterKey` only | PASS | `BoardPage.jsx` `useEffect(..., [serverFilterKey])` |
| Server filters still trigger fetch | PASS | `serializeServerBoardQuery` differs on status change (test) |
| G3 search tests green | PASS | `BoardPage.search.test.jsx` + shell tests |

| Gap | Status |
|-----|--------|
| F2 | Closed |
