# STORY-SPA-PH-12 — Board discussion priority sort (pipeline)

- **Status:** Done · P3 `2026-10-03T15:40:28Z` · `pkg-000091`
- **Epic:** [EPIC-SPA-09-public-shell-home](../../EPIC-SPA-09-public-shell-home.md) (**REUSE**)
- **Backlog:** [`spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-12-board-discussion-priority-sort.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-12-board-discussion-priority-sort.md)
- **Package:** `pkg-000091-20261003-epic-spa-09-ph-12-board-discussion-priority-sort.yaml`
- **ui_scope:** `none` · logic-only List sort · **UX brief:** skipped (FR-PH-12.5 no chrome; no artboard)
- **Skill declared:** `javascript-pro` · soft `react-expert`
- **Gate:** [task-spa-ph-12-t06-story-gate](task-spa-ph-12-t06-story-gate/README.md) · Date in P3

## Symptom / Expected

List feed on `/#/board` uses gateway order; discussion-populated issues are not prioritized. Expected: after SEARCH filter, issues with ≥1 discussion comment sort above those without (stable ties).

## Verified facts

### Historical (pre-T01–T03)

| Fact | Evidence |
|------|----------|
| No client sort today | `BoardPage` `setIssues` / `filteredIssues` search-only |
| Discussion signal (per-card) | Closed `getThreadTree` + `mapThreadTreeToBlock` `populated` |
| No batch trees HTTP | per-issue Closed path only — no invent |
| Map | pin order OOS (FR-PH-12.4) |

### As-of-Done (P3 · `2026-10-03T15:40:28Z` · P6 SSOT `2026-10-03T15:59:58Z`)

| Fact | Evidence |
|------|----------|
| Client List sort Present | `sortIssuesByDiscussionPriority` · `BoardPage` `listIssues` after SEARCH filter |
| Prefetch Closed trees | `prefetchDiscussionFlags` + `useBoardDiscussionFlags` · knobs + `getThreadTree` |
| No invent HTTP | Closed `/threads/issues/{id}` only |
| Map unordered OK | Map still fed `filteredIssues` (FR-PH-12.4) |

## AC (verbatim backlog)

| ID | Criterion |
|----|-----------|
| AC-PH-12-01 | List: issues with non-empty discussion above those without |
| AC-PH-12-02 | No-discussion not above populated solely via date; ties stable |
| AC-PH-12-03 | Same priority among filtered-visible results |
| AC-PH-12-04 | Empty / loading / load-error no PH-04 regression |

## Scope / Out

**In:** pure sort helper + prefetch Closed trees for filtered ids + List wire; vitest; PH-04 states; gate. SPA only.  
**Out:** badge/L10N · invent HTTP · Map pin reorder · gateway `comment_count` · comment quality ranking.

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-ph-12-t01-discussion-definition-and-helper](task-spa-ph-12-t01-discussion-definition-and-helper/README.md) | Done |
| T02 | [task-spa-ph-12-t02-prefetch-discussion-flags](task-spa-ph-12-t02-prefetch-discussion-flags/README.md) | Done |
| T03 | [task-spa-ph-12-t03-board-list-wire](task-spa-ph-12-t03-board-list-wire/README.md) | Done |
| T04 | [task-spa-ph-12-t04-filter-regression](task-spa-ph-12-t04-filter-regression/README.md) | Done |
| T05 | [task-spa-ph-12-t05-ph04-states](task-spa-ph-12-t05-ph04-states/README.md) | Done |
| T06 | [task-spa-ph-12-t06-story-gate](task-spa-ph-12-t06-story-gate/README.md) | Done |
| T07 | [task-spa-ph-12-t07-audit-f1-backlog-as-of-done-ssot](task-spa-ph-12-t07-audit-f1-backlog-as-of-done-ssot/README.md) | Done · P6 F1 CLOSED |
| T08 | [task-spa-ph-12-t08-audit-f2-pipeline-verified-as-of-done](task-spa-ph-12-t08-audit-f2-pipeline-verified-as-of-done/README.md) | Done · P6 F2 CLOSED |

## Code targets

- `src/pages/BoardPage.jsx`
- NEW sort helper (+ optional `useBoardDiscussionFlags`)
- Reuse: `ThreadsSocialClient` · `mapThreadTreeToBlock` · `threadsKnobsCache`
