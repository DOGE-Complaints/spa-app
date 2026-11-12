# SPA-CR-22-T01 — Measure media–strip gap

**Status:** Done · `2026-10-18T12:25:27Z`  
**P3 note:** cause [`../measure-cause-CR-22.md`](../measure-cause-CR-22.md) · layout gap **0** · letterbox **0** · plate bg residual  
**Story:** [`../STORY-SPA-CR-22-media-strip-flush-residual.md`](../STORY-SPA-CR-22-media-strip-flush-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:22:10Z`  
**Package:** `pkg-000158`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md)  
**@mirror:** residual §5 · CR-16 intent · M154 adjacency  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:25:27Z`

## Purpose
FR-22.2: Measure media box vs img vs strip top; record cause **before** CSS change.

## Code Facts (verified at P3)
- Geometry: strip−media = **0** · letterbox = **0**
- Cause: not padding/letterbox · light `.feed-post-media` plate bg can read as band

## Constraints
- Fact-first · no invent OP PASS/SVG/HTTP · hold CR-16 chip

## AC / DoD
- [x] Cause note recorded (`measure-cause-CR-22.md`)
- [ ] Visual Done not claimed without OP eye

## Where to change
lab measure scripts · cause note (no product CSS in T01)

## Verification
```bash
node spa-app/scripts/tmp-cr22-measure.mjs
```
