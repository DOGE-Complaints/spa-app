## Task workspace — `task-spa-l10n-01-t03-dedupe-language-selector-pages`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md)
- **Depends on:** T01 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000003`  
**Skill declared:** react-expert  
---

## Task: refactor — dedupe language selector on Board and Issue pages

### Цель
Удалить дублирующийся `LANGUAGE_OPTIONS` из BoardPage и IssuePage; языковой селектор читает из реестра (Story AC #3).

### Почему это важно (риск)
Два идентичных массива в страницах — классический drift при добавлении 4-го языка.

### Факты из кода (Code Facts / SSOT)
1. [`BoardPage.jsx:28-31`](../../../../../../../../src/pages/BoardPage.jsx) — inline `LANGUAGE_OPTIONS`.
2. [`IssuePage.jsx:8-11`](../../../../../../../../src/pages/IssuePage.jsx) — тот же дубль.
3. T01: `LOCALE_SELECTOR_OPTIONS` (или эквивалент) из реестра — контракт `value` / label / `flagSrc`.

### Gap / Проблема
Селектор не использует SSOT реестр.

### AC/DoD
- [x] (P0) Story AC #3: селектор Board + Issue импортирует опции из реестра.
- [x] (P0) `grep LANGUAGE_OPTIONS src/pages/` → 0.
- [x] (P1) Story AC #2 (selector slice): нет хардкода et/ru/en в page selector logic.

### Где менять код
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)
- [`src/pages/IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx)

### Out of scope
- App-shell refactor (G8)
- core.js resolution (T02)

### Проверка
```bash
cd spa-app
rg LANGUAGE_OPTIONS src/pages/
npm run test:run
```
