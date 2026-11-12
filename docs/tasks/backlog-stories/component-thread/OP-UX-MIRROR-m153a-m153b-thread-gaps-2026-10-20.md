# OP-UX MIRROR — M153a / M153b thread gaps → CT-16…20

> **UTC:** 2026-10-20  
> **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)  
> **Mode:** analysis.mdc · gap→story map only · **no** invent MIME · **no** invent OP PASS  
> **Prior tip:** [UX residual 10-19](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) (CT-10…15)  
> **Evidence:** [puppeteer gaps](../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md) · [depth2 gaps](../../../analysis/analysis-lab-feed-thread-visual-depth2-gaps-2026-10-20.md) · [intake](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md) · [rev3.1 PASS](../../../analysis/analysis-m153a-rev3.1-artboard-validation-2026-10-20.md)

---

## Tip artboards

| ID | Tip written | Role |
|----|-------------|------|
| **M153a v1.1** | [attachment-picker … v1.1](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) | Attach flow A–F · rev3.1 PASS |
| **M153a v1.0** | [… v1.0](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.0.md) | **Superseded** (rev2 audit trail) |
| **M153b v1.0** | [depth-2 token callouts](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) | Tokens A–E · §7 paint SSOT |

Paint precedence: **M153b §7** > M153a raster.

---

## Gap → story

| Gap | Class | Story |
|-----|-------|-------|
| BUG-1 dual-append → flat forest | Code bug | **CT-16** |
| No native picker · synthetic Ready | Lab/product path | **CT-17** |
| Bubble / spine / pills / parent Drift vs M153b A–D | Visual tokens | **CT-18** |
| Ready/Denied chip paint vs M153b §7 · M153a C–E | Visual tokens | **CT-19** |
| LAB-1…4 unreachable stands · harness regression | Lab coverage | **CT-20** |
| Comment reaction summary redesign | HOLD | **No story** |
| Exact MIME / max multi / denied-submit / publish API | M153a §18 TBD | **AC blockers on CT-17** · no invent FR |

---

## Build order

```text
CT-16 → CT-17 → CT-18 → CT-19 → CT-20
```

---

## Explicit non-goals

- Invent MIME/extensions · invent upload/bind · invent denied-submit policy  
- Reaction HOLD redesign  
- `#/next/feed` cutover  
- Invent OP PASS on Draft stories
