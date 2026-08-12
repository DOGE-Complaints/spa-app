# SPA-BUG-01-T04 — Regression: publish once + consumed draft safe

**Status:** Done — P3 PASS 2026-08-07T10:51:56Z · **P4 PARTIAL** · F3/F4 ([audit](../../../../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md) FR-BUG-01.4  
**Depends on:** SPA-BUG-01-T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T19:21:54Z  
**Package:** `pkg-000053`

## Purpose
После fix: новый draft → publish + success UX; повтор used draft → calm completed/expired; **нет** double publish; при реальной ошибке draft + Retry сохранены.

## Risk
Регресс double publish или потеря draft на ошибке.

## Code Facts (re-verify at execute)
- ID-12 handoff AC (related Done): [`STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md).
- Submit success path: [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) navigate after `submitStoryDraft`; draft clear on success.
- Service / normalize: [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js).
- Existing tests under handoff / storyDraft if present — extend as needed.

## AC / DoD
- [x] (P0) Success UX + story single appearance on claimed surface → FR-BUG-01.4 · backlog AC #4.
- [x] (P0) Consumed draft → completed/expired calm; no double publish.
- [x] (P0) Real error path: draft preserved + Retry available.
- [x] (P0) Tests and/or UAT checklist green (document which).

## Where to change
- `spa-app/src/**/__tests__` as needed (handoff / storyDraft)
- UAT / evidence notes if vitest insufficient for live consumed path

## Out of scope
Full GPT rewrite; PH/HL stories; changing OpenAPI without pin.

## Verification
```bash
cd spa-app && npx vitest run --reporter=dot   # handoff-related suites
# UAT checklist: new draft publish once; reload used draft → expired/consumed; error keeps draft
```
