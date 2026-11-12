# Hard audit — STORY-SPA-CT-01 IssueThreadBlock states (P4 Validate RO)

> **UTC:** 2026-10-18T13:02:43Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **M152** + **OP-UX-MIRROR §4.1** · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-01-issue-thread-block-states.md](./STORY-SPA-CT-01-issue-thread-block-states.md)  
> **Backlog AC:** [STORY-SPA-CT-01-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.1](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) · [M152](../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)  
> **Package:** [`pkg-000159`](../../../spa-active-packages/pkg-000159-20261018-epic-spa-24-ct-01-issue-thread-block-states.yaml) · P3 gate claimed **BLOCK** `2026-10-18T13:01:37Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent authors/HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A hard AC structure **PASS**: loading / empty / populated-collapsed / unavailable / narrow · literal bodies in C · skeletons only in A · FixtureAdapter (no invent authors/HTTP) · Live fail-closed · civic Open issue interactive · `#/lab/thread` stands A–E · vitest thread-mount **9/9**. Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Hard AC structure (A–E · literal C · skeleton A · no invent · civic) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard AC map (this fence)

| Hard AC | Fact | Score |
|---------|------|-------|
| loading / empty / populated-collapsed / unavailable / narrow | [`IssueThreadBlock`](../../../../../../src/features/thread-mount/IssueThreadBlock.jsx) statuses · lab stands A–E · shots 01–05 | **PASS** |
| Literal C · skeleton A | populated previews = fixture bodies · skeleton only `status=loading` · vitest | **PASS** |
| No invent authors / HTTP | fixtures body-only · no author/avatar/createdAt · LiveAdapter fail-closed | **PASS** |
| Civic chrome interactive | `tm-lab-open-issue-*` button enabled · shot 01/03 Open issue | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX-MIRROR §4.1 · M152)

| Source | Rule | This P4 |
|--------|------|---------|
| P-A | Loading · skeletons only in thread region · civic intact | structure **PASS** · shot 01 |
| P-B | Empty · invitation · composer entry | structure **PASS** · shot 02 |
| P-C | Collapsed · literal body previews · View discussion | structure **PASS** · shot 03 |
| P-D | Unavailable · Try again · no fake content | structure **PASS** · shot 04 |
| P-E | 390 narrow · same C semantics | structure **PASS** · shot 05 · `data-lab-narrow` |
| P-forbid | No fake authors/counts · no gray bars for loaded bodies | structure **PASS** |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Fixture stands A/B/C/D (+ E) | `#/lab/thread` · ThreadLabCanvas | **PASS** (structure) |
| Literal C · skeletons only A | shots 01/03 · cr01 | **PASS** (structure) |
| Vitest status → chrome markers | `threadMount.ct01` **9/9** | **PASS** |
| Verify lab · OP eye | Lab Present · OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| IssueThreadBlock A–D | status chrome · testids `tm-thread-*` | **PASS** |
| ThreadMount status | owns `data-tm-status` · narrow attr | **PASS** |
| FixtureAdapter | A–D snapshots · M152 illustrative bodies | **PASS** |
| LiveAdapter | unwired · unavailable · no invent HTTP | **PASS** |
| Lab matrix | stands A–E · civic stub Open issue | **PASS** |
| FeedLab thin host | `FeedLabThreadMount` Present (CT-08 cutover OOS soft) | **PASS** |
| Vitest | thread-mount **1 file · 9 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/thread`)

### Inventory (md5 ≡ README · story-root README Present · `opEye: Absent` in capture-meta)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-loading.png` | `98feeed4f697` | Evidence Present · Visual **BLOCK** · OP Absent · skeleton A |
| 02 | `02-empty.png` | `8000acf103c3` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-populated-collapsed.png` | `262c93f583b9` | Evidence Present · Visual **BLOCK** · OP Absent · literal C |
| 04 | `04-unavailable.png` | `43931341e1d0` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-narrow-390.png` | `1374327a20f8` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** all five md5 **unique** · OP Absent · Partial BLOCK.

### Dual match (structure)

| M152 / mirror | Shot | Match |
|---------------|------|-------|
| A loading + skeleton | 01 | pass (structure) |
| B empty | 02 | pass (structure) |
| C literal collapsed | 03 | pass (structure) |
| D unavailable | 04 | pass (structure) |
| E narrow | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: M153 nest · M157 · invent HTTP/Identity/OP PASS · `#/next/feed` · feed cutover CT-08.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent (structure-only PASS) | OP eye then polish vs M152 |
| **F3** | Info | Feed cutover verify deferred to CT-08 (lab matrix on `#/lab/thread` held) | CT-08 |
| **F4** | Info | `tmp-ct01-capture.mjs` naming | Optional promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · hard AC structure **PASS** · OP eye **Absent** · vitest **9/9** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-01-issue-thread-block-states/audit-STORY-SPA-CT-01-execution-2026-10-18.md`
