# SPA-ID-12-T02 — draft preview DTO mapper (original-language)

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Add `storyDraftPreview.js`: map opaque gateway payload → read-only viewmodel; select i18n field version by `narrative_session_language`; defensive render (missing fields → hide section, no throw). Document supported preview fields per backlog DTO table.

## Risk
Inventing fields not in payload breaks GAP-DTO contract (R2). Wrong language selection violates D12-3.

## Code Facts (re-verify at execute)
- grep `storyDraftPreview` in [`spa-app/src/`](../../../../../../../src/) → **0** at scaffold.
- Payload fields per backlog: `narrative_title/summary/description/institution`, `narrative_canonical_type/labels`, `narrative_location_query`, `narrative_session_language` ([contracts.py](../../../../../../../../doge-complaints-gateway/src/core/domain/contracts.py#L47)).

## AC / DoD
- [ ] (P0) `mapDraftPayloadToPreview(payload)` returns viewmodel with title/summary/description/category/labels/institution/location + language badge (Scope B, AC #1).
- [ ] (P0) Language selection uses `narrative_session_language` (D12-3); narrative content not translated.
- [ ] (P0) Missing/null fields omitted from viewmodel; renderer-safe defaults (Scope B, R2).
- [ ] (P1) Unit tests: et/ru/en field selection; partial payload; empty payload.

## Where to change
- New: `../../../../../../../src/services/storyDraftPreview.js`
- New: `../../../../../../../src/services/__tests__/storyDraftPreview.test.js`

## Out of scope
StorySubmitPage UI (T06). M128 preview layout (T08).

## Verification
```bash
cd spa-app && npm run test:run -- src/services/__tests__/storyDraftPreview.test.js
```
