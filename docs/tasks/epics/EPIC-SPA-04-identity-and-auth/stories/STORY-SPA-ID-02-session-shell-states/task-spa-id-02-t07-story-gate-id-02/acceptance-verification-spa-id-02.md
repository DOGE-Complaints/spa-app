# Story acceptance gate — STORY-SPA-ID-02-session-shell-states

- **Story:** STORY-SPA-ID-02 — Session Shell States (app-level)
- **Package:** `pkg-000016-20260628-epic-spa-04-id02-session-shell-states.yaml`
- **Result:** PASS
- **Date:** 2026-06-28

## AC checklist (verbatim from pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| 5 shell-состояний реализованы и маппятся на runtime-сигналы (getSession/GET /me/401/network) | PASS | [`sessionShellState.js`](../../../../../../../src/auth/sessionShellState.js), [`useSessionShellState.js`](../../../../../../../src/auth/useSessionShellState.js); vitest 6+2 tests (2026-06-28) |
| Ни одно состояние не даёт белый экран/коллапс layout; shell виден всегда | PASS | [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx); overlay in shell/main; board pass-through preserves existing shell |
| Каждое состояние имеет явный recovery-CTA; без обвиняющего тона | PASS | [`SessionShellPanels.jsx`](../../../../../../../src/components/SessionShellState/SessionShellPanels.jsx) — Sign In, Retry, Continue to public board; component tests green |
| Не показываются токены/сырой session payload (privacy §9) | PASS | Hook exposes `shellState` + safe `profile` fields only; no access_token in panel DOM |

## UI verification (M124)

| State | Panel | data-session-shell-state |
|-------|-------|--------------------------|
| A Restoring | RestoringSessionPanel | `restoring` |
| B Logged Out | LoggedOutPanel | `logged_out` |
| C Session Expired | SessionExpiredPanel | `session_expired` |
| D Backend Unavailable | BackendUnavailablePanel | `backend_unavailable` |
| E Network Error | NetworkErrorPanel | `network_error` |

## Commands (live verification 2026-06-28)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
```

## Task closure

| Task | Status |
|------|--------|
| T01 resolver | Done |
| T02 AppShell M124 | Done |
| T03 states A+B | Done |
| T04 states C+D+E | Done |
| T05 route integration | Done |
| T06 vitest | Done |
| T07 story gate | Done |
