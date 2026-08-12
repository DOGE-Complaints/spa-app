# STORY-SPA-ID-06 — Protected Action Gate (web lazy-gate)

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-06-protected-action-gate`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · **Волна 3 (Protected action)**
- **Status:** Done
- **Wave:** `pkg-000021` (closed 2026-06-29)
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md)
- **Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md); [mockup-122-story-compose-verification-gate-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md); [identity-gateway-integration-notes-2026-06-23.md](../../../../../../analysis/identity-gateway-integration-notes-2026-06-23.md); [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md)
- **Источник:** [epic-04 S04-5](../../../../../../backlog-stories/inbound/epic-04.md), [identity-frontend FR-FE-003/005/010 / S3](../../../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ (gateway `POST /story-drafts`, `…/{id}/submit`; гейт читается из identity `/me`)
- **ui_scope:** `visual` (M122 anchor — T03)

## Артборд (SSOT дизайна)
- Спек: [mockup-122-story-compose-verification-gate-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md)
- PNG: [mockup-122-story-compose-verification-gate-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.png)
- Состояния: A Compose · B Verification Required Gate · C Draft Saved · D Verification Complete / Resume · E Submission Success.

## Зачем простыми словами
Веб-сценарий «ленивого гейта»: пользователь свободно пишет story, а верификацию просим **только в момент** Submit. Перед верификацией **сохраняем draft**, после — **резюмируем ту же story**. Данные не теряются; это не «access denied», а временный trust-checkpoint.

## Функциональные требования (FR)
- **FR-06.1** Compose: свободное редактирование story (title/summary/content), без verify-промпта; Submit / Save Draft / Discard.
- **FR-06.2** На Submit фронт проверяет `GET /me.phone_verified`. Если `false` → gate-панель «Verification Required» (Verify & continue / Save draft / Cancel).
- **FR-06.3** Перед верификацией — **сохранить draft** (`POST /story-drafts` → `draft_id`), состояние «Draft Saved» (показать draft_id, last-saved); явный сигнал «ничего не потеряно».
- **FR-06.4** Верификация — переиспользовать flow [ID-04](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) (не рисовать заново).
- **FR-06.5** После success — `GET /me` refresh, **resume(draft_id)** → состояние «Verification Complete / Ready», затем `POST /story-drafts/{id}/submit`.
- **FR-06.6** Submission Success — submission_id, статус «Under Review».
- **FR-06.7** **Backend — source of truth:** даже при локальном `/me=true` обрабатывать `verification_required` на submit (открыть gate, сохранить draft, резюмировать).
- **FR-06.8** Privacy: не показывать номер/OTP/токены; draft-id/status — можно.
- **FR-06.9** **Локализация (L10N) — сразу:** все строки через `useI18n()`/`t('key')`, интерполяция через `formatI18nMessage`; identity-ключи добавлять в [`identityDictionary.js`](../../../../../../src/i18n/identityDictionary.js) (`IDENTITY_DICTIONARY_{EN,ET,RU}`) **+ зарегистрировать в `IDENTITY_FLAT_KEYS`**, на **et/ru/en**; без английских литералов в JSX/const. Пошагово и гварды — [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); запрещённые термины отсутствуют во всех языках.

## Routes / API
- Route: `/story/compose` (+ future `/story-drafts/:id`). API: `GET /me`; gateway `POST /story-drafts`, `POST /story-drafts/{draft_id}/submit`; phone APIs через ID-04.

## API-интеграция (doge-identity-service)
> База: Bearer Supabase JWT; envelope `{"data"}`/`{"error":{"code","message","trace_id"}}`.

**Identity (только гейт-решение):**
- **`GET /me`** (Bearer) — на нажатие Submit прочитать `data.phone_verified`. `false` → открыть gate-панель и запустить verify (reuse ID-04: `POST /auth/phone/request` → `/auth/phone/confirm`); `true` → к submit.
- После успешного verify — `GET /me` refresh (phone_verified=true) → resume.

**Gateway (story-drafts/submit) — НЕ identity:**
- `POST /story-drafts`, `POST /story-drafts/{id}/submit`, ответ `verification_required` — это **`doge-complaints-gateway`**. Точные контракты, формат `verification_required`, и **как gateway узнаёт `phone_verified`** (introspection vs прямой `/me`) вынесены в → [`identity-gateway-integration-notes-2026-06-23.md`](../../../../../../analysis/identity-gateway-integration-notes-2026-06-23.md) (передать команде gateway).
- Принцип (для UI): даже при локальном `/me.phone_verified=true` gateway может вернуть `verification_required` на submit → открыть gate, сохранить draft, резюмировать (FR-06.7).

## Зависимости
- Зависит от [ID-04](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) (verify) и [ID-03](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md) (статус). Draft-механика — у gateway (контракт story-drafts вне identity). GPT-вариант того же паттерна — [ID-08](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md).

## Вне scope
- Полный story-composer/редактор (отдельный story-workspace мокап M110, вне identity-слоя). GPT-ветка (ID-08).

## Тексты и переводы (en / et / ru)
> SSOT строк (из артборда M122). Локализация — по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи в [`identityDictionary.js`](../../../../../../src/i18n/identityDictionary.js) (`IDENTITY_DICTIONARY_{EN,ET,RU}`) **+ `IDENTITY_FLAT_KEYS`**; интерполяция `{…}` через `formatI18nMessage`. Verify-flow строки переиспользуются из ID-04/05 (не дублировать).

### `storyGate.*`
| key | en | et | ru |
|-----|----|----|----|
| storyGate.compose.title | Story Submission | Loo esita | Подача истории |
| storyGate.compose.editorTitle | Story | Lugu | История |
| storyGate.compose.field.title | Title | Pealkiri | Заголовок |
| storyGate.compose.field.summary | Summary | Kokkuvõte | Краткое описание |
| storyGate.compose.field.content | Story Content | Loo sisu | Содержание истории |
| storyGate.compose.status.draftSaved | Draft Saved | Mustand salvestatud | Черновик сохранён |
| storyGate.compose.action.submit | Submit Story | Esita lugu | Отправить историю |
| storyGate.compose.action.saveDraft | Save Draft | Salvesta mustand | Сохранить черновик |
| storyGate.compose.action.discard | Discard Draft | Loobu mustandist | Удалить черновик |
| storyGate.required.title | Verification Required | Kinnitamine on vajalik | Требуется подтверждение |
| storyGate.required.message | Before submitting, verify that this account belongs to a real person. This protects DOGEstonia from bots and duplicate civic influence. | Enne esitamist kinnita, et see konto kuulub päris inimesele. See kaitseb DOGEstoniat botide ja topelt-kodanikumõju eest. | Перед отправкой подтвердите, что этот аккаунт принадлежит реальному человеку. Это защищает DOGEstonia от ботов и дублирующего гражданского влияния. |
| storyGate.required.draftLabel | Story Draft | Loo mustand | Черновик истории |
| storyGate.required.statusWaiting | Status: Waiting For Verification | Olek: ootab kinnitamist | Статус: ожидает подтверждения |
| storyGate.required.verifyContinue | Verify & Continue | Kinnita ja jätka | Подтвердить и продолжить |
| storyGate.required.saveDraft | Save Draft | Salvesta mustand | Сохранить черновик |
| storyGate.required.cancel | Cancel | Tühista | Отмена |
| storyGate.draftSaved.title | Draft Saved | Mustand salvestatud | Черновик сохранён |
| storyGate.draftSaved.message | Your story has been safely saved before verification. | Sinu lugu salvestati turvaliselt enne kinnitamist. | Ваша история надёжно сохранена перед подтверждением. |
| storyGate.draftSaved.idLabel | Draft ID | Mustandi ID | ID черновика |
| storyGate.draftSaved.lastSaved | Last Saved | Viimati salvestatud | Последнее сохранение |
| storyGate.draftSaved.continueVerification | Continue Verification | Jätka kinnitamist | Продолжить подтверждение |
| storyGate.draftSaved.returnToStory | Return To Story | Tagasi loo juurde | Вернуться к истории |
| storyGate.complete.title | Verification Complete | Kinnitamine lõpetatud | Подтверждение завершено |
| storyGate.complete.message | Your account is verified. You can now submit the saved story. | Sinu konto on kinnitatud. Nüüd saad salvestatud loo esitada. | Ваш аккаунт подтверждён. Теперь можно отправить сохранённую историю. |
| storyGate.complete.statusReady | Draft Restored — Ready For Submission | Mustand taastatud — esitamiseks valmis | Черновик восстановлен — готов к отправке |
| storyGate.complete.submit | Submit Story | Esita lugu | Отправить историю |
| storyGate.complete.review | Review Story | Vaata lugu üle | Просмотреть историю |
| storyGate.success.title | Story Submitted | Lugu esitatud | История отправлена |
| storyGate.success.message | Your civic story has been received and entered into processing. | Sinu kodanikulugu on vastu võetud ja töötlemisse võetud. | Ваша гражданская история получена и принята в обработку. |
| storyGate.success.idLabel | Submission ID | Esituse ID | ID отправки |
| storyGate.success.statusUnderReview | Under Review | Läbivaatamisel | На рассмотрении |
| storyGate.success.viewActivity | View Activity | Vaata tegevust | Посмотреть активность |
| storyGate.success.submitAnother | Submit Another Story | Esita uus lugu | Отправить ещё историю |

---

## Acceptance Criteria (FR-уровень)
- [x] Compose доступен без верификации; gate срабатывает только на Submit при `phone_verified=false`.
- [x] Draft сохраняется ДО верификации; пользователю явно показано «не потеряно».
- [x] После success — resume того же draft и успешный submit.
- [x] `verification_required` от бэка на submit обрабатывается даже при локальном true.
- [x] Verify-flow переиспользован из ID-04 (не дублирован).
- [x] Все строки локализованы (et/ru/en) через `t()`; нет хардкод-английского (FR-06.9).

## Post-audit tasks

| Task | Status | Wave | Ref |
|------|--------|------|-----|
| [SPA-ID-06-T08](task-spa-id-06-t08-verify-continue-draft-saved-m122c/README.md) | Done | `run_mode=spa_id_06_audit_2026_06_29` | [audit F2](../../../../../../analysis/audit-STORY-SPA-ID-06-execution-2026-06-29.md) §3 F2 — M122 C на Verify & Continue (closed 2026-06-29) |
