# SPA-G11-T10 — RGBA pack C (board/chrome)

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T09  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
F8 / FR-G11.7 pack C: `index.css`, Filters, IssueCard, GptBridge → tokens.

## Risk
Pre-G9 rgba in board/chrome CSS.

## Code Facts (re-verify at execute)
- Hotspots: `src/index.css`, Filters, IssueCard, GptBridge (verify). Filters text may already use tokens (`7e40e04`).

## AC / DoD
- [ ] (P0) Board/chrome pack: no brand-family yellow/charcoal rgba leftovers.
- [ ] (P0) Ready for T11 inventory gate = 0 excl. tokens.css.

## Where to change
- EDIT `spa-app/src/index.css`, Filters.css, IssueCard.css, GptBridge.css

## Out of scope
Cabinet/auth packs. New brand hex.

## Verification
```bash
rg -n '245,197,24|20,20,23|255,214,0|199,166,70' spa-app/src/index.css spa-app/src/components/Filters spa-app/src/components/IssueCard spa-app/src/components/GptBridge
```

Gate: [`acceptance-verification-spa-g11-t10.md`](./acceptance-verification-spa-g11-t10.md)

**Completed:** 2026-08-02T12:42:17Z

Gate Date: 2026-08-02T12:42:17Z.
