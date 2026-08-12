## Task workspace — `task-spa-id-11-t10-phone-format-pattern-mask-scope`

- Story: [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-11-execution-2026-06-30.md`](../../../../../../analysis/audit-STORY-SPA-ID-11-execution-2026-06-30.md) §2 F3
- **Depends on:** SPA-ID-11-T01..T07 Done (pkg-000024)
- **activation:** `run_mode=spa_id_11_audit_2026_06_30`
- **ui_scope:** `none` (Path B default) | `extends` (Path A mask)

---
**Приоритет:** P2  
**Сложность:** S (Path B) / M (Path A)  
**Статус:** Done  
**Closed:** 2026-06-30T19:12:21Z
**Wave:** `run_mode=spa_id_11_audit_2026_06_30` (post-audit; **не** pkg-000024)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T19:07:41Z  
---

## Task: scope — `pattern` field / input mask (dead SSOT consumer)

### Цель
Закрыть audit F3: устранить мёртвое поле `pattern` в `PHONE_FORMAT_BY_COUNTRY` одним из путей (явный выбор оператора в P6):

| Path | Действие |
|------|----------|
| **A (mask)** | Потребитель `pattern` — группировка цифр при вводе/отображении |
| **B (scope)** | Зафиксировать placeholder-only в pipeline story; удалить `pattern` из SSOT + тесты |

**Рекомендация P6:** Path B (минимальный diff post-audit Low).

### Почему это важно (риск)
`pattern` ('#### ####' и т.п.) хранится в датасете, но ни один модуль его не читает; M127 §1 упоминает input mask, реализованы placeholder + length-валидация — dead field в SSOT.

### Факты из кода (Code Facts / SSOT)
1. `pattern` в каждой записи `PHONE_FORMAT_ENTRIES` — [`phoneFormats.js:15-80`](../../../../../../../../src/auth/phoneFormats.js#L15).
2. Нет потребителей `\.pattern` в `src/` вне определения — audit §2 F3 (`grep` verified).
3. Ввод — сырые цифры; валидация по длине — [`PhoneInputPanel.jsx:99-100`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L99), [`phoneFormats.js:152`](../../../../../../../../src/auth/phoneFormats.js#L152).

### Gap / Проблема
Post-audit Low: `pattern` — мёртвое поле; live input mask не реализован.

### AC/DoD
- [x] (P0) Оператор выбирает Path A или B в начале P6 (зафиксировать в task Closed note).
- [x] (P0) **Path B:** удалить `pattern` из `phoneFormats.js` + обновить pipeline story §«Вне scope» (placeholder-only MVP).
- [x] (P0) **Path A:** реализовать потребитель `pattern` (группировка) + тесты; `ui_scope` → extends при изменении live input.
- [x] (P1) `npm run test:run -- src/auth/__tests__/phoneFormats.test.js` green.
- [x] (P1) **Не** менять `pkg-000024`, `spa-active-package.current.yaml`, pipeline story Status Done (кроме §Вне scope при Path B).

### Где менять код
- [`src/auth/phoneFormats.js`](../../../../../../../../src/auth/phoneFormats.js)
- [`src/auth/__tests__/phoneFormats.test.js`](../../../../../../../../src/auth/__tests__/phoneFormats.test.js)
- Path A only: новый util и/или [`PhoneInputPanel.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx)
- Path B: [`STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md) §Вне scope

### Out of scope
- Diagnostic hint (T08). Unsupported hints gate (T09). libphonenumber dependency.

### Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/phoneFormats.test.js
cd spa-app && npm run test:run
```
