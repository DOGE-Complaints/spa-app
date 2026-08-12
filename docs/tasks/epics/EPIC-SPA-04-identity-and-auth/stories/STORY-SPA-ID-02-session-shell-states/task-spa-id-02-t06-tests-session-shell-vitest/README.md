# SPA-ID-02-T06 — Tests session shell (vitest)

**Story:** [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md)  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Vitest coverage: resolver signal → state mapping; component tests for shell state panels A–E; route policy tests.

## Risk
Missing regression tests allow shell states to break auth/public-board contract.

## Code Facts (re-verify at execute)
- Precedent: [`useAuthSession.test.js`](../../../../../../../../src/auth/__tests__/useAuthSession.test.js), [`LoginPage.postAudit.test.jsx`](../../../../../../../../src/pages/__tests__/LoginPage.postAudit.test.jsx).
- `npm run test:run` — existing vitest entry.

## AC / DoD
- [ ] Unit tests for `sessionShellState` resolver (getSession + /me error mapping) — story AC #1.
- [ ] Component tests: each state panel renders recovery CTA (story AC #3).
- [ ] Route policy: public board allowed when logged out (FR-02.2).
- [ ] `npm run test:run` full suite green.
- [ ] Optional: puppeteer shell smoke — document in task-completion (not blocking if infra missing; precedent ID-01-T07).

## Where to change
- New: `spa-app/src/auth/__tests__/sessionShellState.test.js`
- New: `spa-app/src/components/SessionShellState/__tests__/`
- New: `spa-app/src/router/__tests__/sessionRoutePolicy.test.js`

## Out of scope
- New features. Puppeteer infra fixes.

## Verification
```bash
cd spa-app && npm run test:run
cd spa-app && npm run test:run -- src/auth/__tests__/sessionShellState.test.js src/router/__tests__/sessionRoutePolicy.test.js
```
