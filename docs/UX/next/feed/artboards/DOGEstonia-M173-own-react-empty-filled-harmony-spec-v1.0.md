# DOGEstonia M173 — Own React Empty/Filled Harmony

**Version:** 1.0  
**Date:** 2026-10-24  
**Surface:** SPA `#/next/feed`, civic Issue action strip.  
**Artboard:** `exec-a7bbd6f2-c227-4e0f-82db-a375868bbfd1.png`.  
**Status:** specification of the reviewed visual direction, requested by the operator; no runtime acceptance claim.

## 1. Purpose

Keep the own React entry optically level with Comment when `selected[]` contains zero, one, two or three marks. Empty and filled states share the same icon row, label baseline, outer dimensions and hit height.

Written requirements override raster inconsistencies. The artboard communicates anatomy, not exact CSS measurements or production asset mapping.

## 2. Authority and continuity

- **M176 spec v1.0 §2:** shared action-strip alignment: entry icon above label, common baseline and stable footprint.
- **M164:** own/peer separation, default maximum three own marks, reserved own-icon lane.
- **M163:** a single wide neutral React underlay without nested pill.
- **M154:** existing own picker, reaction catalog, eligibility, selection limits, save/recovery and focus behavior.
- **M155:** existing peer people surface; not redesigned here.
- **CR-24/25:** preserve existing component structure and contracts. Their source documents were not supplied for this artboard; this specification does not assert verified compliance with unseen details.
- **Gap v2 / CR catalog:** reuse authoritative IDs and promoted asset mappings. Do not derive new glyphs or mappings from this raster.

M173 supersedes the earlier selected-state M164 arrangement that placed the generic thumb beside the React text. The entry now uses **icon above label in every selection state**. Other M164 behavior remains.

## 3. Scope

Change the layout of the own React control relative to Comment. Retain the complete strip order:

**React → Comment → Share → Reactions**

The artboard crops to React and Comment for clarity; Share and Reactions remain present in the product. M176 governs the peer zone.

No picker redesign, new reaction catalog, people-list redesign, endpoint, payload or permission change is introduced.

## 4. Locked anatomy

| Row | React | Comment |
| --- | --- | --- |
| Entry icon | Existing generic thumb entry glyph | Existing comment speech-bubble glyph |
| Label | Localized React label | Localized Comment label |
| Reserved lower lane | Actual own selected glyphs, default capacity three | No extra content introduced |

Both entry icons sit above their labels. Their optical centers share one horizontal row. Label baselines match exactly.

The generic thumb remains an entry glyph even when there are no selected marks. It is not evidence of a selected catalog reaction and is not counted toward the maximum.

Use one wide rounded neutral underlay for the entire React zone. Comment remains flat/transparent. Documentation outlines do not become Comment borders.

## 5. Stable geometry and state matrix

At the same viewport, locale, font size and accessibility settings, reserve enough space for three own marks in every state. React and Comment have equal hit height; neither control changes vertical position when selection changes.

| Own selection | Lower lane | Geometry |
| --- | --- | --- |
| 0 | Completely empty | Same reserved capacity and footprint |
| 1 | One actual own glyph | Same icon row, baseline and hit height |
| 2 | Two actual own glyphs | Same icon row, baseline and hit height |
| 3 | Three actual own glyphs | Same icon row, baseline and hit height |

Do not vertically recenter the empty React content, remove its reserved lane or switch the filled entry to a horizontal thumb/text pair. Do not shift Comment to compensate.

No placeholder dash, empty-state symbol, numerical zero, capacity sentence or fake mark fills the empty lane. No state-dependent font shrinking is allowed.

Selection changes must not resize the underlay, alter strip height, move neighboring zones or change their allocated widths.

## 6. Own marks and interaction

Render actual actor selections from the existing `selected[]` contract using authoritative catalog assets and existing ordering. Do not populate this lane from peer aggregates.

Default own maximum is three. Preserve the existing configured-capacity behavior; a configuration above three needs a separately resolved layout.

The artboard's heart, circled check and document glyph are illustrative familiar marks from the reference. They do not establish new IDs, asset filenames or an updated mapping for useful-fact or any other reaction. The current catalog and Gap v2 mapping win.

The React zone is one entry to the existing M154 picker. Lower own glyphs are summary cues, not additional toggle/remove buttons. Comment retains its current action.

Keep existing authentication, verification, eligibility, loading, unavailable, save and rollback behavior. Missing selection data must not be silently presented as a confirmed empty selection. This sheet defines selection-layout parity, not replacement failure states.

## 7. Dimensions

| Property | Value | Status |
| --- | --- | --- |
| Entry icon | 24 CSS px | Proposed; inherit confirmed token where present |
| Entry icon to label | 6 CSS px | Proposed |
| Selected glyph | 18 CSS px | Proposed; must remain legible |
| Gap between own glyphs | 6 CSS px | Proposed |
| Label to lower lane | 6 CSS px | Proposed |
| Interactive target | At least 44 × 44 CSS px | Required minimum |
| Hit height | Equal for React and Comment, sufficient for full anatomy | Locked invariant |

44 px is a minimum, not an instruction to compress three rows into a 44 px total height. No new exact total height, radius or zone width is established by the raster.

Use common alignment references and line-height rather than independent per-state offsets. Optical glyph adjustments must not move label baselines.

## 8. Panels

| Panel | Content |
| --- | --- |
| A — Light empty | Zero own selections; entry icon above label; empty reserved lower lane |
| B — Light filled | One, two and three own selections with unchanged entry position and Comment alignment |
| C — Dark parity | Zero and three selections; same anatomy; outer React focus example |
| Dimensions detail | Proposed sizes, common baseline and reserved capacity |

State labels such as “1 selected,” measurement arrows, guides and references are documentation only.

The generated panel A and dimension crop use magnification, and minor icon/baseline differences may remain in pixels. Do not copy them as state-specific spacing. Shared geometry in §§4–5 is authoritative.

## 9. Themes, responsive behavior and accessibility

Reuse established light/dark semantic colors and existing focus roles. Preserve geometry across themes. Do not sample generated blue edges, shadows or focus colors as approved tokens.

At approximately 390 CSS px, keep all four zones, readable labels, lower-lane capacity and minimum targets. The artboard does not establish a new breakpoint. Localization and larger text may require a larger shared footprint, applied consistently to every selection state.

Keep all product labels in existing i18n. English artboard labels do not replace approved translations.

React and Comment remain separate keyboard actions with meaningful accessible names. Expose actual own-selection meaning through existing accessible labels; decorative entry glyphs must not produce duplicate announcements.

Focus surrounds the real outer React control, not an individual selected glyph. Preserve M154 focus handoff and return.

## 10. Implementation handoff

Reuse the existing CR-24/25 component structure and confirm its actual names and responsibilities in the repository before editing. This visual specification does not authorize a parallel React control or replacement reactions architecture.

Apply the alignment change in the shared existing layout so empty/filled and light/dark states use the same geometry. Preserve existing data flow and interaction contracts.

For later related artboards, cite:

> M173 own React: entry icon above label in every state; shared icon row and label baseline with Comment; reserved lower lane for 0–3 actual own marks; unchanged footprint. M176 §2 remains the shared strip alignment reference.

## 11. Verification checklist

- [ ] Entry thumb is above React in all 0/1/2/3 states.
- [ ] React and Comment share icon optical row and label baseline.
- [ ] Equal hit height and stable zone/strip dimensions across selection states.
- [ ] Lower own-icon capacity is reserved even when empty.
- [ ] React has one wide underlay; Comment stays flat.
- [ ] Actual own marks use authoritative catalog assets and mapping.
- [ ] No own/peer data mixing; default maximum remains three.
- [ ] Existing M154 action, guards and failure recovery remain.
- [ ] Full four-zone strip remains in the product.
- [ ] Narrow layout, localization, focus and dark theme remain usable.
- [ ] Proposed measurements are not silently promoted to global tokens.
- [ ] CR-24/25 integration is checked against actual source before implementation acceptance.

No HTTP behavior, production data, runtime test result or OP PASS is claimed by this specification.
