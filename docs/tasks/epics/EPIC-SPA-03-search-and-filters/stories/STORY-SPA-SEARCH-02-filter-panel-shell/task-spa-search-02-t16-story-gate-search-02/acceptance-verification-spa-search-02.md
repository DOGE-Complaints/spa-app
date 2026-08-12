# Acceptance verification — STORY-SPA-SEARCH-02

**Story:** STORY-SPA-SEARCH-02-filter-panel-shell  
**Wave:** pkg-000009 (retroactive UI closure)  
**Verified:** 2026-06-17  
**Tests:** `npm run test:run` — 129/129 green; `npm run test:ui:filters` — PASS

## Story AC

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Кнопка «Фильтры» раскрывает панель; Status/Type/Labels внутри | PASS | [`FilterPanel.jsx`](../../../../../../src/components/Filters/FilterPanel.jsx); [`BoardPage.jsx`](../../../../../../src/pages/BoardPage.jsx); [`FilterPanel.test.jsx`](../../../../../../src/components/Filters/__tests__/FilterPanel.test.jsx) |
| 2 | Черновик в панели; Apply батч | PASS | [`useBoardFilterDraft.js`](../../../../../../src/hooks/useBoardFilterDraft.js); [`useBoardFilterDraft.test.js`](../../../../../../src/hooks/__tests__/useBoardFilterDraft.test.js) |
| 3 | Чипы с удалением; remove → immediate apply | PASS | [`ActiveFilterChips.jsx`](../../../../../../src/components/Filters/ActiveFilterChips.jsx); [`buildChipDescriptors.js`](../../../../../../src/components/Filters/buildChipDescriptors.js) |
| 4 | Reset очищает всё + search; disabled when empty | PASS | [`BoardPage.jsx`](../../../../../../src/pages/BoardPage.jsx); [`BoardPage.search.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) |
| 5 | URL по Apply; F5/Back roundtrip | PASS | [`boardQuery.js`](../../../../../../src/router/boardQuery.js); puppeteer deep-link step |
| 6 | Drawer на узком экране | PASS | [`Filters.css`](../../../../../../src/components/Filters/Filters.css); [`post-implement/02-narrow-drawer.png`](../task-spa-search-02-t03-filter-panel-shell/ui-baseline/post-implement/02-narrow-drawer.png) |
| 7 | vitest green; batch/serialize tests | PASS | 129 tests; [`BoardPage.filterPanel.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.filterPanel.test.jsx) |

## §UI verification

| Check | Result | Evidence |
|-------|--------|----------|
| Baseline (retroactive) | PASS | [`task-spa-search-02-t03/ui-baseline/`](../task-spa-search-02-t03-filter-panel-shell/ui-baseline/) — `01-board-default.png`, `02-panel-open.png` |
| Target spec | PASS | [`ui-mockup-spec.md`](../task-spa-search-02-t03-filter-panel-shell/ui-mockup-spec.md); [`mockup-10`](../../../../../../UX/mockups/mockup-10-dashboard-filter-status-spec.md); [`mockup-13`](../../../../../../UX/mockups/mockup-13-dashboard-filter-reset-spec.md) |
| Post-implement screenshots | PASS | `ui-baseline/post-implement/01-board-applied-filters.png`, `02-narrow-drawer.png` |
| Epic03 validation PNG | PASS | [`docs/analysis/validation/epic03/filters-board-current.png`](../../../../../../analysis/validation/epic03/filters-board-current.png) |
| Puppeteer smoke | PASS | `npm run test:ui:filters` — 2026-06-17 |
| Desktop: panel toggle + Apply batch | PASS | puppeteer + `02-panel-open.png` |
| Narrow: drawer | PASS | `02-narrow-drawer.png` (390×844) |
| Operator sign-off | PASS | [`ui-interview-decisions.md`](../task-spa-search-02-t03-filter-panel-shell/ui-interview-decisions.md) — принято 2026-06-17 |

## UI checklist (UI-3)

| Check | Desktop | Narrow |
|-------|---------|--------|
| Filters toggle visible | PASS (screenshot) | PASS (screenshot) |
| Chips row when filters applied | PASS (screenshot) | PASS (puppeteer deep link) |
| Apply disabled when not dirty | PASS (puppeteer flow) | PASS (hook `isDirty`) |

## Contract notes

- `serializeServerBoardQuery` unchanged semantics — [`BoardPage.serverFilterKey.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.serverFilterKey.test.jsx)
- Future filter slots: `data-slot="institution|date|geo"` in `FilterPanel`
- `buildIssuesQuery` not extended (SEARCH-04/05)

## Builder verify

```
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
→ ok 16 paths
```
