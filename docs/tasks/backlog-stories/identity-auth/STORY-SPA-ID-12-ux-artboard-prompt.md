# UX-промпт — артборд для STORY-SPA-ID-12 (Story Draft Handoff & Submit)

> Промпт для генерации артборда + спека в дизайн-системе DOGEstonia. Скопируй блок ```prompt``` ниже в свой UX-диалог (тот, что уже делал M120 и др.).
> Источник: [STORY-SPA-ID-12](STORY-SPA-ID-12-story-draft-handoff-submit.md); стиль-эталон [M120](../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md); OTP-внутренности — [M32](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md).
>
> **Важно (модель):** это НЕ M120. M120 = OAuth-мост «верифицируйся на вебе → вернись в GPT → GPT сабмитит». Здесь модель **«браузер сабмитит»**: GPT только застешил историю и прислал `draft_id`; браузер показывает предпросмотр и **сам отправляет** под сессией. Возврата в GPT для сабмита нет — успех терминален в SPA.

---

```prompt
Сгенерируй ОДИН state-sheet артборд + markdown-спек (формат docs/UX/mockups/epic-04/mockup-NNN-*-spec.md, как M120) для потока «Story Draft Handoff & Submit» в DOGEstonia web.

НАЗВАНИЕ: «Story Draft Handoff & Submit — State Sheet» (предложи следующий свободный номер Mockup в epic-04).

КОНТЕКСТ (модель «браузер сабмитит»):
Пользователь собрал гражданскую историю в Custom GPT. GPT сохранил её в gateway и прислал юзера на DOGEstonia web со ссылкой /story/submit?draft_id=<id>. Браузер: проверяет сессию → показывает ПРЕДПРОСМОТР черновика → по подтверждению САМ отправляет историю под Supabase-сессией. Если телефон не подтверждён — короткая верификация прямо здесь, затем автоматический повтор отправки. Успех терминален в SPA (в GPT возвращаться НЕ нужно). Это НЕ generic-логин и НЕ M120-мост.

ВИЗУАЛЬНЫЙ ЯЗЫК (строго как в epic-04 / M120):
- dark civic-tech operating system aesthetic; black / charcoal surfaces; subtle textured background
- soft glassmorphism panels; thin borders; white typography; muted gray secondary text
- DOGEstonia yellow accent; enterprise SaaS; Linear / GitHub / Jira clarity
- Avoid: marketing hero, consumer onboarding wizard, social login funnel, crypto/wallet/token, confetti, mascots, bright gradients, neon

АРТБОРД: full journey state-sheet, один runtime-стейт активен; слева-направо со стрелками переходов; справа — компактные side-панели (Routing/Flow, Error states, Privacy, Route&API, Principles).

СОСТОЯНИЯ (8 основных + empty):

State A — Resolving / Checking Session
- Title: «Preparing Your Story». Message: «Loading your story draft from DOGEstonia GPT.» Calm progress (без тяжёлого спиннера).
- Context chip: «Story Draft · Preserved · Source: DOGEstonia GPT».

State B — Login Required (draft preserved)
- Title: «Sign In To Continue». Message: «Your story draft is saved. Sign in to preview and submit it.»
- Primary CTA «Sign In» (ведёт на /login, возврат назад в поток). Secondary «Create Account».
- Persistent context chip: «Story Draft · Saved».
- Заметка на артборде: реализация — redirect на /login с возвратом (draft_id сохранён).

State C — Draft Preview (ГЛАВНЫЙ экран)
- Title: «Review Your Story». Message: «Check your story before submitting. This is what you built in DOGEstonia GPT.»
- ПОЛНЫЙ структурированный предпросмотр (read-only), поля:
  Title · Summary · Description (тело) · Category (chip) + Labels (chips) · Institution · Location.
- Язык: показываем на ЯЗЫКЕ ОРИГИНАЛА (как юзер писал в GPT) + маленький бейдж языка (напр. «ET»). Контент НЕ переводится; переводятся только лейблы/кнопки интерфейса.
- Primary CTA «Submit Story» (yellow). Secondary «Not now» / «Back to board».
- Тонкая подсказка: «You'll confirm your phone once before your first submission.» (т.к. phone-гейт всплывёт на submit, не здесь).

State D — Verification Required (interposed, перед submit)
- Title: «One Step Before Submitting». Message: «Verify your phone to submit civic stories. This keeps DOGEstonia free of bots.»
- Здесь ВЫЗЫВАЕТСЯ phone-verify (OTP) — НЕ перерисовывать OTP-внутренности, показать компактный блок и стрелкой сослаться: «→ Phone verification (see M32)».
- ВАЖНО приватность: на этом экране контент истории СКРЫТ (это auth-экран). Только «Story Draft · Ready» chip.
- После успешной верификации — АВТОМАТИЧЕСКИЙ повтор отправки (показать стрелкой A/D→E).

State E — Submitting
- Title: «Submitting Your Story». Calm progress. Chip «Story Draft · Ready».

State F — Submitted (успех, терминальный)
- Title: «Story Submitted». Message: «Your civic story is now under review.»
- Показать: Submission ID (non-sensitive reference) + Status «Under review».
- Primary CTA «Go To Board». Secondary «My Stories». Tertiary «Submit another» (→ ведёт в DOGEstonia GPT).
- НЕ «Return to ChatGPT» как главный CTA (сабмит уже сделан; это отличие от M120).

State G — Draft Expired / Already Submitted
- Title: «This Draft Is No Longer Available». Message: «Your story draft expired or was already submitted.» (черновик одноразовый — удаляется на сабмите; повтор → 404).
- Primary CTA «Create A New Story» (→ DOGEstonia GPT). Secondary «Go To Board».

State H — Service Unavailable
- Title: «Submission Temporarily Unavailable». Message: «We couldn't reach the submission service. Please try again in a moment.»
- Primary CTA «Try Again». Secondary «Back to board». (соответствует 503.)

State E0 — Empty (нет draft_id)
- Когда на /story/submit пришли без draft_id. Title: «Start Your Story In DOGEstonia GPT». Message: «Stories are created in DOGEstonia GPT, then submitted here.»
- Primary CTA «Open DOGEstonia GPT» (→ VITE_STORY_GPT_URL).

ERROR SIDE-PANEL (компактный, не отдельные экраны) — маппинг кодов gateway:
- 401 AUTHENTICATION_REQUIRED / session_expired → Sign in (redirect /login, draft preserved)
- 403 verification_required → interposed phone verify (State D) → auto-resubmit
- 404 draft_not_found / expired / already_submitted → State G
- 503 PROVIDER/SERVICE_UNAVAILABLE → State H (retry)
- network_error → retry
(верификационные под-ошибки OTP — см. M32/M37, не дублировать.)

ROUTE & API SIDE-PANEL:
- Route: /story/submit?draft_id=<id>  (переименован из /story/compose; GPT inbound-redirect должен указывать на него)
- Gateway API (Bearer <supabase_access_token>):
  GET  /story-drafts/{draft_id}          → 200 preview (active-only, БЕЗ phone-гейта) / 401 / 404
  POST /story-drafts/{draft_id}/submit   → 202 (submission_id) / 403 verification_required(+verify_url) / 401 / 404 / 503
- НЕ вызывать POST /story-drafts из браузера (это сервисный роут GPT).

PRIVACY SIDE-PANEL (M120 §8):
Never show: passwords, tokens, OTP after submit, raw phone after verify.
Show only: story draft content on the PREVIEW screen (review); on verify/auth screens — draft status only, no content. Submission ID + «under review» ok.

PRINCIPLES SIDE-PANEL:
Story built in GPT · Draft always preserved · Review before submit · Verify once, then auto-submit · Browser submits (no return-to-GPT) · Original language preserved.

FLOW MAPPING (показать):
enter(draft_id) → A Resolving
  401 → B Login → (после логина) → A
  no draft_id → E0 Empty
  404 → G Expired
  200 → C Preview
C submit → 202 → F Submitted | 403 → D Verify → auto-resubmit | 401 → B | 404 → G | 503 → H

ЛОКАЛИЗАЦИЯ: chrome (лейблы/кнопки/сообщения) переключаем en/et/ru (namespace storyHandoff.*; verify/return — reuse gptBridge.*). Контент истории НЕ переводится (язык оригинала + бейдж).

В СПЕКЕ ОБЯЗАТЕЛЬНО: 1) Purpose; 2) Product Context (модель «браузер сабмитит», отличие от M120); 3) Artboard type (state sheet); 4) Visual style; 5) States A–H + E0 (Title/Message/Fields/CTAs/Context/Requirements); 6) Error side-panel (маппинг кодов); 7) Route&API panel; 8) Privacy rules; 9) Principles; 10) Flow mapping; 11) Traceability (STORY-SPA-ID-12; related M120/M32/M37/M80); 12) Design Goal.

DESIGN GOAL (за 5 секунд понятно): GPT подготовил историю → DOGEstonia сохранил черновик → юзер логинится при необходимости → предпросматривает свою историю → подтверждает → при первом сабмите один раз верифицирует телефон → браузер отправляет → «на модерации». Никакого возврата в GPT для сабмита.

НЕ В SCOPE артборда: перерисовка OTP-экранов (ссылка на M32); локальный редактор истории (удалён из продукта); OAuth-мост M120.
```

---

**После генерации:** положи `mockup-NNN-story-draft-handoff-submit-*-spec.md` + `.png` в `docs/UX/mockups/epic-04/`, впиши ссылку в [STORY-SPA-ID-12](STORY-SPA-ID-12-story-draft-handoff-submit.md) (Meta «Мокап» + раздел текстов) и синхронизируй лейблы `storyHandoff.*` со спеком (мокап — приоритет), как делали для ID-10/11.
