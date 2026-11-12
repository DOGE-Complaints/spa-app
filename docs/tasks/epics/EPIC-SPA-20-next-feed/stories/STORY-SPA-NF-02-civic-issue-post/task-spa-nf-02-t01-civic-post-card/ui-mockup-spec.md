# UI mockup spec — STORY-SPA-NF-02 civic issue-as-post

**Path:** A (`@mockup` M150 · AskQuestion skipped · UX ready)  
**Anchor task:** `task-spa-nf-02-t01-civic-post-card`  
**ui_anchor:** true · **ui_scope:** `feed`  
**Package:** `pkg-000104`  
**Human gate:** **принято** `2026-10-10T18:36:00Z` (Path A / `ui_gate: auto` · M150 accepted)

## Source mockups

```text
@mockup: spa-app/docs/UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md
@mockup-png: spa-app/docs/UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png
@register: spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md row NF-P → NF-02
@api: spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-api-requirements.md §1.2
@icons: spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md
```

## Target (NF-02 scope only — civic post chrome)

| State | Route / surface | UI |
|-------|-----------------|-----|
| ISSUE-CARD-NO-MEDIA | `#/next/feed` card | Civic identity + title/summary/labels; natural close; **no** blank media frame |
| SSR-C-civic | same | **No** schema overlay chrome / Additional details section |
| Action strip | post footer | Catalog icons: react / comment / share (+ open-issue / more); location when `geo` present |
| Missing fields | optional omit | Honest collapse — no invent schema/media |

## Layout delta (this story)

- New `FeedCivicPost` under `spa-app/src/features/feed/`
- Wire in `FeedListArea` instead of `IssueCard` for `#/next/feed` list items
- Keep `BoardIssuePost` + `LiveIssueThreadMount` seam (thread OOS for NF-02 chrome)
- Icons: `/icons/next-feed/actions/{open-issue,more,comment,react,share}.svg` + `/icons/next-shell/actions/location.svg`
- L10N: reuse `threadsFeed.post.action.*`; draft `nextFeed.post.*`

## Forbidden

- Production schema overlay claim (`SchemaCardOverlay` in feed civic post)
- Media production / blank media slot
- Invent NF-04/05 write behavior beyond strip affordances
- Shell chrome (Header / rails / AppShell) ownership

## Baseline (UI-0)

`ui-baseline/pre-implement/01-next-feed-issuecard-host-1536x1024.png`

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/` · vitest feed/post · `test:ui:board-shell`
