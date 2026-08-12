## Task workspace — `task-spa-l10n-03-t04-translation-marker-helpers-and-ui-component`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Depends on:** T01, T02, T03

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000005`  
**Skill declared:** react-expert  
---

## Task: implement — translation marker helpers and presentational UI component

### Цель
Реализовать decision helpers и спокойный presentational UI для трёх типов маркеров: MT (по `original_locale`), content fallback (по T02 meta), label humanize (по T03 meta); добавить i18n strings в словари.

### Почему это важно (риск)
Без централизованной логики MT/fallback/humanize маркеры размазаны по IssueCard/IssuePage с риском расхождения с bridge §7 (пустой `original_locale` → MT не показываем).

### Факты из кода (Code Facts / SSOT)
1. Backlog D4/D10 — видимые спокойные пометки, не «ошибочные».
2. Bridge §7 — `original_locale` отсутствует/пуст → MT-маркер **не** показываем.
3. [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — UI strings et/ru/en.
4. Нет существующего marker component в `src/components/`.

### Gap / Проблема
Нет helpers `shouldShowMtMarker` и shared UI для маркеров перевода/языка.

### AC/DoD
- [x] (P0) Story AC #1: locale ∉ `original_locale` → MT marker; ∈ list → без MT marker.
- [x] (P0) Story AC #2: нет/пустой `original_locale` → MT marker false.
- [x] (P0) Story AC #3 (часть): helper для fallback marker на основе resolved locale meta.
- [x] (P0) Story AC #4 (часть): helper для untranslated label marker.
- [x] (P0) Story AC #5: marker styling calm, not error-like; minimal CSS.
- [x] (P1) i18n keys в `dictionaries.js` для MT / fallback / untranslated label (et, ru, en).

### Где менять код
- Новый helper module (напр. `src/i18n/translationMarkers.js` или `src/components/TranslationMarker/`)
- [`src/i18n/dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js)
- Minimal CSS рядом с component

### Out of scope
- IssueCard/IssuePage integration (T05)
- Comprehensive test suite (T06)

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/translationMarkers.test.js
# или smoke после добавления тестов в T06
```
