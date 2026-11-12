# STORY-SPA-CT-23 — Thread density · remove extra frames (artboard SSOT)

## Meta

- **Key:** `STORY-SPA-CT-23-thread-density-artboard-frames`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §13.3](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · `pkg-000181` · tip superseded by CT-24 `pkg-000182`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-18 · CT-21 soft (heading gone reduces chrome)
- **Blocks:** OP eye «лишние рамки / пустота / растянутость»
- **Interview:** [INTERVIEW-CT-21-plus…](INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md) C1 · C3
- **Artboard tip:** [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) · [M153b](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) — **strict** · no denser invent

## Зачем

OP screenshots show box-in-box / large empty gaps. OP lock: remove frames that are **not** on artboards; density **strictly** artboard. M153b §3 **keeps** bubble 1px `#E7E4DC` — that is allowed. Extra host/section/nested wrappers (e.g. discussion plate borders beyond strip/card anatomy) must go.

## L1 — FR

- **FR-CT-23.1** Audit `#/lab/feed` discussion region vs M152/M153/M153b: list every border/background/radius **not** on written artboard → remove or neutralize.  
- **FR-CT-23.2** Keep M153b-approved surfaces only: bubble fill/border/radius/pad · spine/L-elbow · action pill group · composer chrome.  
- **FR-CT-23.3** Tighten vertical spacing (margins between nodes / children / composer) to artboard rhythm — no invent «even tighter» beyond written tokens.  
- **FR-CT-23.4** Host card: continuous under strip without an extra framed «discussion card» that artboards omit (preserve post card outer anatomy).  
- **FR-CT-23.5** Depth 2.0 / OP eye re-check: no nested plate look; discussion not visually overstretched.  
- **FR-CT-23.6** Vitest/CSS asserts: no forbidden wrapper border classes reintroduced.

## Вне scope

Invent denser-than-artboard tokens · reaction HOLD · Share sheet · attach preview chrome invent beyond CT-22 · `#/next/feed`

## L1 — Acceptance Criteria

- [ ] Extra discussion/section frames Absent vs artboard  
- [ ] Bubble/spine/pills Match M153b  
- [ ] Gaps Match artboard rhythm (OP eye)  
- [ ] No invent palette  
- [ ] Regression asserts on wrapper borders  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§13.3](ARCHITECTURE.md) · Await Apply / P1.3

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-23-t01-frame-audit` | Todo | Document Present borders vs artboard allow-list | analysis note / story evidence | 23.1 |
| `task-spa-ct-23-t02-remove-extra` | Todo | Remove host/thread-block extra frames | IssueThreadBlock.css · FeedPostCard.css thread-host | 23.1 · 23.4 |
| `task-spa-ct-23-t03-spacing` | Todo | Align node/children/composer gaps to artboard | CommentNode.css · composer CSS | 23.3 |
| `task-spa-ct-23-t04-keep-m153b` | Todo | Verify bubble/spine/pills unchanged vs M153b | CommentNode.css | 23.2 |
| `task-spa-ct-23-t05-regression` | Todo | CSS/vitest + optional puppeteer spacing smoke | tests | 23.5 · 23.6 |

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Discussion chrome matches artboard frames only; extra plates gone; density not invented beyond SSOT.
