## Task workspace — `task-spa-g3-t03-search-placeholder-i18n`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: Scope §5 — i18n placeholder через `dictionaries.js`
- **Depends on:** —

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000007`  
**Skill declared:** react-expert  
---

## Task: implement — search placeholder i18n keys (et/ru/en)

### Цель
Добавить ключ placeholder для поля поиска в `dictionaries.js` для всех трёх локалей; использовать в `SearchInput` через `t()` (Story AC #1).

### Почему это важно (риск)
Хардкод placeholder нарушает i18n-политику spa-app; AC требует локализованный placeholder.

### Факты из кода (Code Facts / SSOT)
1. Существующие filter keys — [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js): `filterStatus`, `resetFilters`, `filterAny` (et/ru/en).
2. Ключа `searchPlaceholder` (или аналога) нет — grep `search` в dictionaries → только `issuePlaceholder`.
3. BoardPage передаёт `t` в фильтры — [`BoardPage.jsx:176`](../../../../../../../../src/pages/BoardPage.jsx) (`StatusFilter`).

### Gap / Проблема
Нет словарной строки для placeholder SearchInput.

### AC/DoD
- [x] (P0) Story AC #1: placeholder локализован для `et`, `ru`, `en`.
- [x] (P0) Ключ единый (напр. `searchPlaceholder`) во всех трёх секциях `dictionaries.js`.
- [x] (P1) BoardPage/T02 передаёт `t('searchPlaceholder')` в `SearchInput`.

### Где менять код
- [`src/i18n/dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — et/ru/en blocks

### Out of scope
- Перевод title/description поиска
- SEARCH-03 cross-language search semantics

### Проверка
```bash
cd spa-app
rg "searchPlaceholder" src/i18n/dictionaries.js
# Переключить locale на /#/board — placeholder меняется
```
