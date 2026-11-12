# STORY-SPA-CR-12 — React-always + Reactions zone + aggregate row (M154 A)

## Meta

- **Key:** `STORY-SPA-CR-12-react-always-aggregate-row`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P5 APPLY · TASKED=0 · gate **BLOCK** · `pkg-000148` · `2026-10-16T10:46:06Z` · **tip**
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-11](STORY-SPA-CR-11-strip-four-zone-chrome.md) · CR-05 dismiss (keep) · CR-07/09 mount hosts
- **Blocks:** CR-13 (soft) · CR-15
- **UX mirror:** [OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.2 · §3.3
- **Code home:** `FeedPostActionStrip` · `ReactionSummaryStrip` · `FeedPostCard` / `FeedIssueDetailBody` · `ReactionsMount`

## Зачем

Развести **React** (всегда открывает пикер) и **Reactions / aggregate** (реакции других). Aggregate — **ряд под полоской** (M154 A), не подмена zone 1.

**Supersedes CR-05** «hide React when populated» **for strip chrome** (dismiss rules outside strip remain).

## Locked behavior

| Control | Empty | Populated |
|---------|-------|-----------|
| Strip React | Visible · opens picker | **Still visible** · opens picker |
| Strip Reactions | Visible · may open aggregate/summary | Visible |
| Aggregate row under strip | **Hidden** | Marks + counts + «N total» |
| Loading / error | Skeleton / unavailable + retry | per M154 A2/A3 |

- No second React mount under strip (keep CR-09 cleanup).  
- Comment mounts stay compact.  
- M155 people UI was **OOS here** — **superseded for lab** by [CR-17…19](STORY-SPA-CR-17-reactors-popover.md) + [polish+M155 mirror](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md). This story’s wire may still open picker until CR-17 lands.

## FR

- **FR-CR-12.1** React zone always present; click opens `ReactionPicker`.  
- **FR-CR-12.2** Populated state does **not** remove React from strip.  
- **FR-CR-12.3** Aggregate summary renders **below** action strip (card + detail).  
- **FR-CR-12.4** Empty → aggregate row absent; loading/error states Present.  
- **FR-CR-12.5** Reactions zone is distinct affordance (not duplicate React label).  
- **FR-CR-12.6** Outside click / Escape / X dismiss unchanged (CR-05/10).  

## Вне scope

Picker tile chrome (CR-13) · mark accent CSS (CR-14) · M155 · invent HTTP · `#/next/feed`  

## Acceptance Criteria

- [ ] Populated post: React + Reactions both visible; aggregate row under strip  
- [ ] Empty: no aggregate row; React still opens picker  
- [ ] No dual React under strip  
- [ ] Vitest: React present when populated; aggregate DOM under strip  
- [ ] Verify: `http://127.0.0.1:5173/#/lab/feed`  

## Technical subtasks

> P1.3 activated `2026-10-16T10:37:39Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-12](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-12-react-always-aggregate-row/STORY-SPA-CR-12-react-always-aggregate-row.md) · `pkg-000148`

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-12-t01-react-always-strip` | Done | Stop hiding React when populated; strip React → `onOpen` | `ReactionSummaryStrip` / strip wire · `ReactionsMount` | 12.1–12.2 |
| `task-spa-cr-12-t02-aggregate-row-under-strip` | Done | Move aggregate UI below `FeedPostActionStrip` in card/detail | `FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` · summary CSS | 12.3–12.4 |
| `task-spa-cr-12-t03-reactions-zone-wire` | Done | Zone Reactions → activate aggregate / summary (no M155) | `FeedPostActionStrip` · card `onZone` | 12.5 |
| `task-spa-cr-12-t04-vitest-react-aggregate` | Done | Empty/populated matrix · no hide-React · row placement | reactions-mount + feed-lab tests | AC |

### Constraints (all tasks)

- No M155 people surfaces  
- No invent HTTP  
- Keep portal dismiss (CR-10)  
- Do not reintroduce mount under strip  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

Strip semantics match M154 A; picker open path always via React.
