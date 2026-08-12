# SPA-G11-T09 — RGBA pack B (auth/identity)

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T08  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
F8 / FR-G11.7 pack B: Login, Phone, SessionShell, StoryHandoff, CountryWaitlist → tokens.

## Risk
Pre-G9 rgba in auth/identity CSS.

## Code Facts (re-verify at execute)
- Hotspots: LoginPage, PhoneVerification*, SessionShellState, StoryHandoff, CountryWaitlist (verify).

## AC / DoD
- [ ] (P0) Auth/identity pack: no brand-family yellow/charcoal rgba leftovers.
- [ ] (P0) Partial inventory toward T11 gate.

## Where to change
- EDIT identity/auth CSS listed in backlog §C

## Out of scope
Cabinet/board packs. G10.

## Verification
```bash
rg -n '245,197,24|20,20,23|255,214,0' spa-app/src/pages/LoginPage.css spa-app/src/components/PhoneVerification spa-app/src/components/SessionShellState spa-app/src/components/StoryHandoff spa-app/src/components/CountryWaitlist
```

Gate: [`acceptance-verification-spa-g11-t09.md`](./acceptance-verification-spa-g11-t09.md)

**Completed:** 2026-08-02T12:42:17Z

Gate Date: 2026-08-02T12:42:17Z.
