# DOGEstonia — M166 Public Footer, Brand and Static Links Specification v1.0

**Date:** 2026-10-22  
**Artboard ID:** `M166-public-footer-brand-links-v1`  
**Artboard PNG:** [DOGEstonia-M166-public-footer-brand-links-spec-v1.0.png](DOGEstonia-M166-public-footer-brand-links-spec-v1.0.png) · legal shells [DOGEstonia-M166-legal-pages-shell-overview-v1.0.png](DOGEstonia-M166-legal-pages-shell-overview-v1.0.png)  
**Surface:** public SPA shell footer, with `/about`, `/privacy`, `/contact` page structures.  
**Status:** operator route/brand requirements documented. Tagline and numerical spacing/typography proposals remain pending review. No product-code change, legal-copy approval, deployment or OP PASS is claimed.

## 1. Purpose and authority

Make the footer brand mark legible and prominent, replace the visible tagline placeholder with a short readable proposed line, and provide real navigation destinations for About, Privacy and Contact. Show how the same footer supports three static page shells without inventing their final content.

Current operator instructions govern: brand home goes to `/next/feed`, the visible mark is at least 40 CSS px, links use the supplied routes and legal/contact copy is supplied later by the operator. This specification records the artboard proposal; generated pixels do not create additional approved tokens or content.

## 2. Locked rules and proposed values

| Item | Status | Rule / proposal |
|---|---|---|
| Brand home | Locked | Mark and brand name link to `/next/feed` |
| Footer links | Locked | About → `/about`; Privacy → `/privacy`; Contact → `/contact` |
| Mark prominence | Locked minimum | Visible mark at least 40 CSS px; proposed square 40 × 40 |
| Brand name | Locked content | `DOGEstonia` |
| Tagline in preview | Requested placeholder | `Civic issues, structured.` |
| Final tagline | TBD | Preview line is not recorded as final brand-copy approval |
| Desktop brand type | Proposed | 20 CSS px, weight 600 |
| Tagline / link type | Proposed | 14 CSS px |
| Mark-to-text gap | Proposed | 12 CSS px |
| Desktop footer padding | Proposed | 24 px vertical / 32 px horizontal |
| Narrow footer padding | Proposed | 24 px vertical; horizontal 16–20 px range, exact value TBD |
| Link targets | Accessibility requirement | At least 44 CSS px target extent; glyph/text size alone is not target size |
| Responsive breakpoint | TBD | 390 CSS px is the example viewport, not a new breakpoint |

Do not publish `[TAGLINE_TBD]` as resident-facing text. The natural-language line in the artboard is a preview placeholder with its TBD annotation outside UI. Final production wording requires operator confirmation.

## 3. Footer anatomy and ownership

| Element | Responsibility |
|---|---|
| Public footer shell | Shared placement and visual treatment across public surfaces |
| Brand home link | Supplied DOGEstonia mark plus brand name, one coherent home destination |
| Tagline | Plain descriptive text associated with brand; no separate invented action |
| Footer navigation | Three independent text links in About / Privacy / Contact order |
| Static page shell | Existing header, page H1, content area and same shared footer |
| Static page content | Operator-supplied final About, Privacy and Contact material |

The footer is normal page content. No sticky/fixed overlay behavior, full-height layout policy or new shell architecture is introduced. Existing shell behavior governs unless separately decided.

## 4. Exact navigation contract

| Visible element | Destination | Behavior boundary |
|---|---|---|
| DOGEstonia mark and name | `/next/feed` | Internal application home/feed navigation |
| `About` | `/about` | Internal static-page route |
| `Privacy` | `/privacy` | Internal static-page route |
| `Contact` | `/contact` | Internal static-page route |

These destinations are real route targets, not `#`, blank hrefs, click no-ops or invented external sites. Route implementation is not claimed by this documentation. Reuse existing router conventions; do not infer hash syntax from the artwork.

Do not retain `/board` as brand home. The route mapping table and arrows in the artboard are developer annotations, not rendered footer copy. No `Opens ...` helper is added.

About / Privacy / Contact are real text labels, not icon-only buttons. Decorative middle dots may separate links where the existing style uses them; each link remains individually focusable and clickable. Do not infer a mandatory dot or separator from a text description if it is absent in the visual proposal.

## 5. Brand assets and light-surface treatment

References supplied by the operator:

- `DOGEstonia-logo-square.png` — square mark with dark background.
- `DOGEstonia-logo-horizontal.png` — horizontal logo with dark background.

The proposal uses the supplied square mark on its dark backing beside a plain readable `DOGEstonia` text name. It does not claim a transparent or approved light-surface logo variant exists. Preserve source proportions and recognizable mark details; do not trace the generated PNG, distort the face, recolor the logo or commission another mascot.

Source assets include internal background/padding. Verify the **visible mark**, not just the CSS image box, meets the 40 px prominence requirement. Exact crop/fit treatment and any light-surface asset preparation remain TBD. Do not silently remove its background or infer a new approved asset from the raster rendering.

The artwork shows a dark tile with rounded treatment. Exact tile radius and any source trimming are not new locked tokens. Use existing approved asset treatment or obtain a separate decision.

## 6. Desktop composition — panel A

Use a full-width light footer with a subtle existing top hairline. Brand group is on the left; About / Privacy / Contact navigation is on the right. Keep alignment and spacing balanced without making the mark look like a tiny favicon.

Within the left group: mark, then brand name and tagline. The artboard places the tagline below the name. Brand name is proposed at 20 px / 600, tagline at 14 px secondary. The mark-to-text gap is proposed at 12 px. Navigation text is proposed at 14 px with independent targets of at least 44 px.

Proposed footer padding is 24 px top/bottom and 32 px left/right. The minimum target requirement and content determine final height; no fixed total footer height is established. Do not measure rulers or apparent magnification from the PNG.

## 7. Narrow 390 CSS px composition — panel B

At the example 390 px viewport, use a brand row with the same visible mark and name/tagline, followed by a separate row of About / Privacy / Contact links. Preserve order and legibility; allow rows to wrap rather than overflowing the page.

Proposed vertical padding remains 24 px; proposed horizontal padding is a 16–20 px range that needs an exact decision or alignment with existing shell tokens. This range is not an instruction to invent a new breakpoint or random per-device value.

Text and footer height may grow for localization or increased font size. Keep independent target areas and readable labels. No tiny-font fitting, clipped tagline, horizontal page overflow or avatar-style brand substitution.

## 8. Static page structures — panel C

| Route | H1 | Design placeholder only | Final content owner |
|---|---|---|---|
| `/about` | `About` | `About copy — OP to supply` | Operator |
| `/privacy` | `Privacy` | `Privacy copy — OP to supply` | Operator |
| `/contact` | `Contact` | `Contact details — OP to supply` | Operator |

Each inset shows the existing public header, H1, content region and shared footer. Dashed placeholder boxes demonstrate content placement; they are not final production cards or resident-facing copy. Miniature header links in the insets are illustrative shell context and do not require adding duplicate navigation to the real header.

Do not invent legal clauses, data-controller details, retention periods, cookies/consent promises, jurisdiction, contact email, telephone, address, opening hours or a contact form. No API or form-submission behavior is implied.

The routes and navigation structure are specified. Whether incomplete pages can be published, and any resident-facing pending-copy state, are **TBD**. Do not silently ship design placeholders as legal/privacy content. Final operator copy must be integrated through the existing content/localization workflow.

## 9. Palette, typography and accessibility

Continue the light civic palette: page `#F7F6F2`, surface `#FFFDF8`, primary text `#101828`, secondary `#667085`, neutral hairline `#E7E4DC`, action/link accent `#B54708`, existing yellow `#F5C542` where appropriate.

No new exact logo-tile, shadow, corner-radius, gap or background-mixture token is approved by the image. Text and spacing values in §2 remain proposals. Values are CSS px; no root-font dependency or React Native unit conversion is introduced.

Use existing footer/navigation semantics and visible focus. Brand home needs a clear accessible name identifying DOGEstonia and its home destination without duplicating the image and text unnecessarily. Link order is About → Privacy → Contact. Static pages have one clear H1 and an accessible main content area.

Text size is independent of target size. Preserve readable labels, contrast and keyboard access; removing decorative boxes must not remove focus. Existing theme/localization infrastructure remains authoritative; this light sheet does not reopen theme defaults or introduce translated strings.

## 10. Artboard mapping and copy boundaries

| Panel / annotation | Purpose |
|---|---|
| A | Desktop footer brand prominence, links and proposed sizes |
| Route table below A | Documentation of exact navigation targets |
| B | Narrow footer stacking example at 390 CSS px |
| C | About / Privacy / Contact page structures with operator copy pending |
| Tagline note | Explicit final-wording TBD, outside product UI |
| Asset note | Honest light-surface asset-treatment TBD |

The PNG is a visual reference, not a measurement source. Footer marks in tiny page insets are scaled diagrams; implementation must still satisfy the minimum visible-mark requirement. Rulers, proposal labels, route captions and placeholder blocks are documentation only.

## 11. Remaining decisions and handoff gates

| Item | Current handling |
|---|---|
| Final tagline | `Civic issues, structured.` is a requested preview placeholder; final wording TBD |
| Numerical typography and spacing | Proposed values in §2, pending review |
| Narrow horizontal padding / breakpoint | Exact value and switch threshold TBD or existing shell rules |
| Visible mark fit / dark backing / light variant | Source assets supplied; final light-surface treatment TBD |
| About / Privacy / Contact final content | Operator to supply |
| Incomplete-page release handling | TBD; do not publish design placeholders as final copy |
| Runtime route and keyboard verification | Required in implementation; not claimed by artwork |
| Story / task assignment | M166 continuity; no new ID invented |

## 12. Review checklist

- [ ] Brand mark is visibly at least 40 CSS px; not merely a padded 40 px image box.
- [ ] Supplied mark is reused with preserved proportions and approved treatment.
- [ ] Brand home resolves to `/next/feed`.
- [ ] About / Privacy / Contact link to their exact routes, never `#` or no-op.
- [ ] `[TAGLINE_TBD]` is absent from rendered UI; final tagline status is respected.
- [ ] Desktop/narrow composition remains legible with independent minimum 44 px link targets.
- [ ] Proposed sizes are reviewed before becoming locked implementation tokens.
- [ ] Narrow layout and localized text have no clipping or page overflow.
- [ ] Static page content comes from operator; no invented legal text or contact details.
- [ ] Documentation placeholders and route annotations are absent from production UI.
- [ ] Existing header, theme and accessibility behavior are retained.
- [ ] No runtime route creation, deployment, HTTP or OP PASS claim is inferred from this specification.
