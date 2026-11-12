# STORY-SPA-CR-03-lab-reactions-page — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-03-lab-reactions-page.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-03-lab-reactions-page.md)  
> **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · `2026-10-14T11:55:04Z` · Await residual  
> **Package:** `pkg-000139` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` · UX M154 · Partial visual=**BLOCK** · FixtureAdapter required  
> **Skill declared:** `react-expert`

## Purpose
`#/lab/reactions` + two fixture hosts + FixtureAdapter + thin LiveAdapter. See backlog FR/AC.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-03-t01-fixture-adapter](task-spa-cr-03-t01-fixture-adapter/README.md) | FixtureAdapter (lab default) | Done · ui_anchor |
| T02 | [task-spa-cr-03-t02-live-adapter-threads-social-client](task-spa-cr-03-t02-live-adapter-threads-social-client/README.md) | LiveAdapter thin wrap ThreadsSocialClient | Done |
| T03 | [task-spa-cr-03-t03-lab-reactions-route](task-spa-cr-03-t03-lab-reactions-route/README.md) | `#/lab/reactions` shell Routes | Done |
| T04 | [task-spa-cr-03-t04-two-fixture-hosts](task-spa-cr-03-t04-two-fixture-hosts/README.md) | Two hosts: thread-root + comment | Done |
| T05 | [task-spa-cr-03-t05-vitest-lab-smoke](task-spa-cr-03-t05-vitest-lab-smoke/README.md) | Vitest lab route/hosts smoke | Done |

## Out of scope
M155 people · invent HTTP · `#/next/feed` cutover · second client

## @mockup handoff
- M154: artboards under `spa-app/docs/UX/next/feed/artboards/`
- Icons: [STORY-SPA-CR-icon-assets.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md)
- API: [STORY-SPA-CR-api-requirements.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-api-requirements.md)
