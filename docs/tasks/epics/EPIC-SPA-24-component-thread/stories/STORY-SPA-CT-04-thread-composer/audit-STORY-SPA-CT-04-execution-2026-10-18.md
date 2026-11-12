# Hard audit — STORY-SPA-CT-04 ThreadComposer (P4 Validate RO)

> **UTC:** 2026-10-18T13:31:48Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR §4.2 T-C/T-root/T-draft/T-F/T-G** · M153 C/F/G · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-04-thread-composer.md](./STORY-SPA-CT-04-thread-composer.md)  
> **Backlog AC:** [STORY-SPA-CT-04-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-04-thread-composer.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.2](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)  
> **Package:** [`pkg-000162`](../../../spa-active-packages/pkg-000162-20261018-epic-spa-24-ct-04-thread-composer.yaml) · P3 gate claimed **BLOCK** `2026-10-18T13:30:17Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: ThreadComposer root/reply · parent excerpt · Cancel · draft survival (no silent destroy) · post-fail F (Try again / Keep editing · draft kept) · no optimistic permanent comment · mobile sticky 390 · FixtureAdapter soft-fail only · vitest feed-lab+thread-mount **87/87**. Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (root/reply · draft · fail F · mobile) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| Root / reply modes | [`ThreadComposer.jsx`](../../../../../../src/features/thread-mount/composer/ThreadComposer.jsx) · Post comment / Post reply · shots 01–02 | **PASS** |
| Reply context | excerpt + Cancel reply · shot 02 | **PASS** |
| Draft survival | ThreadMount draft state · cancel/target switch keeps text · vitest · shot 03 | **PASS** |
| Fail F recoverable | soft-fail · Try again / Keep editing · shot 04 | **PASS** |
| No invent HTTP / no optimistic permanent | FixtureAdapter `fixture-soft-fail` · success-only clear | **PASS** |
| Mobile sticky 390 | `data-lab-sticky-keyboard` · shot 05 | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX-MIRROR §4.2)

| Source | Rule | This P4 |
|--------|------|---------|
| T-root | Write a comment / Post comment | structure **PASS** · shot 01 |
| T-C | Reply · excerpt · Cancel · Post reply | structure **PASS** · shot 02 |
| T-draft | Draft survival · no silent destroy | structure **PASS** · shot 03 · vitest |
| T-F | Post fail inline · Try again / Keep editing | structure **PASS** · shot 04 |
| T-G | Mobile keyboard-open composer | structure **PASS** · shot 05 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Reply context + draft fixture | shots 02/03 · stands K · M153 draft | **PASS** (structure) |
| Fail F recoverable | shot 04 · stand L | **PASS** (structure) |
| Vitest draft survival | `threadMount.ct04` **6/6** · suite **87/87** | **PASS** |
| OP eye / mobile stress | shot 05 Present · OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| ThreadComposer | root/reply · fail chrome · sticky | **PASS** |
| ThreadMount ownership | draft · replyParentId · postComment soft-fail | **PASS** |
| Fixture write | soft-fail / ok paths · no invent Live HTTP | **PASS** |
| Lab stands J–M | ThreadLabCanvas CT-04 Path A | **PASS** |
| Vitest | feed-lab + thread-mount **20 files · 87 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/thread` J–M)

### Inventory (md5 ≡ full-cycle README · `opEye: Absent`)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-root-composer.png` | `bae63f95cc3b` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-reply-context.png` | `9aea4e79bdb7` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | `03-draft-survival.png` | `9aea4e79bdb7` | Evidence Present · Visual **BLOCK** · OP Absent · **≡02** |
| 04 | `04-post-fail-f.png` | `c7b860be00f0` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-mobile-keyboard-390.png` | `5c5a89db9705` | Evidence Present · Visual **BLOCK** · OP Absent |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present).

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Root composer | 01 | pass (structure) |
| Reply context | 02 | pass (structure) |
| Draft survival | 03 | pass (structure) · ≡02 honesty |
| Post fail F | 04 | pass (structure) |
| Mobile 390 | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Attachments CT-05 · verify CT-07 · invent HTTP/OP PASS.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs M153 C/F/G |
| **F3** | Info | Shots 02≡03 md5 (`9aea4e79bdb7`) — draft-survival frame reuse honesty | Optional distinct re-capture |
| **F4** | Info | Story-root `screenshots/README.md` Absent · `tmp-ct04-capture.mjs` naming | Optional add README / promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **87/87** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-04-thread-composer/audit-STORY-SPA-CT-04-execution-2026-10-18.md`
