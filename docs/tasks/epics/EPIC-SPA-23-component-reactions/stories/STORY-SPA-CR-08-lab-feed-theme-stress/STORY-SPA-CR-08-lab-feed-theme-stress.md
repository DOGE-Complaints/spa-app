# STORY-SPA-CR-08-lab-feed-theme-stress — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md)  
> **Status:** P3 structure Done · P6 F2 CLOSED · gate **BLOCK** (OP eye Absent) · `2026-10-15T19:39:31Z`  


> **Package:** `pkg-000144` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · **mixed** · UX M160 + OP-UX-MIRROR composition §3.1 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`

## Purpose
Theme + stress controls on `#/lab/feed` so picker/strip follow light/dark (and prefer locale × 320 × 200%) without opening `#/lab/reactions`. See backlog FR/AC · mirror §3.1.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-08-t01-feed-lab-stress-controls](task-spa-cr-08-t01-feed-lab-stress-controls/README.md) | M160 stress on FeedLabPage · light/dark (+ locale/320/200%) | **Done** · ui_anchor |
| T02 | [task-spa-cr-08-t02-locale-t-through-mount](task-spa-cr-08-t02-locale-t-through-mount/README.md) | Locale `t` into FeedLabReactionsMount | **Done** |
| T03 | [task-spa-cr-08-t03-feed-lab-token-surfaces](task-spa-cr-08-t03-feed-lab-token-surfaces/README.md) | Feed-lab CSS → `--color-*` tokens | **Done** |
| T04 | [task-spa-cr-08-t04-vitest-feed-lab-stress](task-spa-cr-08-t04-vitest-feed-lab-stress/README.md) | Vitest theme/stress + Path A shots + gate | **Done** |
| T05 | [task-spa-cr-08-t05-audit-f2-story-root-screenshots-readme](task-spa-cr-08-t05-audit-f2-story-root-screenshots-readme/README.md) | Audit F2 story-root screenshots README indexer | **Done** · P6 |

## Out of scope
CR-09 strip A+C+B · CR-10 portal · `#/next/feed` · M155 · invent HTTP · persist lab theme (`persist: false` only)

## @mockup handoff
- M160: `spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR-lab-feed-composition §3.1](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md)
- Verify URL: `http://127.0.0.1:5173/#/lab/feed`

## UI Screenshots table

| # | Path | md5 prefix | Claim |
|---|------|------------|-------|
| 01 | [`screenshots/full-cycle/01-lab-feed-cr08-stress-controls-1536x1024.png`](screenshots/full-cycle/01-lab-feed-cr08-stress-controls-1536x1024.png) | `ad015abf8b67` | Stress host Present |
| 02 | [`screenshots/full-cycle/02-lab-feed-cr08-theme-light-picker-1536x1024.png`](screenshots/full-cycle/02-lab-feed-cr08-theme-light-picker-1536x1024.png) | `4a7c0c2e3781` | Light picker |
| 03 | [`screenshots/full-cycle/03-lab-feed-cr08-theme-dark-picker-1536x1024.png`](screenshots/full-cycle/03-lab-feed-cr08-theme-dark-picker-1536x1024.png) | `0bc91cb67108` | Dark picker/card |
| 04 | [`screenshots/full-cycle/04-lab-feed-cr08-locale-et-320-1536x1024.png`](screenshots/full-cycle/04-lab-feed-cr08-locale-et-320-1536x1024.png) | `bb5130b459a5` | ET × 320 |
| 05 | [`screenshots/full-cycle/05-lab-feed-cr08-text-200-1536x1024.png`](screenshots/full-cycle/05-lab-feed-cr08-text-200-1536x1024.png) | `f35877f84316` | 200% zoom |

Gate: [`story-acceptance-gate-STORY-SPA-CR-08-lab-feed-theme-stress.md`](story-acceptance-gate-STORY-SPA-CR-08-lab-feed-theme-stress.md) · Result **BLOCK**
