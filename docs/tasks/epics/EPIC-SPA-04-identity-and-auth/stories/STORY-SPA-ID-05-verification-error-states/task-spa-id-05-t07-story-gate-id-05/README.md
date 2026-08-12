# SPA-ID-05-T07 — Story gate ID-05

**Story:** [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [mockup-37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T09:20:49Z

## Purpose
Story acceptance gate: verify all 5 story AC + M37 visual spot-check; produce `acceptance-verification-spa-id-05.md`; close pkg-000019 in index.

## Risk
Partial close leaves generic failed panel for some backend codes; ID-06/07 blocked on error UX.

## AC / DoD (maps to story AC)
- [ ] AC #1: All §10/M37 §15 codes have dedicated UI state (T01, T04, T05, T06).
- [ ] AC #2: Rate Limited timer + Wrong Code attempts counter (T03, T05, T06).
- [ ] AC #3: Phone Conflict soft recovery, no auto-merge (T04, T05).
- [ ] AC #4: Country → waitlist handoff stub (T04, T05) — not full ID-07 form.
- [ ] AC #5: Calm copy, no forbidden terms, no phone/OTP in UI/logs (T01–T06).
- [ ] `acceptance-verification-spa-id-05.md` filled per gate template (**Date:** post live-run only).
- [ ] Story pipeline + bullrun + backlog row → Done; pkg-000019 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-05.md` (create at P3 execute)
- [`STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)

## Out of scope
- ID-07 waitlist implementation. Identity backend `retry_after` API.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
# manual: mode B file-sink — wrong OTP, rate limit, etc. per acceptance checklist
```
