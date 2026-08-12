# SPA-ID-02-T07 — Story gate ID-02

**Story:** [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md); [mockup-124](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Story acceptance gate: live verify all 4 story AC + M124 visual spot-check; produce `acceptance-verification-spa-id-02.md`.

## Risk
Partial close leaves missing shell state or public-board regression.

## AC / DoD (maps to story AC)
- [ ] AC #1: 5 shell states map to runtime signals (T01, T03, T04, T05).
- [ ] AC #2: shell always visible; no white screen/collapse (T02, T05).
- [ ] AC #3: recovery CTA on each state; friendly tone (T03, T04).
- [ ] AC #4: no tokens/raw session in UI (T01, T03, T04).
- [ ] `acceptance-verification-spa-id-02.md` filled per gate template.
- [ ] Story pipeline + bullrun → Done; pkg-000016 closed.

## Where to change
- This task folder: `acceptance-verification-spa-id-02.md` (create at execute)
- [`STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../backlog-stories/INDEX.md)

## Out of scope
- ID-03 Civic Status. ID-05 verify errors. SEC-02 ADR.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run dev
# manual: trigger each shell state A–E per acceptance-verification checklist
```
