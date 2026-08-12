## Task workspace — `task-spa-g2-t01-extract-label-keys-ssot`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md`](../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md); [`label-taxonomy-G2-approved.md`](../../../../../../../../analysis/label-taxonomy-G2-approved.md) (T00)
- **Depends on:** T00 Done

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** javascript-pro  
---

## Task: refactor — extract label keys SSOT module

### Цель
Вынести whitelist label keys из inline `AVAILABLE_LABELS` в общий модуль; список ключей — строго из `label-taxonomy-G2-approved.md` (T00).

### Почему это важно (риск)
Дублирование ключей в BoardPage и docs ведёт к drift (G5). Story AC #1 требует единый набор для `dictionaries.js` и фильтра.

### Факты из кода (Code Facts / SSOT)
1. [`BoardPage.jsx:17`](../../../../../../../../src/pages/BoardPage.jsx) — inline `AVAILABLE_LABELS` (10 keys).
2. [`i18n-architecture.md` §7.2](../../../../../../../../i18n-architecture.md) — SSOT заявлен как `AVAILABLE_LABELS`.
3. [`boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js) — `road_safety` drift.

### Gap / Проблема
Нет shared `labelKeys` module; ключи только в BoardPage.

### AC/DoD
- [x] (P0) Story AC #1 prep: `AVAILABLE_LABELS` / `LABEL_KEYS` экспортирован из shared module.
- [x] (P0) `BoardPage.jsx` импортирует keys из модуля (inline массив удалён).
- [x] (P1) Тестовый drift нормализован, если решение Q5 в approved taxonomy = normalize tests.

### Где менять код
- Новый: [`src/i18n/labelKeys.js`](../../../../../../../../src/i18n/labelKeys.js) (или согласованное имя)
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)
- При Q5=normalize: [`boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js), [`InMemoryIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/InMemoryIssueRepository.test.js)

### Out of scope
- `dictionaries.js` labels section (T02)
- UI localization (T03–T04)

### Проверка
```bash
cd spa-app
rg "AVAILABLE_LABELS" src/pages/BoardPage.jsx  # should import, not define inline
npm run test:run
```
