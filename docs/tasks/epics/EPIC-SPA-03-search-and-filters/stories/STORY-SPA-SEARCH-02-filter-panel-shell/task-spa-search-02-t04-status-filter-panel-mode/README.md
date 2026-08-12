## Task workspace — `task-spa-search-02-t04-status-filter-panel-mode`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: G3 §4.1 `status` multi OR — [STORY-SPA-G3](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md)
- **Depends on:** T03 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: refactor — StatusFilter for panel pending mode

### Цель
Адаптировать [`StatusFilter.jsx`](../../../../../../../../src/components/Filters/StatusFilter.jsx) для работы в панели: чистый controlled `status`/`onChange`, без navigate; multi-select из `ISSUE_STATUS`; toggle не закрывает всю панель (dropdown локальный).

### Почему это важно (риск)
Текущий компонент предполагает immediate parent navigate; в batch-режиме onChange должен менять только pending.

### Факты из кода (Code Facts / SSOT)
1. Static enum: [`StatusFilter.jsx:5-6,40-51`](../../../../../../../../src/components/Filters/StatusFilter.jsx), [`types.js`](../../../../../../../../src/domain/types.js).
2. Gateway param: repeated `status`, OR semantics — G3 §4.1.
3. URL validation: [`boardQuery.js:26`](../../../../../../../../src/router/boardQuery.js).

### Gap / Проблема
StatusFilter не документирован для panel/draft mode; parent BoardPage binds to immediate apply.

### AC/DoD
- [ ] (P0) `onChange(status: string[])` — единственный side effect; no navigation in component.
- [ ] (P0) Опции = `Object.values(ISSUE_STATUS)`; labels via `t('status.${s}')`.
- [ ] (P0) Multi-select toggle добавляет/убирает значение без auto-close панели.
- [ ] (P1) Optional prop `variant="panel"` для layout tweaks (inline vs stacked) if needed.
- [ ] (P1) Existing a11y: `role="listbox"`, `aria-selected` preserved.

### Где менять код
- [`src/components/Filters/StatusFilter.jsx`](../../../../../../../../src/components/Filters/StatusFilter.jsx)
- Tests in T12

### Out of scope
- BoardPage wiring (T07)
- Chips (T08)

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/Filters/__tests__/StatusFilter.test.js
```
