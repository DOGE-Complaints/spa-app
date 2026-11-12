# SPA-NF-LAB-05-T01 — Displace BoardIssuePost shelter

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
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
**Also:** M149 list rhythm on product host
**Depends on:** LAB-03/04 visual gates PASS (OP eye) — currently **Blocked** residual
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK**

## Purpose
Replace `BoardIssuePost` wrap on next list Done path with lab-proven atom card compose / CSS (from LAB-03). Shelter flagged non-Done is **not** PASS.

## Constraints
- Prerequisite visual PASS — else P3 Result BLOCK / refuse.
- No invent Closed `publicLabel` / API / icons.
- `#/board` classic plane unchanged.
- name ≠ create until P3 (and unlock).

## AC / DoD
- [ ] Next list Done path: **no** `BoardIssuePost` shelter mount
- [ ] Lab-proven compose/CSS applied (not wrapper-only rename)
- [ ] Closed honesty for missing public labels

## Where to change
- `FeedListArea` (or successor) under `spa-app/src/features/feed/`
- Cite lab `features/feed-lab/` as proven reference — do not claim lab fixtures as product ids

## Verification
- Grep next Done path: no BoardIssuePost shelter
- Path A evidence in T04
