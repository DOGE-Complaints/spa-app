# SPA-PH-13-T01 — Dictionary + remove board hints

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

FR-PH-13.1 · 13.5: Apply M168 EN copy proposal; localize ET/RU via existing i18n; remove all `Opens '/board'` / `inlineActionHint` board opens / monospace route helpers from UI.

## Code Facts (verify)

- AS-IS: `howItWorksDictionary.js` · `HowItWorksPage.jsx` may still surface board-open hints
- Target: M168 copy · no invent long FAQ · no board-open helpers in UI

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent landing HTML · no invent GPT URL

## AC / DoD

- [x] Dictionary EN/ET/RU Present · board hints Absent from UI
- [x] Visual Done not claimed without OP eye · gate held **PENDING**/BLOCK until OP

## Where changed

_(P3)_ `howItWorksDictionary.js` · `HowItWorksPage.jsx` (as needed)

## Verification

```bash
rg -n "Opens|inlineActionHint|/board|howItWorks" spa-app/src/i18n/howItWorksDictionary.js spa-app/src/pages/HowItWorksPage.jsx
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.md
@mockup: spa-app/docs/analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md
```
