# Hard audit — STORY-SPA-CT-03 CommentTree nesting (P4 Validate RO)

> **UTC:** 2026-10-18T13:22:13Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR §4.2** · M153 A/B · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-03-comment-tree-nesting.md](./STORY-SPA-CT-03-comment-tree-nesting.md)  
> **Backlog AC:** [STORY-SPA-CT-03-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.2](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) T-A/T-cap/T-depth/T-B  
> **Package:** [`pkg-000161`](../../../spa-active-packages/pkg-000161-20261018-epic-spa-24-ct-03-comment-tree-nesting.yaml) · P3 gate claimed **BLOCK** `2026-10-18T13:21:17Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A hard AC structure **PASS**: nest A→A1→A1a · `VISUAL_INDENT_CAP`≠`maxDepth` · Reply gate (`canReplyAtDepth`) · max-depth copy · orphan/cycle flat fallback · vitest feed-lab+thread-mount **81/81**. Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Hard AC structure (nest · indent≠maxDepth · Reply · flat) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard AC map (this fence)

| Hard AC | Fact | Score |
|---------|------|-------|
| Nest | [`CommentTree`](../../../../../../src/features/thread-mount/tree/CommentTree.jsx) / [`buildCommentForest`](../../../../../../src/features/thread-mount/tree/buildCommentForest.js) · A→A1→A1a · shot 01 | **PASS** |
| Indent cap ≠ maxDepth | [`VISUAL_INDENT_CAP=3`](../../../../../../src/features/thread-mount/config/threadMountConfig.js) · `resolveMaxDepth` independent · shot 02/04 · vitest | **PASS** |
| Reply gate | `canReplyAtDepth` · `data-tm-reply` eligible/blocked · max-depth copy · shot 03 | **PASS** |
| Flat fallback | orphan → `data-tm-forest=flat` · `tm-comment-flat-fallback` · shot 05 | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX-MIRROR §4.2)

| Source | Rule | This P4 |
|--------|------|---------|
| T-A | Nested tree · literal bodies · connectors | structure **PASS** · shot 01 |
| T-cap | Visual indent max 3 | structure **PASS** · `data-tm-indent` cap |
| T-depth | Reply iff depth < maxDepth · ≠ visual cap | structure **PASS** |
| T-B | Max depth copy · no Reply | structure **PASS** · shot 03 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Fixture nest A→A1→A1a | FixtureAdapter + shot 01 | **PASS** (structure) |
| maxDepth≠visual cap | shots 02/04 · maxDepth=5 · cap 3 | **PASS** (structure) |
| Vitest reply eligibility | `threadMount.ct03` **6/6** · suite **81/81** | **PASS** |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Config knobs | `DEFAULT_MAX_DEPTH` · `VISUAL_INDENT_CAP` · `canReplyAtDepth` | **PASS** |
| CommentTree / CommentNode | nest · Reply · max-depth copy | **PASS** |
| Forest builder | tree / flat orphan|cycle | **PASS** |
| Lab stands F–I | ThreadLabCanvas CT-03 Path A | **PASS** |
| Vitest | feed-lab + thread-mount **19 files · 81 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/thread` F–I)

### Inventory (md5 ≡ full-cycle README · `opEye: Absent`)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-nested-tree.png` | `5d87e39035e0` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-visual-indent-cap.png` | `82952be747b6` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-max-depth-no-reply.png` | `0f8daa9c529d` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | `04-depth-vs-cap.png` | `82952be747b6` | Evidence Present · Visual **BLOCK** · OP Absent · **≡02** |
| 05 | `05-flat-fallback.png` | `5ba9db9d0249` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present).

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Nest A→A1→A1a | 01 | pass (structure) |
| Visual indent cap | 02 | pass (structure) |
| Max depth · no Reply | 03 | pass (structure) |
| Depth vs cap | 04 | pass (structure) · ≡02 honesty |
| Flat fallback | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Composer CT-04 · attachments · invent branch HTTP · Share on node · invent OP PASS.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs M153 |
| **F3** | Info | Shots 02≡04 md5 (`82952be747b6`) — depth-vs-cap frame reuse honesty | Optional distinct re-capture |
| **F4** | Info | Story-root `screenshots/README.md` Absent · `tmp-ct03-capture.mjs` naming | Optional add README / promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · hard AC structure **PASS** · OP eye **Absent** · vitest **81/81** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-03-comment-tree-nesting/audit-STORY-SPA-CT-03-execution-2026-10-18.md`
