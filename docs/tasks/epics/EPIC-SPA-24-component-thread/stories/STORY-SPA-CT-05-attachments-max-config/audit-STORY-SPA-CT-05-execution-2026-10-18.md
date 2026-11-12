# Hard audit — STORY-SPA-CT-05 AttachmentRef / maxAttachments (P4 Validate RO)

> **UTC:** 2026-10-18T13:40:33Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR §4.2 T-D/T-E/T-maxA** · M153 D/E · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-05-attachments-max-config.md](./STORY-SPA-CT-05-attachments-max-config.md)  
> **Backlog AC:** [STORY-SPA-CT-05-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.2](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)  
> **Package:** [`pkg-000163`](../../../spa-active-packages/pkg-000163-20261018-epic-spa-24-ct-05-attachments-max-config.yaml) · P3 gate claimed **BLOCK** `2026-10-18T13:39:15Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent upload HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: `DEFAULT_MAX_ATTACHMENTS` / `clampAttachmentIntents` · AttachmentRef ready D / denied E · Attach unavailable honesty · local-intent · `data-tm-attach-published=false` · vitest feed-lab+thread-mount **93/93**. Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (config clamp · D/E · Attach honesty · local-intent) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| Named maxAttachments config | [`DEFAULT_MAX_ATTACHMENTS`](../../../../../../src/features/thread-mount/config/threadMountConfig.js) · `resolveMaxAttachments` · `clampAttachmentIntents` | **PASS** |
| Clamp ≤ max | vitest · shot 03 | **PASS** |
| Ready chip D · Remove · not published | [`AttachmentRef`](../../../../../../src/features/thread-mount/composer/AttachmentRef.jsx) · shot 01 | **PASS** |
| Denied chip E · draft intact | shot 02 · vitest | **PASS** |
| Attach unavailable honesty | shot 04 · omit/disable | **PASS** |
| Local-intent only | `ATTACH_LOCAL_INTENT_COPY` · published=false · shot 05 | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX-MIRROR §4.2)

| Source | Rule | This P4 |
|--------|------|---------|
| T-D | Ready chip · Remove | structure **PASS** · shot 01 |
| T-E | Denied · draft intact | structure **PASS** · shot 02 |
| T-maxA | maxAttachments configurable | structure **PASS** · config + clamp |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| maxAttachments clamp without JSX magic | `clampAttachmentIntents` · ct05 | **PASS** (structure) |
| D/E fixtures | shots 01/02 · stands N/O | **PASS** (structure) |
| Vitest clamp | `threadMount.ct05` **6/6** · suite **93/93** | **PASS** |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Config | DEFAULT_MAX_ATTACHMENTS=1 · resolve · clamp | **PASS** |
| AttachmentRef | ready/denied · Remove · local-intent copy | **PASS** |
| Composer wire | Attach respects max · unavailable path | **PASS** |
| Lab stands N–R | ThreadLabCanvas CT-05 Path A | **PASS** |
| Vitest | feed-lab + thread-mount **21 files · 93 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/thread` N–R)

### Inventory (md5 ≡ full-cycle README · `opEye: Absent`)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-attach-ready-chip.png` | `65e98338caf3` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-attach-denied.png` | `9d4e88ba6afa` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-max-attachments-clamp.png` | `65e98338caf3` | Evidence Present · Visual **BLOCK** · OP Absent · **≡01** |
| 04 | `04-attach-unavailable.png` | `04e4e14dd28b` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-local-intent-honesty.png` | `f5c2f02537cd` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present).

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Ready D | 01 | pass (structure) |
| Denied E | 02 | pass (structure) |
| max clamp | 03 | pass (structure) · ≡01 honesty |
| Attach unavailable | 04 | pass (structure) |
| Local-intent honesty | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Real upload API · gallery · safety bypass · invent HTTP/OP PASS.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs M153 D/E |
| **F3** | Info | Shots 01≡03 md5 (`65e98338caf3`) — clamp frame reuse honesty | Optional distinct re-capture |
| **F4** | Info | Story-root `screenshots/README.md` Absent · `tmp-ct05-capture.mjs` naming | Optional add README / promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **93/93** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-05-attachments-max-config/audit-STORY-SPA-CT-05-execution-2026-10-18.md`
