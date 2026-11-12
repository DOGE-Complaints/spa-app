# SPA-PH-11-T02 — About/Privacy/Contact page shells + App routes

**Status:** Done  
**Story:** [`../STORY-SPA-PH-11-footer-static-pages.md`](../STORY-SPA-PH-11-footer-static-pages.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md)  
**ui_scope:** `public-footer` / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T18:09:06Z`  
**Package:** `pkg-000211`  
**Path A:** M166 · legal overview · Interview P9 · p13UxReady

## Purpose

FR-PH-11.3: Real routes `/about` `/privacy` `/contact` — shell + H1; body OP-supplied later — **no invent legal prose**.

## Code Facts (verify)

- AS-IS: footer links may be `#about|#privacy|#contact` placeholders · no page shells
- Target: App routes + HowItWorks-like shells · placeholder body honesty (no invented statutes)

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent final legal copy · no invent CDN

## AC / DoD

- [x] Three routes Present · H1 Present · no invented legal body claimed Done
- [x] Visual Done not claimed without OP eye

## Where changed

_(P3)_ `App.jsx` · new page shells under `src/pages/` · soft AppShell reuse

## Verification

```bash
rg -n "path=./about|path=./privacy|path=./contact|/about|/privacy|/contact" spa-app/src/App.jsx spa-app/src/pages
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M166-legal-pages-shell-overview-v1.0.png
```
