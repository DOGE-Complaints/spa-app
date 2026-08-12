# SPA-G8-T06 — Story gate G8

**Status:** Done  
**Story:** [`../STORY-SPA-G8-app-shell-refactor.md`](../STORY-SPA-G8-app-shell-refactor.md)  
**Decision Ref:** backlog AC + Documentation touchpoints  
**Depends on:** T01–T05  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-29T08:03:20Z

## Purpose
Закрыть story AC: docs (design-system §4.1/4.2 + shell row, reusable-ui G8, gap-report §G8, INDEX) + story gate PASS.

## Risk
Code Done без doc sync → INDEX/gap-report drift.

## Code Facts (re-verify at execute)
- Touchpoints listed in pipeline story §Documentation touchpoints.
- Gate file: `acceptance-verification-spa-g8.md`.

## AC / DoD
- [ ] (P0) All story AC satisfied with evidence from T01–T05.
- [ ] (P0) design-system, reusable-ui, gap-report §G8, design-foundation INDEX updated.
- [ ] (P0) Story Status → Done; this gate PASS with `--print-utc-now`.

## Where to change
- Docs listed in story touchpoints; this gate file; story Meta Status.

## Out of scope
- Identity routes; BoardColumns extraction.

## Verification
```bash
# Confirm docs + all task acceptances PASS; fill acceptance-verification-spa-g8.md
```

Gate: [`acceptance-verification-spa-g8.md`](./acceptance-verification-spa-g8.md)

Gate Date: 2026-07-29T08:27:15Z.
