# STORY-SPA-CT-24 — Share public Issue link sheet

## Meta

- **Key:** `STORY-SPA-CT-24-share-issue-link-sheet`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §13.4](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-24-share-issue-link-sheet/STORY-SPA-CT-24-share-issue-link-sheet.md) · `pkg-000182` · tip · activation none · Await P8 · `2026-10-20T15:30:48Z`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4 · M152 Share claim
- **Depends on:** CT-02 · CT-08
- **Blocks:** OP eye Share no-op
- **Interview:** [INTERVIEW-CT-21-plus…](INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md) D4–D6
- **Artboard tip:** [M152d written](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.png)
- **Intake:** [analysis-m152c-m152d-generation-intake-2026-10-20.md](../../../analysis/analysis-m152c-m152d-generation-intake-2026-10-20.md) PASS
- **Icons:** `/icons/next-feed/share/{telegram,instagram,x,whatsapp,facebook}.svg`
- **Code home:** `FeedPostActionStrip` · `FeedPostCard` · `FeedIssueDetailBody` · new share surface

## Зачем

M152 + M152d: Share opens custom popover (desktop) / bottom sheet (390) with Telegram · Instagram · X · WhatsApp · Facebook · Copy link. Lab AS-IS Share is no-op.

## L1 — FR

- **FR-CT-24.1** Share zone opens custom share UI (not silent no-op · not OS share-sheet hybrid).  
- **FR-CT-24.2** Desktop: **popover**; narrow (~390): **bottom sheet**.  
- **FR-CT-24.3** Rows in order: Telegram · Instagram · X · WhatsApp · Facebook · **Copy link**; icons from `/icons/next-feed/share/*.svg`.  
- **FR-CT-24.4** Instagram uses **copy-link fallback** (handoff TBD · no invent private API).  
- **FR-CT-24.5** Payload = canonical public Issue URL. Lab without URL: honesty `Sharing is unavailable here.` / `No public Issue link is available.`  
- **FR-CT-24.6** Copy success feedback: **`Link copied`** (copy only · external handoff ≠ delivered).  
- **FR-CT-24.7** Close / dismiss closes surface; strip anatomy unchanged.  
- **FR-CT-24.8** Vitest: share → surface · six rows · unavailable honesty · icon src Present.

## Вне scope

OAuth · short-link service · Instagram Graph API · invent production domain · redesign strip · thread density · `#/next/feed`

## L1 — Acceptance Criteria

- [x] Share opens popover (wide) / bottom sheet (narrow)  
- [x] Six rows + five network SVGs Present  
- [x] Public Issue URL when available  
- [x] Lab missing URL → D honesty  
- [x] `Link copied` on copy  
- [x] Vitest  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§13.4](ARCHITECTURE.md) · P3 Done · Await P4/P5

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-24-t01-zone-wire` | Done | Handle `share` in FeedPostCard / detail | FeedPostCard.jsx · FeedIssueDetailBody.jsx | 24.1 |
| `task-spa-ct-24-t02-surface` | Done | Desktop popover + narrow bottom sheet chrome | feed-lab share surface | 24.2 · 24.7 |
| `task-spa-ct-24-t03-rows-icons` | Done | Six rows + `/icons/next-feed/share/*` | share surface | 24.3 · 24.4 |
| `task-spa-ct-24-t04-url-copy` | Done | Resolve Issue URL · copy · `Link copied` · unavailable | helpers + host props | 24.5 · 24.6 |
| `task-spa-ct-24-t05-vitest` | Done | Zone → surface · rows · honesty | `__tests__` | 24.8 |

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Share opens M152d custom surface with five networks + copy; no silent no-op.
