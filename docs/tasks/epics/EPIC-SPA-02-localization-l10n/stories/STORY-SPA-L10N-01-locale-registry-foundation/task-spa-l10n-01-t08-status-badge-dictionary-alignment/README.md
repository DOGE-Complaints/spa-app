## Task workspace — `task-spa-l10n-01-t08-status-badge-dictionary-alignment`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-01-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-01-execution-2026-06-16.md) §F1, §F3
- **Depends on:** SPA-L10N-01-T01..T07 Done
- **activation:** `run_mode=spa_l10n_01_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_01_audit_2026_06_16` (post-audit; **не** pkg-000003)  
**Skill declared:** react-expert  
---

## Task: refactor — StatusBadge on UI_DICTIONARY / t('status.*')

### Цель
Убрать локаль-хардкод-остров `STATUS_LABELS` в `StatusBadge`; статус-лейблы читать из существующего `UI_DICTIONARY.status.*` через `t()` / `useI18n`. Закрывает audit F1 (дубль словаря) и F3 (AC#5 для всего app).

### Почему это важно (риск)
Два параллельных источника статус-переводов (`StatusBadge` vs `dictionaries.js`); добавление 4-й локали потребует правки компонента вне реестра+словарей.

### Факты из кода (Code Facts / SSOT)
1. [`StatusBadge.jsx:4-26`](../../../../../../../../src/components/StatusBadge.jsx) — `STATUS_LABELS` с ключами `et`/`ru`/`en`.
2. [`StatusBadge.jsx:36-37`](../../../../../../../../src/components/StatusBadge.jsx) — `resolveLocale` fallback `'en'` (не `DEFAULT_LOCALE` из реестра).
3. [`StatusBadge.jsx:51`](../../../../../../../../src/components/StatusBadge.jsx) — default prop `locale = 'en'`.
4. [`dictionaries.js:32+`](../../../../../../../../src/i18n/dictionaries.js) — `status.NEW|VERIFIED|IN_REVIEW|ARCHIVED` × et/ru/en уже есть.
5. Потребители передают `locale` из `useI18n()`: [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx), [`IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx), [`IssueCard.jsx`](../../../../../../../../src/components/IssueCard/IssueCard.jsx).

### Gap / Проблема
Audit F1: `StatusBadge` не управляется реестром/словарём; дублирует `UI_DICTIONARY.status.*`. Audit F3: AC#5 N-locale неполон пока компонент не на словаре.

### AC/DoD
- [x] (P0) Удалить `STATUS_LABELS`; лейбл статуса через `t('status.<enum>')` (`useI18n` внутри компонента или prop `t`).
- [x] (P0) Fallback локали — `DEFAULT_LOCALE` из [`core.js`](../../../../../../../../src/i18n/core.js), не хардкод `'en'`.
- [x] (P0) Обновить [`StatusBadge.test.jsx`](../../../../../../../../src/components/__tests__/StatusBadge.test.jsx) (обёртка `I18nProvider` при необходимости).
- [x] (P1) Визуальные строки статусов не меняются (те же значения из словаря).
- [x] (P0) `npx vitest run` — green.

### Где менять код
- [`src/components/StatusBadge.jsx`](../../../../../../../../src/components/StatusBadge.jsx)
- [`src/components/__tests__/StatusBadge.test.jsx`](../../../../../../../../src/components/__tests__/StatusBadge.test.jsx)

### Out of scope
- `dir` в DOM (audit F4 — observation)
- L10N-03 MT-маркеры
- Фактический 4-й язык в production
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
cd spa-app
rg "STATUS_LABELS" src/
npx vitest run src/components/__tests__/StatusBadge.test.jsx
npx vitest run
```
