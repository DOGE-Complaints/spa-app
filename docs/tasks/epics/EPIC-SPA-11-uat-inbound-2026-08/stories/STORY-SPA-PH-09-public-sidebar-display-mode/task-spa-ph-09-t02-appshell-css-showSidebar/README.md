# SPA-PH-09-T02 — AppShell + CSS showSidebar

**Status:** Done — P3 PASS 2026-08-08T09:04:55Z · ui_anchor  
**Story:** [`../STORY-SPA-PH-09-public-sidebar-display-mode.md`](../STORY-SPA-PH-09-public-sidebar-display-mode.md)  
**Decision Ref:** backlog FR-PH-09.1 · AC public / narrow  
**Depends on:** SPA-PH-09-T01  
**ui_scope:** `chrome`  
**ui_complexity:** `standard`  
**ui_anchor:** true  
**UI routes:** `/#/board`  
**puppeteer_gate:** `test:ui:board-shell` PASS  
**@mockup:** inbound Without Left Sidebar + Path A [`ui-mockup-spec.md`](./ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-08T08:52:31Z  
**Package:** `pkg-000057`

## Purpose
Implement `showSidebar` prop: when false, **no** `<aside>` in DOM; main full-width.

## Code Facts (closed)
1. [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx): `showSidebar=true` default; conditional aside; `board-main--no-sidebar` + `data-show-sidebar`.
2. [`index.css`](../../../../../../../src/index.css): `.board-main--no-sidebar { grid-template-columns: 1fr }`.
3. Vitest: [`AppShell.showSidebar.test.jsx`](../../../../../../../src/components/AppShell/__tests__/AppShell.showSidebar.test.jsx) 2/2.
4. UI-0/3: [`ui-baseline/`](./ui-baseline/) · [`post-implement/`](./ui-baseline/post-implement/).

## AC / DoD
- [x] (P0) `showSidebar=false` → no aside / no `.board-sidebar` → FR-PH-09.1 · AC #1.
- [x] (P0) default true → sidebar present → FR-PH-09.1.
- [x] (P0) full-width + narrow evidence → AC #4.
- [x] (P0) component tests + `test:ui:board-shell` PASS.

## Verification
```bash
cd spa-app && npm test -- --run src/components/AppShell/__tests__/AppShell.showSidebar.test.jsx
cd spa-app && npm run test:ui:board-shell
```
