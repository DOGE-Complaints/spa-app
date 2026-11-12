# Story acceptance — SPA-BUG-06-T02 pin start × dist provenance

- **Task:** T02
- **Result:** PASS
- **Date:** 2026-08-18T10:18:16Z
- **Package:** `pkg-000071-20260818-epic-spa-10-bug-06-stale-placeholder-bake.yaml`

## Pin (FR-BUG-06.2)

Pinned layer = **SPA start contract / dist provenance** (H6). Not CORS, not LoginPage/BoardPage/`mapAuthError`, not gateway/identity product code.

| Observation | Pin | Fix |
|-------------|-----|-----|
| `serve` + placeholder bake + operator `.env` localhost | start / dist | fail-fast + bake-meta from artifact (T03) |
| Patch Login/Board for `.example.invalid` | UI anti-pattern | **Forbidden** |
| Weaken `FORBIDDEN_LOCALHOST` | deploy anti-pattern | **Forbidden** |

## AC

| AC | Status | Evidence |
|----|--------|----------|
| Pin layer = SPA start / dist provenance (gate note) | PASS | this file + T05 pin note |
