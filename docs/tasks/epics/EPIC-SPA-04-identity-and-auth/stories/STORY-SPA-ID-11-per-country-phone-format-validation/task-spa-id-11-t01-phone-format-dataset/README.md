# SPA-ID-11-T01 — phone format dataset (PHONE_FORMAT_BY_COUNTRY)

**Story:** [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md) §«Что собрать», FR-11.1; [mockup-127 §5](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md)  
**Depends on:** STORY-SPA-ID-10 Done (`pkg-000023`)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T12:50:19Z
**Status:** Done
**Completed:** 2026-06-30T13:08:15Z

## Purpose
Create SSOT `PHONE_FORMAT_BY_COUNTRY` for every country in ID-10 selector: `{ dialPrefix, nationalNumberLengths, pattern, examplePlaceholder, validationHint }` per M127 §5.

## Risk
Incomplete dataset blocks per-country UI hints and validation; EE/DE mismatch with M127 breaks visual gate.

## Code Facts (re-verify at execute)
- [`countriesDataset.js`](../../../../../../../../src/utils/countriesDataset.js) — 10 `COUNTRIES`; `isSupportedDialPrefix` (`+372` only).
- [`verificationFlowState.js:24`](../../../../../../../../src/auth/verificationFlowState.js#L24) — `ESTONIAN_PHONE_PATTERN` only; no format dataset.
- Story examples — EE `[7,8]` pattern `#### ####`; DE `[10,11]` pattern `#### ########`.

## AC / DoD
- [x] (P0) Export `PHONE_FORMAT_BY_COUNTRY` covering all `COUNTRIES` codes (FR-11.1, AC #1).
- [x] (P0) EE + DE records match M127 §5 table (dialPrefix, lengths, pattern, examplePlaceholder).
- [x] (P1) Each entry links `countryCode` to ID-10 dataset; `supported` mirrors `isSupportedDialPrefix`.
- [x] (P1) Unit test: sample lookup EE/DE + unknown code guard.

## Where to change
- New: `spa-app/src/auth/phoneFormats.js` (or `phoneFormatDataset.js`)
- New: `spa-app/src/auth/__tests__/phoneFormats.test.js`

## Out of scope
- `validatePhoneForCountry` implementation (T02). Panel UI (T04). i18n strings (T03).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/phoneFormats.test.js
```
