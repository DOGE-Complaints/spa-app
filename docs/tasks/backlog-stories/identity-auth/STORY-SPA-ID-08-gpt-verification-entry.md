# STORY-SPA-ID-08 — GPT Verification Entry (мост из Custom GPT)

## Meta
- **Key:** `STORY-SPA-ID-08-gpt-verification-entry`
- **Epic:** [EPIC-SPA-04 Identity & Auth](README.md) · **Волна 4 (GPT bridge)**
- **Status:** Done (FR-layer)
- **Источник:** [epic-04 S04-2](../inbound/epic-04.md), [identity-frontend FR-FE-006 / S6 / S7](../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ **построено end-to-end** — OAuth-сервер `/oauth/*` (OAUTH-01…04 🟢) + phone-верификация. Вход #2 **buildable** целиком (сверено с кодом 2026-06-27, см. [`identity-auth-api-validation-2026-06-27`](../../../analysis/identity-auth-api-validation-2026-06-27.md)).

## Артборд (SSOT дизайна)
- [mockup-120-gpt-story-authorization-flow-state-sheet-spec.md](../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.png) — единственный SSOT GPT-моста (бывший M61 удалён как перекрытый, см. [README §4](README.md)).
- Состояния M120: A Story Ready In GPT · B Redirect Resolving · C Login Required · D Signup Required · E Phone Disclosure · F Phone+OTP · G Success (Return to ChatGPT) · H Already Verified + error side-panel + routes/API panel.

## Зачем простыми словами
Пользователь приходит из Custom GPT (после story-интервью). На **нашем** вебе он логинится/регистрируется и верифицирует телефон, затем возвращается в ChatGPT. Credentials/номер/OTP **никогда не идут через GPT**. Story-draft preserved на каждом шаге — «я не начинаю заново».

## Функциональные требования (FR)
- **FR-08.1** Вход по ссылке `…/verify?context=custom_gpt`; на каждом экране виден persistent блок «Story Draft · Status: Saved».
- **FR-08.2** Redirect Resolving — «Checking your session» (calm progress), контекст «Custom GPT», draft preserved.
- **FR-08.3** Нет сессии → login/signup (переиспользовать [ID-01](STORY-SPA-ID-01-web-authentication.md)); signup email-first (телефон позже).
- **FR-08.4** Аутентифицирован, `phone_verified=false` → disclosure + verify (переиспользовать [ID-04](STORY-SPA-ID-04-phone-verification-flow.md)).
- **FR-08.5** Success → «Verified civic participant» + **«Return to ChatGPT»** (+ Open Profile); already-verified → сразу «You're ready».
- **FR-08.6** Error side-panel — те же коды, что [ID-05](STORY-SPA-ID-05-verification-error-states.md) (компактно).
- **FR-08.7** Privacy: пароль/номер/OTP/токены не отображать; allowed — draft status, verification status, dial-prefix.
- **FR-08.9** **Локализация (L10N) — сразу:** все собственные строки моста (GPT-context-блоки, «Return to ChatGPT», «You're ready», redirect-resolving и т.п.) через `useI18n()`/`t('key')` (+ `formatI18nMessage` для подстановок); новые ключи — в [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js) **+ `IDENTITY_FLAT_KEYS`**, на **et/ru/en**; переиспользуемые из ID-01/03/04/05 экраны берут уже-локализованные ключи (ID-09 done). Без хардкод-английского; запрещённые термины — нет ни в одном языке. Пошагово/гварды — [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md).
- **FR-08.8** ✅ **OAuth-handshake построен:** вход #2 — это OAuth Authorization Code + PKCE. GPT (OAuth-клиент) → `GET /oauth/authorize` → identity редиректит на **`<spa>/login?oauth_request_id=<id>`**. После входа SPA вызывает `POST /oauth/authorize/complete` с `{oauth_request_id}`; identity отвечает **302 → `redirect_uri?code&state`** (возврат в ChatGPT) **или 403 `verification_required`** (если телефон не подтверждён) → SPA ведёт на `verify_url`. Релизить можно end-to-end.

## Routes / API
- Routes (SPA): **`/login?oauth_request_id=<id>`** (точка входа OAuth-handshake), **`/verify?context=<ctx>`** (ветка `verification_required`). Query-маркеры **от identity**: `oauth_request_id` (на `/login`), `context` (на `/verify`). `draft_id`/`error` — **не** от identity (FE/gateway-owned).
- API (identity): `GET /me`, `POST /auth/phone/request|confirm`, `GET /oauth/authorize` (302), `POST /oauth/authorize/complete` (302 code | 403 verification_required). Сервер регистрирует все `/oauth/*` ([`asgi_app.py:408-454`](../../../../../doge-identity-service/src/core/api/asgi_app.py)).

## API-интеграция (doge-identity-service)
> Для `/me` и `/auth/phone/*` — Bearer Supabase JWT, envelope `{"data"}` / `{"error":{"code","message","trace_id"}}`. **OAuth-ответы — другой формат:** RFC6749 (`{error, error_description}`) и плоский `verification_required` (см. ниже) — **не** вложенный конверт.

**OAuth-handshake входа #2 (построен, OAUTH-01…04):**
1. GPT (OAuth-клиент) → `GET /oauth/authorize?response_type=code&client_id&redirect_uri&state&code_challenge&code_challenge_method=S256&scope&requested_action=stories:submit&return_context=<ctx>` → identity **302** → **`<spa>/login?oauth_request_id=<id>`** ([`spa_login.py:19-22`](../../../../../doge-identity-service/src/core/oauth/spa_login.py)).
2. SPA `/login`: вход/регистрация через **Supabase Auth** (reuse [ID-01](STORY-SPA-ID-01-web-authentication.md)). Получив Supabase JWT, SPA → `POST /oauth/authorize/complete` (Bearer + `{"oauth_request_id":"<id>"}`).
3. Ответ identity:
   - **happy:** **302** → `redirect_uri?code=…&state=…` — браузер возвращается в ChatGPT (GPT обменяет code на токен через `/oauth/token`).
   - **нужна верификация** (`phone_verified=false`): **HTTP 403**, тело **плоское** `{"error":"verification_required","reason":"…","verify_url":"<spa>/verify?context=<ctx>"}` ([`verification_required.py:14-34`](../../../../../doge-identity-service/src/core/oauth/verification_required.py)). SPA ветвится на этот shape (⚠️ **не** `{"error":{"code"}}`) и идёт на `verify_url`.
4. На `/verify?context=` — phone-флоу (reuse [ID-04](STORY-SPA-ID-04-phone-verification-flow.md): `/auth/phone/request` → `/confirm`). После `phone_verified=true` SPA **повторяет** `POST /oauth/authorize/complete` с тем же `oauth_request_id` → теперь happy-path 302 в ChatGPT.

**Already-verified:** на любой точке `GET /me.phone_verified === true` → `/complete` сразу отдаёт code (без `/verify`); экран «You're ready».

**Gateway (submit-story, после возврата в GPT):**
- GPT с токеном сам шлёт историю в **`doge-complaints-gateway`**; gateway зовёт identity `POST /oauth/introspect` (service-token) → `{active, sub, phone_verified}` и enforce'ит `verification_required` на своей стороне. Это **gateway-репо**, не identity — контракт → [`identity-gateway-integration-notes-2026-06-23.md`](../../../analysis/identity-gateway-integration-notes-2026-06-23.md).

## Зависимости
- Переиспользует [ID-01](STORY-SPA-ID-01-web-authentication.md), [ID-04](STORY-SPA-ID-04-phone-verification-flow.md), [ID-05](STORY-SPA-ID-05-verification-error-states.md), [ID-03](STORY-SPA-ID-03-civic-status-component.md). Draft-резюм паттерн зеркалит [ID-06](STORY-SPA-ID-06-protected-action-gate.md). Backend OAuth (OAUTH-01…04) — **построен**, не блокер.

## Вне scope
- Сам OAuth-сервер `/oauth/*` — это **identity** (построен, OAUTH-01…04); SPA только проходит handshake (`/login` → `/complete`). Регистрация Custom GPT как OAuth-клиента (redirect/creds) — ops/ChatGPT. Story-интервью внутри GPT (продукт GPT, не SPA). Enforcement `verification_required` на submit — gateway.

## Тексты и переводы (en / et / ru)
> SSOT собственных строк моста (из артборда M120). Локализация — по [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md): ключи в [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js) **+ `IDENTITY_FLAT_KEYS`**. Экраны login/signup/phone/civic/errors переиспользуются из ID-01/03/04/05 (их ключи уже локализованы в ID-09 — **не дублировать**).

### `gptBridge.*`
| key | en | et | ru |
|-----|----|----|----|
| gptBridge.ready.title | Story Ready in GPT | Lugu valmis GPT-s | История готова в GPT |
| gptBridge.ready.message | Your story is ready. DOGEstonia needs a verified civic account before submission. | Sinu lugu on valmis. Enne esitamist vajab DOGEstonia kinnitatud kodanikukontot. | Ваша история готова. Перед отправкой DOGEstonia нужен подтверждённый гражданский аккаунт. |
| gptBridge.ready.continue | Continue to DOGEstonia | Jätka DOGEstoniasse | Перейти в DOGEstonia |
| gptBridge.draft.label | Story Draft | Loo mustand | Черновик истории |
| gptBridge.draft.statusPrepared | Status: Prepared | Olek: ette valmistatud | Статус: подготовлено |
| gptBridge.draft.statusSaved | Status: Saved | Olek: salvestatud | Статус: сохранено |
| gptBridge.draft.statusReady | Status: Ready | Olek: valmis | Статус: готово |
| gptBridge.draft.sourceGpt | Source: Custom GPT | Allikas: Custom GPT | Источник: Custom GPT |
| gptBridge.resolving.title | Checking your session | Kontrollime sinu sessiooni | Проверяем вашу сессию |
| gptBridge.resolving.message | DOGEstonia is preparing your verification flow. | DOGEstonia valmistab ette sinu kinnitamise voogu. | DOGEstonia готовит процесс подтверждения. |
| gptBridge.resolving.context | Context: Custom GPT | Kontekst: Custom GPT | Контекст: Custom GPT |
| gptBridge.resolving.draftPreserved | Story Draft: Preserved | Loo mustand: säilitatud | Черновик истории: сохранён |
| gptBridge.login.title | Sign in to continue | Logi sisse, et jätkata | Войдите, чтобы продолжить |
| gptBridge.login.message | Your story is saved. Sign in to continue verification. | Sinu lugu on salvestatud. Logi sisse, et jätkata kinnitamist. | Ваша история сохранена. Войдите, чтобы продолжить подтверждение. |
| gptBridge.signup.title | Create DOGEstonia account | Loo DOGEstonia konto | Создать аккаунт DOGEstonia |
| gptBridge.signup.message | Create an account to continue your story submission. | Loo konto, et jätkata loo esitamist. | Создайте аккаунт, чтобы продолжить отправку истории. |
| gptBridge.signup.phoneNote | Phone verification happens after account creation. | Telefoni kinnitamine toimub pärast konto loomist. | Подтверждение телефона произойдёт после создания аккаунта. |
| gptBridge.success.title | Verified civic participant | Kinnitatud kodanik | Подтверждённый гражданский участник |
| gptBridge.success.message | Your civic account is verified. Return to ChatGPT to continue your story submission. | Sinu kodanikukonto on kinnitatud. Naase ChatGPT-sse, et jätkata loo esitamist. | Ваш гражданский аккаунт подтверждён. Вернитесь в ChatGPT, чтобы продолжить отправку истории. |
| gptBridge.success.returnToChatgpt | Return to ChatGPT | Naase ChatGPT-sse | Вернуться в ChatGPT |
| gptBridge.success.openProfile | Open Profile | Ava profiil | Открыть профиль |
| gptBridge.alreadyVerified.title | You're ready | Oled valmis | Всё готово |
| gptBridge.alreadyVerified.message | Your account is already verified. Return to ChatGPT to continue. | Sinu konto on juba kinnitatud. Naase ChatGPT-sse, et jätkata. | Ваш аккаунт уже подтверждён. Вернитесь в ChatGPT, чтобы продолжить. |
| gptBridge.alreadyVerified.context | Verification: Already Complete | Kinnitamine: juba tehtud | Подтверждение: уже выполнено |

---

## Acceptance Criteria (FR-уровень)
- [ ] Точка входа `/login?oauth_request_id=<id>` (из `/oauth/authorize`-redirect) проводит login/signup и вызывает `POST /oauth/authorize/complete`.
- [ ] Happy-path: `/complete` → 302 в ChatGPT (`redirect_uri?code&state`); экран «Return to ChatGPT».
- [ ] `verification_required` (403, плоский `{error,reason,verify_url}`) → SPA уходит на `verify_url` (`/verify?context=`), проводит phone-verify, **повторяет** `/complete` → 302 в ChatGPT.
- [ ] Already-verified → сразу 302 code, без OTP («You're ready»).
- [ ] Story-draft preserved виден на всех состояниях; «работа не потеряна».
- [ ] Credentials/номер/OTP не проходят через GPT (только наш веб).
- [ ] Все строки локализованы (et/ru/en) через `t()`; нет хардкод-английского (FR-08.9).
