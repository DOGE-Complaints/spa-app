# STORY-SPA-SEARCH-05 — Гео-фильтр (admin-единицы)

## Meta

- **Key:** `STORY-SPA-SEARCH-05-geo-filter`
- **Status:** Todo
- **Решения:** D-S2 (выносим geo), D-S8 (варианты — из загруженных issue) — [search-filters-cto-interview-2026-06-15.md](../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Зависит от:** [SEARCH-01](STORY-SPA-SEARCH-01-vocabulary-alignment.md), [SEARCH-02](STORY-SPA-SEARCH-02-filter-panel-shell.md)
- **Почему отдельно:** geo сложнее остальных (admin-единицы, нормализация с диакритикой, особая семантика «без geo выпадает») — выделено ради чистого кода.

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
- [src/router/boardQuery.js](../../../../src/router/boardQuery.js): параметры `geo_*` (admin) в parse/serialize.
- [src/repositories/GatewayIssueRepository.js](../../../../src/repositories/GatewayIssueRepository.js): `buildIssuesQuery` — прокинуть `geo_*` (repeated-params).
- [src/repositories/InMemoryIssueRepository.js](../../../../src/repositories/InMemoryIssueRepository.js): `applyReadFilters` + семантика «без geo выпадает» для паритета `FAKE-OLD`; моки [mockIssues.js](../../../../src/router/mockIssues.js) сейчас без `geo` — добавить geo хотя бы части моков для демонстрации.

## Вне scope (зафиксировать)

- **Geo bbox** (числовые границы карты `geo_lat/lon_min/max`) — gateway умеет, но без карты в UI малополезно. **Future**, не в этой стори.
- Карта/визуализация на карте.
- Полный гео-справочник с бэка (D-S8 = из данных).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [search-filters…md](../../../analysis/search-filters-cto-interview-2026-06-15.md) | geo не в UI | admin-geo реализован; bbox = future |
| [reusable-ui-components-architecture.md](../../../UX/reusable-ui-components-architecture.md) | — | добавить geo-контрол |

## Acceptance Criteria

- [ ] В панели есть Geo-контрол по admin-единицам; варианты — из загруженных issue.
- [ ] `GFL-DRIVEN`: `geo_*` прокидываются (repeated-params) и сужают выдачу.
- [ ] Поведение «issue без geo выпадает при активном geo-фильтре» воспроизведено и в `FAKE-OLD` (паритет).
- [ ] Варианты берутся из данных (исключает промахи по диакритике свободного ввода).
- [ ] bbox явно вне scope (зафиксировано как future).
- [ ] `npx vitest run` — green; тесты на geo-параметры и drop-without-geo.
