# SPA-G7-T06 — Story gate G7

**Status:** ✅ Done  
**Story:** [`../STORY-SPA-G7-self-hosted-fonts.md`](../STORY-SPA-G7-self-hosted-fonts.md)  
**Decision Ref:** backlog §Acceptance Criteria + Documentation touchpoints, T06  
**Depends on:** T01–T05  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T21:48:40Z

## Purpose
Закрыть story AC: docs (design-system §2.2, reusable-ui L0, gap-report §G7, INDEX) + story/gate PASS.

## Risk
Code Done без doc sync → INDEX/gap-report drift.

## Code Facts (re-verify at execute)
- Touchpoints listed in pipeline story §Documentation touchpoints.
- Gate file naming: `acceptance-verification-spa-g7.md` (story-gate like G4).

## AC / DoD
- [ ] (P0) All story AC satisfied with evidence from T01–T05.
- [ ] (P0) design-system §2.2, reusable-ui L0, gap-report §G7, design-foundation INDEX updated.
- [ ] (P0) Story Status → Done; this gate PASS with `--print-utc-now`.

## Where to change
- Docs listed in story touchpoints; this gate file; story Meta Status.

## Out of scope
- Font binary / CSS implementation (already T01–T04). Arweave deploy-track follow-ups.

## Verification
```bash
# Confirm docs + all task acceptances PASS; fill acceptance-verification-spa-g7.md
```

Gate: [`acceptance-verification-spa-g7.md`](./acceptance-verification-spa-g7.md)
