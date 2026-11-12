# next-feed — ADMIN rework sync mirror

> **Wave:** docs rework 2026-10-10 · operator lock: mockups + icon-system **already exist**  
> **Purpose:** before/after map for ADMIN queue renumber + promote-on-execute  
> **This wave:** rewrite ADMIN plan docs + indexes only  
> **Later waves:** execute new ADMIN-NF-01…05 (register · promote icons · api · stories · epic)

## Before → after (key map)

| Before (obsolete) | After |
|-------------------|--------|
| ADMIN-NF-01 product-ux-prompts → `UX-PROMPTS.md` | **Removed** (no gen-brief layer) |
| ADMIN-NF-02 ux-mockup-intake | → **ADMIN-NF-01** ux-mockup-intake |
| ADMIN-NF-03 icon-assets-catalog | → **ADMIN-NF-02** icon catalog + **promote on execute** |
| ADMIN-NF-04 api-requirements | → **ADMIN-NF-03** api-requirements |
| ADMIN-NF-05 backlog-stories-l10n | → **ADMIN-NF-04** backlog-stories-l10n |
| ADMIN-NF-06 tech-decomposition | → **ADMIN-NF-05** tech-decomposition |

**Package admin count:** 6 → **5**. Progress target after rework docs: **0/5 Todo**.

## Real context locks (verified intent)

| Lock | Reality |
|------|---------|
| UX artboards M149–M160 | Present under `docs/UX/next/feed/artboards/` — **read-only**; register only |
| Icon masters | `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/{…}/` — immutable |
| next-shell | ADMIN 6/6 + NS-01…06 Done · runtime `/icons/next-shell/…` **on disk** — **reuse** shared nav |
| Runtime feed icons | Target `public/icons/next-feed/<group>/` — **Absent until ADMIN-NF-02 execute** |
| Shell ownership | OOS this package (PublicHeader / ProfileRail) |

## End-state after **full** ADMIN-NF-01…05 execute

| Artifact | Path / note |
|----------|-------------|
| Mockup register | `NF-feed-mockup-intake-register.md` (+ state checklists folded from old NF-01) |
| Icon catalog | `STORY-SPA-NF-icon-assets.md` |
| Icons on disk | `spa-app/public/icons/next-feed/{actions,reactions,map,status}/…` |
| API catalog | `STORY-SPA-NF-api-requirements.md` |
| Product stories | `STORY-SPA-NF-01…06` with UX SSOT + **runtime** icon URLs |
| Epic scaffold | `EPIC-SPA-NN-next-feed` (number at ADMIN-05 execute) |

## This rework wave vs later execute

| Now (rework) | Later (operator «Выполни ADMIN-NF-0N») |
|--------------|----------------------------------------|
| Sync mirror + rewrite ADMIN-01…05 | Create register / promote icons / api / stories / epic |
| Update INDEX · PRODUCT-BRIEF · parent INDEX · dashboard tip | INDEX Progress 1/5…5/5 |
| **Do not** create register, STORIES, epic, `public/icons/next-feed/**` | name = create only on those ADMIN executes |

## Cross-links to refresh in rework

- [INDEX.md](INDEX.md) — queue 01…05 · Next = ADMIN-NF-01 intake  
- [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) — locked ADMIN-NF-01…**05**; promote in ADMIN-02  
- [`../INDEX.md`](../INDEX.md) §REQ-22 next-feed  
- [`../../spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md) — tip ADMIN-NF-01 · ADMIN **0/5**

## Execute order (post-rework)

```
01 intake → 02 icons+promote → 03 api ‖ (after 01 freeze) → 04 stories → 05 epic
```
