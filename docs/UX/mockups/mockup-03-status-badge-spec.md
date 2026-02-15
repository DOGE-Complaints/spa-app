# Mockup 03 Spec — Status Badge System

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-status-badge.png`  
**Version:** v1.0  
**Status:** active SSOT for status badges  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Системный компонентный sheet для статусов issue на board:
- `NEW`
- `VERIFIED` (с doge-маркером)
- `IN REVIEW`
- `ARCHIVED`

Фокус только на badge-компонентах и их визуальной иерархии.
Текстовые футеры внизу мокапа в scope не входят.

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
2. **VERIFIED** — акцентный, но вторичный относительно контента issue:
   - doge icon + yellow text;
   - не должен перетягивать внимание у title карточки.
3. **IN REVIEW** — нейтральный muted.
4. **ARCHIVED** — нейтральный muted, сопоставимый с `IN REVIEW`.

Правило: статус различается не только цветом, но и текстом/иконкой.

---

## 4) Ориентиры токенов

Рабочие ориентиры (допуск ±8%):

- Общий фон сцены: `#060609` .. `#1c1c22`.
- Бейдж-фон neutral: `#22252d` .. `#2b2f39`.
- Бейдж-бордер: `rgba(255,255,255,0.10..0.16)`.
- Текст neutral badge: `#e6e8ef`.
- Текст muted badge: `#a2a7b3`.
- VERIFIED accent: `~#b38b47`.
- VERIFIED фон: темный warm-neutral (без яркого свечения).

---

## 5) Component contract (runtime)

- `StatusBadge` принимает одно из:
  - `NEW`
  - `VERIFIED`
  - `IN_REVIEW`
  - `ARCHIVED`
- Канонический контракт без двусмысленности:
  - **Domain enum:** `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED`
  - **Display label (EN):** `NEW`, `VERIFIED`, `IN REVIEW`, `ARCHIVED`
  - `IN REVIEW` используется только как UI-label; в данных всегда `IN_REVIEW`.
- `VERIFIED` рендерит иконку doge (локальный ассет/inline icon).
- Неизвестный статус должен иметь safe fallback (`UNKNOWN` style) без падения UI.

### 5.1 I18n labels for status (UI layer)

- `status.NEW`: `et=UUS`, `ru=НОВОЕ`, `en=NEW`
- `status.VERIFIED`: `et=KINNITATUD`, `ru=ПОДТВЕРЖДЕНО`, `en=VERIFIED`
- `status.IN_REVIEW`: `et=LÄBIVAATUSEL`, `ru=НА РАССМОТРЕНИИ`, `en=IN REVIEW`
- `status.ARCHIVED`: `et=ARHIIVIS`, `ru=В АРХИВЕ`, `en=ARCHIVED`

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
- `task-implement-epic03-branding-and-verified-ui` — doge-marker и бренд-консистентность VERIFIED.
