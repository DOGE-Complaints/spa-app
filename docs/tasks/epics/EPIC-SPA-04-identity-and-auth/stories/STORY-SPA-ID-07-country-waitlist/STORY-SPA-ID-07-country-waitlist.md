# STORY-SPA-ID-07 — Country Waitlist (unsupported region)

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-07-country-waitlist`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · **Волна 3 (Protected action)**
- **Status:** Done
- **Wave:** `pkg-000022` (scaffold 2026-06-30)
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md)
- **Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md); [mockup-123-country-waitlist-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md); [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); [identity-frontend FR-FE-007 / S5](../../../../../../../docs/Identity/identity-frontend.md)
- **Источник:** [identity-frontend FR-FE-007 / S5](../../../../../../../docs/Identity/identity-frontend.md)
- **Backend:** 🟡 `COUNTRY_NOT_ALLOWED` есть; контракт `POST /waitlist` — **TBD** (держать за флагом)
- **ui_scope:** `visual` (M123 anchor — T03)

## Артборд (SSOT дизайна)
- Спек: [mockup-123-country-waitlist-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md)
- PNG: [mockup-123-country-waitlist-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.png)
- Состояния: A Country Not Supported · B Waitlist Form · C Waitlist Joined · D Submission Error.

## Зачем простыми словами
Для пользователей из неподдерживаемых стран (MVP — только Эстония): не тупик-отказ, а уважительное объяснение + сбор интереса в waitlist. Аккаунт/верификация/профиль при этом **не создаются**.

## Функциональные требования (FR)
- **FR-07.1** Country Not Supported — объяснение «пока только Эстония», страна **из введённого номера (dial-префикс)** (пример), CTA Join Waitlist / Learn More. Тон информативный, не rejection.
- **FR-07.2** Waitlist Form — email + country (**pre-filled из dial-префикса введённого номера**, editable) + опц. organization.
- **FR-07.3** Waitlist Joined — подтверждение (country saved), Return to Home; без celebration-графики.
- **FR-07.4** Submission Error — варианты `network_error`, `service_unavailable`, `duplicate_request`, `validation_error` с раздельными сообщениями; Try Again / Back.
- **FR-07.5** Privacy: email хранится только для уведомлений о доступности; аккаунт/телефон/профиль не создаются (M123 §10).
- **FR-07.6** Триггер: `COUNTRY_NOT_ALLOWED` от `POST /auth/phone/request` (срабатывает по **введённому dial-префиксу**, не по IP) — приходит из [ID-05](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md). **Решение 2026-06-23:** страна определяется из набранного номера; IP-geo нет.
- **FR-07.7** **Локализация (L10N) — сразу:** все строки waitlist через `useI18n()`/`t('key')`, интерполяция через `formatI18nMessage`; ключи добавлять в [`identityDictionary.js`](../../../../../../src/i18n/identityDictionary.js) **+ `IDENTITY_FLAT_KEYS`**, на **et/ru/en**; без английских литералов. Пошагово/гварды — [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); запрещённые термины отсутствуют во всех языках.

## Routes / API
- Ветка на `/verify` (после `COUNTRY_NOT_ALLOWED`). API (предварительно): `POST /waitlist`, `GET /countries/supported` — **контракт не подтверждён**, интеграцию за фиче-флагом, UX проектировать можно.

## API-интеграция (doge-identity-service)
> Bearer Supabase JWT; ошибка `{"error":{"code","message","trace_id"}}`.

- **Триггер — identity:** `POST /auth/phone/request {phone}` → `400 {"error":{"code":"COUNTRY_NOT_ALLOWED"}}`, когда dial-префикс номера не в `PHONE_ALLOWED_DIAL_PREFIXES` (сейчас только `+372`), проверка [`e164.py:33`](../../../../../../../doge-identity-service/src/core/phone/e164.py). **Страна выводится FE из введённого префикса** (бэкенд страну/гео не возвращает и по IP не определяет).
- **Waitlist-sink (`POST /waitlist`) — НЕ identity-эндпоинт** (в коде identity нет). Куда собирать email — пока **TBD** (варианты в [DOC-IDS-ONB-04](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/identity-onboarding/DOC-IDS-ONB-04-non-ee-waitlist-spec.md): таблица Supabase / внешняя форма / лог). Интеграцию держать **за фиче-флагом** до подтверждения контракта; UX проектировать можно.
- `GET /countries/supported` — также не существует; список разрешённых = `PHONE_ALLOWED_DIAL_PREFIXES` (конфиг, через API не отдаётся) → для MVP захардкодить «Estonia / +372» на FE.

## Зависимости
- Входит из [ID-05](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md) (Country Not Allowed → этот flow). Не зависит от phone-flow happy-path.

## Вне scope
- Реальная geo-детекция по IP (бэкенд/инфра). Мульти-страновая раскатка (future).

## Тексты и переводы (en / et / ru)
> SSOT строк (из артборда M123). Локализация — по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи в [`identityDictionary.js`](../../../../../../src/i18n/identityDictionary.js) **+ `IDENTITY_FLAT_KEYS`**; `{…}` через `formatI18nMessage`. Страна берётся из dial-префикса введённого номера (не IP-geo, FR-07.6).

### `waitlist.*`
| key | en | et | ru |
|-----|----|----|----|
| waitlist.notSupported.title | DOGEstonia is currently available in Estonia | DOGEstonia on praegu saadaval Eestis | DOGEstonia сейчас доступна в Эстонии |
| waitlist.notSupported.message | We're gradually expanding access. At the moment, DOGEstonia supports civic participation within Estonia only. | Laiendame ligipääsu järk-järgult. Praegu toetab DOGEstonia kodanikuosalust ainult Eestis. | Мы постепенно расширяем доступ. Сейчас DOGEstonia поддерживает гражданское участие только в Эстонии. |
| waitlist.notSupported.countryLabel | Country (from your number) | Riik (sinu numbri järgi) | Страна (по вашему номеру) |
| waitlist.notSupported.joinWaitlist | Join Waitlist | Liitu ootelistiga | В лист ожидания |
| waitlist.notSupported.learnMore | Learn More | Loe lähemalt | Подробнее |
| waitlist.form.title | Join the Waitlist | Liitu ootelistiga | Запись в лист ожидания |
| waitlist.form.message | We'll let you know when DOGEstonia becomes available in your country. | Anname teada, kui DOGEstonia muutub sinu riigis kättesaadavaks. | Мы сообщим, когда DOGEstonia станет доступна в вашей стране. |
| waitlist.form.field.email | Email | E-post | Эл. почта |
| waitlist.form.field.country | Country | Riik | Страна |
| waitlist.form.field.organization | Organization (optional) | Organisatsioon (valikuline) | Организация (необязательно) |
| waitlist.form.submit | Join Waitlist | Liitu ootelistiga | Записаться |
| waitlist.form.back | Back | Tagasi | Назад |
| waitlist.joined.title | You're on the waitlist | Oled ootelistis | Вы в листе ожидания |
| waitlist.joined.message | Thank you. We'll notify you when DOGEstonia becomes available in your region. | Aitäh. Teavitame, kui DOGEstonia muutub sinu piirkonnas kättesaadavaks. | Спасибо. Мы уведомим вас, когда DOGEstonia станет доступна в вашем регионе. |
| waitlist.joined.countrySaved | Country saved | Riik salvestatud | Страна сохранена |
| waitlist.joined.returnHome | Return to Home | Tagasi avalehele | Вернуться на главную |
| waitlist.error.title | Unable to join the waitlist | Ootelistiga liitumine ebaõnnestus | Не удалось записаться в лист ожидания |
| waitlist.error.network_error | Unable to contact DOGEstonia services. | DOGEstonia teenustega ei õnnestu ühendust luua. | Не удаётся связаться с сервисами DOGEstonia. |
| waitlist.error.service_unavailable | Please try again later. | Palun proovi hiljem uuesti. | Пожалуйста, попробуйте позже. |
| waitlist.error.duplicate_request | You already joined the waitlist. | Oled ootelistiga juba liitunud. | Вы уже записаны в лист ожидания. |
| waitlist.error.validation_error | Please check the email address. | Palun kontrolli e-posti aadressi. | Пожалуйста, проверьте адрес эл. почты. |
| waitlist.error.tryAgain | Try Again | Proovi uuesti | Попробовать снова |
| waitlist.error.back | Back | Tagasi | Назад |

---

## Acceptance Criteria (FR-уровень)
- [x] 4 состояния (not-supported / form / joined / error) реализованы.
- [x] Country pre-filled из detected, редактируемо; email обязателен.
- [x] Joined-подтверждение явное; аккаунт/телефон/профиль не создаются.
- [x] Ошибки waitlist различимы (incl. duplicate); Retry доступен.
- [x] Интеграция `POST /waitlist` за флагом до подтверждения контракта.
- [x] Все строки локализованы (et/ru/en) через `t()`; нет хардкод-английского (FR-07.7).
