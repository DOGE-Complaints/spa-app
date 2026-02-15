# Mockup 04 Spec — Issue Card Interaction States

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-status-card-hover.png`  
**Version:** v1.0  
**Status:** active SSOT for IssueCard interaction states  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Компонентный state-sheet для карточки issue на board:
- `Default`
- `Hover`
- `Keyboard Focus`
- `Selected`

Фокус только на interaction-состояниях карточки.
Нижние пояснительные/футерные тексты в scope не входят.

---

## 2) Базовые ориентиры

- Холст: `1536x1024`.
- На sheet показано 4 карточки одинаковой структуры и размера.
- Геометрия карточки между состояниями не меняется (меняются только визуальные акценты).
- Accent для выбранного состояния: `~#bb944a` (левая вертикальная линия).

---

## 3) Правила по состояниям

1. **Default**
   - Нейтральный dark card border/background.
   - Базовая читаемость title/chips/date.

2. **Hover**
   - Легкое усиление контраста/подсветки карточки.
   - Без скачка layout и без агрессивного glow.

3. **Keyboard Focus**
   - Явный светлый focus-ring по периметру карточки.
   - Обязателен для accessibility и клавиатурной навигации.

4. **Selected**
   - Выделение через левую акцентную линию.
   - Состояние выбора не должно конфликтовать с focus-ring.

---

## 4) State precedence (когда несколько состояний одновременно)

- `Focus` приоритетнее `Hover`.
- `Selected` может сочетаться с `Focus`:
  - left accent line + focus ring.
- `Selected` не должен сбрасывать контраст текста/chips/status.

---

## 5) Accessibility требования

- Карточка должна быть keyboard focusable.
- Focus indicator видим на темном фоне (WCAG-friendly contrast).
- Информация о выбранности должна быть доступна не только цветом (например, `aria-selected=true`).

---

## 6) Что НЕ фиксируется этим мокапом

- Loading skeleton карточки.
- Empty/no-results/load-error сценарии board.
- Логика data-fetch и фильтров.
- Footer-копирайт вне карточек.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-issue-card-fields` — основной scope interaction states.
- `task-implement-epic03-board-main-visual-parity` — согласование state-видимости в контексте board layout.
- `task-implement-epic03-status-badge-system` — совместимость статусов с состояниями карточки.
