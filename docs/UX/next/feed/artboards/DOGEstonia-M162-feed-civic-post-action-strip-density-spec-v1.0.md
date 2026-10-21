# DOGEstonia — M162 FeedCivicPost Action Strip Density Specification v1.0

**Date:** 2026-10-21  
**Artboard id:** **M162**  
**Surface:** SPA `#/next/feed` — `FeedCivicPost` four-zone action strip  
**Raster:** [DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png](DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png)  
**Story tip:** [STORY-SPA-NF-15](../../tasks/backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md)  
**Intake:** [analysis-m161-m162-generation-intake-2026-10-21.md](../../analysis/analysis-m161-m162-generation-intake-2026-10-21.md)  
**Scope:** operator mark #3 · chrome density + React unframe only · CR-23 Live host retained  
**Status:** tip SSOT after intake · numerical density register **locked for Apply** (see §3) · no invent OP PASS / live eye

## 1. Problem and intended result

The reported live strip has too much empty vertical space, undersized icons and inconsistent chrome: React is inside a bordered pill while Comment and Share are flat.

The target keeps the existing four zones in the same order — **React | Comment | Share | Reactions** — while making the three primary actions visually consistent, increasing icon size and reducing unused spacing. Existing action behavior and the live reactions host remain unchanged.

## 2. Authority and source boundaries

Current operator locks govern scope and required behavior. Exact density values below were proposed in the generated sheet and are not recorded as accepted tokens. The PNG is a visual reference, not a measurement source.

The current-problem panel is a schematic reconstruction of the operator report, not an inspected or measured live screenshot. Existing react/comment/share SVG source masters were unavailable in this dialogue. Their actual geometry, source paths and line weight must be obtained from the existing repository/catalog before implementation.

No new icon assets, pack, filenames, product code, HTTP behavior or runtime validation result are supplied by this task.

## 3. Locked requirements versus proposals

| Item | Status | Rule |
|---|---|---|
| Four-zone anatomy/order | Locked | React, Comment, Share, Reactions |
| React frame | Locked | Remove decorative bordered pill; match Comment/Share flat chrome |
| Icon visibility | Locked direction | Increase size; operator requested a 20–24 CSS px proposal |
| Vertical density | Locked direction | Reduce unused vertical space while preserving controls |
| Actual touch targets | Locked | At least 44 CSS px |
| Existing action SVG masters | Locked | Reuse existing assets; no new brand pack |
| CR-23 Live ReactionsMount | Locked | Keep host and existing behavior; chrome-only change |
| Icon size | **Tip lock (intake)** | **24 CSS px** |
| Desktop action padding | **Tip lock** | **4 px vertical / 8 px horizontal** |
| Desktop icon-to-label gap | **Tip lock** | **6 px** |
| Desktop actual control min-height | **Tip lock** within ≥44 | **44 px**; may grow with text |
| Narrow layout at 390 px | **Tip lock** | Icon above label; first three actions remain separate zones |
| Narrow icon-to-label gap | **Tip lock** | **4 px** |
| Narrow actual control min-height | **Tip lock** | **56 px**, never below 44 px |
| Responsive breakpoint | Soft TBD | No exact breakpoint inferred from the 390 px crop · Apply may reuse existing feed narrow token |

The 56 px narrow proposal fits the stacked icon/label composition with breathing room; it is not a replacement global touch minimum. Actual content may require more height. Existing typography/localization rules govern text metrics; no fixed font size or line height is introduced.

## 4. Component and zone ownership

| Zone | Retained ownership | Scope of this change |
|---|---|---|
| React | Existing action and reaction-entry behavior | Remove decorative outer pill/frame; proposed icon size/spacing |
| Comment | Existing comment-entry behavior | Match shared flat visual treatment and density |
| Share | Existing Share action and handoff | Match shared flat visual treatment and density |
| Reactions | CR-23 Live ReactionsMount, existing aggregate state/content | Preserve fourth position and host; do not replace mount or redesign aggregate internals |

No new click targets, badges, counts, reaction catalogs, navigation semantics or identity states are created. The first three controls must remain independent and reachable. The fourth zone does not become a newly invented duplicate React button.

Use stable four-zone layout allocation. Equal visual allocation is shown in the proposal; exact existing sizing constraints and reactions-host intrinsic width must be checked in the real component. Do not truncate or replace real aggregate content merely to force the schematic into equal columns.

## 5. Flat primary-action chrome

React, Comment and Share share the same normal-state treatment:

- Existing SVG glyph and visible localized label.
- No decorative outer border, pill, shadow or unique backing around React.
- No equivalent frames newly added to Comment/Share to obtain consistency.
- Shared light-feed text/icon roles and aligned content.
- Actual accessible target geometry independent from decorative framing.

Existing keyboard focus, pressed, selected, disabled and unavailable semantics remain independently required. “Flat” describes removal of the inconsistent decorative frame; it must not remove a visible focus indicator or an existing meaningful selected state. This sheet adds no new state palette or universal selected fill.

Existing top/bottom hairlines or zone separators may remain where already approved. The raster's visible separators do not create a new separator contract. No button-specific border may be inferred from a panel/crop boundary.

## 6. Proposed desktop density

Render existing primary action glyphs at 24 × 24 CSS px, using their actual master proportions and stroke construction. Arrange glyph and label horizontally, with a proposed 6 px gap and action padding of 4 px vertically / 8 px horizontally.

Each actual primary control has minimum height 44 px. Padding alone does not determine final height: the minimum wins when icon/text plus padding is smaller. Do not retain a large blank spacer above the controls merely to reproduce the schematic crop.

No exact strip outer padding, fixed total height, column gap or card-divider margin is approved here. Use existing layout values unless explicitly reviewed; removing blank space must be checked in the actual component rather than calculated from the generated PNG.

## 7. Proposed narrow presentation — 390 CSS px

At the illustrated 390 px viewport, stack each of the first three existing 24 px icons above its label. Proposed icon-to-label gap is 4 px, with proposed 4 px vertical / 8 px horizontal action padding and minimum control height 56 px. Grow if localization or increased text size requires it.

Keep Reactions as the fourth zone and preserve its existing aggregate contents and behavior. It does not need a newly invented icon to match the first three columns. Labels stay visible and readable; no horizontal page overflow, clipped icons, overlapping targets or reduced font size to imitate the picture.

The exact point at which horizontal content becomes stacked is TBD. The 390 px panel proves a design example, not a new breakpoint. The real aggregate host must be checked at this width with its existing empty/populated/unavailable states; no substitute count or fixture total is authorized.

## 8. Fourth zone / CR-23 host boundary

Keep the live host instance, existing integration contract, data binding, aggregate content and existing interactions. Density work must not remount a fabricated replacement, move the host into a new fifth zone or merge it with React.

The orange dashed rectangle and arrow in panel D are documentation annotations only. They are never rendered as a production border, focus state, placeholder or new component.

The literal `Reactions` label in the sheet identifies the fourth zone. It is not an instruction to overwrite the live aggregate presentation with a static label. No picker or comment reaction-summary redesign is included.

## 9. Visual language, assets and palette

Use the existing warm light civic feed. Reference roles: page `#F7F6F2`, surface `#FFFDF8`, primary text `#101828`, secondary `#667085`, neutral border/hairline `#E7E4DC`, action/link `#B54708`, existing yellow `#F5C542`.

These are continuity references, not a new global action-color decision. Follow existing approved state roles. Do not sample raster interpolation to add blue, violet, brand gradients or new status colors.

The sheet's heart/message/arrow silhouettes are **schematic placement cues**. They do not authorize replacing existing React, Comment or Share masters, commissioning a new heart icon, changing stroke width or introducing any `ic-*` filename. Exact reuse paths must be resolved from the existing catalog in the IDE.

All values are CSS px for this SPA surface. No 16 px root assumption, React Native unit conversion or new theme system is introduced.

## 10. Artboard mapping and copy

| Panel | Subject | Review goal |
|---|---|---|
| A — Current problem, schematic | Reported bordered React, small icons and excess whitespace | Explain the reported inconsistency; no AS-IS measurements claimed |
| B — Target, flat and compact | All three primary actions flat; 24 px icon proposal and desktop density | Review unframing, size and spacing together |
| C — Narrow / 390 CSS px | Stacked icon/label proposal with retained four zones | Review readability and targets at narrow width |
| D — Fourth slot / existing reactions host | Annotated CR-23 boundary | Verify scope remains chrome-only |

Visible action labels remain `React`, `Comment`, `Share`, `Reactions` as English fixtures; use existing localization keys and labels. `Issue {id}` is an illustrative placeholder, not a real record. Panel titles, measurements, proposal badge and footer are documentation, not app UI.

The sheet label “NOT OP PASS” explicitly means no successful operator/runtime verification has been claimed. No code changes or live test results are delivered with this visual specification.

## 11. Accessibility and unchanged behavior

Preserve existing accessible names, keyboard activation, focus order and visible focus. Icon geometry alone never carries meaning; keep labels. Removing decorative React chrome must not reduce its target below 44 px or make its existing availability state ambiguous.

Existing reaction entry, comment entry and Share behavior stay governed by their existing contracts. No network request, native handoff, clipboard success, count or API capability is inferred from this sheet. Density cannot serve as evidence that any integration is available.

Large text and localization may increase control/strip height. Do not clip to the proposed minimum height. Test actual independent hit areas and aggregate content in the real component.

## 12. Open decisions and implementation gates

| Item | Current handling |
|---|---|
| Numerical density acceptance | **Locked tip SSOT** at intake (24 / 4v8h / 6 gap / narrow 56 stacked) · OP eye after Apply still required |
| Responsive switch threshold | TBD; only 390 px example shown |
| Existing SVG source paths / exact geometry | Resolve in repository; schematic glyphs not masters |
| Outer strip spacing and separators | Existing rules govern; no extra measurements inferred |
| Reactions host width / real content fit | Verify existing CR-23 states without redesigning internals |
| Keyboard, touch, localization and large-text validation | Required in implementation; no test pass claimed |
| Administrative story assignment | Operator mark #3 continuity; no new ID invented |

## 13. Review checklist

- [ ] Four zones remain in exact order, with no extra/missing slot.
- [ ] React has no inconsistent decorative pill or outer frame.
- [ ] Comment/Share remain flat; no matching frames are added.
- [ ] Existing SVG masters are reused, not replaced by raster silhouettes.
- [ ] Reviewed icon sizing and spacing follow the explicitly accepted values once decided.
- [ ] Actual controls remain at least 44 CSS px; narrow proposal is reviewed at 390 px.
- [ ] All labels remain readable; no clipping, overlap or horizontal overflow.
- [ ] Existing focus and meaningful interactive states remain visible.
- [ ] CR-23 host, data and aggregate behavior are retained; static labels do not replace it.
- [ ] Annotation frames and rulers are absent from production UI.
- [ ] No picker, Share sheet, comment tree or aggregate redesign enters this scope.
- [ ] No HTTP, asset Present, code-change or OP PASS claim is inferred.
