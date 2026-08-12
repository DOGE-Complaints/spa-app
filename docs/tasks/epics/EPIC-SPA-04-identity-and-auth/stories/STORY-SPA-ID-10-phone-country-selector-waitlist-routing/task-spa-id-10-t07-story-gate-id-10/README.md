# SPA-ID-10-T07 — Story gate ID-10

**Story:** [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md); [story-acceptance-gate-template.md](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T10:51:01Z

## Purpose
Story acceptance gate: verify all 8 story AC + FR-10.1–10.7; close ID-07 F1/F2; produce `acceptance-verification-spa-id-10.md`; sync backlog INDEX + bullrun.

## Risk
Partial close leaves waitlist unreachable via UI (F1) or country from dial not choice (F2).

## AC / DoD (maps to story AC)
- [ ] AC #1: Country selector, EE default — T03, T06.
- [ ] AC #2: `isSupportedDialPrefix` +372 mirror — T01, T06.
- [ ] AC #3: EE OTP happy-path — T04, T05, T06.
- [ ] AC #4: Unsupported notice + Join Waitlist, no `/auth/phone/request` — T04, T06.
- [ ] AC #5: Waitlist country from choice; phone not stored — T05, T06.
- [ ] AC #6: Backend COUNTRY_NOT_ALLOWED fallback — T05, T06.
- [ ] AC #7: L10N et/ru/en — T02, T06.
- [ ] AC #8: `npm run test:run` green — T06.
- [ ] `acceptance-verification-spa-id-10.md` per gate template (**Date:** post live-run only).
- [ ] Story pipeline + bullrun + backlog INDEX → Done; pkg-000023 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-10.md` (create at P3 execute)
- [`STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)

## Out of scope
- ID-11 per-country validation. ID-08 GPT bridge.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:verify-host
# manual: /#/verify — EE OTP path; DE → Join Waitlist → M123 with Germany pre-fill
```
