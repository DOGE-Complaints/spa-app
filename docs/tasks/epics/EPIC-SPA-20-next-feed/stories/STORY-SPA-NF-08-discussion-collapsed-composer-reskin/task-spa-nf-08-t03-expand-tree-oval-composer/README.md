# SPA-NF-08-T03 — Expand Discussion → tree + oval composer

**Status:** Done · P3 (`2026-10-11T13:41:25Z`)
**Story:** [`../STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md`](../STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-11T13:36:54Z`
**Package:** `pkg-000110`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)
**Arch delta:** [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../../../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) · **AD-VP-01** · **AD-VP-02** · **AD-VP-04**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
## Purpose
Expand Discussion → tree + oval composer

## Arch anchors
- AD-VP-01 · AD-VP-02 · M153

## Arch context
- Visual parity wave — reskin mandatory on `#/next/feed*` ([02 §1a](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)).
- Live↔artboard gate for Done ([03 §1](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) AD-VP-04).
- One data plane; Closed threads contracts only — 00 Q4.

## Implement notes
- Oval composer presentation wrapper in features/feed; Closed compose semantics.

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
