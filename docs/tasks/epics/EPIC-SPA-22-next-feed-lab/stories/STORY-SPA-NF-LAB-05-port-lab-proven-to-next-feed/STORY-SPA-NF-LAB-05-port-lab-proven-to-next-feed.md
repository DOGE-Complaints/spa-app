# STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`  
> **Status:** Blocked · P3 stop · prerequisite LAB-03/04 visual BLOCK · OP eye Absent (`2026-10-13T13:17:15Z`) · pkg-000131  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000131`  
> **Depends on:** LAB-01…04 **and** lab visual gates PASS — **LAB-03/04 currently Blocked** (Partial visual · OP eye Absent) → port gate **may BLOCK** until OP eye  
> **ui_scope:** `next-feed` · Path A re-verify on `#/next/feed`  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/next/feed` + `#/lab/feed` + `#/board` smoke  
> **Process:** A+C+F step 3 · Partial visual = **BLOCK**  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Port lab-proven compose/CSS to product `#/next/feed`: displace `BoardIssuePost` shelter, drop classic `ReactionControls.css` from next reaction Done path, align discussion copy. Do **not** invent OP eye PASS for LAB-03/04 to unlock.

## Dependency note (scaffold fact)

| Residual | Status | Port impact |
|----------|--------|-------------|
| LAB-03 visual gates | **BLOCK** · OP eye Absent | Port prerequisite unmet |
| LAB-04 M158 visual | **BLOCK** · OP eye Absent | Port prerequisite unmet |
| P3 execute without OP | Must Result **BLOCK** or refuse start | Do not invent PASS |

## Acceptance Criteria (verbatim backlog)

- [ ] Prerequisite: LAB-03/04 visual gate evidence Present (checklists + screenshots + OP)
- [ ] `FeedListArea` (or successor) next list Done path: **no** `BoardIssuePost` shelter mount
- [ ] Next reaction Done path: **no** classic `ReactionControls.css` import
- [ ] local-five `#/next/feed` screenshots vs same written must-states (M150/M154/M152/M158 as in scope) + OP eye
- [ ] Partial visual = **BLOCK**
- [ ] `#/board` smoke not regressed; Closed contracts unchanged (no invent)
- [ ] Lab route still works as reference

### Explicit non-AC
- [ ] «Shelter still there but flagged non-Done» — **not** PASS
- [ ] Wrapper-only rename without CSS/compose port — **not** PASS

## FR (verbatim backlog)
- **FR-LAB-05.1** Start only after lab visual gates PASS (documented evidence).
- **FR-LAB-05.2** Next list Done path no longer mounts `BoardIssuePost` as card shell (shelter displaced).
- **FR-LAB-05.3** Next reaction Done path does not import classic `ReactionControls.css` as skin.
- **FR-LAB-05.4** Ported chrome matches lab-proven must-states for tip artboards (written §); Partial = **BLOCK**.
- **FR-LAB-05.5** `#/board` classic plane preserved (dual plane); no invent APIs.
- **FR-LAB-05.6** `#/lab/feed` remains available as reference SSOT after port.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-lab-05-t01-displace-shelter](task-spa-nf-lab-05-t01-displace-shelter/README.md) | Displace BoardIssuePost shelter | Blocked · prerequisite |
| T02 | [task-spa-nf-lab-05-t02-reaction-css-plane](task-spa-nf-lab-05-t02-reaction-css-plane/README.md) | Reaction CSS plane · drop Controls | Blocked · prerequisite |
| T03 | [task-spa-nf-lab-05-t03-discussion-copy-depth](task-spa-nf-lab-05-t03-discussion-copy-depth/README.md) | Discussion copy / depth | Blocked · prerequisite |
| T04 | [task-spa-nf-lab-05-t04-verify-port-gates](task-spa-nf-lab-05-t04-verify-port-gates/README.md) | Verify port + visual gates | Blocked · inventory · prerequisite |

## Out of scope
Lab route removal · M155 · schema overlay · invent icons/API · Playwright as OP substitute · reopen NF/VL bodies · invent LAB-03/04 OP PASS · Partial as Done · mutate `#/board` beyond smoke

## @mockup handoff (P2/P3 Path A)
- M150 · M154 · M152 · M153 · M158 · M149 (product `#/next/feed` context) — wire in T01–T04
- Partial visual = **BLOCK** — do not close story if incomplete or prerequisite OP Absent
