# CT-32 — Thread dark chrome · theme tokens + mask glyphs (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T20:33:48Z (P5 APPLY) · P8 local close  
> **Package:** `pkg-000200` · EPIC-SPA-24  
> **Code home:** `tokens.css` · `CommentNode` / `CommentTree` / `ThreadComposer` · `IssueTypeIcon` · `FeedIssueMount` Close · soft `FeedCivicPost`  
> **Normative:** [ARCHITECTURE §18](../../tasks/backlog-stories/component-thread/ARCHITECTURE.md) · Interview **D5 · D6** · Path A **code lock** · soft NS-07 mask  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Bubbles / quote / composer | `--tm-bubble-fill` under dark+light · not fixed cream Done for dark |
| Show more | `--color-text-link` high contrast on dark |
| Issue type + Close | `ShellChromeIcon` mask/currentColor · `data-ct32-type` / `data-ct32-close` |
| Soft feed civic | comment/share via `ShellChromeIcon` (NS-07 pattern) |
| Light | cream bubble tokens held |

## Touchpoints

- `src/styles/tokens.css` · `thread-mount/tree/CommentNode.css` · `CommentTree.css` · `composer/ThreadComposer.css`
- `feed/identity/IssueTypeIcon.jsx` · `FeedIssueMount.jsx` · `presentation/PresentationChrome.css` · `FeedCivicPost.jsx`
- Tests: `threadMount.ct32` · ct18/23/26 token cascade · `feed.nf13` · Path A `scripts/tmp-ct32-capture.mjs`

## OOS

Shell header/rail (**NS-07**) · map · NF-18 strip pad · CT-31 attach · invent OP PASS · invent CDN

## Evidence

- Path A shots 01–05 Present · CAPTURE-META `fails: []` · `visual_gate: BLOCK` · `op_eye: Absent`
- vitest thread-mount+feed **395/395** · threadMount.ct32 **5/5**
- P5: F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none`
