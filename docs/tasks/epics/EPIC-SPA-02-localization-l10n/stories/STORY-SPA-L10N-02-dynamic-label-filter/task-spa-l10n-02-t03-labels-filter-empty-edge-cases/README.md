## Task workspace — `task-spa-l10n-02-t03-labels-filter-empty-edge-cases`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md)
- **Depends on:** T02 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000004`  
**Skill declared:** react-expert  
---

## Task: fix/verify — LabelsFilter empty and growing list behavior

### Цель
Проверить и при необходимости доработать [`LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx) при пустом или растущем `availableLabels` (Story Scope, AC #4).

### Почему это важно (риск)
Пустая выборка issues → пустой список меток; без `disabled`/empty-state возможны confusing UX или edge-case crash.

### Факты из кода (Code Facts / SSOT)
1. [`LabelsFilter.jsx:12-16`](../../../../../../../../src/components/Filters/LabelsFilter.jsx) — `filtered` из `availableLabels`; пустой массив → `filtered.map` рендерит ничего.
2. [`LabelsFilter.jsx:37-47`](../../../../../../../../src/components/Filters/LabelsFilter.jsx) — trigger всегда кликабелен (`disabled` нет).
3. [`LabelsFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/LabelsFilter.test.jsx) — один тест с непустым списком.

### Gap / Проблема
AC #4 не покрыт: «нет меток → фильтр пуст/disabled, без падений».

### AC/DoD
- [x] (P0) Story AC #4: при `availableLabels=[]` — нет падений; UI пустой dropdown и/или `disabled` trigger (детерминированно).
- [x] (P0) При растущем списке (после reload issues) — dropdown обновляется без crash.
- [x] (P1) Тест в `LabelsFilter.test.jsx` на пустой `availableLabels`.

### Где менять код
- [`src/components/Filters/LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx)
- [`src/components/Filters/__tests__/LabelsFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/LabelsFilter.test.jsx)

### Out of scope
- BoardPage aggregation (T01–T02)
- Маркер «нет перевода» (L10N-03)

### Проверка
```bash
cd spa-app
npx vitest run src/components/Filters/__tests__/LabelsFilter.test.jsx
```
