# SPA-THR-04-T04 — Vitest: stub click → feedback; no HTTP invent

**Status:** Done  
**Story:** [`../STORY-SPA-THR-04-escalation-stub.md`](../STORY-SPA-THR-04-escalation-stub.md)  
**Decision Ref:** FR-THR-04.4 · FR-THR-04.6  
**Depends on:** T01–T03  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** `2026-09-22T21:42:26Z`
**Completed:** `2026-09-22T21:46:48Z`  
**Package:** `pkg-000080`

## Purpose
Vitest: idle click opens feedback; no invitation-sent claim; soon stays disabled; no fetch.

## AC / DoD
- [x] (P0) Click → feedback with notConnectedYet + noInvitationSent
- [x] (P0) Got it dismisses
- [x] (P0) Soon: button disabled; helper visible
- [x] (P0) No network / invent escalate URL in component

## Where to change
- `src/components/threads/__tests__/InviteOrganizationStub.test.jsx`
