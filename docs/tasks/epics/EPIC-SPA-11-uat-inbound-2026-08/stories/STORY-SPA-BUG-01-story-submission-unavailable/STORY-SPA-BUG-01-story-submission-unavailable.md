# STORY-SPA-BUG-01-story-submission-unavailable — Story submission unavailable (P0 / FE-HANDOFF-03)

## Meta (pipeline)

- **Key:** `STORY-SPA-BUG-01-story-submission-unavailable`
- **Parent Epic:** [`../../EPIC-SPA-11-uat-inbound-2026-08.md`](../../EPIC-SPA-11-uat-inbound-2026-08.md)
- **Epic:** EPIC-SPA-11 UAT inbound 2026-08 · **Wave:** Demo blocker · **Order:** 1
- **Пакет:** `bugs/` · active `pkg-000053-20260806-epic-spa-11-bug-01-story-submission.yaml`
- **Status:** Done — P3 gate PASS 2026-08-07T10:51:56Z · `pkg-000053` · **P7 WAVE COMPLETE** ([reaudit](../../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md))
- **Severity:** **P0** — demo / value-loop blocker
- **UAT ID:** FE-HANDOFF-03
- **source:** [`../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md)
- **decision_ref:** UAT inbound 2026-08-06 · [`../../../../backlog-stories/inbound/DOGEstonia-Bug-P0-Story-Submission-Unavailable.md`](../../../../backlog-stories/inbound/DOGEstonia-Bug-P0-Story-Submission-Unavailable.md)
- **Related Done:** [ID-12](../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md)
- **ui_scope:** `none` (diagnose/fix; no artboard)
- **Scaffolded:** 2026-08-06T19:21:54Z (P1.3 deepen) · tech decomp prior 2026-08-06
- **Hard rule:** **T01 → T02 before any product fix (T03).**

## Symptom (простыми словами)

Пользователь уже verified, draft открылся полностью (title, summary, description, location, category, labels). Нажимает **Submit Story** → экран «Отправка временно недоступна / Не удалось связаться с сервисом отправки». **Retry** → то же. Success нет, на board история не появляется, draft после reload всё ещё жив. Ложной двойной публикации не видно.

**Итог:** путь GPT → SPA → publish **ломается на последнем шаге**.

## Expected vs Actual

| | |
|--|--|
| **Expected** | Submit → success-state; story один раз на board (или заявленной MVP-поверхности); used draft → calm consumed/expired |
| **Actual** | `service_down` UI на Submit и Retry; draft сохранён; board без новой story |

## Verified facts (code — не гипотезы)

| Fact | Evidence |
|------|----------|
| Submit UI wired | [`StorySubmitPage.jsx`](../../../../../../src/pages/StorySubmitPage.jsx) · [`StoryHandoffPanels.jsx`](../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) |
| Browser **does** call submit API | [`storyDraftService.js`](../../../../../../src/services/storyDraftService.js) `submitStoryDraft` → `POST {VITE_GATEWAY_BASE_URL}/story-drafts/{id}/submit`, body `{}`, Bearer token |
| Preview uses same base | `getStoryDraft` → `GET …/story-drafts/{id}` — UAT preview OK ⇒ gateway base / auth для GET, как правило, живы |
| RU «Отправка временно недоступна» | `storyHandoff.serviceDown.*` · фаза `SERVICE_DOWN` |
| `service_down` = catch-all | [`StorySubmitPage.jsx`](../../../../../../src/pages/StorySubmitPage.jsx) `mapDraftErrorPhase`: 401→login, 404→expired, 403 verify→verify, **503 и всё остальное (network status 0, 4xx/5xx, invalid body) → service_down** |
| Mock can force 503 | `storyDraftService` `mockForceServiceDown` → 503 `service_unavailable` (dev/test only) |
| Contract (gateway) | ID-12 / integration notes: submit → **202** + `story_id`; 403 verify; 401; 404; **503** (identity `/me` / intake not ready) |
| Smoke helper exists | [`scripts/verify-railway-story-submit-smoke.mjs`](../../../../../../scripts/verify-railway-story-submit-smoke.mjs) |
| Prior related analysis | [`audit-story-handoff-railway-submit-blank-2026-07-09.md`](../../../../analysis/audit-story-handoff-railway-submit-blank-2026-07-09.md) (другой симптом: gateway 202, UI blank) |

## Функциональные требования

- **FR-BUG-01.1** Reproduce + evidence note по schema выше (status/body sanitized).  
- **FR-BUG-01.2** Root-cause pin: SPA vs gateway/intake vs env/network (analysis note).  
- **FR-BUG-01.3** Fix на pinned layer: новый draft публикуется (**HTTP 202** + `story_id`); success-state = **leave-handoff**. **Заявленная поверхность BUG-01 P0** = handoff submit success (один `story_id`; без double-publish). Board/profile UI → [BUG-03](../../../../backlog-stories/bugs/STORY-SPA-BUG-03-post-submit-story-feedback.md) · [T07](./task-spa-bug-01-t07-surface-appearance-evidence/README.md).  
- **FR-BUG-01.4** Consumed draft → calm completed/expired; нет double publish; при реальной ошибке draft + Retry сохранены.  
- **FR-BUG-01.5** UAT FE-HANDOFF-03 Pass на новом draft.

## Acceptance Criteria

- [x] Evidence note существует и заполняет `submit_post.status` (или `cors_failed`).  
- [x] Root-cause note согласован с evidence; выбран ровно один primary layer.  
- [x] Новый draft публикуется с первой попытки (или ops fix + retest задокументирован).  
- [x] Success UX = leave-handoff after 202 + consumed draft safe; board/profile appearance **narrowed out** (T07).  
- [x] FE-HANDOFF-03 Pass.

## Вне scope

- Смена GPT Actions OpenAPI без pin  
- Полный rewrite handoff UX  
- PH/HL polish  
- Утверждение слоя fix без evidence schema  

## Nested tasks

| Order | Task folder | Status | FR / AC |
|-------|-------------|--------|---------|
| 01 | [`task-spa-bug-01-t01-reproduce-capture-submit-http`](./task-spa-bug-01-t01-reproduce-capture-submit-http/README.md) | Done · P7 ✅ | FR-BUG-01.1 · AC evidence |
| 02 | [`task-spa-bug-01-t02-root-cause-pin`](./task-spa-bug-01-t02-root-cause-pin/README.md) | Done · P7 ✅ | FR-BUG-01.2 · AC pin |
| 03 | [`task-spa-bug-01-t03-fix-pinned-layer`](./task-spa-bug-01-t03-fix-pinned-layer/README.md) | Done · P7 ✅ | FR-BUG-01.3 · AC publish |
| 04 | [`task-spa-bug-01-t04-regression-publish-consumed`](./task-spa-bug-01-t04-regression-publish-consumed/README.md) | Done · P7 ✅ | FR-BUG-01.4 · AC consumed |
| 05 | [`task-spa-bug-01-t05-story-gate-bug-01`](./task-spa-bug-01-t05-story-gate-bug-01/README.md) | Done · P7 ✅ | FR-BUG-01.5 + all AC (gate) |
| 06 | [`task-spa-bug-01-t06-as-of-done-doc-hygiene`](./task-spa-bug-01-t06-as-of-done-doc-hygiene/README.md) | Done · **P7 verified** | F1 + F7 |
| 07 | [`task-spa-bug-01-t07-surface-appearance-evidence`](./task-spa-bug-01-t07-surface-appearance-evidence/README.md) | Done · **P7 verified** | F2 + F4 |

## Notes

- Gate: [`task-spa-bug-01-t05-story-gate-bug-01/acceptance-verification-spa-bug-01.md`](./task-spa-bug-01-t05-story-gate-bug-01/acceptance-verification-spa-bug-01.md)
- Fix owner was gateway ops ([GW-DRAFT-07](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/story-draft-handoff/STORY-GW-DRAFT-07-hosted-schema-blocks-browser-submit.md)); SPA FE unchanged.
- **P4:** [audit](../../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md) — Ready-with-blockers.
- **P5→P7:** T06/T07 Done · [reaudit](../../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md) **WAVE COMPLETE** · F3 WAIVED → [BUG-03](../../../../backlog-stories/bugs/STORY-SPA-BUG-03-post-submit-story-feedback.md) · `run_mode` **retired**.
- PH-08 and PH-09 must not be merged: composition ≠ sidebar display mode.
