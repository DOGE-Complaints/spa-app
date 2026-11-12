# STORY-SPA-CR-01-reactions-mount-strip — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-01-reactions-mount-strip.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-01-reactions-mount-strip.md)  
> **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · `2026-10-14T11:10:36Z` · Await P8  
> **Package:** component-reactions · REQ-24 · active `pkg-000137`  
> **ui_scope:** `reactions-mount` · visual|mixed · Path A M154 · Partial=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends on:** CR-icon · CR-api Done · **Blocks:** CR-02 · CR-03  
> **Code home:** `src/features/reactions-mount/` · lab `#/lab/reactions`

## Purpose
ReactionSummaryStrip + mount props; PostActionStrip slot; root vs comment. See backlog FR/AC.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-01-t01-package-strip-states](task-spa-cr-01-t01-package-strip-states/README.md) | Scaffold `features/reactions-mount/` + strip states | Done · ui_anchor |
| T02 | [task-spa-cr-01-t02-mount-props-seam](task-spa-cr-01-t02-mount-props-seam/README.md) | Mount props seam (`target`/`density`/`onReact`) | Done |
| T03 | [task-spa-cr-01-t03-postactionstrip-slot-root-comment](task-spa-cr-01-t03-postactionstrip-slot-root-comment/README.md) | PostActionStrip slot + root vs comment config | Done |
| T04 | [task-spa-cr-01-t04-wire-cr-icons](task-spa-cr-01-t04-wire-cr-icons/README.md) | Wire CR-icon Runtime URLs (13 + chrome) | Done |
| T05 | [task-spa-cr-01-t05-l10n-vitest-strip-smoke](task-spa-cr-01-t05-l10n-vitest-strip-smoke/README.md) | L10N reuse + vitest strip smoke | Done |

## Out of scope
M155 people · invent HTTP · `#/next/feed` cutover · classic ReactionControls mandate

## Gate
[story-acceptance-gate-STORY-SPA-CR-01-reactions-mount-strip.md](story-acceptance-gate-STORY-SPA-CR-01-reactions-mount-strip.md) · **BLOCK** (OP eye Absent · Partial visual)

## @mockup handoff
- M154: artboards under `spa-app/docs/UX/next/feed/artboards/`
- Icons: [STORY-SPA-CR-icon-assets.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md)
- API: [STORY-SPA-CR-api-requirements.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-api-requirements.md)

