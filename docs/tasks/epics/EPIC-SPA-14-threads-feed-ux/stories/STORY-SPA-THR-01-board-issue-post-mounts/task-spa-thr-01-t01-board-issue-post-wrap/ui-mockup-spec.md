# ui-mockup-spec — THR-01 (Path A)

**extends mockup:**
- `spa-app/docs/UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.png`
- `spa-app/docs/UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.png`

## Delta (this wave)

- Continuous outer shell `board-issue-post` (M143 rev 1.1)
- Shared `issue-thread-block` on `/board` + `/issue/:id`
- Local statuses loading/empty/populated/unavailable — **no invent social HTTP**
- Action row React / Discussion / Invite organization + composer placement

## Selectors

- `[data-testid="board-issue-post"]`
- `[data-testid="issue-thread-block"]`
- `[data-testid="issue-thread-actions"]`
- `[data-testid="issue-thread-composer"]`
