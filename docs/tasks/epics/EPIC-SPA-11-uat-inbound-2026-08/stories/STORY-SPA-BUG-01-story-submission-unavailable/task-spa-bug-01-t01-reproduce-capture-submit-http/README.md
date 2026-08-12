# SPA-BUG-01-T01 — Reproduce + capture POST submit HTTP

**Status:** Done — P3 PASS 2026-08-06T20:19:57Z · **P4 verified** ([audit](../../../../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md) FR-BUG-01.1 · Diagnostic playbook A  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T19:21:54Z  
**Package:** `pkg-000053`

## Purpose
Воспроизвести UAT FE-HANDOFF-03 и сохранить **один HTTP факт** на `POST …/story-drafts/{id}/submit` (status / sanitized body / cors_failed) без секретов и raw Bearer.

## Risk
Fix без evidence чинит не тот слой (запрет analysis.mdc).

## Code Facts (re-verify at execute)
- Submit UI: [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) · submit → `storyDraftService.submitStoryDraft`; panel `data-testid="story-handoff-service-down"`.
- API: [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js) `submitStoryDraft` → `POST {VITE_GATEWAY_BASE_URL}/story-drafts/{id}/submit`, body `{}`, Bearer.
- Preview same base: `getStoryDraft` GET — UAT preview OK.
- Evidence schema (YAML): backlog §Diagnostic playbook A (`bug_key`, `submit_post.status`, `cors_failed`, sanitized body).
- Optional smoke: [`scripts/verify-railway-story-submit-smoke.mjs`](../../../../../../../scripts/verify-railway-story-submit-smoke.mjs) — reachability only, not UAT evidence.

## AC / DoD
- [x] (P0) Evidence note in `docs/analysis/` or `docs/tasks/run-reports/` fills `submit_post.status` **or** `cors_failed: true` → FR-BUG-01.1 · backlog AC #1.
- [x] (P0) Note records preview GET OK vs submit fail; `phase_testid: story-handoff-service-down`; no secrets / raw Bearer.
- [x] (P0) Repro follows backlog steps (verified user, draft filled, Submit + one Retry).

## Where to change
- New evidence note under `spa-app/docs/analysis/` or `spa-app/docs/tasks/run-reports/` (operator env capture)
- DevTools Network filter `submit` (no product code)

## Out of scope
Product fix (T03); invented root cause; GPT OpenAPI changes.

## Verification
```bash
# Fill evidence YAML from backlog §Diagnostic A after live Submit
rg -n "submit_post|story-handoff-service-down|cors_failed" spa-app/docs/analysis/ spa-app/docs/tasks/run-reports/
```
