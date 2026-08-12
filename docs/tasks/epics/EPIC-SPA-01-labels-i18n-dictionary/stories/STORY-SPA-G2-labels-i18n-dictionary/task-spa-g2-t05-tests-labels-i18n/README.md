## Task workspace — `task-spa-g2-t05-tests-labels-i18n`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: Scope §тесты
- **Depends on:** T03, T04 Done

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** javascript-pro  
---

## Task: tests — labels i18n and locale switch

### Цель
Добавить/обновить тесты: localized label display; смена locale обновляет labels (AC #3).

### Почему это важно (риск)
[`IssueCard.test.jsx:36-37`](../../../../../../../../src/components/IssueCard/__tests__/IssueCard.test.jsx) закрепляет UPPERCASE — регрессия после T04.

### Факты из кода (Code Facts / SSOT)
1. [`IssueCard.test.jsx`](../../../../../../../../src/components/IssueCard/__tests__/IssueCard.test.jsx) — expects `BUREAUCRACY`, `INFRASTRUCTURE`.
2. LabelsFilter tests — **отсутствуют**.
3. [`I18nProvider.jsx`](../../../../../../../../src/i18n/I18nProvider.jsx) — locale state drives `t()`.

### Gap / Проблема
Нет coverage на localized labels и locale switch для label chips.

### AC/DoD
- [x] (P0) Story AC #2: IssueCard tests expect localized strings (not UPPERCASE slug).
- [x] (P0) Story AC #3: test proves locale change updates label display (I18nProvider + component).
- [x] (P1) LabelsFilter.test.jsx — option text uses `t`.
- [x] (P0) `npm run test:run` — green.

### Где менять код
- [`src/components/IssueCard/__tests__/IssueCard.test.jsx`](../../../../../../../../src/components/IssueCard/__tests__/IssueCard.test.jsx)
- Новый: [`src/components/Filters/__tests__/LabelsFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/LabelsFilter.test.jsx)
- Опционально: [`src/i18n/__tests__/`](../../../../../../../../src/i18n/__tests__/) labels resolution

### Out of scope
- E2E puppeteer
- Gateway integration tests

### Проверка
```bash
cd spa-app
npm run test:run
```
