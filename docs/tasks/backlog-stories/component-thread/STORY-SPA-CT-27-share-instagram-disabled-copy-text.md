# STORY-SPA-CT-27 — Share: Instagram disabled · Copy link text-only

## Meta

- **Key:** `STORY-SPA-CT-27-share-instagram-disabled-copy-text`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §14.3](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-27-share-instagram-disabled-copy-text/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md) · `pkg-000185` · tip · activation none · Await P8 · `2026-10-20T19:56:55Z` · **no UX gen required**
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4 · M152d
- **Depends on:** CT-24
- **Blocks:** OP eye Instagram / Copy link chrome
- **Interview:** [INTERVIEW-CT-25-plus…](INTERVIEW-CT-25-plus-attach-density-share-residual-2026-10-20.md) MT4a · MT4b · lock **2B**
- **Artboard tip:** [M152d](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) (list order) · behavior supersede Instagram copy-fallback
- **Code home:** `FeedPostShareSurface.jsx` · `shareIssueUrl.js`

## Зачем

Manual test: Instagram “needs image” — disable for now but keep in list. Copy link should have **no** icon. AS-IS: Instagram click copies; Copy row shows `⎘`.

## L1 — FR

- **FR-CT-27.1** Instagram row remains in sheet list (icon + label).  
- **FR-CT-27.2** Instagram is **visually disabled** (not primary action). Hint may remain (e.g. why disabled / fallback note).  
- **FR-CT-27.3** Instagram click does **not** copy and does **not** open a share intent (lock 2B).  
- **FR-CT-27.4** Copy remains available only via the **Copy link** row (and any non-Instagram network intents unchanged).  
- **FR-CT-27.5** Copy link row is **text-only** — no icon / no `⎘` glyph.  
- **FR-CT-27.6** Vitest: Instagram `disabled` / aria · click no clipboard · Copy link has no icon node.

## Вне scope

Invent Instagram image upload · invent Graph API · density · attach chip · redesign sheet networks set

## L1 — Acceptance Criteria

- [x] Instagram listed + visually disabled (structure)  
- [x] Instagram click ≠ copy (structure)  
- [x] Copy link works without icon (structure)  
- [x] Other networks unchanged (structure)  
- [x] Vitest  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§14.3](ARCHITECTURE.md) · P3 Done · gate BLOCK

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-27-t01-ig-disabled` | Done | Instagram row disabled · no copy on click · hint ok | shareIssueUrl.js · FeedPostShareSurface.jsx · CSS | 27.1–27.4 |
| `task-spa-ct-27-t02-copy-text` | Done | Remove Copy link icon/glyph | FeedPostShareSurface.jsx · CSS | 27.5 |
| `task-spa-ct-27-t03-vitest` | Done | disabled IG · no clipboard on IG · copy text-only | `feedLab.ct27` / update ct24 | 27.6 |

### Order

`t01` → `t02` → `t03`

## DoD

Instagram stays visible but inert for share/copy; Copy link is text-only.
