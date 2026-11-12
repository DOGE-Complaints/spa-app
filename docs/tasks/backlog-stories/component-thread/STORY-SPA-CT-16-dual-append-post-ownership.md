# STORY-SPA-CT-16 — Dual-append post ownership (BUG-1)

## Meta

- **Key:** `STORY-SPA-CT-16-dual-append-post-ownership`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P6 T05 Done · gate BLOCK · `2026-10-20T11:48:47Z` · `pkg-000174` · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-16-dual-append-post-ownership/STORY-SPA-CT-16-dual-append-post-ownership.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-03 · CT-08
- **Blocks:** CT-17 · CT-20 · honest nest forest after post
- **UX mirror:** [OP-UX M153a/b gaps 10-20](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md) · BUG-1
- **Analysis:** [puppeteer gaps 2026-10-20](../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md) BUG-1 · BUG-1b
- **Artboard:** — (code bug · not artboard hole)
- **Code home:** `FeedLabThreadMount.jsx` · `ThreadMount.jsx` · `buildCommentForest`

## Зачем

Puppeteer `#/lab/feed` HARD_FAIL: after Reply or root Post, the same `lab-posted-*` id appears **twice**. Host `handlePostComment` appends to snap **and** `ThreadMount.runPost` appends to `localComments` when `onCommentsChange` is absent → prop sync + local append → duplicate DOM ids → `buildCommentForest` `fallbackReason=duplicate-id` → `data-tm-forest=flat` + hierarchy junk note.

## FR

- **FR-CT-16.1** Single write-owner for successful post/reply comment append: either host updates comments via `onCommentsChange` **or** ThreadMount appends locally — **never both** for the same success path.  
- **FR-CT-16.2** When host owns comments (FeedLab snap), ThreadMount must not also append the same comment id into `localComments` after adapter success.  
- **FR-CT-16.3** When ThreadMount owns local comments, host must not also append the same id into snap for that post.  
- **FR-CT-16.4** After Reply or root Post on lab feed: comment ids unique · forest must not enter `flat` / `duplicate-id` solely because of dual-append.  
- **FR-CT-16.5** Vitest + Puppeteer regression: reply nest + root post assert unique ids and non-flat forest when parents are valid.

## Вне scope

Redesign of `buildCommentForest` beyond dedupe/owner fix · invent HTTP · `#/next/feed` · invent OP PASS · attach picker (CT-17) · HOLD reactions

## Acceptance Criteria

- [x] `#/lab/feed` Reply post → no duplicate comment ids in DOM  
- [x] `#/lab/feed` root Post → no duplicate comment ids in DOM  
- [x] Nested reply keeps hierarchy forest (not `flat` from duplicate-id)  
- [x] Vitest covers single-owner post path  
- [x] Puppeteer dual-append asserts green (or equivalent harness)  
- [ ] OP eye gate (Absent = BLOCK · no invent PASS)

## Technical subtasks

> Skill: `react-expert` · Arch [§12](ARCHITECTURE.md) · P6 T05 Done · Await P7/P8 · F1 OP held

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-16-t01-pin-owner` | Done | Pin single write-owner (host vs ThreadMount) on FeedLab post path | FeedLabThreadMount · ThreadMount | 16.1–16.3 |
| `task-spa-ct-16-t02-remove-dual-append` | Done | Eliminate double append for same success id | ThreadMount.runPost · host handler | 16.2 · 16.3 |
| `task-spa-ct-16-t03-vitest-unique-ids` | Done | Assert unique ids after reply + root post | `__tests__` | 16.4 · 16.5 |
| `task-spa-ct-16-t04-puppeteer-regression` | Done | Green prior HARD_FAIL dual-append asserts | `tests/puppeteer/lab-feed-thread-*.mjs` | 16.5 |
| `task-spa-ct-16-t05-screenshots-root-readme` | Done | Story-root `screenshots/README.md` indexer (audit F2) | story-root screenshots | P5 F2 |

### Constraints

- No invent HTTP · no invent OP PASS  
- Prefer minimal ownership fix over forest rewrite  
- Arch §12 hold when present

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Lab post/reply never dual-appends the same comment id; forest stays hierarchical when parents are valid.
