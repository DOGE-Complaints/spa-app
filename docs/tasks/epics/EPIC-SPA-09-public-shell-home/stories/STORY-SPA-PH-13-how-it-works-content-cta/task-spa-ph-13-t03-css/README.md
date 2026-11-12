# SPA-PH-13-T03 — Step-head density (M168)

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

FR-PH-13.3: Compact step headers — badge+title (M168 proposal 40×40 badge · 12 gap — **review before hard lock**).

## Code Facts (verify)

- AS-IS: `HowItWorksPage.css` step-head spacing may be loose vs M168
- Target: compact density; do not invent art beyond CSS tokens held by page

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- Review M168 proposal sizes before hard lock · no invent OP PASS

## AC / DoD

- [x] Step-head compact Present (structure) · OP eye for visual Done
- [x] Visual Done not claimed without OP eye

## Where changed

_(P3)_ `HowItWorksPage.css` · markup hooks in `HowItWorksPage.jsx` if needed

## Verification

```bash
rg -n "step|badge|gap|how-it-works" spa-app/src/pages/HowItWorksPage.css spa-app/src/pages/HowItWorksPage.jsx
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.md
@mockup: spa-app/docs/analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md
```
