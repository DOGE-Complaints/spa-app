# STORY-SPA-CT-02 — Host Comment zone + composition under strip

## Meta

- **Key:** `STORY-SPA-CT-02-host-comment-strip-composition`
- **Package:** [component-thread](INDEX.md)
- **Status:** P1.3 activated · gate PENDING · `2026-10-18T13:07:07Z` · `pkg-000160` · **tip** · Await P2 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-02-host-comment-strip-composition/STORY-SPA-CT-02-host-comment-strip-composition.md)
- **Parent:** REQ-22 FR-22.4
- **Depends on:** [CT-01](STORY-SPA-CT-01-issue-thread-block-states.md)
- **UX mirror:** §4.1 P-strip · P-compose
- **Arch:** §5 Host integration
- **Code home:** `FeedPostCard` · `FeedIssueDetailBody` · `FeedPostActionStrip` · thread `apiRef`

## Зачем

Comment на полоске открывает/фокусирует тред по той же оркестрации, что Reactions→people. Тред — непрерывная область под strip внутри карточки.

## FR

- **FR-CT-02.1** `onZone('comment')` expands thread and focuses composer (via apiRef or controlled state).  
- **FR-CT-02.2** Thread region attaches directly under strip (hairline) · same card · not second card.  
- **FR-CT-02.3** Strip stays dumb — no tree/verify imports in `FeedPostActionStrip`.  
- **FR-CT-02.4** Detail overlay parity with feed card composition.  
- **FR-CT-02.5** React/Reactions zones unchanged (reactions-mount).

## Вне scope

Share behavior · M153 interior · invent HTTP

## Acceptance Criteria

- [ ] Comment click → expanded + focus  
- [ ] No ThreadMount import inside strip JSX  
- [ ] Vitest zone comment handler  
- [ ] OP eye composition  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-02-t01-thread-api-ref` | Todo | apiRef `{ expand, focusComposer }` on ThreadMount | `ThreadMount.jsx` | 02.1 |
| `task-spa-ct-02-t02-card-handle-zone` | Todo | Wire Comment zone → apiRef (preserve today’s expand) | `FeedPostCard.jsx` · detail | 02.1 · 02.5 |
| `task-spa-ct-02-t03-composition-css` | Todo | Flush thread under strip divider · same card | card/thread CSS | 02.2 · 02.4 |
| `task-spa-ct-02-t04-vitest-comment-zone` | Todo | Comment ≠ picker · expand markers | feed-lab tests | AC |

### Constraints

- Do not put discussion UI in strip  
- Hold reactions apiRef pattern  

## DoD

Comment zone clearly drives ThreadMount like Reactions drives people.
