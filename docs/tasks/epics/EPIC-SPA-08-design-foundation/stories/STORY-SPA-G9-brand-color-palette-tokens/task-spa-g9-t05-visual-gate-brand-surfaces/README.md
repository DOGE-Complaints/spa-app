# SPA-G9-T05 — Visual gate brand surfaces

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** backlog FR-G9.6; D-G9-5; [STORY-UX-MOCKUP-BRIEF.md](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T01–T04  
**ui_scope:** `visual`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:45:25Z

## Purpose
Visual gate: board, filters, login, cabinet — night-blue canvas + Signal Orange accent; без layout-регрессий; `npm test` green.

## Risk
Layout shift; yellow remnants; CTA contrast missed on a surface.

## Code Facts (re-verify at execute)
- No Figma `@mockup:` — SSOT = Color Palette v1.0 + current SPA layout ([STORY-UX-MOCKUP-BRIEF.md](../STORY-UX-MOCKUP-BRIEF.md)).
- G8/G7 pattern: `ui-baseline/pre-implement` + `post-implement` + story-root `screenshots/` at close.
- UI-0..UI-3 per spa-ui-visual-pipeline / spa-story-execution-pipeline hard gates.

## AC / DoD
- [ ] (P0) Screenshots board / login / cabinet / filters show night-blue `#0B1320` canvas + orange `#F5A623` accent (brand parity).
- [ ] (P0) No material layout regressions vs baseline.
- [ ] (P0) `npm test` green (from `spa-app`).

## Where to change
- Screenshots / smoke notes; no new product features. Impl already in T01–T03.

## Out of scope
- INDEX Done / G4 note (T06). Story gate file (T07). Public-home layout.

## Verification
```bash
cd spa-app && npm test
# Manual: board + filters + login + cabinet screenshots 1536×1024
# Optional: npm run test:ui:board-shell if applicable
```

Gate: [`acceptance-verification-spa-g9-t05.md`](./acceptance-verification-spa-g9-t05.md)

Gate Date: 2026-08-02T08:59:09Z.
