# SPA-PH-05-T01 — Confirm public route / replace stub shell

**Status:** Done — P3 2026-08-04T13:22:05Z
**Story:** [`../STORY-SPA-PH-05-how-it-works-page.md`](../STORY-SPA-PH-05-how-it-works-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) FR-PH-05.1  
**Depends on:** PH-01 chrome Done  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z  
**Package:** `pkg-000050`

## Purpose
Confirm public `/how-it-works` is registered and not session-protected; own the page shell under AppShell (Header + Footer). Route already exists — replace stub ownership for PH-05 content wave (T02+).

## Risk
Re-adding a second route; wrapping behind auth gate; forking chrome outside AppShell.

## Code Facts (re-verify at execute)
- [`App.jsx`](../../../../../../../src/App.jsx) — `path="/how-it-works"` → `<HowItWorksPage />` ✅.
- [`HowItWorksPage.jsx`](../../../../../../../src/pages/HowItWorksPage.jsx) — stub `data-testid="how-it-works-stub"`; AppShell + Header + Sidebar + PublicFooter.
- Header nav already links `to="/how-it-works"` ([`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx)).
- api-req §3.1 — FE only; no CMS.

## AC / DoD
- [x] (P0) Public route `/how-it-works` exists and renders without protected redirect → backlog AC #1.
- [x] (P0) Page mounts inside AppShell / PH chrome (header+footer) (FR-PH-05.1).
- [x] (P0) Stub may remain until T02; do not invent M133 body copy here.

## Where to change
- `spa-app/src/App.jsx` (verify only if needed)
- `spa-app/src/pages/HowItWorksPage.jsx`

## Out of scope
Four-step layout (T02); CTAs (T03); icons (T04); L10N keys (T05); inventing CMS.

## Verification
```bash
rg -n 'how-it-works|HowItWorksPage' spa-app/src/App.jsx spa-app/src/pages/HowItWorksPage.jsx
cd spa-app && npm test -- --run Header.publicNav
```
