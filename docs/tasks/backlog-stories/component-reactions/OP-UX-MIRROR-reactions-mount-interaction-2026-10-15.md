# OP UX mirror — ReactionsMount interaction (2026-10-15)

> **UTC:** 2026-10-15T10:01:06Z  
> **Package:** [component-reactions](INDEX.md) · code home `src/features/reactions-mount/`  
> **Lab verify URL:** `http://127.0.0.1:5173/#/lab/reactions` (HashRouter)  
> **Target context after cutover:** `#/lab/feed` (post + thread)  
> **Method:** [analysis.mdc](../../../../../.cursor/rules/analysis.mdc) — names from code; OP intent below  
> **Stories:** [CR-05](STORY-SPA-CR-05-strip-open-dismiss.md) · [CR-06](STORY-SPA-CR-06-picker-chrome-layout.md) · [CR-07](STORY-SPA-CR-07-lab-feed-cutover.md)  
> **Follow-on composition:** [OP-UX-MIRROR-lab-feed-composition-2026-10-15.md](OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) · CR-08…10

---

## 1. Зачем зеркало

OP eye на lab reactions: текущий паттерн «только кнопка React открывает picker; aggregate не ведёт в picker» расходится с привычным Facebook-like UX и перегружает chrome. Ниже — нормативные решения до implement (не invent PASS на CR-01…04).

---

## 2. Имена (код)

| UI (OP) | Component / testid |
|---------|-------------------|
| Пилюля иконки + число | `ReactionSummaryStrip` → `data-testid="reaction-summary-aggregate"` · класс `rm-summary-strip__aggregate` |
| Кнопка React | тот же strip → `data-testid="reaction-summary-react"` |
| Блок списка реакций | `ReactionPicker` · `data-testid="rm-reaction-picker"` |
| Host | `ReactionsMount` |
| Lab stands | `#/lab/reactions` · `ReactionsLabPage` / `ReactionsLabCanvas` |
| Lab feed (сейчас) | `#/lab/feed` · **`FeedReactionPlane`** (`feed-reaction-plane`) — **не** ReactionsMount |

---

## 3. Решения OP (locked)

### 3.1 Открытие picker

| Состояние strip | Affordance | Поведение |
|-----------------|------------|-----------|
| **Empty** (нет marks / нет count) | Кнопка **React** | Click → open `ReactionPicker` (как сейчас по смыслу empty) |
| **Populated** | Aggregate pill | **Hover** → highlight aggregate + show same `ReactionPicker`; click на aggregate тоже открывает (a11y / touch) |
| Populated | Кнопка React | **Не показывать** (OP choice **3**) |

Highlight: visual affordance на `rm-summary-strip__aggregate` (hover / open state), без invent нового mark set.

### 3.2 Закрытие picker

| Способ | Правило |
|--------|---------|
| Click outside | Закрыть при клике **вне** `rm-reaction-picker` (любое место снаружи) |
| Light X | Внутри picker **справа вверху** — лёгкая иконка крестик (не тяжёлый текстовый Close) |
| Escape | Сохранить (уже Present в `ReactionPicker`) |

**Icon SSOT (Present):** `/icons/next-shell/actions/close.svg` — уже в [CR-icon §Reuse chrome](STORY-SPA-CR-icon-assets.md) как logical id `close`. Stroke `currentColor` · лёгкий X. **Не** invent new SVG; **не** подпись «Close» рядом с иконкой (icon-only + accessible name).

### 3.3 Layout picker (desktop popover)

| Было (lab) | Станет |
|------------|--------|
| Header: capacity + кнопка Close (иконка+текст) | Capacity слева; **icon-only** close справа |
| Hint «Thread root: Moderation…» под header | Тот же `threadsFeed.reactions.rootModerationHint` — **внизу** picker (после слоёв) |
| Широкий popover с пустотой справа у option rows | Ширина **по самому длинному option label** + симметричные горизонтальные padding; без длинного empty gutter |

Mobile sheet: те же dismiss rules; hug-width — desktop popover primary; sheet может остаться full-bleed (не ломать mobile AC без нужды).

### 3.4 Cutover context

После polish на `#/lab/reactions` — **заменить** lab-feed plane:

- **Replace:** `FeedReactionPlane` / `FeedReactionAggregate` / `FeedReactionPicker` mounts в post/thread path на `#/lab/feed`
- **With:** `ReactionsMount` (+ FixtureAdapter / lab contract) в PostActionStrip / discussion comment slots
- Цель OP: полноценный тест в контексте поста и треда
- **OOS этой волны:** production `#/next/feed` cutover; M155 people

---

## 4. Delta vs CR-01…04 (structure Done)

| CR-01…04 claim | Delta |
|----------------|-------|
| «React always opens picker» | Уточнение: React **только empty**; populated → aggregate |
| Aggregate → `onAggregateActivate` (не picker) | Aggregate → **open picker** (+ hover) |
| Heavy Close control | Icon-only NS close + outside click |
| Root hint under header | Hint footer |
| Fixed wide popover | Hug content width |
| Lab verify on `#/lab/reactions` only | + cutover `#/lab/feed` |

CR-01…04 visual gates остаются BLOCK (OP eye) до отдельного residual; **новые** CR-05…07 = implement волны polish + cutover.

---

## 5. Story map

| Story | Scope |
|-------|--------|
| [CR-05](STORY-SPA-CR-05-strip-open-dismiss.md) | Empty/React · populated aggregate hover/highlight/open · dismiss outside · light X |
| [CR-06](STORY-SPA-CR-06-picker-chrome-layout.md) | Hint footer · hug-width popover · Close chrome = icon-only |
| [CR-07](STORY-SPA-CR-07-lab-feed-cutover.md) | `#/lab/feed` replace `FeedReactionPlane` → `ReactionsMount` |

**Order:** CR-05 → CR-06 → CR-07 (cutover после interaction+layout).

---

## 6. Forbidden

- Invent HTTP / second SocialClient  
- M155 people UI  
- `#/next/feed` production cutover  
- New close SVG when NS Present  
- Hopeful / amused selectable  
- Invent OP PASS on CR-01…04 without eye  
