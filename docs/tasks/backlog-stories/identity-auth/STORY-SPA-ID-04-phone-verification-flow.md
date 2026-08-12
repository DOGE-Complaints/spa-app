# STORY-SPA-ID-04 — Phone Verification Flow (inline, ядро UX)

## Meta
- **Key:** `STORY-SPA-ID-04-phone-verification-flow`
- **Epic:** [EPIC-SPA-04 Identity & Auth](README.md) · **Волна 2 (Verification core)**
- **Status:** 🟢 Done — [pipeline](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-04-phone-verification-flow/STORY-SPA-ID-04-phone-verification-flow.md) (pkg-000018, 2026-06-28)
- **Источник:** [epic-04 S04-3](../inbound/epic-04.md), [identity-frontend FR-FE-004 / S4 / §3](../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ PV-01…07 (mock/Telnyx)

## Артборд (SSOT дизайна)
- Спек: [mockup-32-phone-verification-flow-sheet-spec.md](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md)
- PNG: [mockup-32-phone-verification-flow-sheet-spec.png](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.png)
- Состояния: A Disclosure · B Phone Input · C OTP Entry · D Processing · E Success.

## Зачем простыми словами
Двухшаговая inline-верификация (номер → SMS-код) **без ухода из SPA** (2 наших API-вызова, без внешнего редиректа). Переиспользуется из кабинета, гейта, GPT, /verify. Это trust-механизм, не онбординг и не сбор identity.

## Функциональные требования (FR)
- **FR-04.1** Disclosure **до** ввода номера (анти-бот, только +372); SSOT текста [DOC-IDS-ONB-02](../../../../../doge-identity-service/docs/tasks/backlog-stories/identity-onboarding/DOC-IDS-ONB-02-disclosure-copy.md). CTA `Send code` / `Not now` (где допустимо отложить).
- **FR-04.2** Phone input: страна + номер с маской `+372…`, валидация-хинты → `POST /auth/phone/request`.
- **FR-04.3** OTP entry: 6 цифр, `autocomplete="one-time-code"`; «Resend code» (после cooldown 60s, с таймером), «Change number» → `POST /auth/phone/confirm`.
- **FR-04.4** Processing — subtle progress (без full-screen loader), primary disabled.
- **FR-04.5** Success → закрыть модалку, `GET /me` (refresh), продолжить прерванное действие (resume).
- **FR-04.6** Правила кода (из бэкенда, фиксированы, UI отражает): 6 цифр · TTL 5 мин · до 5 попыток · resend не чаще 60с.
- **FR-04.7** Запрещённые термины: `KYC`, `government identity check`, `bank verification`, `legal identity`.
- **FR-04.8** Не повторять верификацию при `phone_verified=true` (FR-FE-005).
- **FR-04.9** Privacy: номер/код не показывать и не логировать.

## Routes / API
- Inline-модалка (везде) и страница `/verify`. API: `POST /auth/phone/request {phone}` → `{sent, expires_at}`; `POST /auth/phone/confirm {phone, code}` → `{status:"verified"}`; затем `GET /me`. Bearer Supabase JWT.

## API-интеграция (doge-identity-service)
> База: все вызовы — `Authorization: Bearer <supabase_access_token>`; Content-Type `application/json`; envelope успех `{"data":…}`, ошибка `{"error":{"code","message","trace_id"}}`.

**Шаг 1 — `POST /auth/phone/request`** (после disclosure):
```
→ {"phone": "+37255555555"}
← 200 {"data": {"sent": true, "expires_at": "2026-06-23T12:05:00Z"}}
```
Сервер нормализует номер в E.164, проверяет префикс, cooldown, создаёт OTP-сессию, шлёт SMS. Текст SMS формирует ядро (код внутри). Ошибки → см. ID-05.

**Шаг 2 — `POST /auth/phone/confirm`**:
```
→ {"phone": "+37255555555", "code": "123456"}
← 200 {"data": {"status": "verified"}}
```

**Шаг 3 — `GET /me`** (refresh) → `phone_verified:true` → закрыть модалку, продолжить действие.

**Контрактные нюансы для UI:**
- **OTP-код в ответе НЕ приходит и в логах НЕ светится** (анти-leak) — приходит только реальной SMS (Telnyx); в `mock`-режиме код недоступен (для e2e нужен Telnyx + эст. номер).
- Правила (6 цифр / TTL 5 мин / 5 попыток / cooldown 60с) — это **серверные константы** (`PHONE_*` в конфиге), **через API не отдаются**. UI держит их как известные значения (для таймера resend и счётчика попыток).
- «Change number» = новый `POST /auth/phone/request` с другим номером (сервер супер­седит прежнюю активную сессию).
- Идемпотентность: повторный `confirm` после успеха вернёт ошибку (сессия `consumed`) — UI должен опираться на `GET /me.phone_verified`, не на повторный confirm.

## Зависимости
- Отображает фазу через [ID-03](STORY-SPA-ID-03-civic-status-component.md). Ошибки flow — в [ID-05](STORY-SPA-ID-05-verification-error-states.md). Используется гейтом [ID-06](STORY-SPA-ID-06-protected-action-gate.md) и [ID-08](STORY-SPA-ID-08-gpt-verification-entry.md).

## Вне scope
- Конкретные error-состояния (ID-05). Сохранение/резюм story-draft (ID-06). eID/wallet.

## Acceptance Criteria (FR-уровень)
- [ ] Disclosure показан ДО ввода номера; тон дружелюбный; запрещённые термины не используются.
- [ ] Полный happy-path: номер → код → confirm → success, без ухода из SPA.
- [ ] Resend доступен после cooldown 60s с таймером; OTP-поле `one-time-code`.
- [ ] После success — refresh `/me` и возврат к прерванному действию.
- [ ] При `phone_verified=true` повторно верифицировать не просят.
