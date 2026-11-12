# SPA-REQ21-01-T08 — Missing artboard-state PNGs (F2)

**Status:** Done · P6 `2026-10-06T19:48:21Z`  
**Story:** [`../STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../STORY-SPA-REQ21-01-shell-chrome-ownership.md)  
**Decision Ref:** [audit-STORY-SPA-REQ21-01-execution-2026-10-06.md](../../../../../../analysis/audit-STORY-SPA-REQ21-01-execution-2026-10-06.md) · F2 Medium  
**ui_scope:** `mixed` (docs/visual only · no product chrome rewrite)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T19:38:28Z`  
**Done:** `2026-10-06T19:48:21Z`  
**Package:** `pkg-000092` (unchanged · `run_mode=spa_req21_01_audit_2026_10_06`)  
**Gap:** F2 → **CLOSED**

## Purpose

Capture three full-cycle PNGs for artboard must-states: public issue, protected/workspace sidebar-on, session overlay atop layout. Update screenshots README matrix.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Issue chrome PNG Present | [`../screenshots/full-cycle/03-issue-chrome-back-1536x1024.png`](../screenshots/full-cycle/03-issue-chrome-back-1536x1024.png) |
| 2 | Protected sidebar-on PNG Present | [`../screenshots/full-cycle/04-protected-workspace-sidebar-1536x1024.png`](../screenshots/full-cycle/04-protected-workspace-sidebar-1536x1024.png) |
| 3 | Session overlay PNG Present | [`../screenshots/full-cycle/05-session-overlay-1536x1024.png`](../screenshots/full-cycle/05-session-overlay-1536x1024.png) |
| 4 | Matrix rows in story README | [`../screenshots/README.md`](../screenshots/README.md) |
| 5 | No product `src/` | this P6 docs/visual only |

## AC / DoD

- [x] (P0) `full-cycle/` issue PNG — layout chrome + content back region
- [x] (P0) `full-cycle/` protected/workspace PNG — default AppShell sidebar-on
- [x] (P0) `full-cycle/` session-overlay PNG — overlay over layout chrome
- [x] (P0) Story screenshots README lists all three
- [x] (P0) No product `src/` change
- [x] (P0) Gap F2 CLOSED

## Where changed

- `…/screenshots/full-cycle/03-*.png` · `04-*.png` · `05-*.png`
- `…/screenshots/README.md` matrix

## Out of scope

Board/HIW footer pack (T07) · ThemeToggle / CSS migrate · redesign invent · pkg edit

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-01-shell-chrome-ownership/screenshots/full-cycle/0{3,4,5}-*.png
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
