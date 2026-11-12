# SPA-REQ21-02-T02 — Move shell-related rules

**Status:** Done · P3 `2026-10-06T19:58:42Z`  
**Story:** [`../STORY-SPA-REQ21-02-css-ownership-board-migrate.md`](../STORY-SPA-REQ21-02-css-ownership-board-migrate.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-02 · AC-SPA-REQ2102-01  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T19:53:15Z`  
**Done:** `2026-10-06T19:58:42Z`  
**Package:** `pkg-000093`

## Purpose

Перенос shell-related rules из `index.css` → `AppShell/*.css` (+ locale chrome → LocaleSelector.css). Behavior-preserving.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Shell layout/chrome in AppShell.css | `src/components/AppShell/AppShell.css` (board-main, sidebar, header-strip, board-footer, …) |
| 2 | header-locale* in LocaleSelector.css | `src/components/LocaleSelector/LocaleSelector.css` |
| 3 | AppShell already imports AppShell.css | `AppShell.jsx` |

## AC / DoD

- [x] (P0) Shell-classified rules under AppShell / LocaleSelector — **AC-SPA-REQ2102-01** (partial)
- [x] (P0) Behavior-preserving (no redesign invent)
- [x] (P0) Styles load via existing component imports

## Where changed

- `src/components/AppShell/AppShell.css`
- `src/components/LocaleSelector/LocaleSelector.css`
- `src/index.css` (rules removed; completed with T03)

## Out of scope

Feature/page move (T03) · theme

## Verification

```bash
rg -n 'board-main|header-strip' spa-app/src/components/AppShell/AppShell.css | head
rg -c '\\.board-' spa-app/src/index.css || true
```
