## Task workspace — `task-spa-search-01-t08-remove-dead-verified-asset-sync-mockup03`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-SEARCH-01-execution-2026-06-17.md`](../../../../../../analysis/audit-STORY-SPA-SEARCH-01-execution-2026-06-17.md) §3 F1
- **Depends on:** SPA-SEARCH-01-T01..T07 Done
- **activation:** `run_mode=spa_search_01_audit_2026_06_17`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_search_01_audit_2026_06_17` (post-audit; **не** pkg-000008)  
**Skill declared:** javascript-pro  
**ui_scope:** none  
**ui_complexity:** trivial  
---

## Task: cleanup — remove dead verified.svg and sync mockup-03 to gateway status canon

### Цель
Удалить неиспользуемый ассет `verified.svg` после перехода на канон `NEW/IN_REVIEW/PUBLISHED` и привести [`mockup-03-status-badge-spec.md`](../../../../../../../../docs/UX/mockups/mockup-03-status-badge-spec.md) в соответствие с runtime ([`StatusBadge.jsx`](../../../../../../../../src/components/StatusBadge.jsx), [`types.js`](../../../../../../../../src/domain/types.js)).

### Почему это важно (риск)
Мёртвый asset и дрейф UX-спеки (VERIFIED/doge-icon) вводят в заблуждение при SEARCH-02 и визуальных тасках; операторы могут восстановить устаревший статус.

### Факты из кода (Code Facts / SSOT)
1. VERIFIED удалён из канона — [`types.js:3-7`](../../../../../../../../src/domain/types.js#L3): `NEW`, `IN_REVIEW`, `PUBLISHED`.
2. StatusBadge не рендерит verified-иконку — [`StatusBadge.jsx`](../../../../../../../../src/components/StatusBadge.jsx); `grep verified.svg src/` → 0.
3. Мёртвый файл — [`public/icons/verified.svg`](../../../../../../../../public/icons/verified.svg) существует, не импортируется.
4. Mockup-03 всё ещё специфицирует VERIFIED + doge-marker — [`mockup-03-status-badge-spec.md`](../../../../../../../../docs/UX/mockups/mockup-03-status-badge-spec.md) (строки 14–16, 37–39, 69–72).
5. Audit F1 — [audit-STORY-SPA-SEARCH-01-execution-2026-06-17.md](../../../../../../analysis/audit-STORY-SPA-SEARCH-01-execution-2026-06-17.md) §3 F1.

### Gap / Проблема
Post-audit legacy: dead asset + UX spec drift после SEARCH-01 vocabulary alignment.

### AC/DoD
- [x] (P0) Удалить [`public/icons/verified.svg`](../../../../../../../../public/icons/verified.svg); `rg verified.svg spa-app/src` → 0.
- [x] (P0) Обновить [`mockup-03-status-badge-spec.md`](../../../../../../../../docs/UX/mockups/mockup-03-status-badge-spec.md): статусы `NEW`, `IN_REVIEW`, `PUBLISHED`; убрать VERIFIED/doge-icon/ARCHIVED; enum/display labels согласовать с [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js).
- [x] (P1) `npm run test:run` — green (регрессия не ожидается).
- [x] (P0) Артефакт `acceptance-verification-spa-search-01-t08.md` в этой task-папке.

### Где менять код
- [`public/icons/verified.svg`](../../../../../../../../public/icons/verified.svg) — delete
- [`docs/UX/mockups/mockup-03-status-badge-spec.md`](../../../../../../../../docs/UX/mockups/mockup-03-status-badge-spec.md) — sync

### Out of scope
- **F2 (by-design):** возврат `cluster_transport` / outside-core seed в [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) — нарушает SEARCH-01 AC5; demo outside-core → GFL-DRIVEN; humanize покрыт [`collectLabelKeysFromIssues.test.js`](../../../../../../../../src/i18n/__tests__/collectLabelKeysFromIssues.test.js).
- **F3 (closed):** gate-таск уже есть — [`task-spa-search-01-t07-story-acceptance-verification`](../task-spa-search-01-t07-story-acceptance-verification/README.md) Done.
- T09 / новый pkg / смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml)
- SEARCH-02 materialize

### Проверка
```bash
cd spa-app
test ! -f public/icons/verified.svg
rg "VERIFIED|verified\.svg" src/ docs/UX/mockups/mockup-03-status-badge-spec.md
npm run test:run
```
