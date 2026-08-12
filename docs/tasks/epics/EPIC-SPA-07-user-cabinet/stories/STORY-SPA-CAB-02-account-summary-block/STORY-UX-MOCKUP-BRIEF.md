# STORY-UX-MOCKUP-BRIEF — STORY-SPA-CAB-02-account-summary-block

> **Назначение:** вход для **отдельного UX-диалога** (до P3 Execute с UI). Агент-UX пишет/дополняет mockup spec-файлы; оператор переносит пути в P3 `@mockup:`.
> **Создано в:** P1.3 materialize (2026-07-12)
> **Не путать с:** `ui-mockup-spec.md` в task-folder (UI-1, после baseline в P3).

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-CAB-02-account-summary-block` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md` |
| **Pkg** | `pkg-000029-20260712-epic-spa-07-cab-02-account-summary-block.yaml` |
| **Pipeline story** | `spa-app/docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-02-account-summary-block/STORY-SPA-CAB-02-account-summary-block.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md` |
| **ui_scope** | `visual` |
| **ui_complexity** | `standard` |
| **UI routes** | `/#/profile` |
| **Viewport** | `1536×1024` (desktop канон) |
| **Anchor task (pkg)** | `task-spa-cab-02-t01-account-summary-slot-profile-data/README.md` — `ui_anchor: true` |
| **puppeteer_gate (ожидаемый)** | Vitest primary (T07); future `test:ui:cabinet-account` TBD after selectors added |

---

## 1) Роль и задача

Ты **UX/UI специалист** для spa-app. Твоя задача — **не писать код**, а подготовить **target mockup specifications** (или **delta-specs** к существующим M24–M26) для последующей реализации в Builder Queue P3 (`@mockup:` handoff).

**Принципы:**
- Опирайся только на факты из этого brief, pipeline story и перечисленных code/mockup refs (**analysis.mdc**).
- M24/M25/M26 уже существуют — **extends**, не перерисовывай layout с нуля; фокус: **selectors / data-testid / puppeteer** + placement в M99 shell context.
- Структура spec — как [mockup-01-dashboard-main-spec.md](../../../../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md): layout-метрики, токены, компоненты, states, selectors.

---

## 2) Контекст story (verbatim из pipeline)

### Meta
- **Key:** `STORY-SPA-CAB-02-account-summary-block`
- **Epic:** EPIC-SPA-07 User Cabinet · **Волна 2 (Blocks)**
- **Severity:** 🟡 LOW-MED (M-4)
- **Reuse:** ID-03 (privacy patterns)

### Зачем простыми словами
Техническая карточка аккаунта в кабинете: кто залогинен, operational status. Не социальный профиль. Данные из `/me` + placeholders для полей, которых API пока не отдаёт.

### Scope — Функциональные требования (FR)
- **FR-CAB-02.1** Компонент `<AccountSummary />` в слоте Account (M99 top-left).
- **FR-CAB-02.2** Поля: Email (masked или `Not Available`), Account Created, Role, Account Status — стабильная сетка строк (M24–M26).
- **FR-CAB-02.3** Три UX-состояния: complete (M24), minimal-data (M25), missing-email (M26).
- **FR-CAB-02.4** Отсутствующее поле → `Not Available` (muted), не error state, не collapse layout.
- **FR-CAB-02.5** Privacy: не показывать raw phone, OTP, tokens (как FR-08.7 / ID-08).
- **FR-CAB-02.L10N** **Локализация (L10N) — сразу:** labels, role/status display, placeholder через `t()`; ключи `cabinet.account.*` + reuse `cabinet.common.notAvailable`.

### Вне scope
- Civic status (CAB-03). Profile editing. Wallet.

### Acceptance Criteria (UI-relevant)
- [ ] `/profile` показывает Account Summary (не placeholder page).
- [ ] `display_name`, `role` из `/me`; partial fields с `Not Available` без поломки карточки.
- [ ] Три состояния M24/M25/M26 достижимы при соответствующих данных.
- [ ] Сырой номер/OTP/токены не отображаются.
- [ ] Protected; неавторизованный не видит контент.
- [ ] Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

---

## 3) Code facts

| Зона UI | Файл | Что сейчас |
|---------|------|------------|
| `/profile` route | [`spa-app/src/App.jsx`](../../../../../../../src/App.jsx) | `<Route path="/profile" element={<ProtectedProfilePage />} />` |
| Profile page | [`spa-app/src/layout/AppShellLayout.jsx:44-45`](../../../../../../../src/layout/AppShellLayout.jsx) | `ProtectedPlaceholder title="Profile"` |
| Profile data | [`spa-app/src/auth/useSessionShellState.js`](../../../../../../../src/auth/useSessionShellState.js) | `profile` from `identityService.fetchMe()` |
| `/me` contract | [`doge-identity-service/src/core/api/me_response.py`](../../../../../../../../doge-identity-service/src/core/api/me_response.py) | `display_name`, `role`, `phone_verified*`; **без** `email`, `created_at`, account `status` |
| AccountSummary | — | **не реализован** |
| Field icons #1–#4 | [`spa-app/public/icons/user-cabinet/ic-field-*.png`](../../../../../../../public/icons/user-cabinet/) | PNG assets exist |

---

## 4) Уже есть (extends)

| Mockup | Путь | Что покрывает |
|--------|------|---------------|
| M24 complete | [`mockup-24-account-summary-complete-spec.md`](../../../../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec.md) | Populated AccountSummary — 4 fields |
| M25 minimal-data | [`mockup-25-account-summary-minimal-data-spec.md`](../../../../../../UX/mockups/user%20profile/mockup-25-account-summary-minimal-data-spec.md) | Partial secondary fields |
| M26 missing-email | [`mockup-26-account-summary-missing-email-spec.md`](../../../../../../UX/mockups/user%20profile/mockup-26-account-summary-missing-email-spec.md) | Email unavailable — **no warning icon** §7 |
| M99 assembly | [`mockup-99-user-cabinet-final-assembly-spec.md`](../../../../../../UX/mockups/user%20profile/mockup-99-user-cabinet-final-assembly-spec.md) | Account slot top-left placement |

- **Viewport:** `1536×1024`
- **UI route:** `/#/profile` (HashRouter)

---

## 5) Что нарисовать / описать

| Screen / state | Описание | Приоритет |
|----------------|----------|-----------|
| complete (M24) | All four fields populated or masked email + role/status from `/me` | **must** |
| minimal-data (M25) | Role/status present; email/created partial → `Not Available` muted | **must** |
| missing-email (M26) | Email row = `Not Available` text only — **no warning icon** | **must** |
| locale switch (et/ru/en) | Labels from `cabinet.account.*`; values dynamic | **should** |
| logged_out overlay | Account Summary not visible; ID-02 SessionShell overlay | **should** (AC #5) |
| mobile narrow | — | **skip** (Вне scope CAB-01/CAB-02) |

**Suggested selectors (draft for spec delta):**

| Element | Suggested `data-testid` |
|---------|-------------------------|
| AccountSummary root | `account-summary` |
| Card title | `account-summary-title` |
| Field row (email) | `account-summary-field-email` |
| Field row (created) | `account-summary-field-created` |
| Field row (role) | `account-summary-field-role` |
| Field row (status) | `account-summary-field-status` |
| Not Available value | `account-summary-not-available` |
| State variant | `data-state="complete|minimal-data|missing-email"` on root |

---

## 6) Deliverables

Каталог: `spa-app/docs/UX/mockups/user profile/`

**Рекомендация:** дополнить существующие M24/M25/M26 секцией **Selectors / puppeteer** (delta), не создавать новый NN, если layout не меняется.

Если нужен контекст M99 placement — опционально `mockup-NN-account-summary-in-cabinet-spec.md` (следующий свободный NN в `user profile/`).

Структура каждого spec/delta:
- layout-метрики; tokens; components; states; **selectors**; AC traceability

---

## 7) Handoff → P3 Execute

```text
@mockup: spa-app/docs/UX/mockups/user profile/mockup-24-account-summary-complete-spec.md
@mockup: spa-app/docs/UX/mockups/user profile/mockup-25-account-summary-minimal-data-spec.md
@mockup: spa-app/docs/UX/mockups/user profile/mockup-26-account-summary-missing-email-spec.md
```

Anchor task README update after UX dialog:

```markdown
- **extends mockup:** mockup-24-account-summary-complete-spec.md, mockup-25-account-summary-minimal-data-spec.md, mockup-26-account-summary-missing-email-spec.md
```

**Gate:** P3 visual implement **не стартовать**, пока оператор не подтвердил mockup specs («принято») или не приложил `@mockup:` в P3.

---

## 8) Checklist DoD (UX-диалог)

- [ ] Каждый UI-relevant AC покрыт хотя бы одним state в spec(s)
- [ ] Layout-метрики и viewport `1536×1024`
- [ ] Selectors перечислены для будущего puppeteer / Vitest queries
- [ ] M26: missing-email **без** warning icon (противоречие с «Вне scope» отсутствует)
- [ ] Нет civic status / profile editing / wallet в spec
- [ ] Operator gate «принято» зафиксирован до P3

### Созданные файлы (заполнить по итогу UX-диалога)

| Файл | Покрывает |
|------|-----------|
| _(TBD by UX agent)_ | |
