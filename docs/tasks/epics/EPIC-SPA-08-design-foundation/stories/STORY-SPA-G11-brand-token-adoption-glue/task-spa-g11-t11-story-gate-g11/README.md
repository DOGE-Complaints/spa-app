# SPA-G11-T11 — Story gate G11

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T01–T10  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
FR-G11.8–9: story acceptance-verification — inventory `rg` brand-family = 0 excl. tokens.css; vitest green; StatusBadge tests; INDEX/dashboard G11 Done; reaudit F3–F8 → addressed by G11; G9 remains Done. Optional visual smoke.

## Risk
Partial AC without gate evidence; dating gate before live verify.

## Code Facts (re-verify at execute)
- Template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)
- Gate file: `acceptance-verification-spa-g11.md` (create/fill at execute close).

## AC / DoD
- [ ] (P0) All seven story AC PASS with evidence.
- [ ] (P0) `rg` brand-family hex/rgba in `src/**/*.css` excl. `tokens.css` = **0**.
- [ ] (P0) Vitest green; StatusBadge class tests pass.
- [ ] (P0) INDEX + spa-mvp-dashboard G11 Done; reaudit pointer; pipeline/backlog Status Done; epic Wave 5 Done.
- [ ] (P0) Gate PASS with Date from `--print-utc-now` after live verify.

## Where to change
- NEW/FILL `acceptance-verification-spa-g11.md`; sync INDEX, bullrun, epic, reaudit note, dashboard

## Out of scope
New product CSS beyond evidence. Reopen G9. G10 Button.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --print-utc-now
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test
# Fill acceptance-verification-spa-g11.md from template
```

Gate: [`acceptance-verification-spa-g11.md`](./acceptance-verification-spa-g11.md)

**Completed:** 2026-08-02T12:55:51Z

Gate Date: 2026-08-02T12:55:51Z.
