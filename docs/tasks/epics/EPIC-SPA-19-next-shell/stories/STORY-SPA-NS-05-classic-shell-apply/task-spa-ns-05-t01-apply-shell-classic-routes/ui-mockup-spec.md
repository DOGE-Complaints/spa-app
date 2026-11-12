# UI mockup spec — STORY-SPA-NS-05 classic shell apply (D2.3)

**Path:** A (`@mockup` Arch 01 §3 D2.3 + shell chrome reuse M149 — AskQuestion skipped · overnight auto-approved)  
**Anchor task:** `task-spa-ns-05-t01-apply-shell-classic-routes`  
**ui_anchor:** true  
**Package:** `pkg-000101`  
**extends mockup:** Arch D2.3 · NS-X · M149 shell chrome already shipped NS-02…04  
**Human gate:** **принято** `2026-10-09T17:21:55Z` (overnight / UX ready · `ui_gate: auto`)

## Source mockups

```text
@mockup: spa-app/docs/architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md §3 D2.3
@risks: spa-app/docs/architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md
@register: spa-app/docs/tasks/backlog-stories/next-shell/NS-shell-mockup-intake-register.md row NS-X
@shell-reuse: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md
@icons: spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md (reuse)
```

## Target (NS-05 scope only)

| State | Route / surface | UI |
|-------|-----------------|-----|
| Classic shell | `#/board`, `#/issue/:id` | same AppShell chrome as next (header · ProfileRail · empty right · mobile) |
| Shelter content | main | legacy board/issue list intact · hybrid ≠ Feed Product Done |
| Brand home | header brand | → `#/next/feed` (not classic) |
| HIW / other | `/how-it-works` | not forced classic-shelter chrome |
| Feed body | — | OOS → next-feed |

## Layout delta (this story)

- `AppShellLayout`: `useNextShellChrome = isNextFeed \|\| isClassicShelter`
- Class `next-shell-classic-shelter` on classic routes
- Optional L10N `nextShell.shelter.classicHint`
- **Forbidden:** BoardFeed invent · retire classic · dual shell · flip `/` (NS-06) · new SVG

## Baseline (UI-0)

`ui-baseline/pre-implement/01-board-classic-as-is.png`

## Verify (UI-3)

`ui-baseline/post-implement/` desktop classic shell + mobile chrome · vitest ns05 · live Backend UP.
