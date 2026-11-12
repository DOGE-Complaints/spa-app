# STORY-SPA-NF-14 — Civic card hit-target (retire Open issue link)

## Meta

- **Key:** `STORY-SPA-NF-14-civic-card-hit-target`
- **Package:** [next-feed](INDEX.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §2 · **L2** tech subtasks
- **Status:** P3 Done · L1/L1.5/L2 Ready · **no UX gen** · `pkg-000190` · gate BLOCK · Await P4/P5 · Partial visual=BLOCK (OP eye)
- **Depends on:** NF-02 · NF-06 route Present · soft NF-13 (icon inside hit region)
- **Interview:** [INTERVIEW-NF-13-plus…](INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) **M2**
- **UX gen:** none (code lock)
- **Code home:** `FeedCivicPost.jsx` · `FeedListArea.jsx` · tests `FeedCivicPost.nf02` · `nf07` · `feed.ct29`

## Зачем

Separate「Open issue」row is redundant. OP: entire header block + media navigate to issue; remove dedicated link.

## L1 — FR

- **FR-NF-14.1** List civic card: no `data-testid="feed-civic-post-open"` / Open issue affordance as Done surface.  
- **FR-NF-14.2** Single navigate target for list = former `to` from `FeedListArea` (`/next/feed/issue/:id?from=…`).  
- **FR-NF-14.3** Hit region includes: identity header (icon+id+status) · metadata row · title · summary · labels · **media** frame.  
- **FR-NF-14.4** Hit region **excludes** four-zone action strip (`data-action-zones` / React·Comment·Share·Reactions) — no accidental navigation.  
- **FR-NF-14.5** Implementation: one wrapping `Link` (or equivalent) around content+media **or** two coordinated links sharing `to` — prefer **one** wrapper to avoid nested interactive traps; if split, both must share identical `to` and a11y name.  
- **FR-NF-14.6** Detail surface (no list `to`) unchanged — no dead Open link.  
- **FR-NF-14.7** A11y: hit region has accessible name (issue title or localized “Open issue”) · keyboard focus visible · does not steal focus from strip controls.  
- **FR-NF-14.8** Vitest: open link Absent on list · navigate region Present · strip outside region.  
- **FR-NF-14.9** Soft: `open-issue.svg` may remain on disk unused — do not invent delete; catalog may note deferred/unused after Apply.

## Вне scope

Map preview open · Comment/Share onClick · NF-13 icon map · invent OP PASS · change issue route shape

## L1 — Acceptance Criteria

- [ ] Open issue row gone on list  
- [ ] Header+meta+title+summary+media navigate  
- [ ] Action strip excluded  
- [ ] Detail unchanged  
- [ ] A11y name + keyboard  
- [ ] Vitest  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCH-DELTA §2](ARCH-DELTA-live-civic-residual-2026-10-21.md). Supersedes NF-02/NF-07 Done claim for dedicated Open issue affordance on list.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-14-t01-remove-open` | Await | Remove open Link block · keep `to` prop for hit wrapper | FeedCivicPost | 14.1 · 14.6 · 14.9 |
| `task-spa-nf-14-t02-hit-region` | Await | Wrap content+media · exclude actions · a11y name | FeedCivicPost · CSS pointer | 14.2…14.5 · 14.7 |
| `task-spa-nf-14-t03-list-wire` | Await | FeedListArea still passes `to` (or navigate href) into hit wrapper | FeedListArea | 14.2 |
| `task-spa-nf-14-t04-vitest` | Await | Update nf02/nf07/ct29 · assert no open testid | `__tests__` | 14.8 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

List card opens issue via header+media; Open issue row retired; strip stays interactive in place.
