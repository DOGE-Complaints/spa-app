## Task workspace — `task-spa-l10n-01-t09-locale-hardcode-guard-test`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-01-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-01-execution-2026-06-16.md) §F2
- **Depends on:** SPA-L10N-01-T08 Done
- **activation:** `run_mode=spa_l10n_01_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_01_audit_2026_06_16` (post-audit; **не** pkg-000003)  
**Skill declared:** javascript-pro  
---

## Task: tests — automated locale-hardcode guard (AC #2 regression shield)

### Цель
Автоматизировать защиту Story AC #2: повторный ввод хардкод-списков локалей / `LANGUAGE_OPTIONS` / дублирующих status maps вне реестра и словаря должен падать в CI.

### Почему это важно (риск)
AC#2 выполнен, но не защищён тестом (audit F2; T05 README: «Нет automated guard на AC #2»). Тихая регрессия при copy-paste локальных массивов.

### Факты из кода (Code Facts / SSOT)
1. T07 evidence для AC#2 — ручной `rg LANGUAGE_OPTIONS` ([`acceptance-verification-spa-l10n-01-t07.md`](../task-spa-l10n-01-t07-story-acceptance-verification/acceptance-verification-spa-l10n-01-t07.md)).
2. T05 README:29 — gap задокументирован, automated guard отсутствует.
3. Образец completeness-guard: [`labelDisplay.test.js:33-43`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js) (G2 post-audit).
4. После T08: `StatusBadge` не должен оставаться в allowlist исключений.

### Gap / Проблема
Нет source-scan/lint в vitest suite; locale-hardcode вне `core.js` registry data и `dictionaries.js` не детектируется.

### AC/DoD
- [x] (P0) Vitest source-scan (напр. `localeHardcodeGuard.test.js`): обход `src/` с **allowlist** — `core.js` (registry data), `dictionaries.js`, `mockIssues.js`, `__tests__/**`, domain content fixtures.
- [x] (P0) Fail при: `LANGUAGE_OPTIONS`, дублирующие `nativeLabel`+`flagSrc` массивы локалей, `STATUS_LABELS`-подобные et/ru/en maps вне словаря.
- [x] (P1) После T08: `rg et|ru|en src/` вне allowlist ≈ 0 (кроме content fixtures).
- [x] (P0) `npx vitest run` — green.

### Где менять код
- [`src/i18n/__tests__/localeHardcodeGuard.test.js`](../../../../../../../../src/i18n/__tests__/localeHardcodeGuard.test.js) (предпочтительно) и/или расширение [`core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js)

### Out of scope
- ESLint plugin / CI отдельным job
- gateway / бэк-зеркало `I18N_LANGS`
- Production 4-й язык
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/localeHardcodeGuard.test.js
npx vitest run
rg "LANGUAGE_OPTIONS" src/
```
