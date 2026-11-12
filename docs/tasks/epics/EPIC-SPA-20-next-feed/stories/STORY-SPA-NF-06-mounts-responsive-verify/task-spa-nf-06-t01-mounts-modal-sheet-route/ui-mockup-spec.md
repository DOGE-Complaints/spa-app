# UI mockup spec — SPA-NF-06-T01 (Path A)

**Status:** accepted for handoff · Path A  
**Date:** `2026-10-10T19:40:00Z`  
**Package:** `pkg-000108`  
**ui_anchor:** true

## Path A SSOT (no STORY-UX-MOCKUP-BRIEF)

| Artboard | Role |
|----------|------|
| [M158](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) | Issue modal / sheet / route parity |
| [M159](../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) | Narrow **feed body** only (shell OOS) |
| [M160](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) | Theme + L10n stress |

Register: [NF-feed-mockup-intake-register.md](../../../../../backlog-stories/next-feed/NF-feed-mockup-intake-register.md) row NF-I → NF-06.

## Implementation claim

- Shared `FeedIssueDetail` (civic + `FeedThreadMount`) across `data-presentation` = `modal` | `sheet` | `route`
- Mount chrome: `nextFeed.mount.close` · `nextFeed.mount.openAsPage` · shell close icon reuse
- Fixtures: DEMO-NF06-1 · no invent Issue HTTP

## Human gate

**Accepted** for P3 UI-2/UI-3 — Path A artboards accepted 2026-10-08; product screenshots story-root `screenshots/full-cycle/`.
