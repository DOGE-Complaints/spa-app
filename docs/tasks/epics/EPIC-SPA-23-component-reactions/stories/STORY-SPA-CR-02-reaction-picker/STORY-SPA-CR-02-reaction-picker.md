# STORY-SPA-CR-02-reaction-picker — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-02-reaction-picker.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-02-reaction-picker.md)  
> **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · `2026-10-14T11:31:57Z` · Await residual  
> **Package:** `pkg-000138` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` · UX M154 panels B–E · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`

## Purpose
Desktop popover + mobile sheet; capacity 3; XOR; React always opens; save-error restore. See backlog FR/AC.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-02-t01-desktop-popover](task-spa-cr-02-t01-desktop-popover/README.md) | Desktop picker popover | Done · ui_anchor |
| T02 | [task-spa-cr-02-t02-mobile-sheet](task-spa-cr-02-t02-mobile-sheet/README.md) | Mobile picker sheet | Done |
| T03 | [task-spa-cr-02-t03-capacity-xor-react-opens](task-spa-cr-02-t03-capacity-xor-react-opens/README.md) | Capacity ≤3 + XOR + React always opens | Done |
| T04 | [task-spa-cr-02-t04-save-error-restore](task-spa-cr-02-t04-save-error-restore/README.md) | Save-error restore previous selection | Done |
| T05 | [task-spa-cr-02-t05-l10n-vitest-picker](task-spa-cr-02-t05-l10n-vitest-picker/README.md) | L10N + vitest picker | Done |

## Out of scope
M155 people · invent HTTP · hopeful/amused selectable · next-feed cutover

## @mockup handoff
- M154: artboards under `spa-app/docs/UX/next/feed/artboards/`
- Icons: [STORY-SPA-CR-icon-assets.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md)
- API: [STORY-SPA-CR-api-requirements.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-api-requirements.md)
