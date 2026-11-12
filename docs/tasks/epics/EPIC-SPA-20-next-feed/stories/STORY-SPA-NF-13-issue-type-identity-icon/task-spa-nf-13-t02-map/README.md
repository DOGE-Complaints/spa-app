# SPA-NF-13-T02 — issueTypeIconForType exact Object.freeze map

**Status:** Done  
**Story:** [`../STORY-SPA-NF-13-issue-type-identity-icon.md`](../STORY-SPA-NF-13-issue-type-identity-icon.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:28:13Z`  
**Done:** `2026-10-21T11:33:57Z`  
**Package:** `pkg-000189`  
**Path A:** [M161](../../../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md)

## Purpose

FR-NF-13.1 · 13.2 · 13.5: `issueTypeIconForType(type)` exact Object.freeze map (case-sensitive keys).

## Code Facts (verify)

- `src/i18n/issueTypeIcons.js` · **Present**
- Exact keys: `INCIDENT` · `complaint` · `system_bug` · `observation` · `absurdity`
- No lowercase alias · unknown → null

## Constraints

- Exact wire strings only · `incident` ≠ `INCIDENT` · no invent synonyms / glob / HTTP  
- Path A M161 · NO BRIEF · Partial=**BLOCK**

## AC / DoD

- [x] Exact key map only (no silent lowercase alias)
- [x] Map module explicit · no glob
- [x] Unknown → null / omit signal

## Where changed

`src/i18n/issueTypeIcons.js` · `issueTypeIcons.nf13.test.js`

## Verification

```bash
cd spa-app && npm test -- --run src/i18n/__tests__/issueTypeIcons.nf13.test.js
```
