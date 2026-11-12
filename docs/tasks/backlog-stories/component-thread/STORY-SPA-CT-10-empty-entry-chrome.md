# STORY-SPA-CT-10 — Empty entry-only + empty icon (G-H1 · G-M1)

## Meta

- **Key:** `STORY-SPA-CT-10-empty-entry-chrome`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P3 Done · gate BLOCK · `pkg-000168` · `2026-10-19T12:04:28Z`
- **Pipeline:** [STORY-SPA-CT-10-empty-entry-chrome](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-10-empty-entry-chrome/STORY-SPA-CT-10-empty-entry-chrome.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-01
- **Blocks:** CT-15 (soft) · OP eye empty
- **UX mirror:** [OP-UX residual 10-19](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H1 · G-M1
- **Analysis:** [ux-gaps 2026-10-19](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) G-H1 · G-M1
- **Artboard:** [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) §8 · B empty
- **Code home:** `thread-mount/IssueThreadBlock.jsx` · `ThreadMount.jsx`

## Зачем

Lab empty показывает full composer (`showComposer` includes `empty`). Written M152 §8: empty = entry affordance only. Artboard B also wants a large speech-bubble empty icon.

## FR

- **FR-CT-10.1** `status=empty` + write allowed: show `Write a comment` **entry** (pill/control) · **not** full `ThreadComposer` in the empty panel.  
- **FR-CT-10.2** Activating entry opens composer chrome (per CT-11) without contradicting entry-only first paint.  
- **FR-CT-10.3** Empty panel shows large speech-bubble empty icon (artboard B tone) + existing lead/helper copy.  
- **FR-CT-10.4** Collapsed populated / expanded populated entry rules unchanged (CT-01).  
- **FR-CT-10.5** Vitest: empty ≠ full composer mount on first paint.

## Вне scope

Composer icon glyphs (CT-11) · inline reply (CT-12) · invent HTTP · `#/next/feed` · invent OP PASS

## Acceptance Criteria

- [ ] `#/lab/feed` empty stand: entry only · no full composer until activate  
- [ ] Speech empty icon Present  
- [ ] Vitest empty → entry marker · composer absent until activate  
- [ ] OP eye gate (Absent = BLOCK · no invent PASS)

## Technical subtasks

> Skill: `react-expert` · Arch [§11.1](ARCHITECTURE.md) · P1.3 APPLY `pkg-000168`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-10-t01-empty-entry-only` | Done | Split `showComposer` vs `composerEntry`: empty first paint = entry only | `ThreadMount.jsx` | 10.1 · 10.2 |
| `task-spa-ct-10-t02-empty-speech-icon` | Done | Artboard B speech-bubble empty icon + lead/helper | `IssueThreadBlock.jsx` · CSS | 10.3 |
| `task-spa-ct-10-t03-entry-activate` | Done | Entry activate opens composer (CT-11 chrome) without always-on empty | ThreadMount · IssueThreadBlock | 10.2 |
| `task-spa-ct-10-t04-vitest-empty` | Done | Assert empty ≠ full composer mount on first paint | `__tests__/threadMount*.test.jsx` | 10.5 |

### Constraints

- No invent HTTP · no invent OP PASS  
- Do not re-open always-on empty composer  
- Arch §11.1 hold  

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Empty matches M152 §8 entry-only + artboard B empty icon.
