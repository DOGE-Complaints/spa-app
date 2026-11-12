# SPA-NS-02-T01 — Promote icon-system masters → `public/icons/next-shell/{navigation,actions,status}/`

**Status:** Done · P3 `2026-10-09T15:46:55Z`  
**Story:** [`../STORY-SPA-NS-02-public-header-next-chrome.md`](../STORY-SPA-NS-02-public-header-next-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md)  
**Depends on:** NS-01 Done (`pkg-000097`); prior tasks in wave  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T15:24:40Z`
**Done:** `2026-10-09T15:46:55Z`  
**Package:** `pkg-000098`  
**@icons:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) _(soft: chrome icon slots)_  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row NS-H

## Purpose
Promote icon-system masters → `public/icons/next-shell/{navigation,actions,status}/`

## Risk
Inventing feed/BoardFeed/threads; inventing gateway endpoints; creating new icon SVG masters; dual NextShell fork; flipping `/` before shell works (NS-06 only).

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — brand→`/board`
- [`AccountControl.jsx`](../../../../../../../src/components/AccountControl/AccountControl.jsx) — `signOut` → `/board`
- Icons: [STORY-SPA-NS-icon-assets.md](../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)
- API: [STORY-SPA-NS-api-requirements.md](../../../../../backlog-stories/next-shell/STORY-SPA-NS-api-requirements.md) §1

## AC / DoD
- [x] Implements purpose above per backlog FR
- [x] Runtime icons use `/icons/next-shell/…` when applicable (promote before wire)
- [x] No feed-content Done assumption; OOS → next-feed
- [x] Catch-all `*` ordering respected (next routes registered above `*`)
- [x] **No new SVG invent** — copy masters only

## Where to change
- cp from docs UX icon-system; do not invent SVG

## Out of scope
BoardFeed cards; threads; reactions; right-rail production data; git push; product code until P3.

## Verification
```bash
# Re-verify as-is anchors before edit
rg -n 'next/feed|AppShellLayout|DOGEstonia-logo' spa-app/src || true
test -f spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md
ls spa-app/public/icons/next-shell/navigation/ 2>/dev/null || true
```
