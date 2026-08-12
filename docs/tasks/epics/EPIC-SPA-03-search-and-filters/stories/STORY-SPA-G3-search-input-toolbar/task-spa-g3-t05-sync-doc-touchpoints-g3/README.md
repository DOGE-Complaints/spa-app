## Task workspace — `task-spa-g3-t05-sync-doc-touchpoints-g3`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: Documentation touchpoints table (pipeline story)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000007`  
**Skill declared:** react-expert  
---

## Task: docs — sync G3 documentation touchpoints

### Цель
Снять пометки gap G3; зафиксировать путь к `SearchInput`; обновить gap-report и INDEX (Story AC #5).

### Почему это важно (риск)
UX-доки с «не выполнено G3» вводят в заблуждение после реализации; AC #5 явно требует touchpoints.

### Факты из кода (Code Facts / SSOT)
Touchpoints (G3 open):
1. [`reusable-ui-components-architecture.md`](../../../../../../../../UX/reusable-ui-components-architecture.md) — gap G3, SearchInput planned.
2. [`ui-mockups-and-states-requirements.md`](../../../../../../../../UX/ui-mockups-and-states-requirements.md) §24.2.
3. [`mockup-01-dashboard-main-spec.md`](../../../../../../../../UX/mockups/mockup-01-dashboard-main-spec.md).
4. [`mockup-15-routing-behavior-sheet-spec.md`](../../../../../../../../UX/mockups/mockup-15-routing-behavior-sheet-spec.md).
5. [`spa-app-doc-code-gap-report.md`](../../../../../../../../analysis/spa-app-doc-code-gap-report.md) §5.
6. [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md).

### Gap / Проблема
Документация помечена G3 open; код после T01–T04 реализует SearchInput.

### AC/DoD
- [x] (P0) Story AC #5: пометки G3 сняты из touchpoint files.
- [x] (P0) `reusable-ui-components-architecture.md` — путь к `src/components/Filters/SearchInput.jsx` (или фактический).
- [x] (P0) gap-report §5 G3 → ✅; backlog INDEX G3 → Done (после T06 gate).

### Где менять код
- Docs listed above (no runtime)

### Out of scope
- SEARCH-01..05 backlog stories
- Spa_builder.plan.md (post-audit only)

### Проверка
```bash
rg "gap G3" spa-app/docs/UX/ spa-app/docs/analysis/spa-app-doc-code-gap-report.md
```
