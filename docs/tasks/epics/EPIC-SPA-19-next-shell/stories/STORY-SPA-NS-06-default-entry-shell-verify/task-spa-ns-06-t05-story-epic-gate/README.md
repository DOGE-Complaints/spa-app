# SPA-NS-06-T05 — Story/epic gate checklist NS-01…06 shell scope

**Status:** ✅ Done · P3 gate PASS (`2026-10-09T17:50:50Z`)  
**Story:** [`../STORY-SPA-NS-06-default-entry-shell-verify.md`](../STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Depends on:** T01–T04 Done  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T17:35:01Z`  
**Package:** `pkg-000102`  
**acceptance:** [`acceptance-verification-spa-ns-06.md`](./acceptance-verification-spa-ns-06.md) _(create at P3)_  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row _(verify)_  
**@template:** [`docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)

## Purpose
Story/epic gate checklist for NS-01…06 shell scope — final acceptance-verification for this story.

## AC / DoD (trace backlog AC)
- [x] (P0) `/` and `*` land on `#/next/feed`
- [x] (P0) spa-url-page-map updated for next shell
- [x] (P0) Vitest + browser-smoke pass for shell scope
- [x] (P0) Shell icon runtime URLs 404-free; logo reuse verified
- [x] (P0) Feed body E2E not required / not claimed
- [x] (P0) Gate file PASS · §UI if ui_gate applies

## Where to change
- This task: write `acceptance-verification-spa-ns-06.md` at P3 Done

## Out of scope
Retire classic permanently · full feed product verify · invent CI

## Verification
```bash
test -f spa-app/docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-06-default-entry-shell-verify/task-spa-ns-06-t05-story-epic-gate/acceptance-verification-spa-ns-06.md
```
