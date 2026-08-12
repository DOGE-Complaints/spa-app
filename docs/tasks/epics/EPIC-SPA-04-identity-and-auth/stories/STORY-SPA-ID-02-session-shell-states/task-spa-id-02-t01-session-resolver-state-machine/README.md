# SPA-ID-02-T01 — Session resolver state machine

**Story:** [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md); [mockup-124 §API mapping](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)  
**Depends on:** — (first task in wave)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Enum + resolver: `getSession()` → `restoring` / `logged_out` / `authenticated`; on authenticated → `GET /me` mapping per story API-интеграция (401 + token → `session_expired`; network/5xx → `backend_unavailable` / `network_error`).

## Risk
Wrong signal mapping → wrong shell state (white screen or false logged-out on public board).

## Code Facts (re-verify at execute)
- [`useAuthSession.js`](../../../../../../../../src/auth/useAuthSession.js) — `loading` + session only; no `/me`, no shell enum.
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — `fetchMe`, `AuthenticationRequiredError`, `IdentityApiError('network_error')`.
- grep `session_expired|sessionShellState|BACKEND_UNAVAILABLE` in `src/` → 0 at intake.

## AC / DoD
- [ ] `sessionShellState.js` (or equivalent) exports shell state enum + resolver helpers (story AC #1).
- [ ] `useSessionShellState` hook (or extend auth context) — never exposes raw tokens/session JSON to UI (story AC #4).
- [ ] Mapping matches backlog «API-интеграция» bullets verbatim.
- [ ] Does not change login form logic (ID-01 out of scope).

## Where to change
- New: `spa-app/src/auth/sessionShellState.js`
- New or extend: `spa-app/src/auth/useSessionShellState.js` (or extend `AuthSessionContext.jsx`)
- Tests stub in T06 — unit tests for resolver here optional minimal smoke

## Out of scope
- Shell UI components (T02–T04). Route wiring (T05). Login form (ID-01).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/sessionShellState.test.js
# after T06: full npm run test:run
```
