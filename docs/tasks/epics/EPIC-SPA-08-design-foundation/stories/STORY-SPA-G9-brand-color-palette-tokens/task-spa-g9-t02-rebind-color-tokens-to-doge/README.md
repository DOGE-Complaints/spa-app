# SPA-G9-T02 — Rebind `--color-*` → `var(--doge-*)`

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** backlog FR-G9.2 / FR-G9.3; D-G9-2…4; mapping table  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:45:25Z

## Purpose
Перепривязать все существующие `--color-*` (кроме danger/success) к `var(--doge-*)` по таблице маппинга story; добавить `--color-accent-hover`, `--color-text-warm`; surface/elevated; пересчитать `--color-border-subtle` на базе `--doge-*`.

## Risk
Оставить литералы hex на `--color-*` или тронуть danger/success; undefined new semantics.

## Code Facts (re-verify at execute)
- After T01: `--doge-*` exist in [tokens.css](../../../../../../../src/styles/tokens.css).
- Current aliases: `--color-surface-elevated`, `--color-surface`, `--color-text-muted`, `--color-border-subtle`, `--color-border`.
- Mapping table in pipeline story Meta / Scope.

## AC / DoD
- [ ] (P0) `--color-*` (кроме `--color-danger` / `--color-success`) = `var(--doge-*)` per mapping table.
- [ ] (P0) `--color-accent-hover` and `--color-text-warm` added.
- [ ] (P0) `--color-border-subtle` recalculated for night bg (not unreviewed `rgba(245,247,250,0.08)`).
- [ ] (P0) Component CSS need not mass-rename `var(--color-*)` (FR-G9.3).

## Where to change
- EXTEND `spa-app/src/styles/tokens.css` (consumer `--color-*` block)

## Out of scope
- Component CTA contrast (T03). design-system.md (T04). danger/success.

## Verification
```bash
rg 'color-(bg|text|accent|border|surface)' spa-app/src/styles/tokens.css
rg 'color-danger|color-success' spa-app/src/styles/tokens.css
```

Gate: [`acceptance-verification-spa-g9-t02.md`](./acceptance-verification-spa-g9-t02.md)

Gate Date: 2026-08-02T08:59:09Z.
