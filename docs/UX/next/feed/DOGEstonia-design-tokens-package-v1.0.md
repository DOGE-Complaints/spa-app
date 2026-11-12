# DOGEstonia Design Tokens Package v1.0

**Target:** DOGEstonia public board continuum, Uus Veerenni civic node  
**Platforms:** responsive web / React.js  
**Themes:** light and dark  
**Status:** implementation handoff  
**Related source of truth:** `DOGEstonia-dashboard-layout-spec-v1.0.md`  
**Theme SSOT (Architect Studio 2026-10-06):**
- **Light** — this package (semantic Light column + primitives below) — operator lock.
- **Dark** — remapped from as-is SPA Night/Orange runtime [`src/styles/tokens.css`](../../../../src/styles/tokens.css) (G9); gaps filled by documented extrapolation (see §3.4, §4.1).
- Product toggle: **user-only** dark|light (no OS `prefers-color-scheme` as theme source). Default first visit: **dark**.

## 1. Purpose

This package converts the approved DOGEstonia visual language into stable, named design decisions that can be shared by design and React implementation.

Tokens are organized into three levels:

1. **Primitive tokens** — raw values such as colors, spacing and font sizes.
2. **Semantic tokens** — purpose-based roles such as page background, primary text or critical status.
3. **Component aliases** — decisions owned by a particular UI component, such as Issue card padding or reaction popover width.

Components should consume semantic tokens and component aliases. They should not reference raw color values directly unless the value is an intentionally fixed brand asset color.

## 2. Canonical naming

Token paths use lowercase dot notation in documentation:

```text
color.primitive.night.900
color.semantic.text.primary
component.issue-card.radius
```

Recommended CSS custom-property form:

```text
--doge-color-text-primary
--doge-space-4
--doge-component-issue-card-radius
```

Rules:

- token names describe purpose, not appearance;
- themes remap semantic tokens, not component structure;
- component names match the React component vocabulary;
- numeric scales remain stable after publication;
- never encode a current pixel value into a token name;
- state colors must not be the only carrier of meaning.

## 3. Color primitives

### 3.1 Brand and accent

| Token | Value | Role |
|---|---|---|
| `color.primitive.brand.night` | `#0B1320` | Canonical deep DOGEstonia brand background |
| `color.primitive.brand.signal-orange` | `#F5A623` | Canonical signal orange |
| `color.primitive.brand.civic-yellow` | `#F5C542` | Primary interactive accent |
| `color.primitive.brand.deep-orange` | `#B54708` | Accessible orange text on light surfaces |
| `color.primitive.brand.warm-orange` | `#E96B19` | Decorative/accent orange; not small text on white |

`signal-orange` and `civic-yellow` are related but not interchangeable:

- `signal-orange` belongs to brand identity, illustration and signal emphasis;
- `civic-yellow` identifies primary interaction and selected controls **on light**;
- on **dark (as-is SPA)**, primary CTA / accent interaction uses `signal-orange` (`#F5A623`) — see §4.1 Dark;
- `deep-orange` is the readable light-theme text/link alias.

### 3.2 Neutral scale

| Token | Value |
|---|---|
| `color.primitive.neutral.0` | `#FFFFFF` |
| `color.primitive.neutral.25` | `#FFFDF8` |
| `color.primitive.neutral.50` | `#F7F6F2` |
| `color.primitive.neutral.100` | `#F1EFE9` |
| `color.primitive.neutral.200` | `#E7E4DC` |
| `color.primitive.neutral.300` | `#D4D0C6` |
| `color.primitive.neutral.400` | `#A8A49B` |
| `color.primitive.neutral.500` | `#7A7D86` |
| `color.primitive.neutral.600` | `#667085` |
| `color.primitive.neutral.700` | `#475467` |
| `color.primitive.neutral.800` | `#252A34` |
| `color.primitive.neutral.850` | `#1B1C1F` |
| `color.primitive.neutral.900` | `#141417` |
| `color.primitive.neutral.950` | `#0B0D12` |

### 3.3 Functional primitives

| Family | 50 | 100 | 500 | 700 |
|---|---|---|---|---|
| Green | `#EAF7EE` | `#D8F0E1` | `#168A5B` | `#146C43` |
| Blue | `#EAF2FF` | `#DCE8FF` | `#3676D8` | `#1849A9` |
| Red | `#FFF0EE` | `#FEE4E2` | `#D92D20` | `#B42318` |
| Amber | `#FFF6D8` | `#FDEAB0` | `#D99A00` | `#8A6100` |
| Violet | `#F3EFFF` | `#E9E0FF` | `#7A5AF8` | `#5D3FD3` |

### 3.4 Night surface primitives (as-is SPA dark · G9)

Canonical deep brand `#0B1320` is already `color.primitive.brand.night`. The shipping SPA dark UI also uses these surfaces (from `tokens.css`). They are **first-class primitives** for Dark semantic mapping — not substitutes for the light neutral scale.

| Token | Value | As-is CSS | Role |
|---|---|---|---|
| `color.primitive.night.bg` | `#0B1320` | `--doge-bg` | Page canvas (alias of `brand.night`) |
| `color.primitive.night.surface-1` | `#111C2B` | `--doge-surface-1` | Primary panels / cards |
| `color.primitive.night.surface-2` | `#172538` | `--doge-surface-2` | Elevated / warm-leaning dark surface |
| `color.primitive.night.border` | `#2B3A4D` | `--doge-border` | Default border |
| `color.primitive.night.border-subtle` | `rgba(43, 58, 77, 0.55)` | `--color-border-subtle` | Soft separators |
| `color.primitive.night.text` | `#FFFFFF` | `--doge-text` | Primary copy |
| `color.primitive.night.text-2` | `#B8C2CF` | `--doge-text-2` | Secondary copy |
| `color.primitive.night.muted` | `#7D8999` | `--doge-muted` | Metadata |
| `color.primitive.night.text-warm` | `#FFF4DE` | `--doge-text-warm` / `--doge-cream` | Warm emphasis copy |
| `color.primitive.night.ink` | `#111111` | `--doge-ink` | Ink on signal orange |
| `color.primitive.night.accent` | `#F5A623` | `--doge-accent` | Signal orange (same primitive as brand) |
| `color.primitive.night.accent-hover` | `#FFB544` | `--doge-accent-hover` | Accent hover |
| `color.primitive.night.accent-active` | `#D98F17` | `--doge-accent-active` | Accent pressed |
| `color.primitive.night.accent-soft` | `rgba(245, 166, 35, 0.14)` | `--doge-accent-soft` | Soft selection / wash |
| `color.primitive.night.danger` | `#FF7B7B` | `--color-danger` | Destructive (as-is) |
| `color.primitive.night.success` | `#9BE28D` | `--color-success` | Success (as-is) |

**Extrapolated** (not present as named vars in `tokens.css`; derived for scheme completeness):

| Token | Value | Basis |
|---|---|---|
| `color.primitive.night.sunken` | `#080E18` | Darker step under `night.bg` for inset wells |
| `color.primitive.night.subtle` | `#1A2536` | Between `surface-1` and `surface-2` for chips/wells |
| `color.primitive.night.border-strong` | `#3D4F66` | Stronger step above `night.border` |
| `color.primitive.night.scrim` | `rgba(11, 19, 32, 0.72)` | Brand-tinted modal backdrop (was generic black 0.60 in prior dark draft) |

## 4. Semantic colors

### 4.1 Theme mapping

**Light** column = approved next visual language (unchanged).  
**Dark** column = as-is SPA Night/Orange (`tokens.css` / §3.4). Values marked *ext.* are extrapolated (see §3.4 table).

| Semantic token | Light | Dark | Usage |
|---|---|---|---|
| `color.semantic.bg.page` | `#F7F6F2` | `#0B1320` | Main application background |
| `color.semantic.bg.surface` | `#FFFFFF` | `#111C2B` | Cards and primary panels |
| `color.semantic.bg.surface-warm` | `#FFFDF8` | `#172538` | Issue card and elevated civic surfaces |
| `color.semantic.bg.subtle` | `#F1EFE9` | `#1A2536` *ext.* | Chips, wells and secondary regions |
| `color.semantic.bg.sunken` | `#ECE9E2` | `#080E18` *ext.* | Composer wells and inset content |
| `color.semantic.bg.scrim` | `rgba(11,13,18,.44)` | `rgba(11,19,32,.72)` *ext.* | Modal backdrop |
| `color.semantic.text.primary` | `#101828` | `#FFFFFF` | Primary copy |
| `color.semantic.text.secondary` | `#667085` | `#B8C2CF` | Supporting copy |
| `color.semantic.text.muted` | `#7A7D86` | `#7D8999` | Metadata and timestamps |
| `color.semantic.text.warm` | `#B54708` *(light: prefer link for small text)* | `#FFF4DE` | Warm emphasis (dark = cream) |
| `color.semantic.text.inverse` | `#FFFFFF` | `#111111` | Text on inverse / on primary CTA fill |
| `color.semantic.text.link` | `#B54708` | `#F5A623` | Inline links and text affordances |
| `color.semantic.text.disabled` | `rgba(16,24,40,.48)` | `rgba(255,255,255,.46)` | Disabled copy |
| `color.semantic.border.default` | `#E7E4DC` | `#2B3A4D` | Standard card and control border |
| `color.semantic.border.strong` | `#D4D0C6` | `#3D4F66` *ext.* | Strong separation |
| `color.semantic.border.focus` | `#D99A00` | `#F5A623` | Keyboard focus ring (dark = signal orange as-is) |
| `color.semantic.action.primary-bg` | `#F5C542` | `#F5A623` | Primary CTA — light civic-yellow / dark signal-orange |
| `color.semantic.action.primary-text` | `#101828` | `#111111` | Copy on primary CTA |
| `color.semantic.action.primary-hover` | `#E7B72E` | `#FFB544` | Primary hover |
| `color.semantic.action.primary-active` | `#D4A820` *ext. light* | `#D98F17` | Primary pressed |
| `color.semantic.action.secondary-bg` | `#F1EFE9` | `transparent` | Secondary buttons (dark as-is: border+text) |
| `color.semantic.action.secondary-bg-hover` | `#E7E4DC` *ext.* | `#111C2B` | Secondary hover wash |
| `color.semantic.action.secondary-text` | `#101828` | `#FFFFFF` | Secondary button copy |
| `color.semantic.action.danger` | `#B42318` | `#FF7B7B` | Destructive/critical action |
| `color.semantic.action.success` | `#146C43` | `#9BE28D` | Success emphasis (dark as-is success) |
| `color.semantic.selection` | `rgba(245,197,66,.28)` | `rgba(245,166,35,.14)` | Selected row/chip (`accent-soft` on dark) |
| `color.semantic.accent.soft` | `rgba(245,197,66,.16)` *ext.* | `rgba(245,166,35,.14)` | Soft accent wash |

**Compatibility bridge (as-is SPA consumer names → semantic):** when wiring CSS, map legacy `--color-bg-primary` → `bg.page`, `--color-bg-secondary` → `bg.surface`, `--color-text-*` / `--color-accent-*` / `--color-border-*` / `--button-*` to the Dark column above so Phase 0 can adopt `data-theme` without renaming every call site in one PR.

### 4.2 Accessibility note

Approved text pairings:

| Foreground / background | Contrast | Use |
|---|---:|---|
| `#101828` / `#F7F6F2` | 16.41:1 | Primary light-theme text |
| `#667085` / `#FFFFFF` | 4.97:1 | Secondary normal-size text |
| `#B54708` / `#FFFFFF` | 5.43:1 | Light-theme orange links |
| `#F5A623` / `#0B1320` | ≥4.5:1 *(verify in implement)* | Dark-theme signal links on page |
| `#111111` / `#F5A623` | high *(as-is G9 CTA)* | Primary button text on dark |
| `#FFFFFF` / `#0B1320` | high | Primary dark-theme text |
| `#B8C2CF` / `#0B1320` | *(verify)* | Dark secondary |
| `#7D8999` / `#0B1320` | *(verify)* | Dark metadata |
| `#101828` / `#F5C542` | 10.94:1 | Primary button text (light) |

Re-measure dark pairs in implement wave; do not treat unverified rows as lab-certified.

`#E96B19` on white is not approved for small text. It remains a decorative brand/accent primitive.

## 5. Status, feedback and civic aliases

Light (default table): soft tint backgrounds + strong text.

| Token group | Background (light) | Text/icon (light) | Meaning |
|---|---|---|---|
| `status.open` | Green 50 | Green 700 | Open Issue |
| `status.in-review` | Blue 50 | Blue 700 | Under review |
| `status.resolved` | Green 100 | Green 700 | Resolved or completed |
| `status.closed` | Neutral 100 | Neutral 700 | Closed/inactive |
| `feedback.info` | Blue 50 | Blue 700 | Informational feedback |
| `feedback.success` | Green 50 | Green 700 | Successful completion |
| `feedback.warning` | Amber 50 | Amber 700 | Warning or constrained action |
| `feedback.error` | Red 50 | Red 700 | Visible fail-soft error |
| `identity.verified` | Green 500 | Green 500 | Opaque verified result |

**Dark (*ext.*):** same token names; remap to night-readable pairs (text remains the carrier of meaning). Until a design pass replaces these, use:

| Token group | Background (dark *ext.*) | Text/icon (dark *ext.*) |
|---|---|---|
| `status.open` | `rgba(22,138,91,.22)` | `#9BE28D` |
| `status.in-review` | `rgba(54,118,216,.22)` | `#B8C2CF` |
| `status.resolved` | `rgba(22,138,91,.28)` | `#9BE28D` |
| `status.closed` | `#1A2536` | `#7D8999` |
| `feedback.info` | `rgba(54,118,216,.22)` | `#B8C2CF` |
| `feedback.success` | `rgba(155,226,141,.16)` | `#9BE28D` |
| `feedback.warning` | `rgba(245,166,35,.16)` | `#F5A623` |
| `feedback.error` | `rgba(255,123,123,.16)` | `#FF7B7B` |
| `identity.verified` | Green 500 | `#9BE28D` |

Backend enum names are not inferred from this table. These aliases apply only when an equivalent product state exists.

## 6. Reaction aliases

Localized reaction text is authoritative. Color and icon are supporting cues only.

| Reaction id | Layer | Accent | Soft background |
|---|---|---|---|
| `acknowledge` | Emotional | `#D99A00` | `#FFF6D8` |
| `support` | Emotional | `#E96B19` | `#FFF1E8` |
| `agree` | Epistemic | `#168A5B` | `#EAF7EE` |
| `disagree` | Epistemic | `#B42318` | `#FFF0EE` |
| `off_topic` | Moderation | `#7A5AF8` | `#F3EFFF` |

Rules:

- `agree` and `disagree` are mutually exclusive;
- moderation aliases are unavailable on the thread root;
- the feed action strip shows only the compact reaction trigger/aggregate;
- full catalog colors appear in the picker, not as a permanent multicolor toolbar;
- disabled catalog entries are omitted or clearly unavailable;
- a user may select up to the configured maximum, default 3;
- never encode voice weight, authority or civic priority through reaction color.

## 7. Typography

### 7.1 Font families

| Token | Value |
|---|---|
| `font.family.ui` | `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| `font.family.mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |
| `font.family.brand` | Brand artwork only; never synthesize the logo with UI type |

### 7.2 Font weights

| Token | Value |
|---|---:|
| `font.weight.regular` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| `font.weight.bold` | 700 |

### 7.3 Type scale

| Token | Size / line-height | Weight | Use |
|---|---|---:|---|
| `type.display` | 32 / 40 px | 700 | Rare large page statement |
| `type.heading-1` | 28 / 36 px | 700 | Board/page title |
| `type.heading-2` | 22 / 28 px | 700 | Issue title, dialog title |
| `type.heading-3` | 18 / 24 px | 700 | Rail module and section title |
| `type.body-lg` | 16 / 24 px | 400 | Primary body copy |
| `type.body-md` | 15 / 22 px | 400 | Issue summary and comments |
| `type.body-sm` | 14 / 20 px | 400 | Controls and supporting copy |
| `type.meta` | 13 / 18 px | 500 | Issue id, time, location |
| `type.caption` | 12 / 16 px | 500 | Labels and compact annotations |

Mobile overrides:

- page heading: `24 / 32 px`;
- Issue title: `18 / 24 px`;
- dialog/sheet title: `20 / 28 px`;
- body and metadata scales remain unchanged unless horizontal fit requires the `body-sm` alias.

Typography rules:

- use `rem` in implementation, with 16 px root equivalence;
- do not reduce metadata below 12 px;
- allow browser text zoom and user font preferences;
- use tabular numbers for counts that update in place;
- logo typography is an image/vector asset, not an approximation in Inter.

## 8. Spacing

Base unit: **4 px**. Primary layout rhythm: **8 px**.

| Token | Value | Typical use |
|---|---:|---|
| `space.0` | 0 | Reset |
| `space.0-5` | 2 px | Optical adjustment only |
| `space.1` | 4 px | Icon/copy micro gap |
| `space.2` | 8 px | Chips and compact metadata |
| `space.3` | 12 px | Dense rows and narrow gutters |
| `space.4` | 16 px | Card padding and mobile gutter |
| `space.5` | 20 px | Desktop card rhythm |
| `space.6` | 24 px | Column gap and section separation |
| `space.8` | 32 px | Large section separation |
| `space.10` | 40 px | Control/search scale |
| `space.11` | 44 px | Minimum preferred touch target |
| `space.12` | 48 px | Primary control and page safe space |
| `space.14` | 56 px | Post action row / mobile header |
| `space.16` | 64 px | Desktop header and dialog header |

Components may use 10 px, 14 px or 18 px only where already specified for typography or optical alignment. They are not general layout spacing tokens.

## 9. Size and control tokens

| Token | Value | Usage |
|---|---:|---|
| `size.icon.xs` | 16 px | Status and avatar badge |
| `size.icon.sm` | 20 px | Inline control icon |
| `size.icon.md` | 24 px | Standard navigation/action icon |
| `size.icon.lg` | 32 px | Empty state or civic marker |
| `size.avatar.reply` | 32 px | Nested comment |
| `size.avatar.person` | 36 px | Compact people list |
| `size.avatar.comment` | 40 px | Root comment/dialog list |
| `size.avatar.profile` | 48 px | Post/profile identity |
| `size.control.compact` | 36 px | Filter chip/compact segmented control |
| `size.control.default` | 40 px | Desktop search and toolbar control |
| `size.control.touch` | 44 px | Preferred minimum touch/click target |
| `size.control.primary` | 48 px | Primary CTA |

The visible glyph may be 16–24 px while its interactive box remains 44 px or larger.

## 10. Radius and border

| Token | Value | Usage |
|---|---:|---|
| `radius.none` | 0 | Full-height mobile sheet |
| `radius.xs` | 4 px | Small indicator |
| `radius.sm` | 8 px | Buttons, chips, nested wells |
| `radius.media` | 10 px | Post media |
| `radius.card` | 12 px | Issue and rail cards |
| `radius.dialog` | 16 px | Desktop dialog and modal |
| `radius.pill` | 999 px | Chips, avatars, pill controls |
| `border.width.default` | 1 px | Cards and controls |
| `border.width.strong` | 2 px | Focus/selected emphasis |
| `border.width.nav-active` | 3 px | Active header navigation underline |

## 11. Elevation

Light-theme shadows:

| Token | Value | Usage |
|---|---|---|
| `elevation.0` | `none` | Flat card on separated background |
| `elevation.1` | `0 1px 2px rgba(16,24,40,.06)` | Header or subtle raised control |
| `elevation.2` | `0 6px 18px rgba(16,24,40,.10)` | Dropdown and small picker |
| `elevation.3` | `0 12px 32px rgba(16,24,40,.16)` | Popover/dialog |
| `elevation.4` | `0 20px 56px rgba(16,24,40,.22)` | Issue modal |

Dark theme (Night): prefer **borders** (`border.default`) plus reduced shadows (as-is SPA is largely flat; shadows *ext.* for overlays only):

| Token | Value |
|---|---|
| `elevation.0.dark` | `none` |
| `elevation.1.dark` | `0 1px 2px rgba(0,0,0,.28)` |
| `elevation.2.dark` | `0 8px 24px rgba(0,0,0,.40)` |
| `elevation.3.dark` | `0 16px 40px rgba(0,0,0,.52)` |

Never use glow as an elevation mechanism. Do not reintroduce purple/ambient glow for Night brand.

## 12. Breakpoints and responsive aliases

Breakpoints represent layout changes, not named devices.

| Token | Value | Behavior beginning at this width |
|---|---:|---|
| `breakpoint.compact` | 320 px | Accessibility/reflow boundary |
| `breakpoint.phone` | 480 px | Wider phone composition |
| `breakpoint.tablet` | 768 px | Centered single-column tablet |
| `breakpoint.tablet-wide` | 1024 px | Optional left rail / two-column layout |
| `breakpoint.desktop` | 1200 px | Canonical three-column board |
| `breakpoint.wide` | 1600 px | Canvas stops growing |

QA frames are not breakpoints:

```text
320 × 700
360 × 800
390 × 844
768 × 1024
1024 × 768
1280 × 800
1440 × 1024
1600 × 1000
```

### Layout aliases

| Token | Compact | Tablet | Desktop |
|---|---:|---:|---:|
| `layout.header.height` | 56 px | 60 px | 64 px |
| `layout.page.gutter` | 12–16 px | 24 px | 24–32 px |
| `layout.page.max-width` | 100% | 760 px feed | 1600 px canvas |
| `layout.left-rail.width` | off-canvas | 216 px optional | 224–264 px |
| `layout.right-rail.width` | inline/later | inline/later | 280–320 px |
| `layout.column.gap` | 0 | 20 px | 20–24 px |
| `layout.feed.min-width` | 0 | 640 px where two-column | 640 px |

## 13. Motion

| Token | Value | Usage |
|---|---:|---|
| `motion.duration.instant` | 0 ms | Immediate data/state correction |
| `motion.duration.fast` | 100 ms | Hover/focus color |
| `motion.duration.short` | 160 ms | Button and chip response |
| `motion.duration.medium` | 240 ms | Popover/dialog entrance |
| `motion.duration.long` | 320 ms | Mobile sheet transition |
| `motion.easing.standard` | `cubic-bezier(.2, 0, 0, 1)` | Most UI transitions |
| `motion.easing.exit` | `cubic-bezier(.4, 0, 1, 1)` | Elements leaving |
| `motion.easing.emphasized` | `cubic-bezier(.2, .8, .2, 1)` | Sheet/dialog entrance |

Motion rules:

- do not animate feed layout reflow merely for decoration;
- reactions provide immediate state feedback without celebratory effects;
- modal backdrop and content may transition together but remain separately focus-managed;
- under `prefers-reduced-motion: reduce`, remove transforms and reduce non-essential durations to 1 ms;
- loading placeholders may use a low-contrast pulse, never aggressive shimmer.

## 14. Layer and opacity tokens

### 14.1 Z-index

| Token | Value |
|---|---:|
| `layer.base` | 0 |
| `layer.raised` | 10 |
| `layer.header` | 30 |
| `layer.popover` | 40 |
| `layer.toast` | 60 |
| `layer.issue-modal` | 70 |
| `layer.dialog` | 80 |
| `layer.tooltip` | 90 |

Component code must use layer tokens rather than arbitrary numbers.

### 14.2 State opacity

| Token | Value |
|---|---:|
| `opacity.hover` | 0.06 |
| `opacity.pressed` | 0.10 |
| `opacity.focus` | 0.12 |
| `opacity.disabled-content` | 0.48 |
| `opacity.scrim-light` | 0.44 |
| `opacity.scrim-dark` | 0.60 |

## 15. Focus tokens

| Token | Value |
|---|---|
| `focus.ring.width` | 2 px |
| `focus.ring.offset` | 2 px |
| `focus.ring.color.light` | `#D99A00` |
| `focus.ring.color.dark` | `#F5A623` | *(as-is SPA `--focus-ring-color` / signal orange)* |
| `focus.ring.radius-adjustment` | component radius + 2 px |

Focus visibility must not depend on browser default outlines being removed. `:focus-visible` is preferred for pointer/keyboard distinction.

## 16. Component aliases

### 16.1 Page and shell

| Token | Value |
|---|---|
| `component.header.height.desktop` | 64 px |
| `component.header.height.tablet` | 60 px |
| `component.header.height.mobile` | 56 px |
| `component.header.search.width` | 320 px, max 420 px |
| `component.rail.padding` | 16 px |
| `component.rail.module-gap` | 16 px |
| `component.feed.card-gap` | 20 px |

### 16.2 Issue card

| Token | Value |
|---|---|
| `component.issue-card.padding.desktop` | 20 px |
| `component.issue-card.padding.mobile` | 16 px |
| `component.issue-card.radius.desktop` | 12 px |
| `component.issue-card.radius.mobile` | 10 px |
| `component.issue-card.identity-icon` | 48 px |
| `component.issue-card.identity-gap` | 14 px |
| `component.issue-card.media-radius` | 10 px |
| `component.issue-card.media-ratio` | 16 / 9 preferred |
| `component.issue-card.action-height.desktop` | 56 px |
| `component.issue-card.action-height.mobile` | 52 px |

### 16.3 Thread

| Token | Value |
|---|---|
| `component.thread.padding.desktop` | 20 px |
| `component.thread.padding.mobile` | 16 px |
| `component.thread.comment-gap` | 16 px |
| `component.thread.avatar.root` | 40 px |
| `component.thread.avatar.reply` | 32 px |
| `component.thread.indent.desktop` | 44 px |
| `component.thread.indent.mobile` | 24 px |
| `component.thread.depth.visual-max` | 3 |
| `component.thread.attachment.max-width` | 420 px |
| `component.composer.height.collapsed` | 72 px |
| `component.composer.height.context` | 112 px minimum |

### 16.4 Overlays

| Token | Value |
|---|---|
| `component.reaction-picker.width` | 360 px |
| `component.reactors-popover.width` | 320 px |
| `component.reactors-popover.max-height` | 440 px |
| `component.reactors-popover.header-height` | 48 px |
| `component.reactors-popover.row-height` | 52 px |
| `component.reactions-dialog.width` | 560 px |
| `component.reactions-dialog.max-height` | 80vh |
| `component.reactions-dialog.row-height` | 64 px |
| `component.issue-modal.width` | 960–1040 px |
| `component.issue-modal.max-height` | 90vh |
| `component.toast.max-width` | 360 px |

On mobile, Issue modal becomes `100vw × 100dvh`; reactions dialog and eligible popovers become viewport-safe sheets.

## 17. Theme invariants

**Activation (Architect lock 2026-10-06):** `data-theme="light" | "dark"` on `document.documentElement` plus `color-scheme: light | dark`. Semantic CSS variables remap under `[data-theme="…"]`; components consume semantics only. Default before first paint: **dark**. Persistence: `localStorage` key **`dogestonia.theme`**; account sync OOS. Toggle host: Public Header (locale \| theme \| …).

Light and dark themes must preserve:

- identical component hierarchy;
- identical spacing and dimensions;
- identical responsive breakpoints;
- identical information priority;
- identical reaction catalog and state logic;
- identical accessibility names and keyboard order.

Themes may change:

- semantic colors;
- shadows and border strength;
- media placeholder treatment;
- scrim opacity;
- focus-ring color alias.

Themes must not change:

- content visibility;
- state availability;
- status meaning;
- reaction meaning;
- component placement.

## 18. Token ownership and governance

1. Primitive tokens may be extended without changing existing names.
2. Semantic token changes require visual regression of light and dark themes.
3. Component aliases may change only with the corresponding component specification.
4. Published tokens are never silently repurposed.
5. Deprecated tokens remain as aliases for one implementation cycle.
6. A token change must state whether it is visual-only or changes layout behavior.
7. Node-specific themes may override brand presentation tokens but not civic state semantics or accessibility rules.
8. Cultural ornament tokens must never encode status, priority, progress or confidence.

## 19. Recommended implementation shape

```text
tokens/
├─ primitives/
│  ├─ color
│  ├─ spacing
│  ├─ typography
│  ├─ radius
│  └─ motion
├─ semantic/
│  ├─ light
│  ├─ dark
│  ├─ status
│  └─ reactions
└─ components/
   ├─ shell
   ├─ issue-card
   ├─ thread
   ├─ composer
   └─ overlays
```

This document defines the canonical values. A later implementation task may project them into CSS variables, TypeScript constants, a Design Tokens Community Group compatible JSON format, Tailwind theme values, or another build-specific representation without changing the semantic names.

## 20. Acceptance checklist

- [ ] No component contains a raw hex value when a semantic token exists.
- [ ] Light and dark modes use the same geometry.
- [ ] Small orange text on light surfaces uses `text.link`, not `warm-orange`.
- [ ] Every interactive element has a visible focus state.
- [ ] Touch layouts expose at least a 44 × 44 px preferred target.
- [ ] Text and control contrast is tested in both themes.
- [ ] Reaction text remains understandable without color or emoji.
- [ ] Status labels include text, not color alone.
- [ ] `prefers-reduced-motion` removes non-essential motion.
- [ ] Components use layer tokens rather than arbitrary z-index values.
- [ ] Mobile sheets respect safe areas and `100dvh`.
- [ ] ET/RU/EN strings do not force direct token overrides.
- [ ] Node-specific branding cannot redefine civic state semantics.

