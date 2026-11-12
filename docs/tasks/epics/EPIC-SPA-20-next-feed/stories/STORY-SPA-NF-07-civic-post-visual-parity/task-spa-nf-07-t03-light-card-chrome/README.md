# SPA-NF-07-T03 — Light-first civic card chrome

**Status:** Done · P3 (`2026-10-11T13:18:27Z`)
**Story:** [`../STORY-SPA-NF-07-civic-post-visual-parity.md`](../STORY-SPA-NF-07-civic-post-visual-parity.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-07-civic-post-visual-parity.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-07-civic-post-visual-parity.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-07-t01-four-zone-action-strip/README.md`](../task-spa-nf-07-t01-four-zone-action-strip/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-11T13:10:17Z`
**Package:** `pkg-000109`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
**Arch delta:** [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../../../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md)
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
## Purpose
Light-first civic card chrome

## Arch anchors
- [02 §3 tokens](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Arch context
- Visual parity wave — reskin mandatory on `#/next/feed*` ([02 §1a](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)).
- Live↔artboard gate for Done ([03 §1](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) AD-VP-04).
- One data plane; Closed threads contracts only — 00 Q4.

## Implement notes
- Apply light-first tokens to civic surface; pair NF-10 if shared.

## Constraints
- No invent gateway/threads endpoints or fields.
- Shell chrome OOS — next-shell.
- Path A must-states ≥ artboard composition (anti-narrowing).
- M155 people OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-07
- [x] Runtime icon URLs from catalog / documented gap only
- [x] No shell D2 ownership claim
- [x] No invent Path A narrowing below M150 four-zone
- [x] No invent gateway/threads endpoints
