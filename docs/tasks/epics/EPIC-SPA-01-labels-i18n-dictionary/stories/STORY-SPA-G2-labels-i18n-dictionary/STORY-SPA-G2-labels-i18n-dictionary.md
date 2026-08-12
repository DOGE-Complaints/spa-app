# STORY-SPA-G2 — Словарь переводов labels

## Meta

- **Key:** `STORY-SPA-G2-labels-i18n-dictionary`
- **Parent Epic:** [`../../../../EPIC-SPA-01-labels-i18n-dictionary.md`](../../../../EPIC-SPA-01-labels-i18n-dictionary.md)
- **Status:** Done (pkg-000002, 2026-06-12)
- **Gap:** G2 (High)
- **source:** [`spa-app/docs/tasks/backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md`](../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md)
- **Decision Ref:** [`../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md`](../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md); [spa-app-doc-code-gap-report.md](../../../../../../analysis/spa-app-doc-code-gap-report.md) §G2
- **Источник:** [spa-app-doc-code-gap-report.md](../../../../../../analysis/spa-app-doc-code-gap-report.md) §G2
- **Зависит от:** —

> **Pipeline note:** T00 — product workshop; финальная таблица ключей/переводов в `label-taxonomy-G2-approved.md` = SSOT для T01–T02. T00 **blocking** для T01–T07.

## Зачем простыми словами

Метки на карточках (bureaucracy, healthcare и т.д.) должны показываться на языке пользователя. Сейчас UI выводит сырой ключ в UPPERCASE (`BUREAUCRACY`). Нужен словарь `labels.*` в трёх локалях и подключение через `t()`.

## Scope

- [src/i18n/dictionaries.js](../../../../../../../src/i18n/dictionaries.js): секция `labels` для et/ru/en (все ключи из `AVAILABLE_LABELS` в [BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx)).
- [LabelsFilter.jsx](../../../../../../../src/components/Filters/LabelsFilter.jsx), [IssueCard.jsx](../../../../../../../src/components/IssueCard/IssueCard.jsx), [IssuePage.jsx](../../../../../../../src/pages/IssuePage.jsx): `t('labels.' + key)` с fallback на ключ.
- Тесты i18n/компонентов при необходимости.

## Вне scope

- i18n-объекты внутри payload labels на бекенде.
- Identity `identity.*` ключи.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [mock-layer-issues-guide.md](../../../../../../mock-layer-issues-guide.md) | Пометка G2 | Убрать; подтвердить `labels.*` в dictionaries |
| [i18n-architecture.md](../../../../../../i18n-architecture.md) §7.2 | Пометка G2 + «отображение через dictionary» | Убрать пометку; пример ключей |
| [mockup-12](../../../../../../UX/mockups/mockup-12-dashboard-filter-labels-spec.md) | Пометка G2 | Убрать |
| [mockup-17](../../../../../../UX/mockups/mockup-17-i18n-language-and-content-spec.md) | Пометка G2 | Убрать |
| [gap-report](../../../../../../analysis/spa-app-doc-code-gap-report.md) §5 | G2 open | G2 ✅ |
| [INDEX.md](../../../../../../backlog-stories/INDEX.md) | Todo | Done |

## Точки в коде (P1 facts, 2026-06-12)

- [`BoardPage.jsx:17`](../../../../../../../src/pages/BoardPage.jsx) — `AVAILABLE_LABELS` (10 civic keys); единственный whitelist для фильтра.
- [`dictionaries.js`](../../../../../../../src/i18n/dictionaries.js) — секции `labels` **нет** (только `issueType`, `status`, metadata).
- [`LabelsFilter.jsx:21-22,66`](../../../../../../../src/components/Filters/LabelsFilter.jsx) — сырой key в trigger/dropdown.
- [`IssueCard.jsx:42,56-58`](../../../../../../../src/components/IssueCard/IssueCard.jsx) — `String(l).toUpperCase()` для chips.
- [`IssuePage.jsx:107-109`](../../../../../../../src/pages/IssuePage.jsx) — `String(l).toUpperCase()` в metadata.
- [`I18nProvider.jsx:49-65`](../../../../../../../src/i18n/I18nProvider.jsx) — `t()` nested keys; miss → return full key string.
- [`types.js:140-141`](../../../../../../../src/domain/types.js) — `labels: string[]` без enum.
- Gateway: `canonical_labels` free-form ([API_REFERENCE](../../../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)).

## Acceptance Criteria

- [x] Все `AVAILABLE_LABELS` имеют переводы et/ru/en в `dictionaries.js`.
- [x] Фильтр, карточка и детали показывают локализованную метку, не UPPERCASE-ключ.
- [x] Переключение языка мгновенно обновляет labels.
- [x] Документация touchpoints обновлена.

## Nested tasks

| Order | Task folder | Wave | Notes |
|---|---|---|---|
| 0 | [`task-spa-g2-t00-label-taxonomy-product-workshop`](./task-spa-g2-t00-label-taxonomy-product-workshop/README.md) | pkg-000002 | **BLOCKING** — operator interview |
| 1 | [`task-spa-g2-t01-extract-label-keys-ssot`](./task-spa-g2-t01-extract-label-keys-ssot/README.md) | pkg-000002 | |
| 2 | [`task-spa-g2-t02-add-labels-dictionary-section`](./task-spa-g2-t02-add-labels-dictionary-section/README.md) | pkg-000002 | |
| 3 | [`task-spa-g2-t03-localize-labels-filter`](./task-spa-g2-t03-localize-labels-filter/README.md) | pkg-000002 | |
| 4 | [`task-spa-g2-t04-localize-issue-card-and-details`](./task-spa-g2-t04-localize-issue-card-and-details/README.md) | pkg-000002 | |
| 5 | [`task-spa-g2-t05-tests-labels-i18n`](./task-spa-g2-t05-tests-labels-i18n/README.md) | pkg-000002 | |
| 6 | [`task-spa-g2-t06-sync-doc-touchpoints-g2`](./task-spa-g2-t06-sync-doc-touchpoints-g2/README.md) | pkg-000002 | |
| 7 | [`task-spa-g2-t07-story-acceptance-verification`](./task-spa-g2-t07-story-acceptance-verification/README.md) | pkg-000002 | Story gate |
