# SPA-ID-07-T08 — Story gate ID-07

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [mockup-123](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md)  
**Depends on:** T01–T07  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
Story acceptance gate: verify all 6 story AC + FR-07.1–07.7; produce `acceptance-verification-spa-id-07.md`; close pkg-000022 in index; sync backlog INDEX.

## Risk
Partial close leaves `/verify` waitlist stub — blocks ID-08 consumers and breaks ID-05 handoff promise.

## AC / DoD (maps to story AC)
- [ ] AC #1: 4 states (not-supported / form / joined / error) — T03–T06, T07.
- [ ] AC #2: Country pre-filled editable; email required — T04, T06, T07.
- [ ] AC #3: Joined explicit; no account/phone/profile created — T04, T02, T07.
- [ ] AC #4: Distinct waitlist errors + Retry — T05, T02, T07.
- [ ] AC #5: `POST /waitlist` behind feature flag — T02, T07.
- [ ] AC #6: All strings localized et/ru/en — T01, T03–T05, T07.
- [ ] `acceptance-verification-spa-id-07.md` filled per gate template (**Date:** post live-run only).
- [ ] Story pipeline + bullrun + [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) → Done; pkg-000022 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-07.md` (create at P3 execute)
- [`STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md) — Status/AC sync

## Out of scope
- ID-08 GPT bridge. Live waitlist API E2E. IP geo.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run dev
# manual: /#/verify — COUNTRY_NOT_ALLOWED → M123 A–D; locale switch et/ru/en
```
