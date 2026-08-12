## Task workspace — `task-spa-search-02-t15-documentation-touchpoints`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: backlog «Documentation touchpoints» table
- **Depends on:** T03–T10 implementation paths known

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: docs — sync UX touchpoints for filter panel

### Цель
Обновить documentation touchpoints из backlog story: reusable-ui-components-architecture, mockup-01 (+ mockup-10..13 refs), search-filters CTO interview D-S3/4/6/7 → ✅.

### Почему это важно (риск)
Doc-code drift on filter UX pattern blocks SEARCH-03/04 onboarding.

### Факты из кода (Code Facts / SSOT)
1. Touchpoints table — [`STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md#documentation-touchpoints).
2. Current: filters = inline dropdowns in [`reusable-ui-components-architecture.md`](../../../../../../UX/reusable-ui-components-architecture.md).

### Gap / Проблема
Docs describe inline toolbar filters, not panel+chips+batch.

### AC/DoD
- [ ] (P0) `reusable-ui-components-architecture.md` — FilterPanel, ActiveFilterChips, useBoardFilterDraft paths.
- [ ] (P0) mockup-01 (or filter section) — panel + chips described.
- [ ] (P0) `search-filters-cto-interview-2026-06-15.md` — D-S3, D-S4, D-S6, D-S7 marked ✅ with date.
- [ ] (P1) `acceptance-verification-spa-search-02-t15.md` in task folder.

### Где менять код
- [`spa-app/docs/UX/reusable-ui-components-architecture.md`](../../../../../../UX/reusable-ui-components-architecture.md)
- [`spa-app/docs/UX/mockups/mockup-01-dashboard-main-spec.md`](../../../../../../UX/mockups/mockup-01-dashboard-main-spec.md)
- [`spa-app/docs/analysis/search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)

### Out of scope
- Story gate (T16)

### Проверка
Manual doc review; grep `FilterPanel` in docs.
