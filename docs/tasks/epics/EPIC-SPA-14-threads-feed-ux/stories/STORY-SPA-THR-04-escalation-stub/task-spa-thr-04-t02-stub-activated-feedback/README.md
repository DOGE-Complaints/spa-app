# SPA-THR-04-T02 — Non-dead stub activated feedback

**Status:** Done  
**Story:** [`../STORY-SPA-THR-04-escalation-stub.md`](../STORY-SPA-THR-04-escalation-stub.md)  
**Decision Ref:** FR-THR-04.4–04.5 · THR-E-B/C · [M146](../../../../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md)  
**Depends on:** T01  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-22T21:42:26Z`
**Completed:** `2026-09-22T21:46:48Z`  
**Package:** `pkg-000080`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.png
```

## Purpose
Click → informational toast/popover (not connected / no invitation sent). Soon/disabled variant with persistent helper. **No false success. No invent HTTP.**

## AC / DoD
- [x] (P0) Activated: title + body + Got it; info icon; no green success
- [x] (P0) Explicit «No invitation was sent»
- [x] (P0) Soon/disabled: Coming soon badge + helper; no feedback open
- [x] (P0) No fetch / escalate route invent

## Where to change
- `InviteOrganizationStub` · CSS · harness `__THR04_FORCE_SCENE__`

## Out of scope
Org picker · ticket form · invent API
