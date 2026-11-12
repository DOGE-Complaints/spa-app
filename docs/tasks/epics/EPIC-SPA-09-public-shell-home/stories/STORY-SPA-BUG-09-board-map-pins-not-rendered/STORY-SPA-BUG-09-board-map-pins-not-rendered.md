# STORY-SPA-BUG-09 — Board map pins not rendered (pipeline)

- **Status:** Done · P3 `2026-10-03T15:18:08Z` · `pkg-000090` · gate PASS · **P6 gap CLOSED** F1–F3 T08–T10 (`2026-10-03T15:25:37Z`) · [run-summary](../../../../run-reports/run-summary-20261003-1525-spa-bug-09-p6.md)
- **Epic:** [EPIC-SPA-09-public-shell-home](../../EPIC-SPA-09-public-shell-home.md) (**REUSE**)
- **Backlog:** [`spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-09-board-map-pins-not-rendered.md)
- **Package:** `pkg-000090-20261003-epic-spa-09-bug-09-board-map-pins.yaml` (**unchanged**)
- **ui_scope:** `visual` · **ui_complexity:** `standard` · **ui_anchor:** T03
- **Skill declared:** `javascript-pro` · soft `react-expert`
- **UX:** [STORY-UX-MOCKUP-BRIEF.md](STORY-UX-MOCKUP-BRIEF.md) (no artboard — brief branch)
- **Gate:** [acceptance-verification-spa-bug-09.md](task-spa-bug-09-t07-story-gate/acceptance-verification-spa-bug-09.md) · **PASS** `2026-10-03T15:18:08Z`
- **Run summary:** [run-summary-20261003-1518-spa-bug-09-p3.md](../../../../run-reports/run-summary-20261003-1518-spa-bug-09-p3.md)
- **Audit / P5:** [audit-STORY-SPA-BUG-09-execution-2026-10-03.md](../../../../analysis/audit-STORY-SPA-BUG-09-execution-2026-10-03.md) · F1/F2/F3 TASKED

## Symptom / Expected

Map basemap Present; List has pin-capable issues; **pins/clusters Absent**. Expected: ≥1 pin or cluster when ≥1 pin-capable issue.

## Verified facts (from backlog)

| Fact | Evidence |
|------|----------|
| H1 | `BoardIssuesMap.jsx` `loadImage(url, cb)` vs MapLibre 4 Promise |
| H1b | `getClusterExpansionZoom(clusterId, cb)` vs Promise |
| Pin rule | `issueGeo.js` numeric `geo.lat`/`geo.lon` |
| Empty-pins | only when `pinIssues.length === 0` |

## AC (verbatim backlog)

| ID | Criterion |
|----|-----------|
| AC-BUG-09-01 | Map с ≥1 pin-capable issue показывает ≥1 pin или cluster |
| AC-BUG-09-02 | Empty-pins UI только когда pin-capable issues отсутствуют |
| AC-BUG-09-03 | List ↔ Map без регрессии PH-04 |
| AC-BUG-09-04 | Regression: pin/cluster path монтируется при pin-capable data |
| AC-BUG-09-05 | Gate: H1 confirmed; fix SPA MapLibre v4 Promise (+ H1b) |

## Scope / Out

**In:** Promise `loadImage` boot → `ensureLayers`/`syncSource`; Promise cluster zoom; vitest; manual Map repro. SPA only.  
**Out:** H2 life-sim geo stack; threads UX; gateway invent; MapLibre downgrade.

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-bug-09-t01-repro-evidence](task-spa-bug-09-t01-repro-evidence/README.md) | Done |
| T02 | [task-spa-bug-09-t02-confirm-h1-api](task-spa-bug-09-t02-confirm-h1-api/README.md) | Done |
| T03 | [task-spa-bug-09-t03-fix-loadimage-boot](task-spa-bug-09-t03-fix-loadimage-boot/README.md) | Done · ui_anchor |
| T04 | [task-spa-bug-09-t04-fix-cluster-zoom-promise](task-spa-bug-09-t04-fix-cluster-zoom-promise/README.md) | Done |
| T05 | [task-spa-bug-09-t05-regression-tests](task-spa-bug-09-t05-regression-tests/README.md) | Done |
| T06 | [task-spa-bug-09-t06-list-map-smoke](task-spa-bug-09-t06-list-map-smoke/README.md) | Done |
| T07 | [task-spa-bug-09-t07-story-gate](task-spa-bug-09-t07-story-gate/README.md) | Done · gate PASS |
| T08 | [task-spa-bug-09-t08-audit-f1-screenshots-readme](task-spa-bug-09-t08-audit-f1-screenshots-readme/README.md) | Done · F1 CLOSED |
| T09 | [task-spa-bug-09-t09-audit-f2-edge-full-cycle-pngs](task-spa-bug-09-t09-audit-f2-edge-full-cycle-pngs/README.md) | Done · F2 CLOSED |
| T10 | [task-spa-bug-09-t10-audit-f3-backlog-as-of-done-ssot](task-spa-bug-09-t10-audit-f3-backlog-as-of-done-ssot/README.md) | Done · F3 CLOSED |

## Code targets

- `src/components/map/BoardIssuesMap.jsx`
- `src/map/issueGeo.js` (read-only)
- NEW `src/components/map/__tests__/` (or colocated)
