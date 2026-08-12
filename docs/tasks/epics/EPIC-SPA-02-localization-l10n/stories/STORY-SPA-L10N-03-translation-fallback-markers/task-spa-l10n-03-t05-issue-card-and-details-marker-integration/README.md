## Task workspace — `task-spa-l10n-03-t05-issue-card-and-details-marker-integration`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Depends on:** T01–T04

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000005`  
**Skill declared:** react-expert  
---

## Task: implement — IssueCard and IssuePage marker integration

### Цель
Отрисовать MT-маркер (по `original_locale`), fallback-маркер контента и humanize-маркер меток в карточке доски и на странице деталей без поломки layout.

### Почему это важно (риск)
Пользователь видит контент на доске и в деталях — оба surface должны показывать честные пометки (Story Scope).

### Факты из кода (Code Facts / SSOT)
1. [`IssueCard.jsx:42`](../../../../../../../../src/components/IssueCard/IssueCard.jsx) — `resolveLocalizedText(issue.summary ?? issue.title)` без маркера.
2. [`IssueCard.jsx:45-48`](../../../../../../../../src/components/IssueCard/IssueCard.jsx) — label chips via `formatLabelKey`.
3. [`IssuePage.jsx:91-105`](../../../../../../../../src/pages/IssuePage.jsx) — title, description, labels без маркеров.
4. [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — передаёт `resolveLocalizedText` и `t` в IssueCard.

### Gap / Проблема
Runtime UI не отображает ни один из трёх типов маркеров.

### AC/DoD
- [x] (P0) Story AC #1–#2: MT marker в card/details по `original_locale` + мягкая деградация.
- [x] (P0) Story AC #3: fallback marker рядом с контентом при locale mismatch.
- [x] (P0) Story AC #4: humanize label marker на chip в card/details.
- [x] (P0) Story AC #5: layout карточки/деталей не ломается.

### Где менять код
- [`src/components/IssueCard/IssueCard.jsx`](../../../../../../../../src/components/IssueCard/IssueCard.jsx)
- [`src/components/IssueCard/IssueCard.css`](../../../../../../../../src/components/IssueCard/IssueCard.css) (при необходимости)
- [`src/pages/IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx)
- [`src/pages/IssuePage.css`](../../../../../../../../src/pages/IssuePage.css) (при необходимости)

### Out of scope
- LabelsFilter marker (optional; focus card + details per Scope)
- Doc touchpoints (T07)

### Проверка
```bash
cd spa-app
npx vitest run src/components/IssueCard/__tests__/IssueCard.test.jsx
npx vitest run
```
