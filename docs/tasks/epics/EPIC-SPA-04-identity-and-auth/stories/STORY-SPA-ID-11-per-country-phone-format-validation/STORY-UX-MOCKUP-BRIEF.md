# STORY-UX-MOCKUP-BRIEF — STORY-SPA-ID-11-per-country-phone-format-validation

> **Назначение:** вход для отдельного UX-диалога (до P3 Execute с UI). **Особенность ID-11:** mockup-127 **уже существует на диске** → Path A: пропустить UX-чат, P3 сразу с `@mockup:` после operator gate «принято».

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-ID-11-per-country-phone-format-validation` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md` |
| **Pkg** | `pkg-000024-20260630-epic-spa-04-id11-per-country-phone-format-validation.yaml` |
| **Pipeline story** | `spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-11-per-country-phone-format-validation/STORY-SPA-ID-11-per-country-phone-format-validation.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md` |
| **ui_scope** | `visual` |
| **ui_complexity** | `standard` |
| **UI routes** | `/#/verify` |
| **Viewport** | `1536×1024` |
| **Anchor task (pkg)** | `task-spa-id-11-t04-phone-input-panel-m127-validation-ui/README.md` |
| **puppeteer_gate (ожидаемый)** | `test:ui:verify-host` |

---

## 1. Роль агента (UX-диалог)

Ты **UX/UI спецификатор** для spa-app. **Не писать код** — только mockup spec-файлы для Builder Queue P3 (UI Visual Pipeline).

**Принципы:** факты из brief + pipeline story + code/mockup refs; каждый state — отдельный spec или delta; selectors для puppeteer; без implementation notes / JSX / API.

---

## 2. Контекст story (verbatim из pipeline)

### Зачем

Сейчас валидация номера — **только для Эстонии**: `validateEstonianPhone` / `ESTONIAN_PHONE_PATTERN = /^\+372\d{7,8}$/` (`verificationFlowState.js:24-53`). После того как ID-10 даёт **выбор страны**, нужно, чтобы **выбранная страна определяла допустимый формат номера** (длина/маска/пример). Для этого собираем датасет «страна → правила формата E.164».

### Scope — UI-relevant FR

- **FR-11.3** `formatPhoneForCountry` → placeholder/маска из датасета на выбранную страну.
- **FR-11.4** Выбор страны в ID-10-селекторе **меняет** допустимый формат (placeholder, длины, hint) в реальном времени.
- **FR-11.5** Supported-страна (Эстония) — гейтит OTP-кнопку; unsupported — формат **необязателен** (не блокирует waitlist).
- **FR-11.6** Hint-сообщения локализованы и специфичны по стране — `{country}`/`{example}` через `formatI18nMessage`.
- **FR-11.7** Ключи `phone.format.*` в identityDictionary et/ru/en.

### Acceptance Criteria (UI-relevant)

- [ ] Смена страны меняет placeholder/длины/hint в реальном времени.
- [ ] Hint-сообщения локализованы и специфичны по стране (длина/пример).
- [ ] Все строки локализованы (et/ru/en) через `t()`; нет хардкод-английского (FR-11.7).
- [ ] `validatePhoneForCountry`/`formatPhoneForCountry` обобщают валидацию; Эстония — частный случай (OTP happy-path не сломан).

### Вне scope

- Тяжёлая зависимость libphonenumber (оценить отдельно). Реальная отправка SMS / провайдер. Расширение supported-стран (config/ops).

### Решения / decision refs

- [mockup-127-phone-input-per-country-format-validation-spec.md](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md) — primary SSOT
- [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) — country selector (extends)
- [mockup-37-verification-error-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) — diagnostic error tone

---

## 3. Code facts (текущая реализация)

| Компонент / зона | Файл | Что сейчас |
|------------------|------|------------|
| Phone panel | `spa-app/src/components/PhoneVerification/PhoneInputPanel.jsx` | Country selector (ID-10); `validateEstonianPhone` for supported only; static `phone.input.placeholder` |
| EE-only validation | `spa-app/src/auth/verificationFlowState.js` L24-59 | `ESTONIAN_PHONE_PATTERN`, `validateEstonianPhone`, `formatEstonianPhone` |
| Flow submit | `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx` L249-250 | `formatEstonianPhone` / `validateEstonianPhone` on submit |
| Country SSOT | `spa-app/src/utils/countriesDataset.js` | 10 countries; `isSupportedDialPrefix` (`+372`) |
| Country selector | `spa-app/src/components/PhoneVerification/CountrySelector.jsx` | M126 dropdown (ID-10 Done) |
| i18n | `spa-app/src/i18n/identityDictionary.js` | `phone.country.*` present; **`phone.format.*` absent** |
| Unsupported path | `PhoneInputPanel.jsx` L48-57, L107-115 | Join Waitlist; optional phone; `{ valid: true }` when unsupported |

---

## 4. Уже есть (не выдумывать заново)

| Артефакт | Путь | Покрывает |
|----------|------|-----------|
| **M127 spec** | `spa-app/docs/UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md` | States A Valid EE · B Invalid EE · C DE · D Empty |
| **M127 PNG** | `spa-app/docs/UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.png` | Visual reference |
| **M126** | `spa-app/docs/UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md` | Country selector + unsupported panel (ID-10) |
| **M37** | `spa-app/docs/UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md` | Recoverable validation tone |
| Viewport | — | `1536×1024` desktop канон |
| Route | — | `/#/verify` (`PhoneVerificationFlow` → `PhoneInputPanel`) |

**Рекомендация:** mockup-127 **достаточен** — **Path A:** operator gate «принято» на M127 → P3 с `@mockup:` без нового UX-чата. **Path B:** refresh M127 только если selector/data-testid delta vs реализация ID-10.

---

## 5. Что описать (если нужен UX-чат / Path B delta)

| # | Screen / state | Описание | Приоритет |
|---|----------------|----------|-----------|
| A | Valid phone (EE) | Placeholder `5555 5555`; status Valid; Send Code enabled | **must** — M127 State A |
| B | Invalid format (EE) | Needs correction hint; Send Code disabled; M37 tone | **must** — M127 State B |
| C | Different country (DE) | Placeholder/mask `1512 3456789`; helper with `{country}` | **must** — M127 State C |
| D | Empty field | Empty hint; Send Code disabled | **must** — M127 State D |

Mobile / narrow — **omit** (нет в AC).

---

## 6. Deliverables

**Каталог:** `spa-app/docs/UX/mockups/epic-04/`

- **Path A (рекомендуется):** использовать **M127 as-is** — `mockup-127-phone-input-per-country-format-validation-spec.md` + PNG.
- **Path B (delta only):** обновить M127 spec если gaps в selectors vs `PhoneInputPanel` testids.

На каждый spec: layout-метрики, токены, components, states, **selectors** (`data-testid`), связь с AC; **extends** M126 selector + M37 error tone.

---

## 7. Handoff → P3 Execute

```text
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md
```

В anchor task `task-spa-id-11-t04-phone-input-panel-m127-validation-ui/README.md`:

```markdown
- **extends mockup:** mockup-127-phone-input-per-country-format-validation-spec.md
- **extends:** mockup-126-phone-country-selector-spec.md (country selector context)
```

**Gate:** UI-1 human «принято» на M127 или `@mockup:` в P3. Отдельный UX-чат **не блокер** при Path A.

### Созданные файлы (Path A — использовать существующие)

| Файл | Покрывает |
|------|-----------|
| `mockup-127-phone-input-per-country-format-validation-spec.md` | States A/B/C/D |
| `mockup-127-phone-input-per-country-format-validation-spec.png` | Visual reference |

---

## 8. Checklist UX-диалога (Definition of Done)

- [ ] Каждый UI-relevant AC покрыт states A/B/C/D в M127
- [ ] Layout viewport `1536×1024`; route `/#/verify`
- [ ] Selectors перечислены в M127 для puppeteer / `test:ui:verify-host`
- [ ] Нет scope leak: libphonenumber, SMS provider, backend supported-countries expansion
- [ ] Unsupported waitlist path (ID-10) — format optional, не блокирует Join Waitlist
- [ ] Handoff `@mockup:` block готов для P3
- [ ] Operator gate «принято» зафиксирован до P3 Execute
