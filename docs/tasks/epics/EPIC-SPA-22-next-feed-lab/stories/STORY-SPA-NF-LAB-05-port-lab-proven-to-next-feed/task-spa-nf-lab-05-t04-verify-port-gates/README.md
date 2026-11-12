# SPA-NF-LAB-05-T04 — Verify port + visual gates

**Status:** Blocked · P3 prerequisite unmet (`2026-10-13T13:17:15Z`) · inventory only · not Done
**Story:** [`../STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`](../STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md)
**ui_scope:** `next-feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/next/feed` · `/#/lab/feed` · `/#/board`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T13:13:55Z`
**Package:** `pkg-000131`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**Also gates:** M150 · M154 · M152 · M153 · M158 (product context)
**Depends on:** LAB-03/04 OP eye PASS evidence Present — else gate **BLOCK**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §4–5 · Partial=**BLOCK**

## Purpose
Verify import bans · local-five `#/next/feed` + `#/lab/feed` + `#/board` smoke · visual evidence pack vs written must-states. **Stop if Partial** or if LAB-03/04 OP Absent (prerequisite).

## Gate order
1. Prerequisite: LAB-03/04 checklists + shots + **OP PASS** Present (else **BLOCK**)
2. Ban grep: no BoardIssuePost shelter · no ReactionControls.css on next Done
3. Path A product screenshots + OP
4. `#/lab/feed` still reference · `#/board` smoke OK

## Constraints
- Do not invent LAB-03/04 OP eye PASS.
- Partial visual = **BLOCK**.
- Screenshots name ≠ create until implement.
- No invent API/icons.

## AC / DoD
- [ ] Prerequisite OP PASS documented (or honest BLOCK)
- [ ] Ban re-check PASS
- [ ] `#/next/feed` visual pack + OP
- [ ] `#/lab/feed` + `#/board` smoke
- [ ] Story closed only if all PASS (no Partial)

## Where to change
- Story-root `screenshots/` + gate notes
- Product CSS/compose as needed for must-states (C)

## Verification
- Story gate Result=PASS only when prerequisite + port visual rows PASS
