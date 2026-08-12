## Task workspace — `task-spa-g2-t04-localize-issue-card-and-details`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: Scope §IssueCard.jsx, §IssuePage.jsx
- **Depends on:** T02 Done

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** javascript-pro  
---

## Task: implement — localized label chips on card and details

### Цель
Убрать `toUpperCase()` на label chips; использовать `t('labels.' + key)` + fallback в IssueCard и IssuePage.

### Почему это важно (риск)
Карточки и детали — основное отображение меток пользователю. Story AC #2.

### Факты из кода (Code Facts / SSOT)
1. [`IssueCard.jsx:42`](../../../../../../../../src/components/IssueCard/IssueCard.jsx) — `labelChips = …toUpperCase()`.
2. [`IssueCard.jsx:56-58`](../../../../../../../../src/components/IssueCard/IssueCard.jsx) — render chips.
3. [`IssuePage.jsx:107-109`](../../../../../../../../src/pages/IssuePage.jsx) — `String(l).toUpperCase()`.
4. [`BoardPage.jsx:247-253`](../../../../../../../../src/pages/BoardPage.jsx) — IssueCard без prop `t` (4 call sites).
5. [`IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx) — уже `useI18n().t`.

### Gap / Проблема
Card/details показывают UPPERCASE slug.

### AC/DoD
- [x] (P0) Story AC #2: IssueCard chips — localized, не UPPERCASE key.
- [x] (P0) Story AC #2: IssuePage metadata chips — localized.
- [x] (P0) BoardPage передаёт `t` во все IssueCard instances.
- [x] (P1) `issue.type` UPPERCASE chip без изменений (вне story Scope).

### Где менять код
- [`src/components/IssueCard/IssueCard.jsx`](../../../../../../../../src/components/IssueCard/IssueCard.jsx)
- [`src/pages/IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx)
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — pass `t`

### Out of scope
- LabelsFilter (T03)
- `issue.type` display

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/IssueCard/ src/pages/__tests__/IssuePage
```
