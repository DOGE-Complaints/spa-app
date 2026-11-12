# ARCH-DELTA — next-feed visual-language plane (2026-10-12)

> **Package:** [INDEX.md](INDEX.md) · **DS SSOT:** [`DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md)  
> **Why:** Composition Done (NF-01…12) ≠ DS atoms; eye still classic; operator lock dual plane / anti-mixing  
> **Arch:** [`02-features-feed-composition.md`](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)  
> **Target tech arch (VL):** [`next-feed-vl/00-overview.md`](../../../architecture/next-feed-vl/00-overview.md) · [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md)  
> **Mode:** documentation delta — name ≠ invent runtime

---

## Delta table

| ID | Arch path | Before | After | Why | Story owner |
|----|-----------|--------|-------|-----|-------------|
| **AD-VL-01** | [02 §1](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) | One feed presentation plane; wrappers over classic OK if “reskin” | **Dual plane:** `#/board` classic chrome **preserved**; `#/next/feed*` Done chrome = **DS-named** surfaces from next-feed component DS | Anti-mixing · operator 2026-10-12 | all NF-VL-* |
| **AD-VL-02** | 02 §1a/1b + DS §0 | Classic `BoardIssuePost` / `IssueThreadBlock` / `ReactionControls` / Filters search used as next-feed Done | Those modules are **deprecated as next-feed Done presentation** (may stay as Closed semantics adapters only). New named chrome under `features/feed/` | Gap map · why-still-classic | VL-01…12 |
| **AD-VL-03** | 03 verify | Partial Minor OK for visual Done (NF-11) | VL wave: identity / search skin / reactions atoms Partial = **block Done** | Gate policy VL | VL package · future gate |

---

## Non-deltas

| Topic | Decision |
|-------|----------|
| One data plane (gateway + Closed threads) | Unchanged |
| Shell ownership | next-shell |
| M155 / schema / media | Still OOS |
| Classic `#/board` runtime | **Do not break** — out of VL mutate scope |

---

## Story → delta

All `STORY-SPA-NF-VL-01…12` cite **AD-VL-01** + **AD-VL-02**. Gate stories (later) cite **AD-VL-03**.
