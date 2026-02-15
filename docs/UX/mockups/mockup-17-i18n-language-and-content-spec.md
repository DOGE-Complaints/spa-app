# Mockup 17 Spec — I18n Language & Content Behavior Sheet

**Source type:** UX behavior and data-contract sheet (non-visual)  
**Version:** v1.0  
**Status:** active SSOT for multilingual behavior  
**Related docs:** `docs/i18n-architecture.md`, `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Scope

- UI localization: `et`, `ru`, `en`.
- Content localization in issue fields (`title`, `description`).
- Language fallback and runtime rendering behavior.

---

## 2) Language policy

- Supported locales: `et`, `ru`, `en`.
- Browser fallback chain: `et -> ru -> en`.
- Default fallback for unsupported browsers: `et`.
- Manual override allowed and persisted in `localStorage`.

---

## 3) UI localization coverage

Mandatory localized areas:
- header/sidebar;
- filters and actions;
- status labels;
- empty/error/not-found states;
- details metadata labels.

---

## 4) Content localization contract

Issue content fields are multilingual objects:
- `title.{et|ru|en}`
- `description.{et|ru|en}`

Rendering rule:
- select current UI language;
- fallback per field: `et -> ru -> en`.

No runtime translation services are used.

---

## 5) Labels and status

- `status` is enum; translated in UI layer.
- Canonical status enum set: `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED`.
- UI rule: `IN_REVIEW` (enum) maps to display label `IN REVIEW` in English locale.
- `labels` are canonical keys in model and translated by UI dictionary.

---

## 6) UX behavior

- Language switch re-renders screen instantly.
- Hash route stays unchanged.
- No page reload.
- No mixed-language rendering inside one issue field.
- Selector размещается в header right zone (visual/open states в `M20`).

---

## 7) Layout safeguards

- Title/preview truncation must hold for `et/ru/en`.
- Long strings must not break card/details layout.
- Selector uses compact `ET / RU / EN` without flags.

---

## 8) Трассировка в задачи EPIC-03

- `task-implement-epic03-i18n-foundation-and-switcher` (new).
- `task-implement-epic03-issue-card-fields`.
- `task-implement-epic03-issue-details-route`.
- `task-implement-epic03-issue-service-integration`.
