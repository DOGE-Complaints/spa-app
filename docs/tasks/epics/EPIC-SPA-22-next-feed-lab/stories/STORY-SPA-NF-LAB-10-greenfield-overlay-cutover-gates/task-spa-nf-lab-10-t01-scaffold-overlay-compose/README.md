# SPA-NF-LAB-10-T01 — Overlay compose + hit targets

**Status:** Done · P3 (`2026-10-13T19:24:46Z`)
**Story:** [`../STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md`](../STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T16:43:24Z`
**Package:** `pkg-000136`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png)
**Depends on:** LAB-07 · LAB-08 · LAB-09 Present
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK** · no invent OP PASS

## Result
- `feed-lab/post/FeedIssueDetailOverlay` + `FeedIssueDetailBody` Present
- Hit targets: title/summary/media/Open issue · strip excluded (nflab10)
- OverlayHost chrome cited · greenfield body atoms · fixture-only

## AC / DoD
- [x] Overlay modules Present under `feed-lab/post/`
- [x] Open/close matrix + focus return (FR-LAB-10.1)
- [x] Strip excluded from Issue open
- [x] Ban-list held on greenfield Done path
- [x] No greenfield visual Done claim (`data-lab-visual-done=false`)
