## Task workspace — `task-spa-search-02-t02-use-board-filter-draft`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: D-S4, D-S6 — [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Depends on:** T01 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: implement — `useBoardFilterDraft` hook (pending vs applied)

### Цель
React-hook: `applied` из URL (`parseBoardQuery`), локальный `pending`, `syncPendingFromApplied` при открытии панели, `isDirty`, `apply()`, `reset()`, `removeChip(field, value)` (chip remove → immediate apply).

### Почему это важно (риск)
Без централизованного draft-состояния batch-применение (D-S4) и chip-remove (AC#3) будут дублировать логику в BoardPage.

### Факты из кода (Code Facts / SSOT)
1. Сейчас каждый onChange → `applyFilters` → navigate: [`BoardPage.jsx:98-101,183-196`](../../../../../../../../src/pages/BoardPage.jsx).
2. Reset очищает search: [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) `hasActiveFilters` + reset handler.
3. `serializeBoardQuery` / `parseBoardQuery` — SSOT roundtrip: [`boardQuery.js`](../../../../../../../../src/router/boardQuery.js).

### Gap / Проблема
Нет pending/applied разделения; URL обновляется на каждый toggle.

### AC/DoD
- [ ] (P0) Hook `useBoardFilterDraft({ locationSearch, navigate })` экспортирован из `src/hooks/` или `src/components/Filters/`.
- [ ] (P0) `apply()` вызывает `navigate` с `serializeBoardQuery(pending)`; до apply URL не меняется.
- [ ] (P0) `reset()` → `{ status: [], type: '', labels: [], search: '' }` applied + pending sync.
- [ ] (P0) `removeChip` обновляет applied немедленно и синхронизирует pending.
- [ ] (P0) `isDirty` сравнивает server fields (status, type, labels) между pending и applied.
- [ ] (P1) Unit-тест hook (можно делегировать T11).

### Где менять код
- Новый: `src/hooks/useBoardFilterDraft.js` (+ tests в T11)
- Использует T01: `boardFilterState.js` helpers

### Out of scope
- FilterPanel UI (T03)
- Chip rendering (T08)

### Проверка
```bash
cd spa-app
npm run test:run -- src/hooks/__tests__/useBoardFilterDraft.test.js
```
