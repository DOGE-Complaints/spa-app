# STORY-SPA-ID-14 — Post-submit path choice (M135 State F)

## Meta

- **Key:** `STORY-SPA-ID-14-post-submit-path-choice`
- **Epic:** [EPIC-SPA-04 Identity & Auth](README.md) · package [identity-auth/](INDEX.md)
- **Status:** ✅ Done — P3 gate PASS 2026-08-07T19:56:17Z · `pkg-000055` · **P7 WAVE COMPLETE** ([reaudit](../../../analysis/reaudit-STORY-SPA-ID-14-gap-closure-2026-08-07.md) · F1/F2 CLOSED · F3 WAIVED)
- **Severity:** 🟡 MED (polish after ID-12 Done + BUG-01 P0 submit green)
- **Former key:** `STORY-SPA-BUG-03-post-submit-story-feedback` (converted from bugs package)
- **Origin:** P5 WAIVED gap **F3** из [audit-STORY-SPA-BUG-01-execution-2026-08-07.md](../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md) — richer success **вне** BUG-01 P0 DoD; residual FE-HANDOFF-03 success path
- **Зависит от:** [ID-12](STORY-SPA-ID-12-story-draft-handoff-submit.md) Done · [BUG-01](../bugs/STORY-SPA-BUG-01-story-submission-unavailable.md) Done (submit 202)
- **Мокап (SSOT):** **M135** — [spec](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png)
- **Related design:** M128 State F — [spec](../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png)
- **UX prompt:** [STORY-SPA-ID-14-ux-artboard-prompt.md](STORY-SPA-ID-14-ux-artboard-prompt.md) (landed → M135)
- **Route:** `/#/story/submit` — remain after HTTP 202
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/STORY-SPA-ID-14-post-submit-path-choice.md) · T01–T09 · `pkg-000055`
- **decision_ref:** product lock 2026-08-07: State F; user chooses path · M135 SSOT

## Зачем простыми словами

Submit отдаёт **202** и `submission_id`. По **M135** пользователь видит терминальный экран **«Story Submitted»** и **сам** выбирает путь: Board · My Stories · Submit Another (GPT).

**As-of-Done (current):** после 202 live `submitDraft` делает `setSubmissionId` + `setPhase(SUBMITTED)` и остаётся на `/story/submit` — State F (`StoryHandoffSuccessPanel`) показывается **до** любого leave; leave только по CTA. Auto-`navigate('/profile', { submittedStoryId })` **снят** (P3 T02).

**Historical (pre-ID-14 / intake):** live path после 202 сразу делал `navigate('/profile', { state: { submittedStoryId } })` и обходил State F (панель была в основном через `devPhase`). Pin: [evidence T01](../../../analysis/evidence-STORY-SPA-ID-14-pin-live-success-navigate-vs-m135-2026-08-07.md).

**Итог:** publish (ID-12 + BUG-01) + честный terminal success / path choice по M135 — **Done** (P3). Post-audit F1/F2 **CLOSED** (P6/P7); F3 **WAIVED**.

## Артборд (SSOT дизайна)

| Мокап | Роль | Спека / PNG |
|-------|------|-------------|
| **M135** | **Primary** — post-submit path choice | [spec](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png) |
| **M128** | Related — full handoff journey; State F ancestor | [spec](../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) · [png](../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png) |
| UX prompt | Done → M135 | [STORY-SPA-ID-14-ux-artboard-prompt.md](STORY-SPA-ID-14-ux-artboard-prompt.md) |

## Product decision (locked 2026-08-07 · D03 = D14)

| # | Решение | Следствие |
|---|---------|-----------|
| **D14-1** (=D03-1) | Терминальный success = **M135 / M128 State F** на `/story/submit` | Не auto-navigate на profile после 202 |
| **D14-2** (=D03-2) | Пользователь **сам** выбирает путь | Primary «Go To Board» · Secondary «My Stories» → `/profile` · Tertiary «Submit Another» → `VITE_STORY_GPT_URL` |
| **D14-3** (=D03-3) | Reuse [`StoryHandoffSuccessPanel`](../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) | Live `submitDraft` → `setPhase(SUBMITTED)` + `setSubmissionId` |
| **D14-4** (=D03-4) | Profile consume `location.state.submittedStoryId` | **Вне scope** |
| **D14-5** (=D03-5) | BUG-01 остаётся Done | Не reopen P0 / gateway schema |
| **D14-6** (=D03-6) | Implementation SSOT = **M135** | Gate/screenshots vs M135 |

## Gap vs ID-12 Done (Expected vs Actual)

| | |
|--|--|
| **Expected (M135 / D12-8)** | Submit 202 → State F on `/story/submit`: receipt + three CTAs; leave only on click |
| **Actual (intake / Historical pre-ID-14)** | 202 → `navigate('/profile', { state: { submittedStoryId } })`; State F skipped |
| **As-of-Done (current)** | 202 → `setSubmissionId` + `setPhase(SUBMITTED)`; stay on `/story/submit`; **no** success default profile navigate · [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx) L115–124 · P3 T02 |

## Verified facts (code — не гипотезы)

| Fact | Evidence |
|------|----------|
| **Current** live success | After 202: `clearDraftId()` + `setSubmissionId` + `setPhase(SUBMITTED)`; **no** auto `navigate('/profile', { submittedStoryId })` · [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx) L115–124 |
| **Historical** pre-ID-14 | After 202: `clearDraftId()` + `navigate('/profile', { state: { submittedStoryId } })` — **нет** `setPhase(SUBMITTED)` · [pin evidence](../../../analysis/evidence-STORY-SPA-ID-14-pin-live-success-navigate-vs-m135-2026-08-07.md) |
| Success panel | [`StoryHandoffSuccessPanel`](../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) · testids `story-handoff-success`, `…-go-board`, `…-my-stories`, `…-submit-another` |
| Phase enum | [`storyHandoffFlowState.js`](../../../../src/auth/storyHandoffFlowState.js) `SUBMITTED` |
| Dev can show F | `devPhase === SUBMITTED` |
| Icons on disk + wired | `ic-go-to-board`, `ic-my-stories`, `ic-external-link` (P3 T03) |
| L10N gap keys | `copySubmissionId`, `copied`, `submitAnotherHint`, `noAutoRedirect` + `IDENTITY_FLAT_KEYS` (P3 T04) |

## Functional requirements

- **FR-ID-14.1** After Submit HTTP **202**, SPA shows **M135 State F** on `/story/submit` (phase `submitted` + `StoryHandoffSuccessPanel`) with `submission_id`.  
- **FR-ID-14.2** **No** automatic navigate away on success; leave only via user CTA (M135 §14).  
- **FR-ID-14.3** Path choice: Primary → `/board` · Secondary → `/profile` · Tertiary → `VITE_STORY_GPT_URL`.  
- **FR-ID-14.4** Calm one-shot success; draft cleared after 202.  
- **FR-ID-14.5** Missing/invalid submission id → no empty success flash.  
- **FR-ID-14.6** Vitest: live success path (not only `devPhase`); no secrets in evidence.  
- **FR-ID-14.7** Icons: reuse on-disk; generate + wire missing CTA leading icons; external trailing = reuse `ic-external-link`.  
- **FR-ID-14.L10N** Reuse existing keys; add M135 gap keys + `IDENTITY_FLAT_KEYS`.

## Acceptance Criteria

- [x] After Submit 202, `data-testid="story-handoff-success"` visible **before** any navigation.  
- [x] Submission ID + under-review status; copy control a11y-labeled.  
- [x] Three CTAs work; tertiary GPT hint / external affordance per M135.  
- [x] `submitDraft` does **not** `navigate('/profile', { state: { submittedStoryId } })` as success default.  
- [x] CTA leading icons on disk at fixed paths; wired (or placeholder-ok until T03 wire).  
- [x] New L10N keys en/et/ru + FLAT_KEYS.  
- [x] Gate / screenshots (desktop + narrow) vs **M135** when pipeline scaffolded.  
- [x] BUG-01 / ID-12 remain Done.

## Иконки / ассеты (CTA leading)

> Конвенции как [ID-12 icon catalog](STORY-SPA-ID-12-icon-assets.md). PNG via Lucide pipeline (`layout-grid` / `circle-user` → `scripts/icons/icon-manifest.yaml`).

| # | Смысл | Контекст (M135) | Файл | Путь (disk) | URL (runtime) | Status | Lucide |
|---|--------|-----------------|------|-------------|---------------|--------|--------|
| 1 | Board / grid | Leading · Primary «Go To Board» | `ic-go-to-board.png` | `spa-app/public/icons/story-handoff/ic-go-to-board.png` | `/icons/story-handoff/ic-go-to-board.png` | **ON DISK** | `layout-grid` · neutral `#f5f7fa` |
| 2 | My Stories / user | Leading · Secondary «My Stories» | `ic-my-stories.png` | `spa-app/public/icons/story-handoff/ic-my-stories.png` | `/icons/story-handoff/ic-my-stories.png` | **ON DISK** | `circle-user` · neutral `#f5f7fa` |

### Reuse (не генерировать)

| Смысл | Файл | URL | Note |
|-------|------|-----|------|
| Success check | `ic-success-check.png` | `/icons/story-handoff/ic-success-check.png` | ON DISK |
| Copy | `ic-copy.png` | `/icons/story-handoff/ic-copy.png` | ON DISK |
| Spinner | `ic-spinner.png` | `/icons/story-handoff/ic-spinner.png` | ON DISK · E→F only |
| External link | `ic-external-link.png` | `/icons/public-home/ic-external-link.png` | ON DISK · Submit Another |

Folk border на M135 — не product asset.

## Тексты и переводы (en / et / ru)

> [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js) + `IDENTITY_FLAT_KEYS`. EN = **M135**.

### Reuse (уже в dictionary)

| key | en | et | ru | Status |
|-----|----|----|----|--------|
| `storyHandoff.success.title` | Story Submitted | Lugu esitatud | История отправлена | exists |
| `storyHandoff.success.message` | Your civic story is now under review. | Su kodanikulugu on nüüd läbivaatamisel. | Ваша гражданская история теперь на рассмотрении. | exists |
| `storyHandoff.success.submissionIdLabel` | Submission ID | Esituse ID | ID заявки | exists |
| `storyHandoff.success.statusLabel` | Status | Olek | Статус | exists |
| `storyHandoff.success.statusUnderReview` | Under Review | Läbivaatamisel | На рассмотрении | exists |
| `storyHandoff.success.submitAnother` | Submit Another | Esita veel üks | Отправить ещё | exists |
| `storyHandoff.cta.goToBoard` | Go To Board | Ava tahvel | На доску | exists |
| `storyHandoff.cta.myStories` | My Stories | Minu lood | Мои истории | exists |

### New / gap vs M135 (T04)

| key | en (M135) | et | ru | Note |
|-----|-----------|----|----|------|
| `storyHandoff.success.copySubmissionId` | Copy submission ID | Kopeeri esituse ID | Копировать ID заявки | a11y |
| `storyHandoff.success.copied` | Copied | Kopeeritud | Скопировано | ack |
| `storyHandoff.success.submitAnotherHint` | Opens DOGEstonia GPT | Avab DOGEstonia GPT | Открывает DOGEstonia GPT | tertiary hint |
| `storyHandoff.success.noAutoRedirect` | No auto-redirect. User chooses. | Automaatset suunamist pole. Valiku teeb kasutaja. | Без автоперехода. Выбор за пользователем. | M135 §14 |

## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-ID-14-post-submit-path-choice`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/STORY-SPA-ID-14-post-submit-path-choice.md)
- **Epic:** [`EPIC-SPA-04`](../../epics/EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md)
- **Package:** [`pkg-000055`](../../spa-active-packages/pkg-000055-20260807-epic-spa-04-id-14-post-submit-path.yaml)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-id-14-t01-pin-live-success-navigate-vs-m135`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t01-pin-live-success-navigate-vs-m135/README.md) | Done · P3 · **P4 verified** |
| T02 | [`task-spa-id-14-t02-wire-submitted-phase-no-auto-navigate`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t02-wire-submitted-phase-no-auto-navigate/README.md) | Done · P3 · **P4 verified** |
| T03 | [`task-spa-id-14-t03-wire-success-cta-icons`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t03-wire-success-cta-icons/README.md) | Done · P3 · **P4 verified** |
| T04 | [`task-spa-id-14-t04-l10n-m135-gap-keys`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t04-l10n-m135-gap-keys/README.md) | Done · P3 · **P4 verified** |
| T05 | [`task-spa-id-14-t05-panel-parity-m135`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t05-panel-parity-m135/README.md) | Done · P3 · ui_anchor · **P4 verified** (F2 Low) |
| T06 | [`task-spa-id-14-t06-vitest-live-success-path`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t06-vitest-live-success-path/README.md) | Done · P3 · **P4 verified** |
| T07 | [`task-spa-id-14-t07-story-gate-id-14`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t07-story-gate-id-14/README.md) | Done · P3 · **P4** |
| T08 | [`task-spa-id-14-t08-as-of-done-backlog-ssot`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t08-as-of-done-backlog-ssot/README.md) | Done · P6 · **P7 CLOSED F1** |
| T09 | [`task-spa-id-14-t09-desktop-cta-horizontal-m135`](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t09-desktop-cta-horizontal-m135/README.md) | Done · P6 · **P7 CLOSED F2** |

> **P3 Done** 2026-08-07T19:56:17Z · gate PASS. **P4 Ready-with-blockers** 2026-08-07T20:13:45Z. **P5 scaffold** 2026-08-07T20:22:51Z. **P6 CLOSED** 2026-08-07T20:28:21Z. **P7 WAVE COMPLETE** 2026-08-07T20:32:50Z — [reaudit](../../../analysis/reaudit-STORY-SPA-ID-14-gap-closure-2026-08-07.md) · `run_mode` retired.

## Вне scope

- Reopening BUG-01 P0 / gateway schema  
- Profile consume `submittedStoryId`  
- Full handoff rewrite (A–E, G, H)  
- OTP (M32)  
- Regenerating M128  

## Швы

[`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx) · [`StoryHandoffPanels.jsx`](../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) · [`storyHandoffFlowState.js`](../../../../src/auth/storyHandoffFlowState.js) · `storyHandoff.success.*` / `cta.*` · **M135** · M128 · ID-12 · `public/icons/story-handoff/`

## Next (process)

1. ~~P1.3 pipeline + pkg~~ → Ready.  
2. ~~P2 build window → P3 Path A (`@mockup` M135)~~ → **Done** 2026-08-07T19:56:17Z.  
3. ~~P4 audit~~ → Ready-with-blockers 2026-08-07T20:13:45Z.  
4. ~~P5 scaffold~~ → T08/T09 · `run_mode=spa_id_14_audit_2026_08_07`.  
5. ~~P6~~ → T08/T09 Done 2026-08-07T20:28:21Z · F1/F2 CLOSED · F3 WAIVED.  
6. ~~P7~~ → **WAVE COMPLETE** 2026-08-07T20:32:50Z · `run_mode` retired.  
7. Commits — только по явной команде.  
8. Next backlog / new pkg (YAML default).

## Notes

- Converted from bugs package former key `STORY-SPA-BUG-03-post-submit-story-feedback` (stub remains under bugs/).  
- Wave context: EPIC-SPA-11 UAT residual; home package = EPIC-SPA-04 identity-auth.
