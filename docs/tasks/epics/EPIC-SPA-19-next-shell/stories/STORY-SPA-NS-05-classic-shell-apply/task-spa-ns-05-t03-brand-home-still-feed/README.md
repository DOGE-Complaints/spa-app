# SPA-NS-05-T03 — Brand/home remains `/next/feed` on classic

**Status:** Done · P3 `2026-10-09T17:21:55Z`  
**Story:** [`../STORY-SPA-NS-05-classic-shell-apply.md`](../STORY-SPA-NS-05-classic-shell-apply.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-05-classic-shell-apply.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-05-classic-shell-apply.md)  
**Depends on:** T01 classic shell · NS-02 brand path  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:42:01Z`  
**Done:** `2026-10-09T17:21:55Z`  
**Package:** `pkg-000101`  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md`](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) §3 D2.3  
**@shell-reuse:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) §4 brand (NS-02)  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row NS-X  
**@icons:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)

## Purpose
Brand/home remains `#/next/feed` on classic — FR-NS-05.3. Classic is not product home. Optional `nextShell.shelter.classicHint`.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Brand → feed on classic | live `public-header-brand` href `#/next/feed` · vitest ns05 |
| 2 | L10N shelter key | [`nextShellDictionary.js`](../../../../../../../src/i18n/nextShellDictionary.js) `nextShell.shelter.classicHint` |
| 3 | Logo reuse | NS-02 assets unchanged |

## AC / DoD

- [x] (P0) Brand/home → feed from classic chrome
- [x] (P0) Classic is not product home
- [x] (P0) Icons/logo same as next shell
- [x] (P0) L10N reuse + optional shelter hint keys

## Out of scope
`/` flip · BoardFeed · new SVG · git push.
