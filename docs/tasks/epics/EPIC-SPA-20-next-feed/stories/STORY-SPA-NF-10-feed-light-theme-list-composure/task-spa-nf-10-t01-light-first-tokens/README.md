# SPA-NF-10-T01 — Light-first tokens and card surfaces

**Status:** Done · P3 (`2026-10-11T14:44:52Z`)
**Story:** [`../STORY-SPA-NF-10-feed-light-theme-list-composure.md`](../STORY-SPA-NF-10-feed-light-theme-list-composure.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-10-feed-light-theme-list-composure.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-10-feed-light-theme-list-composure.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-11T14:39:20Z`
**Package:** `pkg-000112`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**Arch delta:** [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../../../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) · **AD-VP-01** · **AD-VP-04**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Light-first tokens and card surfaces

## Arch anchors
- [02 §3 tokens](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [02 §1a](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) AD-VP-01
- [03 §1 live↔artboard](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) AD-VP-04

## Arch context
- Visual parity wave — light-first feed content plane on `#/next/feed*`.
- Shell chrome OOS — score feed content tokens only.
- No invent gateway batch social endpoint (DUI-Q11).

## Constraints
- No invent gateway/threads endpoints or fields.
- Shell chrome OOS — next-shell.
- Path A must-states ≥ M149 populated light / M160 theme stress.
- M155 people OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-10
- [x] Light-first civic + discussion surfaces (AD-VP-01)
- [x] Dark sample does not regress contrast (M160)
- [x] List composure FE-only — no invent batch API
- [x] No invent gateway/threads endpoints
