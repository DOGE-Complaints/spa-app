# DOGEstonia M177 — Mobile Appbar and Burger Drawer

**Version:** 1.0  
**Date:** 2026-10-25  
**Surface:** SPA next-shell, MobileAppBar and navigation drawer at ≤767 CSS px.  
**Artboard:** `exec-5e4ef9ef-4891-4e43-ac21-8dc191b70bf3.png`.  
**Status:** specification requested after visual review; no runtime acceptance or deployment claim.

## 1. Purpose and authority

Replace the mobile “Feed coming soon” header text with the existing DOGEstonia brand PNG and provide a standard left navigation drawer with primary navigation, static pages and a prominent story CTA.

Current operator instructions and this specification govern. Existing next-shell routing, session, theme, i18n and accessibility contracts remain authoritative for unchanged behavior. M169 governs theme-specific PNG brand identity.

The generated image illustrates composition. Its logo rendering, schematic content and apparent dimensions are not production assets or measured tokens.

## 2. Scope

Included: mobile appbar, left burger trigger, open drawer, backdrop, section hierarchy, navigation/CTA bindings, safe-area containment, light/dark parity and keyboard/focus behavior.

Excluded: desktop shell redesign, new pages, Wallet, contribution/token features, authentication redesign, feed content redesign, new APIs and production logo export.

The breakpoint is **≤767 CSS px**. Retain the existing desktop shell above this breakpoint.

## 3. Closed MobileAppBar

- Place the existing burger control on the left.
- Display the theme-appropriate horizontal DOGEstonia brand PNG alongside it.
- Remove “Feed coming soon”; do not retain it as a subtitle or placeholder.
- Preserve existing brand aspect ratio and identity.
- Keep appbar chrome full width within the actual viewport and safe-area treatment.
- Retain existing appbar positioning behavior unless the current shell contract explicitly changes it; the raster does not establish new fixed/sticky behavior.

Approximate appbar content height is **64 CSS px proposed**, excluding top safe-area inset. This is not a measured existing token. Choose a height that accommodates the brand and real 44 px controls without clipping.

Do not infer additional appbar actions or bottom navigation from omitted context.

## 4. Drawer anatomy

Use a standard drawer opening from the **left**. Header contains the same theme-correct brand and a visible close control.

| Section | Entries, in order |
| --- | --- |
| Primary | Account; Feed; My stories |
| Pages | How it works; About; Privacy; Contact |
| Story action | Prominent Submit story CTA |

Use subtle separators between groups. Navigation entries may remain text-only as shown; no new icon pack is required.

Feed is current in the illustrated context. Use the existing active-route treatment and programmatic current-page indication. Other routes must mark their actual current entry rather than always highlighting Feed.

Account's focus ring in the artwork demonstrates keyboard focus. It is separate from Feed's current-route state and must not become permanent Account styling.

No Wallet, tokens, contributions, settings, logout or other new entry is introduced by M177. This does not authorize removing unrelated functionality from its existing surfaces.

## 5. Route and CTA bindings

| Entry | Destination / binding |
| --- | --- |
| Account | Existing cabinet `/profile` |
| Feed | `/next/feed` |
| My stories | Existing route binding; exact path was not supplied |
| How it works | `/how-it-works` |
| About | `/about` |
| Privacy | `/privacy` |
| Contact | `/contact` |
| Submit story | Existing `VITE_STORY_GPT_URL` configuration pattern |

Account is one entry to the existing cabinet, not a new Account page plus an additional Profile entry.

Resolve My stories from the current router/navigation source. Do not invent `/my-stories`, `/stories` or another path. Preserve existing router syntax, including hash routing where applicable.

The legacy environment-variable name does not imply that the destination must be a custom GPT. Preserve its configured story-intake destination, including the Telegram interview destination when configured. Do not guess a bot handle or URL.

The user-visible CTA label uses existing localized story-submission copy. Environment variable names and route annotations are documentation only.

Preserve existing authentication/eligibility guards and external-link policy. M177 does not define new login redirects, target-window behavior or URL fallback.

If the story URL is absent or invalid, retain existing honest unavailable handling. Do not fabricate a functioning destination.

## 6. Brand masters

Reuse the existing runtime assets:

- `dogestonia-brand-light.png`
- `dogestonia-brand-dark.png`

Use actual repository asset mapping; do not invent a directory or regenerate the logo from the artboard.

Light: dark DOGE ink and original orange stonia. Dark: light DOGE ink and original orange stonia. Preserve dog identity, ear/tree details, eyes, highlights and wordmark proportions.

Use transparent PNGs without a baked dark rectangle behind the light header. Preserve matching registration across theme variants so theme switching does not move or resize the artwork.

The exact named masters were not present among local generation references. The supplied original brand informed the preview only. Their existence/quality must be checked in the implementation repository; this sheet is not proof of delivered production masters.

If missing, carry the asset gap explicitly rather than substituting a new dog, arbitrary lettering, SVG-with-embedded-raster wrapper or crop from this artboard.

Do not add a tagline.

## 7. Width, safe-area and scrolling

| Property | Requirement / proposal |
| --- | --- |
| Reference viewport | 390 × 844 CSS px |
| Reference drawer width | Approximately 320 CSS px, proposed |
| Reference remaining backdrop | Approximately 70 CSS px at 390, illustrative |
| Interactive targets | At least 44 × 44 CSS px |
| Main content gutters | Approximately 16 px where applicable; existing tokens govern |
| Drawer height | Available viewport height with safe-area handling |

Drawer width must adapt to available space and localization. A fixed 320 px width must not overflow a narrower viewport. Retain a usable backdrop dismissal region where space permits; do not infer a universal 70 px backdrop width.

Appbar and page chrome extend edge to edge. Safe-area padding is inside continuous shell surfaces, not simulated with black sidebars, fake phone frames or a centered narrow app.

The artboard's external outlines and margins separate documentation panels; they are not runtime letterboxing.

Keep drawer content scrollable when needed and the close control and CTA reachable. Account for bottom safe-area insets, short landscape viewports and enlarged text. Do not pin the CTA over navigation content.

Lock background page scrolling while the modal drawer is open; retain drawer scrolling. Preserve the feed scroll position on close.

## 8. Interaction lifecycle

1. Burger activation opens the left drawer and moves focus into it, preferably to the close control or existing first-focus target.
2. Background content becomes inert to pointer/keyboard interaction while the drawer is open.
3. Tab and Shift+Tab remain within the open drawer.
4. Close control, Escape and backdrop activation dismiss the drawer.
5. Closing restores focus to the burger when it remains mounted.
6. Internal navigation activates the existing route and dismisses the drawer; use the shell's existing destination-focus pattern if navigation replaces the trigger context.

Clicking inside the drawer must not trigger backdrop dismissal. Do not introduce an unrequested swipe requirement.

Expose burger expanded state and its association with the navigation surface. Use the existing accessible modal-drawer primitive and a meaningful localized accessible name. Navigation remains semantic links; Submit story remains the existing destination action.

Do not copy annotation arrows, blue dots or documentation focus examples into product chrome.

## 9. Themes, localization and motion

Keep the same layout, order and targets in light and dark. Use existing semantic roles for surfaces, text, separators, backdrop, focus and current-route state.

The primary story CTA uses the existing civic yellow with readable text. Navigation links do not all become primary buttons.

Labels and section headings use existing RU/EN/ET dictionaries. English wording on the artboard communicates the requested structure; do not create replacement translations or invented dictionary keys from it. Section headings may be visually hidden if existing accessible navigation conventions require that, while preserving the grouping.

Use existing drawer transition behavior and respect reduced-motion settings. No new animation duration is established.

## 10. Panel mapping

| Panel | Content |
| --- | --- |
| A — Light closed | Burger + theme brand appbar; full-width mobile shell |
| B — Light open | Left drawer, current Feed, example Account focus, Pages and CTA; dismissible backdrop |
| C — Dark parity | Closed and open states with the same composition and readable brand |

Feed blocks are schematic context only. They are not real Issue data, required skeletons, author/avatar requirements or an instruction to replace the feed with placeholders.

Minor raster inconsistencies in close-button position do not override anatomy: the close control belongs to the drawer header and must remain reachable independently of backdrop dismissal.

## 11. Implementation handoff and unresolved mappings

Modify the existing MobileAppBar/navigation primitive. Reuse current router links, environment binding, localization and theme assets.

Verify the My stories path and brand master paths in the repository. Check existing behavior when session state or CTA configuration is unavailable. Do not invent new routes or production claims to fill those gaps.

This specification does not assert that runtime assets, keyboard behavior, contrast or deployment have been tested.

## 12. Verification checklist

- [ ] At ≤767 px, brand replaces “Feed coming soon”.
- [ ] Burger opens a left drawer with the specified sections and order.
- [ ] Account uses existing /profile; My stories uses its confirmed existing binding.
- [ ] Static pages and Feed use the listed existing destinations.
- [ ] Submit story uses configured VITE_STORY_GPT_URL behavior without a guessed URL.
- [ ] Correct PNG master is used for each theme without distortion or baked backing.
- [ ] No Wallet or new page is introduced.
- [ ] Chrome is edge to edge with internal safe-area treatment.
- [ ] Targets are at least 44 × 44 CSS px.
- [ ] Backdrop, close and Escape dismiss; interior clicks do not.
- [ ] Focus enters, stays within, and returns appropriately.
- [ ] Background is inert and does not scroll while drawer is open.
- [ ] Drawer content, close and CTA remain reachable on short/narrow viewports.
- [ ] Current-page styling is distinct from keyboard focus.
- [ ] RU/EN/ET labels, dark theme and reduced motion retain existing contracts.

No HTTP behavior, runtime test pass, OP PASS or production deployment is claimed.
