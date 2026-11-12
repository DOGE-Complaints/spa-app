# SPA-NS-18-T03 — Profile route width / grid

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

FR-NS-18.2: Shell main uses full usable width on phone — no empty right-rail crush.

## Code Facts (verify)

- AS-IS: `AppShellLayout` profile route · soft ProfileRail may leave dead rail width
- Target: full usable main column ≤767 · soft Story Activity continuity under CAB-08

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · CAB-08 wallet/contrib **gated** · burger drawer OOS

## AC / DoD

- [x] Full usable width structure Present
- [x] No empty right-rail crush on phone
- [x] Visual Done not claimed without OP eye → gate **BLOCK**

## Where to change

`AppShellLayout.jsx` · soft profile route CSS · soft ProfileRail

## Verification

```bash
rg -n "profile|board-workspace|ProfileRail|safe-area" spa-app/src -g '*.{jsx,css}' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/18-profile-mobile-layout.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md
```
