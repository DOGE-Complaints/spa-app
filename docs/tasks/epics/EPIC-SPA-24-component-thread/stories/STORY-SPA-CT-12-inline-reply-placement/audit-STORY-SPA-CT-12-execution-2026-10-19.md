# Hard audit — STORY-SPA-CT-12 Inline reply placement (P4 Validate RO)

> **UTC:** 2026-10-19T12:29:26Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX residual §3 G-H4** · M153-C · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-12-inline-reply-placement.md](./STORY-SPA-CT-12-inline-reply-placement.md)  
> **Backlog AC:** [STORY-SPA-CT-12-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX residual 2026-10-19](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)  
> **Package:** [`pkg-000170`](../../../spa-active-packages/pkg-000170-20261019-epic-spa-24-ct-12-inline-reply-placement.yaml) · P3 gate claimed **BLOCK** `2026-10-19T12:27:25Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: `renderReplyComposer` under parent · `data-tm-reply-inline=true` · root composer stays after `IssueThreadBlock` · cancel clears target · draft/fail single-owner · vitest feed-lab+thread-mount **132/132** (`threadMount.ct12` **4/4**). Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (G-H4 inline under parent · root bottom · cancel) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| G-H4 reply composer under parent | [`CommentNode`](../../../../../../src/features/thread-mount/tree/CommentNode.jsx) reply slot · shot 01 | **PASS** |
| Not after entire IssueThreadBlock | `showRootComposer` only when !inline · ct12 · shot 02 | **PASS** |
| Root compose bottom | shot 04 · ct12 | **PASS** |
| Cancel clears inline | shot 03 · cancel → root | **PASS** |
| Draft/fail single-owner | ct12 fail F under parent · one composer | **PASS** |
| Soft L-connector / in-context | shot 05 · CT-14 spine OOS soft | **PASS** (structure soft) |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX residual §3)

| Source | Rule | This P4 |
|--------|------|---------|
| G-H4 | Reply composer under parent in tree · not sibling after all comments | structure **PASS** · shots 01–02 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Reply → composer under parent · not below entire thread | `data-tm-reply-inline=true` · shots 01–02 | **PASS** (structure) |
| Root Write a comment at root position | shot 04 · after IssueThreadBlock | **PASS** (structure) |
| Cancel reply restores prior layout | shot 03 · ct12 | **PASS** (structure) |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Reply slot contract | `renderReplyComposer` when replyTarget matches | **PASS** |
| Mount split | root bottom · reply leaves post-block sibling | **PASS** |
| Cancel clear | clears `replyParentId` · unmounts inline | **PASS** |
| Draft/fail hold | single composer · fail under parent | **PASS** |
| Vitest | feed-lab + thread-mount **29 files · 132 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/feed`)

### Inventory (md5 ≡ full-cycle README · OP Absent)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-reply-under-parent.png` | `b08e98e9947e` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-composer-not-after-block.png` | `89ad47171e0d` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-cancel-clears-inline.png` | `97b2e273b94c` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | `04-root-composer-bottom.png` | `5dcf9fad8e7d` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-in-context-reply-slot.png` | `05dc76f241b0` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present). Shots **01–05 unique** md5.

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Reply under parent | 01 | pass (structure) |
| Not after block | 02 | pass (structure) |
| Cancel clears inline | 03 | pass (structure) |
| Root composer bottom | 04 | pass (structure) |
| In-context slot (soft spine) | 05 | pass (structure soft) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Composer icons (CT-11) · action pills (CT-13) · invent HTTP/OP PASS · `#/next/feed`.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs G-H4 / M153-C |
| **F3** | Info | Story-root `screenshots/README.md` Absent · `tmp-ct12-capture.mjs` naming · soft CT-14 spine residual | Optional README / CT-14 |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **132/132** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-12-inline-reply-placement/audit-STORY-SPA-CT-12-execution-2026-10-19.md`
