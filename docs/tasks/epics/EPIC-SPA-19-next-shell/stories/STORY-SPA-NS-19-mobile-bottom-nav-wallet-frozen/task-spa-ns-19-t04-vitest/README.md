# SPA-NS-19-T04 — Markers · Vitest

**Status:** Done · BLOCK  
**Closed:** `2026-10-25T10:33:36Z` (P3 · OP eye Absent → Partial visual BLOCK)  

**Story:** [`../STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md`](../STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md)  
**ui_scope:** next-shell / MobileBottomNav · **mixed**  
**ui_anchor:** false  
**extends ui-mockup:** `../ui-mockup-spec.md`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:28:33Z`  
**Package:** `pkg-000232`  
**Path A:** M179 · Interview M4

## Purpose

FR-NS-19.4: Vitest markers · Path A soft · OP eye — no invent PASS · no invent Wallet API.

## Code Facts (verify)

- AS-IS: may lack ns19 markers
- Target: ns19 vitest · OP eye Absent → gate **BLOCK**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · no CAB-08 unfreeze · no invent Wallet API

## AC / DoD

- [x] Vitest green for ns19 markers
- [x] OP eye Absent → **BLOCK**
- [x] Visual Done not claimed

## Where to change

`MobileBottomNav` tests · soft `scripts/tmp-ns19-capture.mjs` (P3)

## Verification

```bash
cd spa-app && npm test -- --run src/**/*ns19*
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/19-mobile-bottom-nav-wallet-frozen.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md
```
