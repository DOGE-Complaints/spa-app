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

### 4.1 Translation / language markers (L10N-03)

When content or labels are not in the requested UI language, the UI shows calm inline markers (not error styling):

| Marker | When | Source |
|--------|------|--------|
| Machine translation | UI locale ∉ `issue.original_locale` (field present and non-empty) | `original_locale` from gateway projection |
| Shown in ⟨language⟩ | Field fallback: requested locale empty, another locale used | `resolveLocalizedTextWithMeta` |
| No translation | Label key missing in `labels.*` dictionary (humanize) | `formatLabelKeyWithMeta` |

If `original_locale` is absent or empty → **no MT marker** (legacy issues; soft degradation).

> **Статус реализации (2026-06-16):** L10N-03 Done — [`IssueCard.jsx`](../src/components/IssueCard/IssueCard.jsx), [`IssuePage.jsx`](../src/pages/IssuePage.jsx).

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
- Selector: код языка + флаг (`ET`/`RU`/`EN` + `/assets/ET.svg`, `RU.svg`, `US.svg`) — фактический MVP.

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G6 закрыт документально.

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G2 закрыт — `labels.*` в [`dictionaries.js`](../../../src/i18n/dictionaries.js).

---

## 8) Трассировка в задачи EPIC-03

- `task-implement-epic03-i18n-foundation-and-switcher` (new).
- `task-implement-epic03-issue-card-fields`.
- `task-implement-epic03-issue-details-route`.
- `task-implement-epic03-issue-service-integration`.
