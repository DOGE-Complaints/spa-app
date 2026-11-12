# STORY-SPA-NF-LAB-08 — Greenfield reactions plane (M154)

## Meta
- **Key:** `STORY-SPA-NF-LAB-08-greenfield-reactions-plane`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md) · [pipeline](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-08-greenfield-reactions-plane/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md)
- **Status:** Todo · P1.3 scaffolded (`pkg-000134` · `2026-10-13T16:01:32Z`) · gate PENDING
- **Depends on:** LAB-07 (strip exists as single React entry)
- **Code boundary:** new modules under `features/feed-lab/post/reactions/` (or `feed-lab/reactions/`) · **ban** `LabReactionChromeDeprecated` · **ban** product `ReactionChrome` + `ReactionControls.css` on Done path · **ban** emoji-soup marks
- **Related learn-only:** `semantics/reactionsV1` catalog + capacity rules (Closed) — reuse **logic**, rewrite **chrome**
- **ui_scope:** `feed-lab`

## Зачем
M154 strip/picker с чистого UI: один open из `FeedPostActionStrip.React` / Reactions; Emotional + Epistemic groups; labels first; SVG catalog or honest omit — без classic blue selected и без второго pill.

## Artboards
- [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)

## Target module catalog (name ≠ create)

| Working name | Role |
|--------------|------|
| `FeedReactionPlane` | Root lab reactions host · local in-memory selection · no HTTP PUT |
| `FeedReactionAggregate` | Confirmed marks + count only when selection Present; empty = no theatrical zero |
| `FeedReactionPicker` | Anchored panel · layers · capacity «up to N» · Escape/close |
| `FeedReactionOption` | One catalog choice · label required · icon = catalog SVG or omit (no emoji fallback) |
| `FeedReactionLayerGroup` | Emotional / Epistemic; Moderation **absent** at thread-root |

## Wire rules (from research deltas)
- Strip `React` / `Reactions` → open picker (single entry).  
- Aggregate lives **in thread region adjacency** per M152 C (slot owned with LAB-09 compose) — not a competing second React button.  
- Selected skin = DS accent (`#F5C542` family), **not** classic blue `#2f6fed`.  
- Class names must **not** reuse classic `reaction-choice` / `reaction-open-button` if those still bind global Controls CSS — prefer `feed-reaction-*` prefix.

## Функциональные требования (FR)
- **FR-LAB-08.1** Picker opens only from strip (or aggregate open control designed as M154 compact — **not** duplicate pill under strip).
- **FR-LAB-08.2** Selection local memory via reactionsV1 toggle/capacity; no gateway PUT.
- **FR-LAB-08.3** No emoji-soup; omit without inventing SVG masters.
- **FR-LAB-08.4** No `ReactionControls.css` import on greenfield path; quarantine proof via grep + computed style smoke.
- **FR-LAB-08.5** Visual Done M154: checklist + screenshot + OP; Partial = **BLOCK**.
- **FR-LAB-08.6** `#/next/feed` unchanged.

## Acceptance Criteria
- [ ] Greenfield reaction modules Present under lab post namespace
- [ ] Zero Deprecated / ReactionChrome / Controls.css on Done path
- [ ] Zero `omit-emoji-catalog` / emoji marks on lab Done
- [ ] No second React pill under strip
- [ ] Root picker has no active Moderation group
- [ ] M154 gate evidence + OP eye (Partial = BLOCK)

## Вне scope
People/M155 · comment-level reactions matrix · invent SVG · product port

## Technical subtasks
### t01 — Scaffold reaction modules + `feed-reaction-*` CSS
### t02 — Wire strip → picker; local selection seam
### t03 — Ban classic class/CSS leak proof
### t04 — M154 visual gate pack
