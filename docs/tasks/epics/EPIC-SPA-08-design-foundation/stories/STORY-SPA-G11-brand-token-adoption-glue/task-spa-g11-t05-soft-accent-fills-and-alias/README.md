# SPA-G11-T05 — Soft accent fills + optional alias

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
FR-G11.4 / D-G11-4: soft accent fills → `--doge-accent-soft` (or consumer `--color-accent-soft` alias in tokens); Wallet primary soft и аналоги.

## Risk
Legacy yellow rgba soft fills vs brand soft token.

## Code Facts (re-verify at execute)
- `--doge-accent-soft` in tokens; Wallet/etc still old yellow rgba soft (verify at execute).

## AC / DoD
- [ ] (P0) Soft accent fills use `--doge-accent-soft` and/or `--color-accent-soft`.
- [ ] (P0) Optional `--color-accent-soft` alias added in `tokens.css` if used by consumers.
- [ ] (P0) Story AC: soft fills tokenized.

## Where to change
- EXTEND `spa-app/src/styles/tokens.css` (optional alias); EDIT Wallet/Contribution/etc soft fill CSS

## Out of scope
Full rgba packs T08–T10 beyond soft fills. New palette colors.

## Verification
```bash
rg -n 'accent-soft|245,197,24|255,214,0' spa-app/src --glob '*.css' | head -40
```

Gate: [`acceptance-verification-spa-g11-t05.md`](./acceptance-verification-spa-g11-t05.md)

**Completed:** 2026-08-02T12:42:17Z

Gate Date: 2026-08-02T12:42:17Z.
