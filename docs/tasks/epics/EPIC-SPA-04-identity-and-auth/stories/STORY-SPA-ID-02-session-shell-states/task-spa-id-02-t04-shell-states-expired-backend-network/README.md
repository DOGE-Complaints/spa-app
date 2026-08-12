# SPA-ID-02-T04 — Shell states Expired + Backend + Network (C, D, E)

**Story:** [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)  
**Decision Ref:** [mockup-124 State C/D/E](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)  
**Depends on:** T01, T02  
**ui_scope:** `visual` · **ui_complexity:** `standard` · **extends:** T02 ui_anchor  
**Skill declared:** `react-expert`

## Purpose
Implement overlay panels for **State C** Session Expired, **State D** Backend Unavailable, **State E** Network Error — FR-02.3, FR-02.4, FR-02.5.

## Risk
Generic error tone or missing Retry breaks recoverability (story AC #3).

## Code Facts (re-verify at execute)
- M124 State C: «Session Expired», Sign In Again; optional «Previous Action: Waiting» block.
- M124 State D: `BACKEND_UNAVAILABLE`, Retry + «View System Status»; optional `GET /ready` (story API-интеграция).
- M124 State E: `NETWORK_ERROR`, Retry.
- No `GET /ready` client in `src/` at intake.

## AC / DoD
- [ ] State C/D/E components with recovery CTAs (story AC #1, #3).
- [ ] D: Retry re-triggers resolver/`fetchMe`; optional `GET /ready` for status link (FR-02.4).
- [ ] E: Retry on network failure (FR-02.5).
- [ ] Shell containers remain visible (FR-02.6; story AC #2).
- [ ] No token/session payload display (story AC #4).

## Where to change
- Extend: `spa-app/src/components/SessionShellState/` (ExpiredPanel, BackendUnavailablePanel, NetworkErrorPanel)
- Optional: `spa-app/src/auth/identityReadyClient.js` for `GET /ready`

## Out of scope
- Verification-specific errors (ID-05). States A/B (T03). Route integration (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/SessionShellState
# mock identity errors → C/D/E panels render with Retry CTAs
```
