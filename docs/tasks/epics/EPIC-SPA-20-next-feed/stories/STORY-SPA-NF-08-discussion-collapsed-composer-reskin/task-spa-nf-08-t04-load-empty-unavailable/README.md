# SPA-NF-08-T04 — Load / empty / unavailable Discussion states

**Status:** Done · P3 (`2026-10-11T13:41:25Z`)
**Story:** [`../STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md`](../STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-08-t01-feed-discussion-collapsed/README.md`](../task-spa-nf-08-t01-feed-discussion-collapsed/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-11T13:36:54Z`
**Package:** `pkg-000110`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)
**Arch delta:** [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../../../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) · **AD-VP-01** · **AD-VP-02** · **AD-VP-04**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
## Purpose
Load / empty / unavailable Discussion states

## Arch anchors
- [03 verify](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)

## Arch context
- Visual parity wave — reskin mandatory on `#/next/feed*` ([02 §1a](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)).
- Live↔artboard gate for Done ([03 §1](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) AD-VP-04).
- One data plane; Closed threads contracts only — 00 Q4.

## Implement notes
- Explicit empty/unavailable; no invent thread payloads.

## Constraints
- No invent gateway/threads endpoints or fields.
- Shell chrome OOS — next-shell.
- Path A must-states ≥ artboard composition (anti-narrowing).
- M155 people OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-08
- [x] Closed threads client reuse only (AD-VP-02)
- [x] No classic 3-button DISCUSSION row competing with civic strip
- [x] No invent Path A narrowing below M152 collapsed
- [x] No invent gateway/threads endpoints
