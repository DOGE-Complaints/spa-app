## Task workspace — `task-spa-g2-t08-labels-dictionary-completeness-guard`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: [audit-STORY-SPA-G2-execution-2026-06-12.md](../../../../../../../../analysis/audit-STORY-SPA-G2-execution-2026-06-12.md) §F2
- **Depends on:** STORY-SPA-G2 Done (T01 `labelKeys.js` + T02 `dictionaries.js`)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** done  
**Wave:** `spa_g2_audit_2026_06_12` (post-audit override; не pkg-000002)  
**Skill declared:** javascript-pro  
**activation:** `run_mode=spa_g2_audit_2026_06_12`  
---

## Task: tests — guard AVAILABLE_LABELS × et/ru/en dictionary completeness

### Цель
Добавить регресс-тест: каждый ключ из `AVAILABLE_LABELS` имеет перевод в `UI_DICTIONARY` для et/ru/en; при рассинхроне SSOT↔словарь тест падает (не молчаливый humanize-fallback).

### Почему это важно (риск)
Story AC#1 («все `AVAILABLE_LABELS` имеют переводы») сейчас выполнен вручную, но **не защищён тестом**: новый ключ в [`labelKeys.js`](../../../../../../../../src/i18n/labelKeys.js) без записи в [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) деградирует до [`humanizeLabelSlug`](../../../../../../../../src/i18n/labelDisplay.js) — suite остаётся green.

### Факты из кода (Code Facts / SSOT)
1. [`labelKeys.js:2-13`](../../../../../../../../src/i18n/labelKeys.js) — `AVAILABLE_LABELS` = 10 civic keys (`Object.freeze`).
2. [`dictionaries.js:43-54`](../../../../../../../../src/i18n/dictionaries.js) — секция `labels` et; аналогично ru/en (строки ~103, ~163).
3. [`labelDisplay.test.js:22-25`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js) — резолв только для `bureaucracy`; `grep AVAILABLE_LABELS src/**/__tests__` → 0.
4. Audit F2: [audit-STORY-SPA-G2-execution-2026-06-12.md §F2](../../../../../../../../analysis/audit-STORY-SPA-G2-execution-2026-06-12.md) — Integration Gap SSOT↔dictionary.

### Gap / Проблема
Нет compatibility-теста полноты словаря vs whitelist ключей.

### AC/DoD
- [x] (P0) Тест импортирует `AVAILABLE_LABELS` из `labelKeys.js`.
- [x] (P0) Для каждого ключа × `['et','ru','en']`: `formatLabelKey(makeT(locale), key)` резолвит словарь (не fallback humanize), напр. `!== humanizeLabelSlug(key)` или `t('labels.'+key) !== 'labels.'+key`.
- [x] (P0) `npm run test:run` — green.
- [x] (P1) `acceptance-verification-spa-g2-t08.md` + `BULLRUN-PHASE-LOG.md` на P6 close.

### Где менять код
- [`src/i18n/__tests__/labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js) — расширить существующий файл (предпочтительно)

### Out of scope
- Правки `dictionaries.js` / runtime (только тест)
- Doc gaps F1/F3/F4 из audit
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
cd spa-app
npm run test:run
grep -r AVAILABLE_LABELS src/**/__tests__   # после P6: ≥1 match
```
