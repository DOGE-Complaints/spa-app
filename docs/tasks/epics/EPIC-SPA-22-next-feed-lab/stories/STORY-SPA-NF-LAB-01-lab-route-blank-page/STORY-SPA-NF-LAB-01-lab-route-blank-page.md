# STORY-SPA-NF-LAB-01-lab-route-blank-page — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md`  
> **Status:** Done · P3 (`2026-10-13T11:17:12Z`) · pkg-000127 · gate PASS (foundation · **not** visual package PASS)  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000127`  
> **ui_scope:** `feed-lab` · UX appendix **skip** (Artboards N/A) · foundation only · **not** visual package PASS  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · open `#/lab/feed`  
> **Process:** A+C+F · clean room only  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Register `#/lab/feed` inside shell and render a blank dedicated lab canvas (`FeedLabPage`) with zero gateway/threads HTTP and ban-list imports; leave product routes unchanged.

## Acceptance Criteria (verbatim backlog)
- [x] `#/lab/feed` opens blank lab canvas under shell
- [x] No network calls to issues/threads from lab page mount
- [x] Product routes not regressed
- [x] Lab entry module import ban: no `BoardIssuePost`, `FeedCivicPost`, `FeedDiscussionBlock`, `ReactionControls.css`
- [x] **Not claimable as visual Done** — blank foundation only (Partial visual N/A; do not mark package visual PASS)

## FR (verbatim backlog)
- **FR-LAB-01.1** Hash route `#/lab/feed` registered in `App.jsx` **inside** shell layout (interview Q1 B · Q7 A).
- **FR-LAB-01.2** Page renders a dedicated lab canvas (e.g. `FeedLabPage`) with minimal chrome — **not** `FeedToolbar` / `FeedListArea` / `NextFeedHostPage` product host.
- **FR-LAB-01.3** Page performs **zero** gateway/threads HTTP on mount.
- **FR-LAB-01.4** `#/next/feed` and `#/board` unchanged (no port, no shelter touch — LAB-05 later).
- **FR-LAB-01.5** Lab page module does **not** import ban-list hosts/CSS ([VISUAL-DoD.md](../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §3).

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-lab-01-t01-lab-route](task-spa-nf-lab-01-t01-lab-route/README.md) | Route `#/lab/feed` under shell | Done |
| T02 | [task-spa-nf-lab-01-t02-blank-page-module](task-spa-nf-lab-01-t02-blank-page-module/README.md) | Blank `FeedLabPage` module | Done · ui_anchor |

## Out of scope
Shell redesign · product feed mutate · fixtures (LAB-02) · atom cards (LAB-03) · visual artboard PASS · port (LAB-05)

## UX handoff
Artboards N/A — skip UX ready / mockup brief. Visual mood gates start at LAB-03.
