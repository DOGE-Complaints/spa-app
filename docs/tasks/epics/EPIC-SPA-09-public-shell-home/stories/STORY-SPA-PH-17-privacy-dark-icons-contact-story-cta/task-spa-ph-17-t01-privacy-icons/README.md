# SPA-PH-17-T01 — Dark-readable Privacy icons/CSS

**Status:** Done  
**Closed:** `2026-10-24T10:13:01Z`  

**Story:** [`../STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md`](../STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md)  
**ui_scope:** static-pages / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:09:06Z`  
**Package:** `pkg-000223`  
**Path A:** arch Present · Interview M6·M7 · p13UxReady · evidence 06

## Purpose

FR-PH-17.1: Privacy card icons + download glyph readable on **dark** theme (contrast · currentColor / theme assets — **no invent new art set**).

## Code Facts (verify)

- AS-IS: Privacy download cards via `StaticPublicPage` / privacy CSS (PH-15) · evidence 06 dark icons invisible
- Target: dark-readable contrast · no invent new icon art

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · no invent new art set · Brand PNG OOS · invent legal body OOS

## AC / DoD

- [ ] Privacy icons visible dark (structure)
- [ ] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where to change

`spa-app/src/pages/` StaticPublic / privacy CSS · soft icon class tokens

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "privacy|download|currentColor|data-theme" spa-app/src/pages spa-app/src/**/*.css | head -40
```

## @mockup

```text
@mockup: spa-app/docs/architecture/public-home/17-privacy-dark-icons-contact-story-cta.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave5-2026-10-24/06-privacy-icons-dark-invisible.png
```
