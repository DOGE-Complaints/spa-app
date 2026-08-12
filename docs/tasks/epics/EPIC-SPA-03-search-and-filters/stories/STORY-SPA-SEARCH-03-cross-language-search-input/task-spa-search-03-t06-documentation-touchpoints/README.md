## Task workspace — `task-spa-search-03-t06-documentation-touchpoints`

- Story: [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) — Documentation touchpoints table
- **Depends on:** T01–T05 (код Done перед doc sync в P3)
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000010`  
**Skill declared:** react-expert  
---

## Task: docs — documentation touchpoints sync

### Цель
Обновить doc touchpoints из pipeline story: §24.2 SearchInput cross-locale, reusable-ui, G3 absorbed, D-S1 closed.

### Почему это важно (риск)
Без doc sync UX/audit треки продолжат считать SearchInput «planned» и D-S1 open.

### Факты из кода (Code Facts / SSOT)
1. Touchpoints table — [`STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md) §Documentation touchpoints.
2. §24.2 **отсутствует** в ui-mockups — grep `24.2` → 0 (нужно создать).
3. G3 backlog — [`STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md).
4. CTO interview D-S1 — [`search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md).

### Gap / Проблема
Документация не отражает кросс-язычный SearchInput + debounce после Done.

### AC/DoD
- [ ] (P0) [ui-mockups-and-states-requirements.md](../../../../../../UX/ui-mockups-and-states-requirements.md) — добавить **§24.2** SearchInput: реализован, кросс-язычный, debounce, clear.
- [ ] (P0) [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) — путь `SearchInput.jsx` + clear affordance.
- [ ] (P0) G3 backlog note — «поглощён SEARCH-03» (часть SearchInput).
- [ ] (P0) CTO interview — D-S1 ✅ в таблице решений.
- [ ] (P1) mockup-01 status line — SearchInput clear states (ссылка на epic-03 mockup после UX).

### Где менять код
- [`spa-app/docs/UX/ui-mockups-and-states-requirements.md`](../../../../../../UX/ui-mockups-and-states-requirements.md)
- [`spa-app/docs/UX/reusable-ui-components-architecture.md`](../../../../../../UX/reusable-ui-components-architecture.md)
- [`spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md)
- [`spa-app/docs/analysis/search-filters-cto-interview-2026-06-15.md`](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)

### Out of scope
- Новые mockup PNG (UX-диалог)
- Epic/story gate status (T07)

### Проверка
```bash
rg "24\.2|SearchInput|D-S1" spa-app/docs/UX/ui-mockups-and-states-requirements.md spa-app/docs/analysis/search-filters-cto-interview-2026-06-15.md
```
