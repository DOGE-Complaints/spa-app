# SPA-ID-08-T07 — Story gate ID-08

**Story:** [`../STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [mockup-120](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-02T10:51:50Z
**Status:** Done
**Completed:** 2026-07-02T11:11:49Z

## Purpose
Story acceptance gate: verify all 7 story AC + FR-08.1–08.9; produce `acceptance-verification-spa-id-08.md`; close `pkg-000025` in bullrun; sync backlog INDEX.

## Risk
Partial close leaves OAuth handshake unwired — blocks Wave 4 GPT bridge and downstream gateway submit from ChatGPT.

## AC / DoD (maps to story AC)
- [x] AC #1: `/login?oauth_request_id` → login/signup + `POST /oauth/authorize/complete` — T01, T03, T06.
- [x] AC #2: Happy 302 + «Return to ChatGPT» UI — T01, T03, T05, T06.
- [x] AC #3: `verification_required` → verify_url → phone → retry complete → 302 — T01, T03, T04, T06.
- [x] AC #4: Already-verified immediate 302 / «You're ready» — T03, T05, T06.
- [x] AC #5: Draft preserved banner all states — T05, T06.
- [x] AC #6: Credentials/phone/OTP only on DOGEstonia web — architecture + FR-08.7 review.
- [x] AC #7: All strings et/ru/en via `t()` — T02, T03–T05, T06.
- [x] `acceptance-verification-spa-id-08.md` filled per gate template (**Date:** 2026-07-02T11:11:49Z).
- [x] Story pipeline + bullrun + [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) → Done; pkg-000025 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-08.md` (create at P3 execute)
- [`STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md) — Status/AC sync

## Out of scope
- Identity OAuth server changes. Custom GPT client registration (ops). Gateway submit enforcement.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run dev
# manual: full M120 flow A→G; locale switch et/ru/en
```
