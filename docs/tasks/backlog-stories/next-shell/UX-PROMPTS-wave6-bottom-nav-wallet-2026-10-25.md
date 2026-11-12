# UX Prompts — Mobile bottom nav density + frozen Wallet (wave6 mark 4 → NS-19)

> **Package:** [next-shell](INDEX.md) · soft [cabinet](../cabinet/INDEX.md)  
> **Interview:** [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md) **M4**  
> **Evidence:** [02…](../../../analysis/evidence/op-residual-wave6-mobile-2026-10-25/02-filters-scroll-bottom-nav.png)  
> **Prior:** MobileBottomNav Feed+Profile · CAB-08 wallet gate  
> **Wave:** docs 1A · gen **done** · intake **PASS** · [M179](../../../UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md) · [intake](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) · no invent OP PASS  
> **Asset note:** dogecoin glyph export **Absent** in tip package (M179 §7) · Apply handoff → `public/icons/next-shell/` if catalog reuse fails

## Sufficiency

| Check | Result |
|-------|--------|
| Bottom nav too tall · Wallet future frozen + dogecoin logo | **CSS** + soft **UX** for 3-slot density + frozen Wallet affordance |

---

## Global constraints

```text
DOGEstonia MobileBottomNav — reduce vertical footprint (smaller min-height / padding /
label size) while keeping ≥44 CSS px hit targets where required.
Keep Feed + Profile. Add third slot: Wallet — FROZEN (disabled / coming-soon honesty),
showing a Dogecoin-style coin glyph. Do NOT wire Wallet API or unfreeze CAB-08.
Light + dark. Safe-area inset held. No invent OP PASS.
```

---

## Prompt 1 — Compact bottom nav + frozen Wallet

### State matrix

| State | Must show |
|-------|-----------|
| Compact nav | Feed · Profile · Wallet frozen · shorter bar than current 64px+ feel |
| Wallet frozen | Dogecoin glyph · disabled/aria honesty · no navigation |
| Active Feed/Profile | Highlight held |

### Prompt body

```text
Artboard: DOGEstonia M179-mobile-bottom-nav-wallet-frozen-v1.
Panel A (light): bottom nav three slots — Feed, Profile, Wallet(frozen) with Dogecoin
coin icon; annotate reduced bar height vs current tall nav while preserving tap targets.
Panel B: Profile active · Wallet still frozen.
Panel C: dark theme.
Export note: provide SVG/PNG dogecoin glyph for public/icons/next-shell/ if absent.
Do not invent live Wallet balance UI.
```

---

## Intake status

**PASS** — tip [M179](../../../UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md) + PNG. Story **NS-19** Ready for Apply · glyph install soft Apply.

## Out of gen

Burger drawer · invent Wallet HTTP · unfreeze CAB-08
