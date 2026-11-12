# UX Prompts — Filters popover redesign (wave5 mark 13 → NF-25)

> **Package:** [next-feed](INDEX.md)  
> **Interview:** [INTERVIEW-NF-25-plus…](INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M13**  
> **Evidence:** [13-filters-narrow-popover.png](../../../analysis/evidence/op-residual-wave5-2026-10-24/13-filters-narrow-popover.png)  
> **Prior:** NF-21 date color-scheme · NF-22 Reset · SEARCH-02 panel  
> **Wave:** docs 1A · gen **done** · intake **PASS** · [M175](../../../UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md) · [intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · no invent OP PASS

## Sufficiency

| Check | Result |
|-------|--------|
| Filters: narrow · unclear selectors · dates look inactive | **UX** — redesign popover layout + control affordance |

---

## Global constraints

```text
DOGEstonia next/feed Filters popover (mobile + desktop).
Widen usable panel; clarify Type/Labels/Instance/geo rows; date from/to must look
active (not disabled grey) while keeping native picker (NF-21 color-scheme held).
Apply + Reset hierarchy clear. Light + dark. RU/EN/ET labels reuse dict — no invent copy.
No invent new filter API fields. No invent OP PASS.
```

---

## Prompt 1 — Filters panel UX redesign

### State matrix

| Surface | Must show |
|---------|-----------|
| Closed trigger | Filters + Reset link held (NF-22) |
| Open popover | Comfortable width · readable labels/values · no severe truncation |
| Date row | From/to look interactive · calendar icon readable · light/dark |
| Actions | Apply primary · Reset secondary |

### Prompt body

```text
Artboard: DOGEstonia M175-filters-popover-redesign-v1.
Panel A (light, mobile-ish): open Filters — wider card, clear label|value rows for
Type / Labels / Instance / Settlement / Region / Country; date from/to look active
(not muted/disabled) though native date picker remains.
Panel B: desktop width continuity.
Panel C: dark theme.
Annotate min width, row density, Apply/Reset placement. Do not invent new filter keys.
```

---

## Intake status

**PASS** — tip [M175](../../../UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md) + PNG. Story **NF-25** Ready for Apply.

## Out of gen

Map leaves (NF-24 held) · invent gateway filter fields
