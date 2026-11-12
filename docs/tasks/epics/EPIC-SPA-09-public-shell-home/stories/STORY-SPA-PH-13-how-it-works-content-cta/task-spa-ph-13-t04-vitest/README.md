# SPA-PH-13-T04 — Vitest markers · Path A · gate

**Status:** Done  
**Story:** [`../STORY-SPA-PH-13-how-it-works-content-cta.md`](../STORY-SPA-PH-13-how-it-works-content-cta.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-13-how-it-works-content-cta.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-13-how-it-works-content-cta.md)  
**ui_scope:** `how-it-works` / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T17:54:15Z`  
**Package:** `pkg-000210`  
**Path A:** M168 · wave3 intake · Interview H10 · p13UxReady

## Purpose

FR-PH-13.6 · AC: Vitest markers for copy/CTA/landing; Path A full-cycle shots; gate Result — OP eye Absent → **BLOCK** · no invent PASS.

## Code Facts (verify)

- AS-IS: `HowItWorksPage.test.jsx` may lack PH-13 markers
- Target: markers + capture pack · CAPTURE-META `visual_gate: BLOCK` until OP

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent landing HTML · no invent GPT URL

## AC / DoD

- [ ] Vitest green for PH-13 markers
- [ ] Path A shots Present · OP eye Absent → gate **BLOCK** (not invent PASS)

## Where changed

_(P3)_ `src/pages/__tests__/HowItWorksPage*.test.jsx` · Path A capture helper · gate/checklists/shots

## Verification

```bash
cd spa-app && npm test -- --run src/pages/__tests__/HowItWorksPage.test.jsx
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.md
@mockup: spa-app/docs/analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md
```
