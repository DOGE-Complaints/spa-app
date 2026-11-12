# OP UX mirror — Gap v2 close + people affordance + media flush residual (2026-10-18)

> **UTC:** 2026-10-18T11:41:29Z  
> **Package:** [component-reactions](INDEX.md)  
> **Authority:** OP eye + hard analysis [analysis-component-reactions-missing-reactions-icon-and-people-ux-2026-10-18.md](../../../analysis/analysis-component-reactions-missing-reactions-icon-and-people-ux-2026-10-18.md) · M154/M160 strip chrome · M155 people · CR-16 flush intent  
> **Stories:** [CR-20](STORY-SPA-CR-20-gap-v2-icon-generate.md) · [CR-21](STORY-SPA-CR-21-people-affordance-residual.md) · [CR-22](STORY-SPA-CR-22-media-strip-flush-residual.md)  
> **Prior tip:** [polish+M155 10-17](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) (structure people Present · Gap v2 still open)  
> **Method:** [analysis.mdc](../../../../../.cursor/rules/analysis.mdc)

---

## 1. Зачем

CR-11…19 закрыли **structure** (4 zones · people path · chip hover wire · media flush CSS), но OP eye 2026-10-18 всё ещё видит:

1. **Broken img** на зоне Reactions (`reactions.svg` Absent).  
2. **Ощущение «нет действия»** people — idle card без popover; якорь popover у React-слота слева; visual PASS не закрыт.  
3. **Воздух** между media и полоской strip (CR-16 structure Done · OP eye residual).

Корневой процессный сбой: Gap v2 был «отдельный icon dialog» + **no invent SVG** в apply → wire без файла → тесты кодировали Absent как OK. Эта волна **закрывает разрыв in-package**.

---

## 2. AS-IS (verified 2026-10-18)

| Факт | Путь / evidence |
|------|-----------------|
| `reactions.svg` Absent | `spa-app/public/icons/next-feed/actions/` · analysis §1 |
| URL wired + broken `<img>` | [`FeedPostActionStrip.jsx`](../../../../src/features/feed-lab/post/FeedPostActionStrip.jsx) `FEED_POST_ACTION_ICON_URLS.reactions` |
| CSS/test «Absent OK» | [`FeedPostActionStrip.css`](../../../../src/features/feed-lab/post/FeedPostActionStrip.css) comment · `reactionsMount.cr17.test.jsx` `existsSync` → false |
| `react.svg` Present, wrong glyph (smiley) | same actions dir · CR-icon §Gap v2 |
| People path Present | `activateAggregate` → `handleOpenPeople` · `ReactorsPopover` · FixtureAdapter `listReactors` |
| People popover anchor = React slot | [`ReactionsMount.jsx`](../../../../src/features/reactions-mount/ReactionsMount.jsx) `measurePopoverPosition(anchorRef)` on `reactions-mount__anchor` |
| Media flush CSS Present | [`FeedPostCard.css`](../../../../src/features/feed-lab/post/FeedPostCard.css) · media `aspect-ratio: 16/9` |
| CR-17…19 gate BLOCK · Gap WAIVED | audits / p5 disposition · P8 Done ≠ visual PASS |

---

## 3. Locked — CR-20 Gap v2 generate/promote (**this wave Writes SVG**)

### 3.1 Scope (only two chrome glyphs)

| ID | Action | Spec |
|----|--------|------|
| `react` | **Replace** body | Outline **thumbs-up** (M154/M160). ViewBox 24 · stroke 2 · `currentColor` · round caps. Not smiley. |
| `reactions` | **NEW** body | Two **overlapping circles** (Venn / dual-dot). ViewBox 24 · stroke 2 · `currentColor`. |

Grammar: master under `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/` → promote `spa-app/public/icons/next-feed/actions/`.  
Update SHA / manifest / NF catalog row / CR-icon §Gap v2 → §Reuse · ICON #10 tip.

### 3.2 Explicit non-goals (unchanged)

- Multicolor filled mark SVGs  
- Lucide / emoji interim  
- Duplicate bytes under `public/icons/component-reactions/`  

### 3.3 After promote (code hygiene)

- Remove «broken img OK» CSS comment / acceptance.  
- Flip vitest: `reactions.svg` **must exist**; strip `img` src resolves (no Absent assertion).  
- Visual AC on CR-11/15/17 residual: dual-circle Present · React thumbs-up.

---

## 4. Locked — CR-21 people affordance residual

### 4.1 Triggers (hold CR-17)

| Control | Opens |
|---------|--------|
| Strip **React** | Picker only |
| Strip **Reactions** | People (popover / sheet) — **not** picker |
| Aggregate activate | Same people path |

### 4.2 Affordance fixes (new)

- **Anchor:** people popover (desktop) positions relative to the **Reactions zone** control that opened it (or a dedicated trigger ref), not the React slot on the left — OP must see the panel near the control they clicked.  
- **Chip hover:** Reactions zone (and Comment/Share if already unequal) gets the same **inner chip** hover grammar as React (CR-16) — not full-cell fill.  
- **OP eye AC:** click Reactions on `#/lab/feed` → `ReactorsPopover` (or sheet narrow) with fixture people · picker stays closed · `data-rm-people-open` / testids observable.  
- Aggregate on populated fixture (e.g. `…-002`) still opens people.  
- No invent Live people HTTP · FixtureAdapter only · Live fail-closed held.

### 4.3 Out of scope for CR-21

New M155 panels · invent Connect · change dialog/sheet content model (CR-18/19 hold).

---

## 5. Locked — CR-22 media–strip flush residual

### 5.1 Intent

OP eye: no large white band between illustration bottom and strip `border-top`. Strip hugs media.

### 5.2 Investigate then fix (fact-first)

Possible verified causes to check in apply (do not invent before measure):

- 16:9 letterbox / `object-fit` vs artwork  
- residual margin/padding on media wrappers  
- PNG light bottom edge mistaken for layout gap  

Fix only what measurement shows. Hold CR-16 chip hover. Detail body parity with feed card.

### 5.3 Out of scope

New card chrome · carousel · invent HTTP.

---

## 6. Story map

| Story | Layer focus | Depends |
|-------|-------------|---------|
| **CR-20** | Gap v2 SVG generate + promote + test flip | CR-icon Gap v2 open · CR-11 wire Present |
| **CR-21** | People anchor + Reactions chip + OP eye click | CR-17…19 structure · **CR-20** for visual strip PASS |
| **CR-22** | Media–strip flush OP residual | CR-16 structure · soft after CR-20/21 eye |

**Order:** CR-20 → CR-21 → CR-22.

---

## 7. Forbidden

- Close CR-20 without writing SVG bodies (wire-only repeat of Gap failure)  
- Keep vitest «file Absent = pass» after promote  
- Invent people HTTP / fabricate Live people from counts  
- Open picker from Reactions  
- Multicolor mark SVG generate · Lucide  
- Invent OP PASS without OP eye  
- `#/next/feed` production cutover  

---

## 8. Relationship to prior mirrors

| Mirror | Role after this wave |
|--------|----------------------|
| [polish+M155 10-17](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) | Prior · people structure SSOT · §4.6 Gap **superseded by CR-20** |
| [visual M154 10-16](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) | Strip+picker chrome · Gap handoff consumed by CR-20 |
| **This file** | **Tip normative** for residual close |
