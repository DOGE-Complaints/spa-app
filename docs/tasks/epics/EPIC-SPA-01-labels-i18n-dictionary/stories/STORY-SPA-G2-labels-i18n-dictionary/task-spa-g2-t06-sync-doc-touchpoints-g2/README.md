## Task workspace — `task-spa-g2-t06-sync-doc-touchpoints-g2`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: Documentation touchpoints table

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** javascript-pro  
---

## Task: docs — sync G2 documentation touchpoints

### Цель
Снять пометки gap G2; подтвердить `labels.*` в dictionaries; ссылка на product SSOT `label-taxonomy-G2-approved.md`.

### Почему это важно (риск)
Story AC #4; doc drift вводит в заблуждение при G3+.

### Факты из кода (Code Facts / SSOT)
Touchpoints (G2 open):
1. [`mock-layer-issues-guide.md`](../../../../../../../../mock-layer-issues-guide.md)
2. [`i18n-architecture.md` §7.2](../../../../../../../../i18n-architecture.md)
3. [`mockup-12`](../../../../../../../../UX/mockups/mockup-12-dashboard-filter-labels-spec.md)
4. [`mockup-17`](../../../../../../../../UX/mockups/mockup-17-i18n-language-and-content-spec.md)
5. [`spa-app-doc-code-gap-report.md`](../../../../../../../../analysis/spa-app-doc-code-gap-report.md) §5
6. [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

### Gap / Проблема
Доки помечены G2 open; код после T01–T05 соответствует story.

### AC/DoD
- [x] (P0) Story AC #4: G2 pending notes removed from touchpoint files.
- [x] (P0) i18n-architecture §7.2 — пример `labels.*` + ссылка на approved taxonomy.
- [x] (P0) gap-report §5 G2 → Done; INDEX G2 → Done.

### Где менять код
- Docs listed above (no runtime)

### Out of scope
- G3–G8 touchpoints
- Gateway docs

### Проверка
```bash
rg "gap G2" spa-app/docs/mock-layer-issues-guide.md spa-app/docs/i18n-architecture.md spa-app/docs/UX/mockups/mockup-12* spa-app/docs/UX/mockups/mockup-17*
```
