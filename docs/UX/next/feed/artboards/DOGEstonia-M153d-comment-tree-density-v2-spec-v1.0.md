# DOGEstonia — M153d Comment Tree Density v2 Specification v1.0

**Date:** 2026-10-20  
**Surface:** SPA `#/lab/feed`, lab thread-mount — `IssueThreadBlock` / `CommentTree` / `ThreadComposer`  
**Continuity:** M152/M153 · CT-23 follow-on supersede · residual **M153d** · story **CT-26**.  
**Artboard:** [`DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.png`](DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.png) — `DOGEstonia · COMMENT TREE DENSITY v2`.  
**Decision status:** operator accepted padding/gap values and retained AttachmentRef borders. Written tip SSOT · intake PASS · Apply-ready for CT-26.

## 1. Purpose and authority

Make the comment tree visually lighter and more compact: remove external borders from comment text bubbles and the shared React/Reply group, retain their light fills, and reduce content padding and vertical gaps while preserving actual accessible controls.

Authority, highest first:

1. Current operator Density v2 locks and accepted clarification answers.
2. This written density register for explicitly changed properties.
3. Existing M153b tokens and M152/M153 behavior for all unaffected properties.
4. Generated PNG as an illustrative reference only.

This explicitly supersedes CT-23 / M153b §§3–5 **only** for bubble/group outer borders, bubble padding, action padding and the vertical gaps specified below. It does not replace all of §§3–5 or redefine tree semantics.

## 2. Scope and exclusions

Included: borderless filled comment bubbles and action groups; reduced spacing; continuous spine and L-elbow continuity; selected-parent inset marker; narrow 390 CSS px presentation; before/after comparison.

Excluded: Share (CT-27), attachment picker, posted media previews, gateway HTTP, upload/publication, author/avatar/time data, engagement counts, new icon packages, full M152/M153 redraw and product code. Comment reaction summary redesign remains **HOLD**.

No `Discussion` or `Discussion · Issue {id}` heading is rendered. This sheet introduces no changes to the Issue-level `React | Comment | Share | Reactions` strip.

## 3. Component anatomy

Each visible comment node contains:

1. Literal comment body inside a light filled, borderless rounded bubble.
2. Shared React/Reply action group below the body, aligned with the bubble's content block placement.
3. Existing tree connectors at the relevant indentation.

No additional frame surrounds a node, branch, bubble-plus-actions block or whole tree. Documentation panel frames, rulers and labels on the sheet are not product UI.

The group contains two independent interactive controls. An absent outer stroke does not merge React and Reply into one target. Existing eligibility/availability behavior continues; this document does not create new reply or reaction permissions.

## 4. Exact Density v2 token register

| Element / property | Value | Change or continuity |
|---|---|---|
| Bubble fill | `#F7F6F2` | Retained |
| Bubble outer border | **None / 0 px** | Replaces 1 px `#E7E4DC` |
| Bubble radius | 12 px | Retained |
| Bubble vertical padding | **8 px** | Replaces 12 px |
| Bubble horizontal padding | **12 px** | Replaces 16 px |
| Bubble body text | `#101828` | Retained |
| Bubble bottom → action group top | **4 px** | Accepted v2 gap |
| End of node action group → next visible node bubble | **8 px** | Accepted v2 gap |
| React/Reply shared fill | `#FFFDF8` | Retained |
| React/Reply group outer border | **None / 0 px** | Replaces 1 px `#E7E4DC` |
| Each action horizontal padding | **8 px** | Replaces 12 px |
| Each action vertical padding | **4 px** | Replaces 12 px |
| Each actual control minimum height | **44 CSS px** | Retained; not a fixed height |
| Group radius | Half its actual height | Retained |
| Action text | `#B54708` | Retained |
| Central separator | 1 px wide × 16 px high, `#E7E4DC` | Retained; vertically centered |

Do not emulate removed borders with box shadows, inset strokes, extra wrappers or a darker rim. On a matching surrounding surface, the action group perimeter may be visually indistinguishable: this is acceptable. The short central separator remains; it is not an external frame.

The 4 px gap is measured outside the bubble and action group. The 8 px gap is measured after the preceding node's action group and before the next visible bubble, including when tree depth changes. It is not an additional bubble-to-bubble margin layered over the action block. Avoid doubled margins from nested wrappers.

Control height is at least 44 px even with 4 px vertical padding. Typography and larger localized text may increase actual height. Do not implement a 32 px visible control with an invisible enlarged target as a substitute.

## 5. Locked palette and units

| Role | Value |
|---|---|
| Page / bubble backing | `#F7F6F2` |
| Surface / action backing | `#FFFDF8` |
| Primary text | `#101828` |
| Secondary text / spine | `#667085` |
| Hairline / action separator | `#E7E4DC` |
| Existing yellow action accent | `#F5C542` |
| Action/link / selected-parent marker | `#B54708` |

`#E7E4DC` may remain in existing hairlines or unaffected components, but never as a new bubble or React/Reply external stroke. No new violet, blue-grey mix, green/red status palette or additional wash.

Values are CSS px for this SPA lab surface. No dependency on a 16 px root or React Native unit conversion is established. Written values govern; do not measure the PNG.

## 6. Continuous spine and L-elbow — retained

| Property | Value |
|---|---|
| Spine / elbow width | 1 px |
| Spine / elbow color | `#667085` |
| Elbow turn radius | 6 px |
| Desktop indentation step | Approximately 44 px |
| Narrow/mobile indentation step | Approximately 24 px |
| Visual indentation cap | Existing three-level cap |
| Elbow endpoint | Bubble outer geometry at the center of the first text line |

Connectors remain continuous through relevant sibling gaps and preserve parent-child relationships. Adjust connector positioning to the actual compact node geometry; do not reuse offsets measured from the larger old padding. No speech tails, endpoint dots or arrowheads.

The visual cap is independent of logical depth and reply eligibility. Existing max-depth semantics remain. This sheet does not change first-paint node budget, traversal order or Show more behavior locked in the separate expand/truncate residual. The four-node desktop crop demonstrates density, not a replacement default visible-node budget.

## 7. Selected reply parent — retained M153b §6

The selected parent bubble keeps its normal fill and receives the existing **3 px inset left stripe in `#B54708`**. It has no external border, selection ring, additional wash, new padding or content displacement. Respect the rounded bubble boundary.

The actual selected parent and composer context both remain visible. The composer retains `Replying to this comment` and the literal parent excerpt; excerpt-only presentation does not replace the stripe on the actual parent.

Keyboard focus and reply selection are independent states. Preserve existing visible focus and keyboard navigation. Removing decorative outer borders does not authorize removing focus indicators.

## 8. AttachmentRef and composer boundary — unchanged

The operator explicitly chose to keep pending AttachmentRef chip borders. M153b §7 and the filename-chip residual continue:

| Chip | Fill | Border | Radius / padding |
|---|---|---|---|
| Ready | `#FFFDF8` | 1 px solid `#E7E4DC` | 12 px / 12 px all sides |
| Denied | `#F7F6F2` | 1 px solid `#B54708` | 12 px / 12 px all sides |

No global border-removal rule may affect AttachmentRef, textarea, composer shell or other existing components. Density v2 changes comment bubble and React/Reply group borders only.

`Ready to post`, real filename, local preview/type cue, `Local intent · not published`, Denied copy and Remove retain their existing contracts. No attachment-publication claim or submission behavior follows from this density change.

## 9. Artboard panels and fixtures

| Panel | Purpose | Required interpretation |
|---|---|---|
| A — Borderless nested tree | Root, child, grandchild and another child; measurement callouts | Fill-only body/actions and exact §4 spacing; no external frames |
| B — Reply parent selected | Same tree plus selected child and composer context | 3 px inset marker; no selection ring; unchanged compact anatomy |
| C — Narrow / 390 CSS px | Three nested bodies, actions and entry composer | Approximately 24 px nesting; no horizontal overflow; real 44 px control minimum |
| D — Before / after | Superseded bordered sample versus Density v2 | Old borders are allowed only in the labelled historical comparison |

Literal body fixtures:

- `I can help coordinate pet care.`
- `A sign-up list would help.`
- `I can draft it this week.`
- `I can help with weekend visits.`

Intended fixture relationship: root → child → grandchild; weekend-visits comment is another child of the root. Do not infer runtime node IDs, API payloads, authors or timestamps from these examples.

B selects `A sign-up list would help.` and shows that same text as the composer excerpt. Its draft is `I can draft it this week.` C uses `Write a comment` and `Post` as contextual existing composer copy; this sheet does not rename composer controls globally.

D's Before representation is historical, not a parallel shipping style. Old bubble padding is 12 px vertical / 16 px horizontal; old action padding remains the M153b 12 px on each axis. Any inconsistent old inset annotation must not override that source register.

## 10. Responsive behavior and accessibility

At 390 CSS px, literal text wraps and bubbles grow. Retain readable typography, the 24 px approximate mobile indent and independent React/Reply targets. Actions remain below their associated body. Do not squeeze targets or fonts to imitate the raster.

Separator remains a short 1 × 16 px centered segment. It does not stretch to full group height as controls grow. Connectors follow first-line alignment as text metrics change.

Existing keyboard, screen-reader, focus, localization and draft-preservation rules remain. Fill, indentation, connector relationships and words together carry structure; do not rely on borders or color alone. No author/avatar/time slots are introduced.

## 11. Raster audit and precedence

The artboard is a visual preview of accepted density values. Apparent control height, connector path, font metrics, fill shading and documentation spacing are not token measurements. Where pixels disagree, §§4–7 govern.

In particular, nesting connectors must follow the fixture relationships, the selected marker must remain inset, and new A/B/C bubbles/groups must have no decorative external stroke or shadow. D's old bordered samples do not authorize borders elsewhere.

The preview and request for this Markdown do not themselves record final raster acceptance or change unrelated product decisions. Any future visual adjustment should identify its specific token delta rather than silently restoring M153b outer frames.

## 12. Review checklist

- [ ] Bubble external border is absent; fill/radius remain and padding is 8v / 12h.
- [ ] React/Reply group external border is absent; fill remains; no shadow substitute.
- [ ] Each action uses 4v / 8h padding and actual min-height 44 CSS px.
- [ ] Bubble-to-actions gap is 4 px; complete-node-to-next-bubble gap is 8 px, without doubled margins.
- [ ] Central separator is 1 × 16 px `#E7E4DC` and centered.
- [ ] Spine/elbow remain continuous, 1 px `#667085`, radius 6 px, with correct ancestry.
- [ ] Selected parent has only the retained 3 px inset stripe; composer excerpt remains.
- [ ] No Discussion heading or fabricated author/time/count is added.
- [ ] At 390 px text wraps, targets remain usable and no horizontal overflow occurs.
- [ ] Existing focus indicators remain distinguishable from selection.
- [ ] AttachmentRef and composer borders are preserved; no global border removal.
- [ ] Expand/truncate defaults and node budget remain unchanged.
- [ ] Share, picker, HTTP/publication and comment reaction summary HOLD remain untouched.

**Remaining scope:** real-layout verification at Apply. No additional numerical token decision is required; unspecified typography/interaction retain existing packs. Story owner: **CT-26** · residual **M153d**.
