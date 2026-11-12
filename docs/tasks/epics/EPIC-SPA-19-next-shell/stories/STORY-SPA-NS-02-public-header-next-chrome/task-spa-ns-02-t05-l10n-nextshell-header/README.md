# SPA-NS-02-T05 — L10N `nextShell.header.*` + reuse publicHome.account

**Status:** Done · P3 `2026-10-09T15:46:55Z`  
**Story:** [`../STORY-SPA-NS-02-public-header-next-chrome.md`](../STORY-SPA-NS-02-public-header-next-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md)  
**Depends on:** T01–T04 chrome wire  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T15:24:40Z`
**Done:** `2026-10-09T15:46:55Z`  
**Package:** `pkg-000098`  
**@mockup:** _(soft: backlog copy FR-NS-02.L10N — no artboard-driven UI)_  
**@l10n-ssot:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md) §`nextShell.header.*`

## Purpose
L10N `nextShell.header.*` + reuse publicHome.account

## Risk
Inventing feed/BoardFeed/threads; inventing gateway endpoints; creating new icon SVG masters; dual NextShell fork; flipping `/` before shell works (NS-06 only).

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — brand→`/board`
- [`AccountControl.jsx`](../../../../../../../src/components/AccountControl/AccountControl.jsx) — `signOut` → `/board`
- i18n: `nextShellDictionary.js` (NS-01) + `publicHome.account.*`
- API: [STORY-SPA-NS-api-requirements.md](../../../../../backlog-stories/next-shell/STORY-SPA-NS-api-requirements.md) §1

## AC / DoD
- [x] Implements purpose above per backlog FR (**FR-NS-02.L10N**)
- [x] `nextShell.header.*` deltas wired en/et/ru
- [x] Reuse `publicHome.account.*` where possible
- [x] No feed-content Done assumption; OOS → next-feed
- [x] Catch-all `*` ordering respected (next routes registered above `*`)

## Where to change
- i18n (`nextShellDictionary` / dictionaries)

## Out of scope
BoardFeed cards; threads; reactions; right-rail production data; git push; product code until P3.

## Verification
```bash
# Re-verify as-is anchors before edit
rg -n 'nextShell|publicHome.account' spa-app/src || true
test -f spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md
```
