## Task workspace — `task-spa-search-03-t04-search-input-clear-affordance`

- Story: [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) — Scope §SearchInput
- **Depends on:** —
- **ui_scope:** `mixed` · **ui_anchor:** `true` · **ui_complexity:** `standard`
- **extends mockup:** [`ui-mockup-spec.md`](./ui-mockup-spec.md) → mockup-01 delta

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000010`  
**Skill declared:** react-expert  
---

## Task: implement — SearchInput clear affordance

### Цель
Enhance существующий `SearchInput`: placeholder (уже есть) + **кнопка очистки** при непустом value; toolbar placement без переноса в FilterPanel (Story AC #1).

### Почему это важно (риск)
AC требует «очистку»; сейчас только native `type="search"` без явной ×-кнопки в тёмной палитре.

### Факты из кода (Code Facts / SSOT)
1. SearchInput существует: [`SearchInput.jsx`](../../../../../../../../src/components/Filters/SearchInput.jsx) — icon + input, no clear button.
2. Toolbar wire: [`BoardPage.jsx:197-201`](../../../../../../../../src/pages/BoardPage.jsx).
3. Стили: [`.board-search-input-wrap`](../../../../../../../../src/components/Filters/Filters.css).
4. Mockup SSOT toolbar: [mockup-01 §Toolbar](../../../../../../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md).
5. UX brief: [STORY-UX-MOCKUP-BRIEF.md](../STORY-UX-MOCKUP-BRIEF.md) — states default/focused/with-clear/after-clear.

### Gap / Проблема
Нет явной affordance очистки search в UI.

### AC/DoD
- [ ] (P0) Story AC #1: поле поиска в toolbar с placeholder и кнопкой очистки.
- [ ] (P0) Clear visible только при `value.length > 0`; click → `onChange('')`.
- [ ] (P0) `aria-label` на кнопке clear (i18n prop или `t('searchClear')` с fallback).
- [ ] (P1) Стили согласованы с `Filters.css` тёмной палитрой.
- [ ] (P1) **UI Visual Pipeline:** UI-0 baseline → `ui-mockup-spec.md` per [spa-ui-visual-pipeline.md](../../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md); P3 `@mockup:` из UX brief.

### Где менять код
- [`src/components/Filters/SearchInput.jsx`](../../../../../../../../src/components/Filters/SearchInput.jsx)
- [`src/components/Filters/Filters.css`](../../../../../../../../src/components/Filters/Filters.css) — `.board-search-clear` (или аналог)

### Out of scope
- Перенос SearchInput внутрь FilterPanel
- Debounce logic (T03) — только совместимость props

### Проверка
```bash
cd spa-app
npm run test:run -- src/pages/__tests__/BoardPage.search.test.jsx
npm run test:ui:filters
```
