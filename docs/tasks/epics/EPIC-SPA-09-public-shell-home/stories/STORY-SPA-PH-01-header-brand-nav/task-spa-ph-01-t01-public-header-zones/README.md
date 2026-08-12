# SPA-PH-01-T01 — Public header zones (Brand | Nav | Session/Locale)

**Status:** Done — P3 PASS 2026-08-04T07:07:39Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md) FR-PH-01.1 / FR-PH-01.7  
**Depends on:** —  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png
```

## Purpose
Extend Header / introduce PublicHeader zones per M129: Brand | Primary nav | Session & locale; host empty account slot for PH-02. Not a marketing hero.

## Risk
Regression vs G8 AppShell; layout drift from M129; forking board-only chrome.

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — brand logo + sync status + `LanguageSelector` only; **no** primary nav / account slot.
- [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx) — mounts shell chrome; LocaleSelector also used in shell.
- M129 SSOT on disk: `docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md` (+ `.png`).
- Account content = PH-02; this task hosts the slot only (FR-PH-01.7).

## AC / DoD
- [ ] (P0) Header zones Brand | Primary nav | Session & locale per M129 (backlog AC #1).
- [ ] (P0) Account slot host present (content PH-02).
- [ ] (P0) Not a marketing hero (Вне scope).

## Where to change
- `spa-app/src/components/AppShell/Header.jsx` (and/or new `PublicHeader` under AppShell)
- `spa-app/src/components/AppShell/AppShell.jsx`
- Related CSS under AppShell

## Out of scope
Brand link polish (T02); nav items (T03); locale behavior (T04); mobile menu (T05); L10N keys (T06); PH-02 account menu.

## Verification
```bash
test -f spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md
rg -n 'header-brand|header-controls|Header' spa-app/src/components/AppShell/Header.jsx
```

Gate: filled at T08 / per-task acceptance if used.
