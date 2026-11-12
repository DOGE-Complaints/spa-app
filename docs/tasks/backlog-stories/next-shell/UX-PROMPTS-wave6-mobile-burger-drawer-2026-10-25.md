# UX Prompts — Mobile AppBar brand + burger drawer (wave6 mark 1 → NS-17)

> **Package:** [next-shell](INDEX.md)  
> **Interview:** [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md) **M1**  
> **Evidence:** [01…](../../../analysis/evidence/op-residual-wave6-mobile-2026-10-25/01-mobile-feed-coming-soon-burger.png)  
> **Prior:** NS-15 brand PNG · Header drawer (desktop/tablet) · PH static routes  
> **Wave:** docs 1A · gen **done** · intake **PASS** · [M177](../../../UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md) · [intake](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) · no invent OP PASS

## Sufficiency

| Check | Result |
|-------|--------|
| Mobile chrome: WIP title · dead burger · no brand · viewport inset | **UX** — AppBar brand + full drawer IA + chrome width |

---

## Global constraints

```text
DOGEstonia SPA mobile next-shell (≤767 CSS px) — MobileAppBar + drawer.
Replace «Feed coming soon» with brand mark (reuse dogestonia-brand-{light,dark}.png).
Burger opens a standard left/right drawer with clear sections:
  (A) primary: Account / Profile · Feed · My stories
  (B) static pages: How it works · About · Privacy · Contact (existing routes only)
  (C) primary CTA: Submit / tell story → VITE_STORY_GPT_URL pattern
Drawer must be keyboard/focus friendly · backdrop dismiss · light+dark.
Viewport: content chrome edge-to-edge within safe-area (no fake phone letterbox).
No invent routes · no invent Wallet here · no invent OP PASS.
```

---

## Prompt 1 — Mobile AppBar + drawer IA

### State matrix

| State | Must show |
|-------|-----------|
| AppBar closed | Brand logo · burger · optional trailing held · no WIP title |
| Drawer open | Sections A/B + CTA C · active route highlight |
| Light / dark | Brand asset switch · readable chrome |

### Prompt body

```text
Artboard: DOGEstonia M177-mobile-appbar-burger-drawer-v1.
Panel A (light, phone): MobileAppBar with DOGEstonia brand PNG (not text «Feed coming soon»),
burger left or standard pattern; content full-bleed within safe-area.
Panel B: drawer OPEN — section Primary (Account, Feed, My stories);
section Pages (How it works, About, Privacy, Contact); prominent Submit story CTA button.
Panel C: dark theme A/B.
Annotate hit targets ≥44 CSS px, backdrop, focus ring. Reuse existing brand masters.
Do not invent new pages or Wallet entry in this drawer.
```

---

## Intake status

**PASS** — tip [M177](../../../UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md) + PNG. Story **NS-17** Ready for Apply.

## Out of gen

Filters scroll (NF-26) · profile layout (NS-18) · bottom Wallet (NS-19)
