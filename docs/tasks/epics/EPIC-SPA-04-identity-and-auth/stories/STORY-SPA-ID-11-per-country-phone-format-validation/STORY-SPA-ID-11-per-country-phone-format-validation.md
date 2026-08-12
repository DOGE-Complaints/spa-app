# STORY-SPA-ID-11 — Валидация формата телефона по стране (country-driven)

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-11-per-country-phone-format-validation`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · **Волна 3 (Protected action)**
- **Status:** Done
- **Wave:** `pkg-000024` (scaffold 2026-06-30)
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md)
- **Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md); [mockup-127-phone-input-per-country-format-validation-spec.md](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md); [mockup-37-verification-error-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md); [STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)
- **Источник:** запрос оператора 2026-06-30; артборд **M127** (исходно — M32 §State B «phone formatting / validation hints»).
- **Backend:** валидацию формата делает FE; бэкенд нормализует/проверяет E.164 на своей стороне (defense-in-depth).
- **ui_scope:** `visual` (M127 anchor — T04)

## Артборд (SSOT дизайна)
- **Основной:** [mockup-127-phone-input-per-country-format-validation-spec.md](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md) · [png](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.png) — States A Valid (EE) · B Invalid format (EE) · C Different country (DE) · D Empty.
- Контекст: селектор [M126/ID-10](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md); тон ошибок — как [M37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) (diagnostic, recoverable).
- ⚠️ Тексты и `PHONE_FORMAT_BY_COUNTRY` ниже синхронизированы с **M127 §5/§7** (мокап — приоритет).

## Зачем простыми словами
Сейчас валидация номера — **только для Эстонии**: `validateEstonianPhone` / `ESTONIAN_PHONE_PATTERN = /^\+372\d{7,8}$/` ([verificationFlowState.js:24-53](../../../../../../../../src/auth/verificationFlowState.js#L24)). После того как [ID-10](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) даёт **выбор страны**, нужно, чтобы **выбранная страна определяла допустимый формат номера** (длина/маска/пример). Для этого собираем датасет «страна → правила формата E.164».

## Зависимости
- **Зависит от [ID-10](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)** (селектор страны уже есть; эта стори добавляет валидацию формата под выбранную страну).

## Что собрать (датасет — главный артефакт; структура из M127 §5)
SSOT `PHONE_FORMAT_BY_COUNTRY` — на каждую страну селектора (поля из артборда M127):
```ts
interface PhoneCountryFormat {
  countryCode: string;            // 'EE'
  countryName: string;            // локализуемое имя (из датасета стран ID-10)
  dialPrefix: string;             // '+372'
  supported: boolean;             // зеркало backend PHONE_ALLOWED_DIAL_PREFIXES
  nationalNumberLengths: number[];// [7,8]
  pattern: string;                // маска/regex, напр. '#### ####'
  examplePlaceholder: string;     // '5555 5555'
  validationHint: string;         // ключ/шаблон phone.format.*
}
```
**Примеры (M127 §5):**
| country | dialPrefix | nationalNumberLengths | pattern | examplePlaceholder |
|---------|-----------|------------------------|---------|--------------------|
| EE | `+372` | `[7,8]` | `#### ####` | `5555 5555` |
| DE | `+49` | `[10,11]` | `#### ########` | `1512 3456789` |

> **Источник данных:** курируемый поднабор метаданных (libphonenumber-стиль, без тяжёлой зависимости в MVP) для стран селектора ID-10. Расширяемо; `libphonenumber-js` — оценить отдельно (вне MVP).

## Функциональные требования (FR)
- **FR-11.1** `PHONE_FORMAT_BY_COUNTRY` SSOT (новый модуль, напр. `src/auth/phoneFormats.js`): `{ dialPrefix, nationalNumberLengths, pattern, examplePlaceholder }` на страну.
- **FR-11.2** Обобщить валидацию: `validatePhoneForCountry(country, nationalDigits)` → `{ valid, hintKey }`, заменяя жёсткий `validateEstonianPhone` (Эстония остаётся частным случаем; **обратная совместимость** существующего OTP happy-path).
- **FR-11.3** `formatPhoneForCountry(country, nationalDigits)` → E.164 по `dialPrefix`+нормализация; placeholder/маска из датасета на выбранную страну.
- **FR-11.4** Выбор страны в [ID-10](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)-селекторе **меняет** допустимый формат (placeholder, длины, hint) в реальном времени.
- **FR-11.5** Валидация применяется там, где номер реально используется: supported-страна (Эстония) — гейтит OTP-кнопку; для unsupported (waitlist-контекст ID-10) — формат **необязателен** (телефон опционален, не блокирует waitlist).
- **FR-11.6** Hint-сообщения локализованы и **специфичны по стране** (длина/пример) — шаблон с `{country}`/`{example}` через `formatI18nMessage`.
- **FR-11.7** **Локализация (L10N) — сразу:** строки/хинты через `t()`; ключи в [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) **+ `IDENTITY_FLAT_KEYS`**, et/ru/en. Гид: [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); запрещённые термины — ни в одном языке.

## Routes / API
- Без новых роутов/эндпоинтов. Чистая FE-валидация формата (бэкенд E.164-проверку дублирует на своей стороне). Существующие `validateEstonianPhone`/`formatEstonianPhone` → мигрируют в `*ForCountry` (Эстония = частный случай).

## Вне scope
- Тяжёлая зависимость libphonenumber (оценить отдельно). Реальная отправка SMS / провайдер. Расширение supported-стран (config/ops).
- **Live input mask** при вводе (группировка по `pattern`) — MVP использует `examplePlaceholder` + length-валидацию; поле `pattern` удалено из SSOT (post-audit T10 Path B, 2026-06-30).

## Тексты и переводы (en / et / ru)
> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи в `identityDictionary.js` + `IDENTITY_FLAT_KEYS`; `{country}`/`{example}` через `formatI18nMessage`. Названия стран — датасет из ID-10.

### `phone.format.*` (EN — канон из M127 §7; et/ru — перевод)
| key | en | et | ru |
|-----|----|----|----|
| phone.format.phoneLabel | Phone Number | Telefoninumber | Номер телефона |
| phone.format.helper | Enter your {country} phone number. | Sisesta oma telefoninumber ({country}). | Введите номер телефона ({country}). |
| phone.format.hint.empty | Enter your phone number. | Sisesta oma telefoninumber. | Введите номер телефона. |
| phone.format.hint.invalid | Enter a valid {country} phone number. | Sisesta korrektne telefoninumber ({country}). | Введите корректный номер телефона ({country}). |
| phone.format.hint.length | {country} phone numbers have {lengths} digits after {prefix}. | Telefoninumbritel ({country}) on {prefix} järel {lengths} numbrit. | У телефонных номеров ({country}) после {prefix} — {lengths} цифр. |
| phone.format.example | Example: {example} | Näide: {example} | Пример: {example} |
| phone.format.status.valid | Valid | Korrektne | Корректно |
| phone.format.status.needsCorrection | Needs correction | Vajab parandust | Требует исправления |

> **Нюанс инфлексии (et/ru):** EN `{country}` подставляется как «your Estonia phone number». В et/ru названия страны склоняются → использована грамматичная форма со скобкой («…({country})») вместо склонения. `Send Verification Code`/`Back` — переиспользовать из ID-04/ID-10 (`phone.input.send`/`phone.cta.back`), не дублировать.

## Acceptance Criteria (FR-уровень)
- [x] Датасет `PHONE_FORMAT_BY_COUNTRY` (страны селектора): dialPrefix/длины/pattern/example.
- [x] `validatePhoneForCountry`/`formatPhoneForCountry` обобщают валидацию; Эстония — частный случай (OTP happy-path не сломан).
- [x] Смена страны меняет placeholder/длины/hint в реальном времени.
- [x] Hint-сообщения локализованы и специфичны по стране (длина/пример).
- [x] Все строки локализованы (et/ru/en) через `t()`; нет хардкод-английского (FR-11.7).
- [x] `npx vitest run` green; тесты валидации на ≥3 стран (вкл. EE) + parity ключей.
