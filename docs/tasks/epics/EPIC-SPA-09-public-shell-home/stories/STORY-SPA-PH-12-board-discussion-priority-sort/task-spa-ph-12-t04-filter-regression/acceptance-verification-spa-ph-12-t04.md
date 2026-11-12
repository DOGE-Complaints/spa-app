# Acceptance — SPA-PH-12-T04

- **Task:** Filter regression (discussion priority)
- **Package:** `pkg-000091`
- **Result:** PASS
- **Date:** 2026-10-03T15:40:28Z

| AC / DoD | Status | Evidence |
|----------|--------|----------|
| Filtered subset still discussion-first (AC-PH-12-03) | PASS | `BoardPage.ph12-discussion-sort.test.jsx` search=alpha |
| No invent HTTP in tests | PASS | mocked `prefetchDiscussionFlags` / no batch path |

## Commands

```bash
cd spa-app && npx vitest run src/pages/__tests__/BoardPage.ph12-discussion-sort.test.jsx src/board/__tests__/sortIssuesByDiscussionPriority.test.js
```
