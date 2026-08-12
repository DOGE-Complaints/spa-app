# SPA-ID-11-T07 — Story gate ID-11

**Story:** [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md); [story-acceptance-gate-template.md](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T12:50:19Z
**Status:** Done
**Completed:** 2026-06-30T13:08:15Z

## Purpose
Story acceptance gate: verify all 6 story AC + FR-11.1–11.7; produce `acceptance-verification-spa-id-11.md`; sync backlog INDEX + bullrun; close `pkg-000024`.

## Risk
Partial close leaves EE-only validation in production path or missing L10N keys.

## AC / DoD (maps to story AC)
- [x] AC #1: `PHONE_FORMAT_BY_COUNTRY` dataset — T01, T06.
- [x] AC #2: `validatePhoneForCountry`/`formatPhoneForCountry`; EE OTP compat — T02, T05, T06.
- [x] AC #3: Country change → placeholder/lengths/hint real-time — T04, T06.
- [x] AC #4: Localized country-specific hints — T03, T04, T06.
- [x] AC #5: All strings et/ru/en via `t()` — T03, T06.
- [x] AC #6: `npm run test:run` green; ≥3 countries — T06.
- [x] `acceptance-verification-spa-id-11.md` per gate template (**Date:** post live-run only).
- [x] Story pipeline + bullrun + backlog INDEX → Done; pkg-000024 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-11.md` (create at P3 execute)
- [`STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md)

## Out of scope
- libphonenumber dependency. SMS provider. Backend supported-countries expansion.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:verify-host
# manual: /#/verify — EE valid/invalid; DE placeholder; unsupported optional phone
```
