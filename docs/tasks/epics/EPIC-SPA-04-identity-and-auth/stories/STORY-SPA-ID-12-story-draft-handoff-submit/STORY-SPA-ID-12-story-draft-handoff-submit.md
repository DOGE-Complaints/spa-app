# STORY-SPA-ID-12 — Приём черновика из GPT (draft_id) + сабмит под сессией

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-12-story-draft-handoff-submit`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · **Волна 6 (Story draft handoff)**
- **Status:** Done
- **Wave:** `pkg-000026` (scaffolded 2026-07-05)
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md)
- **Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [mockup-128-story-draft-handoff-submit-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [validation-mockup-128-story-draft-handoff-2026-07-04](../../../../../../analysis/validation-mockup-128-story-draft-handoff-2026-07-04.md); [STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md); [`mvp-integration-plan-2026-07-02.md`](../../../../../../../../doge-identity-service/docs/analysis/mvp-integration-plan-2026-07-02.md) §2,§4
- **Источник:** [`mvp-integration-plan-2026-07-02.md`](../../../../../../../../doge-identity-service/docs/analysis/mvp-integration-plan-2026-07-02.md) §2,§4
- **Актуализация 2026-07-03:** под **реальный** gateway (пакет [`story-draft-handoff`](../../../../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/story-draft-handoff/INDEX.md) — GW-DRAFT-01…04 реализованы), см. [`summary-story-draft-handoff-code-changes-2026-07-03`](../../../../../../../../doge-complaints-gateway/docs/analysis/summary-story-draft-handoff-code-changes-2026-07-03.md).
- **Продуктовое интервью 2026-07-04:** решения D12-1…8 (ниже) — модель «браузер сабмитит», локальный редактор удаляется, полный original-language предпросмотр, один state-sheet артборд.
- **Зависит от:** GW-DRAFT-01/02 (роуты готовы), reuse [ID-08](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md)/[ID-04](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md)/[ID-06](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md)
- **Мокап (SSOT дизайна):** **M128** — [spec](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) · [png](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png); валидация [validation-mockup-128-…-2026-07-04](../../../../../../analysis/validation-mockup-128-story-draft-handoff-2026-07-04.md) (F1 fixed). Промпт: [STORY-SPA-ID-12-ux-artboard-prompt.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-ux-artboard-prompt.md). Стиль-эталон [M120](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md); OTP-внутренности — [M32](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md).
- **ui_scope:** `visual` (M128 anchor — T08)
- **Severity:** 🔴 HIGH (клиентская половина M-3; чинит M-7)

## Meta (backlog mirror)

## Зачем простыми словами
Юзер собрал историю **в GPT**. GPT сохранил её в gateway (стеш) и прислал юзера к нам со ссылкой `?draft_id=…`. Наша страница: убеждается что юзер залогинен, показывает **предпросмотр** черновика (на языке, на котором он его писал), а по подтверждению — если телефон подтверждён — **сама отправляет** историю под Supabase-сессией. Если телефон не подтверждён — разовая верификация, потом **автоматически** повтор сабмита.

## Артборд (SSOT дизайна)
- **Основной:** [mockup-128-story-draft-handoff-submit-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) · [png](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png) — 9 состояний (A Resolving · B Login · C Preview · D Verify · E Submitting · F Submitted · G Expired · H ServiceDown · E0 Empty) + side-панели (Flow/Error/Route&API/Privacy/Principles).
- **Валидация:** [validation-mockup-128-story-draft-handoff-2026-07-04](../../../../../../analysis/validation-mockup-128-story-draft-handoff-2026-07-04.md) — модельно верен; F1 (typo State E) исправлен; остаток F2 (epic-имя) / R1 (`draft_id<<id>` глиф) — мелочь.
- Контекст: стиль-эталон [M120](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) (но модель другая — browser-submit, не return-to-GPT); OTP-внутренности — [M32](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md); ошибки verify — [M37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md).
- **Иконки/визуалы (SSOT имён файлов):** [../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md) — каталог всех функциональных иконок M128 (контекст ↔ имя файла ↔ промпт на прозрачном растре). **Имена файлов иконок брать строго отсюда** (см. Scope §I); путь в коде — `/icons/story-handoff/ic-<name>.png`.
- ⚠️ Тексты ниже синхронизированы с **M128** (мокап — приоритет).

## Решения продуктового интервью (2026-07-04)
| # | Решение | Следствие |
|---|---------|-----------|
| **D12-1** | Локальный compose-редактор **удаляется** | `/story/submit` = приёмник `draft_id`; без него — empty-state «создать в GPT» |
| **D12-2** | **Полный** структурированный предпросмотр | title+summary+description+категория+institution+location, read-only |
| **D12-3** | Предпросмотр — на **языке оригинала** (`session_language`) | контент истории НЕ переводим; локализуем только chrome (лейблы/кнопки/ошибки) |
| **D12-4** | Нет сессии (401) → **redirect на `/login`** с возвратом | `draft_id` сохраняется (sessionStorage + `?next=`), после логина → назад на preview |
| **D12-5** | На submit-403 → verify (reuse ID-04) → **авто-ресабмит** | один «клик намерения»; verify_url из тела 403 |
| **D12-6** | Роут переименован в **`/story/submit`** | ⚠️ cross-system: GPT inbound-redirect должен указывать на новый путь (см. Риски) |
| **D12-7** | Один **state-sheet** артборд (стиль M120) + ссылка на M32 | не перерисовываем OTP |
| **D12-8** | После успеха — **на доску + «на модерации»** | submission_id + статус; «ещё историю» → `VITE_STORY_GPT_URL` |

## Фактический контракт gateway (verified 2026-07-03)
Три роута ([asgi_app.py:521,537,552](../../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py)); **spa использует только GET и submit** (POST-стеш — сервисный, его делает GPT):

| Роут | Кто | Auth (факт) | Коды |
|------|-----|-------------|------|
| `POST /story-drafts` | **GPT (сервис-токен)** — не spa | service-only | — |
| `GET /story-drafts/{draft_id}` | **spa** | Supabase Bearer → identity `/me`, **active-only (БЕЗ phone-гейта)** | 200 / 401 / 404 |
| `POST /story-drafts/{draft_id}/submit` | **spa** | Supabase Bearer → `/me` **+ `phone_verified`-гейт** | 202 / 403 / 401 / 503 / 404 |

- **Асимметрия read vs submit:** читать/предпросматривать черновик можно **до** верификации телефона; сабмитить — только после. Значит phone-гейт всплывает **на шаге submit** (403 `verification_required` + `verify_url`), не на preview.
- **Черновик одноразовый:** на 202 gateway делает `delete_draft` — повторный сабмит того же `draft_id` → 404/идемпотентный replay.
- **Автор = `sub` из `/me`** (gateway сам проставляет, из тела не берётся) — spa `submitter` слать не нужно.
- `/me` отдаёт `data.supabase_user_id` + `phone_verified` ([identity me_response.py:20,42](../../../../../../../../doge-identity-service/src/core/api/me_response.py)).

## Данные предпросмотра — payload DTO (⚠️ полу-контракт)
`GET /story-drafts/{id}` возвращает `data = record.payload` — **сырой payload, который застешил GPT** ([handlers.py `handle_story_draft_get`](../../../../../../../../doge-complaints-gateway/src/core/api/handlers.py)). Payload ≈ тело intake-истории; поля-нарратив ([contracts.py:47-61](../../../../../../../../doge-complaints-gateway/src/core/domain/contracts.py#L47)):

| Поле payload | Тип | В предпросмотре (D12-2/3) |
|--------------|-----|---------------------------|
| `narrative_title` | `{et,ru,en}` | заголовок — версия `session_language` |
| `narrative_summary` | `{et,ru,en}` | краткое |
| `narrative_description` | `{et,ru,en}` | тело истории |
| `narrative_institution` | `{et,ru,en}` | адресат/институт |
| `narrative_canonical_type` | `str` | категория (chip) |
| `narrative_canonical_labels` | `tuple[str]` | метки (chips) |
| `narrative_location_query` | `str` | локация |
| `narrative_session_language` | `str` | язык оригинала → выбор версии i18n-полей + бейдж |
| `narrative_original_text` | `str` | (опц.) исходный текст, если нужно |

- **⚠️ GAP-DTO:** gateway форвардит payload как **opaque `Mapping[str,Any]`** — формально фиксированного «draft preview DTO» нет. **Подзадача T02:** согласовать/зафиксировать поля предпросмотра и рендерить **защитно** (отсутствующие поля — не падать, скрывать секцию). Не изобретать поля, которых нет в payload.
- **Приватность (M120 §8):** контент истории показываем **только** на экране Preview (это review-экран). На interposed verify-экране (D12-5) контент **скрыт** (это auth-экран). Токены/OTP/пароли — никогда.

## Текущее состояние spa (verified) — что чинить (M-7)
- `/story/compose` = [`StoryComposePage.jsx`](../../../../../src/pages/StoryComposePage.jsx): локальная форма compose (`title/summary/content`) + `createStoryDraft`/`submitStoryDraft` ([storyDraftService.js:94,113](../../../../../src/services/storyDraftService.js)).
- **M-7:** `createStoryDraft` шлёт `POST /story-drafts` ([:101](../../../../../src/services/storyDraftService.js)) — теперь **service-only** роут (браузер не должен его звать); `submitStoryDraft` → `POST /story-drafts/{id}/submit` ([:129](../../../../../src/services/storyDraftService.js)) — роут есть, но auth/коды другие; mock завязан на несуществующий сервис-путь.
- Роут в `PROTECTED_PREFIXES` ([sessionRoutePolicy.js:3](../../../../../src/router/sessionRoutePolicy.js)); query читается `useSearchParams` (HashRouter, образец [VerifyPage.jsx:35](../../../../../src/pages/VerifyPage.jsx)).
- Локальный редактор + `STORY_GATE_PHASES` compose-ветки ([StoryComposePage.jsx:36-136](../../../../../src/pages/StoryComposePage.jsx)) — **удаляются** (D12-1); часть StoryGate-панелей (DraftSaved/VerificationRequired) переиспользуются под handoff, часть уходит.

## Целевая машина состояний (D12)
```
enter /story/submit?draft_id=X
  → [A] RESOLVING            (читаем draft_id, GET /story-drafts/X)
      ├─ 401 → [B] LOGIN_REQUIRED → redirect /login?next=… (draft_id в sessionStorage) → назад в [A]
      ├─ 404 → [G] EXPIRED       («черновик истёк или уже отправлен»)
      ├─ нет draft_id → [E0] EMPTY («создать историю в GPT» → VITE_STORY_GPT_URL)
      └─ 200 → [C] PREVIEW       (полный original-language предпросмотр, CTA «Отправить»)
  [C] PREVIEW → submit → POST /story-drafts/X/submit
      ├─ 202 → [F] SUBMITTED     (submission_id, «на модерации», CTA на доску / ещё→GPT)
      ├─ 403 verification_required → [D] VERIFY (reuse ID-04, verify_url) → авто-повтор submit
      ├─ 401 → [B] LOGIN_REQUIRED
      ├─ 404 → [G] EXPIRED
      └─ 503 → [H] SERVICE_DOWN  (ретрай-подсказка)
```

## Scope (что должно стать истинным)
- **A. Приём `draft_id`:** `/story/submit?draft_id=<id>` — `useSearchParams` → `GET {gateway}/story-drafts/{id}` под Bearer → предпросмотр. 401 → login-redirect; 404 → «истёк»; нет `draft_id` → empty-state.
- **B. Предпросмотр (D12-2/3):** полный структурированный, read-only, поля из payload DTO, версия `session_language`, бейдж языка. Защитный рендер отсутствующих полей.
- **C. Сабмит под сессией (D12-5/8):** `POST {gateway}/story-drafts/{id}/submit` под Bearer. **202**→success (submission_id, «на модерации»); **403** `verification_required`→verify (reuse ID-04, `verify_url`)→**авто-ресабмит**; **401**→login-redirect; **404**→«истёк»; **503**→ретрай.
- **D. НЕ звать `POST /story-drafts`** из браузера. Убрать createStoryDraft-стеш из handoff-пути.
- **E. Починить M-7:** [`storyDraftService.js`](../../../../../src/services/storyDraftService.js) — реальные роуты/коды (GET + submit под Bearer); убрать mock-ветку на сервис-путь; VerificationRequiredError уже есть — маппить на 403.
- **F. Удалить локальный редактор (D12-1):** `/story/compose` compose-форма + save-draft удаляются; создание истории из веба = **ссылка на GPT** (`VITE_STORY_GPT_URL`) на доске/в шелле и в empty-state.
- **G. Переименование роута (D12-6):** `/story/compose` → **`/story/submit`**; обновить `PROTECTED_PREFIXES`, внутренние ссылки, deploy-конфиг; ⚠️ **GPT inbound-redirect** должен указывать на новый путь (см. Риски).
- **H. L10N (обязательно):** новые строки `storyHandoff.*` (preview/submit/expired/serviceDown/empty) через `useI18n()`/`t()`, ключи в [`identityDictionary.js`](../../../../../src/i18n/identityDictionary.js) + `IDENTITY_FLAT_KEYS`, et/ru/en ([localization-developer-guide](../../../../../../runtime-docs/localization-developer-guide.md)); verify-экраны и «Return»-паттерн — reuse `gptBridge.*` из ID-08, не дублировать. Контент истории (D12-3) НЕ переводим.
- **I. Иконки/ассеты (обязательно):** все иконки экранов брать из каталога [../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md) — это **SSOT имён файлов**, **не выдумывать** и не заводить свои имена.
  - Файлы кладутся в `spa-app/public/icons/story-handoff/` под именами из каталога (`ic-<name>.png`); в коде ссылка по URL **`/icons/story-handoff/ic-<name>.png`** (Vite отдаёт `public/` от корня, имя не хешируется).
  - Соответствие «иконка ↔ состояние» — по колонке «Контекст использования» каталога (напр. State B → `ic-lock.png`, State F → `ic-success-check.png` + `ic-copy.png`, поля предпросмотра C → `ic-field-*.png`).
  - Декоративные — `<img alt="" aria-hidden="true">`; смысловые (success/error/lock) — осмысленный `alt`/`aria-label`.
  - Бренд-логотип и флаги — **reuse** из `public/assets/` (не дублировать); `success-green`/`error-red` иконки генерировать **после** заведения цвет-токенов (см. каталог, TBD).

## Pipeline tasks (pkg-000026)

| Pkg | Task | README |
|-----|------|--------|
| 1 | T01 | [story-draft-service-gateway-routes](task-spa-id-12-t01-story-draft-service-gateway-routes/README.md) |
| 2 | T02 | [draft-preview-dto-mapper](task-spa-id-12-t02-draft-preview-dto-mapper/README.md) |
| 3 | T03 | [story-handoff-i18n-dictionary](task-spa-id-12-t03-story-handoff-i18n-dictionary/README.md) |
| 4 | T04 | [route-rename-story-submit-cutover](task-spa-id-12-t04-route-rename-story-submit-cutover/README.md) |
| 5 | T05 | [login-draft-id-session-storage](task-spa-id-12-t05-login-draft-id-session-storage/README.md) |
| 6 | T06 | [story-submit-page-state-machine](task-spa-id-12-t06-story-submit-page-state-machine/README.md) |
| 7 | T07 | [verify-interpose-auto-resubmit](task-spa-id-12-t07-verify-interpose-auto-resubmit/README.md) |
| 8 | T08 | [ui-anchor-m128-icons](task-spa-id-12-t08-ui-anchor-m128-icons/README.md) |
| 9 | T09 | [tests-handoff-flow-m128](task-spa-id-12-t09-tests-handoff-flow-m128/README.md) |
| 10 | T10 | [story-gate-id-12](task-spa-id-12-t10-story-gate-id-12/README.md) |

## Предлагаемые субтаски (backlog mirror)

| Таск | Суть | Швы |
|------|------|-----|
| **T01** | `storyDraftService` → реальные роуты: `getStoryDraft(id)` GET + `submitStoryDraft(id)` под Bearer; коды 200/401/403/404/503; удалить `createStoryDraft`-браузерный путь и mock сервис-ветку | `storyDraftService.js` |
| **T02** | Draft preview DTO: маппер payload→viewmodel (original-language selection, защитный рендер, бейдж языка); зафиксировать поля | новый `storyDraftPreview.js` |
| **T03** | `StorySubmitPage` (rename + rewrite compose): машина состояний A/B/C/E0/F/G/H; `useSearchParams`; удалить локальный редактор; **иконки состояний — по именам из icon-assets** | `StorySubmitPage.jsx` (ex-Compose) |
| **T04** | Verify-interpose + авто-ресабмит: 403→`PhoneVerificationFlow` (host inline)→onComplete→повтор submit; контент скрыт на verify | reuse ID-04, StoryGate |
| **T05** | No-session: redirect `/login?next=` + sessionStorage `draft_id`; восстановление после логина | `sessionRoutePolicy.js`, login-return |
| **T06** | Route rename `/story/submit`: `PROTECTED_PREFIXES`, ссылки, deploy; «создать историю»→`VITE_STORY_GPT_URL`; временный redirect `/story/compose`→`/story/submit` | router, shell/board |
| **T07** | L10N `storyHandoff.*` (et/ru/en) + FLAT_KEYS; reuse `gptBridge.*` | `identityDictionary.js` |
| **T08** | Vitest + puppeteer M128 | `__tests__` |
| **T09** | UI-anchor на артборд **M128**; иконки по каталогу | mockup ref |
| **T10** | Story gate ID-12 | — |



## Тексты и переводы (en / et / ru)
> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи `storyHandoff.*` в [`identityDictionary.js`](../../../../../src/i18n/identityDictionary.js) **+ `IDENTITY_FLAT_KEYS`**, et/ru/en; `{country}`-подобной интерполяции нет (submission_id/бейдж языка — динамические значения, не переводятся). **Контент истории НЕ локализуем** (D12-3): показываем как есть, на языке оригинала (бейдж языка — из `session_language`). EN — канон из **M128** (мокап приоритет); et/ru — перевод.

### `storyHandoff.*` (новые ключи — EN канон из M128)
| key | en | et | ru |
|-----|----|----|----|
| storyHandoff.resolving.title | Preparing Your Story | Valmistame su lugu ette | Готовим вашу историю |
| storyHandoff.resolving.message | Loading your story draft from DOGEstonia GPT. | Laadime su loo mustandit DOGEstonia GPT-st. | Загружаем черновик вашей истории из DOGEstonia GPT. |
| storyHandoff.login.title | Sign In To Continue | Jätkamiseks logi sisse | Войдите, чтобы продолжить |
| storyHandoff.login.message | Your story draft is saved. Sign in to preview and submit it. | Su loo mustand on salvestatud. Logi sisse, et see üle vaadata ja esitada. | Черновик вашей истории сохранён. Войдите, чтобы просмотреть и отправить его. |
| storyHandoff.preview.title | Review Your Story | Vaata oma lugu üle | Проверьте вашу историю |
| storyHandoff.preview.message | Check your story before submitting. This is what you built in DOGEstonia GPT. | Kontrolli oma lugu enne esitamist. See on see, mille koostasid DOGEstonia GPT-s. | Проверьте историю перед отправкой. Это то, что вы составили в DOGEstonia GPT. |
| storyHandoff.preview.helper | You'll confirm your phone once before your first submission. | Enne esimest esitamist kinnitad oma telefoni ühe korra. | Перед первой отправкой вы один раз подтвердите телефон. |
| storyHandoff.preview.field.title | Title | Pealkiri | Заголовок |
| storyHandoff.preview.field.summary | Summary | Kokkuvõte | Краткое описание |
| storyHandoff.preview.field.description | Description | Kirjeldus | Описание |
| storyHandoff.preview.field.category | Category | Kategooria | Категория |
| storyHandoff.preview.field.labels | Labels | Sildid | Метки |
| storyHandoff.preview.field.institution | Institution | Asutus | Учреждение |
| storyHandoff.preview.field.location | Location | Asukoht | Локация |
| storyHandoff.preview.submit | Submit Story | Esita lugu | Отправить историю |
| storyHandoff.cta.notNow | Not Now | Mitte praegu | Не сейчас |
| storyHandoff.cta.backToBoard | Back To Board | Tagasi tahvlile | Назад на доску |
| storyHandoff.cta.goToBoard | Go To Board | Ava tahvel | На доску |
| storyHandoff.cta.myStories | My Stories | Minu lood | Мои истории |
| storyHandoff.verify.title | One Step Before Submitting | Üks samm enne esitamist | Один шаг до отправки |
| storyHandoff.verify.message | Verify your phone to submit civic stories. This keeps DOGEstonia free of bots. | Kinnita oma telefon, et esitada kodanikulugusid. See hoiab DOGEstonia botivabana. | Подтвердите телефон, чтобы отправлять гражданские истории. Это защищает DOGEstonia от ботов. |
| storyHandoff.submitting.title | Submitting Your Story | Esitame su lugu | Отправляем вашу историю |
| storyHandoff.submitting.message | Please wait while DOGEstonia submits your civic story. | Palun oota, kuni DOGEstonia esitab su kodanikuloo. | Пожалуйста, подождите, пока DOGEstonia отправляет вашу гражданскую историю. |
| storyHandoff.success.title | Story Submitted | Lugu esitatud | История отправлена |
| storyHandoff.success.message | Your civic story is now under review. | Su kodanikulugu on nüüd läbivaatamisel. | Ваша гражданская история теперь на рассмотрении. |
| storyHandoff.success.submissionIdLabel | Submission ID | Esituse ID | ID заявки |
| storyHandoff.success.statusLabel | Status | Olek | Статус |
| storyHandoff.success.statusUnderReview | Under Review | Läbivaatamisel | На рассмотрении |
| storyHandoff.success.submitAnother | Submit Another | Esita veel üks | Отправить ещё |
| storyHandoff.expired.title | This Draft Is No Longer Available | See mustand pole enam saadaval | Этот черновик больше недоступен |
| storyHandoff.expired.message | Your story draft expired or was already submitted. | Su loo mustand aegus või on juba esitatud. | Черновик вашей истории истёк или уже отправлен. |
| storyHandoff.expired.createNew | Create A New Story | Loo uus lugu | Создать новую историю |
| storyHandoff.serviceDown.title | Submission Temporarily Unavailable | Esitamine on ajutiselt kättesaamatu | Отправка временно недоступна |
| storyHandoff.serviceDown.message | We couldn't reach the submission service. Please try again in a moment. | Me ei saanud esitusteenusega ühendust. Palun proovi hetke pärast uuesti. | Не удалось связаться с сервисом отправки. Повторите через мгновение. |
| storyHandoff.serviceDown.tryAgain | Try Again | Proovi uuesti | Повторить |
| storyHandoff.empty.title | Start Your Story In DOGEstonia GPT | Alusta oma lugu DOGEstonia GPT-s | Начните историю в DOGEstonia GPT |
| storyHandoff.empty.message | Stories are created in DOGEstonia GPT, then submitted here. | Lood luuakse DOGEstonia GPT-s ja esitatakse siin. | Истории создаются в DOGEstonia GPT, а затем отправляются здесь. |
| storyHandoff.empty.openGpt | Open DOGEstonia GPT | Ava DOGEstonia GPT | Открыть DOGEstonia GPT |

### Reuse (существующие ключи — НЕ дублировать, SSOT)
| Элемент M128 | Существующий ключ | Значение (en) | Примечание |
|--------------|-------------------|---------------|------------|
| Context chip «Story Draft» | `gptBridge.draft.label` (ID-08) | Story Draft | ✅ есть в et/ru/en |
| Chip «Saved» | `gptBridge.draft.statusSaved` | Status: Saved | ⚠️ формат «Status: Saved» vs M128 «· Saved» — при разводке решить префикс |
| Chip «Ready» | `gptBridge.draft.statusReady` | Status: Ready | как выше |
| Chip «Preserved» | `gptBridge.resolving.draftPreserved` | Story Draft: Preserved | ✅ |
| Chip «Source: DOGEstonia GPT» | `gptBridge.draft.sourceGpt` | **Source: Custom GPT** | ⚠️ значение «Custom GPT» ≠ M128 «DOGEstonia GPT» — привести `sourceGpt` к «DOGEstonia GPT» (бренд; заодно чинит ID-08) |
| CTA «Sign In» | `auth.signIn.title` / `auth.*` | Sign In | ✅ (ID-01) |
| CTA «Create Account» | `auth.*.createAccount` | Create Account | ✅ (ID-01) |
| Экраны OTP / verify-внутренности | `phone.*` (ID-04) + `gptBridge.*` disclosure | — | reuse M32-флоу, не перерисовывать |

> **Важно (не reuse):** `gptBridge.success.*` (**«Verified civic participant / Return to ChatGPT»**) — это OAuth-мост M120; **не** переиспользовать для State F. У M128 сабмит терминален в SPA, поэтому success — **новые** `storyHandoff.success.*` (без «Return to ChatGPT»). Аналогично `gptBridge.resolving.*` / `gptBridge.login.message` — про verification-контекст, а не submit; отсюда новые `storyHandoff.resolving.*` / `.login.message`.
>
> **Бренд:** «DOGEstonia GPT» — имя продукта, не переводится; в et контекст `-s`/`-st` даёт склонение носителя («DOGEstonia GPT-s»). Submission ID и бейдж языка (`ET`/`RU`/`EN`) — динамические, не в словаре.
>
> **Гварды:** запрещённые термины ([forbiddenVerificationTerms](../../../../../src/i18n/forbiddenVerificationTerms.js)) — ни в одном языке; parity et/ru/en через `findMissingIdentityDictionaryKeys`.

## Риски / cross-system
- **⚠️ R1 (D12-6, HIGH):** переименование `/story/compose`→`/story/submit` — это **контракт с GPT**: GPT/gateway строят inbound-redirect на старый путь. До обновления на стороне GPT handoff **сломается**. **Требуется координация** (обновить redirect-target в GPT-конфиге/gateway) + временный redirect старого пути на период cutover (T06). Зафиксировать в mvp-integration-plan.
- **R2 (GAP-DTO):** payload — opaque Mapping; поля предпросмотра формально не заморожены (T02 — защитный рендер + согласование).
- **R3:** возврат после `/login` в HashRouter — вложенный query хрупок; несём `draft_id` через sessionStorage (T05), `?next=` как читаемый fallback.

## Acceptance Criteria
- [ ] `?draft_id` → `GET /story-drafts/{id}` под Bearer → полный original-language предпросмотр (реальный вызов, не mock); 401→login-redirect (draft сохранён); 404→«истёк»; нет draft_id→empty-state «создать в GPT».
- [ ] Предпросмотр доступен **до** phone-verify (read active-only); контент только на preview, не на verify.
- [ ] Подтверждение → `POST /story-drafts/{id}/submit`: 202→успех (submission_id, «на модерации»); 403→verify→**авто-ресабмит**; 401→login-redirect; 503→ретрай; 404→«истёк».
- [ ] Браузер **не** вызывает `POST /story-drafts`.
- [ ] M-7 закрыт: нет вызовов с неверным auth/несуществующими путями.
- [ ] Локальный редактор удалён; «создать историю» ведёт на `VITE_STORY_GPT_URL`.
- [ ] Роут `/story/submit` (rename применён во всех швах); временный redirect старого пути на cutover.
- [ ] Все строки chrome локализованы (et/ru/en); контент истории — на языке оригинала; нет хардкод-английского.

## Швы
- [`StoryComposePage.jsx`→`StorySubmitPage.jsx`](../../../../../src/pages/StoryComposePage.jsx), [`storyDraftService.js`](../../../../../src/services/storyDraftService.js), [`sessionRoutePolicy.js`](../../../../../src/router/sessionRoutePolicy.js), [`identityDictionary.js`](../../../../../src/i18n/identityDictionary.js), StoryGate-панели, router/shell (кнопка «создать историю»).
- **Иконки:** файлы → `public/icons/story-handoff/` (имена из [icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md)); в коде — URL `/icons/story-handoff/ic-*.png` (Scope §I).