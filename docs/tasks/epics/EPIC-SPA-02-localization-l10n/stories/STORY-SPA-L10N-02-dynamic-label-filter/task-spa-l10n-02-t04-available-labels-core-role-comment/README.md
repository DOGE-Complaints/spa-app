## Task workspace — `task-spa-l10n-02-t04-available-labels-core-role-comment`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md)
- **Depends on:** — (можно параллельно T01)

---
**Приоритет:** P0  
**Сложность:** XS  
**Статус:** Done  
**Wave:** `pkg-000004`  
**Skill declared:** javascript-pro  
---

## Task: implement — document AVAILABLE_LABELS core role in labelKeys.js

### Цель
Зафиксировать в JSDoc/комментарии новую роль `AVAILABLE_LABELS`: «гарантированно переведённое ядро», не источник фильтра (Story Scope, AC #3 кодовая часть).

### Почему это важно (риск)
Без явной роли разработчики снова подключат `AVAILABLE_LABELS` к фильтру (регрессия GL-2).

### Факты из кода (Code Facts / SSOT)
1. [`labelKeys.js:1`](../../../../../../../../src/i18n/labelKeys.js) — комментарий только про product SSOT taxonomy doc.
2. [`labelDisplay.test.js:33`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js) — completeness guard для `AVAILABLE_LABELS` (роль ядра переводов сохраняется).

### Gap / Проблема
Роль константы в коде не отражает D5/D9.

### AC/DoD
- [x] (P0) Story AC #3 (код): JSDoc на `AVAILABLE_LABELS` описывает «гарантированно переведённое ядро» и явно: не источник фильтра доски.
- [x] (P1) Ссылка на product SSOT [label-taxonomy-G2-approved.md](../../../../../../../../docs/analysis/label-taxonomy-G2-approved.md) сохранена.

### Где менять код
- [`src/i18n/labelKeys.js`](../../../../../../../../src/i18n/labelKeys.js)

### Out of scope
- i18n-architecture.md (T06)
- Изменение состава 10 ключей

### Проверка
```bash
head -20 spa-app/src/i18n/labelKeys.js
```
