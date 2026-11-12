# OP UX mirror — M154/M160 strip + picker visual fidelity (2026-10-16)

> **UTC:** 2026-10-16T10:12:00Z  
> **Package:** [component-reactions](INDEX.md)  
> **Authority:** mockups = reference — [M154 PNG](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png) · [M160 PNG](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png)  
> **OP evidence:** lab `#/lab/feed` screenshot (3-zone strip · smiley React pill · Comment/Share text-only)  
> **Stories:** [CR-11](STORY-SPA-CR-11-strip-four-zone-chrome.md) · [CR-12](STORY-SPA-CR-12-react-always-aggregate-row.md) · [CR-13](STORY-SPA-CR-13-picker-tile-grid-chrome.md) · [CR-14](STORY-SPA-CR-14-mark-accent-tokens.md) · [CR-15](STORY-SPA-CR-15-lab-visual-wire.md) · [CR-icon §Gap v2](STORY-SPA-CR-icon-assets.md)  
> **Method:** [analysis.mdc](../../../../../.cursor/rules/analysis.mdc)  
> **Supersedes:** [composition mirror A+C+B](OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.2 (3 zones / Reactions removed) · CR-05 «hide React when populated» **for strip chrome** (interaction open/dismiss outside strip chrome still useful)

---

## 1. Зачем

OP принял gap-анализ: lab strip/picker не совпадает с M154/M160. Нужна нормативная детализация **только** Action Strip + Reaction Picker (thread preview OOS этой волны).

---

## 2. AS-IS (verified code / screenshot)

| Факт | Путь / evidence |
|------|-----------------|
| Strip = **3** зоны | [`FeedPostActionStrip.jsx`](../../../../src/features/feed-lab/post/FeedPostActionStrip.jsx) `data-lab-strip-zones="3"` · React \| Comment \| Share |
| Zone1 = `reactSlot` / summary | CR-09 wire · empty → smiley React pill |
| Comment / Share | Plain text labels · **no** icons |
| `react.svg` glyph | Smiley (circle+smile) — not thumbs-up |
| No strip zone `reactions` | Removed by CR-09 A+C+B |
| Aggregate | Inside `ReactionSummaryStrip` · populated hides React (CR-05) |
| Picker options | Vertical list · icon+label row ([`ReactionPickerOption.jsx`](../../../../src/features/reactions-mount/picker/ReactionPickerOption.jsx)) |
| Picker chrome | Capacity + icon-only X · **no** Cancel / Add reactions footer |
| Mark icons | `currentColor` stroke SVG + CSS mask ([`CrReactionIcon.jsx`](../../../../src/features/reactions-mount/icons/CrReactionIcon.jsx)) |
| Portal | CR-10 Present (popover → body) |

---

## 3. Locked TO-BE — Action Strip (M154 A · M160 A/D/E)

### 3.1 Four zones (equal chrome)

| Zone | Label | Glyph (logical id) | Role |
|------|-------|--------------------|------|
| 1 | React | `react` — **thumbs-up** outline | Always opens picker |
| 2 | Comment | `comment` — speech bubble | Discussion / reply (present intent) |
| 3 | Share | `share` — share arrow | Share (present intent) |
| 4 | Reactions | `reactions` — **two overlapping circles** | Affordance for **others’** reactions / aggregate |

- All four: **icon + label**, same visual weight (rest = neutral grey).  
- **No** special bordered “pill” only on React.  
- Dividers: thin horizontal rules above/below strip; optional light vertical gutters between zones (M154 tone).

### 3.2 React control states (M160 §D)

| State | Visual |
|-------|--------|
| Rest | Grey outline thumbs-up + grey «React» |
| Hover | Yellow tint background · yellow icon+text |
| Focus | Hover + 2px offset focus ring |
| Selected (user has reaction(s)) | Filled yellow thumbs-up · yellow text · light yellow tint |
| Disabled | Faded grey |

**React is always visible** in the strip (empty and populated). Opening picker is React’s job.

### 3.3 Reactions zone vs aggregate row

- Zone **Reactions** ≠ React. It is the entry to «реакции других».  
- **Aggregate row under strip** (M154 Panel A), not a replacement for zone 1:
  - Confirmed: mark icons + per-mark counts + «N total»  
  - Empty: row **hidden**  
  - Loading: skeleton + spinner  
  - Unavailable: error banner + Try again  
- Click/hover on aggregate or Reactions zone may open summary / picker per product wire in CR-12 (M155 people remain **OOS**).

### 3.4 Narrow / stress (M160 §E)

At ~320 CSS px / 200% text: strip reflows to **2×2 grid**:

| | Left | Right |
|--|------|-------|
| Row 1 | React | Comment |
| Row 2 | Share | Reactions |

### 3.5 Theme (M160 §A)

Strip chrome follows `data-theme` tokens (align CR-08). No hardcoded light-only islands on feed card chrome for these controls.

---

## 4. Locked TO-BE — Reaction Picker (M154 B/C/D)

### 4.1 Surfaces

- Desktop: popover anchored to React (portal+fixed = CR-10 retained).  
- Mobile / narrow: bottom sheet (CR-02 grammar retained).

### 4.2 Header

- Title (e.g. «React to this…» / localized).  
- Subtitle capacity («Choose up to 3…»).  
- Icon-only close (NS `close`) top-right.

### 4.3 Option layout — tile grid (not vertical list)

Within each layer group (Emotional / Epistemic / Moderation):

- Options in a **horizontal grid** of tiles.  
- Tile anatomy: **large colored icon** (accent via CSS) · bold label · short description under label.  
- Selected: soft background + accent border + check badge on icon cell.  
- Max 3 · XOR Agree/Disagree retained (CR-02).  
- Thread-root: **no** Moderation layer.

### 4.4 Footer chrome

| Desktop | Mobile |
|---------|--------|
| «N of 3 selected» · **Cancel** · yellow **Add reactions** | «N of 3» · yellow **Done** |

Save-error banner (M154 D4) retained if Present.

### 4.5 Colors

- Mark color = **CSS** `reactions.v1` accent on `currentColor` mask — **not** baked multicolor SVG files.  
- Soft tile backgrounds from token map soft aliases.

---

## 5. Story map

| Story | Scope |
|-------|--------|
| CR-icon §Gap v2 | Replace `react` thumbs-up · new `reactions` dual-circle · **no** colored mark SVG generate |
| CR-11 | 4-zone strip chrome · icons · M160 states · 2×2 |
| CR-12 | React-always · Reactions zone · aggregate row under strip |
| CR-13 | Picker tile grid · header/footer Cancel/Add/Done |
| CR-14 | Per-mark accent tokens in picker + summary |
| CR-15 | Wire `#/lab/reactions` + `#/lab/feed` (implement Await «делай») |

**Order:** CR-icon gap → CR-11 → CR-12 → CR-13 → CR-14 → CR-15.

---

## 6. Forbidden

- Invent HTTP / second client  
- M155 people / Connect UI  
- `#/next/feed` production cutover  
- Lucide / emoji interim for selectable marks  
- Keep A+C+B 3-zone as normative after this mirror  
- Primary “fix” = only remove card `overflow:hidden` (CR-10 already portal)  
- Generate 13 multicolor mark SVGs (use tokens)

---

## 7. Relationship to prior mirrors

| Mirror | Status after this doc |
|--------|----------------------|
| [interaction 10-15](OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) | Keep dismiss/outside/X · **strip hide-React superseded** by §3.2 |
| [composition 10-15](OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) | Theme/portal still valid · **§3.2 A+C+B superseded** by §3.1 |
| This visual mirror | **Normative** for strip+picker look & strip composition |
