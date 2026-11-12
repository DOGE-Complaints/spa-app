# DOGEstonia M175 — Filters Popover

**Version:** 1.0  
**Date:** 2026-10-24  
**Surface:** SPA `#/next/feed`, existing Filters popover.  
**Artboard:** `exec-ee7f566d-89ef-4081-9995-42a6f29b67c0.png`.  
**Status:** specification requested after visual review; no implementation or runtime pass claimed.

## 1. Purpose

Increase the usable width of the existing filter panel, clarify label/value alignment, make enabled date inputs look active and establish clear Apply/Reset hierarchy.

Retain existing filters, data mapping, option sources, native date picker and NF-21 color-scheme behavior. This is a presentation change, not a new filter API or query workflow.

Written rules override generated pixels.

## 2. Authority and continuity

1. Current operator brief for M175.
2. This written layout specification.
3. Existing filter implementation, current data-to-UI contract, i18n dictionaries and NF-21 for unchanged behavior.
4. Current shell/theme/accessibility rules.
5. M175 raster as a visual reference.

The current RU/EN/ET dictionaries and NF-21 source were not available while generating the artboard. Implementation must inspect those sources before modifying the component. Exact filter-to-API mapping is not inferred from visible English labels.

Earlier M149 feed/query state material provides continuity only; it does not authorize replacing current filter behavior with older immediate-apply behavior.

## 3. Scope and exclusions

Included: panel sizing, row alignment, density, date field presentation, action hierarchy, viewport containment and light/dark parity.

Excluded: new filters, new option values, search semantics, endpoints, payload changes, dependency/cascade rules, revised Apply/Reset semantics, a custom calendar and new localization copy.

## 4. Shared anatomy

1. Header: existing localized Filters title and existing close control.
2. Body: six existing label/value rows in the order below.
3. Date pair: existing date bounds with persistent labels.
4. Footer: secondary Reset on the left; primary Apply on the right.

| Display concept from brief | Presentation |
| --- | --- |
| Type | Label left; existing control/value right |
| Labels | Label left; existing control/value right |
| Instance | Label left; existing control/value right |
| Settlement | Label left; existing control/value right |
| Region | Label left; existing control/value right |
| Country | Label left; existing control/value right |
| Date from / to | Two labeled native date fields where space permits |

These are display concepts, not new wire keys. In particular, do not create an `instance` API field or rename an existing institution/instance mapping based on this table.

Preserve each existing control's type, cardinality, options, clear affordance and dependencies. Uniform chevrons in the raster communicate value controls; they do not mandate replacing text fields, autocomplete or multi-select with simple selects.

## 5. Width and density register

| Property | Proposed value / rule |
| --- | --- |
| Mobile reference viewport | Approximately 390 CSS px |
| Panel width at 390 | 358 CSS px, leaving 16 px on each side |
| Desktop panel width | 440 CSS px |
| Preferred panel minimum when space permits | 340 CSS px |
| Viewport constraint | Never exceed available viewport width minus 32 CSS px at reference sizes |
| Inner padding | 16 CSS px |
| Row gap | 8 CSS px |
| Input/control minimum height | 44 CSS px |
| Suggested label column | Approximately 96 px mobile / 112 px desktop, subject to localization |
| Footer action gap | Approximately 12 CSS px |

Widths, spacing and label-column sizes are proposals shown by this design, not already verified global tokens. The 44 CSS px target minimum is required.

The preferred minimum is soft: it must not force horizontal overflow on a smaller viewport. “Usable width” on the raster describes the panel target, not a 340 px inner content area in addition to padding.

Clamp the panel to the available viewport, including safe areas and browser zoom. Reflow rows when necessary rather than shrinking fonts or clipping controls. At narrow sizes, labels may move above controls if required by existing responsive conventions.

Keep a stable label column and a substantially wider value column. Labels remain readable and associated with their fields. Selected values follow existing wrapping/overflow behavior; this document establishes no new truncation policy.

## 6. Dates must look enabled

Keep the existing native date inputs and browser/OS picker. Preserve NF-21's existing color-scheme behavior; do not replace it with a hand-built calendar or guess new CSS overrides without reading the source.

Enabled light-theme dates use readable dark text, a visible normal boundary and a clearly visible native calendar affordance on an appropriate light input surface.

Enabled dark-theme dates use readable light text and calendar affordance on an appropriate dark surface. Preserve the same geometry.

Do not use disabled opacity, washed-out text, grey disabled backing, pointer suppression or a disabled attribute solely to style an enabled field.

The artboard's highlighted From field demonstrates focus, not a persistent selected/error state. Use the existing semantic focus token in implementation.

The raster's `mm/dd/yyyy` is an illustrative browser-format cue, not approved placeholder copy or a mandated date format. Native presentation follows the browser/locale and existing configuration; retain existing value serialization, timezone and bound semantics.

Show From and To side by side when both native controls fit. Stack them if localization, font scaling or native minimum intrinsic width requires it. Do not clip the calendar affordance to preserve a two-column arrangement.

Keep existing date validation and messages. Do not add new range rules, inclusive/exclusive behavior or timezone conversion from this visual.

## 7. Apply and Reset

| Action | Placement | Visual hierarchy |
| --- | --- | --- |
| Reset | Left | Quiet secondary text/outline treatment |
| Apply | Right | Primary civic yellow fill with readable dark text |

Both targets remain at least 44 × 44 CSS px. Keep their existing programmatic names, enabled/disabled conditions, reset scope and query behavior.

The existing presence of Apply is retained. This sheet does not specify whether Reset immediately commits, only clears a draft, closes the panel or preserves it. Resolve those details from current implementation and contracts; do not invent a new state machine.

Apply is visibly more prominent than Reset. Reset is not a destructive red action.

## 8. Height, anchoring and scroll

Preserve the existing trigger and popover anchoring semantics. Shift within available space to avoid viewport clipping.

Constrain height to the visible viewport, including mobile keyboards/safe areas where applicable. If content is too tall, allow the body to scroll while keeping header/close and footer actions reachable. Do not leave Apply beneath an inaccessible page edge.

The mobile rounded viewport outline and small handle-like mark on the artboard are documentation framing. They do not authorize changing the popover into a draggable sheet or adding drag gestures.

Do not reset feed scroll or committed filter state merely because the panel is opened, resized or repositioned.

## 9. Localization and content ownership

Reuse the existing RU, EN and ET dictionary entries for the title, row labels, date labels, actions, options, placeholders and messages.

English words on M175 come from the task brief and communicate hierarchy. They are not replacement localization strings. Do not invent dictionary keys, translate missing copy automatically or rename a filter as part of this layout work.

The blank value controls intentionally avoid invented option values. They are not a requirement to ship unlabeled empty controls or suppress current dictionary placeholders. Render real current values and existing localized empty states.

Retain the user's selected values through normal existing loading/failure behavior. Do not fabricate location names or available options.

## 10. Theme and accessibility

Use current semantic light/dark roles for panel, input, border, primary text, secondary text, focus and actions. The light civic anchors include warm neutral surfaces and yellow primary action; do not sample raster gradients or shadows as approved tokens.

Provide programmatic label association for every control. Placeholder-only labeling is insufficient.

Retain existing keyboard navigation, native date interaction, close/Escape behavior and focus return to Filters. Follow the current component's focus containment pattern rather than introducing a different modal model.

Do not rely on color alone for enabled, selected, invalid or disabled states. Distinguish actual disabled controls honestly if the existing contract requires them; the active-date requirement applies to enabled dates.

At 200% zoom, large text and narrow viewports, preserve content access, legible labels and reachable footer actions.

## 11. Panel mapping

| Panel | Purpose |
| --- | --- |
| A — Light mobile-ish | 390 px viewport reference, wider usable card, aligned rows and enabled native dates |
| B — Light desktop | Proposed 440 px panel with the same anatomy and action hierarchy |
| C — Dark | Desktop geometry retained; readable active native dates and controls |

Annotations, proposed dimensions and source-availability notes are not product copy.

## 12. Implementation handoff

Modify the existing Filters surface. Inspect the current dictionaries, filter bindings and NF-21 before editing.

Preserve every current query key, option source, selection cardinality, permission/availability rule and date serialization contract. Display order is not evidence of a new backend dependency.

Validate the native date controls in the supported browsers in both themes; visual generation does not verify OS/browser picker rendering or contrast.

No endpoint, payload, production data or new filtering capability is defined. No HTTP result or OP PASS is claimed.

## 13. Verification checklist

- [ ] Panel gains useful width without viewport overflow.
- [ ] Six requested concepts map to existing controls and keys.
- [ ] Label/value rows align and retain readable value space.
- [ ] Existing control types, options and multi-select behavior are preserved.
- [ ] Enabled dates look active in light and dark.
- [ ] Native picker and verified NF-21 color-scheme behavior remain.
- [ ] Native date format is not hard-coded from the raster.
- [ ] Date pair stacks if required by available space.
- [ ] Apply is primary/right; Reset secondary/left.
- [ ] Existing Apply/Reset semantics and reset scope are unchanged.
- [ ] Body can scroll and footer/close remain reachable.
- [ ] RU/EN/ET copy comes from existing dictionaries.
- [ ] Focus, native keyboard interaction and minimum targets remain usable.
- [ ] Proposed dimensions are distinguished from existing tokens.

**Unverified sources:** current dictionaries, exact filter mappings and NF-21 implementation must be checked in the development repository. Their absence during artboard creation is not permission to invent replacements.
