# Acceptance — SPA-PH-12-T02

- **Task:** Prefetch discussion flags
- **Package:** `pkg-000091`
- **Result:** PASS
- **Date:** 2026-10-03T15:40:28Z

| AC / DoD | Status | Evidence |
|----------|--------|----------|
| Flags from `mapThreadTreeToBlock(…).status === 'populated'` | PASS | `prefetchDiscussionFlags.js` + `isDiscussionPopulatedStatus` |
| Fail-soft: tree fail / knobs null → no boost | PASS | `prefetchDiscussionFlags.test.js` |
| No invent HTTP | PASS | Closed `client.getThreadTree` only · knobs via `ensureThreadsKnobsCached` |
| Bounded concurrency + budget | PASS | concurrency default 4 · `DISCUSSION_PREFETCH_BUDGET_MS` |

## Commands

```bash
cd spa-app && npx vitest run src/board/__tests__/prefetchDiscussionFlags.test.js
rg -n 'getThreadTree|ensureThreadsKnobsCached|prefetchDiscussionFlags' spa-app/src/board spa-app/src/hooks --glob '*.{js,jsx}' | head
```
