## Task workspace — `task-spa-search-05-t07-documentation-touchpoints`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: Documentation touchpoints table in pipeline story; Story AC #5
- **Depends on:** T01–T06 Todo
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: document — UX SSOT and interview doc touchpoints for geo filter

### Цель
Обновить documentation touchpoints из pipeline story: reusable components architecture + search-filters interview status; зафиксировать bbox как future (Story AC #5).

### Почему это важно (риск)
Без SSOT update EPIC-03 closure и будущие geo/bbox work не найдут canonical paths для GeoFilter.

### Факты из кода (Code Facts / SSOT)
1. Touchpoints table — [`STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md) §Documentation touchpoints.
2. Precedent — [`task-spa-search-04-t07-documentation-touchpoints`](../../STORY-SPA-SEARCH-04-institution-date-filters/task-spa-search-04-t07-documentation-touchpoints/README.md).
3. [`reusable-ui-components-architecture.md`](../../../../../../UX/reusable-ui-components-architecture.md) — InstitutionFilter/DateRangeFilter documented; GeoFilter absent.
4. [`search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) — geo marked not in UI.
5. Implemented paths after T02: `GeoFilter.jsx`, `collectGeoAdminOptionsFromIssues.js`, `normalizeGeoToken.js`.

### Gap / Проблема
UX architecture doc does not list GeoFilter; interview doc not updated for D-S2 geo closure; bbox future not documented in SSOT.

### AC/DoD
- [ ] (P0) Story AC #5: `search-filters-cto-interview-2026-06-15.md` — admin-geo implemented; **bbox explicitly future**.
- [ ] (P0) `reusable-ui-components-architecture.md` — section for GeoFilter (path, props summary, panel placement `data-slot="geo"`).
- [ ] (P1) Cross-link G3 §4.1-4.2 geo admin params as consumed by SPA.
- [ ] (P1) Optional: refresh G3 §4.3 stale note (geo_* now implemented on client).
- [ ] (P1) No changes to files outside Documentation touchpoints table.

### Где менять код
- [`spa-app/docs/UX/reusable-ui-components-architecture.md`](../../../../../../UX/reusable-ui-components-architecture.md)
- [`spa-app/docs/analysis/search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)

### Out of scope
- Code changes
- ui-mockups epic-03 specs (UX dialog deliverable)

### Проверка
```bash
rg -n "GeoFilter|collectGeoAdminOptionsFromIssues|bbox.*future" spa-app/docs/UX/reusable-ui-components-architecture.md spa-app/docs/analysis/search-filters-cto-interview-2026-06-15.md
```
