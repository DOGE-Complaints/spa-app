# STORY-SPA-NF-16-more-menu-deferred — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md)  
> **Status:** P5 APPLY Done · gate **BLOCK** · `2026-10-21T12:58:10Z` · tip · activation **none** · Await **P8**  
> **Package:** `pkg-000192` · next-feed · REQ-22 · ARCH-DELTA §4  
> **ui_scope:** `feed` · **mixed** · Path A **code lock** · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** NF-VL-01 / NF-02 identity header Present · soft NF-14 hit (`showMore` / moreOutsideHit)  
> **Runtime:** T01–T03 **Done** · vitest **527/527** · shots 01–05 Present · P5 TASKED=0 · P6 skip · no invent OP PASS

## Purpose

Three-dots affordance has **no** menu/handler. OP: comment out for now; leave a durable memo so future menu work is not forgotten.

## L1 — FR (backlog verbatim)

- **FR-NF-16.1** More button **not** rendered as live affordance on `#/next/feed` civic header (`feed-civic-post-more` Absent from DOM).  
- **FR-NF-16.2** Prefer `false && (` … `)` or equivalent gated block over hard delete of JSX — restore cheap when menu product lands.  
- **FR-NF-16.3** In-code memo (required text, Apply may trim wording but must cite story):

  ```text
  // TODO(NF-16 / INTERVIEW-NF-13-plus M4): restore overflow (⋮) menu when product
  // defines actions. Do not delete more.svg. See ARCH-DELTA-live-civic-residual §4.
  ```

- **FR-NF-16.4** [ARCH-DELTA §4](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) remains docs SSOT for restore.  
- **FR-NF-16.5** Asset `/icons/next-feed/actions/more.svg` **kept** on disk · catalog note: deferred / unused on civic header.  
- **FR-NF-16.6** i18n `nextFeed.post.more` may remain — no invent menu items copy.  
- **FR-NF-16.7** Vitest: `feed-civic-post-more` Absent on civic post render.  
- **FR-NF-16.8** Soft: if other surfaces reuse `IssueIdentityHeader` with more required, gate via prop `showMore={false}` default for feed civic — document prop in L2.

## Acceptance Criteria (backlog verbatim)

- [x] More not visible on live civic card  
- [x] Gated/commented block + TODO Present  
- [x] ARCH-DELTA §4 held  
- [x] more.svg not deleted  
- [x] Vitest  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-16-more-menu-deferred.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-16-t01-gate](task-spa-nf-16-t01-gate/README.md) | Gate more render · add TODO memo · optional `showMore` prop | **Done** |
| T02 | [task-spa-nf-16-t02-catalog-note](task-spa-nf-16-t02-catalog-note/README.md) | NF-icon-assets: more = deferred on civic header | **Done** |
| T03 | [task-spa-nf-16-t03-vitest](task-spa-nf-16-t03-vitest/README.md) | more Absent | **Done** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

Implementing overflow menu · invent menu actions · invent OP PASS · delete `more.svg`

## DoD (backlog verbatim)

No dead more control on civic cards; restore path documented in code + ARCH-DELTA.

## @mockup handoff

- Continuity: [ARCH-DELTA §4](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · [INTERVIEW M4](../../../../backlog-stories/next-feed/INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) · Path A code lock
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-more-menu-deferred.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
