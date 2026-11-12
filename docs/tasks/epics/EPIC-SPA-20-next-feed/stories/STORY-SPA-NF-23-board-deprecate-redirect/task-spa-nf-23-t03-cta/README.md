# SPA-NF-23-T03 — Soft public CTA retargets

**Status:** Done  
**Story:** [`../STORY-SPA-NF-23-board-deprecate-redirect.md`](../STORY-SPA-NF-23-board-deprecate-redirect.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md)  
**ui_scope:** `feed` / routes · soft public shell · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:23:16Z`  
**Package:** `pkg-000206`  
**Path A:** Interview B11 · ARCH-DELTA §11 · p13UxReady

## Purpose

FR-NF-23.2: Public CTAs that still point `/board` retarget `/next/feed` — Header soft · HowItWorks soft · Footer brand. Soft other public entry points only if in FR scope.

## Code Facts (verify)

- AS-IS: soft `/board` links in shell/public surfaces
- Target: retarget to `/next/feed` · do not invent CDN/brand assets

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · FR soft list is SSOT (not mass rewrite Login/Cabinet unless soft)

## AC / DoD

- [x] Soft Header / HowItWorks / Footer brand CTAs → `/next/feed` (+ soft AppShell nav-board)
- [x] Visual Done not claimed without OP eye · gate **BLOCK**

## Where changed

Header · HowItWorks · Footer brand soft · soft related public Links

## Verification

```bash
rg -n 'to="/board"|navigate\\(\"/board\"\\)' spa-app/src/components spa-app/src/pages spa-app/src/layout 2>/dev/null | head -40
```
