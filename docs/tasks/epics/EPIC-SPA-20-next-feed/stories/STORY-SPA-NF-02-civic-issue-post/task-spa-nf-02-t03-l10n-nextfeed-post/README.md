# SPA-NF-02-T03 — L10N: reuse `threadsFeed.post.*` + draft `nextFeed.post.*`

**Status:** Done · P3 (`2026-10-10T18:41:45Z`) · story gate  

**Story:** [`../STORY-SPA-NF-02-civic-issue-post.md`](../STORY-SPA-NF-02-civic-issue-post.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md)  
**ui_scope:** `feed`  
**ui_complexity:** `trivial`  
**ui_anchor:** false  
**extends ui-mockup:** [`../task-spa-nf-02-t01-civic-post-card/ui-mockup-spec.md`](../task-spa-nf-02-t01-civic-post-card/ui-mockup-spec.md) _(created at P3 UI-1)_  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:12:38Z`  
**Package:** `pkg-000104`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)

## Purpose
L10N: reuse `threadsFeed.post.*` + draft `nextFeed.post.*`.

## Arch anchors
- [02 §1 reuse threads presentation/i18n where valid](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Arch context
- Prefer reuse `threadsFeed.post.*` for shared action labels; draft `nextFeed.post.*` only for gaps — 02 reuse threads behind presentation.
- Same i18n plane — 00 L4.

## Implement notes
- Wire `t()` for post chrome; avoid duplicating shell strings.
- OOS: inventing invite/reaction copy owned by NF-05.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-02
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] en/et/ru keys from backlog present; reuse preferred over duplicate
- [x] No duplicate shell `nextShell.*` ownership

## Code Facts (re-verify at execute)
- Backlog draft: `nextFeed.post.*` (en/et/ru)
- Reuse: `threadsFeed.post.*` where valid

## Where to change
- spa-app i18n dictionaries / flat keys (existing pattern)
- Consume via `t()` in feed civic post

## Verification
```bash
rg -n "nextFeed\.post\.|threadsFeed\.post\." spa-app/src -g '*.js' -g '*.jsx' | head -40
```
