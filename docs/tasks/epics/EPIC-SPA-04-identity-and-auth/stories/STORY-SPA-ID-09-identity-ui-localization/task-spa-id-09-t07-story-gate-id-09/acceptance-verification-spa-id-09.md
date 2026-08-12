# Story acceptance gate — STORY-SPA-ID-09-identity-ui-localization

- **Story:** Identity UI Localization (et/ru/en retrofit)
- **Package:** `pkg-000020-20260629-epic-spa-04-id09-identity-ui-localization.yaml`
- **Result:** PASS
- **Date:** 2026-06-29

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Все строки identity-UI идут через `t()`; grep по dirs identity на инлайн-литералы → чисто (кроме технических). | PASS | T02–T05: LoginPage, SessionShell, AppShell, CivicStatusCard, PhoneVerification*, VerifyPage, DashboardPage use `useI18n()`; `verifyPage.waitlistHandoff` dev stub EN-only per backlog |
| Ключи §Translations добавлены в `UI_DICTIONARY` для et/ru/en. | PASS | `src/i18n/identityDictionary.js` (167 keys) merged in `dictionaries.js`; `findMissingIdentityDictionaryKeys()` → `[]` |
| Смена локали меняет весь identity-UI (логин/session/civic/phone/errors/verify/dashboard). | PASS | `LocaleSelector` on LoginPage + AppShell; `identityLocaleSnapshots.test.jsx` et/ru; Vitest component suites with locale |
| Канон-инварианты сохранены; запрещённых терминов нет ни в одном языке. | PASS | `scanIdentityDictionaryForbiddenTerms()` → `[]`; civic EN labels in dictionary match backlog §Translations |
| `npx vitest run` — green; добавлены l10n-тесты (полнота ключей + forbidden-terms). | PASS | `npm run test:run` — 294 passed; `identityDictionary.test.js`, `identityLocaleSnapshots.test.jsx` |

## Commands (live verification 2026-06-29)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
