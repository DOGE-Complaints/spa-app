## Task workspace — `task-spa-id-10-t09-unsupported-phone-field-a11y-sync`

- Story: [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-10-execution-2026-06-30.md`](../../../../../../analysis/audit-STORY-SPA-ID-10-execution-2026-06-30.md) §2 F2; [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) §State C
- **Depends on:** SPA-ID-10-T03..T04 Done; optional after T08
- **activation:** `run_mode=spa_id_10_audit_2026_06_30`
- **ui_scope:** `extends` (M126 State C optional phone field)

---
**Приоритет:** P1  
**Сложность:** XS  
**Статус:** Done  
**Closed:** 2026-06-30T11:36:22Z  
**Wave:** `run_mode=spa_id_10_audit_2026_06_30` (post-audit; **не** pkg-000023)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T11:29:18Z  
---

## Task: fix — Unsupported phone field: sync AT semantics with behavior

### Цель
Устранить рассинхрон `aria-disabled` и редактируемого optional phone input в unsupported-режиме (audit F2).

### Почему это важно (риск)
AT объявляет поле disabled, но `onChange` активен; введённое значение не используется в waitlist short-circuit — путаница для пользователей assistive tech.

### Факты из кода (Code Facts / SSOT)
1. `aria-disabled={supported ? undefined : true}` + активный `onChange` — [`PhoneInputPanel.jsx:75-87`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L75).
2. Unsupported join не передаёт phone — [`PhoneVerificationFlow.jsx:232-238`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx#L232); [`VerifyPage.jsx:49`](../../../../../../../../src/pages/VerifyPage.jsx#L49).
3. M126 §State C: optional phone, disabled appearance, no OTP — [mockup-126 §State C](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md).

### Gap / Проблема
Post-audit Low: семантика AT не совпадает с фактическим поведением поля.

### AC/DoD
- [x] (P0) Единая семантика: либо `readOnly`/`disabled` (не редактируется), либо убрать `aria-disabled` и явно optional editable (M126 «Phone Number (optional)»).
- [x] (P1) Обновить [`PhoneInputPanel.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx) под выбранную модель.
- [x] (P1) `npm run test:run` green.
- [x] (P1) **Не** менять `pkg-000023`, `spa-active-package.current.yaml`, pipeline story Status Done.

### Где менять код
- [`src/components/PhoneVerification/PhoneInputPanel.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx)
- [`src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx)

### Out of scope
- Country selector dropdown a11y (T08). Waitlist payload code (T10).

### Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx
```
