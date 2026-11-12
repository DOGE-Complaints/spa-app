# SPA-NF-12-T01 — Pass `search` in buildIssuesQuery + serialize (REQ-56 param only)

**Status:** Done · P3 (`2026-10-11T15:10:00Z`)
**Story:** [`../STORY-SPA-NF-12-text-search-fe-enable.md`](../STORY-SPA-NF-12-text-search-fe-enable.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-12-text-search-fe-enable.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-12-text-search-fe-enable.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-12-t02-toolbar-enable/README.md`](../task-spa-nf-12-t02-toolbar-enable/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-11T15:05:17Z`
**Package:** `pkg-000114`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**Arch delta:** [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../../../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) · **AD-VP-03** · **AD-VP-06** · **AD-VP-04**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh` (gateway must serve `search`)

## Purpose
Pass `search` in buildIssuesQuery + serialize (REQ-56 param only)

## Arch anchors
- [02 §2a board text search](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) AD-VP-03
- REQ-56 gateway param **`search`** — do not invent endpoint/param name
- [03 §1](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) AD-VP-04 (evidence for enable)

## Arch context
- DUI-Q12 lift — FE enable only; gateway Ready.
- Compose with structural filters + `status=PUBLISHED`.
- Classic board shelter OOS unless shared helper task.

## Constraints
- No invent search endpoint or alternate param name.
- No invent comments search / FTS indexes.
- Shell chrome OOS — next-shell.
- M155 OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-12
- [x] HTTP `search` present when non-empty trimmed query
- [x] Empty/whitespace → no text restriction
- [x] No invent gateway endpoint
