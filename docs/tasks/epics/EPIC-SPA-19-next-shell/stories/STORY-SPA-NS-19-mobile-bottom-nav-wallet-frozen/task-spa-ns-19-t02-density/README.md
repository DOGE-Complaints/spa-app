# SPA-NS-19-T02 — Reduce nav height CSS

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
**Path A:** M179 · Interview M4

## Purpose

FR-NS-19.1: Reduce bottom nav vertical footprint (height/padding/labels) while keeping usable tap targets (≥44×44).

## Code Facts (verify)

- AS-IS: `MobileBottomNav.css` / `.jsx` taller content band than tip proposal
- Target: compact geometry per M179 (~52 CSS px content band proposal) · safe-area held · readable labels

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · no invent PNG  
- **no invent OP PASS** · **no CAB-08 unfreeze** · Feed/Profile behavior held (T03)

## AC / DoD

- [x] Shorter nav content band Present
- [x] Tap targets ≥44×44 held
- [x] Visual Done not claimed without OP eye → gate **BLOCK**

## Where to change

`MobileBottomNav.css` · soft `MobileBottomNav.jsx` chrome

## Verification

```bash
rg -n "MobileBottomNav|bottom-nav|safe-area" spa-app/src -g '*.{jsx,css}' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/19-mobile-bottom-nav-wallet-frozen.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md
```
