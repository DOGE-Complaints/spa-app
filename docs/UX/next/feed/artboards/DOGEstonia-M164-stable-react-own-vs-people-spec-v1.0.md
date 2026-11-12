# DOGEstonia — M164 Stable React: Own Selection and People Entry Specification v1.0

**Date:** 2026-10-22  
**Artboard:** `DOGEstonia M164 · STABLE REACT / REACTIONS · rev 4`, final zero-selection correction.  
**Accepted PNG:** [DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.png](DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.png) (promoted from `exec-60cba006-30a9-4859-bb23-8eba94cf1a72.png`)  
**Surface:** SPA `#/next/feed`, FeedCivicPost civic action strip beneath media.  
**Acceptance:** operator accepted the corrected visual on 2026-10-22 (“теперь ок”). This is visual/product acceptance, not a runtime OP PASS or API-readiness claim.

## 1. Purpose and precedence

Separate the actor's own selected reactions from the entry to other people's reactions while keeping the React zone stable in size. Own choices use compact icons inside the left React zone. The rightmost zone remains the text `Reactions` and opens the existing people surface.

The current accepted M164 overrides previous M164 attempts: no page-wide aggregate row below the strip, no aggregate glyph stack on the right, no text list of own selected marks in the strip and no detailed redraw of picker/people components.

M163 continues to govern one full-zone React underlay without a nested inner pill. M154 governs the existing own-reaction picker and catalog behavior. M155 governs the existing people surface. Existing CR-23 Live ReactionsMount integration remains; no replacement architecture or HTTP behavior is specified.

## 2. Four-zone anatomy

| Position | Visible content | Activation |
|---|---|---|
| Left — React | React entry; own selected icons when present | Open existing M154 reaction-selection component for this Issue |
| Second — Comment | Existing icon + localized label | Existing comment action |
| Third — Share | Existing icon + localized label | Existing Share action |
| Right — Reactions | Text `Reactions`; optional confirmed people count only under §6 | Open existing M155 people/reactions surface, never the picker |

Keep order **React | Comment | Share | Reactions**. Comment and Share remain flat/transparent. React retains one wide rounded neutral underlay spanning its allocated zone. Reactions has no reaction glyph stack or invented icon.

No extra aggregate row is rendered beneath the action strip. The own-icon row described below is contained solely inside React's existing zone.

## 3. Stable React geometry

At a given viewport, typography and accessibility setting, React has the same outer width and height for 0, 1, 2 and 3 selected marks. Selection changes must not resize the zone, move neighboring controls, change strip height or trigger automatic font shrinking.

Reserve enough internal space for the largest default selection of three readable icons. Empty space is intentional when fewer are selected. No placeholder dash, empty icon, numeric zero or hidden-loading claim fills unused positions.

The artboard demonstrates 0/1/3; the same geometry invariant applies to 2. This is stability across selection states, not a fixed pixel size across all devices. Responsive and large-text layout can increase dimensions consistently for all states.

No exact new zone height, radius, padding, icon size or gap is established by this raster. Reuse confirmed strip tokens; any missing numerical values remain TBD and require review. Actual interactive targets remain at least 44 CSS px.

## 4. React contents by selection state

### 4.1 Zero selected — final accepted correction

Show the existing thumb-up entry icon **above** the `React` text. Center both horizontally in the unchanged React zone. Align the icon row and label baseline with neighboring Comment/Share controls as shown in the corrected zero-selection panels.

Do not retain the earlier left-to-right icon/text arrangement pinned at the top of an otherwise blank zero-selection box. Do not display own selection icons when there are none. The generic thumb-up is the entry glyph, not evidence of a selected catalog reaction.

### 4.2 One to three selected

Show the existing React entry icon and label in the upper entry row as illustrated. Below them, inside the same underlay, show only the actor's actual selected reaction icons, compactly and legibly.

The lower own-icon row has capacity for three by default. It must remain visually distinguishable from the generic React entry above. The entry thumb-up is not a fourth selected mark.

Use existing catalog glyphs for actual authenticated `selected[]`. Do not substitute a generic checkmark for all own marks, display other people's marks here or infer selection from aggregate data. The sheet's heart / circled-check / document are illustrative existing selection glyphs; they do not create new IDs or change the catalog asset mapping.

Do not put `Support · Agree · Useful fact` or a `3 of 3 selected` capacity sentence into the feed control. Such labels/capacity feedback belong to the existing picker. Full reaction labels remain available through existing accessibility/tooltip behavior; exact new hover/tap disclosure is not introduced here.

### 4.3 Default limit

Default maximum own selection is **3**. Retain the existing configured maximum/capacity contract; do not introduce another independent limit or change catalog exclusions. This sheet covers the default three-slot presentation. A configuration above three requires a separately resolved layout, not silent overflow or hiding choices.

## 5. Existing component handoffs — symbolic only

| Trigger | Existing destination | Scope boundary |
|---|---|---|
| React zone activation | M154 picker / own-reactions component | Edit actor selection using existing behavior, eligibility and save/recovery rules |
| Reactions text activation | M155 people surface | View other people's reactions using existing data/availability/privacy rules |

The dashed boxes in panels B/C are documentation symbols. Their labels (`Existing component`, `Internals intentionally omitted`, `Existing M155 people surface`) are not product copy or component styling requirements.

Do not rebuild headers, options, groups, counts, buttons, close controls, people rows, avatars, error states or modal geometry from M164. Mount/reuse the existing components. Detailed picker and people layouts shown in earlier M164 revisions are superseded and must not drive implementation.

M154 remains authoritative for catalog labels, maximum feedback, Issue/root eligibility, exclusions, writes, failure recovery, keyboard/focus behavior and returning focus to React. M155 remains authoritative for people rendering and honest unavailable states. No new fallback copy, retry endpoint, relationship/Connect behavior or participant identity is specified here.

## 6. Rightmost Reactions and optional people count

Keep `Reactions` as text at the far right, without a glyph stack. It opens the people surface, not the own-selection picker. Any right-side reaction information must not be populated from the actor's own selected-icon row.

The operator allowed an optional count of people who reacted. The accepted sheet does not draw a count because a confirmed distinct-person value was not supplied. If supported by an authoritative contract, show a localized unique-person count without confusing it with reaction totals.

Never use `aggregate_count` as a people count, count summary marks, or subtract the number of own selected reactions to guess other people. One person can select multiple marks. Whether the people count includes the current actor, its exact field/source and visible count format remain **TBD**. Omit the optional count until those semantics are confirmed; the Reactions entry can still follow its existing availability contract.

M164 does not invent an endpoint or promise reactor identities are available. Existing privacy and fail-soft behavior applies. “Others” describes the product separation, not a new schema or arithmetic rule over aggregate data.

## 7. Panel mapping

| Panel | Subject | Required interpretation |
|---|---|---|
| A | Desktop 0/1/3 selected comparison | Identical React outer box; zero state vertically aligns with peers; selected states use lower own-icon row |
| B | React → own component | Existing M154 handoff, internals intentionally omitted |
| C | Reactions → people component | Existing M155 handoff, internals intentionally omitted |
| D | ~390 CSS px, 0 and 3 selected | Same size per viewport; no overflow or selection-induced reflow |
| E | Dark, 0 and 3 selected | Same separation and geometry with readable existing theme roles |

The media strips establish context only. They do not define a published asset, URL, loading state or gallery. Documentation state labels such as `0 selected` are outside product UI.

## 8. Theme and assets

Retain M163's sole React underlay and flat peers. Light continuity uses warm page `#F7F6F2`, surface `#FFFDF8`, primary text `#101828`, secondary `#667085`, neutral hairline `#E7E4DC` and existing accent/focus roles. Exact underlay semantic mapping follows the established theme pack.

Dark uses existing neutral backing and readable icons/text, with the same stable geometry. No new dark hex values, contrast pass or second status palette is claimed. Do not sample blue-tinted text/antialiasing or apparent shades from the PNG as approved tokens.

Reuse existing thumb-up, Comment, Share and catalog reaction SVG masters. No new icon pack or filenames are introduced. Existing focus indicators remain visible at the actual outer control boundary. The single underlay must not acquire an inner pill, nested fill or shadow substitute.

## 9. Responsive behavior and accessibility

At approximately 390 CSS px, retain all four zones, readable labels and own-icon capacity. Reserve lower-row space in every React selection state. Do not reduce icon/text size only when selection appears or change surrounding widths to make three icons fit.

When typography, localization or viewport changes require a larger layout, compute a consistent footprint across selection states. Exact breakpoint and maximum size are inherited or TBD; no new numerical values follow from magnified artwork.

The React zone is one coherent entry action. Selected icons are summary cues, not independent remove/toggle controls in this residual. Editing occurs through the existing M154 component. Preserve programmatic selection information and readable localized labels for assistive technology; icons alone must not erase reaction meaning.

Reactions remains a separate keyboard/touch action. Preserve existing focus management and handoff behavior. No hover-only, long-press-only or new gesture dependency is introduced.

## 10. Acceptance and supersession record

The operator accepted rev4 after the zero-selection alignment correction. The authoritative PNG is the filename at the top of this document, not the earlier rev4 image with horizontal zero-selection icon/text.

Superseded M164 concepts:

- A page-wide aggregate row below the strip.
- Right-side reaction glyph stacks.
- Feed text lists of own selected labels.
- Detailed redrawn M154/M155 internals.
- React zone resizing when selected marks appear.
- Horizontal top-pinned React entry in the zero-selection state.

Preserved requirements: four-zone order, existing components, default maximum three own marks, stable wide React underlay, touch targets at least 44 CSS px and light/dark readability.

Visual acceptance does not imply an implementation test pass, API readiness, deployed route behavior or OP PASS.

## 11. Remaining decisions

| Item | Current handling |
|---|---|
| Exact unprovided dimensions / responsive tokens | Inherit confirmed system; otherwise TBD |
| Optional unique-person count | Contract source, actor inclusion and copy format TBD; omitted from accepted sheet |
| Configuration above three own selections | Outside default layout; separate decision required |
| Data separation and people availability | Existing confirmed contract; never inferred from guessed counts |
| New icon-label disclosure behavior | None added; existing accessibility patterns govern |
| Real layout / keyboard / contrast verification | Implementation work; no pass claimed |

## 12. Implementation review checklist

- [ ] Exact four-zone order is retained.
- [ ] React outer geometry is unchanged between 0/1/2/3 selected at the same viewport/settings.
- [ ] Zero-selected thumb icon is above React text and aligned with Comment/Share.
- [ ] Selected states show actual own icons in the reserved lower row inside React.
- [ ] Default maximum is three; the entry glyph is not counted as an own selection.
- [ ] No text list or capacity sentence is added to the feed control.
- [ ] Rightmost Reactions is text, without a glyph stack.
- [ ] No page-wide reaction aggregate appears below the strip.
- [ ] Left opens existing M154; right opens existing M155, with internals unchanged.
- [ ] Optional people count is omitted unless distinct-person semantics are confirmed.
- [ ] Existing icons, focus and minimum 44 CSS px targets are preserved.
- [ ] Narrow/dark/localized states retain readable content and stable geometry.
- [ ] Annotation boxes, state labels and media fixtures do not become product UI.
- [ ] No catalog, API, identity or runtime OP PASS is invented.
