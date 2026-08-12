# STORY-SPA-BUG-01 — Story submission unavailable (P0 / FE-HANDOFF-03)

> **Канон структуры bug-story:** этот файл = образец пакета [bugs/](INDEX.md).  
> Схема полей: [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md).

## Meta (bug card)

| Field | Value |
|-------|-------|
| **Key** | `STORY-SPA-BUG-01-story-submission-unavailable` |
| **Type** | Functional · broken core journey |
| **Severity** | **P0** — demo / value-loop blocker |
| **Status** | Done — P3 gate PASS 2026-08-07T10:51:56Z · `pkg-000053` · **P7 WAVE COMPLETE** ([reaudit](../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md)) |
| **Wave** | Demo blocker |
| **UAT ID** | FE-HANDOFF-03 |
| **Route** | `/#/story/submit?draft_id=…` |
| **Surface** | Story handoff review / Submit |
| **Repro** | Always (inbound: 2/2 — first Submit + one Retry) |
| **Env (UAT)** | Live SPA + gateway (operator session 2026-08-06) |
| **Epic** | [EPIC-SPA-11](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md) |
| **Pipeline** | [pipeline](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/STORY-SPA-BUG-01-story-submission-unavailable.md) |
| **Package** | [bugs/](INDEX.md) |
| **Source inbound** | [DOGEstonia-Bug-P0-Story-Submission-Unavailable.md](../inbound/DOGEstonia-Bug-P0-Story-Submission-Unavailable.md) |
| **Related Done** | [ID-12](../identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md) (FE handoff client) |
| **Related gateway (blocker cleared)** | [GW-DRAFT-07](../../../../doge-complaints-gateway/docs/tasks/backlog-stories/story-draft-handoff/STORY-GW-DRAFT-07-hosted-schema-blocks-browser-submit.md) — **Done** pkg-000056 (gate PASS 2026-08-07T07:04:17Z); hosted `story_labels` + `/ready` schema true; SPA T03+ **unblocked** for retest submit → **202** (no FE-only hotfix required for schema readiness) |
| **decision_ref** | UAT inbound 2026-08-06 |

## Symptom (простыми словами)

Пользователь уже verified, draft открылся полностью (title, summary, description, location, category, labels). Нажимает **Submit Story** → экран «Отправка временно недоступна / Не удалось связаться с сервисом отправки». **Retry** → то же. Success нет, на board история не появляется, draft после reload всё ещё жив. Ложной двойной публикации не видно.

**Итог:** путь GPT → SPA → publish **ломается на последнем шаге**.

## Expected vs Actual

| | |
|--|--|
| **Expected** | Submit → success-state; story один раз на board (или заявленной MVP-поверхности); used draft → calm consumed/expired |
| **Actual** | `service_down` UI на Submit и Retry; draft сохранён; board без новой story |

## Repro steps

1. Войти verified-пользователем в SPA.  
2. Открыть действующий draft: `/#/story/submit?draft_id=<id>`.  
3. Убедиться, что preview заполнен.  
4. Нажать Submit Story (`data-testid="story-handoff-submit"`).  
5. Наблюдать `data-testid="story-handoff-service-down"`.  
6. Нажать Retry один раз → снова service_down.  
7. Проверить board — новой story нет; reload submit — draft ещё доступен.

## Verified facts (code — не гипотезы)

| Fact | Evidence |
|------|----------|
| Submit UI wired | [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx) · [`StoryHandoffPanels.jsx`](../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) |
| Browser **does** call submit API | [`storyDraftService.js`](../../../../src/services/storyDraftService.js) `submitStoryDraft` → `POST {VITE_GATEWAY_BASE_URL}/story-drafts/{id}/submit`, body `{}`, Bearer token |
| Preview uses same base | `getStoryDraft` → `GET …/story-drafts/{id}` — UAT preview OK ⇒ gateway base / auth для GET, как правило, живы |
| RU «Отправка временно недоступна» | `storyHandoff.serviceDown.*` · фаза `SERVICE_DOWN` |
| `service_down` = catch-all | [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx) `mapDraftErrorPhase`: 401→login, 404→expired, 403 verify→verify, **503 и всё остальное (network status 0, 4xx/5xx, invalid body) → service_down** |
| Mock can force 503 | `storyDraftService` `mockForceServiceDown` → 503 `service_unavailable` (dev/test only) |
| Contract (gateway) | ID-12 / integration notes: submit → **202** + `story_id`; 403 verify; 401; 404; **503** (identity `/me` / intake not ready) |
| Smoke helper exists | [`scripts/verify-railway-story-submit-smoke.mjs`](../../../../scripts/verify-railway-story-submit-smoke.mjs) |
| Prior related analysis | [`audit-story-handoff-railway-submit-blank-2026-07-09.md`](../../../analysis/audit-story-handoff-railway-submit-blank-2026-07-09.md) (другой симптом: gateway 202, UI blank) |

### Что это **не** (отсечённые наивные гипотезы)

| Hypothesis | Почему слабая при UAT (preview OK) |
|------------|-------------------------------------|
| «API submit не подключён в SPA» | Код зовёт `POST …/submit`; кнопка → `submitDraft` |
| «Пустой `VITE_GATEWAY_BASE_URL`» | GET draft на том же base обычно тоже падает / mock-режим; полный preview противоречит |
| «Сломан только Retry» | Первый Submit уже service_down |

## Diagnostic playbook (как pin'ить — до fix)

Цель T01/T02: **один HTTP факт** на POST submit + слой (SPA / gateway-intake / env / network).

### A. Browser (обязательный минимум)

1. DevTools → Network → Filter `submit`.  
2. Reproduce Submit.  
3. Зафиксировать в evidence note (без секретов / без raw Bearer):

```yaml
# Evidence capture schema (BUG-01 T01) — копировать в docs/analysis/ или run-reports/
bug_key: STORY-SPA-BUG-01
uat_id: FE-HANDOFF-03
captured_at_utc: "YYYY-MM-DDThh:mm:ssZ"
env:
  spa_origin: "https://…"   # or http://127.0.0.1:…
  gateway_base_observed: "https://…"  # from request URL host, not .env dump
draft_id_redacted: "<first8>…"
preview_get:
  method: GET
  path: "/story-drafts/{id}"
  status: 200            # fill real
submit_post:
  method: POST
  path: "/story-drafts/{id}/submit"
  status: null           # fill: 0 | 401 | 403 | 404 | 422 | 500 | 503 | …
  status_text: ""
  response_content_type: ""
  response_body_sanitized: ""   # strip tokens/PII; keep error code/keys
  cors_failed: false            # true if browser blocked reading response
ui:
  phase_testid: "story-handoff-service-down"
  retry_same: true
board_after:
  new_story_visible: false
```

4. Если status **не** виден (opaque / CORS) — всё равно записать `status: 0` / `cors_failed: true` и перейти к B.

### B. Gateway / ops (если POST ушёл)

- Railway/gateway logs вокруг timestamp: `story_draft_submit*`, `story_intake_*`, identity `/me` на submit.  
- Сравнить: был ли **202** на сервере при UI service_down (тогда смотреть SPA parse/success path — см. prior blank-submit audit) vs **4xx/5xx** на сервере (тогда gateway/intake).

### C. Optional smoke

```bash
# Reachability only — не замена UAT evidence
cd spa-app
SPA_BASE_URL=… GATEWAY_BASE_URL=… IDENTITY_BASE_URL=… \
  DRAFT_ID=… PUPPETEER_TEST_EMAIL=… PUPPETEER_TEST_PASSWORD=… \
  node ./scripts/verify-railway-story-submit-smoke.mjs
```

### D. Pin rules (T02)

| Observed POST | Pin layer (default) | Next |
|---------------|---------------------|------|
| 202 + `story_id`, UI still service_down | **SPA** success/normalize/navigate | FE fix path |
| 503 / 5xx / intake error body | **Gateway / intake / deps** | gateway ticket + ops; SPA optional clearer error later |
| 403 `verification_required` | **Product/auth** (should be verify UI, not service_down) | FE mapping / identity state |
| 401 | Session | re-login path |
| 404 | Draft consumed/missing | expired UX |
| status 0 / CORS / network | **Network / CORS / wrong host** | deploy/env CORS allowlist |
| GET 200, POST never leaves browser | **SPA handler bug** | FE |

**Запрет analysis.mdc:** не писать «чини FE» или «чини gateway» без строки `submit_post.status` (или явного cors_failed).

## Hypothesis matrix (ранжирование до evidence)

| # | Hypothesis | Prior (при preview OK) | Confirm if… | Reject if… |
|---|------------|------------------------|-------------|------------|
| H1 | Gateway/intake fails on POST (503/5xx/validation) | High | POST status ≥500 or error body | POST 202 |
| H2 | Identity `/me` gate only on submit → 503 | Medium | Gateway logs identity fail on submit | GET also needs same gate and works |
| H3 | Network/CORS on POST only | Medium | status 0 / CORS error | POST status readable non-zero |
| H4 | SPA mis-handles 202 (normalize / navigate) | Low–Med | POST 202, UI service_down | POST not 202 |
| H5 | Env bake / wrong gateway host in built SPA | Low | Request host ≠ intended public gateway | Host correct + GET same host OK |
| H6 | Submit not wired | Very low | No POST in Network | POST present (expected) |

## Функциональные требования

- **FR-BUG-01.1** Reproduce + evidence note по schema выше (status/body sanitized).  
- **FR-BUG-01.2** Root-cause pin: SPA vs gateway/intake vs env/network (analysis note).  
- **FR-BUG-01.3** Fix на pinned layer: новый draft публикуется (**HTTP 202** + `story_id`); success-state = **leave-handoff** (не `service_down`). **Заявленная поверхность BUG-01 P0** = handoff submit success path (один `story_id` в ответе; без double-publish). Board card / profile consume **вне** DoD → [BUG-03](STORY-SPA-BUG-03-post-submit-story-feedback.md) · [T07 evidence](../../../analysis/evidence-STORY-SPA-BUG-01-surface-scope-t07-2026-08-07T111808Z.md).  
- **FR-BUG-01.4** Consumed draft → calm completed/expired; нет double publish; при реальной ошибке draft + Retry сохранены. (Appearance board/profile **не** требуется для BUG-01 P0.)  
- **FR-BUG-01.5** UAT FE-HANDOFF-03 Pass на новом draft.

## Acceptance Criteria

- [x] Evidence note существует и заполняет `submit_post.status` (или `cors_failed`).  
- [x] Root-cause note согласован с evidence; выбран ровно один primary layer.  
- [x] Новый draft публикуется с первой попытки (или ops fix + retest задокументирован).  
- [x] Success UX = leave-handoff after 202 + consumed draft safe; board/profile UI appearance **narrowed out** of BUG-01 DoD (T07 · BUG-03). · **P4 PARTIAL closed by T07 FR narrow.**  
- [x] FE-HANDOFF-03 Pass.

## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-BUG-01-story-submission-unavailable`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/STORY-SPA-BUG-01-story-submission-unavailable.md)
- **Epic:** [`EPIC-SPA-11`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md)
- **Gate:** [`acceptance-verification-spa-bug-01.md`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t05-story-gate-bug-01/acceptance-verification-spa-bug-01.md)
- **Gateway fix:** [GW-DRAFT-07](../../../../doge-complaints-gateway/docs/tasks/backlog-stories/story-draft-handoff/STORY-GW-DRAFT-07-hosted-schema-blocks-browser-submit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-bug-01-t01-reproduce-capture-submit-http`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t01-reproduce-capture-submit-http/README.md) | Done · P7 ✅ |
| T02 | [`task-spa-bug-01-t02-root-cause-pin`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t02-root-cause-pin/README.md) | Done · P7 ✅ |
| T03 | [`task-spa-bug-01-t03-fix-pinned-layer`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t03-fix-pinned-layer/README.md) | Done · P7 ✅ |
| T04 | [`task-spa-bug-01-t04-regression-publish-consumed`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t04-regression-publish-consumed/README.md) | Done · P7 ✅ |
| T05 | [`task-spa-bug-01-t05-story-gate-bug-01`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t05-story-gate-bug-01/README.md) | Done · P7 ✅ |
| T06 | [`task-spa-bug-01-t06-as-of-done-doc-hygiene`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t06-as-of-done-doc-hygiene/README.md) | Done · **P7 verified** · F1+F7 |
| T07 | [`task-spa-bug-01-t07-surface-appearance-evidence`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t07-surface-appearance-evidence/README.md) | Done · **P7 verified** · F2+F4 `fr_ac_narrow` |

> **P3 WAVE COMPLETE** 2026-08-07T10:51:56Z · FE-HANDOFF-03 Pass · primary fix = GW-DRAFT-07 (SPA FE unchanged).  
> **P6 gap CLOSED** 2026-08-07T11:18:08Z · T06+T07 · [run-summary](../../run-reports/run-summary-20260807-1118-spa-bug-01-p6.md).  
> **P7 WAVE COMPLETE** 2026-08-07T11:22:18Z · [reaudit](../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md) · `run_mode` **retired**.  
> **P4 hard audit** 2026-08-07T11:04:11Z · [audit](../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md) · Ready-with-blockers (closed in P6/P7).

## Вне scope

- Смена GPT Actions OpenAPI без pin  
- Полный rewrite handoff UX  
- PH/HL polish  
- Утверждение слоя fix без evidence schema  

## Швы (указатели)

`StorySubmitPage` · `storyDraftService.submitStoryDraft` · `mapDraftErrorPhase` · gateway `POST /story-drafts/{id}/submit` · identity `/me` (если 503 на submit) · ID-12 · FE-HANDOFF-03 · GW-DRAFT-07

## Next (process) — As-of-Done · P7 WAVE COMPLETE

1. Gateway blocker **cleared**; SPA P3 gate PASS; P0 submit-unavailable closed.  
2. Gap wave **COMPLETE** — [reaudit](../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md); `run_mode=spa_bug_01_audit_2026_08_07` **retired**.  
3. Residual UX: [BUG-03](STORY-SPA-BUG-03-post-submit-story-feedback.md) draft (WAIVED F3) — separate PA.3/P1 when picked.
