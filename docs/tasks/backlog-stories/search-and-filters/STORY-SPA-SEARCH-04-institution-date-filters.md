# STORY-SPA-SEARCH-04 — Фильтры Institution и Дата (+ проброс в репозиторий)

## Meta

- **Key:** `STORY-SPA-SEARCH-04-institution-date-filters`
- **Status:** Todo
- **Решения:** D-S2 (выносим institution + дату), D-S8 (варианты — из загруженных issue) — [search-filters-cto-interview-2026-06-15.md](../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Зависит от:** [SEARCH-01](STORY-SPA-SEARCH-01-vocabulary-alignment.md) (значения/контракт), [SEARCH-02](STORY-SPA-SEARCH-02-filter-panel-shell.md) (панель)

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
- [src/router/boardQuery.js](../../../../src/router/boardQuery.js): добавить параметры `institution`, `created_after`, `created_before` в parse/serialize.
- [src/repositories/GatewayIssueRepository.js](../../../../src/repositories/GatewayIssueRepository.js): `buildIssuesQuery` ([:19-35](../../../../src/repositories/GatewayIssueRepository.js#L19)) — прокинуть новые параметры (учесть формат: SPA-URL CSV ↔ gateway repeated/scalar — конвертит репозиторий).
- [src/repositories/InMemoryIssueRepository.js](../../../../src/repositories/InMemoryIssueRepository.js): `applyReadFilters` — поддержать те же фильтры для `FAKE-OLD` (паритет режимов).

## Вне scope

- Geo (SEARCH-05).
- Полный справочник ведомств с бэка (D-S8 = из данных; справочник — future).
- Виджет-календарь premium-уровня — достаточно стандартного date-range.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [search-filters…md](../../../analysis/search-filters-cto-interview-2026-06-15.md) | institution/date не в UI | реализованы |
| [reusable-ui-components-architecture.md](../../../UX/reusable-ui-components-architecture.md) | — | добавить контролы |

## Acceptance Criteria

- [ ] В панели есть контролы Institution и Дата (от/до).
- [ ] Варианты Institution собираются из загруженных issue.
- [ ] `GFL-DRIVEN`: фильтры прокидываются в `GET /tallinn/issues` и сужают выдачу на бэке.
- [ ] `FAKE-OLD`: те же фильтры работают client-side (паритет).
- [ ] Параметры сохраняются/восстанавливаются через URL; чипы отображают применённое.
- [ ] `npx vitest run` — green; тесты на buildIssuesQuery (новые параметры) и applyReadFilters.
