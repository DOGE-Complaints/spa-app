# SPA-G11-T07 — StatusBadge hex → surface tokens

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T04–T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
F7 / FR-G11.6 / D-G11-3: StatusBadge backgrounds → surface / elevated / soft accent; borders → border*/accent-soft; **0** hardcoded hex backgrounds; keep class API + existing tests. (Note: `7e40e04` already tokenized text colors.)

## Risk
Badge specialty hex outside brand palette.

## Code Facts (re-verify at execute)
- [`StatusBadge.css`](../../../../../../../src/components/StatusBadge.css): backgrounds `#252932`…`#2a2a2a` still hardcoded; text may already use `--color-*` (`7e40e04`).
- Tests assert classes/labels, not colors.

## AC / DoD
- [ ] (P0) **0** hardcoded hex backgrounds in StatusBadge.css.
- [ ] (P0) Published border via brand accent tokens; class API unchanged.
- [ ] (P0) StatusBadge tests pass.
- [ ] (P0) Story AC: StatusBadge tokenized.

## Where to change
- EDIT `spa-app/src/components/StatusBadge.css`

## Out of scope
New status hex outside palette. JSX API change.

## Verification
```bash
rg -n '#[0-9a-fA-F]{3,8}' spa-app/src/components/StatusBadge.css
cd spa-app && npx vitest run -t StatusBadge
```

Gate: [`acceptance-verification-spa-g11-t07.md`](./acceptance-verification-spa-g11-t07.md)

**Completed:** 2026-08-02T12:42:17Z

Gate Date: 2026-08-02T12:42:17Z.
