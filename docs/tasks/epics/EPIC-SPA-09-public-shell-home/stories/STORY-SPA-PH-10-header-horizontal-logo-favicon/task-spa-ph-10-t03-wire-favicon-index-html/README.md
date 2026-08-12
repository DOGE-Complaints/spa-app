# SPA-PH-10-T03 — Wire favicon link in index.html

**Status:** Done — P3 PASS 2026-08-07T20:53:02Z  
**Story:** [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md)  
**Decision Ref:** backlog FR-PH-10.4 · AC tab/bookmark icon  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T20:45:13Z  
**Package:** `pkg-000056`

## Purpose
Явный `<link rel="icon">` на `./favicon.png` во всех hash-routes SPA (tab / bookmark).

## Risk
Без link браузер не обязан брать `public/favicon.svg`; demo chrome без бренда в tab.

## Code Facts (closed)
1. [`spa-app/index.html`](../../../../../../../index.html) — `<link rel="icon" href="./favicon.png" type="image/png" />` in head.
2. Live DOM post: `document.querySelector('link[rel="icon"]').href` resolves to favicon.png.
3. `public/favicon.png` from T01.

## AC / DoD
- [x] (P0) `<link rel="icon" href="./favicon.png" type="image/png" />` in `index.html` → FR-PH-10.4 · AC #3.
- [x] (P0) `public/favicon.png` present (T01).
- [x] (P0) No apple-touch-icon / webmanifest (Вне scope).

## Where to change
- [`spa-app/index.html`](../../../../../../../index.html)

## Out of scope
Header brand (T02); Landing favicon; deleting `public/favicon.svg`.

## Verification
```bash
rg -n 'rel="icon"|favicon.png' spa-app/index.html
test -f spa-app/public/favicon.png
```
