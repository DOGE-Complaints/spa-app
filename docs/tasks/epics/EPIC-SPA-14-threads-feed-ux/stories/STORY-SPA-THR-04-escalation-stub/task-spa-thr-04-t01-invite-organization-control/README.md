# SPA-THR-04-T01 — Secondary Invite organization affordance

**Status:** Done  
**Story:** [`../STORY-SPA-THR-04-escalation-stub.md`](../STORY-SPA-THR-04-escalation-stub.md)  
**Decision Ref:** FR-THR-04.1–04.3 · THR-E-A · [backlog](../../../../../../backlog-stories/threads-feed/STORY-SPA-THR-04-escalation-stub.md) · [M146](../../../../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md)  
**Depends on:** THR-01 host Done  
**ui_scope:** `visual` · **ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-22T21:42:26Z`
**Completed:** `2026-09-22T21:46:48Z`  
**Package:** `pkg-000080`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.png
```

## Purpose
Compact secondary **Invite organization** control in IssueThreadBlock action row (M143 slot). Not primary CTA.

## Risk
Invent escalate HTTP; false success; admin/org picker; start THR-05.

## Code Facts (re-verify at execute)
- Host: `IssueThreadBlock` action row `thread-action-invite` (dead chrome today)
- Icons: `ic-invite-organization.png` ON DISK
- Escalate HTTP: **Open**

## AC / DoD
- [x] (P0) Secondary Invite organization visible when thread chrome shown
- [x] (P0) Label from L10N; icon present
- [x] (P0) No invent escalate HTTP

## Where to change
- `src/components/threads/` · i18n · tests

## Out of scope
THR-05/06 · invent HTTP · org directory · SLA

## Verification
```bash
rg -n 'InviteOrganization|thread-action-invite|escalate' spa-app/src/components/threads spa-app/src/i18n || true
```
