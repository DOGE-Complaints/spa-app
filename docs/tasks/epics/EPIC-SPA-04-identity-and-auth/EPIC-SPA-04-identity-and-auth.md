# EPIC-SPA-04 — Identity & Authentication Layer

> **ID:** `EPIC-SPA-04` · **Статус:** Done — ID-01…14 Done (`pkg-000055` ID-14 gate 2026-08-07T19:56:17Z)
> **Layer:** spa-app browser React/Vite — account-first auth, lazy phone verification, GPT bridge, protected actions
> **Backlog SSOT:** [identity-auth/README.md](../../backlog-stories/identity-auth/README.md)
> **Requirements SSOT:** [identity-frontend.md](../../../../docs/Identity/identity-frontend.md) (FR-FE-001…008)
> **Active pkg:** `pkg-000055` — [STORY-SPA-ID-14](./stories/STORY-SPA-ID-14-post-submit-path-choice/STORY-SPA-ID-14-post-submit-path-choice.md) ✅ Done (gate 2026-08-07T19:56:17Z)
> **Last closed pkg:** `pkg-000055` — ID-14 post-submit path choice

---

## 1. Назначение

Слой идентификации пользователя DOGEstonia: **account-first** регистрация/вход (email через Supabase Auth), **ленивая** разовая верификация телефона (+372), мост из Custom GPT, гейт защищённых действий, состояния сессии. Wallet и реputation — **вне эпика**.

**Продуктовая ось:** аккаунт первичен; телефон — разовая проверка «реальный уникальный человек»; верификация в момент защищённого действия, не на входе. Backend телефонной верификации **готов** (PV-01…07); OAuth для GPT **построен** (OAUTH-01…04).

---

## 2. Pipeline stories (nested)

| Story | Backlog source | Status | Pkg / Wave |
|-------|----------------|--------|------------|
| [STORY-SPA-ID-01-web-authentication](./stories/STORY-SPA-ID-01-web-authentication/STORY-SPA-ID-01-web-authentication.md) | [backlog ID-01](../../backlog-stories/identity-auth/STORY-SPA-ID-01-web-authentication.md) | Done | pkg-000013 |
| [STORY-SPA-ID-02-session-shell-states](./stories/STORY-SPA-ID-02-session-shell-states/STORY-SPA-ID-02-session-shell-states.md) | [backlog ID-02](../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md) | Done (pkg-000016, 2026-06-28) | pkg-000016 |
| [STORY-SPA-ID-03-civic-status-component](./stories/STORY-SPA-ID-03-civic-status-component/STORY-SPA-ID-03-civic-status-component.md) | [backlog ID-03](../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md) | Done (pkg-000017, 2026-06-28) | pkg-000017 |
| [STORY-SPA-ID-04-phone-verification-flow](./stories/STORY-SPA-ID-04-phone-verification-flow/STORY-SPA-ID-04-phone-verification-flow.md) | [backlog ID-04](../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) | Done (pkg-000018, 2026-06-28) | pkg-000018 |
| [STORY-SPA-ID-05-verification-error-states](./stories/STORY-SPA-ID-05-verification-error-states/STORY-SPA-ID-05-verification-error-states.md) | [backlog ID-05](../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md) | Done (pkg-000019, 2026-06-29) | pkg-000019 |
| [STORY-SPA-ID-09-identity-ui-localization](./stories/STORY-SPA-ID-09-identity-ui-localization/STORY-SPA-ID-09-identity-ui-localization.md) | [backlog ID-09](../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) | Done (pkg-000020, 2026-06-29) | pkg-000020 |
| [STORY-SPA-ID-06-protected-action-gate](./stories/STORY-SPA-ID-06-protected-action-gate/STORY-SPA-ID-06-protected-action-gate.md) | [backlog ID-06](../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md) | Done (pkg-000021, 2026-06-29) | pkg-000021 |
| [STORY-SPA-ID-07-country-waitlist](./stories/STORY-SPA-ID-07-country-waitlist/STORY-SPA-ID-07-country-waitlist.md) | [backlog ID-07](../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md) | Done (pkg-000022, 2026-06-30) | pkg-000022 |
| [STORY-SPA-ID-10-phone-country-selector-waitlist-routing](./stories/STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) | [backlog ID-10](../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) | Done (pkg-000023, 2026-06-30) | pkg-000023 |
| [STORY-SPA-ID-11-per-country-phone-format-validation](./stories/STORY-SPA-ID-11-per-country-phone-format-validation/STORY-SPA-ID-11-per-country-phone-format-validation.md) | [backlog ID-11](../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md) | Done (pkg-000024, 2026-06-30) | pkg-000024 |
| [STORY-SPA-ID-08-gpt-verification-entry](./stories/STORY-SPA-ID-08-gpt-verification-entry/STORY-SPA-ID-08-gpt-verification-entry.md) | [backlog ID-08](../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md) | Done (pkg-000025, 2026-07-02) | pkg-000025 |
| [STORY-SPA-ID-12-story-draft-handoff-submit](./stories/STORY-SPA-ID-12-story-draft-handoff-submit/STORY-SPA-ID-12-story-draft-handoff-submit.md) | [backlog ID-12](../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md) | Done (pkg-000026, 2026-07-05) | pkg-000026 |
| [STORY-SPA-ID-13-public-route-regression](./stories/STORY-SPA-ID-13-public-route-regression/STORY-SPA-ID-13-public-route-regression.md) | [backlog ID-13](../../backlog-stories/identity-auth/STORY-SPA-ID-13-public-route-regression.md) | Done (pkg-000041, gate 2026-08-01T20:02:31Z) | pkg-000041 |
| [STORY-SPA-ID-14-post-submit-path-choice](./stories/STORY-SPA-ID-14-post-submit-path-choice/STORY-SPA-ID-14-post-submit-path-choice.md) | [backlog ID-14](../../backlog-stories/identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md) | Done (pkg-000055, gate 2026-08-07T19:56:17Z) · M135 | pkg-000055 |

---

## 3. Волны (из backlog README §3)

```
Wave 1 — Foundation
  ID-01 Web Authentication
  ID-02 Session Shell
  ID-03 Civic Status Card

Wave 2 — Verification core
  ID-04 Phone Verification Flow
  ID-05 Verification Error States

Wave 3 — Protected action
  ID-06 Protected Action Gate (web)
  ID-07 Country Waitlist

Wave 4 — GPT bridge
  ID-08 GPT Verification Entry

Wave 6 — Story draft handoff
  ID-12 Story Draft Handoff Submit (browser submit)

Wave 5 — L10N retrofit
  ID-09 Identity UI Localization (ID-01…05 retrofit)

Gate — Public route regression (M-5 spa)
  ID-13 Public route regression
```

**Граф:** ID-03 → ID-04 → {ID-05, ID-06}; ID-05 → ID-07; {ID-04, ID-05} → ID-08; {ID-04, ID-06, ID-08} → ID-12 → ID-13. ID-01/ID-02 — фундамент для всех.

---

## 4. Cross-epic references

| Epic | Status | Relation |
|------|--------|----------|
| [EPIC-DASH-01](../EPIC-DASH-01-dashboard-read-side-cutover/EPIC-DASH-01-dashboard-read-side-cutover.md) | G1 Done (pkg-000001) | Gateway read path for board |
| [EPIC-SPA-03](../EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md) | Done (pkg-000012) | BoardPage shell — auth gates future |

---

## 5. Вне scope эпика

- Wallet, reputation
- Identity backend implementation (doge-identity-service) — только FE integration
- `EPIC-IDS-*` tasks in spa tree (identity service has separate builder profile)

---

## 6. Mockup mirror (Epic-04 artboards)

| Story | Mockup |
|-------|--------|
| ID-01 | [M121](../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md) |
| ID-02 | [M124](../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md) |
| ID-03 | [M28](../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md) |
| ID-04 | [M32](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) |
| ID-05 | [M37](../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) |
| ID-06 | [M122](../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md) |
| ID-07 | [M123](../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md) |
| ID-10 | [M126](../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) |
| ID-08 | [M120](../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) |
| ID-12 | [M128](../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) |
