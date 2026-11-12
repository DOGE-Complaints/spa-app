# SPA-PH-11-T03 — Footer hrefs to real static routes

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

FR-PH-11.3: Footer About · Privacy · Contact hrefs → `/about` `/privacy` `/contact` (not `#` hash placeholders).

## Code Facts (verify)

- AS-IS: likely `href="#about"` style placeholders
- Target: SPA routes matching T02 shells

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- Depends on T02 routes Present · no invent OP PASS

## AC / DoD

- [x] Footer three links resolve to real routes
- [x] Visual Done not claimed without OP eye

## Where changed

_(P3)_ `PublicFooter.jsx` · dictionary link targets if any

## Verification

```bash
rg -n "about|privacy|contact|#" spa-app/src/components/PublicFooter
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md
@mockup: spa-app/docs/analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md
```
