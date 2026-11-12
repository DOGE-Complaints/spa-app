# ARCH-DELTA — next-feed visual parity wave (2026-10-11)

> **Package:** [INDEX.md](INDEX.md) · **Wave:** NF-07…12  
> **Why:** Live≠artboard ([parity audit](../../../analysis/analysis-next-feed-live-artboard-parity-audit-2026-10-10.md) F1–F7, H1–H6) · operator agree [proposal](../../../analysis/proposal-next-feed-visual-parity-stories-2026-10-10.md)  
> **Arch package:** [`../../../architecture/feed-visual-redesign-phase-1/`](../../../architecture/feed-visual-redesign-phase-1/00-overview.md)  
> **Mode:** documentation delta only — name ≠ invent runtime. Stories cite `AD-VP-*` below.

---

## Delta table

| ID | Arch path | Before (as written) | After (this wave) | Why (evidence) | Story owner |
|----|-----------|---------------------|-------------------|----------------|-------------|
| **AD-VP-01** | [02 §1](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) Boundaries | «Prefer reuse … **behind** feed presentation / reskin» readable as mount-without-restyle | **Reskin mandatory** on `#/next/feed*`: classic M143/M148 chrome ≠ Done presentation | Audit F1/F4 · H2/H5 · `IssueThreadBlock` still M143/M148 | NF-08 (primary) · NF-07/09 |
| **AD-VP-02** | [02 §1b](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) (new) Presentation boundary | Implicit | Explicit: presentation wrappers in `features/feed/`; Closed client + catalogs stay shared in `components/threads` / repos | H2 — thin `FeedThreadMount` wrap failed visual claim | NF-08 · NF-09 |
| **AD-VP-03** | [02 §2+](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) Text search | No FE enable path after REQ-56 | **DUI-Q12 lift** for next-feed when gateway `search` Ready; FE may wire param **`search`** (no invent) | Operator 2026-10-11 · REQ-56 Ready · DUI-Q12 «until server exists» | NF-12 |
| **AD-VP-04** | [03 §1](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) Verify | Vitest + browser smoke critical states | **Visual Done waves:** live↔artboard evidence required; story-root packs alone ≠ visual PASS | Audit H3/H6 · NF-11 | NF-11 (gate) · all NF-07…12 AC |
| **AD-VP-05** | [00 §4](../../../architecture/feed-visual-redesign-phase-1/00-overview.md) Open unknowns | Exact `features/feed/` names open | Pointer: visual-parity wave names presentation surfaces via NF-07…12 (still no invent beyond stories) | Tracking | INDEX / epic |
| **AD-VP-06** | [DUI-Q12](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) | Hide active search until server semantics | **Amendment 2026-10-11:** server semantics Present (REQ-56); next-feed may enable live search (NF-12); history row preserved | Operator lock · gateway Ready | NF-12 |

---

## Non-deltas (explicit)

| Topic | Decision |
|-------|----------|
| One data plane / Closed threads paths | Unchanged (00 Q4 · 02 §1) |
| Shell chrome ownership | Still next-shell |
| M155 people | Still OOS |
| Gateway invent / new search endpoint | Forbidden — only existing `search` param |

---

## Story → delta map

| Story | Cites |
|-------|-------|
| NF-07 | AD-VP-01 (strip under feed presentation) · AD-VP-04 |
| NF-08 | AD-VP-01 · AD-VP-02 · AD-VP-04 |
| NF-09 | AD-VP-01 · AD-VP-02 · AD-VP-04 |
| NF-10 | AD-VP-01 (tokens/theme in feed plane) · AD-VP-04 |
| NF-12 | AD-VP-03 · AD-VP-06 · AD-VP-04 |
| NF-11 | AD-VP-04 (primary) · regress AD-VP-01…03 |
