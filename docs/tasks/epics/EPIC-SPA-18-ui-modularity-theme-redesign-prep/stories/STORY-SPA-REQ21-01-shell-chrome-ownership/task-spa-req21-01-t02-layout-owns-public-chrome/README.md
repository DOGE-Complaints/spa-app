# SPA-REQ21-01-T02 — Layout owns public chrome

**Status:** Done · P3 `2026-10-06T19:33:20Z`  
**Story:** [`../STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../STORY-SPA-REQ21-01-shell-chrome-ownership.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-01 · AC-SPA-REQ2101-01/02  
**ui_scope:** `mixed`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T19:20:56Z`  
**Package:** `pkg-000092`  
**UX:** after brief accepted — `@mockup:` from [STORY-UX-MOCKUP-BRIEF.md](../STORY-UX-MOCKUP-BRIEF.md)

## Purpose

`AppShellLayout`: always chrome; public/workspace props; read `PUBLIC_SHELL_SHOW_SIDEBAR` / `sessionRoutePolicy`.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | Today public → pass-through (`AppShellLayout.jsx:45–49`) |
| 2 | Protected → `<AppShell>{content}</AppShell>` |
| 3 | `PUBLIC_SHELL_SHOW_SIDEBAR = false` in `publicShell.js` |

## AC / DoD

- [x] (P0) Layout owns Header/Footer/(Sidebar) for public + protected — **AC-SPA-REQ2101-01/02**
- [x] (P0) PH-09 sidebar-off respected via flag / props
- [x] (P0) Session overlay still works with layout-owned chrome

## Where to change

- `src/layout/AppShellLayout.jsx`
- `src/config/publicShell.js` (read / wire only)
- `src/router/sessionRoutePolicy.js` (read / wire only)
- `src/components/AppShell/*` as needed for slots

## Out of scope

Strip page mounts (T03) · ThemeToggle · visual redesign pixels

## Verification

```bash
rg -n 'AppShell|PUBLIC_SHELL_SHOW_SIDEBAR|app-shell-pass-through' spa-app/src/layout spa-app/src/config --glob '*.{js,jsx}' | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
