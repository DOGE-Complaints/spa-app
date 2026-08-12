# SPA-ID-12-T10 — Story gate ID-12

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T01–T09  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Story acceptance gate: verify all 8 story AC + Scope A–I; produce `acceptance-verification-spa-id-12.md`; close `pkg-000026`; sync bullrun + backlog INDEX.

## Risk
Partial close leaves M-7 open — blocks browser-submit product path.

## AC / DoD
- [ ] AC #1: draft_id GET preview + 401/404/E0 branches — T01,T05,T06,T09.
- [ ] AC #2: preview before verify; content hidden on verify — T06,T07,T08.
- [ ] AC #3: submit 202/403 auto-resubmit/401/503/404 — T01,T06,T07,T09.
- [ ] AC #4: no browser POST /story-drafts — T01,T06.
- [ ] AC #5: M-7 closed — T01.
- [ ] AC #6: editor removed; GPT URL — T04,T06.
- [ ] AC #7: /story/submit + cutover — T04.
- [ ] AC #8: L10N et/ru/en — T03,T08.
- [ ] `acceptance-verification-spa-id-12.md` per gate template.
- [ ] Story + bullrun + backlog INDEX → Done; pkg-000026 closed.

## Where to change
- This folder: `acceptance-verification-spa-id-12.md`
- [`STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

## Out of scope
Identity epic wave 6 closure.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```
