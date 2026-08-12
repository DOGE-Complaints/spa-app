# SPA-ID-03-T04 — Civic states In Progress, Failed (C, E)

**Story:** [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)  
**Decision Ref:** [mockup-28 States C, E](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md); backlog FR-03.2 flow phases  
**Depends on:** T01, T02  
**ui_scope:** `visual` · **extends:** T02 ui_anchor  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:45:56Z

## Purpose
Implement panels **C Verification In Progress** and **E Verification Failed** driven by local flow phase + optional error code; stub callbacks for ID-04 (no OTP implementation).

## Risk
Hard-wiring OTP UI here duplicates ID-04 and violates story «Вне scope».

## Code Facts (re-verify at execute)
- Flow phases `requesting|code_entry|confirming` → State C (M28 §6).
- Phase `failed` + error code → State E (ID-05 errors deferred to separate story; use generic recoverable copy).

## AC / DoD
- [ ] (P0) State C for phases `requesting`, `code_entry`, `confirming` when `phone_verified=false` (story AC #1, #2).
- [ ] (P0) State E for phase `failed` with recoverable CTA (story AC #1, #4 trust tone).
- [ ] (P0) `data-civic-status-state="verification_in_progress|verification_failed"`.
- [ ] (P1) `onVerify`, `onRetry` props — no-op or navigate stub; no `POST /auth/phone/*` calls.

## Where to change
- `spa-app/src/components/CivicStatus/CivicStatusCard.jsx` (panels C, E)

## Out of scope
- Phone OTP APIs and error code matrix (ID-04, ID-05). Wallet connect.

## Verification
```bash
cd spa-app && npm run test:run -- src/components/CivicStatus
cd spa-app && npm run dev
# pass flowPhase props → states C and E
```
