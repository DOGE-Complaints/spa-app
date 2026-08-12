# SPA-G4-T05 — Typography CSS vars + G7 seam

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** backlog §FR-G4.4 / T06 backlog, D-G4-4; G7 handoff  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T16:01:20Z
**Completed:** 2026-07-28T16:20:38Z

## Purpose
Подключить typography CSS variables на `body`/base (`--font-family-base`, size/weight из tokens); задокументировать seam G4↔G7. **Без** `@font-face` / font files.

## Risk
G7 не сможет опереться на vars; или случайно добавят font assets в G4.

## Code Facts (re-verify at execute)
- Typography names already in `tokens.css` from T01/T02.
- Current `body` font likely hardcoded in `index.css` — switch to vars.
- G7 backlog depends on G4 (design-foundation INDEX).

## AC / DoD
- [ ] (P0) `body` / base use `--font-family-base` and related size/weight vars.
- [ ] (P0) No `@font-face` and no font binary files added.
- [ ] (P1) Short note in task or story: G7 owns font loading / brand typeface.

## Where to change
- `spa-app/src/styles/tokens.css` (typography values if needed)
- `spa-app/src/index.css` (body rules)
- Docs note optional under this task

## Out of scope
- `@font-face`, font files, brand typeface choice (G7). Spacing migration.

## Verification
```bash
rg 'font-family|--font-family' spa-app/src/index.css spa-app/src/styles/tokens.css
rg '@font-face' spa-app/src --glob '*.css' || true
```

Gate: [`acceptance-verification-spa-g4-t05.md`](./acceptance-verification-spa-g4-t05.md)
