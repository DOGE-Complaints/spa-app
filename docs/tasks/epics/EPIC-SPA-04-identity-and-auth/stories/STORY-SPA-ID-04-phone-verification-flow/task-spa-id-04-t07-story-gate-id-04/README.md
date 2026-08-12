# SPA-ID-04-T07 — Story gate ID-04

**Story:** [`../STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [mockup-32](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T16:53:10Z

## Purpose
Story acceptance gate: live verify all 5 story AC + M32 visual spot-check on `/verify`; produce `acceptance-verification-spa-id-04.md`.

## Risk
Partial close leaves broken `/verify` path or missing disclosure-first flow blocking Wave 2 stories ID-05/06.

## AC / DoD (maps to story AC)
- [x] AC #1: Disclosure before phone; friendly tone; no forbidden terms (T03, T06).
- [x] AC #2: Full happy-path in SPA without external redirect (T03–T05, T06).
- [x] AC #3: Resend after 60s with timer; OTP `one-time-code` (T04, T06).
- [x] AC #4: Success → `/me` refresh + resume interrupted action (T05, T06).
- [x] AC #5: Skip when `phone_verified=true` (T05, T06).
- [x] `acceptance-verification-spa-id-04.md` filled per gate template (**Date:** post live-run only).
- [x] Story pipeline + bullrun + backlog INDEX → Done; pkg-000018 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-04.md` (create at P3 execute)
- [`STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../backlog-stories/INDEX.md)

## Out of scope
- ID-05 error UI. ID-06 draft resume. eID/wallet.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run dev
# manual: /#/verify — states A–E per acceptance-verification checklist
```
