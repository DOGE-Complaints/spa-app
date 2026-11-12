# UX Prompts — Peer Reactions empty affordance (wave5 mark 14 → CR-28)

> **Package:** [component-reactions](INDEX.md) · soft next-feed hosts  
> **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M14**  
> **Evidence:** [14-peer-reactions-empty.png](../../../analysis/evidence/op-residual-wave5-2026-10-24/14-peer-reactions-empty.png)  
> **Prior:** CR-12 aggregate · CR-21 people · CR-24 underlay  
> **Wave:** docs 1A · gen **done** · intake **PASS** · [M176](../../../UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) · [intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · no invent OP PASS

## Sufficiency

| Check | Result |
|-------|--------|
| Peer Reactions empty: sparse · no icon · large dead gap | **UX** — empty-state icon/affordance |

---

## Global constraints

```text
DOGEstonia civic post peer Reactions zone (aggregate / people side — not own React picker).
When summary empty: show calm empty affordance (icon + optional short label) so the
zone is not a blank gap under «Реакции». Filled state continuity with existing chips.
Reuse Gap v2 / people icon language where possible. Light + dark. No invent people API.
No invent OP PASS.
```

---

## Prompt 1 — Peer empty Reactions icon

### State matrix

| State | Must show |
|-------|-----------|
| Empty | Icon (and soft label if tip requires) under/ beside «Реакции» · not blank pocket |
| Filled | Existing aggregate chips · empty affordance gone or demoted |
| Share row | Share control alignment held |

### Prompt body

```text
Artboard: DOGEstonia M176-peer-reactions-empty-affordance-v1.
Panel A (light): civic strip — Share + «Реакции» EMPTY — add empty-state icon so zone
is not sparse dead space (OP shot 14).
Panel B: filled peer reactions chips — continuity with A spacing.
Panel C: dark theme.
Annotate icon size, gap to Share, empty vs filled. Reuse existing icon catalog if possible;
do not invent new reaction mark set.
```

---

## Intake status

**PASS** — tip [M176](../../../UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) + PNG (rev2). Story **CR-28** Ready for Apply.

## Out of gen

Own empty strip (CR-26) · invent people HTTP
