# SPA-NF-09-T03 — Wire civic Reactions zone to same picker entry

**Status:** ✅ Done · P3 (`2026-10-11T14:04:38Z`)
**Done:** `2026-10-11T14:04:38Z`
**Story:** [`../STORY-SPA-NF-09-reactions-strip-picker-chrome.md`](../STORY-SPA-NF-09-reactions-strip-picker-chrome.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-09-reactions-strip-picker-chrome.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-09-reactions-strip-picker-chrome.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-09-t01-compact-strip/README.md`](../task-spa-nf-09-t01-compact-strip/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-11T13:57:51Z`
**Package:** `pkg-000111`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
**Arch delta:** [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../../../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) · **AD-VP-01** · **AD-VP-02** · **AD-VP-04**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Wire civic Reactions zone to same picker entry

## Arch anchors
- [02 §1a–1b](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) AD-VP-01/02
- [03 §1 live↔artboard](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) AD-VP-04
- M154 THR-R strip + picker · THREAD-ROOT-SCOPE

## Arch context
- Visual parity wave — reskin mandatory on `#/next/feed*` (AD-VP-01).
- Presentation in `features/feed/`; Closed reaction semantics/catalog/PUT only.
- Civic Reactions zone (NF-07) opens the same picker (FR-NF-09.3).

## Constraints
- No invent gateway/threads endpoints or reaction ids.
- Shell chrome OOS — next-shell.
- Path A must-states ≥ M154 strip + picker (anti-narrowing).
- M155 people / Connect invent OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-09
- [x] reactions.v1 catalog + Closed PUT only (AD-VP-02)
- [x] No M155 people surfaces
- [x] No invent Path A narrowing below M154 strip+picker
- [x] No invent gateway/threads endpoints
