# UI mockup spec — STORY-SPA-NS-01 next routes + shell host (Path A)

**Path:** A (`@mockup` M149 on disk — AskQuestion skipped · overnight auto-approved)  
**Anchor task:** `task-spa-ns-01-t01-register-next-feed-routes`  
**ui_anchor:** true  
**Package:** `pkg-000097`  
**extends mockup:** `mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md` (shell host frame only)  
**Human gate:** **принято** `2026-10-09T15:05:10Z` (overnight / ready mockups)

## Source mockups

```text
@mockup: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md
@mockup-png: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png
@arch: spa-app/docs/architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md §2
@register: spa-app/docs/tasks/backlog-stories/next-shell/NS-shell-mockup-intake-register.md row _(routes)_
```

## Target (NS-01 scope only)

| State | Route | UI |
|-------|-------|-----|
| Host feed | `#/next/feed` | Inside `AppShellLayout` public chrome; main = honest WIP (`nextShell.wip.*`) |
| Host issue | `#/next/feed/issue/:id` | Same host + WIP (no Issue/thread product body) |
| Shelter (unchanged) | `#/board`, `#/issue/:id` | Classic remain; `/` and `*` still → `/board` (NS-06 later) |

## Layout delta (this story)

- Register routes **above** catch-all `*`.
- Reuse existing `AppShellLayout` / Header / Footer — **do not** invent NS-02 header chrome or ProfileRail (NS-03).
- Main content: title + body via `t()`; `data-testid="next-feed-host-wip"`.
- **Forbidden:** BoardFeed cards, filters toolbar product, map, threads, reactions, fake production feed.

## Baseline (UI-0)

`ui-baseline/pre-implement/01-board-shelter-default.png` — as-is `#/board` shell before `#/next/*` exists.

## Verify (UI-3)

`ui-baseline/post-implement/01-next-feed-wip.png` (+ optional issue host) · vitest route smoke · `test:ui:board-shell` regression.
