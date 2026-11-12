# SPA-REQ21-04-T01 — Theme storage helper (`dogestonia.theme`)

**Status:** Done · P3 `2026-10-06T20:27:07Z`  
**Story:** [`../STORY-SPA-REQ21-04-theme-toggle-header.md`](../STORY-SPA-REQ21-04-theme-toggle-header.md)  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T20:21:56Z`  
**Done:** `2026-10-06T20:27:07Z`  
**Package:** `pkg-000095`

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | read/write `dogestonia.theme` | [`bootTheme.js`](../../../../../../../src/theme/bootTheme.js) `readStoredTheme` / `writeStoredTheme` |
| 2 | Boot prefers storage | `applyDefaultTheme` · FOUC in `index.html` |
| 3 | No OS theme | no `prefers-color-scheme` |

## AC / DoD

- [x] (P0) read/write `dogestonia.theme`
- [x] (P0) Boot prefers storage; else dark
- [x] (P0) No account sync / OS invent
