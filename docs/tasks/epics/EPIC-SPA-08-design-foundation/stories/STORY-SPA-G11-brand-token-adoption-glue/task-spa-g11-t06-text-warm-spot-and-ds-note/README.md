# SPA-G11-T06 — Spot text-warm + design-system note

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T04–T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
FR-G11.5: spot-apply `--color-text-warm` where UI cream/warm secondary fits; document Do/Don't in design-system (не форсировать на весь secondary).

## Risk
Warm token unused → cream copy stays generic secondary.

## Code Facts (re-verify at execute)
- `--color-text-warm` / `--doge-text-warm` defined; `var(--color-text-warm)` outside tokens = 0 (verify).

## AC / DoD
- [ ] (P0) At least one justified spot use of `--color-text-warm` where cream copy fits.
- [ ] (P0) design-system §2.1 Do/Don't for warm text.
- [ ] (P0) Story AC: warm usage documented.

## Where to change
- EDIT selected component CSS; EDIT `docs/UX/design-system.md`

## Out of scope
Force warm on all secondary text. G10.

## Verification
```bash
rg -n 'text-warm|doge-cream' spa-app/src --glob '*.css'
```

Gate: [`acceptance-verification-spa-g11-t06.md`](./acceptance-verification-spa-g11-t06.md)

**Completed:** 2026-08-02T12:42:17Z

Gate Date: 2026-08-02T12:42:17Z.
