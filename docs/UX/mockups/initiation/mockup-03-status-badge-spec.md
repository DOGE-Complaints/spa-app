# Mockup 03 Spec — Status Badge System

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-status-badge.png`  
**Version:** v1.1 (gateway canon, SEARCH-01)  
**Status:** active SSOT for status badges  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Системный компонентный sheet для статусов issue на board:
- `NEW`
- `IN REVIEW`
- `PUBLISHED`

Фокус только на badge-компонентах и их визуальной иерархии.
Текстовые футеры внизу мокапа в scope не входят.

> **Примечание (2026-06-17):** legacy статусы `VERIFIED` / `ARCHIVED` и doge-marker удалены из канона gateway ([`enums.py`](../../../../doge-complaints-gateway/src/core/projection/enums.py)); runtime — [`StatusBadge.jsx`](../../src/components/StatusBadge.jsx).

---

## 2) Базовые метрики компонента

- Холст: `1536x1024`.
- Тип компонента: compact pill/rounded badge.
- Радиус: `8..10px`.
- Высота: ориентир `48..56px` на sheet-презентации; в runtime допускается уменьшение при сохранении пропорций.
- Горизонтальные внутренние отступы: `14..18px`.
- Gap между badge: `~40px` на sheet (информационный, не runtime constraint).

---

## 3) Визуальная иерархия статусов

1. **NEW** — базовый primary neutral (белый текст на темном фоне).
2. **IN REVIEW** — нейтральный muted.
3. **PUBLISHED** — акцентный warm-neutral (золотистый текст), но вторичный относительно контента issue; без иконки.

Правило: статус различается цветом и текстом; иконки статуса нет.

---

## 4) Ориентиры токенов

Рабочие ориентиры (допуск ±8%):

- Общий фон сцены: `#060609` .. `#1c1c22`.
- Бейдж-фон neutral: `#22252d` .. `#2b2f39`.
- Бейдж-бордер: `rgba(255,255,255,0.10..0.16)`.
- Текст neutral badge: `#e6e8ef`.
- Текст muted badge: `#a2a7b3`.
- PUBLISHED accent: `~#c5a162`.
- PUBLISHED фон: темный warm-neutral `~#2a271f` (без яркого свечения).

---

## 5) Component contract (runtime)

- `StatusBadge` принимает одно из:
  - `NEW`
  - `IN_REVIEW`
  - `PUBLISHED`
- Канонический контракт без двусмысленности:
  - **Domain enum:** `NEW`, `IN_REVIEW`, `PUBLISHED`
  - **Display label (EN):** `NEW`, `IN REVIEW`, `PUBLISHED`
  - `IN REVIEW` используется только как UI-label; в данных всегда `IN_REVIEW`.
- Иконки статуса нет (legacy `verified.svg` удалён).
- Неизвестный статус должен иметь safe fallback (`UNKNOWN` style) без падения UI.

### 5.1 I18n labels for status (UI layer)

- `status.NEW`: `et=UUS`, `ru=НОВОЕ`, `en=NEW`
- `status.IN_REVIEW`: `et=LÄBIVAATUSEL`, `ru=НА РАССМОТРЕНИИ`, `en=IN REVIEW`
- `status.PUBLISHED`: `et=AVALDATUD`, `ru=ОПУБЛИКОВАНО`, `en=PUBLISHED`
- `status.UNKNOWN`: `et=TEADMATA`, `ru=НЕИЗВЕСТНО`, `en=UNKNOWN`

---

## 6) Правила применения в Board card

- Badge размещается в `meta`-строке карточки рядом с `Issue.id`.
- При длинном title badge сохраняет читаемость, не сжимается до нечитабельного вида.
- Для accessibility сохраняется контраст и видимый focus ring (когда badge интерактивен).

---

## 7) Что НЕ фиксируется этим мокапом

- Hover/active/disabled анимации по кадрам.
- Состояния details-экрана.
- Логика фильтрации статусов.
- Любые футерные тексты/копирайт под компонентами sheet.

---

## 8) Трассировка в задачи EPIC-03

- `task-implement-epic03-status-badge-system` (новая) — реализация badge-компонента и state map.
- `task-implement-epic03-issue-card-fields` — интеграция badge в `IssueCard`.
- ~~`task-implement-epic03-branding-and-verified-ui`~~ — superseded (VERIFIED/doge-marker вне канона gateway).
