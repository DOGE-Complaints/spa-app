# UX-промпт — артборд для STORY-SPA-ID-14 (Post-submit · M135 State F)

> Промпт для генерации **focused** state-sheet артборда + markdown-спека. Скопируй блок ```prompt``` в UX-диалог (как для M120 / M128).  
> Источник: [STORY-SPA-ID-14](STORY-SPA-ID-14-post-submit-path-choice.md) · канон State F: [M128](../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md).  
> Former: BUG-03 UX prompt (moved from bugs/).
>
> **Status:** artboard **landed** → **M135** [spec](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png). Prompt retained for provenance.

---

```prompt
Сгенерируй ОДИН focused state-sheet артборд + markdown-спек (формат docs/UX/mockups/epic-04/mockup-NNN-*-spec.md, стиль epic-04 / M128) для DOGEstonia web:

НАЗВАНИЕ: «Story Submit — Post-Submit Path Choice (State F)»  
Номер Mockup: предложи следующий свободный в epic-04 (после M128; не конфликтуй с home M129–M133 / buttons M134 — если занято, бери следующий свободный, напр. M135+).

КОНТЕКСТ (продуктовый lock ID-14 / former BUG-03):
После успешного Submit (HTTP 202 + submission_id) пользователь ОСТАЁТСЯ на /story/submit и видит терминальный success (M128 State F). Он САМ выбирает путь:
1) Go To Board → /board
2) My Stories → /profile
3) Submit Another → DOGEstonia GPT (VITE_STORY_GPT_URL)
Запрещено: auto-navigate на /profile с location.state.submittedStoryId как «успех». Profile banner / consume navigate-state — ВНЕ SCOPE.

Связь с M128:
- State F в M128 — визуальный и copy канон (Title / Message / Submission ID + copy / Status «Under review» / три CTA).
- Этот артборд = focused SSOT для ID-14 implementation + gate screenshots; можно показать 2–3 состояния вокруг F, не весь A–H journey.
- Не redesign States A–E, G, H, E0; при необходимости стрелкой сослаться: «← from M128 State E Submitting / 202».

ВИЗУАЛЬНЫЙ ЯЗЫК (строго как epic-04 / M128):
- dark civic-tech; charcoal surfaces; soft glass panels; thin borders; white type; muted secondary
- DOGEstonia yellow только на primary CTA
- Avoid: confetti, toast-only success, marketing hero, neon, crypto, mascots, forced redirect annotation as happy path

АРТБОРД — обязательные панели/states:

State F — Submitted (PRIMARY, полный UI)
- Icon: success check (green circle / existing handoff success icon language)
- Title: «Story Submitted»
- Message: «Your civic story is now under review.»
- Metadata block:
  - Submission ID (example SUB-847291) + copy affordance
  - Status pill/label: «Under review»
- CTAs (честный выбор пути — все видимы, без автоперехода):
  - Primary (yellow): «Go To Board»
  - Secondary: «My Stories»
  - Tertiary / link-style: «Submit Another» → DOGEstonia GPT
- Annotation on artboard: «No auto-redirect. User chooses.»

State F-narrow (optional but preferred)
- Same content; stacked full-width CTAs; readable on ~390 width.

State E→F transition callout (small)
- From «Submitting…» / HTTP 202 → State F (stay on /story/submit).
- Explicit anti-pattern callout: «Do NOT navigate to /profile with submittedStoryId as success default.»

Side panels (компактно):
- Route: /story/submit (remain after 202)
- API: POST /story-drafts/{draft_id}/submit → 202 + submission_id
- Destinations: /board · /profile · GPT URL
- Privacy: show submission id + under-review ok; never tokens/OTP/raw phone
- Traceability: STORY-SPA-ID-14 · former BUG-03 · supersedes live navigate-to-profile success path · related M128 State F · ID-12 D12-8
- Out of scope: profile consume of history state; BUG-01 P0; OTP (M32); full handoff re-spec

COPY (EN canon; chrome later en/et/ru via storyHandoff.success.* / storyHandoff.cta.*):
- Title / message / submissionIdLabel / statusLabel / statusUnderReview / goToBoard / myStories / submitAnother — align with M128 State F and existing i18n keys where they already match.

DESIGN GOAL (5 секунд):
Submit succeeded → calm «under review» receipt with id → user picks Board, My Stories, or another GPT story. No silent teleport to profile.

OUTPUT:
1) PNG state-sheet artboard
2) markdown spec with Purpose · Product Context · States · CTA destinations · Anti-patterns · Traceability · Design Goal
3) Filenames: mockup-NNN-story-submit-post-submit-path-choice-*-spec.md + .png under docs/UX/mockups/epic-04/ (or agreed folder)
```

---

**После генерации:** ✅ **Done** — M135 [spec](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png) linked from [STORY-SPA-ID-14](STORY-SPA-ID-14-post-submit-path-choice.md). Next: missing icons → PA.3 / P1.3.
