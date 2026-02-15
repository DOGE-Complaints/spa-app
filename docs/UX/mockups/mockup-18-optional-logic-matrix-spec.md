# Mockup 18 Spec — Optional Logic Matrix (Details + I18n)

**Source type:** Technical behavior matrix sheet (non-visual)  
**Version:** v1.0  
**Status:** active SSOT for conditional rendering and fallback cases  
**Related docs:** `docs/i18n-architecture.md`, `docs/UX/mockups/mockup-14-issue-metadata-variants-spec.md`, `docs/UX/mockups/mockup-17-i18n-language-and-content-spec.md`

---

## 1) Назначение

`Optional Logic Matrix` фиксирует поведение UI в сценариях отсутствующих optional полей и отсутствующих locale-значений.

Цель: убрать двусмысленность при реализации/тестировании `Issue details` и i18n content resolver.

---

## 2) Матрица optional metadata (Details)

Общие правила:
- Optional поля рендерятся только `if present`.
- Отсутствующие строки скрываются без заглушек (`N/A`, `-`, `null`).
- Порядок metadata стабилен: `labels -> created -> arweave txid -> image txid -> image hash`.

Сценарии:

1. **Full metadata**
   - есть: `labels`, `created_at`, `arweave_txid`, `image_txid`, `image_hash`
   - результат: показываются все строки

2. **Partial metadata**
   - есть: `labels`, `created_at`, `arweave_txid`
   - нет: `image_txid`, `image_hash`
   - результат: показываются только существующие строки

3. **Minimal metadata**
   - есть: `labels`
   - нет: `created_at`, `arweave_txid`, `image_txid`, `image_hash`
   - результат: metadata блок содержит только labels

---

## 3) Матрица optional content (I18n)

### 3.1 Для `title`

- Если `title[currentLocale]` есть -> используем его.
- Иначе fallback: `title.et` -> `title.ru` -> `title.en`.
- Если `title` строка (legacy/transitional) -> используем как есть.

### 3.2 Для `description`

- Если `description` отсутствует -> body не рендерится.
- Если `description[currentLocale]` есть -> используем его.
- Иначе fallback: `description.et` -> `description.ru` -> `description.en`.
- Если `description` строка (legacy/transitional) -> используем как есть.

---

## 4) Анти-правила (что запрещено)

- Нельзя смешивать языки внутри одного поля (`title` или `description`).
- Нельзя показывать технические placeholders для missing optional.
- Нельзя запускать runtime AI-перевод при отсутствии locale.

---

## 5) Минимальный QA checklist

- [ ] Details корректно проходит `full/partial/minimal` metadata сценарии.
- [ ] `title` и `description` корректно fallback-ятся по цепочке `et -> ru -> en`.
- [ ] Legacy string-формат не ломает рендер.
- [ ] Locale switch не меняет hash route и не вызывает page reload.

---

## 6) Трассировка в задачи EPIC-03

- `task-implement-epic03-i18n-foundation-and-switcher`
- `task-implement-epic03-issue-details-route`
- `task-implement-epic03-issue-service-integration`
