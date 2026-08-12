# T08 completion — route-aware overlay on public routes

- **Status:** Done
- **Executed:** 2026-06-28 (P6 `run_mode=spa_id_02_audit_2026_06_28`)

## Product decision (backend/network on public)

**Route-aware bypass** — same as `logged_out` and `session_expired`: overlay only on protected routes (`/profile`, `/verify`, `/story/compose`). Public `/board` and `/issue/*` remain browsable without blocking overlay when identity is transiently unavailable (FR-02.2).

## Changes

- [`sessionShellState.js`](../../../../../../../../src/auth/sessionShellState.js) — `shouldShowSessionShellOverlay`: `session_expired`, `backend_unavailable`, `network_error` → overlay only when `isProtectedRoute`.
- [`sessionShellState.test.js`](../../../../../../../../src/auth/__tests__/sessionShellState.test.js) — matrix tests for three states × public/protected + restoring/login cases.

## Live verification

- `npx vitest run` → **220 passed**, 2 skipped (58 files)
- Audit F1 closed
