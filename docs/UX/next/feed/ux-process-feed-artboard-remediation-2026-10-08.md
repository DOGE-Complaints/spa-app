# UX process — feed artboard / pack remediation backlog

**Status:** open items for UX process (not engineering invent)  
**As-of:** 2026-10-08T12:23:48Z  
**Parent audit:** [analysis-spa-ux-next-feed-redesign-readiness-for-tech-arch-2026-10-08.md](analysis-spa-ux-next-feed-redesign-readiness-for-tech-arch-2026-10-08.md)  
**Feed INDEX:** [../UX/next/feed/INDEX.md](../UX/next/feed/INDEX.md)  
**Operator decision this wave:** written state sheets M149–M160 marked **accepted for handoff**; residual visual/consistency polish tracked **here**.

Method: [analysis.mdc](../../../.cursor/rules/analysis.mdc) — only verified gaps below.

---

## A) New packs validation (operator-added)

### A1 Interaction & Behavior — PARTIAL (usable)

File: [`DOGEstonia-interaction-and-behavior-specification-v1.0.md`](../UX/next/feed/DOGEstonia-interaction-and-behavior-specification-v1.0.md)

| Fix | Why |
|-----|-----|
| Add **Date** + **Related** links (USI, Component, Data-to-UI, Asset Manifest, INDEX) | Peers have Related; artboards cite by title only |
| Soften claim that all state IDs live in this file | IDs SSOT = Unified State Inventory |

**Verdict:** sufficient behavioral SSOT for tech-arch; polish docs metadata.

### A2 Asset Manifest — PARTIAL (usable)

File: [`DOGEstonia-asset-manifest-v1.0.md`](../UX/next/feed/DOGEstonia-asset-manifest-v1.0.md)

| Fix | Why |
|-----|-----|
| Register [`dogestonia-icon-system-v1.0/`](../UX/next/feed/dogestonia-icon-system-v1.0/) in manifest (§24 currently says UI icons not supplied) | Icon pack exists on disk |
| Locate or drop claim for `DOGEstonia-logo-square.png` | SHA claimed; file **missing** under `spa-app` |
| Restore or mark missing `image-edit-target-*` PNGs | Listed; not found |
| Document on-disk paths for horizontal logo / character | Horizontal in `public/assets/`; character in `docs/UX/references/` |
| Add Related → INDEX / Design QA / Icon QA | Cross-link gap |

**Verdict:** rights/readiness vocabulary Ready; production library incomplete (documented).

### A3 Coverage & Generation Backlog

Previously missing. **Materialized** as inventory register:  
[`DOGEstonia-current-design-state-artboard-coverage-and-generation-backlog-v1.0.md`](../UX/next/feed/DOGEstonia-current-design-state-artboard-coverage-and-generation-backlog-v1.0.md)  
UX may enrich with generation prompts/history; must not invent new M-IDs without operator ask.

---

## B) Artboard consistency (M149–M160)

### B0 Systemic (done in docs wave / remaining for UX visual)

| ID | Issue | Action for UX |
|----|-------|---------------|
| SYS-1 | Predecessors claimed «accepted» while Status was pending | Docs wave: Status → accepted handoff; keep predecessor lines truthful |
| SYS-2 | Specs cite `generated_images/exec-*.png` while deliverable is colocated `artboards/mockup-mNNN-….png` | Add note in each sheet or global: colocated path is canonical |
| SYS-3 | Clear-filters omission (M149 accepted limitation + M151 audit) | Optional targeted regen; written rule already binding |
| SYS-4 | Reactions catalog Authority points at dated md not in `feed/` | Point to `spa-app/src/components/threads/reactionsV1Catalog.js` and/or workshop handoff analysis; or materialize UX catalog md |

### B1 Per-sheet residual (visual / text polish — non-blocking for written acceptance)

| ID | Residual | Suggested UX action |
|----|----------|---------------------|
| M149 | Panel A missing Clear filters (documented accepted limitation) | Optional regen panel A **or** keep limitation forever |
| M150 | Media crop B wider than preferred 16:9; C excess blank before Open issue | Targeted correction **or** accept documented audit |
| M150 | § artboard title still says rev 1 while Status rev 3 | Align title string |
| M151 | Visual: Clear filters in A/B; Reactions crop in C1 | Targeted correction |
| M152 | None critical after rev4 literal bodies | Keep literal-comment rule |
| M153 | Formal Scope section thin (merged into Purpose) | Optional expand Scope/non-goals |
| M154 | Catalog path Authority | See SYS-4 |
| M155 | People fixtures illustrative — already tagged API pending | No invent; wait `DUI-Q08` |
| M156 | Add explicit Scope/non-goals; stub honesty OK | Optional |
| M157–M158 | None beyond SYS | — |
| M159 | Authority wording vs M156 queue order | Clarify «covers M149–M158 surfaces» ≠ «M156 accepted first» |
| M160 | Text «media omitted» vs PNG/audit showing media | Align §2 with pixels **or** re-crop without media |

---

## C) Do **not** ask engineering to invent

- Closing `DUI-Q01`–`Q24` without product/API owners  
- Shipping schema_card / people / server search / pagination as if confirmed  
- Cabinet redesign from ProfileRail chrome  
- Extracting Facebook reference screenshots into product assets  

---

## D) Done this docs wave (operator ask)

- [x] `feed/INDEX.md`  
- [x] Coverage & backlog file materialized (inventory)  
- [x] Validate Interaction + Asset Manifest → remediation A1/A2  
- [x] Artboard Status → **accepted** (handoff) with residual list here  
- [x] Token/REQ/arch paths → `feed/…` + fixed `tokens.css` relative link  
