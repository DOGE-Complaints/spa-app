## Task workspace — `task-spa-search-05-t02-geo-filter-dynamic-options`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: D-S8 — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md); precedent [`task-spa-search-04-t02-institution-filter-dynamic-options`](../../STORY-SPA-SEARCH-04-institution-date-filters/task-spa-search-04-t02-institution-filter-dynamic-options/README.md)
- **Depends on:** T01 Todo
- **ui_scope:** `mixed` · **ui_anchor:** `true`

---
**Приоритет:** P0  
**Сложность:** L  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: implement — GeoFilter with dynamic admin options from issues (D-S8)

### Цель
Собрать уникальные admin-значения из `issue.geo` загруженных issues и реализовать `GeoFilter` для панели по измерениям district/settlement/region/country/postal_code (Story AC #1, #4).

### Почему это важно (риск)
Фикс-справочник вне scope; свободный ввод ломает диакритику (`Põhja-Tallinn` ≠ `pohja-tallinn` после normalize). D-S8 гарантирует точное написание из данных.

### Факты из кода (Code Facts / SSOT)
1. D-S8 precedent — [`collectInstitutionsFromIssues.js`](../../../../../../../../src/i18n/collectInstitutionsFromIssues.js) + [`InstitutionFilter.jsx`](../../../../../../../../src/components/Filters/InstitutionFilter.jsx).
2. Gateway `normalize_geo_token` — [`scope.py:15-18`](../../../../../../../../../doge-complaints-gateway/src/core/geo/scope.py): `strip().lower()` + alnum only, diacritics preserved.
3. Issue `geo` projection — object with `district/settlement/region/country/postal_code`, `lat`, `lon`: [`dto.py:23-48`](../../../../../../../../../doge-complaints-gateway/src/core/projection/dto.py).
4. FilterPanel geo slot reserved: [`FilterPanel.jsx:57-58`](../../../../../../../../src/components/Filters/FilterPanel.jsx) `data-slot="geo"`.
5. Mock seed без `geo`: [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) — T04 добавит; collector must handle missing geo gracefully.

### Gap / Проблема
Нет `collectGeoAdminOptionsFromIssues`, `normalizeGeoToken` (JS port) и `GeoFilter`; extension slot пустой.

### AC/DoD
- [ ] (P0) Story AC #1: `GeoFilter` component exists with `variant="panel"`.
- [ ] (P0) Story AC #4: `collectGeoAdminOptionsFromIssues(issues)` returns per-dimension sorted unique filter strings from loaded issues.
- [ ] (P0) `normalizeGeoToken(value)` mirrors gateway [`scope.py:15-18`](../../../../../../../../../doge-complaints-gateway/src/core/geo/scope.py).
- [ ] (P0) Controlled geo state / `onChange`; no navigate inside component.
- [ ] (P0) Per-dimension control disabled when that dimension's options length === 0.
- [ ] (P0) Multi-value OR per dimension (labels pattern); values stored as canonical strings from data.
- [ ] (P1) Unit tests for collector + `normalizeGeoToken` diacritics (`Põhja-Tallinn` vs `pohja-tallinn`).
- [ ] (P1) Component render/disabled states test.
- [ ] (P1) **UI gate:** mockup spec from [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md) attached before visual polish (`ui-mockup-spec.md` in this folder after UX dialog).

### Где менять код
- Новый: [`src/i18n/collectGeoAdminOptionsFromIssues.js`](../../../../../../../../src/i18n/collectGeoAdminOptionsFromIssues.js)
- Новый: [`src/i18n/normalizeGeoToken.js`](../../../../../../../../src/i18n/normalizeGeoToken.js) (or colocate with collector)
- Новый: [`src/components/Filters/GeoFilter.jsx`](../../../../../../../../src/components/Filters/GeoFilter.jsx)
- [`src/components/Filters/Filters.css`](../../../../../../../../src/components/Filters/Filters.css) — styles if needed
- [`src/components/Filters/index.js`](../../../../../../../../src/components/Filters/index.js) — export
- Новый: [`src/i18n/__tests__/collectGeoAdminOptionsFromIssues.test.js`](../../../../../../../../src/i18n/__tests__/collectGeoAdminOptionsFromIssues.test.js)
- Новый: [`src/components/Filters/__tests__/GeoFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/GeoFilter.test.jsx)

### Out of scope
- FilterPanel/BoardPage wiring (T05)
- boardQuery (T01)
- Repository layer (T04)
- Geo bbox UI

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/collectGeoAdminOptionsFromIssues.test.js src/components/Filters/__tests__/GeoFilter.test.jsx
```
