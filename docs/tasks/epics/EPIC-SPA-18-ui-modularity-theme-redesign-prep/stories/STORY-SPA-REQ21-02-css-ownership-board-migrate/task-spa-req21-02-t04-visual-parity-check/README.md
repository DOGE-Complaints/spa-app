# SPA-REQ21-02-T04 — Visual parity check

**Status:** Done · P3 `2026-10-06T19:58:42Z`  
**Story:** [`../STORY-SPA-REQ21-02-css-ownership-board-migrate.md`](../STORY-SPA-REQ21-02-css-ownership-board-migrate.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-02 · AC-SPA-REQ2102-02  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T19:53:15Z`  
**Done:** `2026-10-06T19:58:42Z`  
**Package:** `pkg-000093`

## Purpose

Visual parity smoke after CSS migrate — existing board/shell selectors; no new artboard invent.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Vitest shell/page green | BoardPage.shell · IssuePage.integration · HowItWorksPage · AppShell.showSidebar — 17/17 |
| 2 | `npm run test:ui:board-shell` PASS | puppeteer selectors: board-shell, header-strip, board-main--no-sidebar, board-footer, no sidebar |

## AC / DoD

- [x] (P0) Visual parity via existing smoke — **AC-SPA-REQ2102-02**
- [x] (P0) No intentional baseline invent
- [x] (P0) No redesign invent

## Where changed

- Evidence only (this README)

## Out of scope

New mockup artboard · theme toggle

## Verification

```bash
cd spa-app && npm test -- --run BoardPage.shell IssuePage.integration HowItWorksPage AppShell.showSidebar
cd spa-app && npm run test:ui:board-shell
```
