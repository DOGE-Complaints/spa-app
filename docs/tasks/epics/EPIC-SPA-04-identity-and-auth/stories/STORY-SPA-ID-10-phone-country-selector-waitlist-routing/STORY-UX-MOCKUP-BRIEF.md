# STORY-UX-MOCKUP-BRIEF — STORY-SPA-ID-10-phone-country-selector-waitlist-routing

> **Назначение:** вход для отдельного UX-диалога (до P3 Execute с UI). **Особенность ID-10:** mockup-126 **уже существует** → Path A: пропустить UX-чат, P3 сразу с `@mockup:`.

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-ID-10-phone-country-selector-waitlist-routing` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md` |
| **Pkg** | `pkg-000023-20260630-epic-spa-04-id10-country-selector-waitlist-routing.yaml` |
| **Pipeline story** | `spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md` |
| **ui_scope** | `visual` |
| **ui_complexity** | `standard` |
| **UI routes** | `/#/verify` |
| **Viewport** | `1536×1024` |
| **Anchor task (pkg)** | `task-spa-id-10-t03-country-selector-panel-m126ab/README.md` |
| **puppeteer_gate (ожидаемый)** | `test:ui:verify-host` |

---

## 1. Роль агента (UX-диалог)

Ты **UX/UI спецификатор** для spa-app. **Не писать код** — только mockup spec-файлы для Builder Queue P3 (UI Visual Pipeline).

**Принципы:** факты из brief + pipeline story + code/mockup refs; каждый state — отдельный spec или delta; selectors для puppeteer; без implementation notes / JSX / API.

---

## 2. Контекст story (verbatim из pipeline)

### Зачем

Сейчас поле страны в phone input **зафрижено на Эстонию (+372)** (`PhoneInputPanel.jsx`), поэтому иностранный номер ввести нельзя → `COUNTRY_NOT_ALLOWED` не наступает → **waitlist (ID-07) недостижим через UI** (ID-07 F1). Делаем **селектор страны** (Эстония — дефолт, можно выбрать любую). Если выбрана **не поддерживаемая** страна — сразу мягко предлагаем waitlist (не тратя SMS-запрос), со страной из явного выбора (чинит ID-07 F2).

### Scope — UI-relevant FR

- **FR-10.1** Country-селектор (не readonly): флаг + локализованное название + dial-код; Эстония дефолт; список M126 §State B.
- **FR-10.4** Unsupported: инлайн-уведомление `{country}`, CTA «Join Waitlist», optional phone label; блок Send Code / OTP path.
- **FR-10.7** Все строки через `t()`; ключи `phone.country.*` (M126 §7).

### Acceptance Criteria (UI-relevant)

- [ ] Country-селектор (не readonly), Эстония дефолт, выбор любой страны.
- [ ] Эстония → OTP happy-path без изменений (State A).
- [ ] Не-Эстония → уведомление + CTA «Join Waitlist», без вызова `/auth/phone/request` (State C).
- [ ] Dropdown/search при открытии селектора (State B).
- [ ] Все строки локализованы (et/ru/en); нет хардкод-английского.

### Вне scope

- Полная валидация формата номера по стране — **ID-11** (M127).
- Реальный IP-geo. Расширение supported-стран на бэкенде.
- Waitlist panels M123 A–D (ID-07 Done) — только переход в waitlist.

### Решения / decision refs

- [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) — primary SSOT
- [mockup-32-phone-verification-flow-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) §State B
- [mockup-123-country-waitlist-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md) — handoff target
- [audit-STORY-SPA-ID-07-execution-2026-06-30.md](../../../../../../analysis/audit-STORY-SPA-ID-07-execution-2026-06-30.md) F1/F2

---

## 3. Code facts (текущая реализация)

| Компонент / зона | Файл | Что сейчас |
|------------------|------|------------|
| Country field | `spa-app/src/components/PhoneVerification/PhoneInputPanel.jsx` L22-28 | `readOnly` input + `t('phone.input.countryValue')` |
| EE-only validation | `spa-app/src/auth/verificationFlowState.js` L37-53 | `formatEstonianPhone` / `validateEstonianPhone` — только `+372` |
| Flow submit | `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx` L218-225 | всегда `submitPhoneRequest` после EE validation |
| Waitlist handoff | `spa-app/src/pages/VerifyPage.jsx` L44-54 | `onJoinWaitlist({ phone })` → `dialPrefixToCountry(phone)` — **не** explicit country |
| Backend fallback | `PhoneVerificationFlow.jsx` L190-191 | `COUNTRY_NOT_ALLOWED` → `onJoinWaitlist({ phone })` |
| Dial prefix map | `spa-app/src/utils/dialPrefixToCountry.js` | 11 prefixes; нет `SUPPORTED_DIAL_PREFIXES` |
| Waitlist panels | `spa-app/src/components/CountryWaitlist/*` | ID-07 Done (pkg-000022) |

---

## 4. Уже есть (не выдумывать заново)

| Артефакт | Путь | Покрывает |
|----------|------|-----------|
| **M126 spec** | `spa-app/docs/UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md` | States A/B/C — country selector + unsupported adaptive panel |
| **M126 PNG** | `spa-app/docs/UX/mockups/epic-04/mockup-126-phone-country-selector-spec.png` | Visual reference |
| **M32 §B** | `spa-app/docs/UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md` | Исходное требование селектора |
| **M123** | `spa-app/docs/UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md` | Waitlist target после Join Waitlist |
| Viewport | — | `1536×1024` desktop канон |
| Route | — | `/#/verify` (phone panel после disclosure) |

**Рекомендация:** mockup-126 **достаточен** — **пропустить** отдельный UX-чат; P3 Path A с `@mockup:` на M126. Новый spec только при delta, не покрытой M126.

---

## 5. Что описать (если нужен UX-чат / delta)

| # | Screen / state | Описание | Приоритет |
|---|----------------|----------|-----------|
| A | Supported (Estonia default) | Phone panel + selector closed; Send Code CTA | **must** — M126 State A |
| B | Country dropdown open | Search + list (flag, name, dial, badges) | **must** — M126 State B |
| C | Unsupported selected | Notice + Join Waitlist + optional phone | **must** — M126 State C |

Mobile / narrow — **omit** (нет в AC).

---

## 6. Deliverables

**Каталог:** `spa-app/docs/UX/mockups/epic-04/`

- **Path A (рекомендуется):** использовать **M126 as-is** — не создавать новый mockup.
- **Path B (delta only):** `mockup-NN-<slug>-spec.md` если оператор выявил gap vs M126.

На каждый новый spec: layout-метрики, токены, components, states, **selectors** (`data-testid`), связь с AC; **extends** M126 или M32 §B при дельте.

---

## 7. Handoff → P3 Execute

```text
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md
```

В anchor task `task-spa-id-10-t03-country-selector-panel-m126ab/README.md`:

```markdown
- **extends mockup:** mockup-126-phone-country-selector-spec.md
```

**Gate:** UI-1 human «принято» на M126 или `@mockup:` в P3. Отдельный UX-чат **не блокер** при Path A.

### Созданные файлы (Path A — использовать существующие)

| Файл | Покрывает |
|------|-----------|
| `mockup-126-phone-country-selector-spec.md` | States A/B/C |
| `mockup-126-phone-country-selector-spec.png` | Visual reference |

---

## 8. Checklist UX-диалога (Definition of Done)

- [ ] Каждый UI-relevant AC покрыт state A/B/C в M126
- [ ] Layout viewport `1536×1024`; route `/#/verify`
- [ ] Selectors перечислены в M126 для `test:ui:verify-host`
- [ ] Нет scope leak в ID-11 (per-country validation)
- [ ] Handoff `@mockup:` block готов для P3
