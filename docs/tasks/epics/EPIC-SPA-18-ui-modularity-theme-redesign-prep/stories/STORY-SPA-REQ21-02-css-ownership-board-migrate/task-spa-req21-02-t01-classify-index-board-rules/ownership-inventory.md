# Ownership inventory — index.css board rules (T01)

**UTC:** `2026-10-06T19:55:06Z` classify · closed with P3 migrate  
**Source:** `src/index.css` (pre: 563 LOC, 49 `.board-` hits)

| Layer | Home (after migrate) | Selectors / blocks |
|-------|----------------------|--------------------|
| **reset** | `src/index.css` | `:root`, `body`, `#root` |
| **shell** | `src/components/AppShell/AppShell.css` | `.board-shell`, `.header-strip`, `.header-brand*`, `.header-controls`, `.header-status`, `.board-main*`, `.board-sidebar*`, `.board-nav*`, `.board-workspace`, `.board-footer`, `@media 960px` shell parts |
| **shell/locale** | `src/components/LocaleSelector/LocaleSelector.css` | `.header-locale*` |
| **feature/page board** | `src/pages/BoardPage.css` | `.board-toolbar*`, `.board-cta*`, `.board-columns`, `.board-continuum*`, `.board-feed*`, `.board-column*`, `.board-skeleton*`, `.board-load-error` / no-issues / no-results, related `@media` |
| **page issue** | `src/pages/IssuePage.css` | `.issue-page-*`, `.issue-details-*` |

Arch SSOT: `docs/architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md` §3.
