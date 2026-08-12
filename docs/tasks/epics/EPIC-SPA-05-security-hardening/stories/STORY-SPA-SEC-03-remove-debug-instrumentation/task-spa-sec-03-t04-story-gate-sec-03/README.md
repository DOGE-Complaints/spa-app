# SPA-SEC-03-T04 — Story gate SEC-03

**Story:** [`../STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../STORY-SPA-SEC-03-remove-debug-instrumentation.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)  
**Depends on:** T01–T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Story acceptance gate: live verify all 3 story AC; produce `acceptance-verification-spa-sec-03.md`.

## Risk
Partial close leaves debug-ingest in bundle or broken auth.

## AC / DoD (maps to story AC)
- [ ] AC #1: `grep -rE 'ingest/4e2a7ee6|X-Debug-Session-Id' spa-app/src/` empty (T01).
- [ ] AC #2: auth tests green — `npm run test:run` (T03).
- [ ] AC #3: guard test fails on intentional reintro (T02).
- [ ] `acceptance-verification-spa-sec-03.md` filled per gate template.
- [ ] Story pipeline + bullrun → Done; pkg-000015 closed.

## Where to change
- This task folder: `acceptance-verification-spa-sec-03.md` (create at execute)
- [`STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../STORY-SPA-SEC-03-remove-debug-instrumentation.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)

## Out of scope
- SEC-02 credential boundary ADR. New telemetry framework.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
grep -rE 'ingest/4e2a7ee6|X-Debug-Session-Id' spa-app/src/; test $? -ne 0
```
