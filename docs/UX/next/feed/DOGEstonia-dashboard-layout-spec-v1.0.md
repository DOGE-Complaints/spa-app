# DOGEstonia dashboard layout specification v1.0

**Surface:** public/authenticated `/board`, light theme  
**Implementation target:** React.js layout and component composition  
**Visual reference:** approved Uus Veerenni dashboard mockups and their latest state revisions  
**Status:** implementation handoff

## 1. Purpose and authority

This document defines the geometry, responsive behavior, layering, and component boundaries of the DOGEstonia board. It is the layout source of truth. Mockup imagery remains a visual reference for tone and content density; dimensions in this specification override dimensions inferred from generated pixels.

The board is a civic feed with familiar social-reading ergonomics. An Issue remains the primary civic object; discussion is mounted below it through the shared `IssueThreadBlock`. The layout must not introduce a parallel social-card identity.

## 2. Layout principles

1. **Feed first.** The center column receives all flexible width. Side rails never squeeze the feed below its minimum readable width.
2. **Stable reading axis.** The left edge of the feed remains stable when overlays open. Dialogs and popovers do not reflow the page.
3. **Progressive reduction.** Right rail disappears first, then left rail becomes off-canvas. Product functions remain available; only their placement changes.
4. **Shared thread shell.** Feed post, Issue modal, and `/issue/:id` reuse the same Issue and thread component geometry.
5. **Familiar post rhythm.** Issue metadata → title/summary → optional labels/details → media → compact action strip → thread preview.
6. **8 px base grid.** Major spacing uses multiples of 8 px; 4 px is reserved for optical corrections and dense metadata.

## 3. Canonical desktop frame

### 3.1 Reference viewport

- Design frame: **1440 × 1024 px**.
- Wide QA frame: **1600 × 1000 px**.
- Browser zoom: **100%**.
- Root font size: **16 px**.
- Header: **64 px**, fixed at viewport top.
- Main canvas max width: **1600 px**.
- Desktop outer gutters: `clamp(24px, 2vw, 32px)`.

### 3.2 Three-column grid

At `min-width: 1200px`:

| Region | 1440 reference | Allowed behavior |
|---|---:|---|
| Left rail | 240 px | `224–264 px`, sticky |
| Gap 1 | 20 px | 20–24 px |
| Feed | 824 px | flexible; minimum 640 px |
| Gap 2 | 20 px | 20–24 px |
| Right rail | 280 px | `280–320 px`, sticky |
| Outer gutters | 28 px each | 24–32 px |

Recommended CSS-grid intent:

```text
grid-template-columns:
  clamp(224px, 17vw, 264px)
  minmax(640px, 1fr)
  clamp(280px, 20vw, 320px);
column-gap: clamp(20px, 1.5vw, 24px);
```

The left and right rails use `position: sticky; top: 80px`. Their content scrolls with the document; do not create three independent scrolling columns.

### 3.3 Vertical structure

| Element | Dimension |
|---|---:|
| Header | 64 px high |
| Header content horizontal padding | 28 px at 1440 |
| Main top gap | 24 px |
| Feed section header | 112–128 px depending on wrapping |
| Card-to-card gap | 20 px |
| Rail module gap | 16 px |
| Page bottom safe space | 48 px |

## 4. Global header

Desktop header uses three zones:

| Zone | Width / rule | Contents |
|---|---|---|
| Brand | 300 px max | DOGEstonia logo, divider, active node name |
| Search/nav | flexible | search field 320 px; primary navigation centered |
| Utilities | intrinsic | language, theme, notifications, profile |

- All controls: minimum **40 × 40 px** hit area.
- Search field: **320 × 40 px**, maximum 420 px on wide screens.
- Active navigation underline: **3 px**, aligned to header bottom.
- Header border: 1 px neutral divider; subtle shadow is optional, never both visually heavy.

## 5. Left rail

- Card width fills the grid track; internal padding **16 px**.
- Profile row avatar **48 px**; verified indicator **16 px**.
- Navigation row height **44 px**, radius **8 px**, icon box **24 px**.
- Primary `Tell a story` control height **48 px**, full width.
- Divider spacing: **20 px above and below**.
- On tablet/mobile the entire rail becomes a drawer. Its profile and `My stories` entries must remain accessible from the global navigation trigger.

## 6. Feed toolbar

- Title line height **36 px**, supporting copy line height **24 px**.
- Controls begin **20 px** below supporting copy.
- Search within node: **280 × 40 px** minimum.
- Filter chips: height **36 px**, horizontal padding **16 px**, gap **8 px**.
- `List | Map` segmented control: **144 × 40 px**, placed at the far right of the feed toolbar, never inside the filter drawer.
- Controls may wrap once between 1200 and 1279 px; view toggle remains right-aligned on its row.

## 7. BoardIssuePost geometry

### 7.1 Card shell

- Width: **100% of feed column**.
- Surface: warm white.
- Border: **1 px** neutral.
- Corner radius: **12 px**.
- Internal desktop padding above media: **20 px**.
- Header row: civic icon/avatar **48 px**, content gap **14 px**.
- Overflow menu target: **40 × 40 px**.

### 7.2 Civic identity block

Order is fixed:

1. Issue id + status + type.
2. location + updated date.
3. title.
4. summary.
5. labels and optional `Additional details` schema overlay.
6. `Open issue` affordance.

Recommended text metrics:

| Text | Desktop |
|---|---|
| Issue id / metadata | 13 px / 18 px |
| Title | 22 px / 28 px, 700 |
| Summary | 15 px / 22 px |
| Labels | 12 px / 18 px |

### 7.3 Media

- Full width inside card after the 16 px card inset.
- Aspect ratio **16:9** preferred.
- Desktop visible height: **320–440 px**; use `object-fit: cover`.
- Radius: **10 px**.
- No independent carousel chrome unless multiple attachments actually exist.

### 7.4 Compact action strip

- Height: **56 px** desktop, **52 px** mobile.
- Four equal logical zones: `React`, `Comment`, `Share`, reaction aggregate.
- Each target: minimum **44 px** high.
- Vertical separators may be used between the first three actions; keep them subtle.
- The strip must remain one visual row. The full reactions catalog never lives directly in this strip.

### 7.5 Thread preview

- Directly attached beneath Issue chrome; no second unrelated card style.
- Empty/loading/unavailable minimum height: **72 px**.
- Populated collapsed preview: **96–144 px**.
- Internal horizontal padding: **20 px** desktop, **16 px** mobile.

## 8. Comments and composer

- Root comment avatar: **40 px**; nested reply avatar: **32 px**.
- Avatar-to-body gap: **10 px**.
- Comment vertical gap: **16 px**.
- Desktop nesting indent: **44 px per level**.
- Mobile nesting indent: **24 px per level**.
- Maximum visually represented depth: **3**. At max depth, further replies continue at depth 3 with a parent-context label; no deeper indentation.
- Comment attachment: maximum width **420 px**, radius **8 px**; on mobile width is `min(100%, 420px)`.
- Composer minimum height: **72 px** collapsed, **112 px** with attachment/reply context.
- Composer action targets: **44 × 44 px**.
- In an Issue modal, composer may be sticky to the modal bottom; it must not be sticky to the browser viewport outside the dialog.

## 9. Overlay geometry and z-index

| Layer | Width | Height | Placement | z-index token |
|---|---:|---:|---|---:|
| Reaction hover/picker | 360 px | content | action anchor | 40 |
| All reactors popover | 320 px | max 440 px | reaction aggregate anchor | 40 |
| Lightweight toast | 360 px max | content | bottom center/right | 60 |
| Reactions distribution dialog | 560 px | max 80vh | viewport centered | 80 |
| Issue modal | min(960 px, calc(100vw - 64px)) | 90vh max | viewport centered | 70 |
| Global header | viewport | 64 px | fixed top | 30 |

### 9.1 All-reactors popover

- Surface width **320 px**.
- Header **48 px**.
- Person row **52 px**; avatar **36 px**.
- Tiny reaction badge **16 px**, overlaid on avatar lower-right.
- Maximum body height **364 px** (7 rows); overflow scrolls.
- Small pointer aligns with the reaction aggregate; opening does not move the card.
- No tabs, distribution metrics, `Connect`, or row actions in this compact state.

### 9.2 Reactions distribution dialog

- Width **560 px**; mobile width `calc(100vw - 32px)`.
- Dialog header **64 px**.
- Tab row **48 px**, horizontally scrollable if localized labels exceed available width.
- Person row **64 px**; avatar **40 px**.
- `Connect` is the right-side row action where applicable; the reaction marker stays on the avatar.

### 9.3 Issue modal

- Desktop width **960–1040 px**.
- Maximum height **90vh**.
- Backdrop color: black at **40–48%** opacity.
- Header **64 px**, close target **44 × 44 px**.
- Scroll container: modal body only.
- Issue body and `IssueThreadBlock` remain a single reading column.
- At ≥1440 px a narrow contextual aside is allowed only if existing Issue detail content requires it; discussion must never become a separate product column.

## 10. Responsive matrix

| Range | Grid | Rails | Feed / card behavior |
|---|---|---|---|
| ≥1600 | 3 columns | 264 / 320 px | canvas capped at 1600 px; feed absorbs remainder |
| 1200–1599 | 3 columns | 224–264 / 280–320 px | canonical desktop |
| 1024–1199 | 2 columns | left 216 px; right modules move after feed | feed minimum 720 px where possible |
| 768–1023 | 1 column | both rails off-canvas/inline modules | content max 760 px, gutters 24 px |
| 480–767 | 1 column | drawers / compact header | gutters 16 px; card radius 10 px |
| 320–479 | 1 column | compact navigation | gutters 12 px; typography and nesting tighten |

### 10.1 Tablet, 1024–1199 px

- Header: brand, search, and utilities remain; secondary nav may collapse.
- Left rail remains only while feed width stays ≥640 px.
- Right rail modules move below the visible feed or into a contextual panel; they do not occupy a permanent third column.
- Feed toolbar wraps into two rows.

### 10.2 Narrow tablet, 768–1023 px

- Single centered feed, max width **760 px**.
- Header height **60 px**.
- Both rails are removed from document flow.
- Node context appears in compact header chrome; rail modules may appear after feed content.

### 10.3 Mobile, 320–767 px

- Header height **56 px**.
- Page gutters **16 px** at ≥390 px, **12 px** below 390 px.
- Card padding **16 px**; media may bleed to card edges while keeping card border.
- Issue title **18 px / 24 px**.
- Action strip labels remain visible at ≥390 px. Below 390 px, icon + short localized label is allowed; icons alone are not the default.
- Modal becomes a full-height sheet: width **100vw**, height **100dvh**, radius **0**.
- Reaction distribution dialog becomes a bottom sheet with max height **88dvh**.
- All-reactors popover becomes a bottom sheet or anchored sheet of width `calc(100vw - 24px)`; never overflow the viewport.
- Nesting uses **24 px** indent and stays capped at three visual levels.

## 11. Spacing and visual tokens

### 11.1 Spacing

| Token | Value | Typical use |
|---|---:|---|
| `space-1` | 4 px | optical correction, inline icon gap |
| `space-2` | 8 px | chip gaps, compact metadata |
| `space-3` | 12 px | row gaps, mobile gutters |
| `space-4` | 16 px | card padding, rail module gap |
| `space-5` | 20 px | desktop card rhythm |
| `space-6` | 24 px | grid gap, section separation |
| `space-8` | 32 px | large section separation |
| `space-12` | 48 px | page safe space |

### 11.2 Light palette

| Role | Value |
|---|---|
| Page | `#F7F6F2` |
| Surface | `#FFFFFF` |
| Elevated warm surface | `#FFFDF8` |
| Primary text | `#101828` |
| Secondary text | `#667085` |
| Border | `#E7E4DC` |
| Accent yellow | `#F5C542` |
| Accent orange | `#E96B19` |
| Success | `#168A5B` |
| Focus ring | `#D99A00`, 2 px + 2 px offset |

Dark mode keeps geometry identical. Only semantic color tokens, elevation, borders, and media treatment change.

## 12. React component boundaries

```text
BoardPage
├─ PublicHeader
├─ BoardLayout
│  ├─ ProfileRail
│  ├─ BoardFeed
│  │  ├─ BoardToolbar
│  │  └─ BoardIssuePost[]
│  │     ├─ IssueCardChrome
│  │     ├─ PostMedia
│  │     ├─ PostActionStrip
│  │     └─ IssueThreadBlock
│  └─ NodeContextRail
├─ IssueModal
│  └─ IssueDetail + IssueThreadBlock
├─ ReactionPicker
├─ ReactorsPopover
└─ ReactionsDialog
```

`BoardIssuePost` and `IssueThreadBlock` are layout ownership boundaries. Overlay components render through a portal and are anchored with measured trigger geometry; they must not be positioned using hard-coded page coordinates.

## 13. Implementation invariants

- List state shows every Issue in the current result set; map state may show only coordinate-eligible Issues.
- Filters remain visible in list and map modes.
- Civic identity remains readable if social data is loading, empty, or unavailable.
- No fake comments or reactions in failure states.
- Verify-before-write redirects to existing `/verify` and returns to the originating post; verification result is method-opaque.
- Moderation reactions are unavailable on the thread root.
- Attach denial is explicit and fail-soft; no control can disable the legal media floor.
- Escalation is a compact invitation stub with visible feedback, not a dead control.
- `schema_card` is optional. Empty/absent data produces no empty `Additional details` shell.

## 14. Acceptance checklist

1. At 1440 px, all three columns fit without horizontal scrolling and the feed is at least 640 px wide.
2. At 1024 px, the right rail is absent from the fixed grid and the feed remains readable.
3. At 768 px and below, rails do not reserve horizontal space.
4. Every interactive target is at least 44 × 44 px on touch layouts.
5. Opening any popover or dialog causes no feed layout shift.
6. Issue modal and reactions dialog fit within `100dvh` and expose one intentional scroll container.
7. Long localized labels wrap or scroll without covering controls.
8. Three comment depth levels remain visually legible at 320 px.
9. Keyboard focus is visible and follows reading order.
10. Light and dark themes preserve identical dimensions and component hierarchy.

