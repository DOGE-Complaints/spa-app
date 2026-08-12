# SPA-ID-06-T02 — story-draft gateway client + flow state

**Story:** [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md) §Routes/API, FR-06.3/06.5/06.7; [identity-gateway-integration-notes-2026-06-23.md](../../../../../../analysis/identity-gateway-integration-notes-2026-06-23.md)  
**Depends on:** T01 (optional for labels)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T18:55:30Z

## Purpose
Implement `storyDraftService` for gateway `POST /story-drafts` and `POST /story-drafts/{id}/submit` with Bearer auth, mock mode (like `identityService`), and `verification_required` response parsing. Add protected-action flow-state enum + resume helpers (draft_id, last-saved timestamp).

## Risk
Gateway contract ⚠️ TBD — mock-first required until gateway team confirms paths/format. Wrong `verification_required` handling breaks FR-06.7 trust checkpoint.

## Code Facts (re-verify at execute)
- grep `story-drafts` in [`spa-app/src/`](../../../../../../../../src/) → **0** at intake.
- [`issueService.js`](../../../../../../../../src/services/issueService.js) — `VITE_GATEWAY_BASE_URL` pattern for gateway calls (issues only).
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — mock mode + `IdentityApiError` pattern to mirror.
- grep `story-drafts` in [`doge-complaints-gateway/`](../../../../../../../../../doge-complaints-gateway/) → **0** (contract unverified in repo).
- [`identity-gateway-integration-notes-2026-06-23.md`](../../../../../../analysis/identity-gateway-integration-notes-2026-06-23.md) — expected endpoints + `verification_required` shape ⚠️ TBD.

## AC / DoD
- [ ] (P0) `createStoryDraft({ title, summary, content })` → `{ draft_id }` via gateway (or mock) (FR-06.3).
- [ ] (P0) `submitStoryDraft(draftId)` → success `{ submission_id, status }` or typed `VerificationRequiredError` (FR-06.6, FR-06.7).
- [ ] (P0) Flow state module: phases for M122 A–E + `resumeDraft(draftId)` helper (FR-06.5).
- [ ] (P1) Unit tests for mock client: happy submit + `verification_required` path.

## Where to change
- New: `spa-app/src/services/storyDraftService.js` (or `src/auth/storyDraftService.js`)
- New: `spa-app/src/auth/storyGateFlowState.js` (enum + transitions)
- New: `spa-app/src/services/__tests__/storyDraftService.test.js`

## Out of scope
- UI panels (T03–T05). Phone verify APIs (reuse ID-04 via `identityService`).

## Verification
```bash
cd spa-app && npm run test:run -- src/services/__tests__/storyDraftService.test.js
```
