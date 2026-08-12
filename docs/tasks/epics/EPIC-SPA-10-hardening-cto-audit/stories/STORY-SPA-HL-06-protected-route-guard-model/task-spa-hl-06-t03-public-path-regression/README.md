# SPA-HL-06-T03 — Public path regression (no login wall)

**Story:** [`../STORY-SPA-HL-06-protected-route-guard-model.md`](../STORY-SPA-HL-06-protected-route-guard-model.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md)  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Status:** Todo

## Purpose
Public board/issue remain without false overlay wall for guests.

## Risk
Break ID-13 / public home.

## Code Facts (re-verify at execute)
- sessionRoutePolicy PUBLIC_PATHS
- FR-HL-06.3

## AC / DoD
- [ ] Guest /#/board usable without Sign In Required overlay as primary UX
- [ ] Protected /profile still gated

## Where to change
- `tests and/or puppeteer smoke`

## Out of scope
- Full UAT

## Verification
```bash
npx vitest run src/router/__tests__/sessionRoutePolicy.test.js
```
