# SPA-REQ21-01-T04 — Nav parity + PH-09

**Status:** Done · P3 `2026-10-06T19:33:20Z`  
**Story:** [`../STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../STORY-SPA-REQ21-01-shell-chrome-ownership.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-01 · AC-SPA-REQ2101-02  
**ui_scope:** `mixed`  
**extends:** ui-mockup (after brief)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T19:20:56Z`  
**Package:** `pkg-000092`

## Purpose

Nav + PH-09 sidebar-off + session overlay parity after chrome host move.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | `PUBLIC_SHELL_SHOW_SIDEBAR = false` PH-09 SSOT |
| 2 | Session overlay via `AppShellLayout` + `SessionShellOverlay` |
| 3 | `sessionRoutePolicy` public/protected paths |

## AC / DoD

- [x] (P0) Public + protected visual/nav parity; PH-09 preserved — **AC-SPA-REQ2101-02**
- [x] (P0) Session overlay parity unchanged for protected/login paths

## Where to change

- `src/layout/AppShellLayout.jsx`
- `src/config/publicShell.js`
- `src/router/sessionRoutePolicy.js`
- Header/Sidebar nav config as needed (no new routes)

## Out of scope

ThemeToggle · `#/next` · HashRouter change · visual redesign

## Verification

```bash
rg -n 'PUBLIC_SHELL_SHOW_SIDEBAR|shouldShowSessionShellOverlay|isPublicPath' spa-app/src --glob '*.{js,jsx}' | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
