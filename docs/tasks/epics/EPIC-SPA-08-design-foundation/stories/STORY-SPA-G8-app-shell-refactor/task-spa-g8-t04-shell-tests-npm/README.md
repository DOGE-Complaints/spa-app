# SPA-G8-T04 — Shell tests + npm test

**Status:** Done  
**Story:** [`../STORY-SPA-G8-app-shell-refactor.md`](../STORY-SPA-G8-app-shell-refactor.md)  
**Decision Ref:** backlog Scope bullet 4; AC `npm test`  
**Depends on:** T02–T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-29T08:03:20Z

## Purpose
Обновить/добавить shell-тесты (`BoardPage.shell`, `IssuePage.integration`, AppShell) и получить зелёный `npm test`.

## Risk
Устаревшие assertions на inline `header-strip` разметку → false fail после миграции.

## Code Facts (re-verify at execute)
- [BoardPage.shell.test.jsx](../../../../../../../src/pages/__tests__/BoardPage.shell.test.jsx) expects `class="header-strip"`.
- [IssuePage.integration.test.jsx](../../../../../../../src/pages/__tests__/IssuePage.integration.test.jsx) expects `header-strip`.

## AC / DoD
- [ ] (P0) Shell tests updated for AppShell composition (still assert parity selectors as appropriate).
- [ ] (P0) `npm test` green.

## Where to change
- `spa-app/src/pages/__tests__/BoardPage.shell.test.jsx`
- `spa-app/src/pages/__tests__/IssuePage.integration.test.jsx`
- Optional new `spa-app/src/components/AppShell/__tests__/`

## Out of scope
- Visual screenshots (T05). Docs (T06).

## Verification
```bash
cd spa-app && npm test
```

Gate: [`acceptance-verification-spa-g8-t04.md`](./acceptance-verification-spa-g8-t04.md)

Gate Date: 2026-07-29T08:27:15Z.
