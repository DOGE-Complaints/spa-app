# STORY-SPA-REQ21-05 — Extract board UI into features/ (thin BoardPage) (pipeline)

- **Status:** Done · P3 `2026-10-06T20:59:52Z` · `pkg-000096`
- **Epic:** [EPIC-SPA-18-ui-modularity-theme-redesign-prep](../../EPIC-SPA-18-ui-modularity-theme-redesign-prep.md) (**REUSE**)
- **Backlog:** [`spa-app/docs/tasks/backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-05-board-features-extract.md`](../../../../backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-05-board-features-extract.md)
- **Package:** `pkg-000096-20261006-epic-spa-18-req21-05-board-features-extract.yaml`
- **ui_scope:** `none` · page modularize / features · **UX:** SKIP
- **Skill declared:** `react-expert`
- **Depends:** REQ21-01 Done (`pkg-000092`) · soft REQ21-02
- **Gate:** [acceptance-verification-spa-req21-05.md](task-spa-req21-05-t06-story-gate/acceptance-verification-spa-req21-05.md) · **PASS** `2026-10-06T20:59:52Z`

## Зачем простыми словами

`BoardPage` слишком толстый. Вынести ленту/тулбар/фильтры в `features/`, страница только собирает данные и блоки.

## Verified facts

### Historical (P1.3 · `2026-10-06T20:47:18Z`)

| Fact | Evidence |
|------|----------|
| Fat BoardPage | `src/pages/BoardPage.jsx` **421 LOC** |
| `src/features/` | **Absent** |

### As-of-Done (P3 · `2026-10-06T20:59:52Z`)

| Fact | Evidence |
|------|----------|
| Thin BoardPage orchestrator | `BoardPage.jsx` **219 LOC** |
| features/board Present | `BoardToolbar` · `BoardFeedArea` · `BoardFeedSkeleton` |
| Data plane unchanged | `issueService` · `boardQuery` · hooks on page |
| Vitest | BoardPage suite **PASS** |

## AC (verbatim backlog)

| ID | Criterion |
|----|-----------|
| AC-SPA-REQ2105-01 | major feed/toolbar JSX under `features/` · BoardPage thin orchestrator |
| AC-SPA-REQ2105-02 | board feed/filter/map behavior parity · vitest green |
| AC-SPA-REQ2105-03 | no new repositories/clients (AC-21-06) |

## Scope / Out

**In:** Extract toolbar / filters / feed → `src/features/…`; BoardPage = fetch + URL + compose; map/threads parity; tests; gate.  
**Out:** LoginPage extract · `#/next` · new APIs/repos · redesign invent

## Operator locks

| Lock | Value |
|------|-------|
| Folder | L6-A `src/features/board/` |
| Data plane | reuse `issueService` / `boardQuery` / hooks |
| AC-21-06 | **no** new repos/clients |

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-req21-05-t01-slice-boardpage-jsx](task-spa-req21-05-t01-slice-boardpage-jsx/README.md) | Done |
| T02 | [task-spa-req21-05-t02-create-features-modules](task-spa-req21-05-t02-create-features-modules/README.md) | Done · soft ui_anchor |
| T03 | [task-spa-req21-05-t03-preserve-data-plane](task-spa-req21-05-t03-preserve-data-plane/README.md) | Done |
| T04 | [task-spa-req21-05-t04-map-threads-parity](task-spa-req21-05-t04-map-threads-parity/README.md) | Done |
| T05 | [task-spa-req21-05-t05-vitest-board](task-spa-req21-05-t05-vitest-board/README.md) | Done |
| T06 | [task-spa-req21-05-t06-story-gate](task-spa-req21-05-t06-story-gate/README.md) | Done |
| T07 | [task-spa-req21-05-t07-audit-f1-backlog-verified-as-of-done](task-spa-req21-05-t07-audit-f1-backlog-verified-as-of-done/README.md) | Done · P6 F1 CLOSED |

## Code targets

- `src/pages/BoardPage.jsx`
- `src/features/board/*`
- `src/hooks/useBoardFilterDraft.js` · `src/components/Filters/` · map/threads mounts
