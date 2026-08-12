# STORY-SPA-ID-05 — Verification Error States

## Meta
- **Key:** `STORY-SPA-ID-05-verification-error-states`
- **Epic:** [EPIC-SPA-04 Identity & Auth](README.md) · **Волна 2 (Verification core)**
- **Status:** Done (pkg-000019)
- **Источник:** [epic-04 S04-4](../inbound/epic-04.md), [identity-frontend §10 / FR-FE-007/008](../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ (коды ошибок `/auth/phone/*` фиксированы)

## Артборд (SSOT дизайна)
- Спек: [mockup-37-verification-error-state-sheet-spec.md](../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md)
- PNG: [mockup-37-verification-error-state-sheet-spec.png](../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.png)
- Состояния: Country Not Allowed · Rate Limited · Wrong Code · Code Expired · Too Many Attempts · Provider Unavailable/Send Failed · Phone Conflict · Auth Required/Session Expired · Network Error. Компонент: `<PhoneVerificationErrorState />`.

## Зачем простыми словами
Реюзабельная система error-состояний верификации: каждая backend-ошибка → понятное, спокойное, восстановимое состояние с явным next-action. Доказывает, что верификация **падает изящно**, без паники и обвинения.

## Функциональные требования (FR)
- **FR-05.1** Error-mapping contract (M37 §15): `COUNTRY_NOT_ALLOWED→Country` · `RATE_LIMITED→Rate Limited` · `CODE_MISMATCH→Wrong Code` · `CODE_EXPIRED→Code Expired` · `TOO_MANY_ATTEMPTS→Too Many Attempts` · `PROVIDER_UNAVAILABLE/SEND_FAILED→SMS Unavailable` · `profile_conflict→Phone Conflict` · `AUTHENTICATION_REQUIRED/session_expired→Sign In` · `network_error→Connection Problem`.
- **FR-05.2** Rate Limited — обязательный cooldown-таймер (напр. 00:45), Resend disabled до конца.
- **FR-05.3** Wrong Code — «Attempts remaining: N» (счётчик).
- **FR-05.4** Phone Conflict (`409 profile_conflict`) — мягкий «это вы?»: «Sign in to existing account» / «Use another number». **Никогда не авто-мёрджить** (FR-FE-008).
- **FR-05.5** Country Not Allowed → передача в waitlist-ветку ([ID-07](STORY-SPA-ID-07-country-waitlist.md)).
- **FR-05.6** Каждая ошибка — явный next-action; код можно показать в muted-техстиле; не раскрывать номер/OTP; без KYC-языка и без обвинения.

## Routes / API
- Inline в [ID-04](STORY-SPA-ID-04-phone-verification-flow.md) (и /verify). Источник кодов — ответы `/auth/phone/request|confirm`. Не отдельные роуты.

## API-интеграция (doge-identity-service)
> Ошибки приходят как **`{"error":{"code","message","trace_id"}}`** ([`envelope.py`](../../../../../doge-identity-service/src/core/api/envelope.py)) в ответах `/auth/phone/request|confirm`. Маппить по `error.code`.

| `error.code` | HTTP | Состояние UI |
|---|---|---|
| `COUNTRY_NOT_ALLOWED` | 400 | Country → waitlist (ID-07) |
| `RATE_LIMITED` | 400 | Rate Limited (cooldown-таймер) |
| `CODE_MISMATCH` | 400 | Wrong Code (счётчик попыток) |
| `CODE_EXPIRED` | 400 | Code Expired (предложить Resend) |
| `TOO_MANY_ATTEMPTS` | 400 | Too Many Attempts (lockout → новый request) |
| `PROVIDER_UNAVAILABLE` / `SEND_FAILED` | **503** | SMS Unavailable (retry) |
| `profile_conflict` | **409** | Phone Conflict «это вы?» (без авто-мёрджа) |
| `AUTHENTICATION_REQUIRED` | 401 | Sign In (→ ID-02/ID-01) |

**⚠️ Контрактный нюанс (важно для FR-05.2/05.3):** envelope **НЕ содержит** `attempts_remaining` или `retry_after`/`cooldown_seconds` — только `code`+`message`+`trace_id`. Значит:
- **Cooldown-таймер (FR-05.2)** UI строит от **известной константы 60с** (`PHONE_RESEND_COOLDOWN_S`, не отдаётся API) с момента `RATE_LIMITED`/последнего request.
- **«Attempts remaining: N» (FR-05.3)** бэкенд **не присылает**. Варианты: (а) UI считает локально от константы 5 (`PHONE_MAX_ATTEMPTS`) по числу `CODE_MISMATCH`; (б) показывать без точного N («осталось несколько попыток»). → точный серверный `attempts_remaining`/`retry_after` — **опциональное улучшение identity-backend** (не блокер слоя 1; при желании — отдельная задача в `doge-identity-service`).

## Зависимости
- Расширяет [ID-04](STORY-SPA-ID-04-phone-verification-flow.md). Ветвится в [ID-07](STORY-SPA-ID-07-country-waitlist.md) (country). Session/network перекрывается с [ID-02](STORY-SPA-ID-02-session-shell-states.md) на app-уровне.

## Вне scope
- Сам happy-path flow (ID-04). Форма waitlist (ID-07).

## Acceptance Criteria (FR-уровень)
- [x] Все коды из §10 имеют своё состояние по mapping-контракту M37 §15.
- [x] Rate Limited имеет cooldown-таймер; Wrong Code — счётчик попыток.
- [x] Phone Conflict (409) — мягкий «это вы?», без авто-мёрджа.
- [x] Country Not Allowed уводит в waitlist (ID-07).
- [x] Тексты спокойные, без KYC/обвинения; номер/OTP не раскрываются.
