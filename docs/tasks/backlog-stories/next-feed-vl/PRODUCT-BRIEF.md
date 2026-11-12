# Next Feed VL — Product Brief (visual-language / DS atoms)

> **Locked intent:** operator 2026-10-12 — отдельный пакет постановки на **упущенные DS-элементы** `#/next/feed*`; classic `#/board` не трогать  
> **Status:** Materialized постановка · Todo implement  
> **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) · sibling Done [next-feed](../next-feed/INDEX.md) NF-01…12  
> **DS SSOT:** [DOGEstonia-next-feed-component-design-system-v1.0.md](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md)  
> **Gap SSOT:** [analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md](../../../analysis/analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md)  
> **Arch delta:** [ARCH-DELTA-visual-language-plane-2026-10-12.md](ARCH-DELTA-visual-language-plane-2026-10-12.md)  
> **Target tech arch:** [architecture/next-feed-vl/00-overview.md](../../../architecture/next-feed-vl/00-overview.md) · [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md)  
> **Epic:** [EPIC-SPA-21-next-feed-vl](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)  
> **Artboards:** same M149–M160 (no new mockups this package)

## One-liner

Проработать **каждый упущенный именованный элемент** design system на `#/next/feed*` так, чтобы глаз видел новый plane — без смешения с classic dashboard.

## Hard anti-mixing (non-negotiable)

| Rule | Meaning |
|------|---------|
| 1 | Classic `#/board` components **remain** for old dashboard |
| 2 | Next-feed Done chrome uses **DS names** from component DS — not unre-skinned classic as PASS |
| 3 | Do not reopen NF-01…12 story bodies (Related only) |
| 4 | Shared = Closed **data/semantics** only; presentation = new |

## In scope

- NF-VL-01…12 постановка: identity, search field, reactions atoms, discussion/composer atoms, layouts/overlays, board results context, map chrome, verify/invite chrome  
- Live-five verify expectation in AC  
- Promote-or-lock for paw/orb (no invent SVG masters)

## Out of scope

- JSX/CSS implement in this ask  
- Epic task READMEs / Path A scaffolds  
- M155 people / schema / media production  
- Shell chrome (next-shell)  
- Breaking or redesigning `#/board` in place  

## Tip order

```
VL-01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12
```
