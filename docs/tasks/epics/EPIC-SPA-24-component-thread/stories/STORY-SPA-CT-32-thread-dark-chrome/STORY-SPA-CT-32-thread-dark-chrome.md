# STORY-SPA-CT-32-thread-dark-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md)  
> **Status:** P8 local close Done · structure **Pass** · gate **BLOCK** · `2026-10-21T20:37:15Z` · tip · **activation: none** (TASKED=0) · Story **BLOCKED** (OP eye) OK · P6 skipped  
> **Package:** `pkg-000200` · component-thread · ARCHITECTURE §18 · Interview D5 · D6  
> **ui_scope:** `thread-mount` · soft `feed` · **mixed** · Path A code lock · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CT-28 Live Present · soft CT-26 density · soft NF IssueTypeIcon · soft FeedIssueMount  
> **Runtime:** T01–T05 **Done** · P5 F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · no invent OP PASS  
> **P5 disposition:** [`p5-disposition-STORY-SPA-CT-32-2026-10-21.md`](../../../../analysis/p5-disposition-STORY-SPA-CT-32-2026-10-21.md) · [Spa_builder](../../../../../../.cursor/plans/Spa_builder.plan.md) §P5 APPLY CT-32 · [audit](../../../../analysis/audit-STORY-SPA-CT-32-execution-2026-10-21.md)

## Purpose

In dark mode thread: cream bubbles + white text (quote invisible), «Show more comments» low-contrast blue, issue-type glyph and Close X black. Soft feed civic action icons unreadable (same `<img>` pattern). Need theme tokens + mask/currentColor.

## L1 — FR (backlog verbatim)

- **FR-CT-32.1** Comment bubbles / quote excerpts / composer plates use theme tokens (not fixed `#f7f6f2` / cream) so body + quote text are readable in dark.  
- **FR-CT-32.2** «Show more comments» uses a high-contrast link/accent token (add `--color-text-link` under `[data-theme]` in `tokens.css` if Absent).  
- **FR-CT-32.3** Issue type identity glyph readable on dark (shared `IssueTypeIcon` — mask/currentColor or locked equivalent).  
- **FR-CT-32.4** Issue mount **Close** control glyph readable on dark (`FeedIssueMount` / PresentationChrome).  
- **FR-CT-32.5** Feed civic strip action icons (comment/share/filter) readable on dark — soft next-feed CSS/components; same theme-safe pattern as NS-07.  
- **FR-CT-32.6** Light theme readability held.  
- **FR-CT-32.7** Vitest / Path A · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Bubbles/quote/composer readable in dark (structure)  
- [x] Show more readable contrast (structure)  
- [x] Issue type glyph readable in dark (structure)  
- [x] Close glyph readable in dark (structure)  
- [x] Feed action icons readable in dark (soft · structure)  
- [x] Light theme held (structure)  
- [x] Vitest / Path A  
- [ ] OP eye — Absent → gate **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-32-thread-dark-chrome.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-32-t01-tokens](task-spa-ct-32-t01-tokens/README.md) | Add `--tm-bubble-fill` / `--color-text-link` under dark+light | **Done** |
| T02 | [task-spa-ct-32-t02-bubbles](task-spa-ct-32-t02-bubbles/README.md) | Remap CommentNode / Tree / Composer to tokens | **Done** |
| T03 | [task-spa-ct-32-t03-type-close](task-spa-ct-32-t03-type-close/README.md) | Theme-safe IssueTypeIcon + Close glyph | **Done** |
| T04 | [task-spa-ct-32-t04-feed-icons](task-spa-ct-32-t04-feed-icons/README.md) | Soft feed civic/toolbar icons theme-safe | **Done** |
| T05 | [task-spa-ct-32-t05-vitest](task-spa-ct-32-t05-vitest/README.md) | Markers / honesty | **Done** |

**Order:** t01 → t02 → t03 → t04 → t05

## Out of scope (backlog verbatim)

Shell header/rail (**NS-07**) · map · strip React double pad (**NF-18**) · CT-31 attach · invent OP PASS · invent CDN

## DoD (backlog verbatim)

Thread + related feed/type/close chrome readable in dark on `#/next/feed`; light held; no invent OP PASS.

## @mockup handoff

- Continuity: evidence wave2 `07`–`10` · Interview **D5 · D6** · [ARCHITECTURE §18](../../../../backlog-stories/component-thread/ARCHITECTURE.md)
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-thread-dark-chrome.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
