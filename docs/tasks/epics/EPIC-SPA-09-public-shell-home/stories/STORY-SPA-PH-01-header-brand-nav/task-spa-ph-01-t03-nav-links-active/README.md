# SPA-PH-01-T03 — Nav links + active states

**Status:** Done — P3 PASS 2026-08-04T07:07:39Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** backlog FR-PH-01.3 / FR-PH-01.4  
**Depends on:** T02  
**ui_scope:** `visual`  
**extends:** ui-mockup / mockup (T01 anchor)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png
```

## Purpose
Nav order fixed: Dashboard → `/board`; How it works → `/how-it-works`; Submit a story → external GPT (behavior PH-06). Active underline for in-app routes; Submit not hero CTA. Stub `/how-it-works` route OK in this wave (PH-05).

## Risk
Wrong order; active marker on Submit; hardcoding GPT URL (PH-06 owns env).

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — **no** primary nav links today.
- [`App.jsx`](../../../../../../../src/App.jsx) — **no** `/how-it-works` route (P1.3 verify); stub allowed per backlog Depends.
- Submit final URL wire = PH-06; stub/open deferred OK (FR-PH-01.3).

## AC / DoD
- [ ] (P0) Nav order: Dashboard · How it works · Submit a story (AC #2).
- [ ] (P0) Active state for `/board` and `/how-it-works`.
- [ ] (P1) Submit not styled as hero CTA; final URL wire = PH-06.

## Where to change
- `spa-app/src/components/AppShell/Header.jsx` (or PublicHeader)
- `spa-app/src/App.jsx` — stub `/how-it-works` if needed

## Out of scope
GPT env helper (PH-06); full How-it-works page (PH-05); L10N dictionary file (T06 — may use `t()` keys once registered).

## Verification
```bash
rg -n 'how-it-works|howItWorks|/board' spa-app/src/App.jsx spa-app/src/components/AppShell/Header.jsx || true
```
