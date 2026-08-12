# STORY-SPA-SEARCH-05 — Гео-фильтр (admin-единицы)

## Meta (pipeline)

- **Key:** `STORY-SPA-SEARCH-05-geo-filter`
- **Parent Epic:** [`../../../../EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md)
- **Status:** Done
- **Wave:** `pkg-000012`
- **source:** [`spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md)
- **Decision Ref:** [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md); [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) (D-S2, D-S8)
- **Решения:** D-S2 (выносим geo), D-S8 (варианты — из загруженных issue)
- **Зависит от:** [SEARCH-01](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) (Done, pkg-000008), [SEARCH-02](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md) (Done, pkg-000009)
- **Почему отдельно:** geo сложнее остальных (admin-единицы, нормализация с диакритикой, особая семантика «без geo выпадает») — выделено ради чистого кода.
- **ui_scope:** `mixed` · **ui_complexity:** `standard`

---

## Зачем простыми словами

Бэк умеет фильтровать по географии (район, населённый пункт, регион, страна). Добавляем гео-контрол в панель. Это сложнее обычного фильтра: у issue без гео-данных особое поведение, и есть тонкость с написанием (диакритика).

## Целевое (из интервью)

- Контрол **Geo** по admin-единицам: `district` / `settlement` / `region` / `country` (и `postal_code` при необходимости).
- **Варианты — из загруженных issue** (D-S8): собираем встреченные admin-значения из `issue.geo`.
- Прокидывается в `GatewayIssueRepository`; сужает выдачу на бэке.
- Применение — батч (SEARCH-02); состояние — в URL.

## Контракт бэка (verified, см. [G3 §4.1-4.2](STORY-SPA-G3-search-input-toolbar.md))

- Admin-фильтры (`geo_district/settlement/region/country/postal_code`): multi-value OR, сравнение по `normalize_geo_token` — [read_filters.py:101-129](../../../../../doge-complaints-gateway/src/core/projection/read_filters.py#L101).
- **Семантика:** issue **без `geo` выпадает**, если активен любой geo-фильтр — [read_filters.py:69-80](../../../../../doge-complaints-gateway/src/core/projection/read_filters.py#L69). Без geo-фильтров — остаётся.
- **Нормализация:** `strip().lower()` + только alnum, **диакритика сохраняется** ([scope.py](../../../../../doge-complaints-gateway/src/core/geo/scope.py)). `Põhja-Tallinn`==`põhja tallinn`, но `pohja-tallinn` (без `õ`) ≠. ⇒ варианты из данных (D-S8) безопаснее свободного ввода (точное написание гарантировано).
- В проекции `geo` — объект с `admin_district/settlement/region/country`, `lat`, `lon` ([dto.py](../../../../../doge-complaints-gateway/src/core/projection/dto.py)).

## Scope (фактические точки)

- Новый Geo-контрол в панели (SEARCH-02); опции из `issue.geo` загруженного набора.
- [src/router/boardQuery.js](../../../../../../../src/router/boardQuery.js): параметры `geo_*` (admin) в parse/serialize.
- [src/repositories/GatewayIssueRepository.js](../../../../../../../src/repositories/GatewayIssueRepository.js): `buildIssuesQuery` — прокинуть `geo_*` (repeated-params).
- [src/repositories/InMemoryIssueRepository.js](../../../../../../../src/repositories/InMemoryIssueRepository.js): `applyReadFilters` + семантика «без geo выпадает» для паритета `FAKE-OLD`; моки [mockIssues.js](../../../../../../../src/router/mockIssues.js) сейчас без `geo` — добавить geo хотя бы части моков для демонстрации.

## Вне scope (зафиксировать)

- **Geo bbox** (числовые границы карты `geo_lat/lon_min/max`) — gateway умеет, но без карты в UI малополезно. **Future**, не в этой стори.
- Карта/визуализация на карте.
- Полный гео-справочник с бэка (D-S8 = из данных).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [search-filters…md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) | geo не в UI | admin-geo реализован; bbox = future |
| [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) | — | добавить geo-контрол |

## Acceptance Criteria

- [x] В панели есть Geo-контрол по admin-единицам; варианты — из загруженных issue.
- [x] `GFL-DRIVEN`: `geo_*` прокидываются (repeated-params) и сужают выдачу.
- [x] Поведение «issue без geo выпадает при активном geo-фильтре» воспроизведено и в `FAKE-OLD` (паритет).
- [x] Варианты берутся из данных (исключает промахи по диакритике свободного ввода).
- [x] bbox явно вне scope (зафиксировано как future).
- [x] `npx vitest run` — green; тесты на geo-параметры и drop-without-geo.

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-search-05-t01-board-query-geo-admin`](./task-spa-search-05-t01-board-query-geo-admin/README.md) | pkg-000012 |
| 2 | [`task-spa-search-05-t02-geo-filter-dynamic-options`](./task-spa-search-05-t02-geo-filter-dynamic-options/README.md) | pkg-000012 |
| 3 | [`task-spa-search-05-t03-issue-read-filters-geo-helpers`](./task-spa-search-05-t03-issue-read-filters-geo-helpers/README.md) | pkg-000012 |
| 4 | [`task-spa-search-05-t04-repository-geo-projection`](./task-spa-search-05-t04-repository-geo-projection/README.md) | pkg-000012 |
| 5 | [`task-spa-search-05-t05-filter-panel-board-wiring`](./task-spa-search-05-t05-filter-panel-board-wiring/README.md) | pkg-000012 |
| 6 | [`task-spa-search-05-t06-tests-geo-filters`](./task-spa-search-05-t06-tests-geo-filters/README.md) | pkg-000012 |
| 7 | [`task-spa-search-05-t07-documentation-touchpoints`](./task-spa-search-05-t07-documentation-touchpoints/README.md) | pkg-000012 |
| 8 | [`task-spa-search-05-t08-story-gate-search-05`](./task-spa-search-05-t08-story-gate-search-05/README.md) | pkg-000012 |
| 9 | [`task-spa-search-05-t09-geo-hide-empty-dimensions`](./task-spa-search-05-t09-geo-hide-empty-dimensions/README.md) | `run_mode=spa_search_05_audit_2026_06_18` |
