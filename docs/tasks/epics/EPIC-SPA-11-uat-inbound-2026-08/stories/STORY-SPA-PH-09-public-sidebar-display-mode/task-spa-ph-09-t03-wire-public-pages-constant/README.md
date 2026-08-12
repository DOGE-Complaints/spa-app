# SPA-PH-09-T03 — Wire public pages to constant

**Status:** Done — P3 PASS 2026-08-08T09:04:55Z  
**Story:** [`../STORY-SPA-PH-09-public-sidebar-display-mode.md`](../STORY-SPA-PH-09-public-sidebar-display-mode.md)  
**Decision Ref:** backlog FR-PH-09.2 · FR-PH-09.3 · FR-PH-09.4  
**Depends on:** SPA-PH-09-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-08T08:52:31Z  
**Package:** `pkg-000057`

## Purpose
Board / HIW / Issue → `PUBLIC_SHELL_SHOW_SIDEBAR` (= false); header nav remains.

## Code Facts (closed)
1. [`publicShell.js`](../../../../../../../src/config/publicShell.js): `PUBLIC_SHELL_SHOW_SIDEBAR = false`.
2. Board / HowItWorks / Issue pass `showSidebar={PUBLIC_SHELL_SHOW_SIDEBAR}`.
3. Board/Issue shell tests expect no `.board-sidebar`.

## AC / DoD
- [x] (P0) SSOT constant false → FR-PH-09.2 · AC #3.
- [x] (P0) Public routes wired → FR-PH-09.3 · AC #1.
- [x] (P0) Header nav present → FR-PH-09.4.

## Verification
```bash
rg -n "PUBLIC_SHELL_SHOW_SIDEBAR|showSidebar" spa-app/src/pages spa-app/src/config
```
