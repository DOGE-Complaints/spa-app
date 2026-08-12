## Task workspace — `task-spa-cab-02-t10-cabinet-flat-keys-locale-parity-test`

- Story: [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-CAB-02-execution-2026-07-12.md`](../../../../../../analysis/audit-STORY-SPA-CAB-02-execution-2026-07-12.md) §INFO-3b
- **Depends on:** SPA-CAB-02-T05 Done; опционально после T09
- **activation:** `run_mode=spa_cab_02_audit_2026_07_12`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-07-12T08:49:35Z  
**Wave:** `run_mode=spa_cab_02_audit_2026_07_12` (post-audit; **не** pkg-000029)  
**Skill declared:** javascript-pro  
**Scaffolded:** 2026-07-12T08:46:31Z  
---

## Task: tests — programmatic `CABINET_FLAT_KEYS` en/et/ru parity

### Цель
Добавить automated parity guard: каждый ключ из `CABINET_FLAT_KEYS` должен присутствовать в en/et/ru cabinet dictionaries — regression shield для T05 L10N.

### Почему это важно (риск)
T07 vitest проверяет только два et-ключа в AccountSummary; при добавлении cabinet-ключей без синхронизации всех локалей — тихая регрессия (audit §INFO-3b).

### Code Facts (re-verify at execute)
1. SSOT keys: [`cabinetDictionary.js:145+`](../../../../../../../../src/i18n/cabinetDictionary.js) — `CABINET_FLAT_KEYS`, `CABINET_DICTIONARY_BY_LOCALE`.
2. Образец identity guard: [`findMissingIdentityDictionaryKeys`](../../../../../../../../src/i18n/forbiddenVerificationTerms.js) + test [`identityDictionary.test.js:20-23`](../../../../../../../../src/i18n/__tests__/identityDictionary.test.js).
3. Runtime guide §6 ссылается на `CABINET_FLAT_KEYS` parity ([`localization-developer-guide.md`](../../../../../../runtime-docs/localization-developer-guide.md)).

### AC/DoD
- [x] (P0) Добавить `findMissingCabinetDictionaryKeys()` (по образцу `findMissingIdentityDictionaryKeys`) в [`forbiddenVerificationTerms.js`](../../../../../../../../src/i18n/forbiddenVerificationTerms.js) **или** экvivalent inline в новом test file.
- [x] (P0) Vitest: `expect(findMissingCabinetDictionaryKeys()).toEqual([])` — итерация всех `CABINET_FLAT_KEYS` × en/et/ru.
- [x] (P0) `npm test` green.
- [x] (P1) **Не** менять `pkg-000029`, `spa-active-package.current.yaml`.

### Where to change
- [`spa-app/src/i18n/forbiddenVerificationTerms.js`](../../../../../../../../src/i18n/forbiddenVerificationTerms.js) (preferred helper)
- [`spa-app/src/i18n/__tests__/cabinetDictionary.test.js`](../../../../../../../../src/i18n/__tests__/cabinetDictionary.test.js) (new) или расширение [`identityDictionary.test.js`](../../../../../../../../src/i18n/__tests__/identityDictionary.test.js)

### Out of scope
- Forbidden-terms scan (уже покрыт identity guard)
- Новые cabinet UI keys / copy changes
- Новый pkg / смена active package pointer

### Verification
```bash
cd spa-app
npm test -- src/i18n/__tests__/cabinetDictionary.test.js
npm test
```

### Gate
- [`acceptance-verification-spa-cab-02-t10.md`](./acceptance-verification-spa-cab-02-t10.md) → PASS
