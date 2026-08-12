## Task workspace — `task-spa-id-10-t08-country-selector-a11y-active-descendant`

- Story: [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-10-execution-2026-06-30.md`](../../../../../../analysis/audit-STORY-SPA-ID-10-execution-2026-06-30.md) §2 F1; [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) §State B
- **Depends on:** SPA-ID-10-T01..T07 Done (pkg-000023)
- **activation:** `run_mode=spa_id_10_audit_2026_06_30`
- **ui_scope:** `extends` (M126 State B dropdown a11y)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-06-30T11:36:22Z  
**Wave:** `run_mode=spa_id_10_audit_2026_06_30` (post-audit; **не** pkg-000023)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T11:29:18Z  
---

## Task: fix — Country selector dropdown a11y (active descendant + focus trap)

### Цель
Закрыть audit F1: screen-reader и клавиатура корректно объявляют активную опцию в открытом country dropdown; фокус не уходит из дропдауна по Tab (M126 §State B).

### Почему это важно (риск)
ArrowUp/Down меняют `activeIndex`, но фокус остаётся на search input без `aria-activedescendant` — AT не озвучивает активную строку; Tab выводит фокус из открытого списка.

### Факты из кода (Code Facts / SSOT)
1. `activeIndex` + визуальный `--active`, без `aria-activedescendant` — [`CountrySelector.jsx:61-82,110-128`](../../../../../../../../src/components/PhoneVerification/CountrySelector.jsx#L61).
2. Опции `<button role=option>` без стабильного `id` — [`CountrySelector.jsx:110-128`](../../../../../../../../src/components/PhoneVerification/CountrySelector.jsx#L110).
3. Search `autoFocus`; нет focus-trap — [`CountrySelector.jsx:95-105`](../../../../../../../../src/components/PhoneVerification/CountrySelector.jsx#L95).
4. M126 §State B — keyboard nav, focus trapped while open — [mockup-126 §State B](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md).

### Gap / Проблема
Post-audit Low: базовая клавиатура (Esc/Enter/стрелки) работает, но a11y-контракт M126 §8 неполный для SR и focus management.

### AC/DoD
- [x] (P0) Каждая `role=option` имеет `id`; search/listbox — `aria-activedescendant` на активную опцию при arrow-nav.
- [x] (P0) Focus trap или roving tabindex пока dropdown open (Tab не уводит фокус наружу).
- [x] (P1) Vitest smoke: arrow key обновляет active option / `aria-activedescendant` (optional dedicated test).
- [x] (P1) `npm run test:run` green; без регрессий ID-10 selector routing.
- [x] (P1) **Не** менять `pkg-000023`, `spa-active-package.current.yaml`, pipeline story Status Done.

### Где менять код
- [`src/components/PhoneVerification/CountrySelector.jsx`](../../../../../../../../src/components/PhoneVerification/CountrySelector.jsx)
- [`src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx) (optional)

### Out of scope
- Unsupported phone field a11y (T09). Waitlist country code (T10). Per-country validation (ID-11).

### Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx
# manual: /#/verify → open country dropdown → arrow keys + screen reader / axe
```
