# Hard audit — STORY-SPA-CT-11 Composer icon chrome (P4 Validate RO)

> **UTC:** 2026-10-19T12:16:25Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX residual §3 G-H2 · G-H6** · M152-B · M153 C/D · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-11-composer-icon-chrome.md](./STORY-SPA-CT-11-composer-icon-chrome.md)  
> **Backlog AC:** [STORY-SPA-CT-11-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX residual 2026-10-19](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)  
> **Package:** [`pkg-000169`](../../../spa-active-packages/pkg-000169-20261019-epic-spa-24-ct-11-composer-icon-chrome.yaml) · P3 gate claimed **BLOCK** `2026-10-19T12:15:05Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent SVG/HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: `attach.svg` paperclip · circle send empty (`data-tm-send-chrome=circle`) · labelled Post+plane · Attach left / Post right · AttachmentRef D/E held · vitest feed-lab+thread-mount **128/128** (`threadMount.ct11` **5/5**). Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (G-H2 circle send · G-H6 paperclip+plane · layout) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| G-H6 Attach paperclip | [`TM_ATTACH_ICON_SRC`](../../../../../../src/features/thread-mount/composer/ThreadComposer.jsx) · Present `attach.svg` · shot 01/03 | **PASS** |
| G-H2 circle yellow send empty | `data-tm-send-chrome=circle` · `send.svg` · shot 01 | **PASS** |
| G-H6 labelled Post + plane | `post--labelled` · shot 02 · reply shot 04 | **PASS** |
| Layout Attach left · Post right | CSS actions · shot 05 | **PASS** |
| AttachmentRef D/E held | ct11 attach click · CT-05 path | **PASS** |
| No invent SVG | reuse Present attach/send.svg only | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX residual §3)

| Source | Rule | This P4 |
|--------|------|---------|
| G-H2 | Empty path: paperclip + yellow circle send | structure **PASS** · shot 01 |
| G-H6 | Root/reply: paperclip Attach + labelled Post + plane | structure **PASS** · shots 02/04 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Paperclip Attach · Post send/plane chrome | shots 01–03 · icon testids | **PASS** (structure) |
| Empty send = circular yellow send | shot 01 · `data-tm-send-chrome=circle` | **PASS** (structure) |
| Vitest icon DOM · attach still works | `threadMount.ct11` **5/5** · suite **128/128** | **PASS** |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Attach icon | `/icons/next-feed/actions/attach.svg` Present on disk | **PASS** |
| Send icon | `/icons/next-feed/actions/send.svg` Present · circle vs labelled | **PASS** |
| AttachmentRef | unchanged CT-05 path · ct11 attach → ready | **PASS** |
| Vitest | feed-lab + thread-mount **28 files · 128 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/feed`)

### Inventory (md5 ≡ full-cycle README · OP Absent)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-empty-circle-send-attach.png` | `fa046f28ad66` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-populated-post-plane.png` | `404dd4fb9536` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-attach-paperclip.png` | `279ba3a484f6` | Evidence Present · Visual **BLOCK** · OP Absent · **crop** |
| 04 | `04-reply-post-plane.png` | `6e373d5eeb37` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-actions-attach-left-post-right.png` | `7b3defb97fc4` | Evidence Present · Visual **BLOCK** · OP Absent · **crop** |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present). Shots **01–05 unique** md5.

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Empty circle send + attach | 01 | pass (structure) |
| Populated Post+plane | 02 | pass (structure) |
| Attach paperclip crop | 03 | pass (structure) · crop honesty |
| Reply Post+plane | 04 | pass (structure) |
| Actions L/R layout | 05 | pass (structure) · crop honesty |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Inline reply (CT-12) · invent SVG/HTTP/OP PASS · `#/next/feed`.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs G-H2/G-H6 |
| **F3** | Info | Shots 03/05 control crops · story-root `screenshots/README.md` Absent · `tmp-ct11-capture.mjs` naming | Optional fuller frames / README |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **128/128** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-11-composer-icon-chrome/audit-STORY-SPA-CT-11-execution-2026-10-19.md`
