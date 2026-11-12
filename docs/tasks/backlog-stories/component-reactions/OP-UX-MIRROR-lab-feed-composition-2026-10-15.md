# OP UX mirror — `#/lab/feed` composition (2026-10-15)

> **UTC:** 2026-10-15T19:08:48Z  
> **Package:** [component-reactions](INDEX.md)  
> **Evidence:** OP eye on `#/lab/feed` · screenshot reactions zone (dark picker on light card · dual React · clipped scroll)  
> **Prior mirror:** [OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md](OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) (CR-05…07)  
> **Stories:** [CR-08](STORY-SPA-CR-08-lab-feed-theme-stress.md) · [CR-09](STORY-SPA-CR-09-strip-slot-composition.md) · [CR-10](STORY-SPA-CR-10-picker-portal-escape.md)  
> **Method:** [analysis.mdc](../../../../../.cursor/rules/analysis.mdc)  
> **Superseded (strip composition §3.2 A+C+B):** [OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) — M154 **4 zones** + React-always. Theme (§3.1) · portal (§3.3) still valid.

---

## 1. Зачем

После CR-07 cutover OP видит на `#/lab/feed`: (1) picker не следует светлой карточке / теме; (2) текстовый **React** в action strip + отдельный React mount ниже; (3) picker клипится карточкой и скроллится внутри — плохой UX.

---

## 2. Факты с диска (до CR-08…10)

| Факт | Путь |
|------|------|
| Карточка клипит детей | [`FeedPostCard.css`](../../../../src/features/feed-lab/post/FeedPostCard.css) `overflow: hidden` |
| Picker absolute + internal scroll | [`ReactionPicker.css`](../../../../src/features/reactions-mount/picker/ReactionPicker.css) `--popover`: `position: absolute` · `max-height` · `overflow: auto` |
| Strip = 4 текстовые зоны | [`FeedPostActionStrip.jsx`](../../../../src/features/feed-lab/post/FeedPostActionStrip.jsx) React \| Comment \| Share \| Reactions |
| Mount ниже strip | [`FeedPostCard.jsx`](../../../../src/features/feed-lab/post/FeedPostCard.jsx) → discussion / `FeedLabReactionsMount` |
| Theme tokens в picker CSS | `--color-surface-elevated` и др. — **Present**; mismatch = inheritance / lab без stress switcher |
| Stress switcher эталон | [`ReactionsLabCanvas.jsx`](../../../../src/features/reactions-mount/lab/ReactionsLabCanvas.jsx) · `rm-lab-stress-controls` · locale × theme × viewport × 200% |

---

## 3. Locked OP decisions

### 3.1 Theme + lab/feed stress (→ CR-08)

- Surfaces `ReactionSummaryStrip` / `ReactionPicker` / mount chrome **следуют** выбранной теме (`data-theme` / shell tokens) — light и dark.  
- На **`#/lab/feed`** добавить **тот же класс тестовых переключателей**, что на `#/lab/reactions` (минимум: light/dark; ideally locale × theme × viewport × text zoom как M160 stress row pattern).  
- Цель: OP может гонять стейты без ухода на `#/lab/reactions`.

### 3.2 Strip composition **A + C + B** (→ CR-09) — **SUPERSEDED 2026-10-16**

> Normative strip = M154 **4 zones** + React-always + aggregate row — see [visual mirror](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.  
> Historical A+C+B (3 zones / Reactions removed) was implemented in CR-09; CR-11…12 reverse that composition toward mockups.

| Letter | Meaning (historical CR-09) |
|--------|------------------|
| **A** | Первая зона strip = живой `ReactionSummaryStrip` (empty→React · populated→aggregate), не текст «React» |
| **C** | Picker якорится к этой зоне |
| **B** | Зону **Reactions** убрать → 3 зоны |

- Historical: дублирующий React mount **под** strip убран (keep).  
- Comment nodes: компактный mount у комментария (keep).

### 3.3 Overflow **P1** (→ CR-10)

- Desktop popover: **portal** (например `createPortal` → `document.body`) + **fixed** (или equivalent) позиционирование от каретки strip.  
- Не клипится `FeedPostCard` `overflow: hidden`.  
- Не полагаться на снятие `overflow: hidden` с карточки как primary fix.  
- Narrow viewport: sheet grammar (CR-02) остаётся допустимой.  
- Click-outside / Escape / icon-only close (CR-05) сохраняются с portal.

---

## 4. Story map

| Story | Scope |
|-------|--------|
| CR-08 | Theme token honesty + `#/lab/feed` stress controls (mirror reactions lab) |
| CR-09 | A+C+B strip composition · 3 zones · live React slot · no duplicate root mount under strip |
| CR-10 | P1 portal escape · no card-clipped scroll |

**Order:** CR-08 → CR-09 → CR-10 (portal after slot exists; theme can land first for OP eye).

---

## 5. Forbidden

- Invent HTTP / second client  
- M155 people  
- `#/next/feed` production cutover  
- Primary fix = only remove `overflow:hidden` on card (P2)  
- Keep 4th **Reactions** text zone  
- Dual React affordances on root post  
