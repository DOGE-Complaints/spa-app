# SPA-ID-03-T07 — Story gate ID-03

**Story:** [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [mockup-28](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:45:56Z

## Purpose
Story acceptance gate: live verify all 5 story AC + M28 visual spot-check on `/dashboard`; produce `acceptance-verification-spa-id-03.md`.

## Risk
Partial close leaves missing state, label drift, or non-reusable card blocking ID-04.

## AC / DoD (maps to story AC)
- [ ] AC #1: 5 states in one reusable `CivicStatusCard` (T02–T05).
- [ ] AC #2: FE-derived from `phone_verified` + phase; no `verification_status` (T01, T06).
- [ ] AC #3: canonical labels verbatim (T03, T06).
- [ ] AC #4: trust tone; no gamification badges (T02–T04).
- [ ] AC #5: wallet info block reserved in Verified (T03).
- [ ] `acceptance-verification-spa-id-03.md` filled per gate template (**Date:** post live-run only).
- [ ] Story pipeline + bullrun + backlog INDEX → Done; pkg-000017 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-03.md` (create at P3 execute)
- [`STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../backlog-stories/INDEX.md)

## Out of scope
- ID-04 OTP flow. ID-06 gate. SEC-02.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run dev
# manual: /#/dashboard — states A–E per acceptance-verification checklist
```
