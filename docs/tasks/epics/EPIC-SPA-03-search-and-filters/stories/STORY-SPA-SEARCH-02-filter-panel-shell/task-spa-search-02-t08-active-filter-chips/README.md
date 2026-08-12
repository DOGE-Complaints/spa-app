## Task workspace — `task-spa-search-02-t08-active-filter-chips`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: D-S3 chips — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Depends on:** T07 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
**ui_scope:** visual  
---

## Task: implement — ActiveFilterChips + buildChipDescriptors

### Цель
Компонент `ActiveFilterChips` над доской: один чип на каждое применённое значение (status per value, type single, labels per key). `buildChipDescriptors(applied, t, locale)` для подписей. Remove → `removeChip` immediate apply (AC#3).

### Почему это важно (риск)
AC#3 — ключевой Jira-like UX; granular dismiss для multi status/labels.

### Факты из кода (Code Facts / SSOT)
1. Applied state = URL: `parseBoardQuery`.
2. Status i18n: `t('status.${s}')`; type: `t('issueType.${type}')`; labels: `formatLabelKey`.
3. Search chip optional: show when `search.trim()` (client-only).

### Gap / Проблема
Нет chip row; applied filters visible only in dropdown triggers.

### AC/DoD
- [ ] (P0) Story AC #3: each applied value = removable chip; remove applies immediately.
- [ ] (P0) Chip label format: `Status: NEW`, `Type: INCIDENT`, `Label: infrastructure` (i18n).
- [ ] (P0) `onRemove(descriptor)` wired to hook `removeChip`.
- [ ] (P1) a11y: chip `aria-label` includes filter dimension + value + remove.
- [ ] (P1) Empty applied → no chip row (or hidden).

### Где менять код
- Новый: `src/components/Filters/ActiveFilterChips.jsx`
- Новый: `src/components/Filters/buildChipDescriptors.js`
- [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — render above board columns
- `Filters.css` — chip styles

### Out of scope
- Search debounce (SEARCH-03)

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/Filters/__tests__/buildChipDescriptors.test.js
```
