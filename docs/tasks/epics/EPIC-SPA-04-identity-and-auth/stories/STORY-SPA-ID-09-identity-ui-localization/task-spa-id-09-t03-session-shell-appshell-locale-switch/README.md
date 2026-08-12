# SPA-ID-09-T03 — Session shell, AppShell, locale switch (ID-02)

**Story:** [`../STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) Scope ID-02, §`session.*`, `appShell.footer`  
**Depends on:** T01 (dictionary keys)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:51:38Z

## Purpose
Localize session shell panels and AppShell footer. Expose locale selector on identity routes (`/login` and shell-wrapped hosts) so FR-09.6 immediate locale switch works outside Board/Issue.

## Risk
Session overlays stay EN on `et` default locale. Users on `/login` cannot switch language without navigating to `/board`.

## Code Facts (re-verify at execute)
- [`SessionShellPanels.jsx`](../../../../../../../../src/components/SessionShellState/SessionShellPanels.jsx) — inline EN session copy; grep `useI18n` → 0.
- [`SessionShellOverlay.jsx`](../../../../../../../../src/components/SessionShellState/SessionShellOverlay.jsx) — same.
- [`AppShell.jsx`](../../../../../../../../src/components/AppShell/AppShell.jsx) — footer literal «DOGEstonia civic platform» (or equivalent EN).
- [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — `LOCALE_SELECTOR_OPTIONS` + `setLocale` pattern to reuse.
- grep `setLocale` in `spa-app/src/` → only BoardPage, IssuePage at intake.

## AC / DoD
- [ ] (P0) Session states A–E strings use `t('session.*')` + `formatI18nMessage` for `{status}` (story AC #1, FR-09.1, FR-09.5).
- [ ] (P0) `appShell.footer` via `t('appShell.footer')` (story AC #1).
- [ ] (P0) Locale selector available on `/login` (AppShell or LoginPage); `setLocale` re-renders session/login copy (story AC #3, FR-09.6).
- [ ] (P1) `session.statusReady` interpolation uses helper from T01.

## Where to change
- `spa-app/src/components/SessionShellState/SessionShellPanels.jsx`
- `spa-app/src/components/SessionShellState/SessionShellOverlay.jsx`
- `spa-app/src/components/AppShell/AppShell.jsx`
- Optional shared: `spa-app/src/components/LocaleSelector.jsx` (extract from Board pattern)

## Out of scope
- Login form strings (T02). Civic/phone (T04–T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/SessionShellState
# manual: /login → switch et/ru/en → session overlay copy updates
```
