## Task workspace — `task-spa-search-04-t02-institution-filter-dynamic-options`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: D-S8 — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md); precedent [`task-spa-search-02-t06-labels-filter-panel-mode`](../../STORY-SPA-SEARCH-02-filter-panel-shell/task-spa-search-02-t06-labels-filter-panel-mode/README.md)
- **Depends on:** T01 Done
- **ui_scope:** `mixed` · **ui_anchor:** `true`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: implement — InstitutionFilter with dynamic options from issues (D-S8)

### Цель
Собрать уникальные institution values из загруженных `issues` и реализовать single-select `InstitutionFilter` для панели (Story AC #1, #2).

### Почему это важно (риск)
Фикс-справочник вне scope; неправильный canonical value сломает gateway exact-match (G3 §4.1).

### Факты из кода (Code Facts / SSOT)
1. D-S8 precedent — [`collectLabelKeysFromIssues.js`](../../../../../../../../src/i18n/collectLabelKeysFromIssues.js) + [`LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx).
2. Issue `institution` — i18n object or scalar: [`types.js:61`](../../../../../../../../src/domain/types.js), [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) DE-* seeds.
3. Gateway match — any et/ru/en exact string: [`read_filters.py:134-142`](../../../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py).
4. FilterPanel slot reserved: [`FilterPanel.jsx:40`](../../../../../../../../src/components/Filters/FilterPanel.jsx) `data-slot="institution"`.
5. Display helper — [`resolveLocalizedText`](../../../../../../../../src/i18n/core.js) for UI labels; filter value must align with gateway param semantics.

### Gap / Проблема
Нет `collectInstitutionsFromIssues` и `InstitutionFilter`; extension slot пустой.

### AC/DoD
- [ ] (P0) Story AC #1: `InstitutionFilter` component exists with `variant="panel"`.
- [ ] (P0) Story AC #2: `collectInstitutionsFromIssues(issues)` returns sorted unique filter strings from loaded issues.
- [ ] (P0) Controlled `institution` / `onChange`; no navigate inside component.
- [ ] (P0) Disabled when `availableInstitutions.length === 0` (LabelsFilter pattern L41–45).
- [ ] (P1) Unit tests for collector + component render/disabled states.
- [ ] (P1) **UI gate:** mockup spec from [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md) attached before visual polish (`ui-mockup-spec.md` in this folder after UX dialog).

### Где менять код
- Новый: [`src/i18n/collectInstitutionsFromIssues.js`](../../../../../../../../src/i18n/collectInstitutionsFromIssues.js)
- Новый: [`src/components/Filters/InstitutionFilter.jsx`](../../../../../../../../src/components/Filters/InstitutionFilter.jsx)
- [`src/components/Filters/Filters.css`](../../../../../../../../src/components/Filters/Filters.css) — styles if needed
- [`src/components/Filters/index.js`](../../../../../../../../src/components/Filters/index.js) — export
- Новый: [`src/i18n/__tests__/collectInstitutionsFromIssues.test.js`](../../../../../../../../src/i18n/__tests__/collectInstitutionsFromIssues.test.js)
- Новый: [`src/components/Filters/__tests__/InstitutionFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/InstitutionFilter.test.jsx)

### Out of scope
- FilterPanel slot wiring (T05)
- boardQuery (T01)
- Repository layer (T04)

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/collectInstitutionsFromIssues.test.js src/components/Filters/__tests__/InstitutionFilter.test.jsx
```
