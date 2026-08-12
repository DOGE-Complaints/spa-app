## Task workspace — `task-spa-search-04-t10-date-picker-indicator-contrast`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md`](../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md) §3 F5
- **Depends on:** SPA-SEARCH-04-T03 Done
- **activation:** `run_mode=spa_search_04_audit_2026_06_18`

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_search_04_audit_2026_06_18` (post-audit; **не** pkg-000011)  
**Skill declared:** react-expert  
**ui_scope:** mixed  
**ui_complexity:** low  
---

## Task: fix — visible calendar-picker indicator on dark filter panel

### Цель
Стилизовать индикатор вызова календаря (`::-webkit-calendar-picker-indicator` и при необходимости Firefox-аналог) для `.board-filter-date-input`, чтобы иконка была видима на тёмном фоне панели и имела `cursor: pointer`.

### Почему это важно (риск)
Невидимый интерактивный элемент на тёмном фоне — дефект контраста и доступности; пользователь не видит affordance открытия календаря (подтверждено скриншотами аудита).

### Факты из кода (Code Facts / SSOT)
1. Date input стили — [`.board-filter-date-input`](../../../../../../../../src/components/Filters/Filters.css) (стр. 312–319): тёмный фон `rgba(0,0,0,0.2)`, светлый текст `#ececf0`.
2. Нет правил для picker indicator — `grep calendar-picker` / `color-scheme` по `spa-app/src` → пусто.
3. Webkit рисует тёмную иконку по умолчанию → сливается с фоном.
4. Компонент — [`DateRangeFilter.jsx:27-42`](../../../../../../../../src/components/Filters/DateRangeFilter.jsx) `className="board-filter-date-input"`.
5. Audit F5 — [audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md](../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md) §3 F5.

### Gap / Проблема
Post-audit: calendar-picker indicator чёрный/невидим на тёмном фоне; курсор не `pointer` на индикаторе.

### AC/DoD
- [x] (P0) `.board-filter-date-input::-webkit-calendar-picker-indicator` — видимый контраст (напр. `filter: invert(1)` или явная светлая иконка).
- [x] (P0) `cursor: pointer` на индикаторе (или на input при hover зоны иконки).
- [x] (P1) Firefox: `::-moz-calendar-picker-indicator` или документированный waiver если недоступно в target browsers.
- [x] (P1) `npm run test:ui:filters` — PASS (smoke не регрессит).
- [x] (P1) UI-3: визуальная проверка контраста иконки на тёмной панели фильтров.

### Где менять код
- [`src/components/Filters/Filters.css`](../../../../../../../../src/components/Filters/Filters.css) — правила для `.board-filter-date-input::-webkit-calendar-picker-indicator` (+ optional `-moz-`)

### Out of scope
- F4 document `lang` sync — T09
- F6 `color-scheme: dark` popup — T11 (следующий таск)
- Кастомный календарь-компонент

### Проверка
```bash
cd spa-app
npm run test:ui:filters
npx vitest run
```
