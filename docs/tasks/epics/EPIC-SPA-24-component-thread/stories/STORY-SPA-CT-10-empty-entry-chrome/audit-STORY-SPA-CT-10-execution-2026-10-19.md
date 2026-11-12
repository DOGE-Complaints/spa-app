# Hard audit — STORY-SPA-CT-10 Empty entry-only + speech icon (P4 Validate RO)

> **UTC:** 2026-10-19T12:06:23Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX residual §3 G-H1 · G-M1** · M152 §8 / artboard B · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-10-empty-entry-chrome.md](./STORY-SPA-CT-10-empty-entry-chrome.md)  
> **Backlog AC:** [STORY-SPA-CT-10-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX residual 2026-10-19](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)  
> **Package:** [`pkg-000168`](../../../spa-active-packages/pkg-000168-20261019-epic-spa-24-ct-10-empty-entry-chrome.yaml) · P3 gate claimed **BLOCK** `2026-10-19T12:04:28Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A structure **PASS**: `emptyEntry` vs `showComposer` · entry-only first paint · speech icon `comment.svg` · entry activate opens composer · populated no empty icon · vitest feed-lab+thread-mount **123/123** (`threadMount.ct10` **5/5**). Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Structure (G-H1 entry-only · G-M1 speech icon · activate) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard / FR map (this fence)

| Item | Fact | Score |
|------|------|-------|
| G-H1 empty = entry-only · not full composer | [`ThreadMount`](../../../../../../src/features/thread-mount/ThreadMount.jsx) `emptyEntry` · `data-tm-empty-entry=true` · shot 01 | **PASS** |
| G-M1 speech empty icon + lead/helper | [`IssueThreadBlock`](../../../../../../src/features/thread-mount/IssueThreadBlock.jsx) `tm-thread-empty-icon` · shot 02 | **PASS** |
| Entry activate → composer | shot 03 · ct10 activate | **PASS** |
| Populated · no empty icon | shot 04 · CT-01 path held | **PASS** |
| Reload entry-only held | shot 05 · distinct md5 vs 01 | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX residual §3)

| Source | Rule | This P4 |
|--------|------|---------|
| G-H1 | Empty = entry-only pill · not full ThreadComposer | structure **PASS** · shot 01 |
| G-M1 | Large speech-bubble empty icon (artboard B) | structure **PASS** · shot 02 |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Empty stand: entry only · no full composer until activate | shot 01 · `data-tm-empty-entry=true` · stand B | **PASS** (structure) |
| Speech empty icon Present | shot 02 · `tm-thread-empty-icon` · comment.svg | **PASS** (structure) |
| Vitest empty → entry · composer absent until activate | `threadMount.ct10` **5/5** · suite **123/123** | **PASS** |
| OP eye | OP **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| showComposer vs emptyEntry | `showComposer = writeAllowed && expanded` · empty first paint entry only | **PASS** |
| Speech icon | `/icons/next-feed/actions/comment.svg` · 56×56 decorative | **PASS** |
| Entry activate | expands → composer · entry leaves | **PASS** |
| Vitest | feed-lab + thread-mount **27 files · 123 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/feed` stand B)

### Inventory (md5 ≡ full-cycle README · OP Absent)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-empty-entry-only.png` | `9dee744d3e74` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-speech-empty-icon.png` | `7aac71ae24f9` | Evidence Present · Visual **BLOCK** · OP Absent · **56×56 crop** |
| 03 | `03-entry-activate-composer.png` | `f8f166dc8b1a` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | `04-populated-no-empty-icon.png` | `16c7ba69b7e4` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-reload-entry-only-held.png` | `bd98ab0d6dc2` | Evidence Present · Visual **BLOCK** · OP Absent · ≠01 |

**Fact:** story-root `screenshots/README.md` **Absent** (full-cycle README Present). Shots **01–05 unique** md5.

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Entry-only empty | 01 | pass (structure) |
| Speech icon crop | 02 | pass (structure) · tiny crop honesty |
| Activate → composer | 03 | pass (structure) |
| Populated no empty icon | 04 | pass (structure) |
| Reload entry-only | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Composer glyphs (CT-11) · inline reply (CT-12) · invent HTTP/OP PASS · `#/next/feed`.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs G-H1/G-M1 |
| **F3** | Info | Shot 02 = 56×56 icon crop · story-root `screenshots/README.md` Absent · `tmp-ct10-capture.mjs` naming | Optional fuller frame / README |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · structure **PASS** · OP eye **Absent** · vitest **123/123** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-10-empty-entry-chrome/audit-STORY-SPA-CT-10-execution-2026-10-19.md`
