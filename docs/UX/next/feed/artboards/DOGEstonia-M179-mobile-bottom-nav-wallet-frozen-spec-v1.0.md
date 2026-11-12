# DOGEstonia M179 — Compact Mobile Bottom Navigation / Wallet Frozen

**Version:** 1.0  
**Date:** 2026-10-25  
**Surface:** existing next-shell MobileBottomNav.  
**Artboard:** `exec-eba3e0d8-f034-4064-b110-13b8812f10d9.png`.  
**Status:** specification requested after visual review; no runtime pass claimed.

## 1. Purpose and scope

Reduce the vertical footprint of the existing mobile bottom navigation while keeping usable labels, real minimum touch targets and safe-area support.

Keep Feed and Profile navigation. Add a third Wallet slot as an explicitly frozen, disabled future destination with a Dogecoin-style coin glyph.

This authorizes a visible frozen slot only. It does not enable Wallet functionality, create a Wallet route, fetch balances or change CAB-08 Wallet/Contribution gates.

Current operator instructions and this specification govern. Existing next-shell route, breakpoint, theme, localization and accessibility contracts remain authoritative for unchanged behavior. Generated pixels do not define exact tokens.

## 2. Navigation anatomy

Three equal-width slots in this order:

| Slot | Destination / behavior | State |
| --- | --- | --- |
| Feed | Existing `/next/feed` binding | Live navigation |
| Profile | Existing `/profile` binding | Live navigation |
| Wallet | No destination or activation | Frozen / disabled |

Use existing router syntax and active-route matching. Do not invent a new route or mark Wallet current.

Each slot shows an icon above its localized label. Keep a common icon row, label baseline and content height. Switching Feed/Profile changes styling, not bar geometry.

Reuse existing Feed/Profile assets. No new glyph catalog is introduced.

## 3. Proposed compact geometry

| Property | Proposed value / rule |
| --- | --- |
| Navigation content band | 52 CSS px, excluding safe-area |
| Actual live control target | At least 44 × 44 CSS px |
| Wallet slot footprint | Same allocated geometry as peers |
| Icon size | 20 CSS px |
| Label font / line height | 11 / 14 CSS px |
| Icon-to-label gap | 2 CSS px |
| Outer vertical padding | Approximately 6 CSS px |
| Bottom safe-area | Existing device-dependent inset, additional to content band |

These compact dimensions are proposals, not measured current runtime values or newly approved global tokens. Reuse confirmed tokens where appropriate while meeting the requested reduction.

The illustrative icon/label stack is 20 + 2 + 14 = 36 px; 6 px top and bottom padding produces 48 px, leaving room within the proposed 52 px band. Align the complete stack consistently without accumulating extra nested padding.

Do not set the live target height below 44 px or substitute a small visible control plus an invisible target expansion. Equal slot widths must also preserve the minimum target width.

Labels must remain readable. Larger text, localization or accessibility settings may increase the band height. Do not shrink text to retain exactly 52 px.

The “Current” height diagram is schematic. Measure the actual existing bar before reporting an exact reduction; no current height or saved-pixel percentage is established.

## 4. Safe-area and content clearance

Total occupied bottom space is:

**navigation content height + existing bottom safe-area inset**

Retain the existing safe-area mechanism, such as `env(safe-area-inset-bottom)` where applicable. Apply it once; avoid doubled insets from nested shell wrappers.

The inset region continues the same navigation surface. Do not render a different-color band, separator, text label or fake device home indicator from the artboard.

If the existing bar overlays or fixes to the viewport, update the page's bottom clearance to its actual total height so the last content and controls remain reachable. Preserve existing positioning behavior rather than introducing a new fixed/sticky model.

Do not reserve the old tall height after the compact bar is implemented. Keep the width edge to edge within the shell's safe-area conventions.

## 5. Active, inactive, focus and frozen states

| State | Presentation |
| --- | --- |
| Current Feed/Profile | Existing clear current-route emphasis |
| Other live slot | Normal readable inactive icon and label |
| Keyboard focus | Existing visible focus around the actual live target |
| Wallet frozen | Readable secondary/disabled styling, never current-route emphasis |

Current-route state and focus are distinct. The blue ring around Feed on the sheet is an example, not permanent decoration or a new focus color token.

Do not give inactive Profile/Feed the same disabled semantics as Wallet. Do not make Wallet unreadable through extreme opacity.

Wallet's future availability must be conveyed accessibly, not solely by color. Reuse existing localized disabled/coming-soon copy where available. If an appropriate string is missing, record that copy gap rather than implying a working destination.

The artboard's “Coming soon” leaders and captions are documentation. They do not mandate an extra text row that makes the navigation taller. Integrate the existing status convention compactly; retain an accessible unavailable/future-state description.

## 6. Wallet behavior and CAB-08 boundary

Wallet is not an active link, button with a fake action, modal trigger or hidden route. It must not navigate, load data or start onboarding.

Use accessible noninteractive/disabled semantics consistent with the existing component. Preserve its label and future-state description in the accessibility tree, but do not add an inert tab stop that behaves like a live navigation action.

No balance, currency amount, transaction count, address, token metric, connection flow or Wallet API is introduced.

CAB-08 Wallet and Contribution panels remain gated. No placeholder panel is added to /profile or elsewhere.

M177's drawer still has no Wallet entry. M179 adds a frozen slot specifically to MobileBottomNav; it does not expand the drawer menu.

Do not delete frozen feature code or alter its future rollout policy.

## 7. Dogecoin-style glyph and export requirement

Use a compact Dogecoin-style coin silhouette: round coin with a barred capital D / Ð-style mark, distinguishable from Bitcoin B and a generic wallet.

Match the existing next-shell icon weight and visual scale. Avoid a new dog mascot, shiny 3D coin, promotional illustration or decorative token art.

First check the current asset catalog/repository for an appropriate existing glyph and reuse it.

If absent, provide a separate native vector SVG or transparent PNG under **`public/icons/next-shell/`**, following the repository's actual asset naming and promotion conventions. This path is the requested target area, not evidence that a new asset is already installed.

An SVG must contain native vector geometry rather than an embedded raster wrapper. A PNG must have real transparency and sufficient resolution for the intended display density. Reuse currentColor/theme handling where compatible with the existing asset system.

Exact filename and asset mapping remain unverified. The glyph drawn by image generation is a visual reference, not a delivered production master. Do not crop it from the artboard and claim the export requirement complete.

No separate SVG/PNG glyph export is included in this M179 specification package; asset presence and export remain an implementation handoff item.

## 8. Theme, localization and accessibility

Preserve equivalent geometry in light and dark. Use current semantic navigation surface, text, disabled, current-route and focus roles. Do not sample generated shading, yellow underlays or grey coin fills as new tokens.

Labels use existing i18n. English Feed/Profile/Wallet on the sheet communicates structure; do not invent new RU/ET translations or dictionary keys.

Use semantic navigation for live destinations and existing programmatic current-page indication. Decorative icons must not duplicate accessible names.

Maintain keyboard activation and visible focus for Feed/Profile. Frozen Wallet remains clearly unavailable, with no API activity or side effects on hover, focus or tap.

Respect larger text and reduced motion. A compact bar is not a reason to hide essential labels or reduce accessible targets.

## 9. Responsive scope

Apply the change to the existing MobileBottomNav at its current shell visibility breakpoints. M179 does not introduce a new breakpoint or require the bar on desktop.

At narrower widths, preserve equal slot allocation and readable labels without horizontal overflow. Account for orientation changes and device insets.

Keep the bottom navigation behavior consistent with M177 appbar/drawer and M178 single-column profile layout; do not duplicate navigation bars.

## 10. Artboard mapping and raster cautions

| Panel | Purpose |
| --- | --- |
| A — Light Feed active | Three slots, frozen Wallet, example Feed focus, compact band and inset |
| B — Light Profile active | Same layout with Profile current |
| C — Dark | Both live-route states with Wallet still frozen |
| Height diagram | Proposed reduction; current height explicitly unmeasured |

Feed/profile content above the bar is schematic only. It does not introduce new account cards, loading states or API data.

Safe-area text inside the illustration is an annotation, not product UI. Its apparent different tint does not override the continuous-surface requirement.

The large-scale screenshot may look taller than 52 CSS px; written dimensions and actual runtime typography govern.

## 11. Reusable layout reference

For later artboards, cite:

> M179: compact three-slot MobileBottomNav, Feed/Profile live and Wallet frozen; common icon/label rhythm, live targets ≥44 px, proposed 52 px content band plus existing safe-area; no Wallet route, API, balance or CAB-08 unfreeze.

## 12. Verification checklist

- [ ] Feed and Profile retain existing live destinations.
- [ ] Three slots have stable equal allocation and common icon/label rhythm.
- [ ] Proposed compact sizing removes excess padding without shrinking targets.
- [ ] Actual controls remain at least 44 × 44 CSS px.
- [ ] Safe-area remains additional, continuous and applied once.
- [ ] Page bottom clearance matches actual bar height.
- [ ] Active route, inactive live action, focus and disabled Wallet are distinct.
- [ ] Wallet has an honest accessible frozen state and no activation.
- [ ] No Wallet route, API request, balance or onboarding is added.
- [ ] CAB-08 panels and M177 drawer restrictions remain unchanged.
- [ ] Existing coin asset is reused or missing export is tracked explicitly.
- [ ] Asset export is not claimed complete from the raster.
- [ ] Dark theme, localization and larger text remain usable.
- [ ] Current height is measured before any exact reduction claim.

No HTTP contract, runtime test pass, OP PASS, production asset delivery or deployment is claimed.
