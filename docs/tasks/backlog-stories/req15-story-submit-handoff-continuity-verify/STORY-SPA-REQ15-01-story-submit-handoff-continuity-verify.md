# STORY-SPA-REQ15-01 — Story submit handoff continuity verify (REQ15)

## Meta
- **Key:** `STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify`
- **Status:** P8 local close · **Done** (verify package) · T01–T06 **Done** · gate **PASS** · `pkg-000234` · **activation: none** · live **Unknown** · SHA docs `2f57e3a` · feat/test N/A · NO PUSH · Vitest 29/29 · no invent PASS · [disposition](../../run-reports/p5-disposition-STORY-SPA-REQ15-01-2026-11-05.md) · [p7](../../../analysis/reaudit-STORY-SPA-REQ15-01-p7-2026-11-05.md) · [arch](../../../architecture/req15-story-submit-handoff-continuity-verify.md) · [evidence](../../../analysis/evidence-spa-req15-01-story-submit-handoff-continuity-verify-2026-11-05.md) · [pipeline](../../epics/EPIC-SPA-25-req15-story-submit-handoff-continuity-verify/stories/STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify/STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md)
- **Пакет:** [`req15-story-submit-handoff-continuity-verify/`](./INDEX.md) · epic [EPIC-SPA-25](../../epics/EPIC-SPA-25-req15-story-submit-handoff-continuity-verify/EPIC-SPA-25-req15-story-submit-handoff-continuity-verify.md)
- **Parent REQ:** [`25-req15-story-submit-handoff-continuity-verify.md`](../../../requirements/25-req15-story-submit-handoff-continuity-verify.md)
- **Parent product:** REQ15 seq-03 / AC-08
- **Gap closure:** G6 second ([execution-order](../../../../../docs/analysis/req15-gap-closure-execution-order-2026-11-03.md)) · after gateway [`STORY-GW-REQ59-01`](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/req59-req15-story-draft-stash-channel-parity-verify/STORY-GW-REQ59-01-aibridge-stash-parity-verify.md)
- **Siblings:** gateway [`STORY-GW-REQ59-01`](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/req59-req15-story-draft-stash-channel-parity-verify/STORY-GW-REQ59-01-aibridge-stash-parity-verify.md) · aibridge REQ-11 · Keep [`STORY-SPA-ID-12-story-draft-handoff-submit`](../identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md) / M128
- **Peer arch:** [`req15-dual-confirm-handoff`](../../../../../doge-ai-bridge/docs/architecture/req15-dual-confirm-handoff/) · [`01-keep-pipe-boundaries`](../../../../../doge-ai-bridge/docs/architecture/req15-dual-confirm-handoff/01-keep-pipe-boundaries.md) · [`03-verify-evidence-coexistence`](../../../../../doge-ai-bridge/docs/architecture/req15-dual-confirm-handoff/03-verify-evidence-coexistence.md)
- **Тип:** verify-only (no product chrome redesign)
- **Skill declared:** `javascript-pro` · soft `code-documenter`
- **Tech subtasks:** Present · pipeline T01–T06 **Done** under EPIC-SPA-25 · P3 `2026-11-05T12:18:30Z`
- **Emitted:** 2026-11-03 · **L2 intake:** 2026-11-05T12:04:54Z · **P1.3 APPLY:** 2026-11-05T12:12:46Z · **P3 Done:** 2026-11-05T12:18:30Z
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)

## Scope
- Verify `#/story/submit?draft_id=` accepts drafts from **aibridge** stash (telegram-delivered continuation when live).
- Citizen session still required for submit; no service Bearer in browser.
- Evidence note for REQ15 E2E; gap list only if broken.

## Out of scope
- New compose UI; calling aibridge/providers from browser; board/poster work.
- Changing gateway stash contracts (sibling 59).
- GPT-flavored empty CTA / chips copy polish (Partial UX · not continuity wire).
- Creating `task-spa-req15-*/` epic pipeline folders (`name ≠ create`).

## Verified current state (code probe 2026-11-05)

| Fact | Evidence |
|------|----------|
| HashRouter + submit route | [`main.jsx:21`](../../../../src/main.jsx) `HashRouter` · [`App.jsx:41`](../../../../src/App.jsx) `Route path="/story/submit"` → `StorySubmitPage` · [`:18–20`](../../../../src/App.jsx) `/story/compose` → submit + same `search` |
| Path constant + draft storage | [`storyHandoffFlowState.js:14`](../../../../src/auth/storyHandoffFlowState.js) `STORY_SUBMIT_PATH` · [`:13`](../../../../src/auth/storyHandoffFlowState.js) `DRAFT_ID_STORAGE_KEY` · [`:53–57`](../../../../src/auth/storyHandoffFlowState.js) `buildStorySubmitPath` · [`:19`](../../../../src/auth/storyHandoffFlowState.js)/[`:33`](../../../../src/auth/storyHandoffFlowState.js) persist/read |
| Query `draft_id` → preview | [`StorySubmitPage.jsx:54`](../../../../src/pages/StorySubmitPage.jsx) `searchParams.get('draft_id')` · [`:70–72`](../../../../src/pages/StorySubmitPage.jsx) persist · [`:92`](../../../../src/pages/StorySubmitPage.jsx) `getStoryDraft` |
| Citizen Bearer only | [`storyDraftService.js:60–64`](../../../../src/services/storyDraftService.js) `Authorization: Bearer` from access token · [`StorySubmitPage.jsx:52`](../../../../src/pages/StorySubmitPage.jsx) `session?.access_token` · no `aibridge` / service token in `spa-app/src` (grep Absent) |
| 401 → login handoff | [`StorySubmitPage.jsx:75–78`](../../../../src/pages/StorySubmitPage.jsx) `redirectToLogin` · [`storyHandoffFlowState.js:64–65`](../../../../src/auth/storyHandoffFlowState.js) `buildHandoffLoginPath` |
| Gateway GET/POST | [`storyDraftService.js:140–150`](../../../../src/services/storyDraftService.js) `GET /story-drafts/{id}` · [`:161–187`](../../../../src/services/storyDraftService.js) `POST …/submit` · `VITE_GATEWAY_BASE_URL` |
| Protected path | [`sessionRoutePolicy.js:12`](../../../../src/router/sessionRoutePolicy.js) `PROTECTED_PREFIXES` includes `/story/submit` |
| Peer continuation URL shape | aibridge [`gateway.py:118–120`](../../../../../doge-ai-bridge/src/aibridge/gateway.py) `build_continuation_url` → `{base}/#/story/submit?draft_id=` |
| Unit / harness Present | [`StorySubmitPage.test.jsx`](../../../../src/pages/__tests__/StorySubmitPage.test.jsx) · [`storyDraftService.handoff.test.js`](../../../../src/services/__tests__/storyDraftService.handoff.test.js) · [`storyHandoffFlowState.test.js`](../../../../src/auth/__tests__/storyHandoffFlowState.test.js) |
| Live REQ15 evidence package | **Absent** as Done (this story) — soft G4 + GW-59 |

REQ-25 Draft awaiting PA.2 — this story is verify package + L2 slice only (Apply separate). Soft Keep lineage: ID-12 / M128.

## L1.5 Ownership

| Rule | Owner |
|------|--------|
| Hash route `#/story/submit?draft_id=` + handoff state | SPA `StorySubmitPage` / `storyHandoffFlowState` (Keep ID-12) |
| Citizen GET draft + POST submit | SPA `storyDraftService` → gateway citizen deps |
| Stash HTTP + service auth + `draft_id` mint | gateway (sibling GW-REQ59 / Keep GW-DRAFT) — **not** SPA |
| Continuation URL builder | aibridge `build_continuation_url` (REQ-11) — SPA **consumes** |
| Telegram delivery of URL | doge-telegram transport — OOS implement here |
| Auth boundary in browser | Supabase citizen session only · **no** service Bearer |

## Target / AC
- [x] **AC-SPA-25-01:** `#/story/submit?draft_id=` accepts drafts from aibridge stash path
- [x] **AC-SPA-25-02:** Submit still requires citizen session (not service Bearer in browser)
- [x] **AC-SPA-25-03:** No SPA redesign required for REQ15 unless T1 documents hard break
- [x] **AC-SPA-25-04:** E2E note: open link after telegram-delivered continuation (when live)
- [x] Default Pass = **no SPA redesign** if continuity holds

## Technical subtasks (arch-bound; Await Apply)

| ID | Slug | Essence | Arch / AC | Touch (as-is) | OOS | Status |
|----|------|---------|-----------|---------------|-----|--------|
| **t01** | `task-spa-req15-01-t01-route-handoff-inventory` | Inventory Present: HashRouter · `STORY_SUBMIT_PATH` · query + `sessionStorage` · phases · compose→submit redirect | support AC-01/03 · peer `01-keep-pipe` SPA edge | `main.jsx` · `App.jsx` · `storyHandoffFlowState.js` · `StorySubmitPage.jsx` | redesign chrome | **Done** |
| **t02** | `task-spa-req15-01-t02-continuation-url-shape-parity` | Parity vs aibridge `build_continuation_url`: `{SPA}/#/story/submit?draft_id=` matches HashRouter + `buildStorySubmitPath` | AC-SPA-25-01 · peer `01-keep-pipe` | peer `gateway.py:118` + SPA path helpers | change aibridge / invent URL | **Done** |
| **t03** | `task-spa-req15-01-t03-citizen-session-auth-boundary` | GET/submit only Supabase citizen Bearer; no service token in SPA; 401 → `buildHandoffLoginPath`; protected prefix held | AC-SPA-25-02 | `storyDraftService.js` · `StorySubmitPage.jsx` · `sessionRoutePolicy.js` | service Bearer in browser | **Done** |
| **t04** | `task-spa-req15-01-t04-gateway-draft-client-continuity` | `getStoryDraft` preview + `submitStoryDraft`; channel-agnostic `draft_id` (aibridge stash = Keep contract); soft cite GW-59 | AC-SPA-25-01 · soft GW-59 | `storyDraftService.js` · preview map | change GW stash schema | **Done** |
| **t05** | `task-spa-req15-01-t05-evidence-or-gap-note` | Write evidence note under `spa-app/docs/analysis/` **или** gap+decision if hard break; default **no SPA code change**. Live soft-deps G4 + GW-59; if live blocked → harness/unit Present + **Unknown** live (no invent PASS) | AC-SPA-25-01…04 · peer `03-verify` | analysis note | silent redesign / invent live PASS | **Done** |
| **t06** | `task-spa-req15-01-t06-story-gate` | Gate checklist AC-SPA-25-01…04; INDEX/status sync | package gate | story + INDEX | GW-REQ59 implement · aibridge FSM | **Done** |

**Order:** t01 → t02 → t03 → t04 → t05 → t06.  
**Skill:** `javascript-pro` (path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`).

## Dependencies
- Soft: STORY-GW-REQ59-01 / live `draft_id` from aibridge path (G6 order · G4 smoke).
- Soft: peer aibridge REQ-11 / Keep continuation URL Present.
- Soft Keep: STORY-SPA-ID-12 handoff lineage.
