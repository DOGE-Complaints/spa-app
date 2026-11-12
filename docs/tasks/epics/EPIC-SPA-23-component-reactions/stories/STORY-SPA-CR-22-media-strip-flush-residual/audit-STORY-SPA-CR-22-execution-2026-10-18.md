# Hard audit — STORY-SPA-CR-22 media–strip flush residual (P4 Validate RO)

> **UTC:** 2026-10-18T12:27:02Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR residual §5** · CR-16 intent · findings only · **not** implementation  
> **ui_scope:** `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CR-22-media-strip-flush-residual.md](./STORY-SPA-CR-22-media-strip-flush-residual.md)  
> **Backlog AC:** [STORY-SPA-CR-22-…](../../../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR residual §5](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · measure [measure-cause-CR-22.md](./measure-cause-CR-22.md)  
> **Package:** [`pkg-000158`](../../../spa-active-packages/pkg-000158-20261018-epic-spa-23-cr-22-media-strip-flush-residual.yaml) · P3 gate claimed **BLOCK** `2026-10-18T12:25:27Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · Gap SVG/people OOS · no product code · no git push

## Verdict

**BLOCK** — Phase A hard AC structure **PASS**: measure cause documented (layout gap **0** · plate bg residual) · flush fix = transparent `.feed-post-media` in card + detail hosts only · CR-16 chip held · `data-lab-media-flush` / `data-lab-cr22-flush` honest · detail parity claimed+Present · Gap SVG/people OOS held · vitest **143/143**. Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Hard AC structure (measure · fix · chip · markers · detail · OOS) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard AC map (this fence)

| Hard AC | Fact | Score |
|---------|------|-------|
| Measure cause documented | [`measure-cause-CR-22.md`](./measure-cause-CR-22.md) Present · gap=0 · letterbox=0 · PNG not white · plate bg cause | **PASS** |
| Flush fix only for verified cause | [`FeedPostCard.css`](../../../../../../src/features/feed-lab/post/FeedPostCard.css) / [`FeedIssueDetailBody.css`](../../../../../../src/features/feed-lab/post/FeedIssueDetailBody.css) `background: transparent` · flush locks held | **PASS** |
| CR-16 chip held | strip CSS chip-only hover · vitest cr22 · shot 04 | **PASS** |
| `data-lab-media-flush` honest | card + `feed-card-media-flush` = `true` · `data-lab-cr22-flush` | **PASS** |
| Detail parity if claimed | detail media plate transparent · CR-22 comment | **PASS** |
| Gap SVG / people OOS | no SVG invent · no people path churn this story | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (residual §5)

| Source | Rule | This P4 |
|--------|------|---------|
| §5.1 | Strip hugs media · no large white band | structure **PASS** (gap=0 · plate removed) · OP eye **BLOCK** |
| §5.2 | Measure then fix verified cause only | structure **PASS** · measure note Before T02 |
| §5.2 | Hold CR-16 chip | structure **PASS** |
| §5.2 | Detail parity | structure **PASS** |
| §5.3 | No carousel / invent HTTP | held |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| Documented cause note | measure-cause Present | **PASS** (structure) |
| OP eye strip hugs media | OP Absent · geometry gap=0 | **BLOCK** |
| Detail parity | detail CSS transparent | **PASS** (structure) |
| Vitest / markers · no chip regression | cr22 · **143/143** | **PASS** |
| Verify `#/lab/feed` | shots 01–05 | **PASS** (structure) |
| OP eye gate | **Absent** | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Measure SSOT | gap `strip.top−media.bottom`=**0** · plate cause recorded | **PASS** |
| Card flush fix | `.feed-post-card__media .feed-post-media { background: transparent }` | **PASS** |
| Detail parity | `.feed-issue-detail-body__media .feed-post-media` transparent | **PASS** |
| Default media plate | [`FeedPostMedia.css`](../../../../../../src/features/feed-lab/post/FeedPostMedia.css) still token bg — overridden in card/detail hosts (scoped fix) | **PASS** (scope) |
| Markers | `data-lab-media-flush` · `data-lab-cr22-flush` · `data-lab-cr16-polish` | **PASS** |
| Chip held | `FeedPostActionStrip.css` chip-only · cr22 assertion | **PASS** |
| Vitest | feed-lab + reactions-mount **32 files · 143 passed** | **PASS** |

---

## 2. Phase B — visual findings

### Inventory (md5 ≡ full-cycle README · story-root README Present)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | media-strip-flush | `41ec692f4c28` | Evidence Present · Visual **BLOCK** · OP Absent · **≡ CR-20-01** |
| 02 | media-strip-dark | `dc0e5b205e0b` | Evidence Present · Visual **BLOCK** · OP Absent · **≡ CR-20-02** |
| 03 | adjacency-crop | `0161f9d04232` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | chip-hover-held | `90dea0fc2b7e` | Evidence Present · Visual **BLOCK** · OP Absent |
| 05 | narrow-390 | `32941c829a77` | Evidence Present · Visual **BLOCK** · OP Absent |

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Light flush | 01 | pass (structure) |
| Dark | 02 | pass (structure) |
| Adjacency crop | 03 | pass (structure) |
| Chip hover held | 04 | pass (structure) |
| Narrow | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: invent OP PASS · Gap SVG · people affordance · carousel · `#/next/feed`.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs §5 |
| **F3** | Info | Shots 01≡CR-20-01 · 02≡CR-20-02 md5 (byte reuse honesty) | Optional re-capture unique frames |
| **F4** | Info | `tmp-cr22-capture.mjs` / `tmp-cr22-measure.mjs` naming | Optional promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · hard AC structure **PASS** · measure gap=0 · plate transparent · OP eye **Absent** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CR-22-media-strip-flush-residual/audit-STORY-SPA-CR-22-execution-2026-10-18.md`
