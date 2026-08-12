## Task workspace — `task-spa-g2-t02-add-labels-dictionary-section`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: Scope §dictionaries.js; [`label-taxonomy-G2-approved.md`](../../../../../../../../analysis/label-taxonomy-G2-approved.md)
- **Depends on:** T00 Done, T01 Done

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** javascript-pro  
---

## Task: implement — `labels.*` section in UI_DICTIONARY

### Цель
Добавить nested `labels: { key: '…' }` для `et`, `ru`, `en` в [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) по утверждённой таблице T00.

### Почему это важно (риск)
Без словаря `t('labels.'+key)` возвращает key path; UI остаётся на UPPERCASE slug. Story AC #1.

### Факты из кода (Code Facts / SSOT)
1. [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — `issueType`, `status` nested; `labels` отсутствует.
2. [`I18nProvider.jsx:49-65`](../../../../../../../../src/i18n/I18nProvider.jsx) — `t('labels.bureaucracy')` будет работать после добавления секции.

### Gap / Проблема
Gap G2: документация обещает `labels.*`, код не содержит секции.

### AC/DoD
- [x] (P0) Story AC #1: каждый key из approved taxonomy → `labels.<key>` в et/ru/en.
- [x] (P0) Ключи в dictionaries совпадают с `labelKeys` module (T01).
- [x] (P1) Структура зеркалит `issueType` / `status` nesting.

### Где менять код
- [`src/i18n/dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — et/ru/en blocks

### Out of scope
- Компоненты (T03–T04)
- Backend payload i18n

### Проверка
```bash
cd spa-app
rg "labels:" src/i18n/dictionaries.js
# manual: key count == approved taxonomy
```
