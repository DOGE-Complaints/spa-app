## Task workspace — `task-spa-id-11-t09-unsupported-format-hints-gate`

- Story: [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-11-execution-2026-06-30.md`](../../../../../../analysis/audit-STORY-SPA-ID-11-execution-2026-06-30.md) §2 F2; FR-11.5; M127 §6 waitlist
- **Depends on:** SPA-ID-11-T01..T07 Done (pkg-000024)
- **activation:** `run_mode=spa_id_11_audit_2026_06_30`
- **ui_scope:** `extends` (M127 State C; anchor T04)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-06-30T19:12:21Z
**Wave:** `run_mode=spa_id_11_audit_2026_06_30` (post-audit; **не** pkg-000024)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T19:07:41Z  
---

## Task: fix — Gate format helper/example for unsupported countries

### Цель
Закрыть audit F2: не показывать `phone-format-helper` и `phone-format-example` когда `!supported` (waitlist-контекст ID-10). Поле остаётся optional; Join Waitlist не блокируется (FR-11.5).

### Почему это важно (риск)
`const showFormatHints = true` рендерит «Enter your Germany phone number» одновременно с блоком «DOGEstonia isn't available in Germany yet / Join Waitlist» — противоречивый UX.

### Факты из кода (Code Facts / SSOT)
1. `const showFormatHints = true` — всегда — [`PhoneInputPanel.jsx:47`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L47).
2. Helper/example рендер при `showFormatHints` — [`PhoneInputPanel.jsx:105-115`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L105).
3. Unsupported notice + Join Waitlist — [`PhoneInputPanel.jsx:64-74`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L64).
4. FR-11.5: формат необязателен для unsupported — audit §1.

### Gap / Проблема
Post-audit Low: format-хинты конфликтуют с waitlist-notice для не-supported стран (напр. DE).

### AC/DoD
- [x] (P0) `showFormatHints` (и helper/example) только при `supported === true`.
- [x] (P0) Unsupported: notice + optional phone field + Join Waitlist без helper/example.
- [x] (P1) Vitest: DE selected — нет `phone-format-helper` / `phone-format-example`; `phone-country-join-waitlist` остаётся.
- [x] (P1) UI-3 partial: переснять T04 `ui-baseline/post-implement/different-country-de-m127c-1536x1024.png`.
- [x] (P1) `npm run test:run` green; `npm run test:ui:country-format-m127` green.
- [x] (P1) **Не** менять `pkg-000024`, `spa-active-package.current.yaml`, pipeline story Status Done.

### Где менять код
- [`src/components/PhoneVerification/PhoneInputPanel.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx)
- [`src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx)
- Anchor UI: [`task-spa-id-11-t04-.../ui-baseline/post-implement/`](../task-spa-id-11-t04-phone-input-panel-m127-validation-ui/ui-baseline/post-implement/)

### Out of scope
- Diagnostic hint State B (T08). Pattern field cleanup (T10). Расширение supported-стран.

### Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx
cd spa-app && npm run test:ui:country-format-m127
# manual: /#/verify → select DE → no helper/example; waitlist CTA visible
```
