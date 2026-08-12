## Task workspace — `task-spa-id-10-t10-waitlist-country-code-payload`

- Story: [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-10-execution-2026-06-30.md`](../../../../../../analysis/audit-STORY-SPA-ID-10-execution-2026-06-30.md) §2 F3; FR-10.5
- **Depends on:** SPA-ID-10-T05 Done; optional after T08–T09
- **activation:** `run_mode=spa_id_10_audit_2026_06_30`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-06-30T11:36:22Z  
**Wave:** `run_mode=spa_id_10_audit_2026_06_30` (post-audit; **не** pkg-000023)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T11:29:18Z  
---

## Task: fix — Waitlist sink receives stable country code (not locale name)

### Цель
Передавать в `waitlistService.joinWaitlist` стабильный ISO/code (`DE`), а локализованное имя — только для отображения (audit F3).

### Почему это важно (риск)
Сейчас в sink уходит locale-зависимая строка (`Germany` / `Saksamaa` / `Германия`), хотя handoff уже несёт `country: 'DE'`.

### Факты из кода (Code Facts / SSOT)
1. Handoff: `{ country: selectedCountry.code, countryName, fromClientShortCircuit }` — [`PhoneVerificationFlow.jsx:232-238`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx#L232).
2. `VerifyPage` кладёт `countryName` в `waitlistCountry`, `country` param не используется — [`VerifyPage.jsx:45-55`](../../../../../../../../src/pages/VerifyPage.jsx#L45).
3. Form submit → `joinWaitlist({ email, country, organization })` — [`WaitlistFormPanel.jsx:21,26`](../../../../../../../../src/components/CountryWaitlist/WaitlistFormPanel.jsx#L21); [`VerifyPage.jsx:64-68`](../../../../../../../../src/pages/VerifyPage.jsx#L64).
4. Тест фиксирует `'Germany'` в form country — [`VerifyPage.test.jsx:162`](../../../../../../../../src/pages/__tests__/VerifyPage.test.jsx#L162).

### Gap / Проблема
Post-audit Low: data-quality — waitlist payload locale-dependent вместо stable code.

### AC/DoD
- [x] (P0) `joinWaitlist` получает `country` = ISO/code (`DE`), не localized display name.
- [x] (P0) UI form показывает localized name; внутренний state разделяет code vs displayName (или эквивалент).
- [x] (P1) Backend-fallback path (FR-10.6 / `COUNTRY_NOT_ALLOWED`) — code или dial-derived mapping сохранён.
- [x] (P1) Vitest: assert payload `country === 'DE'` для unsupported client handoff ([`VerifyPage.test.jsx`](../../../../../../../../src/pages/__tests__/VerifyPage.test.jsx)).
- [x] (P1) `npm run test:run` green.
- [x] (P1) **Не** менять `pkg-000023`, `spa-active-package.current.yaml`, pipeline story Status Done.

### Где менять код
- [`src/pages/VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx)
- [`src/components/CountryWaitlist/WaitlistFormPanel.jsx`](../../../../../../../../src/components/CountryWaitlist/WaitlistFormPanel.jsx) (if needed)
- [`src/pages/__tests__/VerifyPage.test.jsx`](../../../../../../../../src/pages/__tests__/VerifyPage.test.jsx)

### Out of scope
- A11y fixes (T08–T09). Waitlist backend sink contract (ID-07 TBD). ID-11 per-country validation.

### Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/VerifyPage.test.jsx
```
