# SPA-PH-10-T02 — Wire Header horizontal brand (no text name)

**Status:** Done — P3 PASS 2026-08-07T20:53:02Z  
**Story:** [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md)  
**Decision Ref:** backlog FR-PH-10.1 · FR-PH-10.2 · FR-PH-10.3 · AC brand/alt/narrow/click  
**Depends on:** T01  
**ui_scope:** `visual`  
**ui_complexity:** `standard`  
**ui_anchor:** true  
**UI routes:** `/#/board`  
**puppeteer_gate:** `test:ui:board-shell`  
**@mockup:** `docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md` (brand slot context)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T20:45:13Z  
**Package:** `pkg-000056`

## Purpose
Public header brand = horizontal PNG only; product name via `img` alt; keep Link → `/board` and onError → fallback SVG.

## Risk
Double wordmark (img + span); broken narrow overflow; missing alt; accidental footer/auth shell edits.

## Code Facts (closed)
1. [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) L19: `useState('/assets/DOGEstonia-logo-horizontal.png')`.
2. Same file L99–105: brand `Link` + `img` only (no `.header-brand-name`); `alt="DOGEstonia logo"`; onError → fallback SVG.
3. [`Header.css`](../../../../../../../src/components/AppShell/Header.css) — `.header-brand-name` rules removed.
4. [`index.css`](../../../../../../../src/index.css) `.header-brand-logo`: height 44px; `width: auto`; `object-fit: contain`; `max-width: min(320px, 55vw)`.
5. Footer / AppShell auth still use circular `DOGEstonia-logo-big.png` (out of scope, verified).

## UI pipeline
- UI-0: [`ui-baseline/`](./ui-baseline/) pre circular+text
- UI-1 Path A: [`ui-mockup-spec.md`](./ui-mockup-spec.md)
- UI-3: [`ui-baseline/post-implement/`](./ui-baseline/post-implement/) + `npm run test:ui:board-shell` PASS

## AC / DoD
- [x] (P0) `logoSrc` default → `/assets/DOGEstonia-logo-horizontal.png` → FR-PH-10.1 · AC #1.
- [x] (P0) No `.header-brand-name` / visible «DOGEstonia» text node beside logo → FR-PH-10.1 · AC #1.
- [x] (P0) Non-empty `alt` with product name; preserved on onError → FR-PH-10.2 · AC #2.
- [x] (P0) Brand sizing ~44px / `width: auto` / `object-fit: contain`; no horizontal overflow ~390 → FR-PH-10.3 · AC #4.
- [x] (P0) Click brand → `/board` unchanged → AC #5.
- [x] (P0) Footer / AppShell auth circular / login text mark untouched → Вне scope.

## Where to change
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) · [`Header.css`](../../../../../../../src/components/AppShell/Header.css) · [`index.css`](../../../../../../../src/index.css)

## Out of scope
Asset copy (T01); favicon `index.html` (T03); vitest (T04); transparent re-export; Landing; apple-touch-icon.

## Verification
```bash
rg -n "header-brand-name|DOGEstonia-logo-horizontal|public-header-brand" spa-app/src/components/AppShell/
# post DOM: imgSrc=/assets/DOGEstonia-logo-horizontal.png · hasNameSpan=false · narrow overflow=false
npm run test:ui:board-shell
```
