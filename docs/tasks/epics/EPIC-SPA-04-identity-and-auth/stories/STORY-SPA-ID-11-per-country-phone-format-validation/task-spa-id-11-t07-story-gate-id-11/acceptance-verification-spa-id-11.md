# Story acceptance gate — STORY-SPA-ID-11

- **Story:** Per-country phone format validation (M127)
- **Package:** `pkg-000024-20260630-epic-spa-04-id11-per-country-phone-format-validation.yaml`
- **Result:** PASS
- **Date:** 2026-06-30T13:08:15Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Датасет `PHONE_FORMAT_BY_COUNTRY` | PASS | `src/auth/phoneFormats.js` — 10 стран селектора; `phoneFormats.test.js` |
| `validatePhoneForCountry`/`formatPhoneForCountry`; EE OTP compat | PASS | `verificationFlowState.js` re-exports + `formatEstonianPhone`/`validateEstonianPhone` wrappers; `verificationFlowState.test.js` green |
| Смена страны → placeholder/длины/hint real-time | PASS | `PhoneInputPanel.jsx`; panel test M127 C; post-implement PNG `different-country-de-m127c` |
| Hint-сообщения локализованы и специфичны по стране | PASS | `phone.format.*` en/et/ru + `formatI18nMessage` |
| Все строки et/ru/en через `t()` | PASS | `identityDictionary.js` + `IDENTITY_FLAT_KEYS` parity |
| `npm run test:run` green; ≥3 стран | PASS | EE, DE, FI in `phoneFormats.test.js`; 343 tests pass |

## §UI (story gate — anchor T04)

| Check | Status | Evidence |
|-------|--------|----------|
| UI-0 pre-implement PNG | PASS | `task-spa-id-11-t04-.../ui-baseline/pre-implement/*.png` |
| UI-1 mockup spec (Path A) | PASS | `ui-mockup-spec.md` → mockup-127 |
| UI-3 post-implement PNG A–D | PASS | `ui-baseline/post-implement/valid-ee-m127a-1536x1024.png` (+ B/C/D) |
| Puppeteer gate | PASS | `npm run test:ui:country-format-m127`, `test:ui:verify-host` |

## Commands (live verification 2026-06-30)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:verify-host
cd spa-app && npm run test:ui:country-format-m127
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
