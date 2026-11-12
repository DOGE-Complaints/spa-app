# Acceptance — SPA-PH-12-T03

- **Task:** Board List wire sorted order
- **Package:** `pkg-000091`
- **Result:** PASS
- **Date:** 2026-10-03T15:40:28Z

| AC / DoD | Status | Evidence |
|----------|--------|----------|
| List uses discussion-priority order | PASS | `BoardPage.jsx` `listIssues` + `data-discussion-sort` |
| Map pin order unchanged (FR-PH-12.4) | PASS | Map still fed `filteredIssues` |
| Prefetch must not convert gateway success → load-error | PASS | flags fail-soft; error only from `issueService` |
| Loading UX sort-before-stable-list | PASS | List skeleton while `!discussionFlagsReady` |

## Commands

```bash
rg -n 'sortIssuesByDiscussionPriority|listIssues|data-discussion-sort|filteredIssues' spa-app/src/pages/BoardPage.jsx | head
cd spa-app && npx vitest run src/pages/__tests__/BoardPage.ph12-discussion-sort.test.jsx
```
