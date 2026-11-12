# STORY-SPA-REQ21-05 — Extract board UI into features/ (thin BoardPage)

## Meta

- **Key:** `STORY-SPA-REQ21-05-board-features-extract`
- **Пакет:** [`ui-modularity-theme-redesign-prep/`](./INDEX.md)
- **Status:** Done · P3 `2026-10-06T20:59:52Z` · `pkg-000096`
- **Pipeline:** [`epics/…/STORY-SPA-REQ21-05-board-features-extract.md`](../../epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/STORY-SPA-REQ21-05-board-features-extract.md)
- **Package:** `pkg-000096-20261006-epic-spa-18-req21-05-board-features-extract.yaml`
- **Тип:** page modularize / features folder
- **Parent REQ:** [`21-…`](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md) §4.2 · FR-21.1 pages · lock L6-A
- **Architecture:** [`01-shell-layout-pages.md`](../../../architecture/ui-modularity-theme-redesign-prep/01-shell-layout-pages.md) §2–3
- **Skill declared (future P3):** `react-expert`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/react-expert/SKILL.md`
- **ui_scope:** `none` · UX SKIP
- **Зависит от:** [REQ21-01](STORY-SPA-REQ21-01-shell-chrome-ownership.md)
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)
- **Constraint:** AC-21-06 — no duplicate data clients

---

## Зачем простыми словами

`BoardPage` слишком толстый. Вынести ленту/тулбар/фильтры в `features/`, страница только собирает данные и блоки.

---

## Scope

1. Extract board toolbar / feed / filters composition from fat `BoardPage` into `src/features/…` (and/or components) without changing data plane (`issueService`, `boardQuery`).
2. `BoardPage` remains orchestrator: fetch + URL state + compose features.
3. Keep map/threads mounts working; tests updated.

## Out of scope

- LoginPage extract; `#/next` pages; new APIs / repositories (AC-21-06)

---

## Verified current state

### Historical (pre-P3 · P1.3 `2026-10-06T20:47:18Z`)

| Fact | Path |
|------|------|
| Fat BoardPage ~430 LOC (~421 `wc`) | `src/pages/BoardPage.jsx` |
| `src/features/` | Absent (create on implement — authorized by this story) |

### As-of-Done (P3 · `2026-10-06T20:59:52Z` · P6 SSOT `2026-10-06T21:03:56Z`)

| Fact | Path |
|------|------|
| Thin BoardPage orchestrator **219 LOC** | `src/pages/BoardPage.jsx` |
| `src/features/board/` Present | `BoardToolbar` · `BoardFeedArea` · `BoardFeedSkeleton` · `index.js` |
| Data plane unchanged | `issueService` · `boardQuery` · hooks on page |
| No new repos under features | AC-21-06 · gate PASS |

---

## Target / AC

- [x] **AC-SPA-REQ2105-01:** major feed/toolbar JSX lives under `features/` (and/or components); BoardPage is thin orchestrator (post-01 no chrome)
- [x] **AC-SPA-REQ2105-02:** board feed/filter/map behavior parity; vitest green
- [x] **AC-SPA-REQ2105-03:** no new repositories/clients

---

## Техническое решение

По [arch 01 §2–3](../../../architecture/ui-modularity-theme-redesign-prep/01-shell-layout-pages.md) (L6-A): page = оркестратор; toolbar/feed/filters → `src/features/…`; data plane (`issueService` / `boardQuery` / hooks) без новых repos (AC-21-06). Chrome уже вне page после REQ21-01.

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-req21-05-t01-slice-boardpage-jsx` | Slice BoardPage: toolbar / filters / feed / continuum vs fetch+query (post-01 no chrome) |
| **T02** | `task-spa-req21-05-t02-create-features-modules` | Create `src/features/…` modules; page composes only (L6-A) |
| **T03** | `task-spa-req21-05-t03-preserve-data-plane` | Keep `issueService` / `boardQuery` / hooks; **no** new repos (AC-21-06) |
| **T04** | `task-spa-req21-05-t04-map-threads-parity` | Map + threads mounts parity |
| **T05** | `task-spa-req21-05-t05-vitest-board` | Vitest board/feed/filter green |
| **T06** | `task-spa-req21-05-t06-story-gate` | Gate AC-SPA-REQ2105-01…03 |
| **T07** | `task-spa-req21-05-t07-audit-f1-backlog-verified-as-of-done` | P6 audit F1 — backlog Historical / As-of-Done SSOT |

## Точки в коде

- `src/pages/BoardPage.jsx`
- `src/hooks/useBoardFilterDraft.js`, `src/components/Filters/`
- `src/board/*`, map/threads mounts as today

## Dependencies

- REQ21-01; FR-21.5 / AC-21-06
