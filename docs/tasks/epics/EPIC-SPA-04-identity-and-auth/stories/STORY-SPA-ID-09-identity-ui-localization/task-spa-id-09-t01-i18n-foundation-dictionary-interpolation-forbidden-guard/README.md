# SPA-ID-09-T01 — i18n foundation: dictionary, interpolation, forbidden guard

**Story:** [`../STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) §FR-09.2/09.4/09.5, §Translations  
**Depends on:** ID-01…05 Done (runtime exists)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:51:38Z

## Purpose
Add all identity UI translation keys from backlog §Translations to `UI_DICTIONARY` for et/ru/en. Introduce placeholder interpolation helper (`{n}`, `{seconds}`, `{prefix}`, `{status}`, `{timer}`). Extend forbidden-term scanning to all three locale dictionaries (ru/et/en).

## Risk
Missing keys cause `t()` to return raw key strings in production. Incomplete forbidden-term scan allows banned KYC language in ru/et copies.

## Code Facts (re-verify at execute)
- [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — board/issue keys only; no `auth.*` / `session.*` / `civic.*` / `phone.*` namespaces at intake.
- [`I18nProvider.jsx`](../../../../../../../../src/i18n/I18nProvider.jsx) L68-88 — `t(key)` resolves dot-paths; no placeholder substitution.
- [`phoneVerificationLabels.js`](../../../../../../../../src/components/PhoneVerification/phoneVerificationLabels.js) L11-27 — `findForbiddenVerificationTerm` scans runtime text against EN term list only.
- [`labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js) — existing key-parity pattern for board keys.

## AC / DoD
- [ ] (P0) All keys in story §Translations (`auth.*`, `session.*`, `appShell.*`, `civic.*`, `phone.*`, `phoneError.*`, `verifyPage.*`, `dashboard.*`) present in `UI_DICTIONARY.et`, `.ru`, `.en` with matching EN canon values (story AC #2, FR-09.2).
- [ ] (P0) `formatI18nMessage(template, vars)` (or equivalent) substitutes `{n}`, `{seconds}`, `{prefix}`, `{status}`, `{timer}` without string-concat hacks (FR-09.5).
- [ ] (P0) `scanIdentityDictionaryForbiddenTerms()` (or extended guard) returns no hits across et/ru/en dictionary values (story AC #4, FR-09.4).
- [ ] (P1) Unit tests for interpolation + forbidden scan on dictionary SSOT.

## Where to change
- `spa-app/src/i18n/dictionaries.js` — nested namespaces per §Translations
- New: `spa-app/src/i18n/formatI18nMessage.js` (or extend `core.js`)
- New/refactor: `spa-app/src/i18n/forbiddenVerificationTerms.js` (move terms from phone labels)
- `spa-app/src/i18n/__tests__/identityDictionary.test.js` (new)

## Out of scope
- Component wiring (T02–T05). Component-level vitest snapshots (T06).

## Verification
```bash
cd spa-app && npm run test:run -- src/i18n/__tests__/identityDictionary.test.js
```
