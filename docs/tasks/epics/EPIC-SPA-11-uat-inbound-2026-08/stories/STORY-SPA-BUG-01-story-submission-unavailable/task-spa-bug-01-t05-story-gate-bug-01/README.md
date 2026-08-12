# SPA-BUG-01-T05 — Story gate BUG-01

**Status:** Done — P3 gate PASS 2026-08-07T10:51:56Z · **P6 T07** FR narrow synced 2026-08-07T11:18:08Z · F5 CLOSED  
**Story:** [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md) FR-BUG-01.5 · all AC  
**Depends on:** SPA-BUG-01-T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T19:21:54Z  
**Package:** `pkg-000053`

## Purpose
Story acceptance gate: все FR-BUG-01.* / backlog AC checked; FE-HANDOFF-03 Pass; Status Done **только** после gate PASS. Template: [story-acceptance-gate-template.md](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).

## Risk
False Done на P0 demo blocker.

## Code Facts (re-verify at execute)
- Pipeline AC/FR: [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md) (verbatim from backlog).
- T01 evidence · T02 pin · T03 fix · T04 regression.
- Gate artifact at close: `acceptance-verification-spa-bug-01.md` in this folder (create on P3 — not P1).

## AC / DoD
- [x] (P0) All five backlog AC rows PASS with evidence paths → FR-BUG-01.1–01.5.
- [x] (P0) FE-HANDOFF-03 Pass documented.
- [x] (P0) Gate `Date:` from `--print-utc-now` after live verify; `--verify --check-dates` before Done.
- [x] (P0) Pipeline + backlog Meta Status → Done only after this gate.

## Where to change
- `acceptance-verification-spa-bug-01.md` (P3)
- Pipeline / backlog Status; bullrun sync

## Out of scope
HL/PH stories; new AC invented beyond backlog.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
# Checklist FR-BUG-01 + UAT FE-HANDOFF-03 against T01–T04 evidence
```
