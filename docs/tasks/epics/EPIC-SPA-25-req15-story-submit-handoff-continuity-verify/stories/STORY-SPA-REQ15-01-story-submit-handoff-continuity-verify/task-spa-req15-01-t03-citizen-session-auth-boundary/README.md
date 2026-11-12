# SPA-REQ15-01-T03 — Citizen session auth boundary

**Status:** Done · P3 `2026-11-05T12:18:30Z` (verify-only · no product `src/` change)  
**Story:** [`../STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md`](../STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md)  
**Decision Ref:** backlog STORY-SPA-REQ15-01 · REQ-25 · AC-SPA-25-01…04  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-11-05T12:12:46Z`  
**Executed:** `2026-11-05T12:18:30Z`  
**Package:** `pkg-000234`

## Purpose

Verify-only task under Default Pass = no SPA redesign if continuity holds. Soft GW-59/live Unknown → no invent PASS.

## Code Facts (verify exists)

| Claim | Evidence |
|-------|----------|
| Citizen token | `StorySubmitPage.jsx:52` `session?.access_token` · `storyDraftService.js:52` |
| Bearer header | `storyDraftService.js:64` `Authorization: Bearer ${{accessToken}}` |
| 401 → login | `StorySubmitPage.jsx:75–78` · `97`/`127` · `buildHandoffLoginPath` `:64–66` |
| Protected prefix | `sessionRoutePolicy.js:12` includes `/story/submit` |
| No service Bearer in SPA client | `rg` Absent on service files · SEC guards separate |

## AC / DoD

- [x] (P0) Citizen-only boundary held — **AC-SPA-25-02**
- [x] (P0) No service Bearer invent / no product change


## Out of scope

Product chrome redesign · invent live PASS · change aibridge/GW stash

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/StorySubmitPage.test.jsx src/services/__tests__/storyDraftService.handoff.test.js src/auth/__tests__/storyHandoffFlowState.test.js
```
