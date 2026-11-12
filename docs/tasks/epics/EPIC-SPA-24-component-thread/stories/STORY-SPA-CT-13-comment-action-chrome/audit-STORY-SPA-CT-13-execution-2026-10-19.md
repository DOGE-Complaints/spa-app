# Hard audit — STORY-SPA-CT-13 Comment React/Reply action chrome (P4 Validate RO)

> **UTC:** 2026-10-19T12:40:47Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX residual §3 G-H5** · M153 React/Reply · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-13-comment-action-chrome.md](./STORY-SPA-CT-13-comment-action-chrome.md)  
> **Backlog AC:** [STORY-SPA-CT-13-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX residual 2026-10-19](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)  
> **Package:** [`pkg-000171`](../../../spa-active-packages/pkg-000171-20261019-epic-spa-24-ct-13-comment-action-chrome.yaml) · P3 gate claimed **BLOCK** `2026-10-19T12:39:12Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent people/HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: React\|Reply pill pair + separator · density wrap around `renderCommentReactions` · `reply.svg` pill not underline-only · R-bound no people import · vitest feed-lab+thread-mount **136/136** (`threadMount.ct13` **4/4**). Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (G-H5 pills · density wrap · reply.svg · R-bound) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| G-H5 pill pair + separator | [`CommentNode`](../../../../../../src/features/thread-mount/tree/CommentNode.jsx) `tm-comment-action-pills` · shot 01 | **PASS** |
| React density wrap · plug | `data-tm-react-density=compact` · shot 03 · 05 | **PASS** |
| Reply icon+label · not underline | `TM_REPLY_ICON_SRC` Present `reply.svg` · shot 04 | **PASS** |
| Blue grammar tokens | `--rm-mark-accent-insightful` · CSS | **PASS** |
| R-bound no people in thread-mount | ct13 source ban · CT-09 held | **PASS** |
| No Share on comment node | ct13 · actions | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX residual §3)

| Source | Rule | This P4 |
|--------|------|---------|
| G-H5 | Paired React \| Reply pills + sep · density wrap · no people in thread | structure **PASS** · shots 01–05 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Pill pair React \| Reply + separator | shots 01–02 · `tm-comment-action-pills` | **PASS** (structure) |
| React opens via plug · not strip DNA | density wrap · shot 03 · 05 | **PASS** (structure) |
| Reply underline-only gone | reply.svg pill · shot 04 | **PASS** (structure) |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Pill row + sep | CommentNode.jsx/css · `tm-comment-action-sep` | **PASS** |
| React density wrap | `reactions--density` · plug held | **PASS** |
| Reply pill icon | Present `/icons/next-feed/actions/reply.svg` | **PASS** |
| R-bound | no ReactorsPopover import in thread-mount | **PASS** |
| Vitest | feed-lab + thread-mount **30 files · 136 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/feed`)

### Inventory (md5 ≡ full-cycle README · OP Absent)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-pill-pair-react-reply.png` | `c2c44999fd8f` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-action-pills-row.png` | `97def5655c12` | Evidence Present · Visual **BLOCK** · OP Absent · **crop** |
| 03 | `03-react-density-wrap.png` | `c29acec07df4` | Evidence Present · Visual **BLOCK** · OP Absent · **crop** |
| 04 | `04-reply-pill-icon.png` | `0bcdbe134192` | Evidence Present · Visual **BLOCK** · OP Absent · **crop** |
| 05 | `05-react-plug-opens.png` | `621886f00fe6` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present). Shots **01–05 unique** md5.

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Pill pair + sep | 01 | pass (structure) |
| Pills row crop | 02 | pass (structure) · crop honesty |
| Density wrap | 03 | pass (structure) · crop honesty |
| Reply pill icon | 04 | pass (structure) · crop honesty |
| React plug opens | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Rewrite CR · invent people HTTP · spine (CT-14) · invent OP PASS · `#/next/feed`.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs G-H5 / M153 |
| **F3** | Info | Shots 02–04 control crops · story-root `screenshots/README.md` Absent · `tmp-ct13-capture.mjs` naming | Optional fuller frames / README |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **136/136** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-13-comment-action-chrome/audit-STORY-SPA-CT-13-execution-2026-10-19.md`
