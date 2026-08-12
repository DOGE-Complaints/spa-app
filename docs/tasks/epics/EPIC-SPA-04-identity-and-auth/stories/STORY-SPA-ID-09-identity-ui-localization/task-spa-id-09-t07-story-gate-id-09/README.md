# SPA-ID-09-T07 — Story gate ID-09

**Story:** [`../STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [l10n-coverage-identity-auth-2026-06-29.md](../../../../../../analysis/l10n-coverage-identity-auth-2026-06-29.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:51:38Z

## Purpose
Story acceptance gate: verify all 5 story AC + FR-09.1–09.7; produce `acceptance-verification-spa-id-09.md`; close pkg-000020 in index; sync backlog INDEX.

## Risk
Partial close leaves identity UI EN-only on default `et` locale — visible product defect.

## AC / DoD (maps to story AC)
- [x] AC #1: All identity UI strings via `t()`; grep identity dirs clean (except technical) — T02–T05, T06.
- [x] AC #2: §Translations keys in UI_DICTIONARY et/ru/en — T01, T06.
- [x] AC #3: Locale switch updates login/session/civic/phone/errors/verify/dashboard — T02–T05, T03 locale UX.
- [x] AC #4: Civic EN canon preserved; forbidden terms absent all langs — T01, T04, T05, T06.
- [x] AC #5: `npm run test:run` green + l10n tests — T06.
- [x] `acceptance-verification-spa-id-09.md` filled per gate template (**Date:** post live-run only).
- [x] Story pipeline + bullrun + [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) → Done; pkg-000020 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-09.md` (create at P3 execute)
- [`STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) — Status/AC sync (post-audit style)

## Out of scope
- ID-06/07/08 features. Native date-picker l10n. SMS backend texts.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
# manual: /login, /verify, /dashboard — switch et/ru/en, confirm all copy updates
```
