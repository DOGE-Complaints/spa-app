# UI mockup spec — SPA-PH-03 PublicFooter (Path A)

**UTC drafted:** 2026-08-04T10:41:47Z  
**ui_gate:** Path A (`@mockup` refs — human gate not required for UI-2)  
**Anchor task:** `task-spa-ph-03-t01-public-footer-layout`  
**Host chrome context:** M129 public header + PH chrome AppShell

## Source mockups (SSOT)

| Ref | Path |
|-----|------|
| M131 md | `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md` |
| M131 png | `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.png` |
| M131 estonia | `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec-estonia.png` |
| M133 appendix (copy) | `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md` §footer |

## States to implement / capture (M131)

| ID | State | Behaviour |
|----|-------|-----------|
| A | Default Desktop Footer | Horizontal: brand + `[TAGLINE_TBD]` left · About · Privacy · Contact right |
| B | Mobile Wrap / Reflow | Narrow stack/wrap; brand + tagline + links retained; no social |

## Structure (FR-PH-03.2–03.6)

- Quiet brand (optional logo from `public/assets/` + name DOGEstonia)
- Tagline literal `[TAGLINE_TBD]` all locales
- Links: About · Privacy · Contact — v1 `href="#"` placeholders (routes `/about|/privacy|/contact` **not** present in App.jsx)
- No social icons, newsletter, card grid; **no NEW** icon-catalog rows

## L10N (EN canon)

- `publicHome.footer.brand` — DOGEstonia
- `publicHome.footer.tagline` — [TAGLINE_TBD]
- `publicHome.footer.about` — About
- `publicHome.footer.privacy` — Privacy
- `publicHome.footer.contact` — Contact

## Out of scope (backlog)

Final tagline approval; social; newsletter; CMS; collective metrics; inventing `appShell.footer` reuse.

## Viewport

1536×1024 (State A); 390×844 (State B).
