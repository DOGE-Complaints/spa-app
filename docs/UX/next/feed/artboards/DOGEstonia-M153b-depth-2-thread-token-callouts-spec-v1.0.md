# DOGEstonia — Depth 2.0 Thread Token Callouts Specification v1.0

**Date:** 2026-10-20  
**Surface:** SPA `#/lab/feed`, next-feed lab thread-mount — `IssueThreadBlock` and `ThreadComposer`  
**Continuity:** M152/M153, Depth 2.0 visual-token residual; no new M-number  
**Token status:** the operator accepted the complete proposed token table on 2026-10-20 after confirming locked palette only and actual React/Reply controls of at least 44 px.  
**Visual status:** artboard revision 2 generated and audited as an illustrative callout reference; acceptance of tokens does not automatically accept raster artwork.  
**Artboard:** `exec-cf34334e-8fee-4aae-b341-28db53f4ab12.png` — `DOGEstonia · DEPTH 2.0 · THREAD TOKEN CALLOUTS · rev 2`  
**Stories:** tip allocation **CT-18** (A–D chrome) · **CT-19** (§7 AttachmentRef paint). CT-13 / CT-14 structure remain; visual targets superseded by this sheet.

## 1. Purpose, authority and boundaries

Close the previously silent visual-token details in M152/M153: comment bubble, continuous nesting spine and L-elbow, React/Reply pill pair, selected reply parent, and local Ready/Denied attachment chips. The operator-approved values below are the written reference for this residual. They extend M152/M153 without replacing their component, data or interaction model.

Authority: current operator request and accepted token proposal, followed by `mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md` and `mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`. Earlier blue-grey lab color-mixes or 32 px visual pills are AS-IS observations only; this record does not approve them.

Out of scope: full M152 A–E / M153 A–G redraws, attachment file-picker flow and allow-list, dual-append bug/recovery, comment reaction-summary redesign (HOLD), dark M160 sheet, `#/next/feed`, gateway HTTP APIs, new author/avatar/time Identity UI, new icons or product code.

All role labels in this document are documentation labels, not mandates for new source-code token identifiers.

## 2. Locked palette

Only these palette values are used. New assignments to the residual roles were accepted by the operator; no new brand or status colors are added.

| Role | Value |
|---|---|
| Page | `#F7F6F2` |
| Surface | `#FFFDF8` |
| Primary text | `#101828` |
| Secondary text | `#667085` |
| Neutral border | `#E7E4DC` |
| Action/selected yellow | `#F5C542` |
| Link/action accent | `#B54708` |

Do not derive an unapproved blue-grey wash, opacity mixture, green Ready fill, red Denied fill or violet product surface. Yellow remains available for existing UI roles; it is not required on every component. Ready/Denied meaning is carried by words, border treatment and title emphasis, not color alone.

## 3. A — comment bubble

| Property | Accepted value |
|---|---|
| Fill | `#F7F6F2` |
| Border width | 1 px |
| Border color | `#E7E4DC` |
| Corner radius | 12 px |
| Vertical padding | 12 px |
| Horizontal padding | 16 px |
| Body text | Existing primary text `#101828`; existing typography/localization rules remain |

Shape is a plain rounded rectangle. Speech tails, triangular points and notches are not part of the approved bubble. Body is literal selectable text, never a loading bar after a successful read. Text wraps naturally and drives height; this token set adds no fixed bubble height, truncation rule or author slot.

The warm surface around the bubble and the page-colored bubble fill form the restrained warm-gray treatment requested by M153. Do not sample generated PNG pixels to introduce a different fill.

## 4. B — continuous spine and L-elbow

| Property | Accepted value |
|---|---|
| Continuous spine width | 1 px |
| Spine color | `#667085` |
| L-elbow width/color | Same 1 px / `#667085` |
| Elbow turn radius | 6 px |
| Desktop visual indentation step | Approximately 44 px, inherited from M153 |
| Mobile visual indentation step | Approximately 24 px, inherited from M153 |
| Visual indentation cap | Three levels, inherited from M153 |

The left parent/child spine remains continuous through the spaces between relevant sibling rows. An elbow is a connector independent of the bubble shape, not a speech tail. It ends at the bubble's outer boundary at the center of its first text line.

Horizontal run is determined by the accepted indentation and actual bubble placement, not a newly invented fixed length. When font scaling or wrapping changes the first line position, the connector alignment follows that line rather than a hardcoded vertical offset. No additional connector endpoint dot or arrowhead is authorized.

The three-level visual cap is independent from reply permission. Logical depth and `max_depth` retain the M153 semantics; this token sheet does not disable Reply merely because a visual column is capped.

## 5. C — React / Reply pill pair

| Property | Accepted value |
|---|---|
| Group fill | `#FFFDF8` |
| Outer border | 1 px, `#E7E4DC` |
| Group corner radius | Half the actual group height |
| Each control min-height | 44 px |
| Each control horizontal padding | 12 px |
| Each control vertical padding | 12 px |
| Action text color | `#B54708` |
| Center separator width | 1 px |
| Center separator height | 16 px |
| Separator color | `#E7E4DC` |
| Separator alignment | Vertically centered |

React and Reply are two distinct controls inside one shared pill group, with independent non-overlapping target areas. The controls themselves meet the 44 px minimum; this is not a 32 px visual pill with invisible enlarged hit areas. The minimum is not a fixed height: padding, typography and enlarged localized text can increase actual height.

The separator is a short centered segment, not a full-height divider. Its dimensions do not describe a touch target. The group radius is calculated from actual height, rather than fixed to the base-size appearance.

Existing availability rules remain: React opens the existing picker; eligible Reply selects a parent and focuses composer. This sheet does not change reply depth, reaction data, catalog, summary design, or create a fourth Issue action row under comments. If Reply is unavailable, existing semantics govern its omission/disabled explanation; this sheet does not invent the layout of every action combination.

## 6. D — selected reply parent

| Property | Accepted value |
|---|---|
| Parent bubble fill | Unchanged `#F7F6F2` |
| Parent bubble border | Unchanged 1 px / `#E7E4DC` |
| Highlight marker | Inset left-edge stripe |
| Marker width | 3 px |
| Marker color | `#B54708` |
| Text/content displacement | None |

The stripe is drawn inside the existing bubble geometry. It adds no external width, shifts no text and does not change the bubble's layout or padding. Respect the rounded boundary; do not extend the marker beyond it.

Do not add a full yellow ring, new wash or extra outline as the reply-selection treatment. Reply-parent selection and keyboard focus are different states; existing focus styling remains independently required and is not replaced by this stripe.

The composer still shows the existing `Replying to this comment` context and parent excerpt. That excerpt supplements the highlight on the actual parent bubble; excerpt-only presentation does not fulfill the accepted selected-parent treatment. The illustration adds no new composer feature or parent identity data.

## 7. E — local AttachmentRef Ready and Denied

| Property | Ready | Denied |
|---|---|---|
| Fill | `#FFFDF8` | `#F7F6F2` |
| Border width | 1 px | 1 px |
| Border color | `#E7E4DC` | `#B54708` |
| Corner radius | 12 px | 12 px |
| Padding | 12 px on all sides | 12 px on all sides |
| Status/title text | `Ready to post` | `This attachment can’t be added.` |
| Status/title color | `#101828` | `#B54708` |
| Status/title font weight | 600 | 600 |
| Explanatory body, when applicable | Existing primary text role | `#101828` |

The existing Remove action uses the link/action color `#B54708` and retains the M153 target/accessibility requirements. No separator between chip content and Remove is approved by this token set; the 1 × 16 px separator belongs only to React/Reply.

The Denied safety example retains the existing sentence `It does not meet the required media safety rules.` Its use requires the corresponding known reason; a color token does not authorize a new denial cause or product copy.

Ready and Denied are alternate local-intent states. There is no green/red status palette, upload completion claim, hosted preview, published media URL or persistent read assertion. `Ready to post` describes the local attachment intent only and does not decide whether the combined comment/attachment operation can ship or what API it uses.

This panel sets appearance only. Attachment selection, OS picker, type allow-list, count limits and submit eligibility with rejected items belong to the separate attachment residual and remain outside this token callout task.

## 8. Units, root size, accessibility and responsiveness

Values here are CSS px for this SPA lab surface. M152/M153 do not establish a dependency on a 16 px root font-size. Do not silently reinterpret these values as rem-based dimensions assuming such a root. Any later unit conversion must preserve intended geometry and accessibility.

The 44 px action minimum does not freeze text size or container height. ET/RU/EN expansion and increased text size must retain readable body, action names, status and Remove without overlap or horizontal page overflow. Comment and chip heights grow with content; continuous connectors follow actual row geometry.

Selected parent, Ready and Denied retain textual/contextual signals in addition to color. These semantic roles and focus/navigation behavior are not proven by a generated raster. Existing M153 focus, keyboard, screen-reader and draft-preservation rules remain in force. No native RN unit conversion or dark-theme token mapping is introduced by this SPA-specific sheet.

## 9. Artboard mapping and visual audit

| Panel | Subject | Written section |
|---|---|---|
| A | Bubble fill/border/radius and padding callouts | §3 |
| B | Continuous spine, elbow and inherited nesting | §4 |
| C | React/Reply pill controls and separator | §5 |
| D | Actual selected parent plus composer excerpt | §6 |
| E | Ready/Denied local attachment chip appearance | §7 |

Revision 1 had unapproved speech tails and a divider inside the Ready chip. Revision 2 removes them and emphasizes the Ready status weight. Revision 1 is superseded.

Revision 2 is a magnified visual reference, not a pixel measurement source: apparent separator length, exact first-line elbow alignment, stripe rendering, color interpolation and font metrics must follow the written register. The accepted centered separator is exactly 1 × 16 px; elbow attachment follows the first text line. No raster imperfection changes those values or authorizes another token. Sheet letters, leaders, rulers and footer are documentation annotations, not application UI components.

## 10. Implementation review checklist

- [ ] Only the seven locked palette values are used; no blue-grey mixture, red/green or violet additions.
- [ ] Bubble fill, border, radius and both padding axes match §3; no speech tails.
- [ ] Spines remain continuous; elbows have the accepted width/color/radius and first-line alignment.
- [ ] Visual nesting remains approximately 44/24 px with three visual levels; logical depth is unchanged.
- [ ] Both actual React and Reply controls meet min-height 44 px with 12 px padding and independent targets.
- [ ] React/Reply separator is centered, 1 × 16 px; group radius follows actual height.
- [ ] Reply parent has the 3 px inset marker with no text displacement; composer excerpt remains.
- [ ] Ready/Denied chips match fill/border/radius/padding and 600-weight status/title roles.
- [ ] Attachment chips gain no unapproved divider, new icon or publication claim.
- [ ] Existing focus and large-text/localization behavior remain usable.
- [ ] No AS-IS code observation is treated as operator-approved SSOT unless it matches this record.
- [ ] No change to picker flow, comment reaction HOLD, dual-append recovery, HTTP APIs, dark sheet or `#/next/feed` is inferred.

**Remaining administrative item:** story assignment under CT-13/CT-14, with any new ID TBD. Any token/state not explicitly covered here remains governed by its existing pack or requires a separate decision; do not derive it from generated pixels.
