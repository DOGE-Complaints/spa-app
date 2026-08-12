# SPA-PH-01-T05 — Mobile nav menu + ic-nav-menu

**Status:** Done — P3 PASS 2026-08-04T07:07:39Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** backlog FR-PH-01.6  
**Depends on:** T04  
**ui_scope:** `visual`  
**extends:** ui-mockup / mockup (T01 anchor)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png
```

## Purpose
Narrow/mobile: collapse nav into menu control with `/icons/public-home/ic-nav-menu.png`; Escape / outside click closes; a11y open/close labels (`publicHome.nav.menuOpen|menuClose`).

## Risk
Undismissible overlay; missing icon path; inventing icon filenames.

## Code Facts (re-verify at execute)
- Icon present: `spa-app/public/icons/public-home/ic-nav-menu.png` (catalog NEW #1).
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — **no** mobile nav menu control today.
- Icons non-blocking policy: path/slot correct; placeholder OK if art swaps later (backlog).

## AC / DoD
- [ ] (P0) Narrow viewport uses menu control with `ic-nav-menu` (AC #3).
- [ ] (P0) Menu dismissible (Escape / outside) (FR-PH-01.6).
- [ ] (P0) a11y open/close labels (via T06 keys).

## Where to change
- `spa-app/src/components/AppShell/Header.jsx` (or PublicHeader)
- `spa-app/public/icons/public-home/ic-nav-menu.png` (reuse path)

## Out of scope
Desktop-only nav polish without collapse; new icon design.

## Verification
```bash
ls spa-app/public/icons/public-home/ic-nav-menu.png
rg -n 'ic-nav-menu|menuOpen|Escape' spa-app/src/components/AppShell/ || true
```
