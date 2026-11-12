# UI mockup spec — STORY-SPA-NS-03 ProfileRail + shelter nav

**Path:** A (`@mockup` M149 ProfileRail · Component §10 — AskQuestion skipped · overnight auto-approved)  
**Anchor task:** `task-spa-ns-03-t01-profilerail-shell`  
**ui_anchor:** true  
**Package:** `pkg-000099`  
**extends mockup:** `mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md` · Component §10 ProfileRail · DUI-Q15  
**Human gate:** **принято** `2026-10-09T16:06:02Z` (overnight / ready mockups · `ui_gate: auto`)

## Source mockups

```text
@mockup: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md
@mockup-png: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png
@component: spa-app/docs/UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md §10 ProfileRail
@register: spa-app/docs/tasks/backlog-stories/next-shell/NS-shell-mockup-intake-register.md row NS-R
@dui: spa-app/docs/UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md Q15
@icons: spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md
@api: spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-api-requirements.md §2.1
```

## Target (NS-03 scope only)

| State | Route / surface | UI |
|-------|-----------------|-----|
| ProfileRail chrome | `#/next/feed*` sidebar | metrics/status + nav only (Q15) · ~240 px |
| Nav Board | Link | → `#/next/feed` · icon `board` |
| Nav My stories / Profile | Link | → `/profile` · icons `my-stories` / `profile` |
| Activity | rail section | bind CAB `/story-activity` **or** honest empty (`nextShell.rail.empty`) |
| Icons | rail slots | `/icons/next-shell/…` (NS-02 promote) |
| Classic shelter | `#/board` | `PUBLIC_SHELL_SHOW_SIDEBAR` + shelter Sidebar intact (NS-05) |
| Feed body | main | OOS → next-feed · keep NS-01 WIP host |

## Layout delta (this story)

- New `ProfileRail` under AppShell; show on `#/next/feed*` only.
- `useStoryActivityRail` honest empty until SPA HTTP wired (no invent fields).
- L10N `nextShell.rail.*`.
- **Forbidden:** BoardFeed, fake story cards, cabinet redesign, new SVG, new HTTP, flip `/` (NS-06).

## Baseline (UI-0)

`ui-baseline/pre-implement/01-next-feed-no-rail-as-is.png` — as-is `#/next/feed` without ProfileRail.

## Verify (UI-3)

`ui-baseline/post-implement/01-next-feed-profile-rail.png` · vitest ProfileRail/AppShellLayout/l10n · `test:ui:board-shell` · live smoke Backend UP.
