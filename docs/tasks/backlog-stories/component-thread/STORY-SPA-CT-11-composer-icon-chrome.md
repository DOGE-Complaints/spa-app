# STORY-SPA-CT-11 — Composer icon chrome (G-H2 · G-H6)

## Meta

- **Key:** `STORY-SPA-CT-11-composer-icon-chrome`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P3 Done · gate BLOCK · `pkg-000169` · `2026-10-19T12:15:05Z`
- **Pipeline:** [STORY-SPA-CT-11-composer-icon-chrome](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-11-composer-icon-chrome/STORY-SPA-CT-11-composer-icon-chrome.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-04 · CT-05
- **Blocks:** OP eye composer chrome
- **UX mirror:** [OP-UX residual 10-19](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H2 · G-H6
- **Analysis:** [ux-gaps 2026-10-19](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) G-H2 · G-H6 · attach nuance
- **Artboard:** [M152-B](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153 C/D](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- **Code home:** `thread-mount/composer/ThreadComposer.jsx` · CSS

## Зачем

Lab composer = text **Attach** + yellow labelled **Post** pills · **zero** SVG. Mockup: paperclip + yellow circle send (empty path) / plane on Post reply (M153). Attach feature Present when open — gap is chrome.

## FR

- **FR-CT-11.1** Attach control shows paperclip glyph (reuse Present `public/icons/next-feed/actions/attach.svg`) when `attachmentsAvailable`.  
- **FR-CT-11.2** Empty / first-comment send path: yellow **circular** send with plane/send glyph (reuse Present `send.svg`) per artboard B.  
- **FR-CT-11.3** Root/reply open composer: labelled **Post comment** / **Post reply** retains label + **plane/send icon** (M153).  
- **FR-CT-11.4** Layout: Attach discoverable (left / in-field paperclip grammar per M153) · Post primary right.  
- **FR-CT-11.5** No silent invent SVG — if glyph missing, stop + icon promote story; do not ship emoji/Lucide interim.  
- **FR-CT-11.6** AttachmentRef D/E logic unchanged (CT-05).

## Вне scope

Inline reply placement (CT-12) · empty entry-only (CT-10) · invent upload HTTP · invent OP PASS

## Acceptance Criteria

- [ ] Open composer on lab: paperclip Attach visible · Post has send/plane chrome  
- [ ] Empty send path uses circular yellow send (when empty composer path applies after CT-10 entry)  
- [ ] Vitest/DOM markers for icon presence (img/svg) · attach still works when available  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§11.4](ARCHITECTURE.md) · P1.3 APPLY `pkg-000169`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-11-t01-attach-paperclip` | Done | Wire Attach → `attach.svg` paperclip chrome | `ThreadComposer.jsx` · CSS | 11.1 · 11.4 |
| `task-spa-ct-11-t02-circle-send-empty` | Done | Yellow circular send + `send.svg` for empty/first-send path | ThreadComposer · CSS | 11.2 |
| `task-spa-ct-11-t03-post-plane-label` | Done | Post comment/reply labelled + plane icon | ThreadComposer · CSS | 11.3 |
| `task-spa-ct-11-t04-vitest-icons` | Done | Assert icon DOM Present · AttachmentRef logic unchanged | `__tests__/threadMount.ct04*.test.jsx` · ct05 | 11.5 · 11.6 |

### Constraints

- Reuse Present `attach.svg` / `send.svg` · no invent SVG bodies  
- Attach Present-when-open holds · chrome only · Arch §11.4  

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Composer chrome matches M152-B / M153 C icon grammar without losing attach logic.
