# Acceptance verification — STORY-SPA-SEARCH-03

**Story:** STORY-SPA-SEARCH-03-cross-language-search-input  
**Wave:** pkg-000010  
**Verified:** 2026-06-18  
**Tests:** `npm run test:run` — 139/139 green; `npm run test:ui:filters` — PASS

## Story AC

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Поле поиска с placeholder и очисткой | PASS | [`SearchInput.jsx`](../../../../../../src/components/Filters/SearchInput.jsx) — `.board-search-clear`; [`BoardPage.search.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) |
| 2 | Ввод обновляет `?search=` с debounce | PASS | [`useDebouncedBoardSearch.js`](../../../../../../src/hooks/useDebouncedBoardSearch.js); [`useDebouncedBoardSearch.test.js`](../../../../../../src/hooks/__tests__/useDebouncedBoardSearch.test.js) |
| 3 | Кросс-язычный матч title/description | PASS | [`issueSearchMatch.js`](../../../../../../src/router/issueSearchMatch.js); [`issueSearchMatch.test.js`](../../../../../../src/router/__tests__/issueSearchMatch.test.js); [`BoardPage.jsx`](../../../../../../src/pages/BoardPage.jsx) `filteredIssues` |
| 4 | Пустой запрос = весь набор; Reset очищает search | PASS | [`issueSearchMatch.test.js`](../../../../../../src/router/__tests__/issueSearchMatch.test.js); SEARCH-02 [`ResetFiltersControl`](../../../../../../src/components/Filters/ResetFiltersControl.jsx) + [`BoardPage.search.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) |
| 5 | vitest green; ru-слово при cross-locale | PASS | 139 tests; DE-002 `обучение` in [`issueSearchMatch.test.js`](../../../../../../src/router/__tests__/issueSearchMatch.test.js) |

## §UI verification

| Check | Result | Evidence |
|-------|--------|----------|
| Story anchor baseline | PASS | [`task-spa-search-03-t01/ui-baseline/README.md`](../task-spa-search-03-t01-cross-locale-match-helper/ui-baseline/README.md) |
| Target spec (clear delta) | PASS | [`task-spa-search-03-t04/ui-mockup-spec.md`](../task-spa-search-03-t04-search-input-clear-affordance/ui-mockup-spec.md); extends mockup-01 |
| Puppeteer smoke | PASS | `npm run test:ui:filters` — 2026-06-18 |
| Clear button when search active | PASS | [`BoardPage.search.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) |

## Builder verify

```
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
→ ok 7 paths
```
