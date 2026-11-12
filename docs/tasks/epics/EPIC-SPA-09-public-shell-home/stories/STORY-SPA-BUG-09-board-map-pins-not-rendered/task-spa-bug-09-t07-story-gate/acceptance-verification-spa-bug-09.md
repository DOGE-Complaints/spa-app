# Story acceptance gate — STORY-SPA-BUG-09-board-map-pins-not-rendered

- **Story:** Board map pins not rendered (MapLibre v4 Promise boot)
- **Package:** `pkg-000090-20261003-epic-spa-09-bug-09-board-map-pins.yaml`
- **Result:** PASS
- **Date:** 2026-10-03T15:18:08Z

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| **AC-BUG-09-01** Map с ≥1 pin-capable issue показывает ≥1 pin или cluster (не только basemap) | PASS | Live MapLibre: source `ssr03-issue-pins` + layers + `hasImage` · UI-3 PNG cluster **12** · [screenshots/full-cycle/bug09-ui3-map-pins-cluster12-1536x1024.png](../screenshots/full-cycle/bug09-ui3-map-pins-cluster12-1536x1024.png) |
| **AC-BUG-09-02** Empty-pins UI только когда pin-capable отсутствуют | PASS | Pre-fix: empty-pins Absent with 12/12 pin-capable · vitest empty-pins when none |
| **AC-BUG-09-03** List ↔ Map без регрессии PH-04 | PASS | MCP List↔Map toggle · `npm run test:ui:board-shell` PASS · ListMapToggle 2/2 |
| **AC-BUG-09-04** Regression: pin/cluster path монтируется при pin-capable data | PASS | `BoardIssuesMap.test.jsx` 3/3 · live featCount=12 |
| **AC-BUG-09-05** Gate: H1 confirmed; fix SPA MapLibre v4 Promise (+ H1b) | PASS | H1 `await loadImage` → `.data` · H1b Promise `getClusterExpansionZoom` · `BoardIssuesMap.jsx` |

## UI (§UI)

| Item | Status | Path |
|------|--------|------|
| UI-0 baseline | Present | `task-spa-bug-09-t03…/ui-baseline/` |
| UI-1 mockup-spec | Present | `task-spa-bug-09-t03…/ui-mockup-spec.md` (brief branch; no invent PNG) |
| UI-3 post-fix | Present | story `screenshots/full-cycle/` + T03 `ui-after/` |
| `test:ui:board-shell` | PASS | spa-app local Chrome |

## Pin note

Pinned layer = SPA `BoardIssuesMap.jsx` MapLibre **v4 Promise** boot (`loadImage` / `getClusterExpansionZoom`). Not gateway geo. Not H2 life-sim stack (cluster **12** at Tallinn centroid acceptable for AC-01).

## H1 / H1b

| ID | Finding | Fix |
|----|---------|-----|
| H1 | Callback `loadImage` ignored → layers never mount | `await map.loadImage` → `addImage(id, response.data)` → `ensureLayers`/`syncSource` |
| H1b | Callback `getClusterExpansionZoom` ignored | Promise `.then(zoom => easeTo…)` |

## Commands (live verification 2026-10-03T15:18:08Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npx vitest run src/components/map/__tests__/BoardIssuesMap.test.jsx
cd spa-app && npm run test:ui:board-shell
rg -n 'await map\.loadImage|getClusterExpansionZoom' spa-app/src/components/map/BoardIssuesMap.jsx
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
