# SPA-REQ21-01-T05 — Shell / page tests

**Status:** Done · P3 `2026-10-06T19:33:20Z`  
**Story:** [`../STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../STORY-SPA-REQ21-01-shell-chrome-ownership.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-01 · AC-SPA-REQ2101-03  
**ui_scope:** `mixed`  
**extends:** ui-mockup (after brief)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T19:20:56Z`  
**Package:** `pkg-000092`

## Purpose

Vitest shell/page tests; selectors if DOM moved (AC-SPA-REQ2101-03).

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | Existing shell tests: BoardPage.shell, HowItWorks, Issue integration, AppShell.showSidebar |
| 2 | Selectors may break if chrome leaves page DOM |

## AC / DoD

- [x] (P0) Related vitest (/ puppeteer shell) green — **AC-SPA-REQ2101-03**
- [x] (P0) Selectors updated if DOM moved

## Where to change

- Shell/page test files under `spa-app` (paths confirmed in P3 via inventory)
- Optional puppeteer shell selectors

## Out of scope

Story gate write (T06) · ThemeToggle tests · invent new E2E suite

## Verification

```bash
cd spa-app && npm test -- --run BoardPage HowItWorks Issue AppShell 2>&1 | tail -40
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
