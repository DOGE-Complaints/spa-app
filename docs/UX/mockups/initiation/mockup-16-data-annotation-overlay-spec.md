# Mockup 16 Spec — Data Annotation Overlay (Field Mapping Sheet)

**Source type:** Technical overlay artifact (handoff)  
**Version:** v1.0  
**Status:** active SSOT for field-to-UI mapping  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Назначение артефакта

`Data Annotation Overlay` фиксирует, какое поле доменной модели рендерится в каждом UI-блоке.

Это технический sheet для команды (дизайн + frontend + QA), не пользовательский экран.

---

## 2) Board Screen Overlay (карточка issue)

- `ID` -> `Issue.id`
- `Title` -> `Issue.title`
- `Status badge` -> `Issue.status`
- `Type chip` -> `Issue.type`
- `Labels` -> `Issue.labels[]`
- `Created date` (optional) -> `Issue.created_at?`

### Явные исключения для Board

- `Issue.description` **не рендерится** на board card.
- `Issue.arweave_txid` **не рендерится** на board card.
- `Issue.image_txid` **не рендерится** на board card.
- `Issue.image_hash` **не рендерится** на board card.

---

## 3) Details Screen Overlay

### Header

- `ID` -> `Issue.id`
- `Status` -> `Issue.status`
- `Type` -> `Issue.type`
- `Title` -> `Issue.title`

### Body

- `Description` -> `Issue.description?` (`if present`)

### Metadata

- `Labels` -> `Issue.labels[]`
- `Created` -> `Issue.created_at?`
- `Arweave TXID` -> `Issue.arweave_txid?`
- `Image TXID` -> `Issue.image_txid?`
- `Image Hash` -> `Issue.image_hash?`

---

## 4) Правила optional-полей

- `?` означает `if present`.
- Если optional поле отсутствует, соответствующая строка скрывается.
- Заглушки `N/A`, `null`, `-` не используются.

---

## 5) UX-правила для annotation sheet

- Тонкие линии/стрелки для связей.
- Маленький моноширинный шрифт для подписей полей.
- Светло-серый цвет аннотаций.
- Аннотации не перекрывают читаемость базового UI.

---

## 6) Трассировка в задачи EPIC-03

- `task-implement-epic03-issue-card-fields`
- `task-implement-epic03-issue-details-route`
- `task-implement-epic03-issue-service-integration`
