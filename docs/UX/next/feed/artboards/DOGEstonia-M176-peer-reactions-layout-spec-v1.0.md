# DOGEstonia M176 — Peer Reactions Empty Affordance and Shared Layout Lock

**Version:** 1.0  
**Date:** 2026-10-24  
**Status:** M176 rev2 accepted by the operator; implementation specification.  
**Surface:** civic Issue post action strip in SPA `#/next/feed`.  
**Accepted artboard:** `exec-0c5db0f5-8730-40d0-b954-4a97e7a03df7.png`.  
**Supersedes:** M176 v1 with the empty people icon below the label.

## 1. Purpose and authority

Give the empty peer-reactions entry a calm visible affordance and align it with neighboring controls. The operator rejected the icon-below-label arrangement because it created visual dissonance, then accepted rev2 with the icon above the label.

Written rules in this document govern implementation and future related artboards. Do not recover spacing, typography or behavior from raster imperfections.

Continuity:

- M164: four-zone order, stable own React footprint, default maximum three own selected marks.
- M163: one wide neutral React underlay; no nested inner pill.
- M154: existing own-reaction picker, eligibility and reaction catalog.
- M155: existing people surface and its data/availability rules.
- Existing icon catalog / Gap v2: asset language and approved reaction masters.

M176 changes the peer-zone empty presentation and documents its layout. It does not redesign the picker, people surface, Comment, Share or own-selection behavior.

## 2. Shared layout lock — reuse for future related artboards

**Reference name: M176 / civic action-strip peer alignment.**

Future artboards addressing this block MUST cite this section and reuse this anatomy unless the operator explicitly changes it.

| Element | Locked rule |
| --- | --- |
| Order | React → Comment → Share → Reactions |
| Entry composition | Entry icon ABOVE its label, centered on the same vertical axis |
| Icon row | Match the optical center, apparent size and stroke weight of neighboring entry icons |
| Label row | Entry labels share one baseline; Reactions must not float above its neighbors |
| Empty peer entry | Neutral people/group icon above the localized Reactions label |
| Filled peer content | Existing aggregate chips in a reserved lane below the label, inside the peer zone |
| Geometry | Empty/filled changes do not move neighbors or change strip height at the same viewport and text settings |
| Own React | Separate zone, existing wide underlay and reserved own-icon capacity; never filled from peer summary |
| Interaction | Peer zone is one coherent people-surface entry; icon/chips do not create a new picker trigger |
| Focus | Visible around the actual outer peer entry, not the icon alone |
| Theme parity | Same geometry in light and dark |

Reserve the space needed for state-dependent content consistently. Empty reserved space is allowed; it must not be filled with fake marks, zero counters or loading symbols.

The accepted correction establishes **icon above label** for the empty peer entry. The filled panel is not authority to introduce a second empty affordance or change the existing filled-state icon policy. Its chips remain the existing filled summary. Where rev2 pixels differ between panels, apply the shared baseline and stable-footprint rules above.

This is a reusable layout decision for this action-strip family, not a blanket redesign of unrelated controls elsewhere in DOGEstonia.

## 3. Anatomy and ownership

| Zone | Content | Action |
| --- | --- | --- |
| React | Existing entry and actual own selected marks, default 0–3 | Existing M154 own picker |
| Comment | Existing icon + localized label | Existing comment action |
| Share | Existing icon + localized label | Existing Share action |
| Reactions | Localized label; neutral people icon when known empty; existing peer chips when filled | Existing M155 people surface |

Keep Comment and Share flat/transparent. Preserve React's one wide underlay. Do not add an underlay solely to emphasize an empty Reactions state.

No page-wide aggregate row appears below the strip. Filled chips are local to the rightmost zone; own selected icons are local to the leftmost React zone.

The earlier M164 text-only peer-entry restriction is superseded only to the extent needed for this accepted empty-state people affordance and the explicitly requested existing filled-chip continuity. M164's own/peer separation and stable geometry remain authoritative.

## 4. State matrix

| State | Peer presentation | Meaning |
| --- | --- | --- |
| Known empty | People icon above Reactions; no fabricated count or marks | Summary is confirmed empty under the existing contract |
| Filled | Existing aggregate chips and localized Reactions label | Real supplied aggregate data, using existing semantics |
| Loading | Existing loading presentation | Not known empty |
| Unavailable/error | Existing honest scoped unavailable/recovery presentation | Not known empty |
| Own marks changed | Update only the React own-selection lane | Does not determine peer empty/filled state |

Never interpret missing data, a failed request or absent permissions as an empty result. Never infer peer emptiness by subtracting own marks from totals.

## 5. Empty peer entry

Use a calm neutral people/group glyph consistent with existing people chrome. It represents access to people/reactions, not a selectable reaction.

- Place the icon above Reactions, like the icon-above-label rhythm of Comment and Share.
- Keep its apparent visual weight compatible with the adjacent controls.
- Do not add a plus, person-add cue, selected check, reaction badge, avatar or fake identity.
- Do not display a reaction counter of zero or a fabricated participant count.
- A supplementary empty label is not required by the accepted layout; do not add new product copy from annotations.

Existing M155 availability and empty-state behavior govern activation. This visual does not assert that people identities are accessible or that a new data source exists.

## 6. Filled continuity and counts

Reuse existing aggregate chips, catalog IDs, glyph mapping, ordering and labels. M176 does not create a reaction set or authorize substituting new emoji.

The artboard's heart + 2 and agree + 1 are **illustrative fixtures** for chip density. They are reaction totals, not a unique-person count, and are not production data or a mandated default.

Do not combine multiple marks into a guessed number of people. Optional unique-person counts remain subject to a confirmed existing data contract. Do not fabricate names, avatars, totals or actor-inclusion rules.

Do not add separate mutation or picker actions to filled chips as a side effect of this layout work. Preserve confirmed existing behavior and use M155 for the peer-entry handoff.

## 7. Dimensions and spacing

| Item | Guidance | Authority |
| --- | --- | --- |
| Entry icon | Approximately 20–24 CSS px; match neighboring optical size | Proposed visual range; inherit confirmed tokens |
| Icon-to-label gap | Approximately 6 CSS px | Proposed value on rev2 |
| Gap to Share | At least approximately 16 CSS px between visible content groups | Proposed value; not a new zone-width token |
| Interactive target | At least 44 × 44 CSS px | Required minimum |
| Shared rows | Align icon optical centers and label baselines | Locked layout requirement |

The values marked proposed are not silently promoted to global design tokens. Prefer existing confirmed values where available. Resolve optical differences through the icon's view box and alignment, not by moving the label off the common baseline.

Measure gaps between the intended content boundaries, not between incidental pixels or callout guides. Do not use the artboard's magnification as CSS scale.

## 8. Responsive and localization behavior

At narrow widths around 390 CSS px, preserve four zones, readable labels, minimum touch targets and the own/peer distinction. State changes must not shrink typography or move neighboring controls.

Reserve sufficient height for the filled lane consistently across empty and filled states. If larger text or localization needs more space, enlarge the shared layout consistently; do not clip text or compress one state.

Product labels come from existing i18n. The artboard uses Russian `Реакции` for the peer entry and English labels for context; this mixed-language sheet does not authorize mixed-language runtime UI.

## 9. Light, dark and accessibility

Reuse established warm neutral light surfaces, primary/secondary ink and existing dark semantic roles. Maintain readable icon strokes and labels without increasing contrast through a new saturated fill.

The peer zone remains keyboard accessible with a meaningful localized accessible name. The people icon is decorative when the parent entry already supplies that name. Preserve aggregate meaning for assistive technology through existing labeled content.

Focus is visible at the actual outer control boundary. Keep existing focus handoff to M155 and focus return to the activating peer entry. Do not copy the blue artboard focus color as a newly approved token.

## 10. Artboard panels and raster limitations

| Panel | Purpose |
| --- | --- |
| A — Light empty | Accepted icon-above-label correction; calm neutral people affordance |
| B — Light filled | Existing chips and their spacing within the rightmost zone |
| C — Dark parity | Equivalent empty/filled separation and visible outer focus |

Documentation arrows, fixture captions, proposed-value notes and dashed M155 container are not product UI.

The small M155 schematic is symbolic only. Do not implement its placeholder bars, header, icon placement or modal proportions. Reuse the existing component unchanged.

The generated filled panels contain minor alignment/icon inconsistencies. They do not override §2: preserve existing filled content, align labels with peers and keep the footprint stable. Do not add a people glyph to a filled state merely because one raster panel contains it.

## 11. Asset and implementation boundaries

Exact existing people-icon master/runtime mapping was not supplied with M176. Reuse the verified existing asset if available; otherwise record the mapping gap. The generated glyph is a visual direction, not a new approved SVG master or invented filename.

No new reaction IDs, API, payload fields, endpoints, writes, permission logic or people-list implementation are defined. No HTTP or runtime OP PASS is claimed.

For the next related artboard, reference:

> Reuse DOGEstonia M176 spec v1.0 §2 shared layout lock: entry icon above label, shared icon row and label baseline, stable per-viewport footprint; own marks stay in React, peer summary stays in Reactions; existing M154/M155 components unchanged.

## 12. Acceptance checklist

- [ ] Empty peer icon is above the label in both themes.
- [ ] Icon optical row and label baseline align with neighboring controls.
- [ ] Empty and filled states preserve strip geometry.
- [ ] Existing filled chips retain their catalog and count semantics.
- [ ] Own React remains separate and stable for default 0–3 selections.
- [ ] No page-wide aggregate row or nested React pill appears.
- [ ] Peer activation uses existing M155; own React uses M154.
- [ ] Loading and unavailable are not rendered as empty.
- [ ] Touch, keyboard, focus and localization remain usable.
- [ ] Asset mapping is verified or explicitly unresolved.
- [ ] No fixture is presented as real data or a runtime pass.

## 13. Recorded decision

On 2026-10-24, the operator accepted M176 rev2 and requested that this layout be fixed for future related artboards. The reference lock is §2. Exact icon-master mapping and proposed numerical token adoption remain implementation details requiring verification, not reasons to redesign the accepted composition.
