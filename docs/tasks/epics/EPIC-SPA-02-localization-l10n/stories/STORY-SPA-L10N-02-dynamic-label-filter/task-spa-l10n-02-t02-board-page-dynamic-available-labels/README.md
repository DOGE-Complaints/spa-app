## Task workspace — `task-spa-l10n-02-t02-board-page-dynamic-available-labels`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md)
- **Depends on:** T01 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000004`  
**Skill declared:** react-expert  
---

## Task: implement — BoardPage dynamic availableLabels from issues

### Цель
Заменить `availableLabels={AVAILABLE_LABELS}` на `useMemo` по загруженным `issues` через T01; убрать импорт `AVAILABLE_LABELS` как источник фильтра (Story Scope, AC #1, #2).

### Почему это важно (риск)
GL-2: фильтр не отражает реальную таксономию данных; метки вне ядра недоступны для выбора (GL-7 часть «фильтр»).

### Факты из кода (Code Facts / SSOT)
1. [`BoardPage.jsx:16`](../../../../../../../../src/pages/BoardPage.jsx) — `import { AVAILABLE_LABELS }`.
2. [`BoardPage.jsx:54`](../../../../../../../../src/pages/BoardPage.jsx) — `setIssues(list)` после `getIssues`.
3. [`BoardPage.jsx:49`](../../../../../../../../src/pages/BoardPage.jsx) — выбранные `boardFilters.labels` уходят в fetch (фильтрация работает для любого ключа).
4. [`BoardPage.jsx:181`](../../../../../../../../src/pages/BoardPage.jsx) — prop `availableLabels` в `LabelsFilter`.

### Gap / Проблема
Источник фильтра — хардкод 10 меток, не данные.

### AC/DoD
- [x] (P0) Story AC #1: дропдаун строится из меток загруженных issue (union с ядром по T01).
- [x] (P0) Story AC #2: метка вне `AVAILABLE_LABELS` из данных попадает в `availableLabels` и доступна для выбора.
- [x] (P1) В комментарии/README task зафиксировано ограничение D9 (набор зависит от текущей выборки).

### Где менять код
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)

### Out of scope
- LabelsFilter empty UX (T03)
- labelKeys JSDoc (T04)

### Проверка
```bash
cd spa-app
npx vitest run
# Manual: board with issue carrying label outside AVAILABLE_LABELS → visible in filter dropdown
```
