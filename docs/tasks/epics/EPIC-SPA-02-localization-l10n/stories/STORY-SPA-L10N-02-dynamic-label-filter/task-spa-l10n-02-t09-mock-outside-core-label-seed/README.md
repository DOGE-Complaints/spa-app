## Task workspace — `task-spa-l10n-02-t09-mock-outside-core-label-seed`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-02-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-02-execution-2026-06-16.md) §F2
- **Depends on:** SPA-L10N-02-T08 Done (можно параллельно при согласовании оператора)
- **activation:** `run_mode=spa_l10n_02_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_02_audit_2026_06_16` (post-audit; **не** pkg-000004)  
**Skill declared:** javascript-pro  
---

## Task: data — seed outside-core label in FAKE-OLD mock issues

### Цель
Добавить минимум один issue в `ROUTING_DEMO_ISSUES` с меткой вне `AVAILABLE_LABELS` (напр. `cluster_transport`), чтобы динамический фильтр был наблюдаем в `FAKE-OLD` без unit-теста. Закрывает audit F2 (демо/observability gap).

### Почему это важно (риск)
Все моки несут только core-метки → дропдаун визуально неотличим от старого статического списка; ценность L10N-02 не демонстрируется в default dev mode.

### Факты из кода (Code Facts / SSOT)
1. [`mockIssues.js:8-30`](../../../../../../../../src/router/mockIssues.js) — labels только из курируемого ядра.
2. [`labelKeys.js:6-17`](../../../../../../../../src/i18n/labelKeys.js) — 10 frozen core keys; `cluster_transport` отсутствует.
3. [`collectLabelKeysFromIssues.test.js:7-14`](../../../../../../../../src/i18n/__tests__/collectLabelKeysFromIssues.test.js) — precedent outside-core key `cluster_transport`.

### Gap / Проблема
Audit F2: outside-core поведение доказано unit-тестом, но не seed-данными FAKE-OLD.

### AC/DoD
- [x] (P0) Минимум один issue в [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) с `labels` содержащим ключ вне `AVAILABLE_LABELS`.
- [x] (P1) Опционально: лёгкий test/assert что seed содержит outside-core label.
- [x] (P0) `npx vitest run` — green.

### Где менять код
- [`src/router/mockIssues.js`](../../../../../../../../src/router/mockIssues.js)
- Опционально: [`src/router/__tests__/`](../../../../../../../../src/router/__tests__/) seed assertion

### Out of scope
- Расширение `AVAILABLE_LABELS` / словаря `labels.*`
- GFL-DRIVEN gateway taxonomy
- F1 BoardPage includeCore (T08)
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
cd spa-app
rg "cluster_transport" src/router/mockIssues.js
npx vitest run
```
