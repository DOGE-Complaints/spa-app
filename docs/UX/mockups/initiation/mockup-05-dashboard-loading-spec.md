# Mockup 05 Spec — Dashboard Loading State

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-loader.png`  
**Version:** v1.0  
**Status:** active SSOT for Board loading state  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Состояние `/#/board` в момент загрузки данных:
- layout board полностью видим (header/sidebar/toolbar/columns);
- вместо карточек issues отображаются skeleton-заглушки;
- фильтры и CTA сохраняют структуру экрана.

Фокус: визуальная непрерывность интерфейса во время read-side загрузки.

---

## 2) Канонические признаки loading состояния

- Холст: `1536x1024`.
- Колонки статусов (`NEW/VERIFIED/IN REVIEW/ARCHIVED`) остаются видимыми.
- Domain enum contract: `NEW/VERIFIED/IN_REVIEW/ARCHIVED` (`IN REVIEW` — только display label).
- Счетчики рядом со статусами могут быть:
  - placeholder-числами, или
  - временно скрыты/обнулены (по runtime-решению), но без layout shift.
- Каждая колонка содержит стек серых skeleton-card блоков.
- Skeleton-блоки повторяют форму/высоту будущих карточек.

---

## 3) Skeleton-система (Board)

- `SkeletonCard`:
  - dark panel background;
  - 2-3 светлых полосы для имитации текста;
  - без реальных labels/status/date.
- `SkeletonCard` не интерактивен (нет hover/focus/selected).
- Рекомендуется мягкая shimmer-анимация, но допустим и статичный skeleton.

---

## 4) UX/поведенческие правила

- Loading не должен показывать "ошибку" и не должен выглядеть как empty.
- При завершении загрузки:
  - skeleton корректно заменяется реальными карточками без резкого скачка layout.
- При ошибке загрузки:
  - переход в `load-error` state (отдельный сценарий, не часть этого мокапа).
- CTA `Create Issue` остается доступным по UX-контракту.

---

## 5) Что НЕ фиксируется этим мокапом

- No-results/no-issues copy.
- Детали retry-поведения при ошибке.
- Loading-state для details route (`/#/issue/:id`).
- Нижние пояснительные тексты на изображении.

---

## 6) Трассировка в задачи EPIC-03

- `task-add-epic03-empty-states` (расширенный scope: empty/loading/error states).
- `task-implement-epic03-issue-service-integration` (источник `isLoading`/fetch lifecycle).
- `task-implement-epic03-board-main-visual-parity` (сохранение layout во время loading).
