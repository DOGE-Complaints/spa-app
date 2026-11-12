# SPA-REQ15-01-T01 — Route / handoff inventory

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
| HashRouter | `spa-app/src/main.jsx:21` |
| `/story/submit` + compose→submit | `spa-app/src/App.jsx:18–20` · `:41–42` |
| `STORY_SUBMIT_PATH` + storage | `storyHandoffFlowState.js:13–14` · persist/read `:24`/`:35` |
| `buildStorySubmitPath` | `storyHandoffFlowState.js:53–57` |
| `draft_id` query | `StorySubmitPage.jsx:54` · persist `:70–72` |

## AC / DoD

- [x] (P0) Inventory documented with line cites
- [x] (P0) No product `src/` change


## Out of scope

Product chrome redesign · invent live PASS · change aibridge/GW stash

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/StorySubmitPage.test.jsx src/services/__tests__/storyDraftService.handoff.test.js src/auth/__tests__/storyHandoffFlowState.test.js
```
