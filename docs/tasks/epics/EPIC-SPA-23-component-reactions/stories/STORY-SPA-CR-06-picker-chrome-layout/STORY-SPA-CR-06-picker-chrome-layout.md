# STORY-SPA-CR-06-picker-chrome-layout — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md)  
> **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · P8 Done · `2026-10-15T10:58:18Z` · tip residual CR-07  
> **Package:** `pkg-000142` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` · UX M154 B/C + OP-UX-MIRROR §3.3 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert` (T04 `test-master`)

## Purpose
Picker chrome polish: icon-only close (CR-05), root moderation hint as footer after layers, desktop popover hug-width. See backlog FR/AC · mirror §3.3.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-06-t01-icon-only-close-chrome](task-spa-cr-06-t01-icon-only-close-chrome/README.md) | Icon-only dismiss; no «Close» label | Done · ui_anchor |
| T02 | [task-spa-cr-06-t02-root-hint-footer](task-spa-cr-06-t02-root-hint-footer/README.md) | Root hint after layer groups | Done |
| T03 | [task-spa-cr-06-t03-hug-width-popover](task-spa-cr-06-t03-hug-width-popover/README.md) | Popover hug-width; sheet full-bleed OK | Done |
| T04 | [task-spa-cr-06-t04-vitest-chrome-layout](task-spa-cr-06-t04-vitest-chrome-layout/README.md) | Vitest hint order + close chrome | Done |

## Out of scope
CR-05 open/dismiss rules · CR-07 lab-feed cutover · invent L10N · M155 · invent HTTP · `#/next/feed`

## @mockup handoff
- M154 B/C: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR §3.3](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md)
- Icons: CR-icon `close` · `/icons/next-shell/actions/close.svg`
