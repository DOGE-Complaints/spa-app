# SPA-HL-06-T02 — Implement B or docs-only close if A

**Story:** [`../STORY-SPA-HL-06-protected-route-guard-model.md`](../STORY-SPA-HL-06-protected-route-guard-model.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md)  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Status:** Todo

## Purpose
If A: docs-only Done path. If B: unmount/redirect with next= preserved.

## Risk
B without next= breaks GPT handoff.

## Code Facts (re-verify at execute)
- T01 decision
- buildHandoffLoginPath / resolveHandoffReturnPath
- ID-13 public paths

## AC / DoD
- [ ] Code matches decision
- [ ] If A — explicit waive of code change

## Where to change
- `AppShellLayout.jsx`
- `sessionShellState.js`
- `possibly App.jsx`

## Out of scope
- Pixel sidebar
- HL-05 orphan alone

## Verification
```bash
npx vitest run src/router/__tests__/sessionRoutePolicy.test.js src/auth/__tests__/sessionShellState.test.js
```
