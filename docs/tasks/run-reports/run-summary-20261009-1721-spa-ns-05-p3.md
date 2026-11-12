# Run summary — P3 NS-05 classic shell apply (`pkg-000101`)

**UTC:** `2026-10-09T17:21:55Z`  
**builder_project:** `spa`  
**Package:** `pkg-000101`  
**$planFile:** `.cursor/plans/Spa_builder.plan.md`  
**Build window:** `spa-cursor-build-window--flat-1-3.md`  
**Backend:** UP (Vite `4173` · gw `200`)

## Result

**Done** — T01–T03 **Done** · story gate **PASS**.

| Task | Result |
|------|--------|
| T01 apply shell classic routes | Done · ui_anchor · §UI PASS |
| T02 shelter-list intact | Done · legacy board main live |
| T03 brand home still feed | Done · brand → `#/next/feed` |

## Evidence

- Code: `AppShellLayout.jsx` `useNextShellChrome` · `next-shell-classic-shelter`
- Vitest: ns05Classic + ns03/ns04 updated · dictionary `shelter.classicHint` — 11 passed
- Live CDP: ProfileRail + mobile chrome + Issue Board on `#/board` · brand feed
- UI-3: `ui-baseline/post-implement/01-…shell-applied.png` · `02-…mobile-chrome.png`
- Gate: [`acceptance-verification-spa-ns-05.md`](../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-05-classic-shell-apply/task-spa-ns-05-t01-apply-shell-classic-routes/acceptance-verification-spa-ns-05.md)
- `test:ui:board-shell`: puppeteer hang · CDP substitute (same class as NS-04)

## Locks held

No BoardFeed invent · no `/` flip · no git push · hybrid ≠ Feed Product Done.

**Next:** P4 on OP · do not self-advance.
