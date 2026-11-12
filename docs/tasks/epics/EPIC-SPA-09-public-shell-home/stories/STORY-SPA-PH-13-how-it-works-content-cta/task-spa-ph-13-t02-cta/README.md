# SPA-PH-13-T02 — Feed CTAs + landing FAQ link

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

FR-PH-13.2 · 13.4: Both feed CTAs label `Go to Feed` → `/next/feed`; secondary CTA `Concept & FAQ on landing` + external icon → `https://uus-veerenni-civic.dogestonia.me/#how-it-works`.

## Code Facts (verify)

- AS-IS: HIW CTAs may still point at `/board` or omit landing link
- Target: dual feed CTAs + external landing FAQ affordance

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent landing HTML · no invent GPT URL

## AC / DoD

- [x] Both CTAs → `/next/feed` · landing link Present
- [x] Visual Done not claimed without OP eye

## Where changed

_(P3)_ `HowItWorksPage.jsx` · dictionary keys as needed

## Verification

```bash
rg -n "next/feed|uus-veerenni-civic|Concept|Go to Feed|how-it-works" spa-app/src/pages/HowItWorksPage.jsx spa-app/src/i18n/howItWorksDictionary.js
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.md
@mockup: spa-app/docs/analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md
```
