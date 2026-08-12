# SPA-G4-T07 — Story gate G4

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** backlog §T08 + story AC/DoD; docs touchpoints  
**Depends on:** T01–T06  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T16:01:20Z
**Completed:** 2026-07-28T16:20:38Z

## Purpose
Story acceptance gate: all AC/DoD; обновить design-system §2, reusable-ui L0, gap-report §G4, design-foundation INDEX → Done; bullrun Primary advance.

## Risk
Story Done без doc sync оставит SSOT/gap-report ложью.

## Code Facts (re-verify at execute)
- Touchpoints: `docs/UX/design-system.md` §2, reusable-ui L0, `docs/analysis/spa-app-doc-code-gap-report.md` §G4, `backlog-stories/design-foundation/INDEX.md`, bullrun INDEX.
- Backlog file remains (do not delete).

## AC / DoD (story rollup)
- [ ] (P0) tokens.css + first import (T01+T02).
- [ ] (P0) Token→hex + drift collapse + status colors (T02).
- [ ] (P0) Component CSS `var(--color-*)` on D-G4-2 surface (T03+T04).
- [ ] (P0) Typography vars + G7 seam note (T05).
- [ ] (P0) Vitest + visual smoke (T06).
- [ ] (P0) Docs touchpoints + INDEX Done.
- [ ] (P0) Story Status Done; acceptance PASS.

## Where to change
- Docs listed above; story + task statuses; bullrun; pkg pointer as per P4 norms.

## Out of scope
- Spacing px→`--space-*` (deferred D-G4-3). G7 font files. Palette redesign.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
# plus story AC checklist green
```

Gate: [`acceptance-verification-spa-g4.md`](./acceptance-verification-spa-g4.md)
