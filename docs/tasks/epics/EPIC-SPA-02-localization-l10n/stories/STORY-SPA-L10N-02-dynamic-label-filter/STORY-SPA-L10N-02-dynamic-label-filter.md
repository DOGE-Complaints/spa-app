# STORY-SPA-L10N-02 — Динамический фильтр меток

## Meta

- **Key:** `STORY-SPA-L10N-02-dynamic-label-filter`
- **Parent Epic:** [`../../../../EPIC-SPA-02-localization-l10n.md`](../../../../EPIC-SPA-02-localization-l10n.md)
- **Status:** Done
- **Gap:** GL-2 (🟠) + GL-7 часть «фильтр» (🟡) — [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)
- **Решения:** D5 (метки вне списка допустимы), D9 (фильтр из загруженных issue)
- **Зависит от:** — (можно делать независимо от L10N-01)
- **source:** [`spa-app/docs/tasks/backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md)
- **Decision Ref:** [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md); [localization/README.md](../../../../../../backlog-stories/localization/README.md); [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)

## Зачем простыми словами

Таксономия меток растёт (новые метки приходят с бэка из ИИ-кластеризации). Сейчас фильтр на доске показывает **фиксированный хардкод-список** из 10 меток и не видит реальные метки данных. Нужно строить список фильтра **из меток фактически загруженных issue**, а курируемый список оставить как «набор, для которого мы гарантируем перевод».

## Целевое (из интервью)

- Дропдаун меток строится **динамически из меток загруженных issue** (D9), а не из `AVAILABLE_LABELS`.
- `AVAILABLE_LABELS` меняет роль: теперь это «**гарантированно переведённое ядро**», а не источник фильтра.
- **Известное ограничение D9:** набор фильтра неполный (видны только метки текущей выборки), может «прыгать» при смене фильтров/страниц. Полный реестр таксономии (через эндпоинт бэка) сознательно отложен (см. [REQUIREMENTS-BACKEND-L10N.md](../../../../../../backlog-stories/localization/REQUIREMENTS-BACKEND-L10N.md), раздел «Future»).
- Метки вне ядра отображаются (через `formatLabelKey` → humanize) — маркер «нет перевода» добавляется в L10N-03.

## Scope (фактические точки)

- [src/pages/BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx): источник `availableLabels` сейчас `AVAILABLE_LABELS` ([:16,181](../../../../../../../src/pages/BoardPage.jsx#L16)) → выводить из загруженных `issues` (множество всех `issue.labels`), при необходимости объединяя с курируемым ядром для стабильности.
- [src/components/Filters/LabelsFilter.jsx](../../../../../../../src/components/Filters/LabelsFilter.jsx): уже фильтрует переданный `availableLabels` ([:12-16](../../../../../../../src/components/Filters/LabelsFilter.jsx#L12)) — менять не обязательно, проверить поведение при пустом/растущем списке.
- [src/i18n/labelKeys.js](../../../../../../../src/i18n/labelKeys.js): зафиксировать в комментарии новую роль `AVAILABLE_LABELS` («гарантированно переведённое ядро», не источник фильтра).

## Вне scope

- Маркер «нет перевода» у метки (L10N-03).
- Эндпоинт таксономии на бэке (REQ-BE, future).
- Перевод новых меток (ручная докрутка словаря — отдельный процесс, D1).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [i18n-architecture.md](../../../../../../i18n-architecture.md) §labels | роль `AVAILABLE_LABELS` = список меток | роль = «гарантированно переведённое ядро»; фильтр динамический |
| [mockup-12](../../../../../../UX/mockups/mockup-12-dashboard-filter-labels-spec.md) | фильтр из фикс. списка | фильтр из данных |
| [localization-target…md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) | GL-2 open | GL-2 ✅ |

## Точки в коде (P1 facts, 2026-06-16)

- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) — `availableLabels` строится через `collectLabelKeysFromIssues(issues)` (без хардкода источника).
- [`BoardPage.jsx:49`](../../../../../../../src/pages/BoardPage.jsx) — `labels: boardFilters.labels` передаётся в `issueService.getIssues`.
- [`LabelsFilter.jsx:8-16`](../../../../../../../src/components/Filters/LabelsFilter.jsx) — принимает `availableLabels` prop; пустой массив → пустой dropdown без crash.
- [`labelKeys.js`](../../../../../../../src/i18n/labelKeys.js) — 10 frozen keys; роль зафиксирована как translated core, не источник фильтра.

## Acceptance Criteria

- [x] Дропдаун меток содержит метки, реально присутствующие в загруженных issue (а не только курируемые 10).
- [x] Метка из данных вне `AVAILABLE_LABELS` доступна для выбора в фильтре и корректно фильтрует.
- [x] Роль `AVAILABLE_LABELS` задокументирована как «гарантированно переведённое ядро».
- [x] Поведение детерминировано при пустой выборке (нет меток → фильтр пуст/disabled, без падений).
- [x] `npx vitest run` — green; добавлен тест на построение списка из набора issue.

## Nested tasks

| Order | Task folder | Wave | Notes |
|---|---|---|---|
| 1 | [`task-spa-l10n-02-t01-collect-label-keys-from-issues`](./task-spa-l10n-02-t01-collect-label-keys-from-issues/README.md) | pkg-000004 | Aggregate labels from issues |
| 2 | [`task-spa-l10n-02-t02-board-page-dynamic-available-labels`](./task-spa-l10n-02-t02-board-page-dynamic-available-labels/README.md) | pkg-000004 | BoardPage useMemo wire |
| 3 | [`task-spa-l10n-02-t03-labels-filter-empty-edge-cases`](./task-spa-l10n-02-t03-labels-filter-empty-edge-cases/README.md) | pkg-000004 | Empty/growing list UX |
| 4 | [`task-spa-l10n-02-t04-available-labels-core-role-comment`](./task-spa-l10n-02-t04-available-labels-core-role-comment/README.md) | pkg-000004 | labelKeys.js JSDoc |
| 5 | [`task-spa-l10n-02-t05-tests-dynamic-label-filter`](./task-spa-l10n-02-t05-tests-dynamic-label-filter/README.md) | pkg-000004 | Tests + outside-core label |
| 6 | [`task-spa-l10n-02-t06-sync-doc-touchpoints-l10n02`](./task-spa-l10n-02-t06-sync-doc-touchpoints-l10n02/README.md) | pkg-000004 | Doc touchpoints |
| 7 | [`task-spa-l10n-02-t07-story-acceptance-verification`](./task-spa-l10n-02-t07-story-acceptance-verification/README.md) | pkg-000004 | Story gate |
| 8 | [`task-spa-l10n-02-t08-board-filter-strict-data-only`](./task-spa-l10n-02-t08-board-filter-strict-data-only/README.md) | `run_mode=spa_l10n_02_audit_2026_06_16` | Post-audit F1 |
| 9 | [`task-spa-l10n-02-t09-mock-outside-core-label-seed`](./task-spa-l10n-02-t09-mock-outside-core-label-seed/README.md) | `run_mode=spa_l10n_02_audit_2026_06_16` | Post-audit F2 |
