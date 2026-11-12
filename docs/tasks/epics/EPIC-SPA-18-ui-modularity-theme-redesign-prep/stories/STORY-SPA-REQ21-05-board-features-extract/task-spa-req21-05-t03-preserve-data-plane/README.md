# SPA-REQ21-05-T03 — Preserve data plane (AC-21-06)

**Status:** Done · P3 `2026-10-06T20:59:52Z`  
**Story:** [`../STORY-SPA-REQ21-05-board-features-extract.md`](../STORY-SPA-REQ21-05-board-features-extract.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T20:47:18Z`  
**Done:** `2026-10-06T20:59:52Z`  
**Package:** `pkg-000096`

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Same data plane | BoardPage still uses `issueService` · `boardQuery` · `useBoardFilterDraft` |
| 2 | No new repos in features | `rg` empty under `src/features/board` |

## AC / DoD

- [x] (P0) Same data plane entrypoints
- [x] (P0) No new repositories/clients (AC-SPA-REQ2105-03)
