# SPA-G9-T07 — Story gate G9

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** backlog Acceptance Criteria (all)  
**Depends on:** T01–T06  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:45:25Z

## Purpose
Story acceptance-verification: все AC PASS с evidence из T01–T06; pipeline + backlog Status → Done; bullrun/epic sync; gate Date только после live `--print-utc-now` + `--verify`.

## Risk
Partial AC without gate evidence; dating gate before live verify.

## Code Facts (re-verify at execute)
- Template SSOT: [`docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)
- Gate file: `acceptance-verification-spa-g9.md` (create/fill at execute close).

## AC / DoD
- [ ] (P0) All six story AC checked with evidence (tokens doge; color rebind; CTA contrast; design-system; visual+npm test; INDEX/G4/header).
- [ ] (P0) Pipeline story + backlog Status → Done; EPIC-SPA-08 Wave 4 Done (epic status Done if no further open stories).
- [ ] (P0) Gate PASS with Date from `--print-utc-now` after live verify.

## Where to change
- NEW/FILL `acceptance-verification-spa-g9.md`; story Meta Status; bullrun rows; epic состав Status.

## Out of scope
- New code changes beyond evidence docs. Light theme / mascot.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --print-utc-now
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test
# Fill acceptance-verification-spa-g9.md from template
```

Gate: [`acceptance-verification-spa-g9.md`](./acceptance-verification-spa-g9.md)

Gate Date: 2026-08-02T08:59:09Z.
