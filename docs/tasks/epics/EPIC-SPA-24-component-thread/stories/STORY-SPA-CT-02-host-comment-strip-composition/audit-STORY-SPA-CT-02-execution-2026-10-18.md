# Hard audit — STORY-SPA-CT-02 host Comment strip composition (P4 Validate RO)

> **UTC:** 2026-10-18T13:13:27Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR §4.1 P-strip · P-compose** · findings only · **not** implementation  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CT-02-host-comment-strip-composition.md](./STORY-SPA-CT-02-host-comment-strip-composition.md)  
> **Backlog AC:** [STORY-SPA-CT-02-…](../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR §4.1](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) P-strip · P-compose  
> **Package:** [`pkg-000160`](../../../spa-active-packages/pkg-000160-20261018-epic-spa-24-ct-02-host-comment-strip-composition.yaml) · P3 gate claimed **BLOCK** `2026-10-18T13:12:08Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A hard AC structure **PASS**: Comment→`apiRef` `{expand, focusComposer}` · thread flush under strip (`data-lab-thread-flush`) · strip dumb (no ThreadMount import) · React/Reactions held · detail parity · vitest feed-lab+thread-mount **75/75**. Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Hard AC structure (apiRef · flush · strip dumb · reactions held) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard AC map (this fence)

| Hard AC | Fact | Score |
|---------|------|-------|
| Comment→apiRef | [`FeedPostCard`](../../../../../../src/features/feed-lab/post/FeedPostCard.jsx) / detail `handleZone('comment')` → `expand`+`focusComposer` · `ThreadMount` useImperativeHandle | **PASS** |
| Flush under strip | `feed-post-card__thread-host` · hairline · `data-lab-thread-flush=true` · same card | **PASS** |
| Strip dumb | `FeedPostActionStrip.jsx` no ThreadMount/FeedLabThreadMount import · vitest | **PASS** |
| Reactions held | reactions apiRef / mount still Present · capture `reactionsCount:1` | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (OP-UX-MIRROR §4.1)

| Source | Rule | This P4 |
|--------|------|---------|
| P-strip | Comment opens/focuses discussion · four zones held | structure **PASS** · shot 01/05 |
| P-compose | Continuous card under strip · divider | structure **PASS** · CSS + markers |
| Orchestration | Comment→thread like Reactions→people | structure **PASS** · apiRef |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Comment click → expanded + focus | `data-tm-expanded` · `data-tm-focus-signal` · shot 01 | **PASS** (structure) |
| No ThreadMount in strip JSX | strip source assert | **PASS** |
| Vitest zone comment handler | `feedLab.ct02` · suite **75/75** | **PASS** |
| OP eye composition | OP **Absent** · shots Present | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| apiRef surface | `expand` · `focusComposer` · `collapse` · `getStatus` | **PASS** |
| Card / detail wire | Comment zone → threadApiRef | **PASS** |
| Flush CSS | card + detail `__thread-host` · border-top hairline | **PASS** |
| Strip dumb | no tree imports in strip | **PASS** |
| Reactions held | FeedLabReactionsMount / apiRef unchanged path | **PASS** |
| Vitest | feed-lab + thread-mount **18 files · 75 passed** | **PASS** |

---

## 2. Phase B — visual findings (`#/lab/feed`)

### Inventory (md5 ≡ README · `opEye: Absent` · expandMeta Present)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | `01-comment-expand.png` | `bbf279f596c1` | Evidence Present · Visual **BLOCK** · OP Absent |
| 02 | `02-thread-flush-under-strip.png` | `16d21d0d1899` | Evidence Present · Visual **BLOCK** · OP Absent · **tiny crop** (~5KB) |
| 03 | `03-strip-dumb.png` | `b17b1f6519d3` | Evidence Present · Visual **BLOCK** · OP Absent · **tiny crop** |
| 04 | `04-detail-parity.png` | `5a14d59936c7` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | `05-reactions-held.png` | `ad797c4f13cb` | Evidence Present · Visual **BLOCK** · OP Absent · **tiny crop** (~1KB) |

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Comment → expand + focus | 01 | pass (structure) |
| Flush under strip | 02 | pass (structure) · crop honesty Info |
| Strip dumb | 03 | pass (structure · source) · crop honesty Info |
| Detail parity | 04 | pass (structure) |
| Reactions held | 05 | pass (structure · meta) · crop honesty Info |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: Share · M153 interior · invent HTTP/OP PASS · `#/next/feed`.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs P-strip/P-compose |
| **F3** | Info | Shots 02/03/05 tiny crops (byte honesty · not full-card frames) | Optional re-capture fuller frames |
| **F4** | Info | `tmp-ct02-capture.mjs` naming | Optional promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · hard AC structure **PASS** · OP eye **Absent** · vitest **75/75** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CT-02-host-comment-strip-composition/audit-STORY-SPA-CT-02-execution-2026-10-18.md`
