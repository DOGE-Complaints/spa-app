# Interview SSOT — OP residual wave 6 (mobile marks 1–4)

- **Дата:** 2026-10-25  
- **Тип:** Markstack intake · spa mobile residual after wave5 Apply  
- **Evidence:** [evidence/op-residual-wave6-mobile-2026-10-25/](../../../analysis/evidence/op-residual-wave6-mobile-2026-10-25/)  
- **Wave5 validation:** [analysis-markstack-wave5-code-validation-2026-10-25.md](../../../analysis/analysis-markstack-wave5-code-validation-2026-10-25.md)  
- **Пакеты:** next-shell · soft next-feed · soft cabinet  
- **Prior:** [INTERVIEW-NF-25-plus…](INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md)  
- **UX intake:** [analysis-wave6-ux-intake-m177-m179-2026-10-25.md](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) **PASS** (M177–M179)  
- **Wave:** **1A** docs only · Method [markstack-intake.md](../../../../../docs/methodology/Zeya888-builder-queue/prompts/architect/markstack-intake.md)  
- **Vars:** `builder_project: spa` · locks **1A** · tip PASS · **Await Apply**

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| W1 | Delivery | Docs Markstack only · Apply later · no invent OP PASS |
| M1 | Mobile chrome | Viewport full-bleed · AppBar **brand** (not «Feed coming soon») · burger → full drawer: Account · Feed · My stories · static pages block · Submit story CTA · soft NS-15 logo-big cleanup |
| M2 | Filters scroll | Mobile sheet scroll must work · body lock |
| M3 | Profile mobile | Full UX redesign mobile profile / Account card · fix broken viewport |
| M4 | Bottom nav | Shorter height · keep Feed/Profile · add **frozen** Wallet with dogecoin logo (no Wallet API) |
| OOS | — | Invent Wallet API · unfreeze CAB-08 wallet · invent OP PASS · empty pipelines · desktop-only redesign |

## Probe (code)

| # | State | Evidence |
|---|-------|----------|
| 1 | Present wrong | `MobileAppBar` default `nextShell.wip.title` · Header drawer hidden ≤767 next-shell · AppBar burger no `onLeadingClick` · brand PNG not in mobile chrome |
| 2 | Partial | NF-25 `overflow-y: auto` Present · no body scroll-lock / touch-action |
| 3 | Partial | `/profile` next-shell empty right ≥1200 · `AccountSummary` row mins · OP eye broken |
| 4 | Partial | `MobileBottomNav` 64px+pad · Wallet Absent in nav · dogecoin glyph Absent in `public/` |

## Sufficiency (gate before L1)

| Mark | Class | Artifact |
|------|-------|----------|
| **1** | **UX** | [M177](../../../UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md) intake **PASS** → NS-17 Ready Apply |
| **2** | **CSS/code** | NF-26 Ready Apply · skip UX gen |
| **3** | **UX** | [M178](../../../UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md) intake **PASS** → NS-18 Ready Apply |
| **4** | **CSS** + soft UX | [M179](../../../UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md) intake **PASS** → NS-19 Ready Apply · glyph Apply soft |

**Order:** Interview → UX-PROMPTS → intake M177–M179 **PASS** · **Await Apply**.

## Story allocation

| Mark | Story | Package |
|------|-------|---------|
| 1 | NS-17 | next-shell |
| 2 | NF-26 | next-feed |
| 3 | NS-18 | next-shell · soft cabinet |
| 4 | NS-19 | next-shell · soft cabinet |

## Explicit non-goals

Product Apply this wave · invent Wallet HTTP · invent dogecoin brand beyond tip · invent OP PASS · empty epic pipelines
