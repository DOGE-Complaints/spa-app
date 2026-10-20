# DOGEstonia — Thread First Paint · Expand + Truncate Specification v1.0 (M152c)

**Date:** 2026-10-20  
**Surface:** SPA `#/lab/feed` · `IssueThreadBlock` + `CommentTree` under post strip  
**Continuity:** M152 / M153; residual first-paint behavior. Label **M152c** = docs tip id (no new product M-number mandate).  
**Status:** written SSOT from operator-accepted gen + interview locks. Raster is illustrative; written rules win on conflict.  
**Artboard:** [DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.png](DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.png) — title `DOGEstonia · THREAD FIRST PAINT · EXPAND + TRUNCATE`  
**Prior exec id:** `exec-56983e66-55e7-4115-b1a5-cc1e479dbe7d`  
**Stories:** **CT-21** tip · soft CT-23 density  
**Interview:** [INTERVIEW-CT-21-plus…](../../tasks/backlog-stories/component-thread/INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md)  
**Prompt:** [UX-PROMPTS preview/share Prompt 1](../../tasks/backlog-stories/component-thread/UX-PROMPTS-thread-preview-budget-and-share-2026-10-20.md)

## 1. Purpose

Supersede M152 Panel C **collapsed** default for the feed-card discussion mount: first paint is **expanded** with a configurable **visible node budget**. When the forest exceeds the budget, show a continuation control that reveals the remainder in one shot.

## 2. Locked rules (operator + artboard callouts)

1. **Expanded on mount** — CommentTree visible when populated; no collapsed 2-body summary as default.  
2. **`previewNodeBudget` DEFAULT = 3** — named knob like `maxDepth`; not JSX magic.  
3. Budget counts **roots + descendants together** (nodes, not “3 independent roots”).  
4. Traversal for truncate: **depth-first** (parent → children → next root).  
5. Control copy: **`Show more comments`** (artboard B/E).  
6. Show more = **one-shot reveal of all remaining nodes** (not chunked pagination).  
7. **No Discussion heading** (`Discussion · Issue {id}` / plain `Discussion` title row omitted) — even if a civic post title appears above the strip on the card.  
8. Supersedes M152-C collapsed default **only** for this feed-card first-paint grammar; other M152 status panels (loading/empty/unavailable) remain.

## 3. Panels

| Panel | Meaning |
|-------|---------|
| A | Within budget (3 nodes) · no continuation |
| B | Truncated first paint (3 of 5) · `Show more comments` |
| C | After show more · all nodes · control gone |
| D | Empty · composer entry · no Discussion heading |
| E | Narrow 390 · same truncate grammar |

## 4. Out of scope

Invent author/time · invent HTTP · comment reaction summary HOLD · attachment publication claim · Share sheet (M152d / CT-24) · denser-than-artboard invent.

## 5. Acceptance checklist

- [ ] Default expanded populated  
- [ ] Budget 3 configurable · DFS truncate  
- [ ] `Show more comments` one-shot  
- [ ] No Discussion heading  
- [ ] Empty/narrow covered without invent SSOT
