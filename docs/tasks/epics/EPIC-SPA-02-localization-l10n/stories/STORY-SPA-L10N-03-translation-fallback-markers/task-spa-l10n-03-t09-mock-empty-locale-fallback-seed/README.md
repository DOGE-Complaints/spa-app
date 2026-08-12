## Task workspace — `task-spa-l10n-03-t09-mock-empty-locale-fallback-seed`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-03-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-03-execution-2026-06-16.md) §F1
- **Depends on:** SPA-L10N-03-T01..T08 Done
- **activation:** `run_mode=spa_l10n_03_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_03_audit_2026_06_16` (post-audit; **не** pkg-000005)  
**Skill declared:** javascript-pro  
---

## Task: data — seed empty-locale issue for fallback-marker demo in FAKE-OLD

### Цель
Добавить минимум один issue в `ROUTING_DEMO_ISSUES` с пустой или отсутствующей локалью в одном из полей `title` / `summary` / `description`, чтобы fallback-маркер «Shown in ⟨lang⟩» был наблюдаем в `FAKE-OLD` без unit-теста. Закрывает audit F1 (демо/observability gap).

### Почему это важно (риск)
Все 12 моков имеют полные `{et,ru,en}` для контентных полей → `resolveLocalizedTextWithMeta` никогда не возвращает `usedFallback: true` в dev → fallback-маркер не отрисовывается; путь проверяется только в [`core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js).

### Факты из кода (Code Facts / SSOT)
1. [`translationMarkers.js:28-29`](../../../../../../../../src/i18n/translationMarkers.js) — `shouldShowContentFallbackMarker` требует `meta.usedFallback === true`.
2. [`core.js:60-69`](../../../../../../../../src/i18n/core.js) — `usedFallback: true` когда запрошенная локаль пуста и сработал откат et→ru→en.
3. [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) — все issues с полными `{et,ru,en}` для title/summary/description.
4. DE-002 уже демонстрирует MT-маркер через `original_locale: ['ru']` (строка 30).

### Gap / Проблема
Audit F1: fallback-маркер контента корректен и тестируем, но не наблюдаем в FAKE-OLD runtime.

### AC/DoD
- [x] (P0) Минимум один issue в [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) с пустой/отсутствующей локалью в `title`, `summary` или `description` → при выборе этой локали `usedFallback=true`.
- [x] (P1) Опционально: лёгкий test/assert что seed содержит issue с empty-locale полем.
- [x] (P0) `npx vitest run` — green.

### Где менять код
- [`src/router/mockIssues.js`](../../../../../../../../src/router/mockIssues.js)
- Опционально: [`src/router/__tests__/`](../../../../../../../../src/router/__tests__/) seed assertion

### Out of scope
- Изменение `resolveLocalizedTextWithMeta` / marker helpers
- Institution fallback marker (T10)
- MT-маркер seed (уже есть DE-002)
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
cd spa-app
# после P6: открыть issue с пустой локалью, переключить UI locale → fallback marker visible
npx vitest run
```
