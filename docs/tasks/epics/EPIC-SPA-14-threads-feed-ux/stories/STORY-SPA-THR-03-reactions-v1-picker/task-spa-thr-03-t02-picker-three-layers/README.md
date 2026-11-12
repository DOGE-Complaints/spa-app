# SPA-THR-03-T02 — Picker three layers enabled-only

**Status:** Done  
**Story:** [`../STORY-SPA-THR-03-reactions-v1-picker.md`](../STORY-SPA-THR-03-reactions-v1-picker.md)  
**Decision Ref:** FR-THR-03.1–03.3 · 03.5–03.6 · THR-R-B/C · [backlog](../../../../../../backlog-stories/threads-feed/STORY-SPA-THR-03-reactions-v1-picker.md) · [M145](../../../../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md)  
**Depends on:** THR-01/02 host Done  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-22T21:13:34Z`  
**Completed:** `2026-09-22T21:19:16Z`  
**Package:** `pkg-000079`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.png
```

## Purpose
Picker with Emotional/Epistemic/Moderation; enabled-only from reactions.v1; moderation omitted on thread root.

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
