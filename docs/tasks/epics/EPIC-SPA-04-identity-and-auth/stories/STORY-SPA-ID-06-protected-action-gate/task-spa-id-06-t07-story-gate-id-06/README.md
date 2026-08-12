# SPA-ID-06-T07 — Story gate ID-06

**Story:** [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [mockup-122](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T18:55:30Z

## Purpose
Story acceptance gate: verify all 6 story AC + FR-06.1–06.9; produce `acceptance-verification-spa-id-06.md`; close pkg-000021 in index; sync backlog INDEX.

## Risk
Partial close leaves `/story/compose` as placeholder or broken lazy-gate — blocks Wave 3 ID-07/08 consumers.

## AC / DoD (maps to story AC)
- [x] AC #1: Compose without verify; gate only on Submit when `phone_verified=false` — T03, T04, T05, T06.
- [x] AC #2: Draft saved before verify; explicit not-lost UX — T02, T04, T06.
- [x] AC #3: Resume same draft + successful submit after verify — T02, T05, T06.
- [x] AC #4: `verification_required` on submit handled when local true — T02, T05, T06.
- [x] AC #5: Verify-flow reused from ID-04 — T05, T06.
- [x] AC #6: All strings localized et/ru/en via `t()` — T01, T03–T05, T06.
- [x] `acceptance-verification-spa-id-06.md` filled per gate template (**Date:** post live-run only).
- [x] Story pipeline + bullrun + [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) → Done; pkg-000021 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-06.md` (create at P3 execute)
- [`STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md) — Status/AC sync

## Out of scope
- ID-07 waitlist. ID-08 GPT. M110 full composer.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run dev
# manual: /story/compose — states A–E per M122; locale switch et/ru/en
```
