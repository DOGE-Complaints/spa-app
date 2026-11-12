# SPA-REQ21-03-T06 — Arch theme locks As-of-Done (F1+F2)

**Status:** Done · P6 `2026-10-06T20:17:57Z`  
**Story:** [`../STORY-SPA-REQ21-03-theme-tokens-data-theme.md`](../STORY-SPA-REQ21-03-theme-tokens-data-theme.md)  
**Decision Ref:** [audit-STORY-SPA-REQ21-03-execution-2026-10-06.md](../../../../../../analysis/audit-STORY-SPA-REQ21-03-execution-2026-10-06.md) · F1 Medium · F2 Low  
**ui_scope:** `none` (docs only · no product theme rewrite)  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T20:17:57Z`  
**Done:** `2026-10-06T20:17:57Z`  
**Package:** `pkg-000094` (unchanged · `run_mode=spa_req21_03_audit_2026_10_06`)  
**Gaps:** F1 + F2 → **CLOSED**

## Purpose

Align arch `02-tokens-theme-css.md` §1 locks (persistence OOS→REQ21-04; boot = default dark only) and §3 note (data-theme no longer OOS) with As-of-Done REQ21-03 / §4.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | §1 Persistence reserved · R/W OOS→04 | [`02-tokens-theme-css.md`](../../../../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md) §1 |
| 2 | §1 Boot = default dark until 04 | same |
| 3 | §3 Historical pre-03 + As-of-Done 03 pointer | same §3 |
| 4 | No product `src/` | this P6 docs only |

## AC / DoD

- [x] (P0) §1 no «persistence now» / no «read storage early» as current REQ21-03 fact
- [x] (P0) §3 no present-tense «data-theme OOS→REQ21-03+»
- [x] (P0) No ThemeToggle / `dogestonia.theme` R/W invent
- [x] (P0) Gaps F1 + F2 CLOSED

## Where changed

- `spa-app/docs/architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md`
- soft: bullrun · Spa_builder override

## Out of scope

Product CSS · ThemeToggle · live vitest reopen (F3 WAIVED) · residual hex (F4 WAIVED) · pkg edit

## Verification

```bash
rg -n "Persistence|OOS|REQ21-03|REQ21-04|read storage" spa-app/docs/architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
