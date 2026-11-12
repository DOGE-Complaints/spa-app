# SPA-SSR-02-T07 — showMore / collapse evidence + bound doc (F2)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-02-schema-card-overlay.md`](../STORY-SPA-SSR-02-schema-card-overlay.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-02-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-02-execution-2026-09-02.md) §F2  
**Depends on:** SPA-SSR-02-T05 Done · T06 Edge many preferred first  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-02T20:13:25Z  
**Done:** 2026-09-02T20:30:25Z  
**Package:** `pkg-000075` **unchanged** · wave `spa_ssr_02_audit_2026_09_02`

## Purpose
Prove compact collapse@4 (`schema-card-overlay-more`) in vitest; document bound=4 vs M141 «up to 3» in T01 `ui-mockup-spec.md`. Prefer evidence+doc over new Link/button (do not reopen happy AC).

## Risk
Mandatory interactive affordance that changes product DoD; invent fields; mixing BUG pkgs.

## Code Facts (re-verify at execute)
- `COMPACT_COLLAPSE_AFTER = 4` · showMore as `<p>`: [`SchemaCardOverlay.jsx`](../../../../../../../src/components/SchemaCardOverlay/SchemaCardOverlay.jsx)
- Tests: [`SchemaCardOverlay.test.jsx`](../../../../../../../src/components/SchemaCardOverlay/__tests__/SchemaCardOverlay.test.jsx) — collapse case **absent** at scaffold
- Spec: [`../task-spa-ssr-02-t01-overlay-compact-card/ui-mockup-spec.md`](../task-spa-ssr-02-t01-overlay-compact-card/ui-mockup-spec.md)

## Gap
Audit F2 Low — progressive disclosure unrealized / bound unproven.

## AC / DoD
- [x] (P0) Vitest: >4 leaves → `schema-card-overlay-more` present; ≤4 → absent
- [x] (P0) Document bound=4 vs M141 recommend 3 in `ui-mockup-spec.md` (intentional disk bound)
- [x] (P0) No invent fields; no mandatory Link unless trivial one-liner (prefer skip)

## Where to change
- `SchemaCardOverlay.test.jsx` · T01 `ui-mockup-spec.md` (notes only)

## Out of scope
SSR-03 · reopen happy AC · git push · F1 harness (T06) · F3 INDEX (T08)

## Verification
```bash
cd spa-app && npx vitest run src/components/SchemaCardOverlay
rg -n 'COMPACT_COLLAPSE|bound|4' spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t01-overlay-compact-card/ui-mockup-spec.md
```
