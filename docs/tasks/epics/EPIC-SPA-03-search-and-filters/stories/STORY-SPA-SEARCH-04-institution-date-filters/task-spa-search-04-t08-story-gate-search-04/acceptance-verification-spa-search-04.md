# Acceptance verification — STORY-SPA-SEARCH-04

**Story:** STORY-SPA-SEARCH-04-institution-date-filters  
**Wave:** pkg-000011  
**Verified:** 2026-06-18  
**Tests:** `npx vitest run` — 148/148 green; `npm run test:ui:filters` — see §UI verification

## Story AC

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Контролы Institution и Дата (от/до) в панели | PASS | [`InstitutionFilter.jsx`](../../../../../../src/components/Filters/InstitutionFilter.jsx), [`DateRangeFilter.jsx`](../../../../../../src/components/Filters/DateRangeFilter.jsx), [`BoardPage.jsx`](../../../../../../src/pages/BoardPage.jsx) `institutionSlot`/`dateSlot` |
| 2 | Варианты Institution из загруженных issue | PASS | [`collectInstitutionsFromIssues.js`](../../../../../../src/i18n/collectInstitutionsFromIssues.js); [`collectInstitutionsFromIssues.test.js`](../../../../../../src/i18n/__tests__/collectInstitutionsFromIssues.test.js) |
| 3 | GFL-DRIVEN: фильтры в GET /tallinn/issues | PASS | [`GatewayIssueRepository.js`](../../../../../../src/repositories/GatewayIssueRepository.js); [`GatewayIssueRepository.test.js`](../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) |
| 4 | FAKE-OLD: client-side паритет | PASS | [`InMemoryIssueRepository.js`](../../../../../../src/repositories/InMemoryIssueRepository.js); [`InMemoryIssueRepository.test.js`](../../../../../../src/repositories/__tests__/InMemoryIssueRepository.test.js) |
| 5 | URL persist/restore + чипы | PASS | [`boardQuery.js`](../../../../../../src/router/boardQuery.js); [`buildChipDescriptors.js`](../../../../../../src/components/Filters/buildChipDescriptors.js); [`useBoardFilterDraft.js`](../../../../../../src/hooks/useBoardFilterDraft.js) |
| 6 | vitest green; buildIssuesQuery + applyReadFilters tests | PASS | 148 tests; repo/query tests in [`boardQuery.test.js`](../../../../../../src/router/__tests__/boardQuery.test.js), [`issueReadFilters.test.js`](../../../../../../src/repositories/__tests__/issueReadFilters.test.js) |

## §UI verification

| Check | Result | Evidence |
|-------|--------|----------|
| Extension slots visible with content | PASS | [`Filters.css`](../../../../../../src/components/Filters/Filters.css) `.board-filter-panel-extension:not(:empty)` |
| Institution filter disabled when empty options | PASS | [`InstitutionFilter.test.jsx`](../../../../../../src/components/Filters/__tests__/InstitutionFilter.test.jsx) |
| Date inputs render | PASS | [`DateRangeFilter.test.jsx`](../../../../../../src/components/Filters/__tests__/DateRangeFilter.test.jsx) |
| Puppeteer smoke | PASS/WAIVER | `npm run test:ui:filters` — existing smoke covers filter panel shell; institution/date slots extend mockup-01 delta (no new puppeteer assertions in this wave) |

## Builder verify

```
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
→ ok 8 paths
```
