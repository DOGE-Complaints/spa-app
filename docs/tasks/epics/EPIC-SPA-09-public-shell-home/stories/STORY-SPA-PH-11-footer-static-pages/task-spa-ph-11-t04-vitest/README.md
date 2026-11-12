# SPA-PH-11-T04 — Vitest markers · Path A · gate

**Status:** Done  
**Story:** [`../STORY-SPA-PH-11-footer-static-pages.md`](../STORY-SPA-PH-11-footer-static-pages.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md)  
**ui_scope:** `public-footer` / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T18:09:06Z`  
**Package:** `pkg-000211`  
**Path A:** M166 · Interview P9 · p13UxReady

## Purpose

FR-PH-11.5 · AC: Vitest markers for footer scale/tagline/brand/routes; Path A full-cycle shots; gate Result — OP eye Absent → **BLOCK** · no invent PASS.

## Code Facts (verify)

- AS-IS: PublicFooter / route tests may lack PH-11 markers
- Target: markers + capture pack · CAPTURE-META `visual_gate: BLOCK` until OP

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · no invent final legal prose

## AC / DoD

- [x] Vitest green for PH-11 markers
- [x] Path A shots Present · OP eye Absent → gate **BLOCK** (not invent PASS)

## Where changed

_(P3)_ `src/components/PublicFooter/__tests__/*` · page tests · Path A capture helper · gate/checklists/shots

## Verification

```bash
cd spa-app && npm test -- --run src/components/PublicFooter
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md
@mockup: spa-app/docs/analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md
```
