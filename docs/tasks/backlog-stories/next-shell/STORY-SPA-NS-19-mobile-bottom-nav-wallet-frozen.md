# STORY-SPA-NS-19 — Mobile bottom nav density + frozen Wallet

## Meta

- **Key:** `STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen`
- **Package:** [next-shell](INDEX.md) · soft [cabinet](../cabinet/INDEX.md)
- **Status:** P8 local close · Story **BLOCKED** (OP eye) · T01–T04 **Done·BLOCK** · gate **BLOCK** · `pkg-000232` · **activation: none** · SHAs feat `a0d3664` · test `5520189` · docs `25ccce5` · intake **PASS** · glyph soft · Partial visual=**BLOCK** · no invent PASS · no CAB-08 unfreeze · NO PUSH · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md)
- **Interview:** [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md) **M4**
- **UX tip:** [M179](../../../UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md) · [intake](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave6-bottom-nav-wallet-2026-10-25.md) · dogecoin glyph export Absent in tip · Apply handoff
- **Depends on:** MobileBottomNav Present · CAB-08 wallet gate held (do **not** unfreeze)  
- **Code home:** `MobileBottomNav.jsx` · `MobileBottomNav.css`  
- **L1.5:** [arch](../../../architecture/next-feed-vl/19-mobile-bottom-nav-wallet-frozen.md)

## L1 — FR

- **FR-NS-19.1** Reduce bottom nav vertical footprint (height/padding/labels) while keeping usable tap targets.  
- **FR-NS-19.2** Add **frozen** Wallet slot with Dogecoin-style glyph · disabled / coming-soon honesty · **no** nav to live wallet · **no** CAB-08 unfreeze.  
- **FR-NS-19.3** Feed + Profile behavior held.  
- **FR-NS-19.4** Vitest · OP eye — no invent PASS · no invent Wallet API.

## OOS

Unfreeze wallet · invent balance UI · invent dogecoin brand beyond tip asset

## AC

- [x] Soft UX tip cited / intake PASS (M179)  
- [x] Shorter nav + frozen Wallet slot structure (structure; visual **BLOCK**)  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-19-t01-ux` | **Done** | Intake M179 PASS · glyph Apply soft | 19.2 |
| `task-spa-ns-19-t02-density` | Done·BLOCK | Reduce nav height CSS | 19.1 |
| `task-spa-ns-19-t03-wallet` | Done·BLOCK | Frozen Wallet slot + glyph | 19.2 · 19.3 |
| `task-spa-ns-19-t04-vitest` | Done·BLOCK | Markers | 19.4 |

### Order

UX intake **Done** → `t02` → `t03` → `t04` · skill `react-expert`
