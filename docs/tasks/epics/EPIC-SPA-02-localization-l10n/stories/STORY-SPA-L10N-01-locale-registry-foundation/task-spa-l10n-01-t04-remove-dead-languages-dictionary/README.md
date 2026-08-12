## Task workspace — `task-spa-l10n-01-t04-remove-dead-languages-dictionary`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md)
- **Depends on:** T01 Done (endonyms в реестре, не в словаре)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000003`  
**Skill declared:** react-expert  
---

## Task: fix — remove dead languages.* from UI dictionary

### Цель
Удалить мёртвую секцию `languages.*` из `UI_DICTIONARY` (Story AC #4; HK-001).

### Почему это важно (риск)
Мёртвый словарь вводит в заблуждение: имена языков — endonym в реестре, не `t('languages.*')`.

### Факты из кода (Code Facts / SSOT)
1. [`dictionaries.js:38-42`](../../../../../../../../src/i18n/dictionaries.js) — `languages` et.
2. Аналогичные блоки ru/en (~98, ~158).
3. `grep languages src/` — нет runtime consumers кроме словаря.

### Gap / Проблема
Мёртвая секция `languages.*` остаётся в dictionaries.js.

### AC/DoD
- [x] (P0) Story AC #4: `languages.*` удалена из et/ru/en в dictionaries.js.
- [x] (P0) `grep "languages" src/i18n/dictionaries.js` → 0.
- [x] (P1) `npm run test:run` — green.

### Где менять код
- [`src/i18n/dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js)

### Out of scope
- Новые ключи словаря
- L10N-03 fallback markers

### Проверка
```bash
cd spa-app
grep "languages" src/i18n/dictionaries.js || echo OK
npm run test:run
```
