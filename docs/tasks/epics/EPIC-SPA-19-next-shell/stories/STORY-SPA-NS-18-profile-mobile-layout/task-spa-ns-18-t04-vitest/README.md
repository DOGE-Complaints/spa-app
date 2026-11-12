# SPA-NS-18-T04 — Markers · Vitest

**Status:** Done · BLOCK  
**Closed:** `2026-10-25T10:21:22Z` (P3 · OP eye Absent → Partial visual BLOCK)  


**Story:** [`../STORY-SPA-NS-18-profile-mobile-layout.md`](../STORY-SPA-NS-18-profile-mobile-layout.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-18-profile-mobile-layout.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-18-profile-mobile-layout.md)  
**ui_scope:** next-shell / profile · **mixed**  
**ui_anchor:** false  
**extends ui-mockup:** `../ui-mockup-spec.md`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:16:00Z`  
**Package:** `pkg-000231`  
**Path A:** M178 · Interview M3

## Purpose

FR-NS-18.4: Vitest markers · Path A soft · OP eye — no invent PASS · no invent APIs.

## Code Facts (verify)

- AS-IS: may lack ns18 markers
- Target: ns18 vitest · OP eye Absent → gate **BLOCK**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · CAB-08 gates held · no invent APIs

## AC / DoD

- [x] Vitest green for ns18 markers
- [x] OP eye Absent → **BLOCK**
- [x] Visual Done not claimed

## Where to change

`AccountSummary` / profile tests · soft `scripts/tmp-ns18-capture.mjs` (P3)

## Verification

```bash
cd spa-app && npm test -- --run src/**/*ns18*
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/18-profile-mobile-layout.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md
```
