# DOGEstonia M174 — Comment React / Reply Harmony

**Version:** 1.0  
**Date:** 2026-10-24  
**Surface:** thread comment action group, React | Reply, inside the existing CommentTree.  
**Artboard:** `exec-c1486a8e-cbbc-4338-a245-15f5d92ac230.png`.  
**Status:** specification requested after visual review; no implementation or runtime pass claimed.

## 1. Purpose and scope

Keep the comment React/Reply group balanced when reaction chips are absent or present. Remove the empty pocket below React when there are no chips. When chips appear, center Reply against the complete React stack.

This is the two-action **comment group**, not the four-zone Issue action strip. Do not apply M173's reserved own-icon lane or icon-above-label anatomy here.

Existing comment reaction behavior, catalog, permissions, picker, people surfaces, reply composition and data contracts remain unchanged.

## 2. Authority and continuity

1. Current operator request for M174.
2. This written layout specification.
3. M153 Comment Tree Density v2 for retained tokens.
4. M154 and the authoritative CR / Gap v2 catalog for existing chips and reaction behavior.
5. M174 raster as an illustrative reference.

M174 resolves the empty/filled alignment of this action group. It does not reopen the general reaction-summary design or change other thread components.

The raster's apparent shadows, outlines, tinted bubbles and imperfect labels are not new tokens. Written requirements below override these artifacts.

## 3. Shared anatomy

One borderless rounded group contains two independent interactive actions:

| Left | Middle | Right |
| --- | --- | --- |
| React entry; existing chips below when present | Short vertical separator | Reply entry |

Both entries use a **horizontal icon + label row**. Do not place their entry icons above their labels.

Empty: React and Reply rows share one vertical center and text baseline.

Filled: the React entry row and chip row form one vertically centered stack. Reply's horizontal row is centered against that complete stack, not aligned to the top React row.

## 4. Empty and filled layout rules

| Property | Empty | Filled |
| --- | --- | --- |
| Chip row | Absent; no reserved space | Existing chips directly below React entry |
| Group height | Compact, respecting actual 44 CSS px control minimum | Grows with content and padding |
| Left/right target height | Equal | Equal, both spanning the group height |
| Vertical alignment | React row and Reply row centered together | Complete React stack and Reply row centered together |
| Divider | Short centered segment | Same short centered segment |
| Divider horizontal position | Stable at the same viewport/locale | Same position as empty |

Do not reserve a hidden chip lane in the empty state. Do not keep the empty pill as tall as the filled one solely to preserve height.

The change in group height is intentional and limited to accommodating actual content. Keep its layout anchor under the associated comment; do not introduce absolute-positioned overlap or translate the entire comment node to imitate the comparison guides.

The artboard's common-center guide compares the two control compositions. It is not a requirement to grow the runtime pill symmetrically into the comment bubble above it.

Maintain stable overall width and left/right column allocation across empty and filled states at the same viewport and typography. Do not let chip arrival move the divider sideways. Choose sufficient width for the existing supported chip presentation; preserve existing overflow rules rather than inventing a fixed chip limit.

## 5. Token register

| Property | Rule | Source/status |
| --- | --- | --- |
| Shared light fill | `#FFFDF8` | Retained Density v2 |
| Outer border | None / 0 px | Retained |
| Decorative shadow | None | Retained borderless treatment |
| Light action ink | `#B54708` | Retained |
| Action vertical padding | 4 CSS px | Retained |
| Action horizontal padding | 8 CSS px | Retained |
| Each actual target | Minimum 44 × 44 CSS px | Required minimum |
| Group radius | Half actual group height | Retained |
| Divider | 1 × 16 CSS px, vertically centered | Retained |
| Light divider color | `#E7E4DC` | Retained |
| Entry icon size | Existing confirmed token | No new size introduced |
| Entry icon-to-label gap | 6 CSS px | Proposed |
| React entry-to-chips gap | 4 CSS px | Proposed |
| Filled group height | Content-driven | No fixed value introduced |

44 px is not a fixed filled height. Padding must not squeeze the existing chips or typography. Do not substitute a tiny visible action plus invisible expanded hit area for the actual minimum control height.

The divider remains 16 px tall as the group grows. It never stretches to a full-height partition. Its horizontal location remains stable relative to the group; its vertical location follows the current group center.

## 6. Reaction chips and state honesty

Use existing chip styles, ordering, labels, glyph masters and semantics. The support-heart 2 and agree-check 1 on the sheet are illustrative existing comment-summary fixtures, not real reactions.

Those numbers represent reaction totals in the illustration, not unique people, own selection capacity or a default initial value. Do not hard-code them.

Do not reinterpret comment-summary chips as the Issue strip's own `selected[]` lane. Preserve the actual existing source and meaning of the mounted comment summary.

Only a confirmed empty summary uses the empty presentation. Missing, loading or unavailable data retains existing honest states; it is not automatically an empty result.

No new reaction IDs, icon files, color mapping, request, payload field or participant identity is established.

## 7. Interaction and accessibility

React and Reply remain separate keyboard and pointer actions. Retain their existing activation, eligibility and recovery behavior. This layout change introduces no chip toggle/remove action.

Use the existing M154 picker for the appropriate comment target. Preserve existing Reply behavior, selected-parent indication and composer context.

Keep visible focus on the actual active control and existing focus return. A borderless resting group does not mean focus indicators may be removed.

Use localized labels and existing accessible reaction descriptions. Decorative entry icons must not duplicate the parent accessible name.

The short divider is decorative, not interactive and not a separate navigation stop.

## 8. Themes and responsive behavior

Light uses the retained warm neutral group and action tokens. Dark uses existing theme roles with readable light text/icons and sufficient divider visibility. The artboard's dark swatch is illustrative; do not create a new global dark palette from sampled pixels.

Maintain the same anatomy and alignment logic in both themes.

At narrow widths and deeper thread indentation, preserve readable labels and independent minimum-size controls. Use the existing chip wrapping/overflow contract. If content wraps, grow the group and center Reply against the entire resulting React stack.

Do not shrink text or icons to preserve the raster's apparent width. Locale and text-size changes may alter the shared responsive width; selection state alone must not move the divider horizontally.

## 9. Thread context retained

Keep the group associated with its comment bubble and preserve Density v2 spacing:

- Bubble bottom to group top: 4 CSS px.
- Complete action group bottom to next visible node bubble: 8 CSS px.
- Comment bubble remains borderless, fill `#F7F6F2`, radius 12 px, padding 8 px vertical / 12 px horizontal.

Account for the actual filled group height when placing the next node and its connectors. Do not reuse offsets that cause overlap.

Existing spine, L-elbow, selected-parent marker, composer and AttachmentRef behavior are unchanged.

## 10. Panel interpretation and raster cautions

| Panel | Meaning |
| --- | --- |
| A — Light empty | Compact horizontal React and Reply rows, no chip pocket |
| B — Light filled | Chips under React; Reply centered against the whole stack |
| C — Dark parity | Same empty/filled rules with readable dark-theme roles |

Literal comment fixture: “I can help coordinate this.” It communicates context only and creates no story/comment identity.

Measurement guides, state captions and fixture notes remain outside product UI.

Do not reproduce the raster's apparent pill shadows, bubble blue tint, incidental borders, malformed entry-icon token text or swatch inconsistencies. In particular, dark colors and production assets follow existing sources; the sheet is not an asset export.

## 11. Reusable layout reference

For future artboards addressing the same comment control, cite:

> M174: horizontal icon + label entries; empty pill has no reserved chip row; filled React entry + chips form one centered stack; Reply shares the stack's vertical center; equal target heights, minimum 44 CSS px; short 1 × 16 px centered divider with stable horizontal position; borderless shared fill.

Keep this distinct from M173/M176's Issue action-strip rules.

## 12. Verification checklist

- [ ] Empty React has no blank chip pocket.
- [ ] Empty React and Reply rows share center and baseline.
- [ ] Filled chips stay beneath React inside its allocated column.
- [ ] Reply centers against the complete filled React stack.
- [ ] Both targets have equal actual height, each at least 44 CSS px.
- [ ] Divider x-position is unchanged across empty/filled states.
- [ ] Divider remains 1 × 16 px and centered, not full-height.
- [ ] Group is borderless and has no decorative shadow.
- [ ] Existing chip semantics, assets and behavior are retained.
- [ ] Loading/unavailable are not falsely shown as empty.
- [ ] Thread spacing follows actual group height without overlap.
- [ ] Narrow layout, localization, dark theme and keyboard focus remain usable.
- [ ] Proposed gaps are distinguished from retained tokens.

No HTTP contract, runtime test pass, deployment status or OP PASS is claimed.
