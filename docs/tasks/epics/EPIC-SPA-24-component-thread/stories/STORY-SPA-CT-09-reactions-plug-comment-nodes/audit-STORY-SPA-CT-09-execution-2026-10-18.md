# Hard audit — STORY-SPA-CT-09 Reactions plug on CommentNode (P4 Validate RO)

> **UTC:** 2026-10-18T14:44:31Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR §4.2 T-react · §4.4 R-plug/R-bound** · M153 React · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-09-reactions-plug-comment-nodes.md](./STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
> **Backlog AC:** [STORY-SPA-CT-09-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.2 / §4.4](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)  
> **Package:** [`pkg-000167`](../../../spa-active-packages/pkg-000167-20261018-epic-spa-24-ct-09-reactions-plug-comment-nodes.yaml) · P3 gate claimed **BLOCK** `2026-10-18T14:42:44Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent people/HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: `renderCommentReactions` slot on CommentNode · `FeedLabReactionsMount` `target=comment` · React+Reply only · no Share strip on node · no ReactorsPopover/people import in thread-mount · root strip reactSlot held · vitest feed-lab+thread-mount **118/118** (`threadMount.ct09` **3/3** · `feedLab.ct09` **4/4**). Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (R-plug slot · R-bound · T-react · root strip) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| R-plug CommentNode slot | [`CommentNode`](../../../../../../src/features/thread-mount/tree/CommentNode.jsx) `renderCommentReactions` · shot 01 | **PASS** |
| Lab wire `target=comment` | [`FeedLabThreadMount`](../../../../../../src/features/feed-lab/post/thread/FeedLabThreadMount.jsx) · `data-rm-target=comment` | **PASS** |
| Picker · no composer steal | shot 02 · focus signal held · ct09 | **PASS** |
| React + Reply only · no Share strip | shot 03 · vitest | **PASS** |
| Root strip reactSlot held | shot 04 · card `FeedLabReactionsMount` | **PASS** |
| R-bound · no people from thread | shot 05 · source ban ReactorsPopover | **PASS** |
| OP eye PASS | **Absent** (`visualDone: false`) | **BLOCK** |

---

## Normative map (OP-UX-MIRROR)

| Source | Rule | This P4 |
|--------|------|---------|
| T-react | Comment React = reactions-mount · no Share/Reactions on node | structure **PASS** · shots 01/03 |
| R-plug | Every CommentNode mounts reactions-mount comment target | structure **PASS** · shot 01 |
| R-bound | Thread never opens picker/people | structure **PASS** · shot 05 · src ban |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Nested comments show React from reactions-mount | shot 01 · TREE slots `data-rm-target=comment` | **PASS** (structure) |
| Opening React opens picker · not composer steal | shot 02 · focus signal · ct09 | **PASS** (structure) |
| Vitest comment target + no people import | `threadMount.ct09` · `feedLab.ct09` · suite **118/118** | **PASS** |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Node reaction slot | CommentNode · ThreadMount host prop | **PASS** |
| Lab wire | FeedLabReactionsMount per commentId | **PASS** |
| Boundary guard | no ReactorsPopover / people ownership in thread-mount | **PASS** |
| Vitest | feed-lab + thread-mount **26 files · 118 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/feed`)

### Inventory (md5 ≡ full-cycle README · OP Absent · `visualDone: false`)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-comment-node-react-plug.png` | `350cb52a768e` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-nested-react-picker.png` | `36b73f68759f` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-reply-eligible-no-share-strip.png` | `68bd9dca34c1` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | `04-root-strip-react-held.png` | `bcce9cddbf51` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-boundary-no-people-from-thread.png` | `78c7cf89d098` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present). Shots **01–05 unique** md5 (no pairwise ≡ honesty hit).

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Comment React plug | 01 | pass (structure) |
| Nested picker open | 02 | pass (structure) |
| Reply · no Share strip | 03 | pass (structure) |
| Root strip held | 04 | pass (structure) |
| Boundary · peopleOpen=false | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: People on comment aggregate invent · CR-20…22 icon residual · dual stacks · invent HTTP/OP PASS · CR rewrite.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs T-react / R-plug/R-bound |
| **F3** | Info | Story-root `screenshots/README.md` Absent · `tmp-ct09-capture.mjs` naming | Optional add README / promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **118/118** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-09-reactions-plug-comment-nodes/audit-STORY-SPA-CT-09-execution-2026-10-18.md`
