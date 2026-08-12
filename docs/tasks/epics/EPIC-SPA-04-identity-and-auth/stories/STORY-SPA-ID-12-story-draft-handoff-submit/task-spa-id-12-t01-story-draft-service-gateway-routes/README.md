# SPA-ID-12-T01 — storyDraftService gateway routes (GET + submit)

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** STORY-SPA-ID-08 Done (pkg-000025); GW-DRAFT-02 as-built  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Refactor `storyDraftService` for browser handoff: add `getStoryDraft(draftId)` (`GET /story-drafts/{id}` under Bearer), fix `submitStoryDraft` for 202/401/403/404/503; remove browser `createStoryDraft` (`POST /story-drafts` service-only); drop mock service-path branch. Map 403 `verification_required` via existing `VerificationRequiredError`.

## Risk
Keeping `createStoryDraft` in browser path violates AC #4 and M-7. Wrong status parsing breaks verify interpose (T07).

## Code Facts (re-verify at execute)
- [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js) — `createStoryDraft` POST :94-105; no GET; `submitStoryDraft` POST :113-133.
- grep `getStoryDraft` in [`spa-app/src/`](../../../../../../../src/) → **0** at scaffold.
- Gateway as-built: `GET /story-drafts/{id}` 200/401/404; `POST …/submit` 202/403/401/503/404 ([asgi_app.py](../../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py)).

## AC / DoD
- [ ] (P0) `getStoryDraft(id)` → GET `/story-drafts/{id}` with Bearer; returns payload on 200 (AC #1, Scope A,E).
- [ ] (P0) `submitStoryDraft(id)` → POST `/story-drafts/{id}/submit`; 202 returns `{submission_id, status}` (AC #3, Scope C).
- [ ] (P0) 401/403/404/503 mapped to typed errors; 403 `verification_required` → `VerificationRequiredError` with `verify_url` (AC #3, Scope C,E).
- [ ] (P0) Remove or gate `createStoryDraft` from browser handoff export (AC #4, Scope D).
- [ ] (P1) Mock mode supports GET/submit happy + error paths for Vitest (T09).
- [ ] (P1) Unit tests: GET 200/401/404; submit 202/403/503.

## Where to change
- [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js)
- New: `../../../../../../../src/services/__tests__/storyDraftService.handoff.test.js` (or extend existing)

## Out of scope
Preview mapper (T02). Page wiring (T06). i18n (T03).

## Verification
```bash
cd spa-app && npm run test:run -- src/services/__tests__/storyDraftService
```
