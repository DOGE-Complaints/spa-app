# STORY-SPA-G2 — Словарь переводов labels

## Meta

- **Key:** `STORY-SPA-G2-labels-i18n-dictionary`
- **Status:** Done (pkg-000002, 2026-06-12)
- **Gap:** G2 (High)
- **Источник:** [spa-app-doc-code-gap-report.md](../../analysis/spa-app-doc-code-gap-report.md) §G2
- **Зависит от:** —

## Зачем простыми словами

Метки на карточках (bureaucracy, healthcare и т.д.) должны показываться на языке пользователя. Сейчас UI выводит сырой ключ в UPPERCASE (`BUREAUCRACY`). Нужен словарь `labels.*` в трёх локалях и подключение через `t()`.

## Scope

- [src/i18n/dictionaries.js](../../../src/i18n/dictionaries.js): секция `labels` для et/ru/en (все ключи из `AVAILABLE_LABELS` в [BoardPage.jsx](../../../src/pages/BoardPage.jsx)).
- [LabelsFilter.jsx](../../../src/components/Filters/LabelsFilter.jsx), [IssueCard.jsx](../../../src/components/IssueCard/IssueCard.jsx), [IssuePage.jsx](../../../src/pages/IssuePage.jsx): `t('labels.' + key)` с fallback на ключ.
- Тесты i18n/компонентов при необходимости.

## Вне scope

- i18n-объекты внутри payload labels на бекенде.
- Identity `identity.*` ключи.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [mock-layer-issues-guide.md](../../mock-layer-issues-guide.md) | Пометка G2 | Убрать; подтвердить `labels.*` в dictionaries |
| [i18n-architecture.md](../../i18n-architecture.md) §7.2 | Пометка G2 + «отображение через dictionary» | Убрать пометку; пример ключей |
| [mockup-12](../../UX/mockups/mockup-12-dashboard-filter-labels-spec.md) | Пометка G2 | Убрать |
| [mockup-17](../../UX/mockups/mockup-17-i18n-language-and-content-spec.md) | Пометка G2 | Убрать |
| [gap-report](../../analysis/spa-app-doc-code-gap-report.md) §5 | G2 open | G2 ✅ |
| [INDEX.md](INDEX.md) | Todo | Done |

## Acceptance Criteria

- [x] Все `AVAILABLE_LABELS` имеют переводы et/ru/en в `dictionaries.js`.
- [x] Фильтр, карточка и детали показывают локализованную метку, не UPPERCASE-ключ.
- [x] Переключение языка мгновенно обновляет labels.
- [x] Документация touchpoints обновлена.
