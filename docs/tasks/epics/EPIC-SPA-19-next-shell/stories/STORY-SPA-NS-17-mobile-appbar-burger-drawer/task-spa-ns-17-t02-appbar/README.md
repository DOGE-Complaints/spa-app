# SPA-NS-17-T02 — Brand AppBar · wire burger

**Status:** Done · BLOCK  
**Closed:** `2026-10-25T10:06:18Z` (P3 · OP eye Absent → Partial visual BLOCK)  


**Story:** [`../STORY-SPA-NS-17-mobile-appbar-burger-drawer.md`](../STORY-SPA-NS-17-mobile-appbar-burger-drawer.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md)  
**ui_scope:** next-shell / MobileAppBar · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:00:29Z`  
**Package:** `pkg-000230`  
**Path A:** M177 · Interview M1 · soft NS-15

## Purpose

FR-NS-17.1 / 17.2: Mobile AppBar shows brand PNG (theme dual) — not WIP title · wire burger to open drawer.

## Code Facts (verify)

- AS-IS: `MobileAppBar.jsx` · soft `AppShellLayout.jsx` · may show `nextShell.wip.title`
- Target: NS-15 brand PNG dual · burger opens drawer · no invent routes

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · no invent PNG  
- **no invent OP PASS** · **no invent Wallet** · Filters OOS

## AC / DoD

- [x] Brand AppBar Present (theme dual)
- [x] Burger wires drawer open
- [x] Visual Done not claimed without OP eye → gate **BLOCK**

## Where to change

`spa-app/src/` · `MobileAppBar.jsx` · soft `AppShellLayout.jsx`

## Verification

```bash
rg -n "MobileAppBar|wip\.title|burger|logo" spa-app/src -g '*.jsx' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/17-mobile-appbar-burger-drawer.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md
```
