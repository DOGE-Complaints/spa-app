# SPA-SEC-01-T06 — Story gate SEC-01

**Story:** [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md); [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Story acceptance gate: live verify all 4 story AC; produce `acceptance-verification-spa-sec-01.md`.

## Risk
Partial close leaves service_role in env or bundle.

## AC / DoD (maps to story AC)
- [ ] AC #1: `grep SERVICE_ROLE spa-app/.env*` empty; bundle scan clean (T01 + T04).
- [ ] AC #2: guard test fails on intentional `VITE_*SERVICE_ROLE*` (T03).
- [ ] AC #3: `.env.example` warning present (T02).
- [ ] AC #4: rotation decision recorded + SEC-04 sync noted (T05).
- [ ] `acceptance-verification-spa-sec-01.md` filled per gate template.
- [ ] Story pipeline + bullrun → Done; pkg-000014 closed.

## Where to change
- This task folder: `acceptance-verification-spa-sec-01.md` (create at execute)
- [`STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md) — checkboxes + Status
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)

## Out of scope
- SPA-SEC-02 / SPA-SEC-03 stories.
- Debug instrumentation removal (SEC-03).

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run
cd spa-app && npm run build && grep -r service_role dist/assets/*.js; test $? -ne 0
grep -R SERVICE_ROLE spa-app/.env*; test $? -ne 0
```
