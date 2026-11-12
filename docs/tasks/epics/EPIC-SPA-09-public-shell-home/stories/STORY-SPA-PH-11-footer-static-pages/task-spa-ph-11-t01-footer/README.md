# SPA-PH-11-T01 — Footer mark scale + tagline + brand href

**Status:** Done  
**Story:** [`../STORY-SPA-PH-11-footer-static-pages.md`](../STORY-SPA-PH-11-footer-static-pages.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md)  
**ui_scope:** `public-footer` / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T18:09:06Z`  
**Package:** `pkg-000211`  
**Path A:** M166 · wave3 intake · Interview P9 · p13UxReady

## Purpose

FR-PH-11.1 · 11.2 · 11.4: Footer mark visible ≥40 CSS px (prefer NS-10 vector when shared); tagline preview `Civic issues, structured.` (never `[TAGLINE_TBD]`); brand mark+name → `/next/feed`.

## Code Facts (verify)

- AS-IS: `PublicFooter.jsx` / CSS may undersize mark · tagline TBD · brand may point `/board`
- Target: M166 scale · preview tagline · brand → `/next/feed`

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · no invent final legal prose

## AC / DoD

- [x] Mark ≥40px · tagline Present · brand → `/next/feed`
- [x] Visual Done not claimed without OP eye · gate held **PENDING**/BLOCK until OP

## Where changed

_(P3)_ `PublicFooter.jsx` · related CSS · dictionary keys as needed

## Verification

```bash
rg -n "TAGLINE_TBD|next/feed|footer|brand|40" spa-app/src/components/PublicFooter spa-app/src/i18n
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md
@mockup: spa-app/docs/analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md
```
