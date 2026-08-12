# Story acceptance gate — STORY-SPA-ID-07

- **Story:** Country Waitlist (unsupported region)
- **Package:** `pkg-000022-20260630-epic-spa-04-id07-country-waitlist.yaml`
- **Result:** PASS
- **Date:** 2026-06-30 (live verify `2026-06-30T09:11:31Z`)

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| 4 состояния (not-supported / form / joined / error) реализованы | PASS | `CountryWaitlist/*` panels + `VerifyPage` `WAITLIST_PHASES`; Vitest `CountryWaitlistPanels.test.jsx`, `VerifyPage.test.jsx` |
| Country pre-filled из detected, редактируемо; email обязателен | PASS | `dialPrefixToCountry` + `WaitlistFormPanel` `initialCountry`; form `required` email |
| Joined-подтверждение явное; аккаунт/телефон/профиль не создаются | PASS | `WaitlistJoinedPanel`; `waitlistService` mock — email only |
| Ошибки waitlist различимы (incl. duplicate); Retry доступен | PASS | `WaitlistErrorPanel` per-kind `data-testid`; `waitlistService.test.js` |
| Интеграция `POST /waitlist` за флагом до подтверждения контракта | PASS | `VITE_WAITLIST_API_ENABLED` + mock-first `waitlistService.js` |
| Все строки локализованы (et/ru/en) через `t()` | PASS | 24 `waitlist.*` keys in `identityDictionary.js`; `identityDictionary.test.js` green |

## FR checklist

| FR | Status | Evidence |
|----|--------|----------|
| FR-07.1–07.7 | PASS | M123 panels, i18n, dial-prefix country, mock service, privacy (no account creation) |

## Commands (live verification 2026-06-30)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run   # 320 passed, 2 skipped
```

## §UI (story-anchor T03)

| Check | Status | Evidence |
|-------|--------|----------|
| Path A `@mockup` gate | PASS | [ui-mockup-spec.md](../task-spa-id-07-t03-country-not-supported-panel-m123a/ui-mockup-spec.md) → mockup-123 |
| Post-implement PNG A | PASS | [not-supported-m123a-1536x1024.png](../task-spa-id-07-t03-country-not-supported-panel-m123a/ui-baseline/post-implement/not-supported-m123a-1536x1024.png) |
| Post-implement PNG B | PASS | [form-m123b-1536x1024.png](../task-spa-id-07-t03-country-not-supported-panel-m123a/ui-baseline/post-implement/form-m123b-1536x1024.png) |
| Post-implement PNG C | PASS | [joined-m123c-1536x1024.png](../task-spa-id-07-t03-country-not-supported-panel-m123a/ui-baseline/post-implement/joined-m123c-1536x1024.png) |
| Post-implement PNG D | PASS | [error-m123d-network-1536x1024.png](../task-spa-id-07-t03-country-not-supported-panel-m123a/ui-baseline/post-implement/error-m123d-network-1536x1024.png) |
| Capture script | — | `cd spa-app && node ./tests/puppeteer/waitlist-all-states-screenshot.mjs` |
| `npm run test:ui:board-shell` (step 0b) | **FAIL** | Pre-existing: board expects 4 columns, app renders 3 — unrelated to ID-07; waived for story code gate |

## Notes

- `PhoneVerificationFlow`: `setPhone(nextPhone)` before API request so `onJoinWaitlist({ phone })` has dial context on `COUNTRY_NOT_ALLOWED`.
- Step 0b board-shell failure is **out of scope** for ID-07; track under board shell regression separately.
