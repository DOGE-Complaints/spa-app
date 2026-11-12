# SPA-THR-01-T05 — Bootstrap threadsFeedDictionary + threadsFeed.post.*

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** backlog §L10N · M143/M148 EN canon  
**Depends on:** — (may parallel visual after keys named)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T20:38:39Z
**Done:** 2026-09-22T20:46:40Z  
**Package:** `pkg-000077`

## Purpose
Create `src/i18n/threadsFeedDictionary.js` and wire `threadsFeed.post.*` keys from backlog tables (en/et/ru). Reuse `publicHome.board.openIssue` — do not duplicate.

## Risk
Inventing keys beyond story tables; showing `ic-*` filenames to residents.

## Code Facts (re-verify at execute)
- File **absent** until this task
- Tables SSOT: pipeline/backlog §L10N
- Merge pattern: follow existing schemaRuntime / publicHome dictionary glue

## AC / DoD
- [x] (P0) `threadsFeedDictionary.js` created with `threadsFeed.post.*` en/et/ru
- [x] (P0) Keys match backlog table exactly (no invent)
- [x] (P0) Open issue continues to use existing PH key

## Where to change
- `spa-app/src/i18n/threadsFeedDictionary.js` · dictionaries merge entrypoint

## Out of scope
Product layout (T01–T04) · invent HTTP · Facebook copy

## Verification
```bash
rg -n 'threadsFeed\.post' spa-app/src/i18n || true
test -f spa-app/src/i18n/threadsFeedDictionary.js
```
