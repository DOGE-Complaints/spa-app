# SPA-NF-LAB-10-T02 — Cutover FeedLabPage · Deprecated ban

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
**Depends on:** T01 overlay compose
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK** · no invent OP PASS

## Result
- `FeedLabPage` greenfield only · no Deprecated section
- `*Deprecated` import ban on page + `post/` (vitest)
- `data-lab-plane=greenfield` · `data-lab-visual-done=false` · `#/next/feed` unchanged

## AC / DoD
- [x] `#/lab/feed` greenfield only (FR-LAB-10.2)
- [x] `*Deprecated` import ban on Done path (grep/vitest)
- [x] `data-lab-plane=greenfield` on lab Done mount
- [x] `data-lab-visual-done=false` held
- [x] `#/next/feed` untouched
