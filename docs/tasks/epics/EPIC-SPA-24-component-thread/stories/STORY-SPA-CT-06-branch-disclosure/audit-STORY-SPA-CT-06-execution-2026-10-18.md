# Hard audit — STORY-SPA-CT-06 Branch disclosure local (P4 Validate RO)

> **UTC:** 2026-10-18T13:49:14Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR §4.2 T-coll/T-exp/T-err** · M153 branch · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-06-branch-disclosure.md](./STORY-SPA-CT-06-branch-disclosure.md)  
> **Backlog AC:** [STORY-SPA-CT-06-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.2](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)  
> **Package:** [`pkg-000164`](../../../spa-active-packages/pkg-000164-20261018-epic-spa-24-ct-06-branch-disclosure.yaml) · P3 gate claimed **BLOCK** `2026-10-18T13:47:47Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent branch-fetch HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: `branchDisclosure` · collapsed/expanding/error · sync when children local · `data-tm-branch-fetch=false` · stands S–W · vitest feed-lab+thread-mount **99/99** (`threadMount.ct06` **6/6**). Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (collapse/expand/error · sync · no invent fetch) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| Collapsed · View replies when count local | [`CommentTree`](../../../../../../src/features/thread-mount/tree/CommentTree.jsx) · [`viewRepliesLabel`](../../../../../../src/features/thread-mount/config/threadMountConfig.js) · shot 01 · stand S | **PASS** |
| Expanding local chrome · tree intact | `branchExpandMode=delayed` · shot 02 · stand T | **PASS** |
| Sync expand when children local | `branchExpandMode=sync` · shot 03 · stand V | **PASS** |
| Error · Couldn’t load · Try again scoped | shot 04 · stand U · vitest | **PASS** |
| No invent branch-fetch | `data-tm-branch-fetch="false"` · shot 05 · stand W | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX-MIRROR §4.2)

| Source | Rule | This P4 |
|--------|------|---------|
| T-coll | Branch collapsed · derived count when complete | structure **PASS** · shot 01 |
| T-exp | Expanding local · no invent branch HTTP | structure **PASS** · shot 02 |
| T-err | Error local · Try again | structure **PASS** · shot 04 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Collapse/expand on fixture tree | stands S/V/W · shots 01/03/05 · ct06 | **PASS** (structure) |
| Error stand without invent fetch | stand U · shot 04 · `data-tm-branch-fetch=false` | **PASS** (structure) |
| Vitest local disclosure | `threadMount.ct06` **6/6** · suite **99/99** | **PASS** |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Branch state machine | collapsed / expanding / expanded / error per id | **PASS** |
| Sync vs delayed/error | `branchExpandMode` · no network | **PASS** |
| CommentNode chrome | View replies · Loading · error+retry | **PASS** |
| Lab stands S–W | ThreadLabCanvas CT-06 Path A | **PASS** |
| Vitest | feed-lab + thread-mount **22 files · 99 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/thread` S–W)

### Inventory (md5 ≡ full-cycle README · `opEye: Absent`)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-branch-collapsed.png` | `a8b3bbe011cc` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-branch-expanding.png` | `5651dac1a0cc` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-branch-sync-expand.png` | `b38b0b162bd8` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | `04-branch-error.png` | `304091abce1d` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-no-invent-fetch.png` | `df3fd27ee197` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present). Shots **01–05 unique** md5 (no pairwise ≡ honesty hit).

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Collapsed T-coll | 01 | pass (structure) |
| Expanding T-exp | 02 | pass (structure) |
| Sync expand | 03 | pass (structure) |
| Error T-err | 04 | pass (structure) |
| No invent fetch | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Server pagination · invent branch HTTP · invent OP PASS.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs M153 T-coll/T-exp/T-err |
| **F3** | Info | Story-root `screenshots/README.md` Absent · `tmp-ct06-capture.mjs` naming | Optional add README / promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **99/99** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-06-branch-disclosure/audit-STORY-SPA-CT-06-execution-2026-10-18.md`
