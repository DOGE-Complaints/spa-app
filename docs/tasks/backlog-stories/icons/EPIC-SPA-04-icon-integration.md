# EPIC-SPA-04 — Размещение иконок в коде (интеграция)

> Парный документ к [`EPIC-SPA-04-icon-assets.md`](EPIC-SPA-04-icon-assets.md). **Имена файлов совпадают строка-в-строку** с каталогом. Назначение: после генерации (док-1) и загрузки иконок — по этому доку написать стори внедрения (где ставить, где править вёрстку).
>
> **Как читать:** для каждой иконки — (1) текущая ситуация в коде, (2) имя файла, (3) мокап(ы) где смотреть место, (4) точка в коде + требуется ли правка вёрстки. Verified-ссылки на код с путями.
>
> **Легенда «Правка вёрстки»:** 🟢 слот под иконку уже есть (просто подставить src) · 🟡 нужно добавить `<img>`-слот в существующий компонент · 🔴 заменить unicode/emoji-глиф на `<img>`.

## Часто используемые (несколько мест) — сначала

| Файл | Текущая ситуация | Мокапы | Место в коде / правка |
|------|------------------|--------|-----------------------|
| `ic-civic-{unverified,verify-required,in-progress,verified,failed}.png` (reuse user-cabinet) | **unicode-глифы** `○ ! … ✓` в prop `icon` ([CivicStatusCard.jsx:48-49](../../../../src/components/CivicStatus/CivicStatusCard.jsx#L48), call sites :108/129/160/182/212) | [M28](../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md) §A–E; [M122](../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md) trust; [M125](../../../UX/mockups/epic-04/mockup-125-identity-system-overview-sheet-spec.md) | 🔴 `CivicStatusCard`: заменить строковый `icon` на `<img src="/icons/user-cabinet/ic-civic-*.png">`; маппинг состояние→файл (unverified→`ic-civic-unverified`, verify-required→`ic-civic-verify-required`, in-progress→`ic-civic-in-progress`, verified→`ic-civic-verified`, failed→`ic-civic-failed`) |
| `ic-verify-shield.png` (reuse story-handoff) | используется в StorySubmit VERIFY; в phone-флоу **нет** | [M32](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) §A/§E; [M120](../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md); M122 | 🟡 `PhoneVerification/DisclosurePanel.jsx` (§A), `SuccessPanel.jsx` (§E) — добавить `<img>`-слот |
| `ic-cloud-error.png` (reuse story-handoff) | используется в StorySubmit SERVICE_DOWN | M37 §PROVIDER/§SEND_FAILED/§network; [M124](../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md) §D/§E | 🟡 `PhoneVerificationErrorState.jsx` (per-kind), `AppShell.jsx` (session §D/§E) |
| `ic-lock.png` (reuse story-handoff) | используется в StorySubmit LOGIN | M121 §A/§B password; M124 §B/§C; M37 §TOO_MANY_ATTEMPTS | 🟡 `LoginPage.jsx` (password field), `AppShell.jsx` (logged-out/expired), `PhoneVerificationErrorState.jsx` |
| `ic-success-check.png` (reuse story-handoff) | StorySubmit SUBMITTED | M32 §E; M121 §F; M123 §C; M122 | 🟡 `SuccessPanel.jsx`, `LoginPage.jsx` (§F), `CountryWaitlist/WaitlistJoinedPanel.jsx` |
| `ic-auto-resubmit.png` (reuse story-handoff) | не используется в src | M37/M124 §retry; M123 §D Try Again | 🟡 `PhoneVerificationErrorState.jsx`, `WaitlistErrorPanel.jsx`, `AppShell.jsx` retry |

## M32 — Phone Verification Flow

| Файл | Текущая ситуация | Мокап | Место в коде / правка |
|------|------------------|-------|-----------------------|
| `ic-verify-shield.png` (reuse) | нет иконки в панели | M32 §A Disclosure | 🟡 `PhoneVerification/DisclosurePanel.jsx` — hero-иконка |
| `ic-phone.png` (reuse story-handoff) | dial-prefix = текст span ([PhoneInputPanel.jsx:89](../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L89)) | M32 §B | 🟡 `PhoneInputPanel.jsx` — опц. иконка у поля |
| `ic-otp-code.png` (NEW, опц.) | OTP-поле без иконки | M32 §C OTP Entry ⚠️ verify vs PNG | 🟡 `OtpPanel.jsx` — hero-иконка (если артборд показывает) |
| — (skeleton) | ProcessingPanel — CSS ([ProcessingPanel.jsx:14](../../../../src/components/PhoneVerification/ProcessingPanel.jsx#L14)) | M32 §D «no giant spinner» | ⛔ иконка НЕ нужна |
| `ic-success-check.png` (reuse) | нет | M32 §E Success | 🟡 `SuccessPanel.jsx` |

## M37 — Verification Error States
> `PhoneVerificationErrorState.jsx` сейчас рендерит только `title/message/meta/actions` по `errorKind` ([:34-38](../../../../src/components/PhoneVerification/PhoneVerificationErrorState.jsx#L34)) — **иконки нет**. Внедрение = 🟡 добавить icon-слот, маппинг `errorKind → файл`.

| Файл | errorKind | Мокап | Цвет |
|------|-----------|-------|------|
| `ic-globe.png` (NEW) | COUNTRY_NOT_ALLOWED | [M37](../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) | нейтраль |
| `ic-clock.png` (NEW) | RATE_LIMITED (cooldown) | M37 | нейтраль |
| `ic-code-mismatch.png` (NEW) | CODE_MISMATCH | M37 | нейтраль |
| `ic-clock-expired.png` (reuse) | CODE_EXPIRED | M37 | нейтраль |
| `ic-lock.png` (reuse) | TOO_MANY_ATTEMPTS | M37 | — |
| `ic-cloud-error.png` (reuse) | PROVIDER_UNAVAILABLE / SEND_FAILED / network_error | M37 | error |
| `ic-profile-conflict.png` (NEW) | profile_conflict | M37 §G | нейтраль |
| `ic-lock.png` / `ic-auto-resubmit.png` (reuse) | AUTHENTICATION_REQUIRED / session_expired (retry) | M37 | — |

## M121 — Web Authentication (`LoginPage.jsx`)

| Файл | Текущая ситуация | Мокап | Место в коде / правка |
|------|------------------|-------|-----------------------|
| `ic-email.png` (NEW) | unicode `✉` ([LoginPage.jsx:398](../../../../src/pages/LoginPage.jsx#L398)) | M121 §A/§B/§D Email field | 🔴 заменить `✉`; 🟡 иконки у Email-полей |
| `ic-lock.png` (reuse) | нет | M121 §A/§B Password | 🟡 у Password-поля |
| `ic-eye.png` / `ic-eye-off.png` (NEW, опц.) | нет toggle | M121 §A/§B ⚠️ verify vs PNG | 🟡 password-visibility toggle (если вёрстка добавит) |
| `ic-mail-sent.png` (NEW) | нет | M121 §C Magic Link Sent | 🟡 hero-иконка состояния |
| `ic-key.png` (NEW) | нет | M121 §D Forgot Password | 🟡 hero-иконка |
| `ic-warning-triangle.png` (reuse) | нет | M121 §E Auth Error | 🟡 диагностическая иконка |
| `ic-profile-conflict.png` (NEW) | нет | M121 §E «account exists» | 🟡 |
| `ic-success-check.png` (reuse) | нет | M121 §F Success | 🟡 |

## M123 — Country Waitlist (`CountryWaitlist/*`)

| Файл | Текущая ситуация | Мокап | Место в коде / правка |
|------|------------------|-------|-----------------------|
| `ic-globe.png` (NEW) | панель без иконки | [M123](../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md) §A Not Supported | 🟡 `CountryNotSupportedPanel.jsx` |
| `ic-email.png` (NEW) | нет | M123 §B Waitlist Form email | 🟡 `WaitlistFormPanel.jsx` |
| `ic-mail-sent.png` / `ic-success-check.png` (NEW/reuse) | нет | M123 §C Joined | 🟡 `WaitlistJoinedPanel.jsx` |
| `ic-cloud-error.png` + `ic-auto-resubmit.png` (reuse) | нет | M123 §D Submission Error / Try Again | 🟡 `WaitlistErrorPanel.jsx` |

## M124 — Session Shell (`AppShell.jsx` + `sessionShellState.js`)

| Файл | Текущая ситуация | Мокап | Место в коде / правка |
|------|------------------|-------|-----------------------|
| — (skeleton) | CSS | [M124](../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md) §A Restoring «no giant spinner» | ⛔ иконка НЕ нужна |
| `ic-lock.png` (reuse) | нет | M124 §B Logged Out / §C Session Expired | 🟡 `AppShell.jsx` |
| `ic-cloud-error.png` (reuse) | нет | M124 §D Backend / §E Network | 🟡 `AppShell.jsx` |
| `ic-auto-resubmit.png` (reuse) | нет | M124 retry | 🟡 `AppShell.jsx` |

## M126/M127 — Phone Selector / Format (`CountrySelector.jsx`, `PhoneInputPanel.jsx`)

| Файл | Текущая ситуация | Мокап | Место в коде / правка |
|------|------------------|-------|-----------------------|
| `ic-chevron-down.png` (NEW, опц.) | unicode `▾` ([CountrySelector.jsx:126](../../../../src/components/PhoneVerification/CountrySelector.jsx#L126)) | M126 §B | 🔴/опц. (unicode приемлем) |
| `ic-search.png` (NEW, опц.) | search-input без иконки | M126 §B «Search country» | 🟡 опц. |
| (флаги) | emoji-флаги ([CountrySelector.jsx:117,172](../../../../src/components/PhoneVerification/CountrySelector.jsx#L117)) | M126 список стран | ⚪ SVG-флаги есть в `public/assets/` (ET/RU/US) — замена emoji вне этого набора |

## M120 / M122 / M125 / M128

| Файл | Текущая ситуация | Мокап | Место в коде / правка |
|------|------------------|-------|-----------------------|
| `ic-info.png` (reuse story-handoff) | используется в StoryHandoff draft-чипах ([StoryHandoffPanels.jsx:72](../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx#L72)) | M120/M128 draft-status; M28 context | ⚪ уже внедрено (M128); при M120/M122 gate — reuse тот же путь |
| `ic-doc-new.png` (reuse story-handoff) | StoryHandoff empty | M120/M128 empty; M122 draft context | ⚪ уже внедрено (M128); M122 — reuse при вёрстке gate |

- **M120** (GPT-мост), **M122** (compose gate) — переиспользуют `ic-verify-shield` / `ic-civic-*` / `ic-doc-new` / `ic-phone` / `ic-info`; своих новых нет.
- **M125** (overview) — диаграмма, продуктовых иконок нет.
- **M128** (story handoff) — **уже внедрено** ([StoryHandoffPanels.jsx](../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx), story-handoff/*), не трогаем.

---

## Сводка правок вёрстки (для будущей стори внедрения)
- 🔴 **Замены unicode/emoji→PNG:** `CivicStatusCard` (✓!…○ → ic-civic-*), `LoginPage:398` (✉ → ic-email), опц. `CountrySelector` (▾).
- 🟡 **Добавить icon-слот:** `PhoneVerificationErrorState` (per-kind, ключевая точка M37), Disclosure/Otp/Success панели (M32), CountryWaitlist ×4 (M123), `AppShell` session-states (M124), `LoginPage` states (M121).
- ⛔ **Не иконка:** ProcessingPanel/session-restoring (skeleton), M126 бейджи/флаги, M125 диаграмма.
- ⚠️ **Verify vs PNG перед стори:** опциональные `ic-eye/ic-eye-off/ic-otp-code/ic-chevron-down/ic-search` — свериться с PNG-артбордами epic-04; часть может не понадобиться.
