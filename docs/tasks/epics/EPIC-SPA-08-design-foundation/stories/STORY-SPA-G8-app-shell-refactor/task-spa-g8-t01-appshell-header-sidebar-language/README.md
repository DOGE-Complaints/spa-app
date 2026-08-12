# SPA-G8-T01 — AppShell Header / Sidebar / LanguageSelector

**Status:** Done  
**Story:** [`../STORY-SPA-G8-app-shell-refactor.md`](../STORY-SPA-G8-app-shell-refactor.md)  
**Decision Ref:** backlog Scope bullet 1; design-system §4.1/4.2  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-29T08:03:20Z

## Purpose
Добавить `Header.jsx`, `Sidebar.jsx`, `LanguageSelector.jsx` (re-export `LocaleSelector`) под `src/components/AppShell/`; скомпоновать board chrome в слоты/defaults `AppShell` без поломки cabinet `AppShellLayout`.

## Risk
Сломать cabinet shell (profile NavLinks) или изменить Board chrome при выносе.

## Code Facts (re-verify at execute)
- [AppShell.jsx](../../../../../../../src/components/AppShell/AppShell.jsx) exists; used by [AppShellLayout.jsx](../../../../../../../src/layout/AppShellLayout.jsx).
- No `Header.jsx` / `Sidebar.jsx` under AppShell yet.
- [LocaleSelector.jsx](../../../../../../../src/components/LocaleSelector/LocaleSelector.jsx) exists; Board/Issue still inline locale.

## AC / DoD
- [ ] (P0) `AppShell/Header.jsx`, `Sidebar.jsx`, `LanguageSelector.jsx` exist.
- [ ] (P0) Board chrome (sync status, flag locale, Board/Issues/Settings nav) available via AppShell slots/composition without changing cabinet default nav semantics.
- [ ] (P0) Exports updated in `AppShell/index.js` as needed.

## Where to change
- NEW `spa-app/src/components/AppShell/Header.jsx`, `Sidebar.jsx`, `LanguageSelector.jsx` (+ CSS if needed)
- EXTEND `AppShell.jsx`, `index.js`

## Out of scope
- BoardPage / IssuePage migration (T02–T03). Identity routes.

## Verification
```bash
ls spa-app/src/components/AppShell/
rg 'Header|Sidebar|LanguageSelector' spa-app/src/components/AppShell/
```

Gate: [`acceptance-verification-spa-g8-t01.md`](./acceptance-verification-spa-g8-t01.md)

Gate Date: 2026-07-29T08:27:15Z.
