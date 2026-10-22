# PH-11 — Footer scale + About/Privacy/Contact shells (structure Present · visual BLOCKED)

> **UTC:** 2026-10-22T18:22:41Z (P8 local close)  
> **Package:** `pkg-000211` · EPIC-SPA-09  
> **Code home:** `PublicFooter` · `StaticPublicPage` · `App.jsx` · `publicHomeDictionary` · `sessionRoutePolicy`  
> **Normative:** Interview **P9** · [M166](../../UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md) · [wave3 intake](../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) · Path A **p13UxReady**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Mark | Footer logo ≥**40 CSS px** (M166) |
| Tagline | Preview `Civic issues, structured.` · never `[TAGLINE_TBD]` |
| Brand | Mark+name → `/next/feed` (not `/board`) |
| Routes | `/about` `/privacy` `/contact` · shell + H1 · OP-pending body · no invent legal prose |
| Footer links | Real SPA routes (not `#` placeholders) |

## Touchpoints

- `components/PublicFooter/PublicFooter.jsx` · `.css`
- `pages/StaticPublicPage.jsx` · `.css` · `App.jsx` · `router/sessionRoutePolicy.js` · `layout/AppShellLayout.jsx`
- `i18n/publicHomeDictionary.js`
- Tests: `PublicFooter.test.jsx` · `StaticPublicPage.test.jsx` · Path A `scripts/tmp-ph11-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent CDN · no invent final legal prose · PH-13 How It Works OOS.
