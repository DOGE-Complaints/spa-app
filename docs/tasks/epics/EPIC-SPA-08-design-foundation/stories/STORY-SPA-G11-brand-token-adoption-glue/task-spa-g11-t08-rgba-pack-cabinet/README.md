# SPA-G11-T08 — RGBA pack A (cabinet)

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
F8 / FR-G11.7 pack A: migrate legacy yellow/charcoal rgba in Wallet, Contribution, Civic, StoryActivity, UserCabinet → tokens / color-mix / surface.

## Risk
Pre-G9 rgba in cabinet CSS.

## Code Facts (re-verify at execute)
- Hotspots: Wallet / Contribution / Civic / StoryActivity / UserCabinetPage CSS (verify brand-family rgba counts).

## AC / DoD
- [ ] (P0) Cabinet pack files: no brand-family yellow/charcoal rgba leftovers (per D-G11-4).
- [ ] (P0) Partial progress toward story inventory gate (full gate = T11).

## Where to change
- EDIT cabinet CSS listed in backlog §C

## Out of scope
Auth/board packs (T09–T10). danger/success.

## Verification
```bash
rg -n '245,197,24|20,20,23|27,28,31' spa-app/src/components/Wallet spa-app/src/components/Contribution spa-app/src/components/CivicStatus spa-app/src/components/StoryActivity spa-app/src/pages/UserCabinetPage.css
```

Gate: [`acceptance-verification-spa-g11-t08.md`](./acceptance-verification-spa-g11-t08.md)

**Completed:** 2026-08-02T12:42:17Z

Gate Date: 2026-08-02T12:42:17Z.
