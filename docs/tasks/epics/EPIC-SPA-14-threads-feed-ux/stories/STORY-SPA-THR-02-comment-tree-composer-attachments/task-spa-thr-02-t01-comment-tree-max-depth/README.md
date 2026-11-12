# SPA-THR-02-T01 — Nested tree + max-depth boundary from knobs

**Status:** Done  
**Story:** [`../STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../STORY-SPA-THR-02-comment-tree-composer-attachments.md)  
**Decision Ref:** FR-THR-02.1 / FR-THR-02.2 · [backlog](../../../../../../backlog-stories/threads-feed/STORY-SPA-THR-02-comment-tree-composer-attachments.md) · [M144](../../../../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md)  
**Depends on:** THR-01 `IssueThreadBlock` Done  
**ui_scope:** `mixed` · **ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T21:00:23Z
**Done:** 2026-09-22T21:05:21Z  
**Package:** `pkg-000078`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.png
```

## Purpose
Render nested comment hierarchy (THR-T-A) with indentation/connectors; at configured max depth (prop/knob — not invent fixed product law) omit deeper Reply and show boundary copy (THR-T-B). Presentation-only until social Closed.

## Risk
Hard-coding a fake depth as product law; inventing HTTP; inventing believable comment prose.

## Code Facts (re-verify at execute)
- Host: [`IssueThreadBlock.jsx`](../../../../../../../src/components/threads/IssueThreadBlock.jsx) populated slots
- Social read: **Open** — local presentation nodes only; no invent endpoints

## AC / DoD
- [x] (P0) THR-T-A parent/child hierarchy visible (`data-testid` tree/nodes)
- [x] (P0) THR-T-B max-depth: no deeper Reply + `maxDepthReached` copy
- [x] (P0) Depth from prop/knob — no fixed numeric product law in UI copy
- [x] (P0) No invent HTTP / fabricated people/prose

## Where to change
- `src/components/threads/` (tree under `IssueThreadBlock` or sibling)

## Out of scope
Reply composer body (T02) · attach (T03) · THR-03… · invent HTTP

## Verification
```bash
rg -n 'maxDepth|issue-thread-tree|maxDepthReached' spa-app/src/components/threads || true
```
