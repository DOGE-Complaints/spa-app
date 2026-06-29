# Localization (i18n) — гид для разработчика (spa-app)

> Практическое руководство: как устроена локализация и **как правильно добавлять/менять UI-строки** на 3 языка (et/ru/en) без хардкода.
> Связанные доки: требования [14-i18n-identity-strings.md](../requirements/14-i18n-identity-strings.md); стори-ретрофит [STORY-SPA-ID-09](../tasks/backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) (SSOT identity-переводов).

---

## 1. Поддерживаемые языки

Реестр — единственный источник правды о локалях: [`src/i18n/core.js`](../../src/i18n/core.js)
```
SUPPORTED_LOCALES = [ et (Eesti), ru (Русский), en (English) ]
DEFAULT_LOCALE = 'et'
```
Endonym'ы (Eesti/Русский/English) и флаги **не переводятся**. Выбор языка хранится в `localStorage['doge.locale']` и проставляется в `<html lang>`.

---

## 2. Как работает перевод (механизм)

```
компонент → useI18n().t('namespace.key') → UI_DICTIONARY[locale] → строка
```

- **`UI_DICTIONARY`** ([`src/i18n/dictionaries.js`](../../src/i18n/dictionaries.js)) — объект `{ et:{…}, ru:{…}, en:{…} }`. Ключи — точечные (`auth.signIn.title`).
- **`t(key)`** ([`I18nProvider.jsx`](../../src/i18n/I18nProvider.jsx)) ищет ключ в активной локали, при промахе идёт по fallback-цепочке (активная → остальные из реестра), и **возвращает сам key, если перевода нет нигде** (поэтому промах виден в UI как `auth.signIn.title`).
- Компонент получает `t` одним из двух способов (оба допустимы):
  - `const { t } = useI18n()` — так делает identity-UI и страницы;
  - проп `t` сверху — так сделаны фильтры доски (`<StatusFilter t={t} />`).

`useI18n()` также даёт `locale`, `setLocale`, `resolveLocalizedText` (для **контентных** i18n-полей данных, напр. `issue.title.{et,ru,en}` — это другое, см. §7).

---

## 3. ⭐ Где какие строки лежат (модульность)

`UI_DICTIONARY` физически собран из **двух источников** — это важно знать, чтобы не искать ключи не в том файле:

| Набор строк | Файл | Как попадает в `UI_DICTIONARY` |
|-------------|------|--------------------------------|
| **Board / Issue / общие** (`board`, `filterStatus`, `clear`, `searchPlaceholder`…) | [`dictionaries.js`](../../src/i18n/dictionaries.js) — напрямую в блоках `et/ru/en` | уже там |
| **Identity** (`auth.*`, `session.*`, `civic.*`, `phone.*`, `phoneError.*`, `verifyPage.*`, `dashboard.*`, `appShell.*`) | [`identityDictionary.js`](../../src/i18n/identityDictionary.js) — экспорты `IDENTITY_DICTIONARY_{EN,ET,RU}` | `dictionaries.js` делает `...IDENTITY_DICTIONARY_ET` (spread) в каждую локаль |

```js
// dictionaries.js (сокращённо)
import { IDENTITY_DICTIONARY_EN, IDENTITY_DICTIONARY_ET, IDENTITY_DICTIONARY_RU } from './identityDictionary.js'
export const UI_DICTIONARY = Object.freeze({
  et: { board: 'Töölaud', /* … */ ...IDENTITY_DICTIONARY_ET },
  ru: { /* … */ ...IDENTITY_DICTIONARY_RU },
  en: { /* … */ ...IDENTITY_DICTIONARY_EN },
})
```

**Правило:** identity-строку **добавляй в `identityDictionary.js`** (НЕ в `dictionaries.js`). Board/Issue-строку — в `dictionaries.js`. В рантайме это один словарь и один `t()` — фрагментации нет, просто большой identity-набор вынесен в свой модуль.

`identityDictionary.js` также экспортирует:
- `IDENTITY_DICTIONARY_BY_LOCALE` — для forbidden-сканера;
- **`IDENTITY_FLAT_KEYS`** — плоский список всех identity-ключей; используется parity-тестом (см. §6). **Новый ключ нужно туда добавить.**

---

## 4. Интерполяция (числа/таймеры/префиксы)

`t()` возвращает строку **как есть** (с плейсхолдерами). Для подстановки используется [`formatI18nMessage`](../../src/i18n/formatI18nMessage.js):
```js
import { formatI18nMessage } from '../i18n/formatI18nMessage.js'
formatI18nMessage(t('phoneError.meta.attempts'), { n: 3 })   // "Attempts remaining: 3"
formatI18nMessage(t('phone.otp.resendIn'), { seconds: 42 })  // "Resend code (42s)"
```
Плейсхолдер — `{name}`; неизвестные оставляются как есть. **Никогда не склеивай** язык-зависимые куски строкой (`t('x') + ': ' + value`) — клади плейсхолдер в перевод.

Текущие интерполируемые ключи: `phone.otp.resendIn` `{seconds}`, `phoneError.meta.attempts` `{n}`, `phoneError.meta.cooldown` `{timer}`, `civic.verified.dialPrefix` `{prefix}`, `session.statusReady` `{status}`, `auth.magicSent.minutesRemaining` `{n}`.

---

## 5. ✅ Рецепт: добавить/изменить UI-строку

### Identity-строка (auth/session/civic/phone/…)
1. **Перевод на 3 языка** — добавь ключ в `IDENTITY_DICTIONARY_EN`, `IDENTITY_DICTIONARY_ET`, `IDENTITY_DICTIONARY_RU` в [`identityDictionary.js`](../../src/i18n/identityDictionary.js) (тот же путь-ключ в каждом).
2. **Зарегистрируй ключ** в `IDENTITY_FLAT_KEYS` (там же) — иначе parity-тест его не проверит.
3. **В компоненте** — `const { t } = useI18n()` и `t('namespace.key')`; если в строке есть `{…}` — оберни `formatI18nMessage(t('…'), {…})`.
4. **Запрещённые термины** — не используй `KYC`, `government identity check`, `bank verification`, `legal identity` ни в одном языке (см. §6).
5. `npx vitest run` — должны пройти parity/forbidden/hardcode-гварды.

### Board/Issue/общая строка
То же, но ключ кладёшь прямо в блоки `et/ru/en` в [`dictionaries.js`](../../src/i18n/dictionaries.js) (без `IDENTITY_FLAT_KEYS`).

### Анти-паттерны (так НЕ делать)
- ❌ Английский литерал в JSX (`<h1>Sign In</h1>`) — только `t('auth.signIn.title')`.
- ❌ Отдельный const-файл с готовыми строками (старые `civicStatusLabels.js` и т.п. теперь хранят **ключи**, не текст).
- ❌ Хардкод массива локалей `['et','ru','en']` или дубль language-selector — ловится `localeHardcodeGuard` (§6).
- ❌ Перевод только на en (забыли et/ru) — ловится parity-тестом.

---

## 6. Гварды и тесты (что обязано быть зелёным)

| Тест | Что проверяет |
|------|---------------|
| [`identityDictionary.test.js`](../../src/i18n/__tests__/identityDictionary.test.js) | **parity** — все `IDENTITY_FLAT_KEYS` есть в et/ru/en (`findMissingIdentityDictionaryKeys()===[]`); **forbidden** — нет запрещённых терминов ни в одной локали (`scanIdentityDictionaryForbiddenTerms()===[]`); interpolation |
| [`localeHardcodeGuard.test.js`](../../src/i18n/__tests__/localeHardcodeGuard.test.js) | бан хардкод-паттернов: `LANGUAGE_OPTIONS`, `STATUS_LABELS`, `['et','ru','en']`, дубль language-selector (allowlist: `core.js`, `dictionaries.js`, `mockIssues.js`) |

Запрещённые термины — список и хелперы в [`forbiddenVerificationTerms.js`](../../src/i18n/forbiddenVerificationTerms.js) (`findForbiddenVerificationTerm`).

Запуск: `npx vitest run` (или прицельно `npx vitest run src/i18n`).

---

## 7. Два разных «i18n» — не путать

1. **UI-строки** (этот гид): статичные подписи интерфейса → `t('key')` + `UI_DICTIONARY`.
2. **Контент данных** (issue.title/description/institution): приходят как объект `{et,ru,en}` из бэка → резолвятся `resolveLocalizedText(field, locale)` / `resolveLocalizedTextWithMeta` ([`core.js`](../../src/i18n/core.js)); маркеры машинного перевода/fallback — отдельный слой (EPIC-SPA-02 L10N). Это **не** про `UI_DICTIONARY`.

---

## 8. Каноничные строки (особые правила)

- **Civic-status лейблы** (`civic.label.notVerified/verified/walletNotLinked`): EN-значение фиксировано (FR-03.3), не подменять синонимами; et/ru — перевод.
- **Disclosure** (`phone.disclosure.body`): EN = канон [DOC-IDS-ONB-02]; et/ru — перевод.
- Технические значения (`data-testid`, error-`code`, `trace_id`) — **не** локализуются.

---

## 9. Definition of Done по локализации (для любой UI-стори)

- [ ] Нет английских литералов в JSX/компонентах — всё через `t()`.
- [ ] Ключи добавлены на **3 языка** (identity → `identityDictionary.js` + `IDENTITY_FLAT_KEYS`; общие → `dictionaries.js`).
- [ ] Интерполяция через `formatI18nMessage`, без склейки строк.
- [ ] Запрещённые термины отсутствуют во всех языках.
- [ ] `npx vitest run` зелёный (parity + forbidden + hardcode-guard).
- [ ] Смена языка в шапке меняет экран целиком.

---

*Сверено с фактическим кодом `src/i18n/*` (2026-06-29): core/dictionaries/identityDictionary/I18nProvider/formatI18nMessage/forbiddenVerificationTerms + тесты identityDictionary/localeHardcodeGuard.*
