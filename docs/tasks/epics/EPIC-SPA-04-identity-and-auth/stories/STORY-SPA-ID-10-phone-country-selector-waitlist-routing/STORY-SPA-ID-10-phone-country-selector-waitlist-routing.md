# STORY-SPA-ID-10 — Country selector в phone input + маршрутизация в waitlist (закрывает ID-07 F1/F2)

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-10-phone-country-selector-waitlist-routing`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · **Волна 3 (Protected action)**
- **Status:** Done
- **Wave:** `pkg-000023` (scaffold 2026-06-30)
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)
- **Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md); [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md); [mockup-32-phone-verification-flow-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) §State B; [mockup-123-country-waitlist-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md); [audit-STORY-SPA-ID-07-execution-2026-06-30.md](../../../../../../analysis/audit-STORY-SPA-ID-07-execution-2026-06-30.md) F1/F2
- **Источник:** finding F1/F2 из [audit-STORY-SPA-ID-07-execution-2026-06-30.md](../../../../../../analysis/audit-STORY-SPA-ID-07-execution-2026-06-30.md); артборд **M32 §State B** (Country selector / phone formatting / validation hints — не доделано в ID-04).
- **Backend:** ✅ `COUNTRY_NOT_ALLOWED` (e164.py), supported = `PHONE_ALLOWED_DIAL_PREFIXES` (`+372`); waitlist-sink — TBD (как в ID-07).
- **ui_scope:** `visual` (M126 anchor — T03)

## Зачем простыми словами
Сейчас поле страны в phone input **зафрижено на Эстонию (+372)** ([PhoneInputPanel.jsx](../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx)), поэтому иностранный номер ввести нельзя → `COUNTRY_NOT_ALLOWED` не наступает → **waitlist (ID-07) недостижим через UI** (ID-07 F1). Делаем **селектор страны** (Эстония — дефолт, можно выбрать любую). Если выбрана **не поддерживаемая** страна — сразу мягко предлагаем waitlist (не тратя SMS-запрос), со страной из явного выбора (чинит ID-07 F2).

## Артборд (SSOT дизайна)
- **Основной:** [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) · [png](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.png) — Phone Input: Country Selector & Waitlist Routing (State A supported · B dropdown · C unsupported→waitlist).
- Контекст: [M32 §State B](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) (исходное требование селектора), переход в [M123 Country Waitlist](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md). Формат/валидация номера — отдельно [M127/ID-11](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md).
- ⚠️ Тексты ниже синхронизированы с **M126 §7** (мокап — приоритет).

## UX-решение (адаптивный phone input)
1. **Селектор страны** вместо readonly: список (флаг + локализованное название + dial-код), **Эстония дефолт**, выбор любой.
2. **Supported-набор клиента** = `['+372']` (зеркалит бэкендный `PHONE_ALLOWED_DIAL_PREFIXES`; ⚠️ через API не отдаётся — точка синхронизации, см. Findings-note).
3. **Выбрана Эстония (supported)** → текущий OTP-флоу без изменений.
4. **Выбрана не-Эстония (unsupported)** → форма адаптируется **сразу при выборе**:
   - инлайн-уведомление «DOGEstonia пока недоступна в {country}» (инфо-тон);
   - primary CTA: «Send Verification Code» → **«Join Waitlist»**;
   - `POST /auth/phone/request` **НЕ вызывается** (client short-circuit);
   - по «Join Waitlist» → waitlist-флоу (ID-07), **страна предзаполнена из выбора** (фиксит ID-07 F2);
   - телефон **опционален и не сохраняется** (privacy FR-07.5) — в waitlist уходит только email+country.
5. **Defense-in-depth:** если non-`+372` как-то дойдёт до `/auth/phone/request`, бэкенд вернёт `COUNTRY_NOT_ALLOWED` → существующий маршрут ID-05→waitlist как fallback.

## Функциональные требования (FR)
- **FR-10.1** `PhoneInputPanel` — country-селектор (не readonly), Эстония дефолт; пункт = флаг + название (локализ.) + dial-код. Источник списка — датасет стран (расширить [`dialPrefixToCountry.js`](../../../../../../src/utils/dialPrefixToCountry.js) до полноценного `countries` SSOT: `{code, dialPrefix, name{en,et,ru}, flag?}`).
- **FR-10.2** Supported-список = `['+372']` в одном FE-конфиге (`SUPPORTED_DIAL_PREFIXES`), помеченный как зеркало бэкенда; функция `isSupportedDialPrefix(prefix)`.
- **FR-10.3** Supported-страна → существующий OTP happy-path (ID-04) без изменений; формат/валидация номера — **в ID-11** (эта стори селектор + routing).
- **FR-10.4** Unsupported-страна → адаптивный режим: уведомление + CTA «Join Waitlist» + блок OTP-пути (без `/auth/phone/request`).
- **FR-10.5** «Join Waitlist» (unsupported) → ID-07 waitlist с `country` из **выбранной страны** (не из dial-префикса набранного номера); телефон не передаётся/не хранится.
- **FR-10.6** Fallback сохранён: `COUNTRY_NOT_ALLOWED` от backend по-прежнему ведёт в waitlist (ID-05 → ID-07).
- **FR-10.7** **Локализация (L10N) — сразу:** все строки через `t()` (+ `formatI18nMessage` для `{country}`); ключи в [`identityDictionary.js`](../../../../../../src/i18n/identityDictionary.js) **+ `IDENTITY_FLAT_KEYS`**, et/ru/en; названия стран — в датасете стран (3 языка). Гид: [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); запрещённые термины — ни в одном языке.

## Routes / API
- Без новых роутов. Phone input — на `/verify` (ID-04). API: supported → `POST /auth/phone/request|confirm` (как ID-04); unsupported → **не дёргаем** OTP, переход в waitlist (ID-07). Список supported-стран бэкенд через API не отдаёт → FE-зеркало.

## Зависимости
- Меняет `PhoneInputPanel` (ID-04) и `VerifyPage` waitlist-routing (ID-07). Предшествует [ID-11](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md) (формат-валидация строится на этом селекторе).

## Вне scope
- **Полная валидация формата номера по стране — [ID-11](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md).** Реальный IP-geo. Расширение supported-стран на бэкенде (config/ops).

## Тексты и переводы (en / et / ru)
> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи в `identityDictionary.js` + `IDENTITY_FLAT_KEYS`; `{country}` через `formatI18nMessage`. Названия стран — отдельный датасет (3 языка), переиспользует существующие из `dialPrefixToCountry`.

### `phone.country.*` (EN — канон из M126 §7; et/ru — перевод)
| key | en | et | ru |
|-----|----|----|----|
| phone.country.verifyTitle | Verify Your Phone | Kinnita oma telefon | Подтвердите телефон |
| phone.country.verifyMessage | Choose your country and enter your phone number to receive a verification code. | Vali oma riik ja sisesta telefoninumber, et saada kinnituskood. | Выберите страну и введите номер телефона, чтобы получить код подтверждения. |
| phone.country.phoneLabel | Phone Number | Telefoninumber | Номер телефона |
| phone.country.sendCode | Send Verification Code | Saada kinnituskood | Отправить код подтверждения |
| phone.country.back | Back | Tagasi | Назад |
| phone.country.chooseTitle | Choose Country | Vali riik | Выберите страну |
| phone.country.search | Search country | Otsi riiki | Поиск страны |
| phone.country.badgeSupported | Supported | Toetatud | Поддерживается |
| phone.country.badgeAvailableSoon | Available Soon | Tulekul | Скоро |
| phone.country.unsupportedTitle | DOGEstonia Isn't Available In {country} Yet | DOGEstonia pole veel saadaval sinu riigis ({country}) | DOGEstonia пока недоступна в вашей стране ({country}) |
| phone.country.unsupportedNotice | DOGEstonia isn't available in {country} yet. | DOGEstonia pole veel saadaval sinu riigis ({country}). | DOGEstonia пока недоступна в вашей стране ({country}). |
| phone.country.unsupportedHint | Join the waitlist and we'll let you know when it becomes available. | Liitu ootelistiga ja anname teada, kui see muutub kättesaadavaks. | Запишитесь в лист ожидания — сообщим, когда станет доступна. |
| phone.country.phoneOptional | Phone Number (optional) | Telefoninumber (valikuline) | Номер телефона (необязательно) |
| phone.country.joinWaitlist | Join Waitlist | Liitu ootelistiga | В лист ожидания |

> **Нюанс инфлексии (et/ru):** в EN `{country}` подставляется как «in Germany». В et/ru названия страны склоняются, поэтому для `unsupportedTitle/Notice` использована грамматичная форма со скобкой («…в вашей стране ({country})» / «…sinu riigis ({country})») вместо склонения `{country}`. Названия стран в селекторе/значении — без склонения (номинатив).
>
> **Названия стран (датасет, не склоняются):** Estonia/Eesti/Эстония, Latvia/Läti/Латвия, Lithuania/Leedu/Литва, Finland/Soome/Финляндия, Sweden/Rootsi/Швеция, Germany/Saksamaa/Германия, United Kingdom/Ühendkuningriik/Великобритания, United States/Ameerika Ühendriigid/США, Poland/Poola/Польша, France/Prantsusmaa/Франция (список M126 §State B; расширяемо).
>
> **Reuse:** `Send Verification Code`/`Back`/`Phone Number` совпадают с существующими ключами ID-04 (`phone.input.send`, `phone.cta.back`, `phone.input.phoneNumber`) — при разводке переиспользовать их, не плодить дубли (можно алиасить под `phone.country.*` при необходимости панели).

## Acceptance Criteria (FR-уровень)
- [x] Country-селектор (не readonly), Эстония дефолт, выбор любой страны.
- [x] Supported = `+372` (FE-зеркало бэкенда) через `isSupportedDialPrefix`.
- [x] Эстония → OTP happy-path без изменений.
- [x] Не-Эстония → уведомление + CTA «Join Waitlist», без вызова `/auth/phone/request`.
- [x] «Join Waitlist» ведёт в ID-07 со страной из **выбора** (ID-07 F2 закрыт); телефон не хранится.
- [x] Fallback `COUNTRY_NOT_ALLOWED`→waitlist сохранён.
- [x] Все строки локализованы (et/ru/en) через `t()`; нет хардкод-английского (FR-10.7).
- [x] `npx vitest run` green; тесты supported/unsupported routing + parity ключей.

## Findings-note (для исполнителя)
- Supported-список бэкенд через API **не отдаёт** → FE-зеркало `['+372']`; при изменении `PHONE_ALLOWED_DIAL_PREFIXES` на бэке нужно синкать FE (зафиксировать в тесте/комменте). Потенциально — future-эндпоинт `GET /countries/supported` (как в ID-07 notes).
