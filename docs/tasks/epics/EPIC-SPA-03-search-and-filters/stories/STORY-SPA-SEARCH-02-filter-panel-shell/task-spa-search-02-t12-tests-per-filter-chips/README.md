## Task workspace — `task-spa-search-02-t12-tests-per-filter-chips`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- **Depends on:** T11 Done

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: tests — per-filter chips and edge cases

### Цель
Vitest для `buildChipDescriptors`: status multi → N chips; type single; labels i18n text; empty labels disabled state; remove chip updates descriptors.

### Почему это важно (риск)
AC#3 granular chips — easy to break per dimension.

### Факты из кода (Code Facts / SSOT)
1. Labels empty disabled: [`LabelsFilter.jsx:42-45`](../../../../../../../../src/components/Filters/LabelsFilter.jsx).
2. formatLabelKey: [`labelDisplay.js`](../../../../../../../../src/i18n/labelDisplay.js).

### Gap / Проблема
No chip descriptor tests.

### AC/DoD
- [ ] (P0) Story AC #3: chip count matches applied values.
- [ ] (P0) Status `['NEW','IN_REVIEW']` → 2 chips with correct labels.
- [ ] (P0) Type `INCIDENT` → 1 chip; `''` → 0 type chips.
- [ ] (P0) Labels chip uses `formatLabelKey` mock/locale.
- [ ] (P1) LabelsFilter disabled when `availableLabels=[]`.

### Где менять код
- `src/components/Filters/__tests__/buildChipDescriptors.test.js`
- `src/components/Filters/__tests__/ActiveFilterChips.test.js`
- Extend LabelsFilter tests if needed

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/Filters/__tests__/
```
