## Task workspace — `task-spa-search-02-t06-labels-filter-panel-mode`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: D-S8 — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md); L10N-02 pattern
- **Depends on:** T03 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: refactor — LabelsFilter for panel + dynamic options (D-S8)

### Цель
Адаптировать [`LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx) для pending mode; `availableLabels` from parent (applied-fetch issues); document narrow-window when options shrink after Apply.

### Почему это важно (риск)
Labels — единственный SEARCH-02 фильтр с dynamic options; неправильный источник опций даст пустой/disabled control.

### Факты из кода (Code Facts / SSOT)
1. Dynamic collect: [`collectLabelKeysFromIssues`](../../../../../../../../src/i18n/collectLabelKeysFromIssues.js), `includeCore: false` — [`BoardPage.jsx:82-85`](../../../../../../../../src/pages/BoardPage.jsx).
2. Disabled when empty: [`LabelsFilter.jsx:42-45`](../../../../../../../../src/components/Filters/LabelsFilter.jsx).
3. Display: [`formatLabelKey`](../../../../../../../../src/i18n/labelDisplay.js).
4. Gateway: repeated `labels`, OR — G3 §4.1.

### Gap / Проблема
LabelsFilter tied to immediate apply parent; D-S8 narrow-window not documented in filter UX.

### AC/DoD
- [ ] (P0) Controlled `labels`/`onChange`; no navigate in component.
- [ ] (P0) `availableLabels` required prop from BoardPage (post-fetch issues).
- [ ] (P0) Search-within-dropdown preserved; multi-toggle.
- [ ] (P1) JSDoc: options reflect **applied** fetch slice; may shrink after Apply (by-design).
- [ ] (P1) Selected labels not in available list still show in chips (T08) — pending may hold stale until reset.

### Где менять код
- [`src/components/Filters/LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx)

### Out of scope
- collectLabelKeys logic change
- Repo labels param (already works)

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/Filters/__tests__/LabelsFilter.test.js
```
