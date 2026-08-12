## Task workspace — `task-spa-search-05-t09-geo-hide-empty-dimensions`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-SEARCH-05-execution-2026-06-18.md`](../../../../../../analysis/audit-STORY-SPA-SEARCH-05-execution-2026-06-18.md) §3 F3
- **Depends on:** SPA-SEARCH-05-T02 Done
- **activation:** `run_mode=spa_search_05_audit_2026_06_18`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_search_05_audit_2026_06_18` (post-audit; **не** pkg-000012)  
**Skill declared:** react-expert  
**ui_scope:** mixed  
**ui_complexity:** trivial  
---

## Task: fix — hide GeoFilter dimensions with no available options

### Цель
Скрывать admin-dimension контролы без опций вместо рендера disabled-триггеров — уменьшить визуальную нагрузку панели при частичных geo-данных в загруженном наборе issue (audit F3).

### Почему это важно (риск)
При 3 из 13 моков с `geo` часть из 5 dimension-слотов (`district`/`settlement`/`region`/`country`/`postal_code`) остаётся пустой, но видимой как disabled dropdown — панель выглядит перегруженной без пользы для пользователя.

### Факты из кода (Code Facts / SSOT)
1. Все `GEO_ADMIN_FILTER_KEYS` всегда в DOM — [`GeoFilter.jsx:32-43`](../../../../../../../../src/components/Filters/GeoFilter.jsx).
2. Пустой dimension → `disabled` trigger, но элемент виден — [`GeoFilter.jsx:88-91`](../../../../../../../../src/components/Filters/GeoFilter.jsx).
3. Полное отсутствие опций → `filterGeoEmpty` — [`GeoFilter.jsx:18-27`](../../../../../../../../src/components/Filters/GeoFilter.jsx) (сохранить).
4. Опции только из загруженных issue (D-S8) — [`collectGeoAdminOptionsFromIssues.js`](../../../../../../../../src/i18n/collectGeoAdminOptionsFromIssues.js); частичный набор — by-design (audit F2, вне scope).
5. Audit F3 — [audit-STORY-SPA-SEARCH-05-execution-2026-06-18.md](../../../../../../analysis/audit-STORY-SPA-SEARCH-05-execution-2026-06-18.md) §3 F3.

### Gap / Проблема
Post-audit UX: GeoFilter рендерит до 5 dimension-дропдаунов; dimension без опций показывается disabled, а не скрывается.

### AC/DoD
- [x] (P0) Dimension с `availableOptions[field].length === 0` **не** рендерится в DOM (не disabled-placeholder).
- [x] (P0) Dimension с опциями — без регрессии multi-select OR и controlled `onChange`.
- [x] (P0) Когда нет ни одной опции по всем dimension — по-прежнему `filterGeoEmpty` (существующее поведение).
- [x] (P1) [`GeoFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/GeoFilter.test.jsx): partial options → только dimension с данными в markup; пустые dimension отсутствуют.
- [x] (P1) `npx vitest run` — green; без регрессии geo-тестов SEARCH-05.

### Где менять код
- [`src/components/Filters/GeoFilter.jsx`](../../../../../../../../src/components/Filters/GeoFilter.jsx) — filter keys before map
- [`src/components/Filters/__tests__/GeoFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/GeoFilter.test.jsx) — partial options case

### Out of scope
- F1 backlog doc sync
- F2 D-S8 (options from loaded issues only)
- Новый pkg / смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml)
- Geo bbox / backend / repository semantics

### Проверка
```bash
cd spa-app
npx vitest run src/components/Filters/__tests__/GeoFilter.test.jsx
npx vitest run
```
