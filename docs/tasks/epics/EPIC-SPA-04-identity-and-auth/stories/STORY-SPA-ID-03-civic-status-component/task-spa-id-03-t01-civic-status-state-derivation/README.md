# SPA-ID-03-T01 — Civic status state derivation

**Story:** [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md) §FR-03.2; [mockup-28 §6 mapping](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md)  
**Depends on:** ID-02 Done (`useSessionShellState` profile from `/me`)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:45:56Z

## Purpose
Enum + `deriveCivicStatusState(phone_verified, flowPhase, errorCode?)` — FE-derived card state A–E per backlog API-интеграция. Flow phases: `idle|requesting|code_entry|confirming|verified|failed`.

## Risk
Reading nonexistent `verification_status` or wrong mapping breaks trust contract (story AC #2) and blocks ID-04 reuse.

## Code Facts (re-verify at execute)
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — `MOCK_ME` includes `phone_verified`, `phone_verified_at`, `phone_dial_prefix`; no `verification_status`.
- [`useSessionShellState.js`](../../../../../../../../src/auth/useSessionShellState.js) — exposes `profile` from `fetchMe`.
- grep `CivicStatus|civicStatus|verification_status` in `spa-app/src/` → 0 at intake.

## AC / DoD
- [ ] (P0) `civicStatusState.js` exports card state enum + `deriveCivicStatusState` (FR-03.2; story AC #2).
- [ ] (P0) `phone_verified=true` → State D; `false` + `idle` → State A; flow phases map to B/C/E per M28 §6 table.
- [ ] (P0) No reference to backend field `verification_status` anywhere in module.
- [ ] (P1) Exported flow phase type matches backlog list verbatim.

## Where to change
- New: `spa-app/src/auth/civicStatusState.js` (or `spa-app/src/components/CivicStatus/civicStatusState.js`)

## Out of scope
- UI panels (T02–T04). OTP APIs (ID-04). Dashboard route (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/civicStatusState.test.js
# after T06: full npm run test:run
```
