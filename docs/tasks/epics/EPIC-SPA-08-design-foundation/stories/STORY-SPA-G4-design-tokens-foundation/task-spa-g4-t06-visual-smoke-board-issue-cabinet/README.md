# SPA-G4-T06 — Visual smoke board + issue + cabinet

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** backlog §FR-G4.6, T07 backlog  
**Depends on:** T03, T04, T05  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T16:01:20Z
**Completed:** 2026-07-28T16:20:38Z

## Purpose
Visual gate: smoke board, issue-details, cabinet; before/after parity; `npm test` green. No layout regression from token migration.

## Risk
Silent color/layout regressions after mass hex→var.

## Code Facts (re-verify at execute)
- No `@mockup:` PNG artboard — SSOT is design-system §2 + live UI.
- Capture before/after under task evidence or `docs/UX` per project norms if required.
- Prefer existing board/cabinet smoke runners if present; else manual + Vitest.

## AC / DoD
- [ ] (P0) FR-G4.6: visual smoke board + issue-details + cabinet — no layout regression vs pre-migration.
- [ ] (P0) Before/after evidence recorded (screenshots or documented compare).
- [ ] (P0) `npm test` green.

## Where to change
- Evidence only (screenshots / notes). Code fixes only if migration broke layout (minimal).

## Out of scope
- New palette redesign. Spacing token migration. Story doc Done (T07).

## Verification
```bash
cd spa-app && npm test -- --run
# plus board / issue / cabinet visual smoke per project runners
```

Gate: [`acceptance-verification-spa-g4-t06.md`](./acceptance-verification-spa-g4-t06.md)
