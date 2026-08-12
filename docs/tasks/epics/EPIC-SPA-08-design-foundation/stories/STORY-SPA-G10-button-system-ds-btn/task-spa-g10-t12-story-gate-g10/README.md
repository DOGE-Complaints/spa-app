# SPA-G10-T12 — Story gate G10 (visual + AC §43)

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T01…T11  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
Visual gate vs M134 semantics (not pixel PNG artifacts); story acceptance AC §43 + backlog AC checklist; INDEX G10 → Done.

## Risk
Story Done без gate → false close.

## Code Facts (re-verify at execute)
- SSOT visual: design-system-buttons-spec.md + PNG; mockup-134.md absent (non-blocking).
- Gate template: story-acceptance-gate-template.md.

## AC / DoD
- [x] (P0) All story AC checkboxes evidenced PASS.
- [x] (P0) Visual gate PASS vs M134 semantics.
- [x] (P0) Spec §43 AC satisfied; INDEX G10 → Done; vitest green.

## Where to change
- FILL `acceptance-verification-spa-g10.md`
- Screenshots under story `screenshots/` if required by UI pipeline
- Sync INDEX / bullrun / epic Status

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run --pool=forks --maxWorkers=2
```

Gate: [`acceptance-verification-spa-g10.md`](./acceptance-verification-spa-g10.md)
