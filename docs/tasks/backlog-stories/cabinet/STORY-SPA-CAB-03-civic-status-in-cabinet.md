# STORY-SPA-CAB-03 — Civic Status in Cabinet

## Meta
- **Key:** `STORY-SPA-CAB-03-civic-status-in-cabinet`
- **Epic:** [EPIC-SPA-07 User Cabinet](../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) · **Волна 2 (Blocks)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done — (`pkg-000033`, gate PASS 2026-07-25T21:40:18Z); SSOT исполнения: [pipeline story](../../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-03-civic-status-in-cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md); [acceptance](../../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-03-civic-status-in-cabinet/task-spa-cab-03-t06-story-gate-cab-03/acceptance-verification-spa-cab-03.md).
- **Severity:** 🟡 LOW-MED (M-4)
- **Reuse:** [ID-03](../identity-auth/STORY-SPA-ID-03-civic-status-component.md) — `CivicStatusCard` Done

## Артборд (SSOT дизайна)

| Мокап | Роль | Спека (.md) | Картинка (.png) |
|-------|------|-------------|-----------------|
| **M28** | Component states (SSOT) | [spec](../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md) | [png](../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png) |

> **Placement** (не дизайн-SSOT состояний, а размещение блока): M21 / M23 / M99 — см. [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md), [CAB-07](STORY-SPA-CAB-07-cabinet-page-states.md).
> ⚠️ M28 живёт в `epic-04/`, а не в `user profile/` (civic-компонент общий с identity-эпиком) — путь верный.

## Зачем простыми словами
В кабинете civic status — главный trust-блок. Переиспользуем готовый `CivicStatusCard`, не дублируем компонент. CTA верификации ведёт на `/verify` (ID-04).

## Функциональные требования (FR)
- **FR-CAB-03.1** Встроить `CivicStatusCard` в слот Civic Status (M99 top-center, largest card).
- **FR-CAB-03.2** Unverified: канонический copy + primary `Verify Account` → `/verify`.
- **FR-CAB-03.3** Verified: `Verified civic participant` без повторного prompt (M31 semantics).
- **FR-CAB-03.4** FE-derived state из `phone_verified`, `phone_verified_at`, `phone_dial_prefix` (ID-03 contract).
- **FR-CAB-03.5** Не создавать второй civic-компонент для Profile.
- **FR-CAB-03.L10N** **Локализация — reuse only:** все строки через существующие `civic.*` ключи ([ID-03](../identity-auth/STORY-SPA-ID-03-civic-status-component.md)); **запрет** дублирования civic-copy в `cabinet.*`. Гид: [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md).

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | Встроить существующий `CivicStatusCard` в слот Civic (M99 top-center, largest); wiring по образцу [DashboardPage.jsx](../../../../src/pages/DashboardPage.jsx) | [CivicStatusCard](../../../../src/components/CivicStatus/index.js) |
| **T02** | FE-derived state из `phone_verified`/`phone_verified_at`/`phone_dial_prefix` (ID-03 contract); unverified→`Verify Account`→`/verify`; verified→без повторного prompt | `CivicStatusCard` |
| **T03** | **Icon-swap (change-propagation):** заменить unicode `○ ! … ✓` в [CivicStatusCard.jsx:48-49,108/129/160/182/212](../../../../src/components/CivicStatus/CivicStatusCard.jsx#L48) на `ic-civic-*` (см. Иконки). ⚠️ компонент общий → затрагивает и `DashboardPage` (проверить обе точки) | `CivicStatusCard.jsx` |
| **T04** | L10N **reuse-only** `civic.*` (ID-03); **запрет** дублировать civic-copy в `cabinet.*` | (no new keys) |
| **T05** | Vitest: 5 civic-состояний с иконками; регресс DashboardPage не сломан; forbidden-terms | `__tests__` |
| **T06** | Story gate CAB-03 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md) #5–#9. Кладутся в `public/icons/user-cabinet/`, в коде — `/icons/user-cabinet/ic-<name>.png`. Заменяют unicode-глифы в `CivicStatusCard`.

| Состояние | unicode сейчас | Файл | Путь | Каталог # |
|-----------|----------------|------|------|-----------|
| Unverified | `○` | `ic-civic-unverified.png` | `/icons/user-cabinet/ic-civic-unverified.png` | #5 |
| Verify required | `!` | `ic-civic-verify-required.png` | `/icons/user-cabinet/ic-civic-verify-required.png` | #6 |
| In progress | `…` | `ic-civic-in-progress.png` | `/icons/user-cabinet/ic-civic-in-progress.png` | #7 |
| Verified | `✓` | `ic-civic-verified.png` | `/icons/user-cabinet/ic-civic-verified.png` | #8 |
| Failed | `!` | `ic-civic-failed.png` | `/icons/user-cabinet/ic-civic-failed.png` | #9 |

> ⚠️ **Change-propagation (analysis.mdc):** `CivicStatusCard` используется и в `DashboardPage`, и в кабинете — icon-swap меняет обе поверхности (согласовать/пометить регрессом).

## Routes / API — identity **ready** (live)
> Identity `/me` phone_* **поставлены** — [api-requirements §1](STORY-SPA-CAB-api-requirements.md). Gateway не нужен.

- **Live** `GET /me` — `phone_verified`, `phone_verified_at`, `phone_dial_prefix` → FE-derived civic state (ID-03).
- Navigation: `/verify` для phone flow (ID-04); кабинет phone API не зовёт.
- Test URLs (hash router): `/#/profile` (cabinet civic), `/#/verify` (phone flow), `/#/dashboard` (same `CivicStatusCard` reuse).

## DEV / test hooks

DEV-only screenshot/preview hook in [`UserCabinetPage.jsx`](../../../../src/pages/UserCabinetPage.jsx) (`import.meta.env.DEV`): `sessionStorage['doge.civic-preview']` forces M28-derived state without changing live `/me` permanently.

| Value | Effect |
|-------|--------|
| `unverified` | idle + default context → state A |
| `available` | `verificationContext=protected_action` → state B |
| `in_progress` | `flowPhase=code_entry` → state C |
| `verified` | idle (pair with `phone_verified` via mock profile) → state D |
| `failed` | `flowPhase=failed` + error code → state E |

Full-cycle capture: `cd spa-app && npm run test:ui:cabinet-civic-cab03-full` → story-root [`screenshots/`](../../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-03-civic-status-in-cabinet/screenshots/README.md).

## Зависимости
- [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md).
- [ID-03](../identity-auth/STORY-SPA-ID-03-civic-status-component.md) Done.
- [ID-04](../identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) — verify route (не modal в кабинете).

## Вне scope
- OTP modals M32–M35 (ID-04 на `/verify`). Wallet connect.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md): **новых cabinet-ключей нет** — reuse `civic.*` из [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js). States — канон M28 / ID-03.

### Reuse `civic.*` (новые ключи не создавать)

| UI element | reuse key | en (канон ID-03) |
|------------|-----------|------------------|
| Unverified label | `civic.label.notVerified` | Civic account not verified yet |
| Verified label | `civic.label.verified` | Verified civic participant |
| Verify CTA | `civic.unverified.cta` | Verify Account |
| Unverified body | `civic.unverified.desc` | Verify your phone number to participate in civic actions and submit stories. |
| Verified title | `civic.verified.title` | Verified Civic Account |
| Phone confirmed | `civic.verified.phoneConfirmed` | Phone Confirmed |

> **M23** unverified copy отличается от `civic.unverified.desc` — не менять civic-ключи; composite M23 достигается тем же `CivicStatusCard`. Опционально `cabinet.civic.newUserHint` — только при CAB-07 gate, если нужен точный M23 текст.

## Acceptance Criteria
- [ ] Civic block — визуально доминирующий на `/profile` (M99 hierarchy).
- [ ] `phone_verified=true/false` корректно отображаются через `CivicStatusCard`.
- [ ] CTA Verify → `/verify`; verified без лишнего prompt.
- [ ] Отдельный civic component для cabinet не создан.
- [ ] Civic strings только через `civic.*` reuse; нет дублей в `cabinet.*`.

## Швы
- [`CivicStatusCard`](../../../../src/components/CivicStatus/index.js), [`DashboardPage.jsx`](../../../../src/pages/DashboardPage.jsx) (образец wiring).
