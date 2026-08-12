## Task workspace — `task-spa-search-04-t05-filter-panel-board-wiring`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: D-S4 batch apply — SEARCH-02; [`useBoardFilterDraft.js`](../../../../../../../../src/hooks/useBoardFilterDraft.js)
- **Depends on:** T01, T02, T03, T04 Done
- **ui_scope:** `mixed`

---
**Приоритет:** P0  
**Сложность:** L  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: implement — FilterPanel slots, BoardPage fetch, chips, draft hook

### Цель
Связать institution/date controls с pending/applied state, URL, server fetch и ActiveFilterChips (Story AC #1, #3, #5).

### Почему это важно (риск)
Разрозненные компоненты без wiring не дадут batch apply и refetch при смене server filters.

### Факты из кода (Code Facts / SSOT)
1. `fetchIssues` options — only status/type/labels: [`BoardPage.jsx:73-77`](../../../../../../../../src/pages/BoardPage.jsx).
2. `serverFilterKey` omits institution/dates: [`BoardPage.jsx:50-53`](../../../../../../../../src/pages/BoardPage.jsx).
3. FilterPanel empty extension slots: [`FilterPanel.jsx:40-41`](../../../../../../../../src/components/Filters/FilterPanel.jsx).
4. `buildChipDescriptors` — no institution/date chips: [`buildChipDescriptors.js`](../../../../../../../../src/components/Filters/buildChipDescriptors.js).
5. `removeChip` — no institution/date handlers: [`useBoardFilterDraft.js:91-114`](../../../../../../../../src/hooks/useBoardFilterDraft.js).
6. `appliedKey` / `isDirty` — institution/date must join server batch key: [`useBoardFilterDraft.js:23-38`](../../../../../../../../src/hooks/useBoardFilterDraft.js).

### Gap / Проблема
Components and repo ready (T01–T04) but not integrated into board filter flow.

### AC/DoD
- [ ] (P0) Story AC #1: InstitutionFilter + DateRangeFilter rendered in FilterPanel extension slots (`institutionSlot`/`dateSlot` props or equivalent).
- [ ] (P0) Story AC #3: `fetchIssues` passes institution + dates; `serverFilterKey` triggers refetch on change.
- [ ] (P0) Story AC #5: URL round-trip on Apply; chips show applied institution + date bounds.
- [ ] (P0) `useBoardFilterDraft`: pending includes new fields; `apply`/`reset`/`removeChip` handle institution + dates.
- [ ] (P0) `availableInstitutions` from `collectInstitutionsFromIssues(issues)` on BoardPage (D-S8).
- [ ] (P1) `areBoardFiltersEqual` / chip remove updates URL without stale pending.

### Где менять код
- [`src/components/Filters/FilterPanel.jsx`](../../../../../../../../src/components/Filters/FilterPanel.jsx)
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)
- [`src/hooks/useBoardFilterDraft.js`](../../../../../../../../src/hooks/useBoardFilterDraft.js)
- [`src/components/Filters/buildChipDescriptors.js`](../../../../../../../../src/components/Filters/buildChipDescriptors.js)
- [`src/components/Filters/__tests__/buildChipDescriptors.test.js`](../../../../../../../../src/components/Filters/__tests__/buildChipDescriptors.test.js)
- [`src/hooks/__tests__/useBoardFilterDraft.test.js`](../../../../../../../../src/hooks/__tests__/useBoardFilterDraft.test.js)

### Out of scope
- New component implementations (T02, T03)
- Repo projection (T04)
- Full vitest sweep (T06)

### Проверка
```bash
cd spa-app
npx vitest run src/hooks/__tests__/useBoardFilterDraft.test.js src/components/Filters/__tests__/buildChipDescriptors.test.js src/pages/__tests__/BoardPage.search.test.jsx
```
