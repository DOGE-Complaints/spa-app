# SPA-NF-LAB-05-T02 — Reaction CSS plane (drop classic Controls)

**Status:** Blocked · P3 prerequisite unmet (`2026-10-13T13:17:15Z`) · not Done
**Story:** [`../STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`](../STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md)
**ui_scope:** `next-feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T13:13:55Z`
**Package:** `pkg-000131`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
**Depends on:** LAB-03/04 visual gates PASS · LAB-03 lab reaction plane as reference
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK**

## Purpose
Remove classic `ReactionControls.css` from next reaction Done path; use lab-proven next/lab CSS (M154 look).

## Constraints
- Do not re-skin via classic Controls as Done.
- Closed reaction contract only — no invent ids/icons.
- `#/board` may keep classic until separate cutover (dual plane).
- name ≠ create until P3 (and unlock).

## AC / DoD
- [ ] Next reaction Done path: **no** classic `ReactionControls.css` import
- [ ] Lab-proven next CSS / chrome in use
- [ ] M154 must-states aimed (C) · visual OP in T04

## Where to change
- Next-feed reaction mount / `ReactionChrome` import sites under `features/feed/`
- Cite lab `LabReactionChrome` pattern (no Controls.css)

## Verification
- Grep next Done reaction path for ReactionControls.css absent
- Path A M154 evidence in T04
