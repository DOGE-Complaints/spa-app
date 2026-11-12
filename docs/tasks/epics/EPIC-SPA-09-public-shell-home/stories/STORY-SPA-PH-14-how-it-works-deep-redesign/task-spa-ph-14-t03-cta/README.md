# SPA-PH-14-T03 — CTA row grouping leftward

**Status:** Done  
**Story:** [`../STORY-SPA-PH-14-how-it-works-deep-redesign.md`](../STORY-SPA-PH-14-how-it-works-deep-redesign.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-14-how-it-works-deep-redesign.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-14-how-it-works-deep-redesign.md)  
**ui_scope:** `how-it-works` / public-home · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:58:15Z`  
**Package:** `pkg-000218`  
**Path A:** M171 · Interview H6 · p13UxReady

## Purpose

FR-PH-14.3 · 14.4: Final CTA row — landing FAQ grouped **leftward** with Go to Feed (not orphan far-right). Hold Feed→`/next/feed` · landing URL · Telegram CTA step 02 · no Opens `/board` · no invent GPT URL.

## Code Facts (verify)

- AS-IS: PH-13 CTAs Present (`/next/feed` · landing FAQ)  
- Target: leftward grouping per M171 · routes held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- no invent OP PASS · no invent landing HTML · no invent GPT URL

## AC / DoD

- [x] Structure claims only after code verify  
- [x] Visual Done not claimed without OP eye · gate **BLOCK** (OP Absent)

## Where changed

P3 `2026-10-23T15:05:33Z` · `HowItWorksPage.jsx` · soft CSS

## Verification

```bash
rg -n "next/feed|how-it-works|landing|Go to Feed|/board" spa-app/src/pages/HowItWorksPage.jsx | head -40
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M171-how-it-works-approved-copy-spec-v1.0.md
```
