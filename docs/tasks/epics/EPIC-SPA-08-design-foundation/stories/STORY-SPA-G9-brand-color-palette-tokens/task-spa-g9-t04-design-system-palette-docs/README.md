# SPA-G9-T04 — design-system §2.1 palette docs

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** backlog FR-G9.5; Documentation touchpoints design-system  
**Depends on:** T02 (hex SSOT settled)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:45:25Z

## Purpose
Обновить [design-system.md](../../../../../UX/design-system.md) §2.1: hex из палитры v1.0; ссылка на Color Palette v1.0; убрать «Yellow-500» как канон акцента; naming Signal Orange / DOGE Night.

## Risk
Doc drift: §2.1 останется Black-900 / Yellow-500 при runtime brand orange.

## Code Facts (re-verify at execute)
- [design-system.md](../../../../../UX/design-system.md) §2.1 still describes G4 charcoal/yellow naming (verified in backlog analysis 2026-08-02).
- Brand SSOT path: `backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md`.

## AC / DoD
- [ ] (P0) §2.1 hex/names reflect palette v1.0 (DOGE Night / Signal Orange).
- [ ] (P0) Link to Color Palette v1.0 present.
- [ ] (P0) «Yellow-500» not canonical accent.

## Where to change
- EXTEND `spa-app/docs/UX/design-system.md` §2.1

## Out of scope
- INDEX / G4 note / tokens header (T06). Runtime CSS (T01–T03).

## Verification
```bash
rg -n 'Yellow-500|Signal Orange|0B1320|F5A623|Color Palette' spa-app/docs/UX/design-system.md
```

Gate: [`acceptance-verification-spa-g9-t04.md`](./acceptance-verification-spa-g9-t04.md)

Gate Date: 2026-08-02T08:59:09Z.
