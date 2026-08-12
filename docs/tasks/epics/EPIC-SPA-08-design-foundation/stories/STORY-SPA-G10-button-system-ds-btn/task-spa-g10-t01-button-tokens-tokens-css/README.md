# SPA-G10-T01 — Button tokens in tokens.css

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.7: добавить button tokens (height/radius/focus/accent-on-primary text) в `tokens.css` — extend G9, без fork palette.

## Risk
Без токенов Button CSS уйдёт в raw hex / page-local sizes.

## Code Facts (re-verify at execute)
- [`src/styles/tokens.css`](../../../../../../src/styles/tokens.css) has `--doge-*` / `--color-accent-*` (G9/G11).
- Button-specific control-height / focus / on-primary text tokens — verify at execute (likely missing).

## AC / DoD
- [x] (P0) Button tokens for radius / focus / control-height S/M/L / accent-on-primary text in `tokens.css`.
- [x] (P0) Colors alias G9 `--color-accent-*` / `--doge-*`; no new brand hex.
- [x] (P0) Trace FR-G10.7.

## Where to change
- EDIT `spa-app/src/styles/tokens.css`
- Spec: `docs/UX/design-system-buttons-spec.md` token sections

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n 'control-height|button|focus-ring|accent-on' spa-app/src/styles/tokens.css | head
```

Gate: [`acceptance-verification-spa-g10-t01.md`](./acceptance-verification-spa-g10-t01.md)
