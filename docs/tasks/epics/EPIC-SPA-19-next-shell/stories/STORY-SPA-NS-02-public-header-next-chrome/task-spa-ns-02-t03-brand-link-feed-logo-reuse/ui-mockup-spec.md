# UI mockup spec — STORY-SPA-NS-02 PublicHeader next chrome

**Path:** A (`@mockup` M149 §4 Header · Component §8 PublicHeader — AskQuestion skipped · overnight auto-approved)  
**Anchor task:** `task-spa-ns-02-t03-brand-link-feed-logo-reuse`  
**ui_anchor:** true  
**Package:** `pkg-000098`  
**extends mockup:** `mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md` §4 Shared anatomy / PublicHeader  
**Human gate:** **принято** `2026-10-09T15:26:52Z` (overnight / ready mockups · `ui_gate: auto`)

## Source mockups

```text
@mockup: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md §4
@mockup-png: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png
@component: spa-app/docs/UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md §8 PublicHeader
@register: spa-app/docs/tasks/backlog-stories/next-shell/NS-shell-mockup-intake-register.md row NS-H
@icons: spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md
```

## Target (NS-02 scope only)

| State | Route / surface | UI |
|-------|-----------------|-----|
| Brand home | brand Link | → `#/next/feed`; logo `/assets/DOGEstonia-logo-*` reuse |
| Icons | Header / ThemeToggle / Account | `/icons/next-shell/{navigation,actions}/…` after promote |
| Guest | account slot | Sign in → `/login` · `publicHome.account.*` |
| Auth logout | account menu | client `signOut` → feed home `#/next/feed` · no `/logout` |
| Search | header control | affordance only · `nextShell.header.searchAria` · no live results |
| Notifications | header control | chrome glyph only · inbox OOS |
| Feed body | main | OOS → next-feed · keep NS-01 WIP host |

## Layout delta (this story)

- Promote masters → `public/icons/next-shell/{navigation,actions,status}/`.
- Wire menu / theme / account (+ search/notifications chrome) to next-shell URLs.
- Brand → `/next/feed`; preserve PH primary nav (no redesign invent §8 Forbidden).
- L10N `nextShell.header.*`; reuse `publicHome.account.*`.
- **Forbidden:** BoardFeed, toolbar product filters, notification inbox, new SVG/logo, flip `/` (NS-06).

## Baseline (UI-0)

`ui-baseline/pre-implement/01-next-feed-header-as-is.png` — as-is `#/next/feed` header (NS-01 host · brand→`/board`) before NS-02 chrome.  
`ui-baseline/pre-implement/02-board-header-as-is.png` — shelter reference.

## Verify (UI-3)

`ui-baseline/post-implement/01-next-feed-header-chrome.png` · vitest Header/Account/l10n · `test:ui:board-shell` · live smoke brand→`#/next/feed`.
