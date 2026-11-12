# SPA-NF-02-T02 — Wire open-issue/more/comment/react/share (+ shell location)

**Status:** Done · P3 (`2026-10-10T18:41:45Z`)  

**Story:** [`../STORY-SPA-NF-02-civic-issue-post.md`](../STORY-SPA-NF-02-civic-issue-post.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** false  
**extends ui-mockup:** [`../task-spa-nf-02-t01-civic-post-card/ui-mockup-spec.md`](../task-spa-nf-02-t01-civic-post-card/ui-mockup-spec.md) _(created at P3 UI-1)_  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:12:38Z`  
**Package:** `pkg-000104`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)

## Purpose
Wire open-issue/more/comment/react/share (+ shell location).

## Arch anchors
- [02 §3 tokens](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 L0 data-theme](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Action strip icons from `/icons/next-feed/actions/…`; `location` = next-shell reuse — catalog SSOT.
- Semantic color via tokens/`currentColor` — 02 §3; behavior of react/comment may wire in NF-04/05.

## Implement notes
- Wire open-issue/more/comment/react/share (+ shell location) slots.
- OOS: invent new glyphs; people/Connect icons (M155).

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-02
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Post action icons use catalog runtime URLs
- [x] No docs-master paths in src

## Code Facts (re-verify at execute)
- Runtime: `public/icons/next-feed/actions/{open-issue,more,comment,react,share}.svg` Present
- Reuse: `/icons/next-shell/actions/location.svg`

## Where to change
- Feed civic post action strip under `features/feed/`
- No re-copy masters unless 404 gap

## Verification
```bash
ls spa-app/public/icons/next-feed/actions/{open-issue,more,comment,react,share}.svg spa-app/public/icons/next-shell/actions/location.svg
```
