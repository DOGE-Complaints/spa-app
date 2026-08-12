## Task workspace — `task-spa-search-04-t09-date-input-document-lang-sync`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md`](../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md) §3 F4
- **Depends on:** SPA-SEARCH-04-T03 Done
- **activation:** `run_mode=spa_search_04_audit_2026_06_18`

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_search_04_audit_2026_06_18` (post-audit; **не** pkg-000011)  
**Skill declared:** react-expert  
**ui_scope:** none  
**ui_complexity:** trivial  
---

## Task: fix — sync document `lang` with active UI locale for native date inputs

### Цель
Синхронизировать `document.documentElement.lang` (и при необходимости `lang` на date-инпутах) с активной UI-локалью из `useI18n`, чтобы нативный `<input type="date">` в [`DateRangeFilter.jsx`](../../../../../../../../src/components/Filters/DateRangeFilter.jsx) показывал формат и подписи календаря на языке интерфейса (et/ru/en).

### Почему это важно (риск)
При русском UI лейблы `С`/`По`/`Дата создания` переведены через `t()`, но placeholder `dd.mm.yyyy` и popup-календарь (`June 2026`, `Clear`/`Today`) остаются на EN — контрактное нарушение UI-локали vs нативного контрола; видно в рантайме на тёмной панели фильтров.

### Факты из кода (Code Facts / SSOT)
1. Статический `lang` документа — [`index.html:2`](../../../../../../../../index.html#L2): `<html lang="en">`.
2. `I18nProvider` хранит `locale`, но не обновляет DOM — [`I18nProvider.jsx:43-86`](../../../../../../../../src/i18n/I18nProvider.jsx); `grep lang= src/` → пусто.
3. Date inputs без `lang` — [`DateRangeFilter.jsx:27-42`](../../../../../../../../src/components/Filters/DateRangeFilter.jsx) `type="date"`.
4. Наши лейблы локализованы — ключи `filterDateCreated` / `filterDateFrom` / `filterDateTo` в [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js).
5. Audit F4 — [audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md](../../../../../../analysis/audit-STORY-SPA-SEARCH-04-execution-2026-06-18.md) §3 F4.

### Gap / Проблема
Post-audit: UI-локаль (`locale` из `useI18n`) не пробрасывается на `<html lang>` и date-инпуты; нативный date-контрол всегда следует `lang="en"`.

### AC/DoD
- [x] (P0) При смене `locale` (et/ru/en) `document.documentElement.lang` обновляется на канонический код локали (через `useEffect` в [`I18nProvider.jsx`](../../../../../../../../src/i18n/I18nProvider.jsx) или эквивалент).
- [x] (P0) Date inputs в `DateRangeFilter` наследуют корректную локаль (через document `lang` и/или явный `lang={locale}` prop).
- [x] (P0) Unit-тест: рендер с `locale=ru` → `document.documentElement.lang === 'ru'` (или ожидаемый normalized code из [`core.js`](../../../../../../../../src/i18n/core.js)).
- [x] (P1) `npx vitest run` — green; без регрессии существующих i18n-тестов.
- [x] (P1) Ручная проверка: при `locale=ru` подписи нативного календаря не на EN (Chromium).

### Где менять код
- [`src/i18n/I18nProvider.jsx`](../../../../../../../../src/i18n/I18nProvider.jsx) — `useEffect` sync `document.documentElement.lang`
- [`src/components/Filters/DateRangeFilter.jsx`](../../../../../../../../src/components/Filters/DateRangeFilter.jsx) — опционально `lang` prop на inputs
- Новый/расширенный тест: `src/i18n/__tests__/I18nProvider.langSync.test.jsx` или расширение [`DateRangeFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/DateRangeFilter.test.jsx)

### Out of scope
- F5/F6 (picker icon, color-scheme) — T10/T11
- Замена `type=date` на кастомный календарь
- Смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml) / новый pkg

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/ src/components/Filters/__tests__/DateRangeFilter.test.jsx
npx vitest run
```
