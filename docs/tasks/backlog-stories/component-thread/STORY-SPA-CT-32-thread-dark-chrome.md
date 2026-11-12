# STORY-SPA-CT-32 — Thread dark chrome residual (OP marks 5–6)

## Meta

- **Key:** `STORY-SPA-CT-32-thread-dark-chrome`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §18](ARCHITECTURE.md) · **L2** tech subtasks
- **Status:** P8 local close · T01–T05 **Done** · structure **Present** · visual **BLOCK** (OP eye Absent) · gate **BLOCK** · `pkg-000200` · activation **none** · Story **BLOCKED** OK overnight · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-32-thread-dark-chrome/STORY-SPA-CT-32-thread-dark-chrome.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-CT-32-2026-10-21.md)
- **Depends on:** CT-28 Live Present · soft CT-26 density · soft NF IssueTypeIcon · soft FeedIssueMount
- **Interview:** [INTERVIEW-NF-18-plus…](../next-feed/INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) **D5 · D6**
- **Evidence:** [evidence/op-residual-wave2…](../../../analysis/evidence/op-residual-wave2-2026-10-21/) `07-…` · `08-…` · `09-…` · `10-…`
- **Code home:** `thread-mount/tree/CommentNode.css` · `CommentTree.css` · `ThreadComposer.css` · `tokens.css` · `IssueTypeIcon` · `FeedIssueMount` close · soft feed civic icons

## Зачем

В dark mode тред: кремовые пузыри + белый текст (цитата невидима), «Show more comments» синий низкий контраст, issue-type glyph и Close X чёрные. Feed civic action icons на dark тоже нечитаемы (тот же `<img>` паттерн).

## L1 — FR

- **FR-CT-32.1** Comment bubbles / quote excerpts / composer plates use theme tokens (not fixed `#f7f6f2` / cream) so body + quote text are readable in dark.  
- **FR-CT-32.2** «Show more comments» uses a high-contrast link/accent token (add `--color-text-link` under `[data-theme]` in `tokens.css` if Absent).  
- **FR-CT-32.3** Issue type identity glyph readable on dark (shared `IssueTypeIcon` — mask/currentColor or locked equivalent).  
- **FR-CT-32.4** Issue mount **Close** control glyph readable on dark (`FeedIssueMount` / PresentationChrome).  
- **FR-CT-32.5** Feed civic strip action icons (comment/share/filter) readable on dark — soft next-feed CSS/components; same theme-safe pattern as NS-07.  
- **FR-CT-32.6** Light theme readability held.  
- **FR-CT-32.7** Vitest / Path A · OP eye — no invent PASS.

## Вне scope

Shell header/rail (**NS-07**) · map · strip React double pad (**NF-18**) · CT-31 attach · invent OP PASS · invent CDN

## L1 — Acceptance Criteria

- [ ] Bubbles/quote/composer readable in dark  
- [ ] Show more readable contrast  
- [ ] Issue type glyph readable in dark  
- [ ] Close glyph readable in dark  
- [ ] Feed action icons readable in dark (soft)  
- [ ] Light theme held  
- [ ] Vitest / Path A  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCHITECTURE §18](ARCHITECTURE.md). Tokens SSOT `tokens.css`. Supersedes light-only `--tm-bubble-fill` hex as Done for dark.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-32-t01-tokens` | Await | Add `--tm-bubble-fill` / `--color-text-link` (and related) under dark+light | tokens.css | 32.1 · 32.2 |
| `task-spa-ct-32-t02-bubbles` | Await | Remap CommentNode / Tree / Composer to tokens | thread-mount CSS | 32.1 · 32.2 · 32.6 |
| `task-spa-ct-32-t03-type-close` | Await | Theme-safe IssueTypeIcon + Close glyph | IssueTypeIcon · FeedIssueMount | 32.3 · 32.4 |
| `task-spa-ct-32-t04-feed-icons` | Await | Soft feed civic/toolbar icons theme-safe | FeedCivicPost · FeedToolbar soft | 32.5 |
| `task-spa-ct-32-t05-vitest` | Await | Markers / honesty | tests | 32.7 |

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Thread + related feed/type/close chrome readable in dark on `#/next/feed`; light held; no invent OP PASS.
