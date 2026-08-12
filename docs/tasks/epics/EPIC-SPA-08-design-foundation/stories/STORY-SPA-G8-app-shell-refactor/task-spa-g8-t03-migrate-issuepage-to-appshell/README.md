# SPA-G8-T03 — Migrate IssuePage to AppShell

**Status:** Done  
**Story:** [`../STORY-SPA-G8-app-shell-refactor.md`](../STORY-SPA-G8-app-shell-refactor.md)  
**Decision Ref:** backlog Scope bullet 2 (Issue)  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-29T08:03:20Z

## Purpose
[IssuePage.jsx](../../../../../../../src/pages/IssuePage.jsx) использует AppShell; убрать дублированную разметку header/sidebar/locale.

## Risk
Потеря back-to-board / nav active semantics; footer placement drift.

## Code Facts (re-verify at execute)
- IssuePage ~L213–272: inline shell mirrored from BoardPage; no `AppShell` import.

## AC / DoD
- [ ] (P0) IssuePage renders shell via AppShell.
- [ ] (P0) No duplicated inline header/sidebar/locale markup left in IssuePage.
- [ ] (P0) Behavior preserved: nav, locale flags, active highlight; board back link intact.

## Where to change
- `spa-app/src/pages/IssuePage.jsx`

## Out of scope
- BoardPage (T02). Identity routes.

## Verification
```bash
rg 'AppShell|header-strip|header-locale' spa-app/src/pages/IssuePage.jsx
```

Gate: [`acceptance-verification-spa-g8-t03.md`](./acceptance-verification-spa-g8-t03.md)

Gate Date: 2026-07-29T08:27:15Z.
