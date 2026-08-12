# SPA-PH-09-T01 — Contract: showSidebar + public constant

**Status:** Done — P3 PASS 2026-08-08T09:02:41Z  
**Story:** [`../STORY-SPA-PH-09-public-sidebar-display-mode.md`](../STORY-SPA-PH-09-public-sidebar-display-mode.md)  
**Decision Ref:** backlog FR-PH-09.1 · FR-PH-09.2 · AC restore path  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-08T08:52:31Z  
**Package:** `pkg-000057`

## Purpose
Зафиксировать контракт prop + `PUBLIC_SHELL_SHOW_SIDEBAR` и restore path в pipeline story (до кода).

## Risk
Implement без контракта → hard-delete drift или скрытый CSS-only hide.

## Code Facts (closed)
1. Pipeline §Contract: `showSidebar` default **true**; `PUBLIC_SHELL_SHOW_SIDEBAR` public SSOT **false**; restore = flip constant to true.
2. Pre-T02: [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx) had no `showSidebar` prop.

## AC / DoD
- [x] (P0) Pipeline §Contract documents `showSidebar` default true → FR-PH-09.1.
- [x] (P0) `PUBLIC_SHELL_SHOW_SIDEBAR` public SSOT = false; restore = flip to true → FR-PH-09.2 · AC #3.
- [x] (P0) No product SPA code in this task.

## Where to change
- [`../STORY-SPA-PH-09-public-sidebar-display-mode.md`](../STORY-SPA-PH-09-public-sidebar-display-mode.md) §Contract
- [`acceptance-verification-spa-ph-09-t01.md`](./acceptance-verification-spa-ph-09-t01.md)

## Out of scope
AppShell/CSS implement (T02); page wire (T03); hard-delete Sidebar.jsx.

## Verification
```bash
rg -n "showSidebar|PUBLIC_SHELL_SHOW_SIDEBAR|Restore path" spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/STORY-SPA-PH-09-public-sidebar-display-mode.md
```
