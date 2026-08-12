# SPA-PH-01-T04 — Locale control reuse

**Status:** Done — P3 PASS 2026-08-04T07:07:39Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** backlog FR-PH-01.5  
**Depends on:** T03  
**ui_scope:** `mixed`  
**extends:** ui-mockup / mockup (T01 anchor)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png
```

## Purpose
Reuse existing locale selector patterns + flags; selected locale readable without flag-only. Do not duplicate selector or invent new locale dictionary keys for nav (T06).

## Risk
Second parallel selector; flag-only a11y failure vs M129.

## Code Facts (re-verify at execute)
- [`LanguageSelector.jsx`](../../../../../../../src/components/AppShell/LanguageSelector.jsx) — re-exports [`LocaleSelector`](../../../../../../../src/components/LocaleSelector/LocaleSelector.jsx) `variant="header"`.
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — already mounts `<LanguageSelector />` in `header-controls`.
- Flags reuse: `public/assets/ET.svg`, `RU.svg`, `US.svg` (backlog).

## AC / DoD
- [ ] (P0) Locale selector in header Session & locale zone (AC #1).
- [ ] (P0) Reuse existing locale patterns (no duplicate selector) (FR-PH-01.5).
- [ ] (P1) Selected locale readable without flag-only.

## Where to change
- `spa-app/src/components/AppShell/Header.jsx` / PublicHeader layout
- `spa-app/src/components/AppShell/LanguageSelector.jsx` / `LocaleSelector` (reuse)

## Out of scope
New `publicHome.nav.*` keys (T06); account slot content (PH-02).

## Verification
```bash
rg -n 'LanguageSelector|LocaleSelector' spa-app/src/components/AppShell/
ls spa-app/public/assets/ET.svg spa-app/public/assets/RU.svg spa-app/public/assets/US.svg
```
