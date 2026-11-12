# STORY-SPA-NF-LAB-07-greenfield-post-card-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md`  
> **Status:** Blocked · P3 structure Done (`2026-10-13T15:48:00Z`) · pkg-000133 · gate BLOCK · OP eye Absent  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000133`  
> **Depends on:** LAB-06 Done (Deprecated plane named)  
> **Blocks:** LAB-08…10  
> **ui_scope:** `feed-lab` · visual|mixed · Path A M150 (+M149 rhythm) · Partial=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · `#/next/feed` unchanged  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Greenfield civic post card under `features/feed-lab/post/` per written M150 — clean CSS, four-zone strip, no Deprecated / Controls / product hosts on Done path.

## Target module catalog (verbatim backlog · name ≠ create until P3)

| Working name | Role |
|--------------|------|
| `FeedPostCard` | Continuous warm card shell (`#FFFDF8` light / theme tokens) |
| `FeedPostIdentity` | Demo publicId + status/type + geo (fixture ids; IssueTypeIcon omit OK) |
| `FeedPostTitle` / `FeedPostSummary` | Hit targets for detail (LAB-10) |
| `FeedPostOpenIssue` | Explicit open affordance |
| `FeedPostMedia` | `/assets/dogefeed.png` · 16:9 · radius ~10px · no carousel |
| `FeedPostActionStrip` | Exactly React \| Comment \| Share \| Reactions · ~56px · one entry to reactions (LAB-08) · Comment → discussion (LAB-09) |

## Artboards
- M150 primary · M149 list rhythm only

## FR (verbatim backlog)
- **FR-LAB-07.1** … **FR-LAB-07.6** — see backlog SSOT

## Acceptance Criteria (verbatim backlog)

- [ ] Target modules named + implemented under `feed-lab/post/`
- [ ] No `*Deprecated` import on greenfield Done path
- [ ] No `ReactionControls.css` / product hosts
- [ ] Strip = 4 zones · no second React pill
- [ ] Fixture ids visible · media 16:9
- [ ] M150 checklist + local-five shots + OP eye (Partial = BLOCK)

## Вне scope (verbatim)
Reactions picker UI (LAB-08) · discussion tree (LAB-09) · modal (LAB-10) · invent icons · schema overlay · port

## Tasks

| ID | Path | Status |
|----|------|--------|
| T01 | [task-spa-nf-lab-07-t01-scaffold-post-home](task-spa-nf-lab-07-t01-scaffold-post-home/README.md) | Done |
| T02 | [task-spa-nf-lab-07-t02-compose-card-strip-media](task-spa-nf-lab-07-t02-compose-card-strip-media/README.md) | Done |
| T03 | [task-spa-nf-lab-07-t03-lab-preview-mount](task-spa-nf-lab-07-t03-lab-preview-mount/README.md) | Done |
| T04 | [task-spa-nf-lab-07-t04-m150-visual-gate](task-spa-nf-lab-07-t04-m150-visual-gate/README.md) | Done · visual BLOCK |

## Gate
[story-acceptance-gate-STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md](story-acceptance-gate-STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md) · **BLOCK**
