## Task workspace — `task-spa-id-11-t08-m127-state-b-diagnostic-hint`

- Story: [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-11-execution-2026-06-30.md`](../../../../../../analysis/audit-STORY-SPA-ID-11-execution-2026-06-30.md) §2 F1; [mockup-127-phone-input-per-country-format-validation-spec.md](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md) §State B
- **Depends on:** SPA-ID-11-T01..T07 Done (pkg-000024)
- **activation:** `run_mode=spa_id_11_audit_2026_06_30`
- **ui_scope:** `extends` (M127 State B; anchor T04)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-06-30T19:12:21Z
**Wave:** `run_mode=spa_id_11_audit_2026_06_30` (post-audit; **не** pkg-000024)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T19:07:41Z  
---

## Task: fix — M127 State B diagnostic hint (`phone.format.hint.invalid`)

### Цель
Закрыть audit F1: отрисовать диагностический хинт M127 §State B («Enter a valid {country} phone number.») через ключ `phone.format.hint.invalid`, либо (fallback по решению оператора) удалить мёртвый ключ из 3 локалей + `IDENTITY_FLAT_KEYS`.

### Почему это важно (риск)
Ключ `phone.format.hint.invalid` есть в SSOT i18n, но не рендерится; `validatePhoneForCountry` возвращает только `hint.empty`/`hint.length`. UI показывает length-hint + статус «Needs correction» без отдельной diagnostic-строки M127 §State B — dead key + визуальный drift.

### Факты из кода (Code Facts / SSOT)
1. Ключ `phone.format.hint.invalid` в EN/ET/RU + `IDENTITY_FLAT_KEYS` — [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js).
2. `validatePhoneForCountry` — только `hint.empty` / `hint.length` — [`phoneFormats.js:155-175`](../../../../../../../../src/auth/phoneFormats.js#L155).
3. Панель: length-hint + `phone-format-status-needs-correction`, без `hint.invalid` — [`PhoneInputPanel.jsx:47-120`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L47).
4. M127 §State B — отдельная «Diagnostic Hint» сверх length-хинта — [mockup-127 §State B](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md).

### Gap / Проблема
Post-audit Low: мёртвый i18n-ключ; M127 State B diagnostic hint не отрисован.

### AC/DoD
- [x] (P0) **Render path (рекомендуется):** при invalid + digits показывать `phone.format.hint.invalid` через `formatI18nMessage` (наряду с length-hint или вместо — per M127 §State B).
- [x] (P0) **Или delete path:** удалить `phone.format.hint.invalid` из EN/ET/RU + `IDENTITY_FLAT_KEYS` (только если оператор отклоняет render path).
- [x] (P1) Vitest: invalid EE digits (`55555`) — diagnostic hint visible (render path).
- [x] (P1) UI-3 partial: обновить T04 `ui-baseline/post-implement/invalid-ee-m127b-1536x1024.png`.
- [x] (P1) `npm run test:run` green; без регрессий ID-11 OTP gating.
- [x] (P1) **Не** менять `pkg-000024`, `spa-active-package.current.yaml`, pipeline story Status Done.

### Где менять код
- [`src/components/PhoneVerification/PhoneInputPanel.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx)
- Опционально: [`src/auth/phoneFormats.js`](../../../../../../../../src/auth/phoneFormats.js)
- [`src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx)
- Опционально (delete path): [`src/i18n/identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js)
- Anchor UI: [`task-spa-id-11-t04-.../ui-baseline/post-implement/`](../task-spa-id-11-t04-phone-input-panel-m127-validation-ui/ui-baseline/post-implement/)

### Out of scope
- Unsupported format hints gate (T09). Pattern/mask scope (T10). Новые страны supported.

### Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx
PHASE=post-implement node ./tests/puppeteer/country-format-m127-screenshot.mjs
# manual: /#/verify → EE invalid 55555 → diagnostic hint per M127 §State B
```
