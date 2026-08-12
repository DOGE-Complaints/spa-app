# SPA-HL-06-T01 — Product decision A overlay vs B unmount/redirect

**Story:** [`../STORY-SPA-HL-06-protected-route-guard-model.md`](../STORY-SPA-HL-06-protected-route-guard-model.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md)  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `architecture-designer`  
**Status:** Todo

## Purpose
Записать ADR/note: A keep overlay-only OR B unmount/redirect until auth.

## Risk
Implement without decision thrash.

## Code Facts (re-verify at execute)
- AppShellLayout Outlet+overlay
- shouldShowSessionShellOverlay
- audit F5
- PUBLIC_PATHS sessionRoutePolicy

## AC / DoD
- [ ] Decision A or B with why
- [ ] Impact on handoff next= noted

## Where to change
- `docs/analysis/ or pipeline story`

## Out of scope
- Code (T02)

## Verification
```bash
Decision doc exists
```
