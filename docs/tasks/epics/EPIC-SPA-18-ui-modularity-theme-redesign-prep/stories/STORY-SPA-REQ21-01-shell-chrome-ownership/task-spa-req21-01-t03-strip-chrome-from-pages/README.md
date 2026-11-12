# SPA-REQ21-01-T03 — Strip chrome from production pages

**Status:** Done · P3 `2026-10-06T19:33:20Z`  
**Story:** [`../STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../STORY-SPA-REQ21-01-shell-chrome-ownership.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-01 · AC-SPA-REQ2101-01  
**ui_scope:** `mixed`  
**extends:** ui-mockup (after brief)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T19:20:56Z`  
**Package:** `pkg-000092`

## Purpose

Убрать AppShell/Header/PublicFooter из production pages → только Outlet content.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | `BoardPage.jsx` imports AppShell/Header/PublicFooter/Sidebar |
| 2 | `IssuePage.jsx` / `HowItWorksPage.jsx` same imports + mounts |

## AC / DoD

- [x] (P0) Production pages do not import/mount AppShell chrome — **AC-SPA-REQ2101-01**
- [x] (P0) Pages render content only suitable for `<Outlet />`

## Where to change

- `src/pages/BoardPage.jsx`
- `src/pages/IssuePage.jsx`
- `src/pages/HowItWorksPage.jsx`

## Out of scope

Layout chrome implement (T02) · ThemeToggle · CSS migrate · features extract

## Verification

```bash
rg -n 'from .*/AppShell|AppShell|PublicFooter' spa-app/src/pages/{BoardPage,IssuePage,HowItWorksPage}.jsx | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
