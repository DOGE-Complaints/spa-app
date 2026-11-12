# SPA-NS-17-T05 — logo-big residual · markers · Vitest

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
**Path A:** M177 · Interview M1 · soft NS-15

## Purpose

FR-NS-17.4 / 17.5: Soft drop residual `DOGEstonia-logo-big.png` from AppShell / EmergingSignalsBlock · Vitest markers · Path A soft · OP eye — no invent PASS · no invent Wallet.

## Code Facts (verify)

- AS-IS: may still reference `logo-big` outside Header/Footer
- Target: residual cleanup · ns17 vitest · OP eye Absent → gate **BLOCK**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent Wallet** · no invent routes

## AC / DoD

- [x] logo-big residual cleaned (soft)
- [x] Vitest green for ns17 markers
- [x] OP eye Absent → **BLOCK**
- [x] Visual Done not claimed

## Where to change

`AppShell*` · soft `EmergingSignalsBlock` · `__tests__` · soft `scripts/tmp-ns17-capture.mjs` (P3)

## Verification

```bash
rg -n "logo-big|DOGEstonia-logo-big" spa-app/src
cd spa-app && npm test -- --run src/**/*ns17*
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/17-mobile-appbar-burger-drawer.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md
```
