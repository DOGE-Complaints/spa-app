# STORY-SPA-L10N-01 — Единый реестр локалей (фундамент)

## Meta

- **Key:** `STORY-SPA-L10N-01-locale-registry-foundation`
- **Status:** Todo
- **Gap:** GL-1 (🟠), GL-6 (🟡) — [localization-target-and-gap-analysis-2026-06-15.md](../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)
- **Решения:** D7 (под N языков), D8 (единый реестр)
- **Зависит от:** —
- **Закрывает/поглощает:** HK-001 (мёртвый `languages.*`), часть G6/G8 (имена языков, дубль `LANGUAGE_OPTIONS`)

## Зачем простыми словами

Сейчас «какие языки поддерживаем» и «как они называются» размазано по коду в 4+ местах с хардкодом `et/ru/en`, есть мёртвый словарь и дублирующийся массив языков в двух страницах. Нужен **один источник правды о локалях**, из которого читает вся логика. Тогда добавить язык = одна правка, а не охота по файлам.

## Целевое (из интервью)

- Единый `SUPPORTED_LOCALES`: для каждой локали `{ code, endonym, flag, dir }` (endonym — самоназвание, напр. «Eesti»; `dir` — направление текста, ltr/rtl, на вырост).
- Вся локаль-логика (детект, нормализация, дефолт, fallback-цепочка, языковой селектор) читает **только** из реестра. Хардкода `et/ru/en` по коду нет.
- N-готовность: добавление языка = правка реестра + переводы. Грузим сейчас 3.
- Имена языков — endonym'ы (не переводятся) ⇒ это реестр-константа, а не словарь переводов (поэтому `languages.*` концептуально неуместен и удаляется).

## Scope (фактические точки)

- [src/i18n/core.js](../../../../src/i18n/core.js): `SUPPORTED_LOCALES` (сейчас плоский `['et','ru','en']`, не используется — [:1](../../../../src/i18n/core.js#L1)) → расширить до реестра с метаданными; `normalizeLocale` ([:7-9](../../../../src/i18n/core.js#L7)), `resolveLanguage` дефолт ([:24](../../../../src/i18n/core.js#L24)), `resolveLocalizedText` fallback-цепочка ([:33-35](../../../../src/i18n/core.js#L33)) — перевести на чтение из реестра (GL-6).
- [src/i18n/I18nProvider.jsx](../../../../src/i18n/I18nProvider.jsx): дефолт `'et'` ([:22](../../../../src/i18n/I18nProvider.jsx#L22)) — из реестра.
- [src/pages/BoardPage.jsx](../../../../src/pages/BoardPage.jsx) и [src/pages/IssuePage.jsx](../../../../src/pages/IssuePage.jsx): дублирующийся `LANGUAGE_OPTIONS` (`nativeLabel`+`flagSrc`, без `dir`) — заменить единым импортом из реестра; убрать дубль.
- [src/i18n/dictionaries.js](../../../../src/i18n/dictionaries.js): удалить мёртвую секцию `languages.*` ([:38,98,158](../../../../src/i18n/dictionaries.js#L38)).

## Вне scope

- Перевод контента / метки fallback-маркеры (L10N-03).
- Фактическое добавление 4-го языка (только готовность структуры).
- Рефактор всего app-shell (G8) — только дедупликация языкового массива.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [i18n-architecture.md](../../../i18n-architecture.md) | языки описаны как хардкод-список | описать реестр локалей как источник истины |
| [HK-001](../STORY-SPA-HK01-housekeeping-cleanup-sweep.md) | пункт «удалить `languages.*`» | пометить закрытым в составе L10N-01 |
| [localization-target…md](../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) | GL-1/GL-6 open | GL-1/GL-6 ✅ |

## Acceptance Criteria

- [ ] Существует единый `SUPPORTED_LOCALES` с `{code, endonym, flag, dir}`; экспортирован как единственный источник.
- [ ] `grep -rn "'et'\|'ru'\|'en'" src/` не находит хардкод-списков локалей в логике резолва/нормализации/дефолта/селектора (только данные/тесты).
- [ ] Языковой селектор в Board и Issue читает из реестра; дублирующего `LANGUAGE_OPTIONS` нет.
- [ ] Секция `languages.*` удалена из `dictionaries.js`; `grep "languages" src/i18n/dictionaries.js` = 0.
- [ ] Добавление гипотетической 4-й локали в реестр не требует правок вне реестра + словарей (проверяется тестом/ревью).
- [ ] `npx vitest run` — green.
