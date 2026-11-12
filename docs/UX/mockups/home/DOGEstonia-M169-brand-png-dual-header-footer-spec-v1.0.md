# DOGEstonia — M169 Dual-Theme PNG Brand: Header and Footer Specification v1.0

**Date:** 2026-10-23  
**Artboard ID:** `M169-brand-png-dual-header-footer-v1`  
**PNG:** `DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.png` (promoted from raw `DOGEstonia Light_Dark Header Footer Artboard-4.png`) · alt layout `DOGEstonia-M169-dual-header-layout-alt-v1.0.png`  
**Source refs (docs-only, not production masters):** [`m169-brand-source/`](m169-brand-source/)  
**Surface:** public header and footer, light/dark.  
**Status:** design/export requirements documented. Separate generated logo exports contained edge artifacts and are NOT approved production masters. No OP PASS, deployment or runtime change is claimed.

## 1. Purpose and precedence

Use dedicated transparent PNG brand masters for each theme, preserving the supplied dog identity and horizontal DOGEstonia wordmark proportions. Header light treatment has no dark rectangular backing. Footer brand consists of the mark and optional name only, without a tagline.

M169 updates M165's asset-delivery direction to transparent PNG and supersedes M166/M167's preview tagline in the footer brand group. The same no-tagline footer applies when those public shells are reused in M168 and other pages. It does not redesign their page content or routes.

The preferred output is PNG with real transparency. An SVG containing embedded raster is not a substitute. This is an asset/display contract, not a new mascot or illustration style.

## 2. Theme-specific masters

| Variant | Wordmark ink | Preserved elements | Format |
|---|---|---|---|
| Light | Dark DOGE; original orange stonia | Original dog identity, proportions and composition | Transparent PNG |
| Dark | Light DOGE; original orange stonia | Same dog identity, proportions and composition | Transparent PNG |

Proposed export filenames: `dogestonia-brand-light.png`, `dogestonia-brand-dark.png`. Names remain a handoff proposal, not an installed-file or Present claim. No directory, router import or component-code contract is introduced.

Use the supplied original logo as source authority. Preserve ear/tree shapes, eyes/highlights, facial expression, muzzle, outlines, original orange and wordmark geometry. Do not substitute a new dog, trace the generated artboard, stretch either axis or replace lettering with an arbitrary font.

## 3. Export requirements and current delivery state

- Two actual PNG files with transparent alpha, including transparent letter counters and space around artwork.
- Same canvas/registration and artwork proportions across variants so theme switching does not move or resize the brand.
- Clean, crisp small-size edges; no stray speckles, matte rectangle, blur, jagged cleanup artifacts or painted checkerboard.
- Retain intentional source outlines; do not delete mark details while removing background.
- Enough raster resolution for intended display density; exact export dimensions, density variants and safety margin remain TBD.
- No SVG raster wrapper and no claim that a UI artboard is a production master.

The generation attempts in this dialogue visibly failed edge quality. They must not be promoted or treated as accepted assets. The artboard records the required destination state. Asset preparation and visual/alpha QA remain open work. Source identity preservation must be verified against original pixels; image-generation output alone is not proof of exact fidelity.

## 4. Header light — panel A

Place the horizontal transparent light PNG directly on the existing light public-header surface. DOGE uses the existing primary dark ink role; stonia retains the source orange. Do not draw a dark tile, rectangle, card, border or shadow behind the brand.

Proposed visible mark-plus-wordmark height band is **44 CSS px**, continuing M165's approximate 40–48 px review range. Measure visible artwork, not padded canvas dimensions. Preserve aspect ratio and existing header alignment. The proposal does not approve a new overall header height or exact control spacing.

The artboard's search/bell/account icons provide shell context only. Their simplified selection or omission is not an instruction to change existing public-header controls.

## 5. Header dark — panel B

Use the dedicated dark PNG with light DOGE lettering, original orange stonia and the same dog geometry. It sits on the continuous existing dark header, without a separately baked backing or a contrasting rectangle.

Use the same visible-height and registration rules as light. Dark theme roles follow the existing pack; no new dark hex palette or measured contrast pass is supplied. Verify mark/wordmark readability with real theme tokens and the prepared file.

## 6. Footer light/dark — panels C/D

Footer brand is **mark + optional DOGEstonia name only**. The artwork shows mark plus name. Omit `Civic issues, structured.` and any replacement tagline beside or under the brand. Do not reserve an empty tagline line.

Visible mark is at least **40 CSS px** in the actual footer, not merely a padded 40 px bitmap box. A square-mark or horizontal presentation is allowed by the operator; exact extraction/reuse and source asset mapping must be resolved during asset preparation. M169 does not claim that a separate square transparent master was delivered.

The light footer uses dark name ink; dark uses light name ink. Keep source orange where the horizontal wordmark is used. Preserve existing footer navigation and responsive behavior.

| Link | Destination |
|---|---|
| Brand home | `/next/feed` |
| About | `/about` |
| Privacy | `/privacy` |
| Contact | `/contact` |

No legacy board destination, routing helper or new legal/contact copy is introduced. Exact M166 spacing/type proposals retain their review status; M169 only overrides tagline/asset treatment where stated.

## 7. Shared shell, responsive and accessibility rules

Retain existing theme selection and component behavior. Select the correct prepared variant without changing artwork placement. Do not infer runtime implementation or asset-selection code from this sheet.

Preserve a clear accessible brand-home link, visible keyboard focus and existing navigation targets. Avoid duplicate image/name announcements. Footer text links retain adequate targets; existing minimum 44 CSS px interactive-target rules apply.

Use current public-shell responsive rules. No exact new mobile breakpoint, logo collapse strategy or header-control redesign is specified. Verify light/dark, narrow layouts and dense/retina display at intended visible sizes; don't distort or clip the wordmark to fit.

## 8. Artboard boundaries

A/B show header surfaces and proposed 44 px brand band. C/D show footer continuity without tagline and mark minimum 40 px. The export table and production notes are documentation, not UI.

The phrase “production PNG master” is a delivery requirement, not evidence that approved masters already exist. Generated logo representations are visual previews. Do not crop them out of M169 for production use.

## 9. Remaining decisions

| Item | State |
|---|---|
| Approved clean light/dark PNG pair | Pending asset preparation and QA |
| Export dimensions, density and safety margin | TBD |
| Final filenames / repository path | Proposed names; path TBD |
| Header visible band | 44 px proposal |
| Footer visible mark | Minimum 40 px required |
| Optional separate square footer asset | Delivery/mapping TBD |
| Exact source orange / theme roles | Preserve source and existing theme; no PNG sampling |
| Runtime/contrast verification | Not performed or claimed |

## 10. Review checklist

- [ ] Two real transparent PNG variants are prepared; no SVG raster wrapper.
- [ ] Dog identity and wordmark proportions match the source.
- [ ] Light DOGE is dark, dark DOGE is light; source orange stonia retained.
- [ ] Both variants share stable canvas/artwork registration.
- [ ] No matte, speckles, blur or jagged edge artifacts remain at intended display size.
- [ ] Header has no dark brand rectangle on light chrome.
- [ ] Header proposed band and footer visible mark requirements are reviewed/verified.
- [ ] Footer contains mark/name only; tagline and its reserved line are absent.
- [ ] Brand and footer routes are preserved.
- [ ] Existing shell controls and theme behavior remain governed by their packs.
- [ ] No failed generated export is promoted as a production master.
- [ ] No runtime change or OP PASS is inferred from this documentation.
