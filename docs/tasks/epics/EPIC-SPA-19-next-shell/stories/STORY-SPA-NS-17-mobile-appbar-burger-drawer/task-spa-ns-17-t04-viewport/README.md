# SPA-NS-17-T04 — Full-bleed mobile chrome

**Status:** Done · BLOCK  
**Closed:** `2026-10-25T10:06:18Z` (P3 · OP eye Absent → Partial visual BLOCK)  


**Story:** [`../STORY-SPA-NS-17-mobile-appbar-burger-drawer.md`](../STORY-SPA-NS-17-mobile-appbar-burger-drawer.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md)  
**ui_scope:** next-shell / MobileAppBar · **mixed**  
**ui_anchor:** false  
**extends ui-mockup:** `../ui-mockup-spec.md`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:00:29Z`  
**Package:** `pkg-000230`  
**Path A:** M177 · Interview M1

## Purpose

FR-NS-17.3: Mobile chrome / main content usable full width within safe-area — no dead WIP letterbox.

## Code Facts (verify)

- AS-IS: `AppShellLayout.jsx` · soft mobile grid may letterbox
- Target: full-bleed within safe-area · M177 viewport chrome

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · Filters scroll OOS

## AC / DoD

- [x] Full-bleed structure Present
- [x] Safe-area held
- [x] Visual Done not claimed without OP eye → gate **BLOCK**

## Where to change

`AppShellLayout.jsx` · soft MobileAppBar / shell CSS

## Verification

```bash
rg -n "safe-area|letterbox|MobileAppBar|app-shell" spa-app/src -g '*.{jsx,css}' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/17-mobile-appbar-burger-drawer.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md
```
