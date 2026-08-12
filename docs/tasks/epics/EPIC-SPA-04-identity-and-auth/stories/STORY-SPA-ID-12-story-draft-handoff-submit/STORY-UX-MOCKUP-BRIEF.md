# STORY-UX-MOCKUP-BRIEF — STORY-SPA-ID-12 (M128 Path A)

## 1. Роль и задача

Ты UX/UI spec writer для **spa-app** (React/Vite, HashRouter, тёмный civic-tech UI). Твоя цель — поддерживать и при необходимости уточнять mockup spec для P3 `@mockup:` handoff. **Не пиши код.** M128 уже существует и validated — этот brief фиксирует Path A handoff для разработки и regression UX.

---

## 2. Контекст story (verbatim)

### Meta

- **Key:** `STORY-SPA-ID-12-story-draft-handoff-submit`
- **Epic:** EPIC-SPA-04 Identity & Auth
- **Status:** Todo
- **Severity:** 🔴 HIGH (клиентская половина M-3; чинит M-7)
- **Мокап (SSOT дизайна):** **M128** — [spec](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) · [png](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png)
- **Зависит от:** GW-DRAFT-01/02, reuse ID-08 / ID-04 / ID-06

### Зачем простыми словами

Юзер собрал историю **в GPT**. GPT сохранил её в gateway (стеш) и прислал юзера к нам со ссылкой `?draft_id=…`. Наша страница: убеждается что юзер залогинен, показывает **предпросмотр** черновика (на языке, на котором он его писал), а по подтверждению — если телефон подтверждён — **сама отправляет** историю под Supabase-сессией. Если телефон не подтверждён — разовая верификация, потом **автоматически** повтор сабмита.

### Scope (что должно стать истинным)

- **A. Приём `draft_id`:** `/story/submit?draft_id=<id>` — `useSearchParams` → `GET {gateway}/story-drafts/{id}` под Bearer → предпросмотр. 401 → login-redirect; 404 → «истёк»; нет `draft_id` → empty-state.
- **B. Предпросмотр (D12-2/3):** полный структурированный, read-only, поля из payload DTO, версия `session_language`, бейдж языка. Защитный рендер отсутствующих полей.
- **C. Сабмит под сессией (D12-5/8):** `POST {gateway}/story-drafts/{id}/submit` под Bearer. **202**→success (submission_id, «на модерации»); **403** `verification_required`→verify (reuse ID-04, `verify_url`)→**авто-ресабмит**; **401**→login-redirect; **404**→«истёк»; **503**→ретрай.
- **D. НЕ звать `POST /story-drafts`** из браузера. Убрать createStoryDraft-стеш из handoff-пути.
- **E. Починить M-7:** `storyDraftService.js` — реальные роуты/коды (GET + submit под Bearer); убрать mock-ветку на сервис-путь; VerificationRequiredError уже есть — маппить на 403.
- **F. Удалить локальный редактор (D12-1):** `/story/compose` compose-форма + save-draft удаляются; создание истории из веба = **ссылка на GPT** (`VITE_STORY_GPT_URL`) на доске/в шелле и в empty-state.
- **G. Переименование роута (D12-6):** `/story/compose` → **`/story/submit`**; обновить `PROTECTED_PREFIXES`, внутренние ссылки, deploy-конфиг; ⚠️ **GPT inbound-redirect** должен указывать на новый путь (см. Риски).
- **H. L10N (обязательно):** новые строки `storyHandoff.*` (preview/submit/expired/serviceDown/empty) через `useI18n()`/`t()`, ключи в `identityDictionary.js` + `IDENTITY_FLAT_KEYS`, et/ru/en; verify-экраны и «Return»-паттерн — reuse `gptBridge.*` из ID-08, не дублировать. Контент истории (D12-3) НЕ переводим.
- **I. Иконки/ассеты (обязательно):** все иконки экранов брать из каталога [STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md) — SSOT имён файлов; путь в коде — `/icons/story-handoff/ic-<name>.png`.

### Вне scope

- GPT OAuth bridge (M120 / ID-08) — отдельный flow; **не** reuse `gptBridge.success.*` для State F.
- OTP internals — reuse M32 / ID-04; **не перерисовывать**.
- Browser `POST /story-drafts` (service-only, GPT stash).
- Перевод контента истории (D12-3).

### UI-relevant Acceptance Criteria

- [ ] `?draft_id` → `GET /story-drafts/{id}` под Bearer → полный original-language предпросмотр (реальный вызов, не mock); 401→login-redirect (draft сохранён); 404→«истёк»; нет draft_id→empty-state «создать в GPT».
- [ ] Предпросмотр доступен **до** phone-verify (read active-only); контент только на preview, не на verify.
- [ ] Подтверждение → `POST /story-drafts/{id}/submit`: 202→успех (submission_id, «на модерации»); 403→verify→**авто-ресабмит**; 401→login-redirect; 503→ретрай; 404→«истёк».
- [ ] Локальный редактор удалён; «создать историю» ведёт на `VITE_STORY_GPT_URL`.
- [ ] Роут `/story/submit` (rename применён во всех швах); временный redirect старого пути на cutover.
- [ ] Все строки chrome локализованы (et/ru/en); контент истории — на языке оригинала; нет хардкод-английского.

---

## 3. Code facts (verified)

| Зона UI | Файл | Что сейчас |
|---------|------|------------|
| Compose page (устарело) | `spa-app/src/pages/StoryComposePage.jsx` | Локальный редактор title/summary/content; `createStoryDraft` + submit |
| Draft API client | `spa-app/src/services/storyDraftService.js` | POST `/story-drafts` (browser); нет GET; mock service path |
| Router | `spa-app/src/App.jsx` | `/story/compose` → StoryComposePage |
| Protected routes | `spa-app/src/router/sessionRoutePolicy.js` | `/story/compose` в PROTECTED_PREFIXES |
| Phone verify reuse | `spa-app/src/components/PhoneVerification/` | ID-04 OTP flow (M32 internals) |
| StoryGate panels | `spa-app/src/components/StoryGate/` | DraftSaved, VerificationRequired, SubmissionSuccess — частичный reuse |
| GPT chips | `spa-app/src/i18n/identityDictionary.js` | `gptBridge.draft.*` для chips; `storyHandoff.*` — **0** |
| Handoff icons | `spa-app/public/icons/story-handoff/` | **не существует** на scaffold |

---

## 4. Уже есть

| Артефакт | Путь |
|----------|------|
| M128 spec (Path A SSOT) | `spa-app/docs/UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md` |
| M128 PNG | `spa-app/docs/UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png` |
| Validation | `spa-app/docs/analysis/validation-mockup-128-story-draft-handoff-2026-07-04.md` (F1 fixed) |
| Style reference | M120 (`mockup-120-gpt-story-authorization-flow-state-sheet-spec.md`) — browser-submit model differs |
| OTP reference | M32 (`mockup-32-phone-verification-flow-sheet-spec.md`) |
| Verify errors | M37 (`mockup-37-verification-error-state-sheet-spec.md`) |
| Icon catalog | `spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md` |

**UI route:** `/#/story/submit?draft_id=<id>` (HashRouter)  
**Viewport:** 1536×1024 (spa UI pipeline standard)

---

## 5. Что нарисовать / описать (M128 states)

| Screen/State | Описание | Priority |
|--------------|----------|----------|
| **A Resolving** | Spinner + «Preparing Your Story»; chips Story Draft · Preserved · Source GPT | must |
| **B Login** | Lock icon; sign-in CTA; draft preserved message; no narrative content | must |
| **C Preview** | Full read-only fields (title/summary/description/category/labels/institution/location); language badge; Submit CTA; helper phone-once note | must |
| **D Verify** | One-step-before-submit chrome; PhoneVerificationFlow inline (M32); **narrative hidden**; auto-resubmit note | must |
| **E Submitting** | Spinner + submitting copy; no editable fields | must |
| **F Submitted** | Success check; submission_id + copy; status Under Review; Go To Board + Submit Another (GPT URL) | must |
| **G Expired** | Clock icon; draft no longer available; create new → GPT | must |
| **H ServiceDown** | Cloud error; retry CTA | must |
| **E0 Empty** | No draft_id; start in DOGEstonia GPT; Open GPT CTA | must |

**Mobile:** не в Scope/AC — desktop 1536×1024 only для gate.

---

## 6. Deliverables

**Path A (текущий):** новый mockup spec **не создавать**. Anchor task T08 создаёт `ui-mockup-spec.md` со ссылкой на M128.

Если потребуется новый spec (только по operator gate):

- Каталог: `spa-app/docs/UX/mockups/epic-04/`
- Имя: `mockup-NN-<slug>-spec.md` (+ PNG)
- Структура как `mockup-128-…-spec.md`: Purpose, states, layout, tokens, components, selectors/data-testid

**Puppeteer selectors (T08/T09 — зафиксировать при implement):**

| State | Suggested data-testid |
|-------|----------------------|
| A | `story-handoff-resolving` |
| B | `story-handoff-login` |
| C | `story-handoff-preview` |
| D | `story-handoff-verify` |
| E | `story-handoff-submitting` |
| F | `story-handoff-success` |
| G | `story-handoff-expired` |
| H | `story-handoff-service-down` |
| E0 | `story-handoff-empty` |

Dev override query (P3): `dev_handoff_phase=a|b|c|d|e|f|g|h|e0` on `/#/story/submit`.

---

## 7. Handoff (copy-paste для P3)

```
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png
```

ui_anchor: `task-spa-id-12-t08-ui-anchor-m128-icons`  
ui_screenshot_root: `<anchor-task>/ui-baseline/`  
ui_screenshot_states: A, B, C, D, E, F, G, H, E0

---

## 8. Checklist DoD

- [ ] Каждый UI AC (#1,#2,#6,#7,#8 chrome) покрыт state в M128
- [ ] Selectors/data-testid задокументированы для puppeteer (T09)
- [ ] Нет противоречий «Вне scope» (OTP redraw, gptBridge.success for F, browser stash)
- [ ] Иконки только из icon-assets catalog
- [ ] Operator gate: M128 validation 2026-07-04 принят (Path A) — отдельный UX-чат **опционален**

**Следующий шаг:** P2 build window → P3 execute (`pkg-000026`). UX-чат нужен только при правках M128.
