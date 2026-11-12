# OP UX mirror — strip polish + M155 people (2026-10-17)

> **UTC:** 2026-10-17T13:48:00Z  
> **Package:** [component-reactions](INDEX.md)  
> **Authority:** OP eye on `#/lab/feed` (hover / Reactions broken icon / media gap) · [M155 PNG](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.png) · [M155 written](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) · strip tone [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
> **Stories:** [CR-16](STORY-SPA-CR-16-strip-hover-media-flush.md) · [CR-17](STORY-SPA-CR-17-reactors-popover.md) · [CR-18](STORY-SPA-CR-18-reactions-dialog.md) · [CR-19](STORY-SPA-CR-19-people-sheet-lab-wire.md)  
> **Prior:** [visual M154](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) (strip+picker) · CR-12 M155 OOS **superseded for lab people**  
> **Superseded tip (Gap/people/media residual):** [OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md](OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · CR-20…22  
> **Method:** [analysis.mdc](../../../../../.cursor/rules/analysis.mdc)

---

## 1. Зачем

После CR-11…15 OP eye: (1) React hover заливает всю колонку; (2) Reactions без glyph + клик открывает **picker**, не people; (3) strip далеко от media. Оператор выбрал **M155 полный (вариант C)** в lab на FixtureAdapter.

---

## 2. AS-IS (verified)

| Факт | Путь |
|------|------|
| Hover paints full zone/slot | [`FeedPostActionStrip.css`](../../../../src/features/feed-lab/post/FeedPostActionStrip.css) `.zone--slot:hover` / React state → full `min-height: 56px` background |
| Media inside padded body | [`FeedPostCard.jsx`](../../../../src/features/feed-lab/post/FeedPostCard.jsx) media in `__body` · [`FeedPostCard.css`](../../../../src/features/feed-lab/post/FeedPostCard.css) `padding: 1.25rem` → gap under image |
| `reactions.svg` Absent | `public/icons/next-feed/actions/reactions.svg` missing · broken `<img>` |
| Reactions → picker | [`ReactionsMount.jsx`](../../../../src/features/reactions-mount/ReactionsMount.jsx) `activateAggregate` → `handleOpen()` |
| FixtureAdapter people | [`FixtureAdapter.js`](../../../../src/features/reactions-mount/adapters/FixtureAdapter.js) `onAggregateActivate` → `{ oos: 'M155' }` |
| Threads people API | Absent (M155 §2) — aggregates only |

---

## 3. Locked — CR-16 strip polish

### 3.1 React chip hover / selected / focus

- Highlight applies to an **inner chip** wrapping icon+label only.  
- Chip: `padding` ~6–10px horizontal / ~4–6px vertical · `border-radius` ~8px · soft yellow tint (`--color-accent-soft`) · text/icon accent.  
- **Do not** fill the entire 56px grid cell; **do not** draw a heavy border around the whole column.  
- Vertical zone dividers stay; focus ring on chip (or tight outline), not full-cell offset paint.  
- Same chip grammar for selected when user has reactions.

### 3.2 Media → strip flush

- Post **media** sits flush above action strip: no large padded gap from card body under the image.  
- Preferred: media full-bleed under identity/text block (zero bottom padding on media segment) · strip `border-top` immediately under media bottom edge.  
- Identity / title / summary keep readable side padding; do not invent new card chrome.

---

## 4. Locked — M155 people (CR-17…19)

### 4.1 Data boundary (normative)

- **Lab:** FixtureAdapter supplies illustrative people fixtures (Member A… / You) labeled as fixtures — **never** synthesize people from `aggregate_count` in production Live path.  
- **LiveAdapter:** people read fail-closed / unavailable until real API (DUI-Q08); no invent `/threads` people endpoints in this wave.  
- **Connect:** stub only — activate → honest «Connection feature is not available yet.» · no relationship edge create.  
- Badges = existing `reactions.v1` mark icons ([CR-icon §Reuse](STORY-SPA-CR-icon-assets.md)).

### 4.2 Triggers (supersede CR-12 picker-on-Reactions)

| Control | Opens |
|---------|--------|
| Strip **React** | `ReactionPicker` only (unchanged) |
| Strip **Reactions** | People surface (popover desktop / sheet narrow) — **not** picker |
| Aggregate row click/activate | Same people surface |

`activateAggregate` must **not** call `handleOpen()` for picker.

### 4.3 Panel A — `ReactorsPopover` (~320px) · CR-17

- Header: «People who reacted» + close (NS `close`).  
- Combined list across types · **no tabs** · **no Connect**.  
- Row ~52px: avatar 36px · reaction badge overlapping lower edge · name · a11y reaction name.  
- Max height ~440px internal scroll.  
- A1 loading: row skeletons + «Loading people…» (no fake names).  
- A2 error: «People who reacted are unavailable.» + Try again · aggregate unchanged.  
- D dark: same compact semantics via tokens.

### 4.4 Panel B — `ReactionsDialog` (~560px) · CR-18

- Header «Reactions» + close · focus trap · Escape.  
- Tabs: All + enabled reaction types (localized) · underline active.  
- Rows ~64px: avatar+badge(s) · name · Connect **only here** (stub) / You (no Connect) / Connection unavailable.  
- B2 empty type: «No people for this reaction yet.»  
- B3 loading/error scoped to dialog list.  
- Do not embed reaction picker catalog inside dialog.

### 4.5 Panel C — mobile sheet · CR-19

- ≤ ~88dvh · header+tabs+list · Back dismisses topmost · restore focus to trigger.  
- Full-distribution semantics (tabs + Connect stub) on sheet; compact mobile may reuse A (no Connect).

### 4.6 Icons

| ID | Role | Status |
|----|------|--------|
| `reactions` | Strip zone 4 dual-circle | Gap v2 **open** → close via **[CR-20](STORY-SPA-CR-20-gap-v2-icon-generate.md)** (was: promote before CR-17 visual PASS) |
| Mark badges | Avatar overlay | §Reuse Present |
| `close` | Popover/dialog/sheet | NS Present |
| Connect | Optional glyph | Reuse NF `collaboration-invite` or text-only stub |

---

## 5. Story map

| Story | Scope |
|-------|--------|
| CR-16 | Chip hover + media–strip flush |
| CR-17 | Triggers + ReactorsPopover A/A1/A2/D + Gap v2 icon wire |
| CR-18 | ReactionsDialog B* |
| CR-19 | Sheet C + lab wire both routes |

**Order:** CR-16 → CR-17 → CR-18 → CR-19.

---

## 6. Forbidden

- Invent people HTTP / fabricate people from aggregate counts in Live  
- Open picker from Reactions zone / aggregate (after this wave)  
- Connect real workflow  
- Lucide / multicolor mark SVG generate  
- `#/next/feed` production cutover  
- M155 people as production Live default before API
