# SPA-NS-02-T03 — Brand Link → `/next/feed`; logo reuse `/assets/DOGEstonia-logo-*`

**Status:** Done · P3 `2026-10-09T15:46:55Z`  
**Story:** [`../STORY-SPA-NS-02-public-header-next-chrome.md`](../STORY-SPA-NS-02-public-header-next-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md)  
**Depends on:** T01–T02; NS-01 host  
**ui_scope:** `shell`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T15:24:40Z`
**Done:** `2026-10-09T15:46:55Z`  
**Package:** `pkg-000098`  
**puppeteer_gate:** `test:ui:board-shell`  
**acceptance:** [`acceptance-verification-spa-ns-02.md`](./acceptance-verification-spa-ns-02.md) · **PASS**  
**ui-mockup-spec:** [`ui-mockup-spec.md`](./ui-mockup-spec.md) · gate **принято** overnight  
**ui-baseline:** [`ui-baseline/`](./ui-baseline/)  
 
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) §4 brand  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)  
**@component:** [`../../../../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) §8 PublicHeader  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row NS-H

## Purpose
Brand Link → `/next/feed`; logo reuse `/assets/DOGEstonia-logo-*`

## Risk
Inventing feed/BoardFeed/threads; inventing gateway endpoints; creating new icon SVG masters; dual NextShell fork; flipping `/` before shell works (NS-06 only).

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — brand→`/board`
- [`AccountControl.jsx`](../../../../../../../src/components/AccountControl/AccountControl.jsx) — `signOut` → `/board`
- Icons: [STORY-SPA-NS-icon-assets.md](../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)
- API: [STORY-SPA-NS-api-requirements.md](../../../../../backlog-stories/next-shell/STORY-SPA-NS-api-requirements.md) §1

## AC / DoD
- [x] Implements purpose above per backlog FR (**FR-NS-02.1**)
- [x] Brand click → `/next/feed` (not `/board`)
- [x] Logo reuse existing `/assets/DOGEstonia-logo-*` — **no new logo**
- [x] No feed-content Done assumption; OOS → next-feed
- [x] Catch-all `*` ordering respected (next routes registered above `*`)

## Where to change
- Header.jsx brand; no new logo asset

## Out of scope
BoardFeed cards; threads; reactions; right-rail production data; git push; product code until P3.

## Verification
```bash
# Re-verify as-is anchors before edit
rg -n 'next/feed|AppShellLayout|DOGEstonia-logo' spa-app/src || true
test -f spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md
```
