## Task workspace — `task-spa-g2-t03-localize-labels-filter`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: Scope §LabelsFilter.jsx
- **Depends on:** T02 Done

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** javascript-pro  
---

## Task: implement — localized labels in LabelsFilter

### Цель
Заменить отображение сырого key в trigger summary и dropdown на `t('labels.' + key)` с fallback по политике T00 approved taxonomy.

### Почему это важно (риск)
Фильтр labels — primary UX для выбора меток; UPPERCASE slug нарушает i18n. Story AC #2.

### Факты из кода (Code Facts / SSOT)
1. [`LabelsFilter.jsx:17-22`](../../../../../../../../src/components/Filters/LabelsFilter.jsx) — `labels.join(', ')` в trigger.
2. [`LabelsFilter.jsx:66`](../../../../../../../../src/components/Filters/LabelsFilter.jsx) — `{l}` в option button.
3. [`BoardPage.jsx:187`](../../../../../../../../src/pages/BoardPage.jsx) — передаёт `t` в LabelsFilter.

### Gap / Проблема
Filter показывает machine key, не localized label.

### AC/DoD
- [x] (P0) Story AC #2: trigger summary показывает localized labels.
- [x] (P0) Story AC #2: dropdown options — localized text.
- [x] (P1) Search внутри dropdown остаётся по canonical key (lowercase) — вне изменений фильтрации.
- [x] (P1) Fallback для unknown key по §Fallback policy (approved doc).

### Где менять код
- [`src/components/Filters/LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx)

### Out of scope
- IssueCard / IssuePage (T04)
- Новые label keys

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/Filters/
```
