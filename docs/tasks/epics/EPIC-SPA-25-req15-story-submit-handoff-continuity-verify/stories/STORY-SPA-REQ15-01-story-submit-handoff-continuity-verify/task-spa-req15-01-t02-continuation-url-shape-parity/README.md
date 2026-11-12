# SPA-REQ15-01-T02 — Continuation URL shape parity

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
| aibridge URL | `doge-ai-bridge/src/aibridge/gateway.py:118–120` `{{base}}/#/story/submit?draft_id=` |
| SPA hash path | HashRouter + `STORY_SUBMIT_PATH='/story/submit'` + `?draft_id=` via `buildStorySubmitPath` |
| Parity | shapes match · **no invent URL** · no aibridge change |

## AC / DoD

- [x] (P0) Parity vs `build_continuation_url` recorded — **AC-SPA-25-01** (structure)
- [x] (P0) No invent URL / no product change


## Out of scope

Product chrome redesign · invent live PASS · change aibridge/GW stash

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/StorySubmitPage.test.jsx src/services/__tests__/storyDraftService.handoff.test.js src/auth/__tests__/storyHandoffFlowState.test.js
```
