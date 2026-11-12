# STORY-SPA-NF-14-civic-card-hit-target — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-21T11:51:32Z` · tip · activation **active** · Await **P4/P5**  
> **Package:** `pkg-000190` · next-feed · REQ-22 · ARCH-DELTA §2  
> **ui_scope:** `feed` · **mixed** · Path A **code lock** · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** NF-02 · NF-06 route Present · soft NF-13 (icon inside hit region)  
> **Runtime:** T01–T04 **Done** · vitest **522/522** · shots 01–05 Present · no invent OP PASS

## Purpose

Separate「Open issue」row is redundant. OP: entire header block + media navigate to issue; remove dedicated link.

## L1 — FR (backlog verbatim)

- **FR-NF-14.1** List civic card: no `data-testid="feed-civic-post-open"` / Open issue affordance as Done surface.  
- **FR-NF-14.2** Single navigate target for list = former `to` from `FeedListArea` (`/next/feed/issue/:id?from=…`).  
- **FR-NF-14.3** Hit region includes: identity header (icon+id+status) · metadata row · title · summary · labels · **media** frame.  
- **FR-NF-14.4** Hit region **excludes** four-zone action strip (`data-action-zones` / React·Comment·Share·Reactions) — no accidental navigation.  
- **FR-NF-14.5** Implementation: one wrapping `Link` (or equivalent) around content+media **or** two coordinated links sharing `to` — prefer **one** wrapper to avoid nested interactive traps; if split, both must share identical `to` and a11y name.  
- **FR-NF-14.6** Detail surface (no list `to`) unchanged — no dead Open link.  
- **FR-NF-14.7** A11y: hit region has accessible name (issue title or localized “Open issue”) · keyboard focus visible · does not steal focus from strip controls.  
- **FR-NF-14.8** Vitest: open link Absent on list · navigate region Present · strip outside region.  
- **FR-NF-14.9** Soft: `open-issue.svg` may remain on disk unused — do not invent delete; catalog may note deferred/unused after Apply.

## Acceptance Criteria (backlog verbatim)

- [x] Open issue row gone on list  
- [x] Header+meta+title+summary+media navigate  
- [x] Action strip excluded  
- [x] Detail unchanged  
- [x] A11y name + keyboard  
- [x] Vitest  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-14-civic-card-hit-target.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-14-t01-remove-open](task-spa-nf-14-t01-remove-open/README.md) | Remove open Link block · keep `to` prop for hit wrapper | **Done** |
| T02 | [task-spa-nf-14-t02-hit-region](task-spa-nf-14-t02-hit-region/README.md) | Wrap content+media · exclude actions · a11y name | **Done** |
| T03 | [task-spa-nf-14-t03-list-wire](task-spa-nf-14-t03-list-wire/README.md) | FeedListArea still passes `to` (or navigate href) into hit wrapper | **Done** |
| T04 | [task-spa-nf-14-t04-vitest](task-spa-nf-14-t04-vitest/README.md) | Update nf02/nf07/ct29 · assert no open testid | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Map preview open · Comment/Share onClick · NF-13 icon map · invent OP PASS · change issue route shape

## DoD (backlog verbatim)

List card opens issue via header+media; Open issue row retired; strip stays interactive in place.

## @mockup handoff

- Continuity: [ARCH-DELTA §2](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · code lock
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen · no artboard
- Shots: [visual-checklists](./visual-checklists-civic-card-hit-target.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- `@mockup:` _(none — Path A code lock · ARCH-DELTA §2 SSOT)_
