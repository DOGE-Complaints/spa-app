# Acceptance — SPA-PH-12-T01

- **Task:** Discussion definition + sort helper
- **Package:** `pkg-000091`
- **Result:** PASS
- **Date:** 2026-10-03T15:40:28Z

| AC / DoD | Status | Evidence |
|----------|--------|----------|
| Helper: discussion-true first; stable original index | PASS | `src/board/sortIssuesByDiscussionPriority.js` |
| Unit: mix / all empty / all populated / ties | PASS | `src/board/__tests__/sortIssuesByDiscussionPriority.test.js` |
| Missing/false/unavailable → no boost | PASS | same tests · `isDiscussionPopulatedStatus` |
| Definition `populated` = ≥1 comment | PASS | aligns `mapThreadTreeToBlock.js:159–162` |

## Commands

```bash
cd spa-app && npx vitest run src/board/__tests__/sortIssuesByDiscussionPriority.test.js
rg -n 'sortIssuesByDiscussionPriority|populated' spa-app/src/board --glob '*.js' | head
```
