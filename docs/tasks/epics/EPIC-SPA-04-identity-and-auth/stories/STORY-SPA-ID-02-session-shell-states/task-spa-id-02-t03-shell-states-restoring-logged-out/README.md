# SPA-ID-02-T03 — Shell states Restoring + Logged Out (A, B)

**Story:** [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)  
**Decision Ref:** [mockup-124 State A + State B](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)  
**Depends on:** T01, T02  
**ui_scope:** `visual` · **ui_complexity:** `standard` · **extends:** T02 ui_anchor  
**Skill declared:** `react-expert`

## Purpose
Implement shell overlay panels for **State A** Restoring Session (skeleton, no giant spinner) and **State B** Logged Out (Sign In / Create Account / Continue to public board) — FR-02.1, FR-02.2.

## Risk
Blocking public board when logged out violates 2026-06-23 decision (FR-02.2).

## Code Facts (re-verify at execute)
- M124 State A: title «Restoring Session», skeleton sidebar/header/main, status «Checking session», no CTA.
- M124 State B: «Sign In Required», primary Sign In, secondary Create Account, optional «Continue To Public Board».
- [`LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx) — `/login` route exists (ID-01); CTAs link there.

## AC / DoD
- [ ] State A: skeleton in shell during `restoring` signal (FR-02.1; story AC #1, #2).
- [ ] State B: route-guard panel with recovery CTAs; friendly tone (story AC #3).
- [ ] «Continue to public board» navigates to `/#/board` without requiring auth (FR-02.2).
- [ ] `data-session-shell-state="restoring|logged_out"` on overlay root.
- [ ] No tokens/session payload in DOM (story AC #4).

## Where to change
- New: `spa-app/src/components/SessionShellState/` (RestoringPanel, LoggedOutPanel, CSS)
- Wire props from T01 resolver via context

## Out of scope
- States C/D/E (T04). App route orchestration (T05). Login form changes (ID-01).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/SessionShellState
cd spa-app && npm run dev
# dev toggle or mock resolver → states A and B visible in shell
```
