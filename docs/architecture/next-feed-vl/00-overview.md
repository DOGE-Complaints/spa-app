# next-feed-vl — target technical architecture (overview)

| Field | Value |
|-------|--------|
| **Focus** | Technical realization of package **next-feed-vl**: DS-named visual-language chrome on `#/next/feed*` without mixing classic `#/board` |
| **Story package** | [`../../tasks/backlog-stories/next-feed-vl/INDEX.md`](../../tasks/backlog-stories/next-feed-vl/INDEX.md) · STORY-SPA-NF-VL-01…12 |
| **Product brief** | [`../../tasks/backlog-stories/next-feed-vl/PRODUCT-BRIEF.md`](../../tasks/backlog-stories/next-feed-vl/PRODUCT-BRIEF.md) |
| **Package arch delta** | [`../../tasks/backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../tasks/backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01…03 |
| **Parent REQ** | [`../../requirements/22-feed-visual-redesign-phase-1.md`](../../requirements/22-feed-visual-redesign-phase-1.md) (cite only; not rewritten this run) |
| **Sibling Phase-1 arch** | [`../feed-visual-redesign-phase-1/00-overview.md`](../feed-visual-redesign-phase-1/00-overview.md) |
| **DS SSOT** | [`../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) |
| **Interview** | [`../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md`](../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| **Recorded** | 2026-10-12T11:33:00Z |
| **Mode** | Target technical architecture of the focus — **not** implementation tasks / NEW STORY / pkg |
| **Slug** | `next-feed-vl` |
| **Story scope** | **package** — 12 STORY files read |

**Levels:** functional/product = next-feed-vl stories + PRODUCT-BRIEF · this folder = how VL dual plane is realized in `spa-app` · work items = later backlog/implement waves.

---

## 1) Context & functional vs tech split

| Layer | Lives in | Content |
|-------|----------|---------|
| Functional / product | STORY-SPA-NF-VL-01…12 · PRODUCT-BRIEF · DS SSOT | DS names, Anti-mixing AC, FR-VL-*, OOS |
| Package delta | ARCH-DELTA AD-VL-01…03 | Dual plane; classic chrome ≠ next Done; Partial=block |
| Target tech (this package) | `docs/architecture/next-feed-vl/` | Boundaries, seam ownership, folder map, verify/coexistence |
| Work items | backlog / P1.3 later | NEW STORY/pkg **not** created here |

**Classify:** Mixed functional+tech (stories постановка; delivery seams locked in interview → tech here).

**Packaging / runtime image:** **N/A** — Vite `HashRouter` SPA. Method note: Git ownership ≠ image packaging — **packaging N/A**.

**Use case:** Operator ran Architect Studio on `$storyPackageDir=next-feed-vl` to lock **how** DS chrome and backend seam live under next so classic cleanup later does not break next — without new stories or code.

---

## 2) Operator locks (interview 2026-10-12)

| # | Theme | Decision | Rec |
|---|-------|----------|-----|
| Q1 | Dual-plane presentation | **B** Adapter-allowed + **hard ban-matrix**; backend connection layer **moves under next**; no soft classic wrappers as Done | accepted (+ OP: bans + clean seam) |
| Q2 | Shared semantics home | **A** Neutral semantic pockets (no UI) | accepted |
| Q3 | Transition while `#/board` live | **A** One seam, both board and next call it | accepted |
| Q4 | Presentation folders | **B** Grouped by concern under `features/feed/` + `semantics/` | accepted |
| Q5 | Verify | **B** local-five + anti-mixing on route + ban-list import gate | accepted |
| Q6 | Icons | **B** Defer Promote/Absent lock table; **no invent** SVG | accepted |
| Q7 | Current Feed* wrappers | **A** Shelter then delete from next Done path | accepted |

---

## 3) Target technical architecture (summary)

```text
#/board  → classic presentation (components/threads, Filters, …)  [preserved]
                │
                ▼
         features/feed/semantics/   ← one backend/semantic seam (next-owned)
                ▲
#/next/feed* → features/feed/{identity,search,reactions,comments,composer,…}/
               DS-named presentation only; ban classic chrome as Done
```

- **Presentation:** DS-named modules grouped by concern (see [02-ds-surface-map.md](02-ds-surface-map.md)).  
- **Semantics:** clients / mapping / Closed contracts under next-owned `semantics/` (or equivalent pocket); **no UI**.  
- **Ban-matrix:** classic chrome modules must not be the Done presentation on `#/next/feed*` (see [01-dual-plane-and-boundaries.md](01-dual-plane-and-boundaries.md)).  
- **Wrappers today:** `FeedListArea` still mounts classic `BoardIssuePost` around feed content — **shelter, not VL Done** (as-is: `spa-app/src/features/feed/FeedListArea.jsx`).

Siblings: [01](01-dual-plane-and-boundaries.md) · [02](02-ds-surface-map.md) · [03](03-verify-and-coexistence.md).

---

## 4) Ownership / contracts

| Artifact class | Owner | Notes |
|----------------|-------|-------|
| DS presentation modules | `features/feed/<concern>/` | Names from STORY UX elements |
| Backend / semantic seam | **next** (`features/feed/semantics/` target) | Board may import same seam during transition |
| Classic `#/board` chrome | existing threads/Filters trees | Do not break; out of VL mutate |
| Closed gateway/threads contracts | unchanged | No invent fields/APIs (PRODUCT-BRIEF / FR-VL-*) |
| Shell | next-shell | OOS for VL package |
| Docs Git | spa-app | This arch + stories + DS |

---

## 5) Runtime / packaging / verify / env

| Topic | Decision |
|-------|----------|
| Runtime | Vite SPA · HashRouter · `#/next/feed*` |
| Start / health | Package INDEX: `./scripts/shell/local-five-serve-and-health.sh` |
| Packaging image | **N/A** |
| Env / fail-closed | N/A for presentation-VL focus (no new deploy contracts) |
| Verify | [03](03-verify-and-coexistence.md) — local-five + anti-mixing + ban-list import gate; AD-VL-03 Partial=block |

---

## 6) Coexistence with as-is

| As-is | Status vs VL target |
|-------|---------------------|
| `feed-visual-redesign-phase-1` + AD-VP / §1b′ dual plane | Sibling; this package **extends** tech for VL atoms |
| next-feed NF-01…12 composition Done | Related only; do not reopen |
| `features/feed/*` wrappers over classic chrome | Shelter → replace with DS groups (Q7) |
| Classic `#/board` | Preserved |

Cite story keys only: **STORY-SPA-NF-VL-01…12**.

---

## 7) Open questions

1. Icon lock table: each DS icon surface → **Promote path** \| **Operator-lock Absent/collapse** (deferred Q6).  
2. Full inventory of as-is files that are already pure clients vs mixed UI+logic — **Unknown** until implement-wave Grep/Read (principle locked; no invented file list).

---

## 8) Explicit Not in this doc

- NEW STORY keys, pkg, P3, product code, stub scaffolds «so paths exist»  
- Invent gateway/threads HTTP, fields, or SVG masters  
- Rewriting PRODUCT-BRIEF / story DoD (links only this run)  
- Second architecture prompt for the same focus  

---

## 9) Handoff

- Optional: later PA.2 / REQ polish with pointers here (still functional).  
- Optional: implement / P1.3 on **VL-01** when operator agrees.  
- NEW work items only via backlog prompts — **not** this doc.  
- No second architecture prompt.
