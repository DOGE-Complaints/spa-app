# STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`  
> **Status:** Blocked · P3 structure Done · Partial visual BLOCK · OP eye Absent (`2026-10-13T12:42:25Z`) · pkg-000129  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000129`  
> **Depends on:** LAB-02 Done  
> **ui_scope:** `feed-lab` · UX ready M150 → M154 → M152/M153 → M149 · Path A  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · fixtures from LAB-02  
> **Process:** A+C+F · Partial visual = **BLOCK**  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Compose five lab cards from DS atoms (not product hosts), restyle with lab CSS (C), and pass written artboard visual gates (F) for M150 → M154 → M152/M153 → M149 list rhythm. No HTTP / invent / product route mutate.

## Acceptance Criteria (verbatim backlog)

### Structure / anti-mixing
- [x] 5 atom-composed cards visible on `#/lab/feed`
- [x] No `BoardIssuePost` / `FeedCivicPost` / `FeedDiscussionBlock` imports on lab Done path
- [x] No classic `ReactionControls.css` (or board `*Controls.css`) on lab Done reaction path
- [x] No threads/gateway HTTP
- [x] Visible identity = fixture `DOGEstonia-UusVeerenni-00N` (not UUID-first)
- [x] Discussion header copy ≠ classic «DISCUSSION» i18n as Done

### Visual gates (Partial = BLOCK)
- [ ] **M150** must-state checklist extracted from written § + PASS vs lab screenshot + OP — checklist+shot Present · **OP Absent → BLOCK**
- [ ] **M154** must-state checklist + PASS (strip/picker look next, not classic Controls) — **BLOCK**
- [ ] **M152/M153** summary/tree must-states + PASS — **BLOCK**
- [ ] **M149** list rhythm (5-card spacing) must-states + PASS — **BLOCK**
- [x] Evidence paths named in gate notes (`screenshots/full-cycle/`)

### Explicit non-AC
- [ ] ~~Partial visual OK to document~~ — **removed**; BLOCK if incomplete
- [ ] Export-exists / “mounted” alone — **not** PASS

## FR (verbatim backlog)
- **FR-LAB-03.1** Lab list renders 5 cards via atom composition + LAB-02 fixtures.
- **FR-LAB-03.2** Each card shows identity (demo id), text, media stub, post action strip, reactions atoms, collapsed discussion summary (expandable).
- **FR-LAB-03.3** Reactions selection is **local in-memory** only — no PUT/HTTP.
- **FR-LAB-03.4** Ban-list classic/product hosts **and** classic Controls CSS on lab Done path.
- **FR-LAB-03.5** `#/next/feed` unchanged (port = LAB-05 only after gates).
- **FR-LAB-03.6** Visual Done for tip artboards: restyle lab CSS to written must-states (C); Partial visual = **BLOCK**.
- **FR-LAB-03.7** Evidence: written checklist bullets + local-five screenshots + OP eye.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-lab-03-t01-lab-card-composer](task-spa-nf-lab-03-t01-lab-card-composer/README.md) | Lab card composer (DS atoms) | Done · ui_anchor |
| T02 | [task-spa-nf-lab-03-t02-reactions-local-seam](task-spa-nf-lab-03-t02-reactions-local-seam/README.md) | Reactions local seam · M154 | Done · ui_anchor |
| T03 | [task-spa-nf-lab-03-t03-discussion-atoms](task-spa-nf-lab-03-t03-discussion-atoms/README.md) | Discussion atoms · M152/M153 | Done · ui_anchor |
| T04 | [task-spa-nf-lab-03-t04-visual-gate-pack](task-spa-nf-lab-03-t04-visual-gate-pack/README.md) | Visual gate pack A+F | Done · evidence · OP Pending |

## Out of scope
Modal (LAB-04) · invent icons · M155 · shell · product port (LAB-05) · Playwright pixeldiff · Partial as Done · mutate `#/next/feed` / `#/board`

## @mockup handoff (P2/P3 Path A)
- M150 · M154 · M152 · M153 · M149 (md/png Present) — wire in T01–T04 READMEs
- Partial visual = **BLOCK** — do not close story if incomplete
