# STORY-SPA-NF-16 — More (⋮) menu deferred (comment-out + memo)

## Meta

- **Key:** `STORY-SPA-NF-16-more-menu-deferred`
- **Package:** [next-feed](INDEX.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §4 · **L2** tech subtasks
- **Status:** P1.3 activated · gate PENDING · T01–T03 Todo · `pkg-000192` · **no UX gen** · Await P2 · Partial visual=BLOCK (OP eye)
- **Depends on:** NF-VL-01 / NF-02 identity header Present
- **Interview:** [INTERVIEW-NF-13-plus…](INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) **M4**
- **UX gen:** none
- **Code home:** `IssueIdentityHeader.jsx` · `IssueIdentityHeader.css` · soft `FeedCivicPost.css` more rules

## Зачем

Three-dots affordance has **no** menu/handler. OP: comment out for now; leave a durable memo so future menu work is not forgotten.

## L1 — FR

- **FR-NF-16.1** More button **not** rendered as live affordance on `#/next/feed` civic header (`feed-civic-post-more` Absent from DOM).  
- **FR-NF-16.2** Prefer `false && (` … `)` or equivalent gated block over hard delete of JSX — restore cheap when menu product lands.  
- **FR-NF-16.3** In-code memo (required text, Apply may trim wording but must cite story):

  ```text
  // TODO(NF-16 / INTERVIEW-NF-13-plus M4): restore overflow (⋮) menu when product
  // defines actions. Do not delete more.svg. See ARCH-DELTA-live-civic-residual §4.
  ```

- **FR-NF-16.4** [ARCH-DELTA §4](ARCH-DELTA-live-civic-residual-2026-10-21.md) remains docs SSOT for restore.  
- **FR-NF-16.5** Asset `/icons/next-feed/actions/more.svg` **kept** on disk · catalog note: deferred / unused on civic header.  
- **FR-NF-16.6** i18n `nextFeed.post.more` may remain — no invent menu items copy.  
- **FR-NF-16.7** Vitest: `feed-civic-post-more` Absent on civic post render.  
- **FR-NF-16.8** Soft: if other surfaces reuse `IssueIdentityHeader` with more required, gate via prop `showMore={false}` default for feed civic — document prop in L2.

## Вне scope

Implementing overflow menu · invent menu actions · invent OP PASS · delete `more.svg`

## L1 — Acceptance Criteria

- [ ] More not visible on live civic card  
- [ ] Gated/commented block + TODO Present  
- [ ] ARCH-DELTA §4 held  
- [ ] more.svg not deleted  
- [ ] Vitest  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCH-DELTA §4](ARCH-DELTA-live-civic-residual-2026-10-21.md). Future menu = new story; this story only defers.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-16-t01-gate` | Await | Gate more render · add TODO memo · optional `showMore` prop | IssueIdentityHeader | 16.1…16.3 · 16.8 |
| `task-spa-nf-16-t02-catalog-note` | Await | NF-icon-assets: more = deferred on civic header | STORY-SPA-NF-icon-assets.md | 16.4 · 16.5 |
| `task-spa-nf-16-t03-vitest` | Await | more Absent | tests | 16.7 |

### Order

`t01` → `t02` → `t03`

## DoD

No dead more control on civic cards; restore path documented in code + ARCH-DELTA.
