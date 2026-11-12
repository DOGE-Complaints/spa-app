# STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md`  
> **Status:** Blocked · P3 structure Done (`2026-10-13T19:24:46Z`) · pkg-000136 · gate BLOCK · OP eye Absent  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000136`  
> **Depends on:** LAB-07 · LAB-08 · LAB-09 (greenfield post + reactions + discussion Present)  
> **Blocks:** LAB-05 (port after this tip’s visual gates PASS)  
> **ui_scope:** `feed-lab` · visual|mixed · Path A M158 primary · re-gate M150/M154/M152/M153/M149 · Partial=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · `#/next/feed` unchanged  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Собрать M158 detail overlay на greenfield civic+discussion; переключить `#/lab/feed` полностью на новую плоскость; закрыть visual gates (checklist + screenshot + OP) — иначе LAB-05 снова портит shallow.

## Target module catalog (verbatim backlog · name ≠ create until P3)

| Working name | Role |
|--------------|------|
| `FeedIssueDetailOverlay` | Modal/sheet host · Escape/scrim/close · focus return |
| `FeedIssueDetailBody` | Same greenfield civic + discussion atoms as list (parity) |

## Artboards
- [M158](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) primary  
- Re-gate pack: M150 → M154 → M152/M153 → M158 → M149 rhythm ([VISUAL-DoD.md](../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §4)

## Hit / behavior rules (LAB-04 locks retained · verbatim backlog)
- Open from **title / summary / media / Open issue** only.  
- Action strip clicks do **not** open Issue modal (React opens picker; Comment expands thread).  
- Fixture-only data · no HTTP.

## Cutover rules (verbatim backlog)
1. `FeedLabPage` mounts **only** greenfield `FeedPostCard` list (+ overlay).  
2. Grep ban: `*Deprecated` import under lab Done page/modules.  
3. Deprecated code may remain on disk for archaeology until explicit delete tip (OOS here).  
4. `data-lab-plane="greenfield"` · `data-lab-visual-done` stays `false` until OP eye PASS.

## FR (verbatim backlog)
- **FR-LAB-10.1** Overlay open/close matrix + focus return.
- **FR-LAB-10.2** Lab route cutover to greenfield; Deprecated ban on Done path.
- **FR-LAB-10.3** Full visual gate tip order with written checklists + local-five screenshots + OP eye; Partial = **BLOCK**.
- **FR-LAB-10.4** `#/next/feed` still unchanged (port = LAB-05 after PASS).
- **FR-LAB-10.5** Document supersession: LAB-03/04 no longer lab visual SSOT.

## Acceptance Criteria (verbatim backlog)

- [x] Greenfield overlay Present · hit targets correct · strip excluded from Issue open
- [x] `#/lab/feed` uses greenfield only · Deprecated import ban held
- [x] Gate rows M150/M154/M152–M153/M158/M149: checklist + shots Present
- [ ] OP eye PASS recorded (date/who) — **Absent = BLOCK** (no invent)
- [x] LAB-05 prerequisite language updated to depend on **LAB-10** visual PASS

## Вне scope (verbatim)
LAB-05 implement · delete Deprecated files · invent API/SVG · `#/board` mutate · Playwright D as OP substitute

## Tasks

| ID | Path | Status |
|----|------|--------|
| T01 | [task-spa-nf-lab-10-t01-scaffold-overlay-compose](task-spa-nf-lab-10-t01-scaffold-overlay-compose/README.md) | Done |
| T02 | [task-spa-nf-lab-10-t02-cutover-lab-page-deprecated-ban](task-spa-nf-lab-10-t02-cutover-lab-page-deprecated-ban/README.md) | Done |
| T03 | [task-spa-nf-lab-10-t03-full-visual-gate-pack](task-spa-nf-lab-10-t03-full-visual-gate-pack/README.md) | Done · visual BLOCK |
| T04 | [task-spa-nf-lab-10-t04-crosslink-lab05-visual-ssot](task-spa-nf-lab-10-t04-crosslink-lab05-visual-ssot/README.md) | Done |

## Gate
[story-acceptance-gate-STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md](story-acceptance-gate-STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md) · **BLOCK**
