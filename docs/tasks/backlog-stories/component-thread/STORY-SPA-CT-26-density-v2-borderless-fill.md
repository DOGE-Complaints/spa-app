# STORY-SPA-CT-26 — Density v2: borderless bubbles + reaction pills

## Meta

- **Key:** `STORY-SPA-CT-26-density-v2-borderless-fill`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §14.2](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-26-density-v2-borderless-fill/STORY-SPA-CT-26-density-v2-borderless-fill.md) · `pkg-000184` · Await P8 · `2026-10-20T19:46:26Z`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-18 · CT-23 (supersedes border-keep)
- **Blocks:** OP eye «лишние рамки / меньше отступы»
- **Interview:** [INTERVIEW-CT-25-plus…](INTERVIEW-CT-25-plus-attach-density-share-residual-2026-10-20.md) MT3 · lock **1B**
- **Artboard tip:** [M153d written](../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.png)
- **Intake:** [analysis-m153c-m153d-generation-intake-2026-10-20.md](../../../analysis/analysis-m153c-m153d-generation-intake-2026-10-20.md) PASS
- **Code home:** `CommentNode.css` · AttachmentRef borders **unchanged** (M153c / M153b §7)

## Зачем

CT-23 kept M153b 1px borders on bubble + React/Reply group. OP lock 1B: remove those frames; light fill only; smaller padding/gaps. M153d landed with exact token register.

## L1 — FR

- **FR-CT-26.1** Comment bubbles: **no** outer border · fill `#F7F6F2` · radius 12 · pad **8v / 12h**.  
- **FR-CT-26.2** React/Reply shared group: **no** outer border · fill `#FFFDF8` · action pad **4v / 8h** · min-height **44 CSS px** · separator 1×16 `#E7E4DC`.  
- **FR-CT-26.3** Gaps: bubble→actions **4 px** · node→next bubble **8 px** (no doubled margins).  
- **FR-CT-26.4** Spine + L-elbow remain (1 px `#667085` · elbow r6); reply-parent **3 px** inset `#B54708` without outer frames.  
- **FR-CT-26.5** Supersedes CT-23 / ARCH §13.3 “keep M153b bubble/pill border”. AttachmentRef chip borders **retained**.  
- **FR-CT-26.6** Vitest/CSS asserts: no bubble/pill-group outer `border: 1px` stroke; fill + spacing tokens Present.

## Вне scope

Invent denser-than-M153d · Share (CT-27) · attach filename (CT-25) · HOLD reactions · `#/next/feed` · global border removal on composer/chip

## L1 — Acceptance Criteria

- [ ] Bubble outer border Absent · fill + 8v/12h Present  
- [ ] Action-pills outer border Absent · fill · ≥44px · 4v/8h  
- [ ] Gaps 4 / 8 Match M153d  
- [ ] Spine Present · parent stripe Present  
- [ ] AttachmentRef borders unchanged  
- [ ] Artboard M153d linked · intake PASS  
- [ ] Vitest/CSS regression  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§14.2](ARCHITECTURE.md) · Apply-ready after intake PASS

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-26-t01-bubble-fill` | Todo | Remove bubble stroke · pad 8v/12h · fill | CommentNode.css | 26.1 |
| `task-spa-ct-26-t02-pills-fill` | Todo | Remove action-pills stroke · 4v/8h · ≥44 | CommentNode.css | 26.2 |
| `task-spa-ct-26-t03-spacing` | Todo | Apply gap 4 / node 8 | CommentNode.css · tree CSS | 26.3 |
| `task-spa-ct-26-t04-regression` | Todo | Assert no forbidden borders · spine ok | `__tests__` | 26.4 · 26.6 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Tree chrome is fill-only (no bubble/pill frames) with M153d rhythm.
