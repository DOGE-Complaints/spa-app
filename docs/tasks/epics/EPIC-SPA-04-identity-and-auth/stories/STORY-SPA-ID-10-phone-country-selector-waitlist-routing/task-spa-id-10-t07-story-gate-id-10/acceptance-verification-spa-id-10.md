# Story acceptance gate — STORY-SPA-ID-10-phone-country-selector-waitlist-routing

- **Story:** Country selector в phone input + маршрутизация в waitlist (закрывает ID-07 F1/F2)
- **Package:** `pkg-000023-20260630-epic-spa-04-id10-country-selector-waitlist-routing.yaml`
- **Result:** PASS
- **Date:** 2026-06-30T11:06:37Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Country-селектор (не readonly), Эстония дефолт, выбор любой страны | PASS | `CountrySelector.jsx`, `PhoneInputPanel.test.jsx`, post-implement `supported-m126a` |
| Supported = `+372` (FE-зеркало) через `isSupportedDialPrefix` | PASS | `countriesDataset.js`, `countriesDataset.test.js` |
| Эстония → OTP happy-path без изменений | PASS | `PhoneVerificationFlow.test.jsx` happy path |
| Не-Эстония → уведомление + CTA «Join Waitlist», без `/auth/phone/request` | PASS | `PhoneVerificationFlow.test.jsx` unsupported test; post-implement `unsupported-m126c` |
| «Join Waitlist» → ID-07 со страной из выбора; телефон не хранится | PASS | `VerifyPage.test.jsx` unsupported handoff; `fromClientShortCircuit` clears phone |
| Fallback `COUNTRY_NOT_ALLOWED`→waitlist сохранён | PASS | `PhoneVerificationFlow.test.jsx` COUNTRY_NOT_ALLOWED |
| Все строки локализованы (et/ru/en) через `t()` | PASS | `identityDictionary.js` `phone.country.*`; `identityDictionary.test.js` |
| `npx vitest run` green | PASS | 329 passed (2026-06-30 live run) |

## UI verification

| State | Post-implement PNG |
|-------|-------------------|
| A supported | `task-spa-id-10-t03-.../ui-baseline/post-implement/supported-m126a-1536x1024.png` |
| B dropdown | `task-spa-id-10-t03-.../ui-baseline/post-implement/dropdown-m126b-1536x1024.png` |
| C unsupported | `task-spa-id-10-t03-.../ui-baseline/post-implement/unsupported-m126c-1536x1024.png` |

**Mockup SSOT:** [ui-mockup-spec.md](../task-spa-id-10-t03-country-selector-panel-m126ab/ui-mockup-spec.md) → M126 Path A

## Commands (live verification 2026-06-30)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:verify-host
cd spa-app && PHASE=post-implement node ./tests/puppeteer/country-selector-m126-screenshot.mjs
```

## Findings closed

- **ID-07 F1:** waitlist reachable via unsupported country selector (client short-circuit)
- **ID-07 F2:** waitlist country from explicit selector choice, not dial-derived phone
