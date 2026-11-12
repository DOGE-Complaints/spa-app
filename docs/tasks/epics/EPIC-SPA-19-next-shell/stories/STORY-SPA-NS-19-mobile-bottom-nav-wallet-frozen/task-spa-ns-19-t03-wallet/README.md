# SPA-NS-19-T03 — Frozen Wallet slot + glyph

**Status:** Done · BLOCK  
**Closed:** `2026-10-25T10:33:36Z` (P3 · OP eye Absent → Partial visual BLOCK)  

**Story:** [`../STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md`](../STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md)  
**ui_scope:** next-shell / MobileBottomNav · **mixed**  
**ui_anchor:** true  
**extends ui-mockup:** `../ui-mockup-spec.md`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:28:33Z`  
**Package:** `pkg-000232`  
**Path A:** M179 · Interview M4 · glyph soft

## Purpose

FR-NS-19.2 · FR-NS-19.3: Add **frozen** Wallet slot (Dogecoin-style glyph soft) · disabled / coming-soon · no live wallet nav · Feed + Profile held · **no** CAB-08 unfreeze.

## Code Facts (verify)

- AS-IS: MobileBottomNav Feed + Profile · Wallet slot Absent
- Target: three equal slots · Wallet frozen · tip glyph soft handoff (export Absent — do not invent brand PNG beyond tip) · no Wallet route/API

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · **no invent PNG** beyond tip  
- **no invent OP PASS** · **no CAB-08 unfreeze** · no invent balance UI / Wallet API / route

## AC / DoD

- [x] Frozen Wallet slot Present (disabled honesty)
- [x] Feed + Profile live held
- [x] No CAB-08 unfreeze · no live wallet nav
- [x] Visual Done not claimed without OP eye → gate **BLOCK**

## Where to change

`MobileBottomNav.jsx` · `MobileBottomNav.css` · soft tip glyph asset only if Present

## Verification

```bash
rg -n "Wallet|wallet|MobileBottomNav|frozen|doge" spa-app/src/components -g '*.{jsx,css}' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/19-mobile-bottom-nav-wallet-frozen.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md
```
