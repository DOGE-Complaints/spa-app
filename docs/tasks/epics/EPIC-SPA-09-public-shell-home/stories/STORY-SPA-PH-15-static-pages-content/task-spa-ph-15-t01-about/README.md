# SPA-PH-15-T01 — About sections + dictionary

**Status:** Done  
**Story:** [`../STORY-SPA-PH-15-static-pages-content.md`](../STORY-SPA-PH-15-static-pages-content.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-15-static-pages-content.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-15-static-pages-content.md)  
**ui_scope:** `static-pages` / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T15:13:02Z`  
**Package:** `pkg-000219`  
**Path A:** M172 + privacy downloads · Interview S8 · p13UxReady

## Purpose

FR-PH-15.1 · 15.3: About tip-structured sections · RU verbatim + EN/ET from M172.

## Code Facts (verify)

- AS-IS: `StaticPublicPage` · About/Privacy/Contact · `publicHomeDictionary.js` · PH-11 routes Present  
- Target: M172 tip · privacy download cards · no invent legal body / RU-ET download labels

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- no invent OP PASS · no invent legal body · no invent RU/ET download labels · no invent form POST · no invent email

## AC / DoD

- [x] Structure claims only after code verify  
- [x] Visual Done not claimed without OP eye · gate **BLOCK** (OP Absent)

## Where changed

P3 `2026-10-23T15:20:04Z` · AboutPage · publicHomeDictionary.js

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "About|Privacy|Contact|privacy.pdf|publicHome" spa-app/src/pages spa-app/src/i18n/publicHomeDictionary.js | head -40
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M172-static-pages-copy-RU-EN-ET-spec-v2.0.md
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md
```
