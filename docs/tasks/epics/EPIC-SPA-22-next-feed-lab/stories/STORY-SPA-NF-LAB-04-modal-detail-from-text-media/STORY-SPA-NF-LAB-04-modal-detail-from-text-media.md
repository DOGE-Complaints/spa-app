# STORY-SPA-NF-LAB-04-modal-detail-from-text-media — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`  
> **Status:** Blocked · P3 structure Done · Partial visual BLOCK · OP eye Absent (`2026-10-13T13:06:08Z`) · pkg-000130  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000130`  
> **Depends on:** LAB-03 structure Present (visual residual Blocked · OP eye Absent — not invent PASS)  
> **ui_scope:** `feed-lab` · UX ready M158 · Path A  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · fixtures from LAB-02 · cards from LAB-03  
> **Process:** A+C+F · Partial visual = **BLOCK**  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Open lab modal/sheet from title/summary/media hit targets only; compose overlay from DS atoms via `OverlayHost` + `IssuePresentationLayout`; restyle to M158 written § (C); pass M158 visual gate (F). No HTTP / invent / product route mutate.

## Acceptance Criteria (verbatim backlog)

### Behavior
- [x] Text/media of 5 cards opens modal; action strip excluded from open hit
- [x] Close / Escape / scrim works; focus return
- [x] Fixture-only data in modal; no gateway/threads HTTP

### Anti-mixing / anti-shallow
- [x] No `BoardIssuePost` / `FeedCivicPost` / `FeedDiscussionBlock` as modal body Done chrome
- [x] No classic `ReactionControls.css` on overlay reaction path as Done
- [x] Identity in overlay shows fixture demo id (not UUID-first)
- [x] Discussion copy ≠ classic DISCUSSION as Done

### Visual gate (Partial = BLOCK)
- [ ] **M158** must-state checklist from written § + local-five screenshot(s) + OP eye PASS — checklist+shot Present · **OP Absent → BLOCK**
- [ ] Overlay reads as M158 sheet/modal — not classic board issue chrome — **BLOCK** (OP)
- [x] Evidence named per VISUAL-DoD §5 (`screenshots/full-cycle/`)

### Explicit non-AC
- [ ] Structure-only mount without M158 checklist — **not** PASS
- [ ] «Partial visual OK» — **BLOCK**

## FR (verbatim backlog)
- **FR-LAB-04.1** Click on card **title**, **summary**, or **media stub** opens modal/sheet with that fixture’s civic + discussion atoms.
- **FR-LAB-04.2** Click on post **action strip** does **not** open modal (reactions/comment/share stay local behaviors).
- **FR-LAB-04.3** Overlay uses existing `OverlayHost` + `IssuePresentationLayout` (narrow → sheet, wide → modal per existing patterns).
- **FR-LAB-04.4** Escape / close / scrim dismisses; focus return to opener.
- **FR-LAB-04.5** Still **no** HTTP — same fixture object as list card.
- **FR-LAB-04.6** Overlay Done path obeys VISUAL-DoD §3 bans (no shelter hosts / classic Controls CSS as Done skin).
- **FR-LAB-04.7** Visual Done for **M158**: written must-state checklist + screenshot + OP; Partial = **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-lab-04-t01-hit-targets](task-spa-nf-lab-04-t01-hit-targets/README.md) | Hit targets (title/summary/media) | Done · ui_anchor |
| T02 | [task-spa-nf-lab-04-t02-overlay-compose](task-spa-nf-lab-04-t02-overlay-compose/README.md) | Overlay compose · M158 | Done · ui_anchor |
| T03 | [task-spa-nf-lab-04-t03-verify-visual-gate](task-spa-nf-lab-04-t03-verify-visual-gate/README.md) | Verify + M158 visual gate | Done · evidence · OP Pending |

## Out of scope
Route-mode full page · invent routes · invent icons · M155 · product `FeedIssueMount` mandatory · product port (LAB-05) · Playwright pixeldiff · Partial as Done · mutate `#/next/feed` / `#/board` · invent LAB-03 OP eye PASS

## @mockup handoff (P2/P3 Path A)
- M158 (md/png Present) — wire in T02–T03; T01 cites M150 hit model
- Partial visual = **BLOCK** — do not close story if incomplete
