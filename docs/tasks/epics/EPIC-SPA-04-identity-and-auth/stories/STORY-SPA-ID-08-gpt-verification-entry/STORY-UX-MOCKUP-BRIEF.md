# STORY-UX-MOCKUP-BRIEF — STORY-SPA-ID-08 GPT Verification Entry

> **Scaffolded:** 2026-07-02T10:51:50Z · **Path A:** mockup-120 уже существует — этот brief для operator gate / selector alignment перед P3, не для нового артборда с нуля.

---

## 1) Роль и задача

Ты UX/UI spec writer для **spa-app**. Твоя цель — подтвердить или дополнить **mockup spec** для фазы P3 `@mockup:` по story **STORY-SPA-ID-08 GPT Verification Entry**. **Не пиши код.** Работай только со спецификацией, layout, tokens, component states, selectors/`data-testid`.

---

## 2) Контекст story (verbatim)

### Meta (pipeline)

- **Key:** `STORY-SPA-ID-08-gpt-verification-entry`
- **Parent Epic:** EPIC-SPA-04 Identity & Auth · **Волна 4 (GPT bridge)**
- **Status:** Todo
- **Wave:** `pkg-000025` (scaffold 2026-07-02)
- **ui_scope:** `visual` (M120 anchor — T05)

### Зачем простыми словами

Пользователь приходит из Custom GPT (после story-интервью). На **нашем** вебе он логинится/регистрируется и верифицирует телефон, затем возвращается в ChatGPT. Credentials/номер/OTP **никогда не идут через GPT**. Story-draft preserved на каждом шаге — «я не начинаю заново».

### Scope (FR — verbatim)

- **FR-08.1** Вход по ссылке `…/verify?context=custom_gpt`; на каждом экране виден persistent блок «Story Draft · Status: Saved».
- **FR-08.2** Redirect Resolving — «Checking your session» (calm progress), контекст «Custom GPT», draft preserved.
- **FR-08.3** Нет сессии → login/signup (переиспользовать ID-01); signup email-first (телефон позже).
- **FR-08.4** Аутентифицирован, `phone_verified=false` → disclosure + verify (переиспользовать ID-04).
- **FR-08.5** Success → «Verified civic participant» + **«Return to ChatGPT»** (+ Open Profile); already-verified → сразу «You're ready».
- **FR-08.6** Error side-panel — те же коды, что ID-05 (компактно).
- **FR-08.7** Privacy: пароль/номер/OTP/токены не отображать; allowed — draft status, verification status, dial-prefix.
- **FR-08.9** **Локализация (L10N) — сразу:** все собственные строки моста через `useI18n()`/`t('key')`; ключи `gptBridge.*` в `identityDictionary.js` + `IDENTITY_FLAT_KEYS`, et/ru/en.
- **FR-08.8** OAuth-handshake: GPT → `GET /oauth/authorize` → `<spa>/login?oauth_request_id=<id>` → после входа `POST /oauth/authorize/complete` → 302 ChatGPT или 403 `verification_required` → `verify_url`.

### Вне scope (verbatim)

- Сам OAuth-сервер `/oauth/*` — это **identity** (построен, OAUTH-01…04); SPA только проходит handshake (`/login` → `/complete`). Регистрация Custom GPT как OAuth-клиента (redirect/creds) — ops/ChatGPT. Story-интервью внутри GPT (продукт GPT, не SPA). Enforcement `verification_required` на submit — gateway.

### UI-relevant Acceptance Criteria (verbatim)

- [ ] Точка входа `/login?oauth_request_id=<id>` (из `/oauth/authorize`-redirect) проводит login/signup и вызывает `POST /oauth/authorize/complete`.
- [ ] Happy-path: `/complete` → 302 в ChatGPT (`redirect_uri?code&state`); экран «Return to ChatGPT».
- [ ] `verification_required` (403, плоский `{error,reason,verify_url}`) → SPA уходит на `verify_url` (`/verify?context=`), проводит phone-verify, **повторяет** `/complete` → 302 в ChatGPT.
- [ ] Already-verified → сразу 302 code, без OTP («You're ready»).
- [ ] Story-draft preserved виден на всех состояниях; «работа не потеряна».
- [ ] Credentials/номер/OTP не проходят через GPT (только наш веб).
- [ ] Все строки локализованы (et/ru/en) через `t()`; нет хардкод-английского (FR-08.9).

---

## 3) Code facts (verified paths)

| Зона UI | Файл | Что сейчас |
|---------|------|------------|
| Routes | [`spa-app/src/App.jsx`](../../../../../../../../src/App.jsx) | `/login` public; `/verify` in AppShell |
| Login | [`spa-app/src/pages/LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx) | ID-01 forms; **нет** `oauth_request_id` / OAuth complete |
| Verify | [`spa-app/src/pages/VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx) | ID-04 phone flow; **нет** `context=custom_gpt`; complete → `/dashboard` |
| Identity API | [`spa-app/src/auth/identityService.js`](../../../../../../../../src/auth/identityService.js) | `/me`, phone APIs only |
| GPT components | `spa-app/src/components/GptBridge/` | **не существует** (T05 scaffold) |
| i18n | [`spa-app/src/i18n/identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) | grep `gptBridge` → **0** |
| Phone reuse | [`spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) | ID-04 ready |
| Errors reuse | ID-05 panels in phone flow | ready |

---

## 4) Уже есть

| Артефакт | Путь |
|----------|------|
| **Primary SSOT** | [`mockup-120-gpt-story-authorization-flow-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) |
| PNG | [`mockup-120-gpt-story-authorization-flow-state-sheet-spec.png`](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.png) |
| Extends login | [`mockup-121-web-authentication-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md) (states C/D) |
| Extends phone | [`mockup-32-phone-verification-flow-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) (states E/F) |
| Extends errors | [`mockup-37-verification-error-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) |
| Extends civic | [`mockup-28-civic-status-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md) |
| Viewport | **1536×1024** (desktop artboard) |
| UI routes | `/#/login?oauth_request_id=<id>` · `/#/verify?context=custom_gpt` |

**Path A decision:** M120 — единственный SSOT GPT-моста. Новый `mockup-NN` **не обязателен**, если оператор подтверждает M120 as-is. Delta-spec допустим только для **selectors / data-testid** (см. §5).

---

## 5) Что нарисовать / описать

| Screen / state | Описание | Priority |
|----------------|----------|----------|
| **B — Redirect Resolving** | Calm progress «Checking your session»; context Custom GPT; draft preserved banner | **must** |
| **C — Login Required** | ID-01 login form + GPT draft banner + `gptBridge.login.*` copy | **must** |
| **D — Signup Required** | ID-01 signup + phone-later note + draft banner | **must** |
| **E/F — Phone disclosure + OTP** | Reuse M32 inside GPT shell + persistent draft banner | **must** |
| **G — Success** | «Verified civic participant»; primary «Return to ChatGPT»; secondary Open Profile | **must** |
| **H — Already Verified** | «You're ready»; return CTA; no OTP step | **must** |
| **Error side-panel** | Compact ID-05 codes alongside flow | **should** |
| **A — Story Ready in GPT** | ChatGPT-side context (reference only; not SPA route) | **should** (artboard context) |

### Proposed `data-testid` selectors (for T06 puppeteer — add to M120 delta or confirm)

| Element | Proposed `data-testid` | State |
|---------|------------------------|-------|
| GPT draft banner root | `gpt-bridge-draft-banner` | all SPA states |
| Draft status label | `gpt-bridge-draft-status` | all |
| Resolving panel | `gpt-bridge-resolving` | B |
| Login GPT context header | `gpt-bridge-login-context` | C |
| Signup GPT context header | `gpt-bridge-signup-context` | D |
| Success panel | `gpt-bridge-success` | G |
| Return to ChatGPT CTA | `gpt-bridge-return-chatgpt` | G, H |
| Open Profile link | `gpt-bridge-open-profile` | G |
| Already verified panel | `gpt-bridge-already-verified` | H |

**Mobile:** не в Scope/AC story — desktop 1536×1024 only unless operator expands.

---

## 6) Deliverables

- **Каталог:** `spa-app/docs/UX/mockups/epic-04/`
- **Имя (Path A):** подтвердить существующий `mockup-120-gpt-story-authorization-flow-state-sheet-spec.md` **или** создать `mockup-120-gpt-story-authorization-flow-state-sheet-selectors-delta-spec.md` если нужны только selectors
- **Структура spec** (как [`mockup-01-dashboard-main-spec.md`](../../../../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md)):
  1. Purpose / Product context
  2. Artboard type + viewport
  3. Visual tokens (dark civic-tech, yellow accent)
  4. Per-state layout (title, message, CTAs, context blocks)
  5. Component inventory (`GptDraftBanner`, success/already-verified panels)
  6. States + transitions table
  7. **Selectors / data-testid** section (§5 above)
  8. Privacy rules (no phone/OTP/password display)

---

## 7) Handoff (copy-paste для P3)

```
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md
```

Если добавлен delta-spec selectors:

```
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-selectors-delta-spec.md
```

---

## 8) Checklist DoD

- [ ] Каждый UI-relevant AC (#1–#5, #7) покрыт состоянием на артборде M120
- [ ] `data-testid` зафиксированы для puppeteer T06 (§5 table)
- [ ] Нет противоречий с «Вне scope» (нет OAuth-server UI, нет GPT interview screens в SPA)
- [ ] Privacy: no phone/OTP/password/token в mockup labels (FR-08.7)
- [ ] Operator gate **«принято»** записан в чате до старта P3 Execute
- [ ] Strings map to `gptBridge.*` keys (pipeline story table) — no English-only literals in spec

---

**Следующий шаг для оператора:** если M120 уже принят → P2 Build window → P3 Execute с `@mockup:` выше. Если нужны selectors/delta → отдельный UX-чат по этому brief → затем P2/P3.
