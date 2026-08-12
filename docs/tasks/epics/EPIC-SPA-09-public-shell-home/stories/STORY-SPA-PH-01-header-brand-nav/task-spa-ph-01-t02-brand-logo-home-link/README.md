# SPA-PH-01-T02 — Brand logo + name + home link

**Status:** Done — P3 PASS 2026-08-04T07:07:39Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** backlog FR-PH-01.2  
**Depends on:** T01  
**ui_scope:** `visual`  
**extends:** ui-mockup / mockup (T01 anchor)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png
```

## Purpose
Logo (`DOGEstonia-logo-big.png` + fallback SVG) + product name **DOGEstonia**; click → `/board` (or `/` → board). Wordmark not translated.

## Risk
Broken home navigation; missing wordmark vs M129; logo path drift.

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — logo `/assets/DOGEstonia-logo-big.png` with `onError` → `/assets/DOGEstonia-logo-fallback.svg`; **no** wordmark text; logo not wrapped in Link to `/board`.
- Assets exist: `spa-app/public/assets/DOGEstonia-logo-big.png`, `DOGEstonia-logo-fallback.svg`.

## AC / DoD
- [ ] (P0) Logo + DOGEstonia name visible (FR-PH-01.2; AC #1 brand).
- [ ] (P0) Brand navigates to `/board`.
- [ ] (P1) Fallback SVG on logo error.

## Where to change
- `spa-app/src/components/AppShell/Header.jsx` (or PublicHeader)
- `spa-app/public/assets/DOGEstonia-logo-*` (reuse only)

## Out of scope
Nav links (T03); inventing new logo art.

## Verification
```bash
ls spa-app/public/assets/DOGEstonia-logo-big.png spa-app/public/assets/DOGEstonia-logo-fallback.svg
rg -n 'DOGEstonia-logo|header-brand' spa-app/src/components/AppShell/Header.jsx
```
