# STORY-SPA-SEARCH-01 — Выравнивание словарей status/type/labels под канон gateway

## Meta

- **Key:** `STORY-SPA-SEARCH-01-vocabulary-alignment`
- **Status:** Done
- **Тип:** фундамент / блокёр server-side фильтрации
- **Решение:** D-S5 (gateway — канон, SPA выравниваем под него) — [search-filters-cto-interview-2026-06-15.md](../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Зависит от:** — (делать первым в теме)
- **Координация:** локализация меток (`labels.*` из G2, [L10N-02](../localization/STORY-SPA-L10N-02-dynamic-label-filter.md)) — канонические ключи меняются (см. §«Координация»)

## Зачем простыми словами

Сейчас SPA фильтрует по своим кодам (`complaint`, `VERIFIED`, `bureaucracy`), а реальный бэк хранит и отдаёт другие (`INCIDENT`, `PUBLISHED`, `waste`). Из-за этого в реальном режиме (`GFL-DRIVEN`) серверные фильтры почти всегда возвращают пусто. Решено: **источник истины — бэк**; приводим словари SPA к тому, что реально отдаёт gateway. Без этого вся остальная работа по фильтрам (SEARCH-02/04/05) не даст результата на реальных данных.

## Целевое (канон gateway — verified в [enums.py](../../../../../doge-complaints-gateway/src/core/projection/enums.py))

- **status:** `NEW`, `IN_REVIEW`, `PUBLISHED`.
- **type:** `IMPROVEMENT`, `SERVICE_REQUEST`, `INCIDENT`.
- **labels:** `waste`, `district`, `infrastructure`, `safety` (governed; расширяется версионно на бэке).
- Вход GPT маппится в канон на бэке (`complaint→INCIDENT`, `observation→IMPROVEMENT`, …) — это **на стороне бэка**, SPA получает уже канон.

## Scope (фактические точки SPA)

- [src/domain/types.js](../../../../src/domain/types.js): `ISSUE_STATUS` ([:1-6](../../../../src/domain/types.js#L1)), `ISSUE_TYPE` ([:8-13](../../../../src/domain/types.js#L8)) — привести к канону gateway.
- [src/i18n/labelKeys.js](../../../../src/i18n/labelKeys.js): `AVAILABLE_LABELS` — на gateway-набор.
- [src/i18n/dictionaries.js](../../../../src/i18n/dictionaries.js): переводы `status.*`, `issueType.*`, `labels.*` — перевести под новые ключи (et/ru/en).
- [src/components/StatusBadge.jsx](../../../../src/components/StatusBadge.jsx): `STATUS_LABELS`/`STATUS_CLASS` ([:4-34](../../../../src/components/StatusBadge.jsx#L4)) — под новые статусы (включая `PUBLISHED`).
- [src/router/boardQuery.js](../../../../src/router/boardQuery.js): валидация `status`/`type` против обновлённых enum ([:3-4,26-28](../../../../src/router/boardQuery.js#L3)).
- [src/router/mockIssues.js](../../../../src/router/mockIssues.js): `ROUTING_DEMO_ISSUES` — статусы/типы/метки моков на канон (иначе `FAKE-OLD` разойдётся с `GFL-DRIVEN`).
- Тесты: types/boardQuery/StatusBadge/labelDisplay — обновить ожидания.

## Вне scope

- UI-панель/чипы (SEARCH-02), новые контролы (SEARCH-04/05), поиск (SEARCH-03).
- Изменение бэка (бэк — канон, не трогаем).
- Расширение governed-набора меток (это версионный процесс на бэке).

## ⚠️ Координация с локализацией

- Канонические ключи меток меняются (`bureaucracy/…` → `waste/district/infrastructure/safety`). Переводы `labels.*` (G2) надо переключить на новые ключи.
- Механика [L10N-02](../localization/STORY-SPA-L10N-02-dynamic-label-filter.md) (фильтр из загруженных issue) остаётся; меняется состав ключей.
- Рекомендация: SEARCH-01 — общий фундамент; согласовать с пересмотром `labels.*` и L10N-02, не дублировать.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [spa-app-doc-code-gap-report.md](../../../analysis/spa-app-doc-code-gap-report.md) §G3 §5 | блокёр словарей open | блокёр закрыт; словари = gateway-канон |
| [i18n-architecture.md](../../../i18n-architecture.md) | label keys = SPA-набор | label keys = gateway governed-набор |
| [search-filters…md](../../../analysis/search-filters-cto-interview-2026-06-15.md) | D-S5 open | D-S5 ✅ |

## Acceptance Criteria

- [x] `ISSUE_STATUS` = `{NEW, IN_REVIEW, PUBLISHED}`; `ISSUE_TYPE` = `{IMPROVEMENT, SERVICE_REQUEST, INCIDENT}`; `AVAILABLE_LABELS` = gateway governed-набор.
- [x] Переводы `status.*`/`issueType.*`/`labels.*` присутствуют для всех новых ключей в et/ru/en (completeness-guard зелёный).
- [x] StatusBadge корректно рендерит все новые статусы (включая `PUBLISHED`), с безопасным fallback.
- [x] `boardQuery` пропускает/валидирует новые коды; старые молча отбрасываются.
- [x] Моки (`FAKE-OLD`) используют канон → совпадают по словарям с `GFL-DRIVEN`.
- [x] В `GFL-DRIVEN` серверный фильтр по status/type/labels возвращает непустой результат на реальных данных (проверяемо).
- [x] `npx vitest run` — green.
