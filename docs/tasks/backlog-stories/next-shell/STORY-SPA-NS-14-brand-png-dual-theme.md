# STORY-SPA-NS-14 — Brand transparent PNG dual theme (header + footer)

## Meta

- **Key:** `STORY-SPA-NS-14-brand-png-dual-theme`
- **Package:** [next-shell](INDEX.md) · soft [public-home](../public-home/INDEX.md) footer
- **Status:** P8 closed · gate **BLOCK** · Story **BLOCKED** (asset + OP eye) · asset **MASTERS_ABSENT** · `pkg-000216` · `activation: none` · NO PUSH · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-14-brand-png-dual-theme/STORY-SPA-NS-14-brand-png-dual-theme.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-14-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/14-brand-png-dual-theme.md)
- **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **L2**
- **UX tip:** [M169](../../../UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md) · [intake](../../../analysis/analysis-wave4-ux-intake-m169-m172-2026-10-23.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave4-brand-png-dual-2026-10-23.md)
- **Depends on:** soft NS-10 Present (supersede raster-in-SVG as Done for eye)
- **Follow-on:** [NS-15](STORY-SPA-NS-15-brand-op-light-png-footer-dual.md) — tip masters Present (`dogestonia-brand-{light,dark}.png`) · Ready for Apply (wave5 intake)
- **Code home:** `Header.jsx` · `PublicFooter.jsx` · `public/assets/`

## L1 — FR

- **FR-NS-14.1** Header uses **transparent PNG** light + dark masters (theme switch) — not SVG wrapping raster as production brand.  
- **FR-NS-14.2** Visible header band ~44 CSS px · no dark plate.  
- **FR-NS-14.3** Footer uses same family PNG · mark ≥40px · brand name ok · **no** tagline `Civic issues, structured.` beside brand.  
- **FR-NS-14.4** Soft: remove/hide footer tagline key from rendered UI.  
- **FR-NS-14.5** Vitest · OP eye — no invent PASS · no invent mascot · no crop artboard as master.

## OOS

Map theme · invent CDN · legal pages content

## AC

- [x] UX tip cited / intake PASS (M169)  
- [ ] Dual PNG light/dark header+footer (**BLOCK** soft — masters Absent)  
- [x] No footer tagline beside brand (structure)  
- [x] Vitest · OP eye (structure Present · visual **BLOCK**)  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-14-t01-assets` | **BLOCK** soft | Clean transparent PNG masters → `public/assets/` (not artboard crop · M169 §8–10) | 14.1 |
| `task-spa-ns-14-t02-header` | **BLOCK** soft | Wire Header theme PNG (deferred — no masters) | 14.1 · 14.2 |
| `task-spa-ns-14-t03-footer` | Done | Drop tagline (PNG wire awaits T01) | 14.3 · 14.4 |
| `task-spa-ns-14-t04-vitest` | Done | Markers | 14.5 |

### Order

UX intake → `t01` → `t02` → `t03` → `t04` · skill `react-expert`
