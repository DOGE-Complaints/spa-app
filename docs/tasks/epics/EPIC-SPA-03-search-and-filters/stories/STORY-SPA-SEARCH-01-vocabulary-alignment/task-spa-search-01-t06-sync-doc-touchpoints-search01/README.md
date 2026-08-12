## Task workspace — `task-spa-search-01-t06-sync-doc-touchpoints-search01`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: backlog §Documentation touchpoints + §Координация
- **Depends on:** SPA-SEARCH-01-T01..T05

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000008`  
**Skill declared:** react-expert  
---

## Task: docs — sync SEARCH-01 documentation touchpoints

### Цель
Закрыть doc-gap по словарному блокёру: gap-report §5, i18n-architecture, CTO interview D-S5.

### Почему это важно (риск)
Без doc sync операторы продолжат ссылаться на SPA-набор labels и open D-S5.

### Факты из кода (Code Facts / SSOT)
1. Touchpoints table — pipeline story §Documentation touchpoints.
2. Gap report — [`spa-app-doc-code-gap-report.md`](../../../../../../../../analysis/spa-app-doc-code-gap-report.md) §G3 §5 (блокёр словарей).
3. i18n arch — [`i18n-architecture.md`](../../../../../../../../i18n-architecture.md) label keys = SPA-набор.
4. D-S5 — [`search-filters-cto-interview-2026-06-15.md`](../../../../../../../../analysis/search-filters-cto-interview-2026-06-15.md).

### Gap / Проблема
Story Documentation touchpoints — все три файла pending.

### AC/DoD
- [ ] (P0) gap-report: блокёр словарей → closed; словари = gateway-канон.
- [ ] (P0) i18n-architecture: label keys = gateway governed-набор.
- [ ] (P0) CTO interview: D-S5 ✅.
- [ ] (P0) Артефакт `acceptance-verification-spa-search-01-t06.md` в этой task-папке.

### Где менять код
- [`spa-app/docs/analysis/spa-app-doc-code-gap-report.md`](../../../../../../../../analysis/spa-app-doc-code-gap-report.md)
- [`spa-app/docs/i18n-architecture.md`](../../../../../../../../i18n-architecture.md)
- [`spa-app/docs/analysis/search-filters-cto-interview-2026-06-15.md`](../../../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)

### Out of scope
- G3 contract §8 checklist (G3 Done)
- Backend API_REFERENCE §7 (вне scope story)

### Проверка
```bash
rg "блокёр словарей|D-S5 open" spa-app/docs/analysis spa-app/docs/i18n-architecture.md
```
