# ADMIN-NF-04 — Backlog stories + L10N

## Meta

- **Key:** `ADMIN-NF-04-backlog-stories-l10n`
- **Status:** Done
- **Depends on:** ADMIN-NF-01 (intake), ADMIN-NF-02 (icons **on disk**), ADMIN-NF-03 (api)
- **Blocks:** ADMIN-NF-05
- **Skill:** backlog authoring (образец [ADMIN-NS-05](../next-shell/ADMIN-NS-05-backlog-stories-l10n.md) / PH-05)
- **Deliverable:** STORY-SPA-NF-01…06 (Todo)
- **Rework:** was ADMIN-NF-05

## Цель

Создать **STORY-SPA-NF-01…06** с UX paths, **runtime** icon URLs (уже в `public/icons/next-feed/` после ADMIN-NF-02), api-req links, L10N. Файлы — **только при выполнении этого ADMIN**.

## Target STORY keys

| Key | Suggested filename | Surface |
|-----|-------------------|---------|
| NF-01 | `STORY-SPA-NF-01-feed-list-toolbar-query.md` | M149 feed/toolbar |
| NF-02 | `STORY-SPA-NF-02-civic-issue-post.md` | M150 |
| NF-03 | `STORY-SPA-NF-03-list-map-toggle.md` | M151 |
| NF-04 | `STORY-SPA-NF-04-thread-tree-composer.md` | M152–M153 |
| NF-05 | `STORY-SPA-NF-05-reactions-invite-write-gate.md` | M154, M156, M157 |
| NF-06 | `STORY-SPA-NF-06-mounts-responsive-verify.md` | M158–M160 + feed smoke |

Also update: [INDEX.md](INDEX.md) · [`../INDEX.md`](../INDEX.md) · [`../../spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md) **after** stories exist.

## Required sections in each STORY

```markdown
## UX SSOT
- Spec: docs/UX/next/feed/artboards/… §…
- Register: NF-feed-mockup-intake-register.md row …

## Icons (from STORY-SPA-NF-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| … | react | /icons/next-feed/actions/react.svg |

## API
- Link rows in STORY-SPA-NF-api-requirements.md
```

Prerequisite: catalog runtime URLs resolve under `public/icons/next-feed/` (ADMIN-NF-02 Done). No M155 story.

## L10N

- Reuse `threadsFeed.*`, filter/board keys where valid  
- Draft `nextFeed.*` for new strings only  
- en/et/ru tables per story

## Acceptance

- [x] 6 story files with L10N + UX + icons + api links
- [x] Icon URLs are `/icons/next-feed/…` or documented next-shell reuse (not docs masters)
- [x] Shell ownership OOS; feed AC on `#/next/feed*`
- [x] INDEX admin-04 Done; NF stories Todo

## Как выполнять

«Выполни ADMIN-NF-04: создай NF-01…06 по intake/icons/api».
