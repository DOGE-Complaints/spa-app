## Task workspace — `task-spa-search-05-t05-filter-panel-board-wiring`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: D-S4 batch apply — SEARCH-02; [`useBoardFilterDraft.js`](../../../../../../../../src/hooks/useBoardFilterDraft.js)
- **Depends on:** T01, T02, T03, T04 Todo
- **ui_scope:** `mixed`

---
**Приоритет:** P0  
**Сложность:** L  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: implement — FilterPanel geo slot, BoardPage fetch, chips, draft hook

### Цель
Связать GeoFilter с pending/applied state, URL, server fetch и ActiveFilterChips (Story AC #1, #2).

### Почему это важно (риск)
Разрозненные компоненты без wiring не дадут batch apply и refetch при смене server geo filters.

### Факты из кода (Code Facts / SSOT)
1. `fetchIssues` options — status/type/labels/institution/dates: [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — geo fields absent.
2. `serverFilterKey` — omits geo arrays.
3. FilterPanel geo slot via `extensionSlot`: [`FilterPanel.jsx:57-58`](../../../../../../../../src/components/Filters/FilterPanel.jsx).
4. `buildChipDescriptors` — no geo chips: [`buildChipDescriptors.js`](../../../../../../../../src/components/Filters/buildChipDescriptors.js).
5. `removeChip` / `useBoardFilterDraft` — institution/date handlers exist; geo absent.
6. Precedent wiring — SEARCH-04 T05 [`task-spa-search-04-t05-filter-panel-board-wiring`](../../STORY-SPA-SEARCH-04-institution-date-filters/task-spa-search-04-t05-filter-panel-board-wiring/README.md).

### Gap / Проблема
Components and repo ready (T01–T04) but not integrated into board filter flow.

### AC/DoD
- [ ] (P0) Story AC #1: `GeoFilter` rendered in FilterPanel geo extension slot (`geoSlot` prop — symmetric to `institutionSlot`/`dateSlot`; may alias/rename `extensionSlot`).
- [ ] (P0) Story AC #2: `fetchIssues` passes geo admin arrays; `serverFilterKey` triggers refetch on geo change.
- [ ] (P0) URL round-trip on Apply for all geo admin params.
- [ ] (P0) ActiveFilterChips show applied geo filters; chip remove clears dimension value.
- [ ] (P0) `useBoardFilterDraft`: pending includes geo fields; `apply`/`reset`/`removeChip` handle geo.
- [ ] (P0) `availableGeoOptions` from `collectGeoAdminOptionsFromIssues(issues)` on BoardPage (D-S8).
- [ ] (P1) `areBoardFiltersEqual` / chip remove updates URL without stale pending.

### Где менять код
- [`src/components/Filters/FilterPanel.jsx`](../../../../../../../../src/components/Filters/FilterPanel.jsx)
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)
- [`src/hooks/useBoardFilterDraft.js`](../../../../../../../../src/hooks/useBoardFilterDraft.js)
- [`src/components/Filters/buildChipDescriptors.js`](../../../../../../../../src/components/Filters/buildChipDescriptors.js)
- [`src/components/Filters/ActiveFilterChips.jsx`](../../../../../../../../src/components/Filters/ActiveFilterChips.jsx) — if chip rendering needs geo labels

### Out of scope
- GeoFilter component implementation (T02)
- Repository layer (T04)
- Documentation (T07)

### Проверка
```bash
cd spa-app
npx vitest run src/pages/__tests__/BoardPage.search.test.jsx
# Extend or add BoardPage geo filter tests in T06
```
