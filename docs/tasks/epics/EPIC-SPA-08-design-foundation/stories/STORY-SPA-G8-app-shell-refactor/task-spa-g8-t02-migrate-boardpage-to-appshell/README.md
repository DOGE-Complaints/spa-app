# SPA-G8-T02 — Migrate BoardPage to AppShell

**Status:** Done  
**Story:** [`../STORY-SPA-G8-app-shell-refactor.md`](../STORY-SPA-G8-app-shell-refactor.md)  
**Decision Ref:** backlog Scope bullet 2 (Board)  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-29T08:03:20Z

## Purpose
[BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx) использует AppShell; убрать дублированную разметку header/sidebar/locale.

## Risk
Потеря sync status / locale flags / active Board nav highlight.

## Code Facts (re-verify at execute)
- BoardPage ~L171–231: inline `header-strip`, locale menu, `board-sidebar` — no `AppShell` import.

## AC / DoD
- [ ] (P0) BoardPage renders shell via AppShell (Header/Sidebar/LanguageSelector).
- [ ] (P0) No duplicated inline header/sidebar/locale markup left in BoardPage.
- [ ] (P0) Behavior preserved: nav, locale flags, active route highlight.

## Where to change
- `spa-app/src/pages/BoardPage.jsx` (+ CSS only if required)

## Out of scope
- IssuePage (T03). New routes.

## Verification
```bash
rg 'AppShell|header-strip|header-locale' spa-app/src/pages/BoardPage.jsx
```

Gate: [`acceptance-verification-spa-g8-t02.md`](./acceptance-verification-spa-g8-t02.md)

Gate Date: 2026-07-29T08:27:15Z.
