# Story acceptance gate — STORY-SPA-PH-12-board-discussion-priority-sort

- **Story:** Board discussion priority sort
- **Package:** `pkg-000091-20261003-epic-spa-09-ph-12-board-discussion-priority-sort.yaml`
- **Result:** PASS
- **Date:** 2026-10-03T15:40:28Z
- **ui_scope:** `none` · UX pipeline SKIP (FR-PH-12.5 no chrome text)

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| **AC-PH-12-01** List: non-empty discussion above without | PASS | `sortIssuesByDiscussionPriority` + `BoardPage.ph12` List order DISCUSSED first |
| **AC-PH-12-02** No-discussion not above solely via date; ties stable | PASS | unit ties + secondary original index |
| **AC-PH-12-03** Same priority among filtered-visible | PASS | `BoardPage.ph12` `?search=alpha` |
| **AC-PH-12-04** Empty / loading / load-error no PH-04 regression | PASS | T05 vitest suite · discovery / continuum / feed |

## Pin note

SPA List sort after SEARCH filter via Closed `getThreadTree` prefetch (`ThreadsSocialClient` + `ensureThreadsKnobsCached` + `mapThreadTreeToBlock` `populated`). **No invent HTTP.** Map pin order OOS (FR-PH-12.4). No badge/L10N (FR-PH-12.5).

## UI

| Item | Status |
|------|--------|
| UX visual pipeline | SKIP · `ui_scope: none` · OP fence |

## Commands (live verification 2026-10-03T15:40:28Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run src/board/__tests__/sortIssuesByDiscussionPriority.test.js src/board/__tests__/prefetchDiscussionFlags.test.js src/pages/__tests__/BoardPage.ph12-discussion-sort.test.jsx src/pages/__tests__/BoardPage.continuum.test.jsx src/pages/__tests__/BoardPage.discovery.test.jsx
rg -n 'sortIssuesByDiscussionPriority|listIssues|data-discussion-sort' spa-app/src/pages/BoardPage.jsx | head
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
