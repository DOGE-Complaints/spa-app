# STORY-SPA-NS-15 — OP light/dark PNG promote · footer dual match header · cleanup

## Meta

- **Key:** `STORY-SPA-NS-15-brand-op-light-png-footer-dual`
- **Package:** [next-shell](INDEX.md) · soft [public-home](../public-home/INDEX.md) footer
- **Status:** P5 APPLY · T01–T04 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000220` · `activation: none` · Await P8 · tip masters **Present** · Partial visual · no invent PASS
- **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M1·M4·M5**
- **UX tip:** [m169-brand-source](../../../UX/mockups/home/m169-brand-source/) · `dogestonia-brand-light.png` · `dogestonia-brand-dark.png` · [intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · soft [M169](../../../UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md) · soft supersede [NS-14](STORY-SPA-NS-14-brand-png-dual-theme.md) masters gap
- **Depends on:** NS-14 tagline omit Present · soft NS-10
- **Code home:** `Header.jsx` · `PublicFooter.jsx` · `public/assets/`
- **L1.5:** [arch](../../../architecture/next-feed-vl/15-brand-op-light-png-footer-dual.md)

## L1 — FR

- **FR-NS-15.1** Copy tip masters `dogestonia-brand-{light,dark}.png` → `public/assets/` · wire **header** + **footer** both themes.  
- **FR-NS-15.2** Footer brand group: mark (+ optional wordmark **inside** asset only) · **no** separate text/tagline beside logo.  
- **FR-NS-15.3** Footer **dark** uses tip dark master (same family as header dark) — not `DOGEstonia-logo-big.png`.  
- **FR-NS-15.4** Cleanup кривых / obsolete brand files from runtime path (keep tip shelf).  
- **FR-NS-15.5** Vitest · OP eye — no invent PASS · no invent mascot.

## OOS

Default theme (NS-16) · HIW/Contact env · invent CDN

## AC

- [x] Tip masters Present (docs shelf)  
- [x] Light+dark header+footer use promoted masters (structure)  
- [x] Footer no adjacent text  
- [x] Cleanup noted · Vitest · OP eye Absent → **BLOCK** (Partial visual)  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-15-t01-promote` | Done | Tip shelf → `public/assets/` · name lock | 15.1 · 15.4 |
| `task-spa-ns-15-t02-header` | Done | Wire header light+dark PNG | 15.1 · 15.3 |
| `task-spa-ns-15-t03-footer` | Done | Footer light+dark · no text beside | 15.2 · 15.3 |
| `task-spa-ns-15-t04-cleanup-vitest` | Done | Remove/hide кривые · markers | 15.4 · 15.5 |

### Order

Tip masters **Present** → `t01` → `t02` ‖ `t03` → `t04` · skill `react-expert`
