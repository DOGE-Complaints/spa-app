## Task workspace — `task-spa-search-04-t07-documentation-touchpoints`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: Documentation touchpoints table in pipeline story
- **Depends on:** T01–T06 Done
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: document — UX SSOT and interview doc touchpoints

### Цель
Обновить documentation touchpoints из pipeline story: reusable components architecture + search-filters interview status.

### Почему это важно (риск)
Без SSOT update следующие story (SEARCH-05) не найдут canonical paths для InstitutionFilter / DateRangeFilter.

### Факты из кода (Code Facts / SSOT)
1. Touchpoints table — [`STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md) §Documentation touchpoints.
2. Precedent — [`task-spa-search-03-t06-documentation-touchpoints`](../../STORY-SPA-SEARCH-03-cross-language-search-input/task-spa-search-03-t06-documentation-touchpoints/README.md).
3. [`reusable-ui-components-architecture.md`](../../../../../../UX/reusable-ui-components-architecture.md) — SearchInput documented; institution/date absent.
4. [`search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) — D-S2 institution/date marked open.
5. Implemented paths after T02/T03: `InstitutionFilter.jsx`, `DateRangeFilter.jsx`, `collectInstitutionsFromIssues.js`.

### Gap / Проблема
UX architecture doc does not list new filter controls; interview doc not updated for D-S2 closure.

### AC/DoD
- [ ] (P0) `reusable-ui-components-architecture.md` — sections for InstitutionFilter + DateRangeFilter (path, props summary, panel placement).
- [ ] (P0) `search-filters-cto-interview-2026-06-15.md` — note institution/date UI implemented (D-S2).
- [ ] (P1) Cross-link G3 §4.1 institution/date params as consumed by SPA.
- [ ] (P1) No changes to files outside Documentation touchpoints table.

### Где менять код
- [`spa-app/docs/UX/reusable-ui-components-architecture.md`](../../../../../../UX/reusable-ui-components-architecture.md)
- [`spa-app/docs/analysis/search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)

### Out of scope
- ui-mockups-and-states-requirements.md (unless operator extends touchpoints)
- Code changes

### Проверка
```bash
# Manual: grep new component names in docs
rg -n "InstitutionFilter|DateRangeFilter|collectInstitutionsFromIssues" spa-app/docs/UX/reusable-ui-components-architecture.md
```
