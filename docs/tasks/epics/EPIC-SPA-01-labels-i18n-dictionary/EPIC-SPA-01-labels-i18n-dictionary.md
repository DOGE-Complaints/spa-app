# EPIC-SPA-01 — Labels i18n dictionary

> **ID:** `EPIC-SPA-01` · **Статус:** Done (pkg-000002, 2026-06-12)
> **Layer:** spa-app dashboard UI — localized label display (`labels.*` in UI dictionary)
> **Зависит от:** —
> **Блокирует:** закрытие doc-gap G2; читаемые метки на board/filter/card/details

---

## 1. Назначение

Реализовать словарь переводов civic label keys (`bureaucracy`, `healthcare`, …) в `UI_DICTIONARY` и подключить отображение через `t('labels.' + key)` вместо UPPERCASE slug в UI.

Парадигма-якорь: [i18n-architecture.md](../../../i18n-architecture.md) §7.2; gateway [API_REFERENCE §intake](../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) (`canonical_labels` free-form — отдельная политика в T00).

---

## 2. Pipeline stories (nested)

| Story | Source | Status | Pkg |
|-------|--------|--------|-----|
| [STORY-SPA-G2-labels-i18n-dictionary](./stories/STORY-SPA-G2-labels-i18n-dictionary/STORY-SPA-G2-labels-i18n-dictionary.md) | [backlog STORY-SPA-G2](../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md) | Done (2026-06-12) | pkg-000002 |

---

## 3. Вне scope эпика

- i18n-объекты внутри payload labels на бекенде (story G2 «Вне scope»)
- Identity `identity.*` ключи
- Doc-gap G3–G8 (отдельные P1.3 волны)
