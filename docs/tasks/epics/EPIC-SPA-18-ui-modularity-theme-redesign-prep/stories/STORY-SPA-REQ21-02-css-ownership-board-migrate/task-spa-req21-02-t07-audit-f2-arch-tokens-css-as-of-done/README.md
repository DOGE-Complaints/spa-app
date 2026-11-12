# SPA-REQ21-02-T07 — Arch tokens CSS As-of-Done (F2)

**Status:** Done · P6 `2026-10-06T20:02:11Z`  
**Story:** [`../STORY-SPA-REQ21-02-css-ownership-board-migrate.md`](../STORY-SPA-REQ21-02-css-ownership-board-migrate.md)  
**Decision Ref:** [audit-STORY-SPA-REQ21-02-execution-2026-10-06.md](../../../../../../analysis/audit-STORY-SPA-REQ21-02-execution-2026-10-06.md) · F2 Medium  
**ui_scope:** `none` (docs only · no product CSS rewrite)  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T20:02:11Z`  
**Done:** `2026-10-06T20:02:11Z`  
**Package:** `pkg-000093` (unchanged · `run_mode=spa_req21_02_audit_2026_10_06`)  
**Gaps:** F2 → **CLOSED**

## Purpose

Update arch `02-tokens-theme-css.md` §3 ownership + §4 As-is to post-REQ21-02 (reset-only `index.css` · homes AppShell / BoardPage / IssuePage). No migrate-imperative «today dump».

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | §3 index.css = reset+imports (not dump) | [`02-tokens-theme-css.md`](../../../../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md) §3 |
| 2 | §3/§4 homes AppShell / BoardPage / IssuePage | same |
| 3 | No product `src/` | this P6 docs only |

## AC / DoD

- [x] (P0) §3 no «~563 LOC dump today» present-tense
- [x] (P0) §4 As-is CSS ownership post-REQ21-02
- [x] (P0) No product `src/` / theme invent
- [x] (P0) Gap F2 CLOSED

## Where changed

- `spa-app/docs/architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md`
- soft: bullrun

## Out of scope

Backlog SSOT (T06) · ThemeToggle / `data-theme` implement · product CSS · pkg edit

## Verification

```bash
rg -n "563|BoardPage.css|reset" spa-app/docs/architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
