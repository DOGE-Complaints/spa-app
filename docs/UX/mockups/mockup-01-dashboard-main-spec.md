# Mockup 01 Spec — Dashboard Main

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-main.png`  
**Version:** v1.0  
**Status:** active SSOT for Board default layout  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G9 — CTA всегда активная ссылка на GPT.

> **Статус реализации (2026-06-16):** соответствует коду — `SearchInput` в toolbar ([`SearchInput.jsx`](../../src/components/Filters/SearchInput.jsx), STORY-SPA-G3 Done).

---

## 1) Что фиксирует этот мокап

Базовый desktop-экран `/#/board` в темной теме:
- shell-структура (top bar + sidebar + toolbar + kanban columns);
- визуальная иерархия;
- базовая тональность брендинга и CTA;
- placeholder-уровень карточек до интеграции runtime-данных.

Это референс для visual parity задач EPIC-03, а не финальный state-pack.

---

## 2) Канонические layout-метрики (desktop)

- Холст референса: `1536x1024`.
- Глобальная компоновка: `sidebar + content`.
- Ширина sidebar: около `270px` (допуск `256..288px`).
- Высота верхнего хедера (бренд + board title + user controls): около `72px`.
- Высота toolbar (search + filters + CTA): около `64px`.
- Канбан-зона: `4 колонки` (`NEW`, `VERIFIED`, `IN REVIEW`, `ARCHIVED`).
- Domain enum contract: `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED` (`IN REVIEW` — display label).
- Колонки одинаковой ширины, с вертикальными разделителями.
- Внутри каждой колонки: заголовок + желтая линия + стек карточек.

---

## 3) Визуальные токены (из референса)

Ниже зафиксированы рабочие ориентиры (допуск ±8% на этапе first pass):

- Основной фон: `#141417` / `#19191c` / `#1f2024` (градиент/шум).
- Панели и карточки: `#1b1c1f` .. `#26262a`.
- Текст primary: `#f2f2f2` (почти белый).
- Текст secondary: `#8e9097` .. `#a0a3ac`.
- Accent yellow: `~#c7a646` (для CTA/разделителей/active marker).
- Border/divider: `rgba(255,255,255,0.08..0.14)`.
- Радиусы:
  - controls/button: `8px`,
  - cards: `10..12px`,
  - chips: `999px`.

---

## 4) Компонентный состав (Board default)

1. **Top header**
   - Левый блок: логотип doge + `DOGEstonia`.
   - Заголовок текущего раздела: `Board`.
   - Правый блок: user/environment controls (компактные).

2. **Sidebar**
   - Workspace label (`Fyonu` в макете).
   - Вертикальный nav-list с иконками.
   - Активный пункт (`Board`) с желтым акцентным маркером.

3. **Toolbar**
   - Search input с иконкой поиска.
   - Filter/sort controls.
   - Primary CTA: `Create %ssue` (текст в референсе с артефактом; runtime-copy нормализуем до `Create Issue`).

4. **Kanban columns**
   - 4 фиксированные статуса.
   - Счетчик рядом с названием статуса.
   - Placeholder-карточки одинаковой структуры.

5. **Dashboard footer (экранный, вне карточек)**
   - Нижняя вторичная строка:
     - `DOGEstonia — Decentralized Civic Issue Tracker`.
   - Это часть board-экрана, не часть `IssueCard`.

---

## 5) Правила точности верстки (Definition of Visual Match)

- Допустимое отклонение по ключевым отступам: не более `4px`.
- Количество и порядок зон экрана совпадает 1:1.
- Иерархия визуального веса:
  - CTA заметнее фильтр-контролов;
  - статусы колонок читаются раньше карточек;
  - активный пункт sidebar заметен, но не доминирует.
- VERIFIED визуально нейтрален (не ярче NEW).
- Никаких светлых/маркетинговых акцентов и эмоционального copy.

---

## 6) Что НЕ фиксируется этим мокапом

- Поведение empty/no-results/load-error/loading states.
- Детальная страница `/#/issue/:id`.
- Финальные иконки и финальная copy-polish.
- Runtime-данные из `issueService`.

Это покрывается следующими мокапами и задачами EPIC-03.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-board-main-visual-parity` (новый) — shell parity.
- `task-implement-epic03-issue-card-fields` — card contract и поля.
- `task-implement-epic03-filters-and-query-state` — фильтры/controls.
- `task-add-epic03-create-issue-gpt-entrypoint` — поведение CTA.
- `task-implement-epic03-branding-and-verified-ui` — бренд/VERIFIED детали.
