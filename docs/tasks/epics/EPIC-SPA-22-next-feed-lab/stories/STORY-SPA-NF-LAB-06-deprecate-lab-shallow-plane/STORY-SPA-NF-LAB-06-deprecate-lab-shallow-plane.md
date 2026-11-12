# STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`  
> **Status:** Done · P3 (`2026-10-13T15:09:44Z`) · pkg-000132 · gate PASS · NOT visual PASS  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000132`  
> **Depends on:** LAB-01…02 Done (route + fixtures Present)  
> **Blocks:** LAB-07…10 cutover  
> **ui_scope:** `feed-lab` · **NOT** visual package PASS · NO UX appendix  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · smoke `#/next/feed` · `#/board`  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Rename / move **lab-owned** shallow compose modules to `*Deprecated` (or `features/feed-lab/deprecated/`) so greenfield LAB-07…10 does not paint over the old plane. **Not** visual Done · **not** greenfield create.

## Risk lock (verbatim backlog)

| Risk | Rule in this story |
|------|-------------------|
| Rename VL atoms → break `#/next/feed` / board | **Forbidden.** Shared `IssueIdentityHeader`, `ReactionChrome`, `ReactionPicker`, `CommentTree`, `DiscussionSummaryChrome`, etc. stay at current paths for product |
| Two live Done mounts of same card | After cutover tip, `#/lab/feed` mounts **only** greenfield (LAB-10). Deprecated = import-ban on lab Done |
| Spaghetti dual CSS | Deprecated modules keep their CSS; greenfield **new** CSS modules — no sharing classic `ReactionControls.css` |
| name ≠ create | Target deprecate paths named here; materialize only in implement wave |

## Scope of rename (lab-owned only) (verbatim)

| Current | Deprecated name (target) |
|---------|--------------------------|
| `FeedLabIssueCard` | `FeedLabIssueCardDeprecated` |
| `LabReactionChrome` | `LabReactionChromeDeprecated` |
| `FeedLabDiscussion` | `FeedLabDiscussionDeprecated` |
| `FeedLabDetailOverlay` | `FeedLabDetailOverlayDeprecated` |
| paired `.css` | same `*Deprecated.css` or `deprecated/` folder |

**Related (document, do not rename in this tip):** shared VL Present-shallow modules — mark in story evidence as **Borrow-forbidden for lab Done** after LAB-07+ (may stay mounted on `#/next/feed` until LAB-05).

## Acceptance Criteria (verbatim backlog)

- [ ] Lab-owned modules listed above exist only under Deprecated names/paths
- [ ] Grep: no shared `features/feed/**` file renamed solely for this tip
- [ ] `#/next/feed` / `#/board` smoke unchanged
- [ ] Deprecated exports documented in package INDEX
- [ ] **Not** visual Done · **not** greenfield create (LAB-07+)

## FR (verbatim backlog)

- **FR-LAB-06.1** Lab-owned card/reactions/discussion/overlay modules renamed to `*Deprecated` (or moved under `deprecated/`) with exports updated.
- **FR-LAB-06.2** `#/next/feed` and `#/board` **unchanged** (no shared VL rename).
- **FR-LAB-06.3** Until LAB-10 cutover, `#/lab/feed` may still mount Deprecated (honest `data-lab-plane="deprecated"`); after LAB-10, Deprecated **ban** on lab Done import path.
- **FR-LAB-06.4** Index/barrel (`feed-lab/index.js`) exports Deprecated names explicitly; no silent alias as Done.
- **FR-LAB-06.5** Vitest: rename smoke · product routes not broken by this tip.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-lab-06-t01-inventory](task-spa-nf-lab-06-t01-inventory/README.md) | Inventory lab mounts · Borrow-forbidden list | Todo |
| T02 | [task-spa-nf-lab-06-t02-rename-lab-owned](task-spa-nf-lab-06-t02-rename-lab-owned/README.md) | Rename lab-owned → `*Deprecated` | Todo |
| T03 | [task-spa-nf-lab-06-t03-verify-smoke](task-spa-nf-lab-06-t03-verify-smoke/README.md) | Verify smoke · no shared rename | Todo |
| T04 | [task-spa-nf-lab-06-t04-acceptance-verification](task-spa-nf-lab-06-t04-acceptance-verification/README.md) | Story acceptance-verification | Todo |

## Out of scope (verbatim)
Greenfield components · invent SVG/API · LAB-05 port · reopen NF/VL story bodies · rename product hosts
