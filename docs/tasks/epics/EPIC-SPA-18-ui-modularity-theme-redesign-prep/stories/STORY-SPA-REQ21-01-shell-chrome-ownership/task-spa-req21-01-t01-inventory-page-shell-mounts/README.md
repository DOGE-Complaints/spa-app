# SPA-REQ21-01-T01 — Inventory page shell mounts

**Status:** Done · P3 `2026-10-06T19:33:20Z`  
**Story:** [`../STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../STORY-SPA-REQ21-01-shell-chrome-ownership.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-01 · AC-SPA-REQ2101-01  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T19:20:56Z`  
**Package:** `pkg-000092`

## Purpose

Inventory: Board/Issue/HowItWorks AppShell mounts + layout pass-through (`BoardPage.jsx:198+`, `AppShellLayout.jsx:30–49`).

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | `BoardPage.jsx` mounts AppShell ~198–205 |
| 2 | `IssuePage.jsx` / `HowItWorksPage.jsx` same pattern |
| 3 | `AppShellLayout.jsx` public pass-through ~30–49 |

## AC / DoD

- [x] (P0) Documented mount sites for three production pages + layout branch — **AC-SPA-REQ2101-01**
- [x] (P0) Note PH-09 / `PUBLIC_SHELL_SHOW_SIDEBAR` touchpoints for T02

## Where to change

- Read-only inventory notes in task / story facts (no product change required if T02/T03 implement)

## Out of scope

Layout implement (T02) · strip pages (T03) · ThemeToggle · CSS migrate

## Verification

```bash
rg -n 'AppShell|PublicFooter|app-shell-pass-through' spa-app/src/pages spa-app/src/layout --glob '*.jsx' | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
