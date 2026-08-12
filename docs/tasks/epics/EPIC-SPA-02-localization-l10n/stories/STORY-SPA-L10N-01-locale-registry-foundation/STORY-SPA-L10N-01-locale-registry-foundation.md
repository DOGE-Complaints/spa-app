# STORY-SPA-L10N-01 — Единый реестр локалей (фундамент)

## Meta

- **Key:** `STORY-SPA-L10N-01-locale-registry-foundation`
- **Parent Epic:** [`../../../../EPIC-SPA-02-localization-l10n.md`](../../../../EPIC-SPA-02-localization-l10n.md)
- **Status:** Done
- **Gap:** GL-1 (🟠), GL-6 (🟡) — [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)
- **Решения:** D7 (под N языков), D8 (единый реестр)
- **Зависит от:** —
- **Закрывает/поглощает:** HK-001 (мёртвый `languages.*`), часть G6/G8 (имена языков, дубль `LANGUAGE_OPTIONS`)
- **source:** [`spa-app/docs/tasks/backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md)
- **Decision Ref:** [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md); [localization/README.md](../../../../../../backlog-stories/localization/README.md); [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)

## Зачем простыми словами

Сейчас «какие языки поддерживаем» и «как они называются» размазано по коду в 4+ местах с хардкодом `et/ru/en`, есть мёртвый словарь и дублирующийся массив языков в двух страницах. Нужен **один источник правды о локалях**, из которого читает вся логика. Тогда добавить язык = одна правка, а не охота по файлам.

## Целевое (из интервью)

- Единый `SUPPORTED_LOCALES`: для каждой локали `{ code, endonym, flag, dir }` (endonym — самоназвание, напр. «Eesti»; `dir` — направление текста, ltr/rtl, на вырост).
- Вся локаль-логика (детект, нормализация, дефолт, fallback-цепочка, языковой селектор) читает **только** из реестра. Хардкода `et/ru/en` по коду нет.
- N-готовность: добавление языка = правка реестра + переводы. Грузим сейчас 3.
- Имена языков — endonym'ы (не переводятся) ⇒ это реестр-константа, а не словарь переводов (поэтому `languages.*` концептуально неуместен и удаляется).

## Scope (фактические точки)

- [src/i18n/core.js](../../../../../../../src/i18n/core.js): `SUPPORTED_LOCALES` (сейчас плоский `['et','ru','en']`, не используется — [:1](../../../../../../../src/i18n/core.js#L1)) → расширить до реестра с метаданными; `normalizeLocale` ([:7-9](../../../../../../../src/i18n/core.js#L7)), `resolveLanguage` дефолт ([:24](../../../../../../../src/i18n/core.js#L24)), `resolveLocalizedText` fallback-цепочка ([:33-35](../../../../../../../src/i18n/core.js#L33)) — перевести на чтение из реестра (GL-6).
- [src/i18n/I18nProvider.jsx](../../../../../../../src/i18n/I18nProvider.jsx): дефолт `'et'` ([:22](../../../../../../../src/i18n/I18nProvider.jsx#L22)) — из реестра.
- [src/pages/BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx) и [src/pages/IssuePage.jsx](../../../../../../../src/pages/IssuePage.jsx): дублирующийся `LANGUAGE_OPTIONS` (`nativeLabel`+`flagSrc`, без `dir`) — заменить единым импортом из реестра; убрать дубль.
- [src/i18n/dictionaries.js](../../../../../../../src/i18n/dictionaries.js): удалить мёртвую секцию `languages.*` ([:38,98,158](../../../../../../../src/i18n/dictionaries.js#L38)).

## Вне scope

- Перевод контента / метки fallback-маркеры (L10N-03).
- Фактическое добавление 4-го языка (только готовность структуры).
- Рефактор всего app-shell (G8) — только дедупликация языкового массива.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [i18n-architecture.md](../../../../../../i18n-architecture.md) | языки описаны как хардкод-список | описать реестр локалей как источник истины |
| [HK-001](../../../../../../backlog-stories/STORY-SPA-HK01-housekeeping-cleanup-sweep.md) | пункт «удалить `languages.*`» | пометить закрытым в составе L10N-01 |
| [localization-target…md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) | GL-1/GL-6 open | GL-1/GL-6 ✅ |

## Точки в коде (P1 facts, 2026-06-16)

- [`core.js:1`](../../../../../../../src/i18n/core.js) — `SUPPORTED_LOCALES` плоский массив; хардкод в `normalizeLocale` / default / fallback.
- [`I18nProvider.jsx:22`](../../../../../../../src/i18n/I18nProvider.jsx) — SSR default `'et'`.
- [`BoardPage.jsx:28-31`](../../../../../../../src/pages/BoardPage.jsx), [`IssuePage.jsx:8-11`](../../../../../../../src/pages/IssuePage.jsx) — дублирующийся `LANGUAGE_OPTIONS`.
- [`dictionaries.js:38`](../../../../../../../src/i18n/dictionaries.js) — мёртвая `languages.*` (×3 локали).

## Acceptance Criteria

- [x] Существует единый `SUPPORTED_LOCALES` с `{code, endonym, flag, dir}`; экспортирован как единственный источник.
- [x] `grep -rn "'et'\|'ru'\|'en'" src/` не находит хардкод-списков локалей в логике резолва/нормализации/дефолта/селектора (только данные/тесты).
- [x] Языковой селектор в Board и Issue читает из реестра; дублирующего `LANGUAGE_OPTIONS` нет.
- [x] Секция `languages.*` удалена из `dictionaries.js`; `grep "languages" src/i18n/dictionaries.js` = 0.
- [x] Добавление гипотетической 4-й локали в реестр не требует правок вне реестра + словарей (проверяется тестом/ревью). *Полнота app — T08 Done (StatusBadge на словаре).*
- [x] `npx vitest run` — green (79/79, 2026-06-16).

## Nested tasks

| Order | Task folder | Wave | Notes |
|---|---|---|---|
| 1 | [`task-spa-l10n-01-t01-locale-registry-data-model`](./task-spa-l10n-01-t01-locale-registry-data-model/README.md) | pkg-000003 | Registry SSOT |
| 2 | [`task-spa-l10n-01-t02-core-resolution-from-registry`](./task-spa-l10n-01-t02-core-resolution-from-registry/README.md) | pkg-000003 | core + I18nProvider |
| 3 | [`task-spa-l10n-01-t03-dedupe-language-selector-pages`](./task-spa-l10n-01-t03-dedupe-language-selector-pages/README.md) | pkg-000003 | BoardPage + IssuePage |
| 4 | [`task-spa-l10n-01-t04-remove-dead-languages-dictionary`](./task-spa-l10n-01-t04-remove-dead-languages-dictionary/README.md) | pkg-000003 | dictionaries.js |
| 5 | [`task-spa-l10n-01-t05-tests-n-locale-extensibility`](./task-spa-l10n-01-t05-tests-n-locale-extensibility/README.md) | pkg-000003 | Tests + grep guard |
| 6 | [`task-spa-l10n-01-t06-sync-doc-touchpoints-l10n01`](./task-spa-l10n-01-t06-sync-doc-touchpoints-l10n01/README.md) | pkg-000003 | Doc touchpoints |
| 7 | [`task-spa-l10n-01-t07-story-acceptance-verification`](./task-spa-l10n-01-t07-story-acceptance-verification/README.md) | pkg-000003 | Story gate |
| 8 | [`task-spa-l10n-01-t08-status-badge-dictionary-alignment`](./task-spa-l10n-01-t08-status-badge-dictionary-alignment/README.md) | `run_mode=spa_l10n_01_audit_2026_06_16` | Post-audit F1+F3 |
| 9 | [`task-spa-l10n-01-t09-locale-hardcode-guard-test`](./task-spa-l10n-01-t09-locale-hardcode-guard-test/README.md) | `run_mode=spa_l10n_01_audit_2026_06_16` | Post-audit F2 |
