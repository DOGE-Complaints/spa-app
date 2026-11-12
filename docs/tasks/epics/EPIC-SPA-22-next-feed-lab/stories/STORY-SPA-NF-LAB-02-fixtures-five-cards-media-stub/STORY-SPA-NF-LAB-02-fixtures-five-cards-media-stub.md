# STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md`  
> **Status:** Done · P3 (`2026-10-13T12:17:59Z`) · pkg-000128 · gate PASS (data foundation · **not** full visual Done)  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000128`  
> **Depends on:** LAB-01 Done  
> **ui_scope:** `feed-lab` · UX ready M149 + M150 (data-side) · **not** full visual Done (visual PASS → LAB-03)  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · static fixtures only  
> **Process:** A+C+F · anti-UUID · no HTTP  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Deliver exactly five local fixture issues + shared media stub contract for lab canvas data honesty (M149 rhythm / M150 media data-side) without gateway/threads HTTP and without inventing Closed product label API.

## Acceptance Criteria (verbatim backlog)
- [x] 5 fixtures documented + module shape named for implement
- [x] Visible ids are `DOGEstonia-UusVeerenni-001`…`005` (not UUID strings)
- [x] Media path + 1600×900 target documented; Absent → honest state (no second asset invent)
- [x] No HTTP in fixture loader
- [x] **Not full visual Done** — data foundation; M150 media/M149 rhythm visual PASS waits LAB-03 gates

## FR (verbatim backlog)
- **FR-LAB-02.1** Lab loads exactly **5** fixture issues from a local module (no fetch).
- **FR-LAB-02.2** Each fixture exposes demo public id `DOGEstonia-UusVeerenni-00N` as the **visible** identity label for later cards (not UUID-first).
- **FR-LAB-02.3** All five share the same media stub path.
- **FR-LAB-02.4** Fixture comments present for thread compose in LAB-03/04.
- **FR-LAB-02.5** Fixture fields marked fixture-only; no claim of Closed API shape beyond existing product contracts.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-lab-02-t01-fixture-module](task-spa-nf-lab-02-t01-fixture-module/README.md) | Fixture module (5 issues + comments) | Done |
| T02 | [task-spa-nf-lab-02-t02-media-contract](task-spa-nf-lab-02-t02-media-contract/README.md) | Media path / alt / Absent honesty | Done · ui_anchor |

## Out of scope
Atom visual compose (LAB-03) · modal (LAB-04) · real media API · invent Closed `publicLabel` · full visual package PASS · mutate `#/next/feed` / `#/board`

## @mockup handoff (P2/P3 Path A — data-side)
- M149 artboard (md/png Present) — list rhythm data
- M150 artboard (md/png Present) — `ISSUE-CARD-MEDIA` · 16:9
- Visual PASS deferred to LAB-03 gates
