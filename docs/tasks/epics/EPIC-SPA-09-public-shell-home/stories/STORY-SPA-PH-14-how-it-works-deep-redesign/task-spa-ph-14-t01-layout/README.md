# SPA-PH-14-T01 — Step visuals + CSS density

**Status:** Done  
**Story:** [`../STORY-SPA-PH-14-how-it-works-deep-redesign.md`](../STORY-SPA-PH-14-how-it-works-deep-redesign.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-14-how-it-works-deep-redesign.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-14-how-it-works-deep-redesign.md)  
**ui_scope:** `how-it-works` / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:58:15Z`  
**Package:** `pkg-000218`  
**Path A:** M171 · Interview H6 · p13UxReady

## Purpose

FR-PH-14.1: Apply deep layout/visual tip (step visuals + density) per M171 after intake PASS.

## Code Facts (verify)

- AS-IS: `HowItWorksPage.jsx` · `HowItWorksPage.css` · PH-13 structure Present  
- Target: M171 step visuals + density · no invent assets beyond tip

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- no invent OP PASS · no invent ET · invent landing HTML OOS · PH-15 OOS

## AC / DoD

- [x] Structure claims only after code verify  
- [x] Visual Done not claimed without OP eye · gate **BLOCK** (OP Absent)

## Where changed

P3 `2026-10-23T15:05:33Z` · `HowItWorksPage.jsx` · `HowItWorksPage.css` · soft public assets from M171

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "how-it-works|HowItWorks" spa-app/src/pages/HowItWorksPage.jsx spa-app/src/pages/HowItWorksPage.css | head -40
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M171-how-it-works-approved-copy-spec-v1.0.md
```
