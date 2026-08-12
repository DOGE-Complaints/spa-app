# STORY-SPA-SEARCH-04 — Фильтры Institution и Дата (+ проброс в репозиторий)

## Meta (pipeline)

- **Key:** `STORY-SPA-SEARCH-04-institution-date-filters`
- **Parent Epic:** [`../../../../EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md)
- **Status:** Done
- **Wave:** `pkg-000011`
- **source:** [`spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md)
- **Decision Ref:** [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md); [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) (D-S2, D-S8)
- **Решения:** D-S2 (выносим institution + дату), D-S8 (варианты — из загруженных issue)
- **Зависит от:** [SEARCH-01](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) (Done, pkg-000008), [SEARCH-02](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md) (Done, pkg-000009)
- **ui_scope:** `mixed` · **ui_complexity:** `standard`

---

## Зачем простыми словами

Бэк уже умеет фильтровать по ведомству (institution) и по дате создания (от/до), но SPA это не использует. Добавляем два контрола в панель и прокидываем их в запрос к gateway.

## Целевое (из интервью)

- Контрол **Institution** (выбор ведомства); **варианты — из загруженных issue** (D-S8), как метки в L10N-02 (не фикс-справочник).
- Контрол **Дата создания** (от/до) по `created_at`.
- Оба фильтра прокидываются в `GatewayIssueRepository` и реально сужают выдачу на бэке.
- Применение — батч, через панель SEARCH-02; состояние — в URL.

## Контракт бэка (verified, см. [G3 §4.1](STORY-SPA-G3-search-input-toolbar.md))

- `institution`: exact-match по любому из `et/ru/en` (i18n) или legacy scalar — [read_filters.py:134-142](../../../../../doge-complaints-gateway/src/core/projection/read_filters.py#L134).
- `created_after`/`created_before`: строковое ISO-сравнение, обе границы inclusive — [read_filters.py:214-217](../../../../../doge-complaints-gateway/src/core/projection/read_filters.py#L214).
- Бэк готов; менять бэк не нужно.

## Scope (фактические точки)

- Новые контролы Institution + DateRange в панели (SEARCH-02).
- Derive опций institution из загруженных `issues` (множество `resolveLocalizedText(issue.institution)` / ключей).
- [src/router/boardQuery.js](../../../../../../../src/router/boardQuery.js): добавить параметры `institution`, `created_after`, `created_before` в parse/serialize.
- [src/repositories/GatewayIssueRepository.js](../../../../../../../src/repositories/GatewayIssueRepository.js): `buildIssuesQuery` ([:19-35](../../../../../../../src/repositories/GatewayIssueRepository.js#L19)) — прокинуть новые параметры (учесть формат: SPA-URL CSV ↔ gateway repeated/scalar — конвертит репозиторий).
- [src/repositories/InMemoryIssueRepository.js](../../../../../../../src/repositories/InMemoryIssueRepository.js): `applyReadFilters` — поддержать те же фильтры для `FAKE-OLD` (паритет режимов).

## Вне scope

- Geo (SEARCH-05).
- Полный справочник ведомств с бэка (D-S8 = из данных; справочник — future).
- Виджет-календарь premium-уровня — достаточно стандартного date-range.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [search-filters…md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) | institution/date не в UI | реализованы |
| [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) | — | добавить контролы |

## Acceptance Criteria

- [x] В панели есть контролы Institution и Дата (от/до).
- [x] Варианты Institution собираются из загруженных issue.
- [x] `GFL-DRIVEN`: фильтры прокидываются в `GET /tallinn/issues` и сужают выдачу на бэке.
- [x] `FAKE-OLD`: те же фильтры работают client-side (паритет).
- [x] Параметры сохраняются/восстанавливаются через URL; чипы отображают применённое.
- [x] `npx vitest run` — green; тесты на buildIssuesQuery (новые параметры) и applyReadFilters.

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-search-04-t01-board-query-institution-date`](./task-spa-search-04-t01-board-query-institution-date/README.md) | pkg-000011 |
| 2 | [`task-spa-search-04-t02-institution-filter-dynamic-options`](./task-spa-search-04-t02-institution-filter-dynamic-options/README.md) | pkg-000011 |
| 3 | [`task-spa-search-04-t03-date-range-filter-control`](./task-spa-search-04-t03-date-range-filter-control/README.md) | pkg-000011 |
| 4 | [`task-spa-search-04-t04-repository-filter-projection`](./task-spa-search-04-t04-repository-filter-projection/README.md) | pkg-000011 |
| 5 | [`task-spa-search-04-t05-filter-panel-board-wiring`](./task-spa-search-04-t05-filter-panel-board-wiring/README.md) | pkg-000011 |
| 6 | [`task-spa-search-04-t06-tests-institution-date-filters`](./task-spa-search-04-t06-tests-institution-date-filters/README.md) | pkg-000011 |
| 7 | [`task-spa-search-04-t07-documentation-touchpoints`](./task-spa-search-04-t07-documentation-touchpoints/README.md) | pkg-000011 |
| 8 | [`task-spa-search-04-t08-story-gate-search-04`](./task-spa-search-04-t08-story-gate-search-04/README.md) | pkg-000011 |
