# SPA-ID-09-T06 — L10n tests: key parity, forbidden terms, snapshots

**Story:** [`../STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) FR-09.7; story AC #5  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:51:38Z

## Purpose
Add Vitest coverage proving identity dictionary completeness across et/ru/en, forbidden-term absence in all locales, and key screen renders under `ru` and `et` locales.

## Risk
Regression reintroduces missing keys or banned terminology without CI signal.

## Code Facts (re-verify at execute)
- [`labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js) — board key parity pattern.
- [`I18nProvider.langSync.test.jsx`](../../../../../../../../src/i18n/__tests__/I18nProvider.langSync.test.jsx) — locale switch behavior.
- Story AC #5 — `npx vitest run` green + l10n tests.

## AC / DoD
- [ ] (P0) Test: every identity namespace key exists in et, ru, en (no `t()` miss returning raw key) (story AC #5, FR-09.7).
- [ ] (P0) Test: forbidden terms scan passes on all `UI_DICTIONARY` values for identity namespaces (story AC #4, #5).
- [ ] (P1) Render/snapshot tests: LoginPage, CivicStatusCard, PhoneVerificationFlow (or error panel) with `locale='ru'` and `locale='et'` (FR-09.7).
- [ ] (P1) Optional grep guard test: no new inline EN user strings in identity dirs (story AC #1).

## Where to change
- `spa-app/src/i18n/__tests__/identityDictionary.test.js` (extend from T01)
- `spa-app/src/i18n/__tests__/identityLocaleSnapshots.test.jsx` (new)
- Update existing component tests as needed

## Out of scope
- Puppeteer E2E (optional follow-up). Story gate doc (T07).

## Verification
```bash
cd spa-app && npm run test:run
```
