# Mockup 14 Spec — Issue Details Metadata Variants

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Issue-metadata.png`  
**Version:** v1.0  
**Status:** active SSOT for metadata conditional rendering  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Вариативный metadata-block на details-экране `/#/issue/:id`:
- рендерит технические поля только если они присутствуют в `Issue`;
- скрывает отсутствующие поля без визуальных артефактов.

---

## 2) Варианты (A/B/C)

### Variant A — Full metadata

Показываются:
- `labels` (chip list),
- `created_at`,
- `arweave_txid`,
- `image_txid`,
- `image_hash` (допускается secondary/collapsed строка).

### Variant B — Partial metadata

Показываются:
- `labels`,
- `created_at`,
- `arweave_txid`.

Не показываются:
- `image_txid`,
- `image_hash`.

### Variant C — Minimal metadata

Показываются:
- только `labels`.

Не показываются:
- `created_at`,
- `arweave_txid`,
- `image_txid`,
- `image_hash`.

---

## 3) UX-правила conditional rendering

- Отсутствующие optional-поля не заменяются плейсхолдерами вида `N/A`, `-`, `null`.
- Порядок полей стабилен: `labels` -> `created` -> `arweave txid` -> `image txid` -> `image hash`.
- `labels` остаются первым и опорным блоком metadata.
- Длинные txid могут обрезаться визуально, но без потери структуры строки.
- `image_hash` визуально вторичен (secondary строка), чтобы не перегружать блок.

---

## 4) Визуальные ориентиры

- Холст: `1536x1024`.
- Metadata-block использует ту же dark-палитру, что и details main.
- Контраст достаточно высокий для технических строк на темном фоне.

---

## 5) Связь с M09

- `M09` задает общий layout details-экрана.
- `M14` уточняет только metadata-часть через матрицу optional-полей.
- В runtime приоритет: `M09` (структура) + `M14` (условный рендер данных).

---

## 6) Что НЕ фиксируется этим мокапом

- Форматирование/валидация значений metadata на уровне backend.
- Кликабельность внешних ссылок txid.
- Details loading/not-found/load-error состояния.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-issue-details-route` (основной scope metadata variants).
- `task-implement-epic03-issue-service-integration` (корректная передача optional полей в UI).
