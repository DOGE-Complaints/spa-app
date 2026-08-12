## Task workspace — `task-spa-search-04-t11-date-popup-color-scheme-dark`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md`](../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md) §3 F6
- **Depends on:** SPA-SEARCH-04-T10 Done
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

## Task: fix — dark native date popup via `color-scheme: dark` (box path)

### Цель
Добавить `color-scheme: dark` на date-инпуты (или контейнер `.board-filter-date-range-panel`), чтобы браузер отрисовывал **тёмный** вариант нативного popup календаря вместо светлого «вырви глаз» на тёмной панели фильтров.

### Почему это важно (риск)
Светлый системный popup на тёмной панели — UX-несоответствие теме; подтверждено скриншотами аудита. Оператор выбрал **минимальный box-path** (`color-scheme: dark`), без кастомного календаря.

### Факты из кода (Code Facts / SSOT)
1. Нативный popup не стилизуется полностью через CSS — ограничение платформы; audit §3 F6.
2. `color-scheme` отсутствует — `grep color-scheme spa-app/src` → пусто.
3. Date inputs — [`DateRangeFilter.jsx`](../../../../../../../../src/components/Filters/DateRangeFilter.jsx); стили — [`.board-filter-date-input`](../../../../../../../../src/components/Filters/Filters.css).
4. T10 добавляет picker-indicator стили в тот же CSS-файл — порядок T10 → T11.
5. Audit F6 — [audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md](../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md) §3 F6.

### Gap / Проблема
Post-audit: нативный календарь-popup в светлой теме на тёмной панели; нет `color-scheme: dark`.

### AC/DoD
- [x] (P0) `color-scheme: dark` на `.board-filter-date-input` (или `.board-filter-date-range-panel` / `.board-filter-date-range-panel .board-filter-date-input`).
- [x] (P0) Popup календаря в тёмной палитре браузера (Chromium manual check).
- [x] (P1) В task README / acceptance note: полная кастомизация шрифтов/скруглений нативного popup **невозможна** — out of scope; кастомный календарь = future.
- [x] (P1) `npm run test:ui:filters` — PASS.
- [x] (P1) `npx vitest run` — green.

### Где менять код
- [`src/components/Filters/Filters.css`](../../../../../../../../src/components/Filters/Filters.css) — `color-scheme: dark` на date input / panel container

### Out of scope
- Замена `type=date` на кастомный календарь / UI-библиотеку (продуктовое решение вне этой волны)
- F4 lang sync — T09
- F5 picker indicator — T10 (prerequisite)
- Новый pkg / смена active pointer

### Проверка
```bash
cd spa-app
npm run test:ui:filters
npx vitest run
```
