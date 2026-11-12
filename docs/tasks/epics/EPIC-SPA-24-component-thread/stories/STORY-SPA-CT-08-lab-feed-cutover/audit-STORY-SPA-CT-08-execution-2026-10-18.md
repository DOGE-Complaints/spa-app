# Hard audit — STORY-SPA-CT-08 Lab feed cutover ThreadMount (P4 Validate RO)

> **UTC:** 2026-10-18T14:07:33Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR §4.4 L-cut/L-fix** · `#/lab/feed` · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-08-lab-feed-cutover.md](./STORY-SPA-CT-08-lab-feed-cutover.md)  
> **Backlog AC:** [STORY-SPA-CT-08-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.4](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)  
> **Package:** [`pkg-000166`](../../../spa-active-packages/pkg-000166-20261018-epic-spa-24-ct-08-lab-feed-cutover.yaml) · P3 gate claimed **BLOCK** `2026-10-18T14:06:35Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent Live HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: `FeedLabThreadMount` + FixtureAdapter · card/detail `data-lab-thread-mount` · plane thin-wrap · stands A–E/TREE/GATE · ban `FeedDiscussionBlock` · Comment expand · vitest feed-lab+thread-mount **111/111** (`feedLab.ct08` **6/6**). Phase B: Path A shots `01`–`08` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (L-cut host · L-fix stands · ban product block) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| L-cut card/detail → ThreadMount | [`FeedLabThreadMount`](../../../../../../src/features/feed-lab/post/thread/FeedLabThreadMount.jsx) · [`FeedPostCard`](../../../../../../src/features/feed-lab/post/FeedPostCard.jsx) · shot 08 | **PASS** |
| Plane thin-wrap · no dual discussion UI | [`FeedDiscussionPlane`](../../../../../../src/features/feed-lab/post/discussion/FeedDiscussionPlane.jsx) wraps ThreadMount only | **PASS** |
| `data-lab-thread-mount` markers | card/detail/host · ct08 | **PASS** |
| L-fix stands A–E · TREE · GATE | shots 01–07 · `FeedLabCt08Stands` | **PASS** |
| Ban FeedDiscussionBlock on lab Done | `feedLab.ct08` source scan | **PASS** |
| Comment zone expands/focuses | ct08 · shot 08 | **PASS** |
| OP eye PASS | **Absent** (`data-lab-visual-done=false`) | **BLOCK** |

---

## Normative map (OP-UX-MIRROR §4.4)

| Source | Rule | This P4 |
|--------|------|---------|
| L-cut | FeedPostCard / detail use ThreadMount · retire tip or wrap | structure **PASS** · shot 08 |
| L-fix | FixtureAdapter · stands A–E / tree / gate | structure **PASS** · shots 01–07 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| `#/lab/feed` shows ThreadMount under strip | shot 08 · `data-lab-thread-mount` | **PASS** (structure) |
| Comment zone still expands/focuses | ct08 + ct02 · shot 08 | **PASS** (structure) |
| Vitest cutover · no banned product block | `feedLab.ct08` **6/6** · suite **111/111** | **PASS** |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| FeedLabThreadMount host | FixtureAdapter · ThreadMount | **PASS** |
| Card/detail cutover | FeedPostCard · FeedIssueDetailBody | **PASS** |
| Stands fixtures | labCt08Stands A–E/TREE/GATE | **PASS** |
| Ban product block | no FeedDiscussionBlock import on Done path | **PASS** |
| Vitest | feed-lab + thread-mount **24 files · 111 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/feed`)

### Inventory (md5 ≡ full-cycle README · OP Absent · `visualDone: false`)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-stand-loading.png` | `e3cb965b5d7e` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-stand-empty.png` | `c4b74486af3b` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-stand-populated.png` | `f3084a5baced` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | `04-stand-unavailable.png` | `61c177cbf15b` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-stand-narrow.png` | `e0ec533d1225` | Evidence Present · Visual **BLOCK** · OP Absent |
| 06 | `06-stand-tree-nest.png` | `12fc80c2a770` | Evidence Present · Visual **BLOCK** · OP Absent |
| 07 | `07-stand-gate.png` | `1b9d6d753efd` | Evidence Present · Visual **BLOCK** · OP Absent |
| 08 | `08-card-thread-cutover.png` | `ac0e5e83d290` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present). Shots **01–08 unique** md5 (no pairwise ≡ honesty hit).

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Stand loading | 01 | pass (structure) |
| Stand empty | 02 | pass (structure) |
| Stand populated | 03 | pass (structure) |
| Stand unavailable | 04 | pass (structure) |
| Stand narrow | 05 | pass (structure) |
| TREE nest | 06 | pass (structure) |
| GATE verify | 07 | pass (structure) |
| Card ThreadMount cutover | 08 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: `#/next/feed` · `#/board` · invent Live threads · invent OP PASS.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs §4.4 L-cut/L-fix |
| **F3** | Info | Story-root `screenshots/README.md` Absent · `tmp-ct08-capture.mjs` naming | Optional add README / promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **111/111** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-08-lab-feed-cutover/audit-STORY-SPA-CT-08-execution-2026-10-18.md`
