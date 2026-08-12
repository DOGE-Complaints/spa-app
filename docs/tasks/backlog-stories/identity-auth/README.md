# EPIC-SPA-04 — Identity & Authentication Layer (пакет стори, слой 1: Functional Requirements)

> **Эпик:** identity & auth для `spa-app` (браузерный React/Vite SPA — основной UI).
> **Слой:** 1 — стори на уровне **Functional Requirements** (без тасков; таски — следующий слой).
> **Референс требований (SSOT):** [identity-frontend.md](../../../../../docs/Identity/identity-frontend.md) (FR-FE-001…008, экраны S1-S7, ошибки §10, AC §12).
> **Источник стори/мокапов:** [housekeeping/legacy-inbound/epic-04.md](../housekeeping/legacy-inbound/epic-04.md) + артборды [docs/UX/mockups/epic-04/](../../../UX/mockups/epic-04/).
> **Методология:** `.cursor/rules/analysis.mdc` — каждая стори привязана к фактическому артборду (спек + PNG) и реальному API-контракту identity; без фантазий.

---

## 1. Описание эпика

Слой идентификации пользователя DOGEstonia: **account-first** регистрация/вход (email через Supabase Auth), **ленивая** разовая верификация телефона (анти-бот, только +372), мост из Custom GPT, гейт защищённых действий, состояния сессии. Wallet и репутация — вне эпика.

**Продуктовая ось (из identity-frontend §1-2):** аккаунт первичен; телефон — разовая проверка «реальный уникальный человек», не второй логин; верификация требуется **в момент** защищённого действия, а не на входе; пользователь остаётся псевдонимным (номер — только хэш). Backend телефонной верификации **готов** (PV-01…07); OAuth-сервер для GPT — **построен** (OAUTH-01…04, сверено 2026-06-27 → [`identity-auth-api-validation-2026-06-27`](../../../analysis/identity-auth-api-validation-2026-06-27.md)).

**Принцип SSOT компонентов:** `CivicStatusCard` и `PhoneVerificationFlow` строятся **один раз** и переиспользуются во всех контекстах (кабинет, гейт, GPT, /verify) — см. M28 §8, M32 §5.

---

## 2. 🪞 Зеркало синхронизации (story ↔ mockup ↔ FR ↔ route ↔ API ↔ backend)

| Story | FR (identity-frontend) | Артборд (спек + PNG) | Route(s) | Identity / Gateway API | Backend готов |
|-------|------------------------|----------------------|----------|------------------------|---------------|
| **ID-01** Web Authentication | FR-FE-001 | [M121 spec](../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.png) | `/login` (+ future `/signup`, `/password-reset`) | Supabase Auth (login/signup/signOut); `GET /me`. Выход = `supabase.auth.signOut()` (**не** identity-эндпоинт) | ✅ (email в `/me` — ❌ ONB-01) |
| **ID-02** Session Shell States | FR-FE-001 (session restore), §10 | [M124 spec](../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.png) | global app-shell (`/`, `/board`, …) | `supabase.auth.getSession()`; `GET /me` | ✅ |
| **ID-03** Civic Status Component | FR-FE-002 | [M28 spec](../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png) | `/dashboard` + reused везде | `GET /me.phone_verified` | ✅ |
| **ID-04** Phone Verification Flow | FR-FE-004, §3 | [M32 spec](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.png) | inline-модалка / `/verify` | `POST /auth/phone/request`, `POST /auth/phone/confirm`, `GET /me` | ✅ PV-01…07 |
| **ID-05** Verification Error States | FR-FE-007/008, §10 | [M37 spec](../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.png) | inline (в ID-04) | коды ошибок `/auth/phone/*` | ✅ |
| **ID-06** Protected Action Gate (web) | FR-FE-003/005/010 | [M122 spec](../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.png) | `/story/compose` | `GET /me`; gateway `POST /story-drafts`, `…/{id}/submit` | ✅ (drafts — у gateway) |
| **ID-07** Country Waitlist | FR-FE-007 | [M123 spec](../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.png) | `/verify` (ветка waitlist) | `POST /waitlist` (⚠️ контракт TBD) | ⚠️ waitlist API не подтверждён |
| **ID-08** GPT Verification Entry | FR-FE-006 | [M120 spec](../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.png) | `/login?oauth_request_id`, `/verify?context` | `GET /me`; phone APIs; `GET /oauth/authorize` + `POST /oauth/authorize/complete` (302 code \| 403 verification_required) | ✅ построен (OAUTH-01…04) |
| — (архитектура) | — | [M125 Identity Overview](../../../UX/mockups/epic-04/mockup-125-identity-system-overview-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-125-identity-system-overview-sheet-spec.png) | — | карта `/me` SSOT | — |

> **Контракт-якорь (один на эпик):** статус выводится из `GET /me` → `phone_verified` (bool) + `phone_verified_at` + `phone_dial_prefix`; **нет** backend-поля `verification_status` — состояния Civic Status/Verification суть **FE-derived** (локальная фаза flow + коды ошибок). Зафиксировано в M28 §6 (обновлён) и обязательно для ID-03/04.

---

## 3. План (волны, зависимости, готовность)

```
Волна 1 — Foundation (без блокеров)
  ID-01 Web Authentication  ──┐
  ID-02 Session Shell        ─┤→ дают вход + стабильный shell (account-first)
  ID-03 Civic Status Card    ─┘  (reusable trust-компонент)

Волна 2 — Verification core (PV backend готов)
  ID-04 Phone Verification Flow   (зависит от ID-03 — отображение статуса)
  ID-05 Verification Error States (расширяет ID-04; §10 коды)

Волна 3 — Protected action
  ID-06 Protected Action Gate (web)  (зависит от ID-04 + gateway drafts)
  ID-07 Country Waitlist             (ветка ID-05: COUNTRY_NOT_ALLOWED)

Волна 4 — GPT bridge
  ID-08 GPT Verification Entry  (зависит от ID-04/05; OAuth-handshake построен —
                                 вход #2 buildable end-to-end: /login → /complete → 302 code | 403 verify)

Волна 4+ — Handoff success polish
  ID-14 Post-submit path choice (M135)  (зависит от ID-12 Done; former BUG-03)
```

**Граф зависимостей:** ID-03 → ID-04 → {ID-05, ID-06}; ID-05 → ID-07; {ID-04, ID-05} → ID-08; ID-12 → **ID-14**. ID-01/ID-02 — фундамент для всех.

**Блокеры (identity-frontend §13):**
- `email` в `/me` (ONB-01) — не блокирует ID-01 (гейт строим на `phone_verified`, не email).
- OAuth `/oauth/*` — **построен** (OAUTH-01…04), **не блокер**. Вход #2 buildable end-to-end (`/oauth/authorize` → `/login?oauth_request_id` → `/oauth/authorize/complete` → 302 code \| 403 `verification_required`). См. [ID-08](STORY-SPA-ID-08-gpt-verification-entry.md).
- `POST /waitlist` контракт (ID-07) — TBD; UX можно проектировать, интеграцию держать за флагом.

---

## 4. Инвентарь артбордов и решения по чистке

| Артборд | Стори | Статус / решение |
|---------|-------|------------------|
| M28 civic-status | ID-03 | ✅ обновлён (контракт `phone_verified` исправлен) |
| M32 phone-verification-flow | ID-04 | ✅ **переименован** из `mockup-29-civic-status-verified-focus` (2026-06-23) — имя приведено в соответствие контенту (Phone Verification Flow). Уникальный SSOT phone-flow. |
| M37 errors | ID-05 | ✅ keep |
| ~~M61 GPT verification flow~~ | — | 🗑️ **удалён** (2026-06-23) — перекрыт M120 (5 состояний ⊂ 8), нарушал SSOT GPT-журнала. Ссылки убраны из M125 (Layer-4 §10) и ID-08. |
| M120 GPT story authorization | ID-08 | ✅ keep — единственный SSOT GPT-моста |
| M121 web auth | ID-01 | ✅ keep |
| M122 compose gate | ID-06 | ✅ keep |
| M123 waitlist | ID-07 | ✅ keep |
| M124 session shell | ID-02 | ✅ keep |
| M125 identity overview | epic | ✅ keep — архитектурная карта (не стори) |
| M128 story draft handoff | ID-12 | ✅ keep |
| **M135** post-submit path choice | **ID-14** | ✅ landed · implementation SSOT for State F path choice |

> Артборды ссылаются на несуществующие в репо M72/M80/M110 (traceability-панели M122/M125) — это **forward-refs** на будущие story-workspace мокапы (вне Epic-04 identity-слоя), не дефект.

---

## 5. Список стори (слой 1 — FR)

| Key | Title | FR | Артборд | Готовность |
|-----|-------|----|---------| -----------|
| [STORY-SPA-ID-01](STORY-SPA-ID-01-web-authentication.md) | Web Authentication (login/signup/magic-link/reset) | FR-FE-001 | M121 | 🟢 buildable |
| [STORY-SPA-ID-02](STORY-SPA-ID-02-session-shell-states.md) | Session Shell States | FR-FE-001 | M124 | 🟢 buildable |
| [STORY-SPA-ID-03](STORY-SPA-ID-03-civic-status-component.md) | Civic Status Component (reusable) | FR-FE-002 | M28 | 🟢 buildable |
| [STORY-SPA-ID-04](STORY-SPA-ID-04-phone-verification-flow.md) | Phone Verification Flow (inline) | FR-FE-004 | M32 | 🟢 buildable |
| [STORY-SPA-ID-05](STORY-SPA-ID-05-verification-error-states.md) | Verification Error States | FR-FE-007/008 | M37 | 🟢 buildable |
| [STORY-SPA-ID-06](STORY-SPA-ID-06-protected-action-gate.md) | Protected Action Gate (web lazy-gate) | FR-FE-003 | M122 | 🟢 buildable |
| [STORY-SPA-ID-07](STORY-SPA-ID-07-country-waitlist.md) | Country Waitlist | FR-FE-007 | M123 | 🟡 waitlist API TBD |
| [STORY-SPA-ID-08](STORY-SPA-ID-08-gpt-verification-entry.md) | GPT Verification Entry | FR-FE-006 | M120 | 🟢 buildable (OAuth построен) |
| [STORY-SPA-ID-09](STORY-SPA-ID-09-identity-ui-localization.md) | Identity UI Localization (et/ru/en retrofit) | L10N | M28/M32/M37/M120/M121/M124 | 🔴 ретрофит ID-01…05 (переводы готовы в стори) |
| [STORY-SPA-ID-10](STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) | Country selector в phone input + waitlist routing | M32 §B | **M126** | 🟡 закрывает ID-07 F1/F2; артборд+переводы готовы |
| [STORY-SPA-ID-11](STORY-SPA-ID-11-per-country-phone-format-validation.md) | Валидация формата телефона по стране | M32 §B | **M127** | 🟡 зависит от ID-10; датасет country→формат |
| [STORY-SPA-ID-12](STORY-SPA-ID-12-story-draft-handoff-submit.md) | Story draft handoff submit | handoff | **M128** | ✅ Done |
| [STORY-SPA-ID-13](STORY-SPA-ID-13-public-route-regression.md) | Public route regression | gate | — | ✅ Done |
| [STORY-SPA-ID-14](STORY-SPA-ID-14-post-submit-path-choice.md) | Post-submit path choice (State F) | handoff polish | **M135** | 🟡 Todo · former BUG-03 |

---

## 6. Сквозные требования (применять в каждой стори; из identity-frontend §4, §11, §10)

- **Запрещённые термины:** `KYC`, `government identity check`, `bank verification`, `legal identity` (FR-FE-004). Тон — дружелюбный, не security-heavy.
- **Privacy:** никогда не показывать номер телефона (после верификации), OTP-код, Supabase-токены, пароли.
- **Disclosure до ввода номера** (анти-бот, только +372) — SSOT текста [DOC-IDS-ONB-02](../../../../../doge-identity-service/docs/tasks/backlog-stories/identity-onboarding/DOC-IDS-ONB-02-disclosure-copy.md).
- **Backend — source of truth:** обрабатывать `verification_required` на submit даже при локальном `/me=true`.
- **A11y:** OTP-поле `autocomplete="one-time-code"`, чёткая иерархия CTA, нетехнический язык, без «стены текста».
- **L10N (ОБЯЗАТЕЛЬНО для каждой новой стори):** все user-facing строки — через `useI18n()`/`t('key')` (+ `formatI18nMessage` для подстановок). **Identity-ключи кладутся в [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js)** (`IDENTITY_DICTIONARY_{EN,ET,RU}`) **+ регистрируются в `IDENTITY_FLAT_KEYS`**, на **et/ru/en** в рамках работы. **Хардкод-английского быть не должно.** Полный гид — [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md); ретрофит ID-01…05 + SSOT переводов — [ID-09](STORY-SPA-ID-09-identity-ui-localization.md). DoD каждой identity-стори: «строки локализованы (3 языка) + `IDENTITY_FLAT_KEYS` обновлён + forbidden-terms нет + vitest parity/hardcode-guard зелёные». _(было: «копи EN, ET/RU follow-up» — отменено 2026-06-29.)_
- **Канонические лейблы статуса** (не подменять): `Civic account not verified yet` / `Verified civic participant` / `Wallet not linked`.

---

*Слой 1 фиксирует FR и привязку к артбордам. Декомпозиция в таски (слой 2) — после ревью этого зеркала и плана. Реализация в коде ещё не начата (фронт identity не существует — см. identity-frontend «НЕ реализовано в коде»).*
