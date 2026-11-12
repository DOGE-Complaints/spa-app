# SPA-NF-03-T01 — List | Map toggle control + list/map/partial/error states

**Status:** Done · P3 (`2026-10-10T18:53:45Z`)  
**Story:** [`../STORY-SPA-NF-03-list-map-toggle.md`](../STORY-SPA-NF-03-list-map-toggle.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** true  
**UI routes:** `/#/next/feed`  
**puppeteer_gate:** `test:ui:board-shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:48:34Z`  
**Package:** `pkg-000105`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png)

## Purpose
List | Map toggle control + list/map/partial/error states.

## Arch anchors
- [02 §1 map chrome in feed plane](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [01 §1 claim home `#/next/feed`](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)
- [03 §4 false Done — claim URLs next/feed](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)

## Arch context
- List|Map toggle is feed content chrome (M151) on **`#/next/feed`**, not classic board claim — 01 §1 · 03 §4.
- Same issues list data plane as NF-01 — 00 Q4 · 02 §1.
- States list/map/partial/error — honest; no invent map HTTP — 02 §2.

## Implement notes
- Touch: feed list/map toggle UI in `features/feed/`.
- OOS: invent tile/search APIs; claiming classic `#/board` map as Phase-1 Done.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse existing map helpers (`issueGeo`) where valid.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-03
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Toggle works on `#/next/feed` with list/map/partial/error honesty
- [x] No invent map endpoints
- [x] Composes under `#/next/feed` host (shell unchanged)

## Code Facts (re-verify at execute)
- Host: `#/next/feed` via `NextFeedHostPage` + `features/feed/` (NF-01 Done)
- Icons Present: `/icons/next-feed/actions/{list-view,map-view}.svg`
- Reuse: `src/map/issueGeo.js` lat/lon eligibility

## Where to change
- `spa-app/src/features/feed/**` list/map toggle · thin host only if needed
- Do not rewrite `AppShellLayout` / Header / ProfileRail

## Verification
```bash
rg -n "list-view|map-view|FeedListArea|nextFeed\.map" spa-app/src/features/feed spa-app/src/pages/NextFeedHostPage.jsx | head -40
test -f spa-app/docs/UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md
ls spa-app/public/icons/next-feed/actions/{list-view,map-view}.svg
```
