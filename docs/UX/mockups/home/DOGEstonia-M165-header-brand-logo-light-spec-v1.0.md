# DOGEstonia — M165 Public Header Brand on Light Chrome Specification v1.0

**Date:** 2026-10-22  
**Artboard ID:** `M165-header-brand-logo-light-v1`  
**Artboard PNG:** [DOGEstonia-M165-header-brand-logo-light-spec-v1.0.png](DOGEstonia-M165-header-brand-logo-light-spec-v1.0.png) (promoted from raw `DOGEstonia M165-header-brand-logo-light-v1.png`)  
**Surface:** public SPA header, shown on `#/next/feed`  
**Lineage:** NS-02 / PH-10  
**Status:** visual proposal for placement, scale and theme surface. The proposed 44 px brand band and light asset treatment await review. No transparent asset export, product-code change, runtime contrast test or OP PASS is claimed.

## 1. Purpose and scope

Make the existing horizontal DOGEstonia brand more prominent in the public header and readable directly on light/transparent chrome. Remove the dark rectangular bitmap backing from the intended light presentation. Preserve the existing dog illustration, wordmark identity and proportions.

Included: header brand placement, visible scale, light wordmark treatment and dark contrast continuity. Excluded: new mascot illustration, new logo identity, full public-header redesign, feed content, navigation features, HTTP/API behavior and product code.

## 2. Authority and source assets

Current operator M165 instructions govern the surface and size direction. The supplied `DOGEstonia-logo-horizontal.png` is the identity reference. It contains the original dog mark, white/light DOGE lettering, orange stonia lettering and a dark background.

The proposed light rendering adapts the wordmark ink and backing while retaining the source identity. It is not evidence that an approved transparent/light variant already exists. The generated PNG is a visual reference, not an exportable production logo master or an exact pixel trace.

Existing shell controls and theme rules remain authoritative. NS-02 / PH-10 identify lineage; no unseen behavior or numerical token is inferred from those identifiers.

## 3. Locked requirements and proposals

| Item | Status | Rule |
|---|---|---|
| Placement | Locked | Left brand area of public header |
| Light surface | Locked | Light/transparent chrome; no dark rectangle behind the logo |
| Identity | Locked | Preserve existing horizontal wordmark and dog illustration style |
| Readable dark presentation | Locked | Brand remains legible when the existing user theme is dark |
| Size direction | Operator guidance | Approximately 40–48 CSS px visible mark + type height band |
| Artboard size | Proposed | 44 CSS px visible brand band |
| Brand home | Existing public-shell continuity | `/next/feed` |
| Light wordmark ink | Proposed treatment | Dark DOGE + original orange stonia |
| Dark wordmark ink | Continuity treatment | Light DOGE + original orange stonia |
| Exact light asset preparation | TBD | Production transparent/theme-specific asset still required |

The size range is review guidance, not permission to silently change unrelated header dimensions. Requesting this Markdown does not record acceptance of the numerical proposal.

## 4. Brand anatomy and placement

Use the horizontal dog mark + DOGEstonia wordmark as one coherent brand group. Preserve relative mark/type proportions and spacing from the actual source asset; do not stretch either axis independently or recreate the type in an arbitrary font.

Measure the proposed 44 px band around the **visible artwork**, including the dog mark, rather than the source canvas or its unused padding. The lettering may be shorter than the dog, as in the supplied identity. Center the group vertically within the existing header layout.

No new exact header height, horizontal brand gap, page padding, control spacing or breakpoint is established by this sheet. Use existing confirmed shell tokens and review any necessary adjustment in the real header.

The brand home link resolves to `/next/feed` under existing routing conventions. No legacy board destination or resident-facing route hint is introduced. The “Home → /next/feed” annotation belongs to the artboard documentation only.

## 5. Light-theme treatment — panel A

The main header surface is the existing warm light shell surface. The logo sits directly on it without a dark tile, dark rectangle, border, pill, shadow or separately colored brand card.

For the light proposal, DOGE lettering uses the existing primary dark ink role (`#101828` where applicable) and stonia retains the source brand orange. Do not replace the brand orange by sampling PNG interpolation or equating it to the general action-yellow token. Preserve the original dog colors, outlines, eyes, ear/tree details and muzzle.

The dog artwork may retain its intentional source outline/halo. Removing the enclosing bitmap background is distinct from deleting details that belong to the mark. Exact edge cleanup and small-size legibility must be checked against the original asset, not copied from the generated rendering.

The main panel shows existing public controls for context. Search field shape, language abbreviation, theme icon and account rendering in the artwork are illustrative and do not authorize changing those controls.

## 6. Enlarged detail — panel B

The enlarged brand demonstrates intended light-surface treatment and preservation of identity. It is explicitly not 1:1. Do not measure the displayed dog, wordmark width or line thickness from this magnified panel.

The actual UI proposal remains a 44 px visible height band within the operator's approximate 40–48 px review range. No alternate logo size or new illustration asset is commissioned by the enlargement.

## 7. Dark-theme continuity — panel C

Use the same brand geometry on the existing continuous dark header surface. DOGE lettering is light, stonia retains original orange and the dog identity is unchanged. Surrounding controls follow their existing dark-theme roles.

The dark header is the page's theme surface, not a dark rectangle inserted behind the logo. A prepared background-free brand asset should not carry its own contrasting rectangular patch.

Exact dark hex values follow the existing theme pack; M165 introduces no new dark palette. The PNG is a contrast preview, not a measured accessibility pass. Verify real wordmark/mark visibility, edges and controls against actual theme tokens in implementation.

The artboard phrase “same brand asset” means the same identity and geometry. It does not require one identical bitmap file for both themes if different wordmark inks are needed. Asset architecture is an implementation decision; no new filenames or runtime selection schema are prescribed.

## 8. Asset-delivery boundary

| Item | Current state |
|---|---|
| Original horizontal dark-backed PNG | Supplied source reference |
| Light header appearance | Illustrated proposal |
| Transparent/light production logo | Not exported by this task |
| Dark-compatible background-free variant | Preparation/verification pending |
| New SVG master | Not created or claimed |
| Repository asset Present status | Not asserted |

Prepare any production variants separately from this artboard, preserving source proportions and identity. Do not crop the rendered logo out of the artboard and treat it as an authoritative master. Do not repaint the dog in a new style or substitute an unrelated Shiba icon.

M165 is specific to public-header brand treatment. It does not automatically revise M166 footer asset treatment or any other logo placement. Shared-asset propagation, if desired, requires an explicit scope decision.

## 9. Context and annotation boundaries

| Artboard area | Meaning |
|---|---|
| A — Light public header | Primary light chrome and visible scale proposal |
| B — Light brand detail | Magnified identity/surface review |
| C — Dark contrast continuity | Same brand identity, theme-appropriate ink |
| Asset-delivery notes | Honest source/preparation state |

The “Public feed” fragments and neutral placeholder bars beneath headers only establish page context. They do not specify feed loading states, Issue identity slots, cards, skeletons, side rails or author avatars. No such component should be implemented from this crop.

Rulers, callout pills, route arrows and notes are outside-product annotations, even where they overlap the visual crop. Do not add them to the live header.

## 10. Accessibility and responsiveness

Preserve a clear accessible brand-home link and existing keyboard focus behavior. Avoid duplicate announcements from image plus adjacent text. Existing header actions retain accessible names and adequate targets; no new icon-only control is specified here.

At narrow widths, retain aspect ratio and legible identity without colliding with existing controls. Exact responsive treatment and breakpoint follow the current public-header pack; M165 provides no narrow state or new collapse rule. If the proposed size cannot fit, resolve that layout explicitly rather than distorting or clipping the wordmark.

Light/dark readability and large-text/shell fit must be verified using the prepared production asset in the actual component. No measured contrast or viewport test has been performed by generating this sheet.

## 11. Remaining decisions

| Item | Current handling |
|---|---|
| Final visible height | 44 px proposal within approximately 40–48 px guidance |
| Production light/transparent asset | Separate preparation pending |
| Dark variant delivery and exact ink roles | Existing theme governs; preparation/verification pending |
| Edge treatment around original mark | Preserve identity; validate during asset preparation |
| Header responsive fit | Existing pack; no new breakpoint invented |
| Other header controls | Unchanged by this scope; artwork is context only |
| Footer/logo propagation | Outside M165; no automatic M166 rewrite |
| Runtime / OP review | Not performed or claimed |

## 12. Review checklist

- [ ] Horizontal brand preserves original dog identity and wordmark proportions.
- [ ] Light header has no dark rectangular brand backing, tile or shadow substitute.
- [ ] Visible artwork height follows the explicitly reviewed value; canvas padding is not mistaken for visible size.
- [ ] Light DOGE ink is readable and original stonia orange is preserved.
- [ ] Dark presentation uses readable light DOGE ink on the existing continuous dark surface.
- [ ] Prepared assets, rather than generated artboard crops, are used in implementation.
- [ ] Brand home uses `/next/feed` under existing router conventions.
- [ ] Existing search/language/theme/notification/account behavior is not redesigned from the illustration.
- [ ] Header fit, focus and actual contrast are checked in the real UI.
- [ ] No feed placeholders, callouts or rulers become product components.
- [ ] No HTTP, code change, production asset export or OP PASS is inferred from this document.
