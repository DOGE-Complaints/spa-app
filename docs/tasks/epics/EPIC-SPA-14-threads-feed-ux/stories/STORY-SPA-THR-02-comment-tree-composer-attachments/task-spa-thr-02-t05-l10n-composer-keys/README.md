# SPA-THR-02-T05 — threadsFeed.composer.* dictionary keys

**Status:** Done  
**Story:** [`../STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../STORY-SPA-THR-02-comment-tree-composer-attachments.md)  
**Decision Ref:** story §L10N · M144 copy locks  
**Depends on:** SPA-THR-02-T02 (keys consumed)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T21:00:23Z
**Done:** 2026-09-22T21:05:21Z  
**Package:** `pkg-000078`

## Purpose
Merge `threadsFeed.composer.*` en/et/ru into [`threadsFeedDictionary.js`](../../../../../../../src/i18n/threadsFeedDictionary.js) (already on disk from THR-01). Wire `t('threadsFeed.composer…')` in composer/tree chrome.

## Risk
Invent keys beyond story table; overwrite `threadsFeed.post.*`.

## Code Facts (re-verify at execute)
- File exists: `src/i18n/threadsFeedDictionary.js` · imported in `dictionaries.js`
- Backlog table = SSOT keys

## AC / DoD
- [x] (P0) All story §L10N composer keys present en/et/ru
- [x] (P0) Components use dictionary keys (not hard-coded EN-only where keyed)
- [x] (P0) No invent keys beyond table

## Where to change
- `src/i18n/threadsFeedDictionary.js` · composer components

## Out of scope
Vitest (T06) · invent HTTP

## Verification
```bash
rg -n 'threadsFeed.composer' spa-app/src/i18n/threadsFeedDictionary.js spa-app/src/components/threads
```
