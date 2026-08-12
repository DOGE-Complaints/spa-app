# SPA-PH-03-T01 — PublicFooter layout M131

**Status:** Done — P3 2026-08-04T10:46:36Z  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md) FR-PH-03.1  
**Depends on:** PH-01 chrome Done  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T10:35:41Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.png
@mockup: spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec-estonia.png
```

## Purpose
Introduce `<PublicFooter />` and mount it on public chrome routes (AppShell `footer` / Board|HowItWorks pages using PH chrome) per M131. Quiet utility layout shell — brand/links content filled in T02.

## Risk
Regression vs G8 AppShell; leaving marketing one-liner as product footer; forking board-only chrome.

## Code Facts (re-verify at execute)
- [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx) — footer slot renders `t('appShell.footer')` one-liner when `showFooter`; **≠** Footer A (M131).
- Board/Issue: `showFooter={false}` + own `board-footer` with legacy `t('footer')`.
- **No** `PublicFooter` / `Footer.jsx` under `src/components/`.
- M131 SSOT on disk: `docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md` (+ `.png`, estonia).
- API: [api-req §3.2](../../../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) — no CMS.
- Icons: [STORY-SPA-PH-icon-assets.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) — **no NEW**; optional logo reuse `public/assets/` only.

## AC / DoD
- [x] (P0) `<PublicFooter />` on public chrome routes using PH chrome (FR-PH-03.1) → backlog AC #1 structure mount.
- [x] (P0) Layout aligns to M131 desktop/narrow chrome (ui_anchor Path A).
- [x] (P0) Does not leave `appShell.footer` / `footer` marketing one-liner as the product Footer A.

## Where to change
- New: `spa-app/src/components/PublicFooter/` (or under AppShell)
- `spa-app/src/components/AppShell/AppShell.jsx` footer slot / `showFooter` consumers
- Board / HowItWorks / other public chrome mounts as needed
- Related CSS

## Out of scope
Brand + tagline + link copy (T02); L10N keys (T03); vitest (T04); gate (T05); final tagline; social/newsletter; CMS; NEW icons.

## Verification
```bash
test -f spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md
test -f spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.png
rg -n 'PublicFooter|appShell\.footer|showFooter' spa-app/src/components/AppShell spa-app/src/pages
```

Gate: filled at T05 / per-task if used.
