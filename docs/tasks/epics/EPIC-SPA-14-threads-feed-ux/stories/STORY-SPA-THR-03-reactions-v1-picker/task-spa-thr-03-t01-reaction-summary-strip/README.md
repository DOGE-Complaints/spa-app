# SPA-THR-03-T01 — Compact reaction summary strip

**Status:** Done  
**Story:** [`../STORY-SPA-THR-03-reactions-v1-picker.md`](../STORY-SPA-THR-03-reactions-v1-picker.md)  
**Decision Ref:** FR-THR-03.4 · THR-R-A · [backlog](../../../../../../backlog-stories/threads-feed/STORY-SPA-THR-03-reactions-v1-picker.md) · [M145](../../../../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md)  
**Depends on:** THR-01/02 host Done  
**ui_scope:** `visual` · **ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-22T21:13:34Z`  
**Completed:** `2026-09-22T21:19:16Z`  
**Package:** `pkg-000079`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.png
```

## Purpose
Compact aggregate strip (top marks + count) subordinate to comment; open picker affordance. No full catalog inline.

## Risk
Invent reaction ids; invent HTTP; Facebook packs; start THR-04.

## Code Facts (re-verify at execute)
- Host: `IssueThreadBlock` / `CommentTree` reaction slots
- Catalog: reactions.v1 ids only (M145 §2)
- React write: **Open**

## AC / DoD
- [x] (P0) Purpose delivered vs M145 / FR cited
- [x] (P0) No invent reaction ids outside reactions.v1
- [x] (P0) No invent social HTTP

## Where to change
- `src/components/threads/` · `src/i18n/threadsFeedDictionary.js` · tests as applicable

## Out of scope
THR-04…06 · invent HTTP · invent ids · voice-weight

## Verification
```bash
rg -n 'reactions.v1|ReactionStrip|ReactionPicker|agree|disagree' spa-app/src/components/threads spa-app/src/i18n || true
```
