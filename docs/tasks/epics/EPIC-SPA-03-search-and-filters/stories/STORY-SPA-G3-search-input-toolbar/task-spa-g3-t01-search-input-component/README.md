## Task workspace — `task-spa-g3-t01-search-input-component`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md) — Scope §1
- **Depends on:** —

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000007`  
**Skill declared:** react-expert  
---

## Task: implement — SearchInput component (controlled input + icon)

### Цель
Создать переиспользуемый компонент `SearchInput` с иконкой поиска, controlled `value`/`onChange`, `placeholder` и `aria-label` — foundation для тулбара BoardPage (Story AC #1).

### Почему это важно (риск)
Без отдельного компонента поиск остаётся только через ручное редактирование URL; gap G3 не закрывается.

### Факты из кода (Code Facts / SSOT)
1. `SearchInput` отсутствует — grep `SearchInput` в `spa-app/src/**` → 0 файлов.
2. Паттерн фильтров: [`StatusFilter.jsx`](../../../../../../../../src/components/Filters/StatusFilter.jsx) — controlled props, `Filters.css`.
3. Внутренний search в LabelsFilter использует `.board-filter-search` — [`Filters.css:109`](../../../../../../../../src/components/Filters/Filters.css).
4. Mockup toolbar: search input с иконкой — [`mockup-01-dashboard-main-spec.md`](../../../../../../../../UX/mockups/mockup-01-dashboard-main-spec.md) §3.

### Gap / Проблема
Нет UI-компонента для client-side поиска; `?search=` в URL работает без поля ввода.

### AC/DoD
- [x] (P0) Story AC #1: компонент рендерит `<input type="search">` (или `text`) с иконкой и принимает `placeholder`.
- [x] (P0) Controlled: `value` + `onChange` (string); без внутреннего state дублирующего URL.
- [x] (P1) `aria-label` prop или через `t('searchPlaceholder')` с fallback.
- [x] (P1) Стили согласованы с тёмной палитрой `Filters.css` (новый класс, напр. `.board-search-input`).

### Где менять код
- [`src/components/Filters/SearchInput.jsx`](../../../../../../../../src/components/Filters/SearchInput.jsx) (предпочтительно per Scope)
- [`src/components/Filters/Filters.css`](../../../../../../../../src/components/Filters/Filters.css) — стили toolbar search

### Out of scope
- Вставка в BoardPage (T02)
- i18n ключи в dictionaries (T03)
- Debounce / кросс-язычный поиск (SEARCH-03)

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/Filters/ 2>/dev/null || true
# После T02: визуально на /#/board
```
