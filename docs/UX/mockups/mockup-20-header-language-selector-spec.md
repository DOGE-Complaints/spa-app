# Mockup 20 Spec — Header Language Selector (Open State)

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-header-lang.png`  
**Version:** v1.0  
**Status:** active SSOT for language selector visual behavior  
**Related docs:** `docs/i18n-architecture.md`, `docs/UX/mockups/mockup-19-header-brand-strip-spec.md`

---

## 1) Что фиксирует мокап

Компонент language selector в header:
- trigger (`ET` + chevron);
- раскрытый dropdown (`ET Eesti`, `RU Русский`, `EN English`).

---

## 2) Состояния и поведение

- `default`: отображается текущий код языка (`ET`/`RU`/`EN`) + chevron.
- `open`: dropdown со списком языков.
- `selected`: активный язык подсвечен.
- Выбор языка:
  - мгновенно меняет UI locale;
  - не меняет hash route;
  - не вызывает full page reload.

---

## 3) Визуальные правила

- Compact dark dropdown.
- Список в порядке: `ET`, `RU`, `EN`.
- С флагами в trigger и dropdown (`/assets/ET.svg`, `RU.svg`, `US.svg` для EN) — фактический MVP.
- Без анимаций.

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G6 закрыт документально.
- Контраст достаточен для readability.

---

## 4) Контракт сохранения

- Выбранный locale сохраняется в `localStorage`.
- Cookies и analytics не используются.

---

## 5) Что НЕ фиксируется

- Keyboard navigation matrix (может быть уточнена отдельно).
- Accessibility-атрибуты (`aria-*`) как подробный контракт.
- Post-MVP локали.

---

## 6) Трассировка в задачи EPIC-03

- `task-implement-epic03-i18n-foundation-and-switcher`
- `task-implement-epic03-branding-and-verified-ui`
