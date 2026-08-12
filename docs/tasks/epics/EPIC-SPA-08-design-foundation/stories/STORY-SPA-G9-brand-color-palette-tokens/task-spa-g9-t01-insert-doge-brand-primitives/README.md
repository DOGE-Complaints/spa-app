# SPA-G9-T01 — Insert `--doge-*` brand primitives

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** backlog FR-G9.1; D-G9-1; palette §6  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:45:25Z

## Purpose
Вставить в [`tokens.css`](../../../../../../../src/styles/tokens.css) полный блок brand primitives `--doge-*` = [DOGEstonia_Color_Palette_v1.0_RU.md](../../../../../backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md) §6 (байт-в-байт hex/rgba). Consumer `--color-*` в этом таске ещё не перепривязывать (T02).

## Risk
Частичный набор primitives → T02 маппинг сломается; hex drift vs palette SSOT.

## Code Facts (re-verify at execute)
- [tokens.css](../../../../../../../src/styles/tokens.css) exists; G4 `--color-*` with hex (`#141417` / `#f5c518`); **no** `--doge-*` yet.
- Palette §6 `:root` block lists `--doge-bg`, `--doge-accent`, `--doge-cream`, `--doge-white`, `--doge-ink`, surfaces, text, accent-hover/active/soft.

## AC / DoD
- [ ] (P0) Full `--doge-*` set from palette §6 present in `tokens.css` with identical hex/rgba.
- [ ] (P0) Existing `--color-*` values unchanged in this task (rebind = T02).
- [ ] (P0) Story AC trace: `--doge-*` в `tokens.css` совпадают с палитрой §6.

## Where to change
- EXTEND `spa-app/src/styles/tokens.css` (`:root` brand primitives block)

## Out of scope
- Rebind `--color-*` (T02). CTA CSS fixes (T03). Docs (T04/T06).

## Verification
```bash
rg -- '--doge-' spa-app/src/styles/tokens.css
# Diff hex against palette §6 block in DOGEstonia_Color_Palette_v1.0_RU.md
```

Gate: [`acceptance-verification-spa-g9-t01.md`](./acceptance-verification-spa-g9-t01.md)

Gate Date: 2026-08-02T08:59:09Z.
