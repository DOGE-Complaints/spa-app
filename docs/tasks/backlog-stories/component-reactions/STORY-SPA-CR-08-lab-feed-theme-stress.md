# STORY-SPA-CR-08 — Lab feed theme + stress controls

## Meta

- **Key:** `STORY-SPA-CR-08-lab-feed-theme-stress`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P6 F2 CLOSED · gate BLOCK · `pkg-000144` · `2026-10-15T19:39:31Z`
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · sibling lab [next-feed-lab](../next-feed-lab/INDEX.md)
- **Depends on:** [CR-07](STORY-SPA-CR-07-lab-feed-cutover.md) · [CR-04](STORY-SPA-CR-04-reactions-l10n-theme-stress.md) (pattern)
- **Blocks:** CR-09 (soft — theme honesty before strip eye)
- **UX mirror:** [OP-UX-MIRROR-lab-feed-composition-2026-10-15.md](OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.1
- **Code home:** `#/lab/feed` page / canvas chrome · `features/reactions-mount` surfaces already tokenized

## Зачем

Picker/strip на `#/lab/feed` должны следовать light/dark (не «тёмный остров» на светлой карточке). Для OP — **тот же stress-переключатель**, что на `#/lab/reactions` (`ReactionsLabCanvas` stress rows).

## UX SSOT

- Mirror §3.1  
- Pattern: [`ReactionsLabCanvas`](../../../../src/features/reactions-mount/lab/ReactionsLabCanvas.jsx) · `data-testid="rm-lab-stress-controls"` · `setThemeAttribute`  
- M160 tone · CR-04 AC  
- Tokens: `--color-surface-elevated`, `--color-text-*`, `--color-border-*` in strip/picker CSS (Present)

## FR

- **FR-CR-08.1** On `#/lab/feed`, expose stress controls at least: **light / dark** (same UX grammar as reactions lab). Prefer also: ET/RU/EN · 320 · 200% when cheap to reuse.  
- **FR-CR-08.2** Theme toggle sets document `data-theme` (via existing `setThemeAttribute` or equivalent) without invent new theme system.  
- **FR-CR-08.3** `ReactionSummaryStrip` + `ReactionPicker` backgrounds/text/borders follow active theme tokens (no hard-coded navy island).  
- **FR-CR-08.4** Feed card / strip chrome remain readable under both themes (no invent DS amend).  

## Вне scope

Portal (CR-10) · strip A+B+C (CR-09) · `#/next/feed` · M155 · invent HTTP  

## Acceptance Criteria

- [ ] `#/lab/feed` has theme toggle (light/dark) usable like `#/lab/reactions`  
- [ ] Switching to light → picker/strip light; dark → dark (visual + token check)  
- [ ] Reuse bootTheme / existing i18n stress keys where Present  
- [ ] Vitest: toggle sets `data-theme` / control testids  
- [ ] Verify: `http://127.0.0.1:5173/#/lab/feed`  

## Technical subtasks

> P3 structure Done `2026-10-15T19:33:42Z` · gate BLOCK · Skill: `react-expert` · pipeline [STORY-SPA-CR-08](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-08-lab-feed-theme-stress/STORY-SPA-CR-08-lab-feed-theme-stress.md) · `pkg-000144`  


> Verified: `FeedLabPage` has no stress UI; pattern = `ReactionsLabCanvas` (`setThemeAttribute`, `rm-lab-stress-controls`); strip/picker already on `--color-*`; feed-lab card/strip = hardcoded light hex.

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-08-t01-feed-lab-stress-controls` | Todo | M160 stress on `#/lab/feed`: light/dark + reuse locale × 320 × 200%; `setThemeAttribute(..., { persist: false })`; attrs `data-lab-*`; stress host testid per reactions-lab grammar | `FeedLabPage.jsx` + `.css` | 08.1–08.2 |
| `task-spa-cr-08-t02-locale-t-through-mount` | Todo | Locale stress honest: `THREADS_FEED_DICTIONARY_BY_LOCALE` / `makeT` → `t` into `FeedLabReactionsMount` (today EN-only `labT`) | `FeedLabReactionsMount.jsx` · `labI18n.js` · pass-down | 08.1 |
| `task-spa-cr-08-t03-feed-lab-token-surfaces` | Todo | FR-08.4: hardcoded hex in feed-lab post/discussion CSS → semantic `--color-*` (else dark = light islands around tokenized picker) | `FeedPostCard.css` · strip/identity/discussion CSS | 08.3–08.4 |
| `task-spa-cr-08-t04-vitest-feed-lab-stress` | Todo | Vitest: toggle → `data-theme`; stress controls present; mirror `reactionsLab.cr04.test.jsx` | new `feedLab.cr08.test.jsx` | AC |

### Constraints (all tasks)

- No invent HTTP / second client / M155 / `#/next/feed` cutover  
- Do not touch `ReactionPicker*.css` / `ReactionSummaryStrip.css` as primary (already tokens)  
- Do not persist lab theme to localStorage (`persist: false`)  
- Portal (CR-10) · strip A+C+B (CR-09) OOS  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

OP can theme-stress reactions on feed without opening `#/lab/reactions`.
