# Search & Filters (тематический набор стори)

> **Тема:** поиск и server-side фильтрация доски через UI-компоненты (Jira-стиль: раскрывающаяся панель + чипы), по стандартам и удобно.
> **Решения:** [search-filters-cto-interview-2026-06-15.md](../../../analysis/search-filters-cto-interview-2026-06-15.md) (D-S1..D-S8).
> **Хостинг:** Railway (Arweave снят) — обычный redeploy.
> **Foundation (состыковка с реальным API):** [G1](STORY-SPA-G1-gateway-endpoint-alignment.md) + [G3](STORY-SPA-G3-search-input-toolbar.md) перенесены в этот пакет и идут **первыми** — это слой получения issues с фильтрами из реального gateway.

## Карта стори

### Foundation — состыковка с реальным API (первыми)

| Стори | Что | Статус | Зависит от |
|-------|-----|--------|------------|
| [SEARCH-00a / G1 — Gateway endpoint connection](STORY-SPA-G1-gateway-endpoint-alignment.md) | соединение SPA↔gateway: `GET {VITE_GATEWAY_BASE_URL}/tallinn/issues[/{id}]` | ✅ Done (pkg-000001) | — |
| [SEARCH-00b / G3 — Контракт фильтров + SearchInput-исток](STORY-SPA-G3-search-input-toolbar.md) | §1–8 = SSOT контракта фильтр-API (data flow, endpoint, query-мэппинг, словарный блокёр); SearchInput → SEARCH-03 | Contract (active SSOT) | G1 |

### Реализация (поверх foundation)

| Стори | Что | Решения | Зависит от |
|-------|-----|---------|------------|
| [SEARCH-01 — Выравнивание словарей под gateway](STORY-SPA-SEARCH-01-vocabulary-alignment.md) | status/type/labels SPA → канон `enums.py`; **блокёр** server-фильтров | D-S5 | G1, G3 (контракт §5) |
| [SEARCH-02 — Панель фильтров (Jira-like) + чипы + батч + URL + адаптив](STORY-SPA-SEARCH-02-filter-panel-shell.md) | контейнер фильтров, «Применить», чипы, drawer на мобайле | D-S3, D-S4, D-S6, D-S7 | SEARCH-01 Done; [pipeline](../../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-02-filter-panel-shell/STORY-SPA-SEARCH-02-filter-panel-shell.md) Done (pkg-000009) |
| [SEARCH-03 — SearchInput (кросс-язычный)](STORY-SPA-SEARCH-03-cross-language-search-input.md) | поле поиска; поиск по et+ru+en; debounce | D-S1 | SEARCH-02 Done; [pipeline](../../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-03-cross-language-search-input/STORY-SPA-SEARCH-03-cross-language-search-input.md) Done (pkg-000010) |
| [SEARCH-04 — Фильтры Institution + Дата](STORY-SPA-SEARCH-04-institution-date-filters.md) | контролы + опции из данных + проброс в репозиторий | D-S2, D-S8 | SEARCH-01, SEARCH-02; контракт [G3 §4.1](STORY-SPA-G3-search-input-toolbar.md) |
| [SEARCH-05 — Фильтр Geo](STORY-SPA-SEARCH-05-geo-filter.md) | admin-единицы; «без geo выпадает»; bbox — future | D-S2, D-S8 | SEARCH-01, SEARCH-02; [pipeline](../../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-05-geo-filter/STORY-SPA-SEARCH-05-geo-filter.md) Done (pkg-000012) |

## Рекомендуемый порядок

**Foundation:** G1 ✅ (done) → G3 (контракт, читается первым) → **Реализация:** SEARCH-01 → SEARCH-02 → SEARCH-03 → SEARCH-04 → SEARCH-05.

## Принципы набора

- **Чистый код / dev-связность:** UX-контейнер (02) отделён от контролов (03/04/05); сложный geo (05) вынесен из простых institution/date (04).
- **Бэк не требуется.** Gateway уже умеет все фильтры; поиск client-side; словари выравнивает SPA. Отдельной REQ-BE для этой темы нет (в отличие от localization). Единственная бэк-смежная заметка — устаревший `API_REFERENCE §7` (правка доки бэка, вне фронт-скоупа).

## ⚠️ Критическая координация с локализацией

[SEARCH-01](STORY-SPA-SEARCH-01-vocabulary-alignment.md) меняет канонические ключи меток на gateway-набор (`waste/district/infrastructure/safety`). Это **пересекается** с локализацией:
- переводы `labels.*` (G2) надо перевести на новые ключи;
- [L10N-02](../localization/STORY-SPA-L10N-02-dynamic-label-filter.md) (динамический фильтр меток) механически валиден, но состав ключей меняется.

SEARCH-01 — общий фундамент для фильтров и для локализации меток; делать раньше/совместно с пересмотром `labels.*`. Подробности — §5 [интервью-документа](../../../analysis/search-filters-cto-interview-2026-06-15.md).

## Связь с backlog

- Включает (перенесены в пакет): [G1](STORY-SPA-G1-gateway-endpoint-alignment.md) (real-API connection, done) и [G3](STORY-SPA-G3-search-input-toolbar.md) (контракт фильтров + SearchInput-исток).
- Регистрация: [../INDEX.md](../INDEX.md).
