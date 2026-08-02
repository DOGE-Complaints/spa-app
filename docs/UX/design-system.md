# Design System dogeestonia (Canon)

**Версия:** DS-0.1  
**Источник:** Dogecomplaints — Estonia D.O.G.E. — Дизайн система.pdf (S01-6)  
**Контекст:** spa-app, React + Vite, EPIC-01

---

## 0. Назначение Design System

Design System dogeestonia — это:
- **не** брендбук,
- **не** UI-кит ради красоты,

а **рабочий контракт** между смыслом, дизайном и кодом.

Он нужен, чтобы:
- интерфейс не «расползался»,
- dogeestonia оставался системным агентом,
- любой новый экран автоматически оставался в каноне.

---

## 1. Структура Design System

Design System состоит из 4 слоёв:

| Слой | Содержание |
|------|------------|
| **Foundations** | Цвета, типографика, иконография, spacing |
| **Components** | Повторяемые UI-элементы |
| **Patterns** | Сценарии использования компонентов |
| **Narrative Rules** | Где и как допускается «характер» |

---

## 2. Foundations

### 2.1 Color Tokens (канон)

Brand hex SSOT: [DOGEstonia Color Palette v1.0](../tasks/backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md) (`--doge-*`). Consumer CSS API остаётся `--color-*` (G4 infra); G9 cutover — [STORY-SPA-G9](../tasks/backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md).

| Token | Значение | Hex | CSS-переменная |
|-------|----------|-----|----------------|
| `color.background.primary` | DOGE Night | `#0B1320` | `--color-bg-primary` → `--doge-bg` |
| `color.background.secondary` | Surface 1 | `#111C2B` | `--color-bg-secondary` → `--doge-surface-1` |
| `color.text.primary` | Pure White | `#FFFFFF` | `--color-text-primary` → `--doge-text` |
| `color.text.secondary` | Text secondary | `#B8C2CF` | `--color-text-secondary` → `--doge-text-2` |
| `color.text.warm` | Text warm / Cream | `#FFF4DE` | `--color-text-warm` → `--doge-text-warm` |
| `color.accent.primary` | Signal Orange | `#F5A623` | `--color-accent-primary` → `--doge-accent` |
| `color.accent.hover` | Action hover | `#FFB544` | `--color-accent-hover` → `--doge-accent-hover` |
| `color.accent.active` | Action active | `#D98F17` | `--color-accent-active` → `--doge-accent-active` |
| `color.accent.soft` | Soft accent fill | `rgba(245,166,35,0.14)` | `--color-accent-soft` → `--doge-accent-soft` |
| `color.border.default` | Border | `#2B3A4D` | `--color-border-default` → `--doge-border` |
| `color.border.muted` | Muted | `#7D8999` | `--color-border-muted` → `--doge-muted` |

**Правило:** Цвет никогда не несёт смысл в одиночку — только вместе с формой/иконкой. На CTA с Signal Orange текст = `#0B1320` / `#111111` (не белый).

**Техническая адаптация:** Night System + Orange Signal. Реализовано: [`src/styles/tokens.css`](../../src/styles/tokens.css) (`--doge-*` brand + `--color-*` consumer; G4 infra retained) — G4 Done (`pkg-000038`); brand hex G9 (`pkg-000042`); adoption glue G11 (`pkg-000043`).
**G11 CTA / semantic glue (D-G11-2 / FR-G11.2–5):**
- Primary CTA on accent: label = `var(--color-bg-primary)` (unified; equivalent Night via `--doge-bg`). Do **not** use `--color-text-primary` (white) on Signal Orange.
- Primary CTA `:hover` / `:focus-visible`: `background: var(--color-accent-hover)`.
- Soft accent fills: `var(--color-accent-soft)` → `--doge-accent-soft` (not legacy yellow rgba).
- `--color-text-warm`: **Do** use for cream/warm secondary copy accents; **Don't** replace all `--color-text-secondary`.


### 2.2 Typography Tokens

| Token | Значение | CSS-переменная |
|-------|----------|----------------|
| `font.family.base` | Inter | `--font-family-base` |
| `font.family.mono` | JetBrains Mono | `--font-family-mono` |
| `font.weight.regular` | 400 | `--font-weight-regular` |
| `font.weight.medium` | 500 | `--font-weight-medium` |
| `font.weight.semibold` | 600 | `--font-weight-semibold` |
| `font.size.small` | 12px | `--font-size-small` |
| `font.size.base` | 14px | `--font-size-base` |
| `font.size.medium` | 16px | `--font-size-medium` |
| `font.size.large` | 18px | `--font-size-large` |

**Техническая адаптация:** ТЗ §10 — все ассеты локально, без внешних CDN. **Реализовано:** `public/fonts/` + `@font-face` в `src/styles/fonts.css` — [STORY-SPA-G7](../tasks/backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md) Done (`pkg-000039`).

### 2.3 Spacing & Density

| Token | Значение (px) | CSS-переменная |
|-------|---------------|----------------|
| `space.xs` | 4 | `--space-xs` |
| `space.sm` | 8 | `--space-sm` |
| `space.md` | 12 | `--space-md` |
| `space.lg` | 16 | `--space-lg` |
| `space.xl` | 24 | `--space-xl` |

**Плотность:** Ближе к Jira, чем к Notion. Интерфейс должен «держать нагрузку».

---

## 3. Иконография

### 3.1 dogeestonia Icon Set (канон)

- **Primary icon:** силуэт головы dogeestonia (логотип)
- **Secondary icon:** мини-версия головы (VERIFIED)

**Форматы:**
- SVG (монохром),
- масштабируемый до 12px без потери читаемости.

**Расположение:** `public/icons/` (локально). VERIFIED: `public/icons/verified.svg`.

### 3.2 Статусные иконки

| Статус | Визуал |
|--------|--------|
| NEW | текст + серый маркер |
| VERIFIED | mini dogeestonia icon |
| IN_REVIEW | текст + нейтральный muted стиль |
| ARCHIVED | текст + приглушённый цвет |

---

## 4. Components (канон)

### 4.0 Buttons (DS-BTN)

- **SSOT contract:** [design-system-buttons-spec.md](design-system-buttons-spec.md) · artboard [design-system-buttons-spec.png](design-system-buttons-spec.png)
- **Day-to-day guide:** [button-system-developer-guide.md](../runtime-docs/button-system-developer-guide.md)
- **Backlog:** [STORY-SPA-G10](../tasks/backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md) (Todo) — shared `Button` / migrate legacy `<button>`
- **Colors:** G9 brand tokens (`--color-accent-primary` = Signal Orange); primary label = ink/bg for contrast

### 4.1 Header

**Состав:**
- Логотип dogeestonia
- Название (опционально)
- System state indicator

**Запреты:**
- CTA
- баннеры
- сообщения пользователю

**Компонент:** [`src/components/AppShell/Header.jsx`](../../src/components/AppShell/Header.jsx) — Done ([STORY-SPA-G8](../tasks/backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md), `pkg-000040`).

### 4.2 Sidebar

**Компоненты:**
- NavItem
- NavGroup
- Active indicator (yellow marker)

**Поведение:**
- always visible
- no collapse (в MVP)

**Компонент:** [`src/components/AppShell/Sidebar.jsx`](../../src/components/AppShell/Sidebar.jsx) — Done ([STORY-SPA-G8](../tasks/backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md), `pkg-000040`).

### 4.3 Issue List Item

**Состав:**
- ID
- Title
- Status
- Labels
- VERIFIED icon (если есть)

**Hover:** underline / border, без заливки.

**Компонент:** `src/components/IssueList/IssueListItem.jsx`

### 4.4 Issue Card

**Секции:**
- Header (ID, title, status)
- Content (meme image)
- Metadata (txid, hash)
- Event log

**Компонент:** `src/components/IssueCard/IssueCard.jsx`

### 4.5 Empty State Component

**Состав:**
- dogeestonia pose
- 1–2 строки текста
- отсутствие CTA

**Важно:** Empty State = место нарратива.

**Компонент:** `src/components/EmptyState/EmptyState.jsx`

---

## 5. Patterns (как использовать компоненты)

### 5.1 Issue Lifecycle Pattern

- NEW → VERIFIED → IN_REVIEW → ARCHIVED
- Состояние вычисляется из событий.
- UI **не** «меняет статус» напрямую.

Правило enum/display:
- Domain enum: `IN_REVIEW`
- UI label (EN): `IN REVIEW`

### 5.2 Verification Pattern

- VERIFIED всегда визуально вторичен.
- Не доминирует над Issue.
- Не используется как «награда».

---

## 6. Narrative Rules (критично)

### 6.1 Что разрешено

- Ирония через пустоту
- Спокойное наблюдение
- Инженерные формулировки

### 6.2 Что запрещено

- Агрессия
- Сарказм в адрес пользователя
- Политические лозунги
- Персонификация власти

---

## 7. Accessibility & Safety

- Контраст WCAG AA/AAA
- dogeestonia **никогда** не единственный носитель смысла
- VERIFIED читается и без иконки (через текст/контекст)

---

## 8. Версионирование Design System

- Design System имеет версию (DS-0.1)
- Любые изменения:
  - оформляются как change proposal
  - не ломают канон задним числом

---

## Техническая карта (spa-app)

**Фактический MVP (2026-07-29):** tokens + self-hosted fonts Done; board/issue shell via `AppShell` + `Header` / `Sidebar` / `LanguageSelector` ([STORY-SPA-G8](../tasks/backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md)).

| Артефакт | Путь (target) | Факт / назначение |
|----------|---------------|-------------------|
| Токены CSS | `src/styles/tokens.css` | **Done** — L0 `:root` + hex mapping; import first in `main.jsx` — [STORY-SPA-G4](../tasks/backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) (`pkg-000038`) |
| Глобальные стили | `src/index.css` | base styles; typography via `--font-*` tokens |
| Шрифты | `public/fonts/` + `src/styles/fonts.css` | **Done** — Inter 400/500/600 + JetBrains Mono 400 woff2 — [STORY-SPA-G7](../tasks/backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md) (`pkg-000039`) |
| Иконки | `public/icons/`, `public/assets/` | verified marker, флаги локалей |
| Shell | `src/components/AppShell/` | **Done** — `AppShell.jsx`, `Header.jsx`, `Sidebar.jsx`, `LanguageSelector.jsx` — [STORY-SPA-G8](../tasks/backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md) (`pkg-000040`) |
| Компоненты | `src/components/` | StatusBadge, IssueCard, EmptyState, Filters (факт) |

> **Статус реализации (2026-07-29):** G4 Done (`pkg-000038`); G7 Done (`pkg-000039`); G8 Done (`pkg-000040`, AppShell Header/Sidebar/LanguageSelector). Backlog stories выше.

---

**Связанные документы:**
- [EPIC-01 Canon & Design System](../../docs/epics/EPIC-01-canon-design-system.md)
- [Дизайн система (PDF)](Dogecomplaints%20%E2%80%94%20Estonia%20D.O.G.E.%20%E2%80%94%20%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0.pdf)
