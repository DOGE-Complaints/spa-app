# Acceptance verification — STORY-SPA-SEARCH-05

**Story:** STORY-SPA-SEARCH-05-geo-filter  
**Wave:** pkg-000012  
**Verified:** 2026-06-18  
**Tests:** `npx vitest run` — 171/171 green; `npm run test:ui:filters` — see §UI verification

## Story AC

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Geo-контрол по admin-единицам; варианты из загруженных issue | PASS | [`GeoFilter.jsx`](../../../../../../src/components/Filters/GeoFilter.jsx), [`collectGeoAdminOptionsFromIssues.js`](../../../../../../src/i18n/collectGeoAdminOptionsFromIssues.js), [`BoardPage.jsx`](../../../../../../src/pages/BoardPage.jsx) `geoSlot` |
| 2 | GFL-DRIVEN: `geo_*` repeated-params | PASS | [`GatewayIssueRepository.js`](../../../../../../src/repositories/GatewayIssueRepository.js); [`GatewayIssueRepository.test.js`](../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) geo test |
| 3 | drop-without-geo FAKE-OLD паритет | PASS | [`issueReadFilters.js`](../../../../../../src/repositories/issueReadFilters.js) `geoAdminPayloadMatches`; [`InMemoryIssueRepository.geo.test.js`](../../../../../../src/repositories/__tests__/InMemoryIssueRepository.geo.test.js) |
| 4 | Варианты из данных (D-S8, диакритика) | PASS | [`normalizeGeoToken.js`](../../../../../../src/i18n/normalizeGeoToken.js); [`normalizeGeoToken.test.js`](../../../../../../src/i18n/__tests__/normalizeGeoToken.test.js) |
| 5 | bbox вне scope (future) | PASS | No `geo_lat/lon_*` in [`boardQuery.js`](../../../../../../src/router/boardQuery.js) runtime; documented in [`search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) |
| 6 | vitest green; geo + drop-without-geo tests | PASS | 171 tests; [`boardQuery.test.js`](../../../../../../src/router/__tests__/boardQuery.test.js), [`issueReadFilters.geo.test.js`](../../../../../../src/repositories/__tests__/issueReadFilters.geo.test.js), [`BoardPage.geo-filters.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.geo-filters.test.jsx) |

## §UI verification

| Check | Result | Evidence |
|-------|--------|----------|
| GeoFilter empty state when no options | PASS | [`GeoFilter.test.jsx`](../../../../../../src/components/Filters/__tests__/GeoFilter.test.jsx) |
| Geo chips from URL | PASS | [`BoardPage.geo-filters.test.jsx`](../../../../../../src/pages/__tests__/BoardPage.geo-filters.test.jsx) |
| Puppeteer smoke | PASS/WAIVER | `npm run test:ui:filters` — existing filter panel smoke; geo slot extends mockup-01 delta (no new puppeteer assertions in this wave) |

## Builder verify

```
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
→ ok 8 paths
```
