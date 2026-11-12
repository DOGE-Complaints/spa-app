# SPA-NF-LAB-04-T03 — Verify + M158 visual gate (A+F)

**Status:** Done · evidence · OP Pending · story BLOCK (`2026-10-13T13:06:08Z`)
**Story:** [`../STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`](../STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T12:59:05Z`
**Package:** `pkg-000130`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png)
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §4–5 · Partial=**BLOCK**

## Purpose
Verify open/close matrix on `#/lab/feed` (no gateway/threads HTTP). Extract M158 written must-state checklist; capture local-five screenshots; OP eye. **Stop tip if Partial** — do not close story.

## Gate order
1. Behavior matrix — text/media open · action strip no-open · Escape/close/scrim · focus return
2. Ban re-check · fixture identity · discussion copy
3. **M158** must-state checklist + screenshot + OP

## Constraints
- Partial visual = **BLOCK** (forbidden as Done).
- Screenshots **name ≠ create** until implement.
- Do not invent LAB-03 OP eye PASS / visual Done.
- No invent · no product mutate · no classic Controls as Done skin.

## AC / DoD
- [x] Open/close matrix verified · no HTTP
- [x] Written M158 checklist in gate evidence
- [x] local-five screenshots Present
- [ ] OP eye recorded — **Absent → story Result BLOCK**
- [ ] Story closed only if M158 visual PASS (no Partial) — **not closed**

## Where to change
- Story-root `screenshots/` + gate notes / acceptance-verification
- Lab CSS restyle as needed to hit written must-states (C)

## Verification
- Story gate Result=PASS only when M158 visual rows PASS
- Ban re-check · product routes unchanged
